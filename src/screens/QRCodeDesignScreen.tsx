import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  Share,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import useWeddingStore from "../state/weddingStore";
import { format } from "date-fns";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface DesignTemplate {
  id: string;
  name: string;
  bgColors: string[];
  textColor: string;
  accentColor: string;
  borderStyle: "none" | "simple" | "ornate" | "floral";
  headerText: string;
  subText: string;
  footerText: string;
}

const DESIGN_TEMPLATES: DesignTemplate[] = [
  {
    id: "elegant-gold",
    name: "Elegant Gold",
    bgColors: ["#1a1a1a", "#0d0d0d"],
    textColor: "#FFFFFF",
    accentColor: "#F5B800",
    borderStyle: "ornate",
    headerText: "Share Your Photos",
    subText: "Scan to upload your memories",
    footerText: "We would love to see your photos!",
  },
  {
    id: "romantic-blush",
    name: "Romantic Blush",
    bgColors: ["#FDF2F4", "#FCE7EB"],
    textColor: "#4A3728",
    accentColor: "#D4A5A5",
    borderStyle: "floral",
    headerText: "Capture the Love",
    subText: "Scan & share your favorite moments",
    footerText: "Thank you for celebrating with us!",
  },
  {
    id: "classic-white",
    name: "Classic White",
    bgColors: ["#FFFFFF", "#F8F8F8"],
    textColor: "#2C2C2C",
    accentColor: "#8B7355",
    borderStyle: "simple",
    headerText: "Photo Album",
    subText: "Scan the QR code to share photos",
    footerText: "Your photos mean the world to us",
  },
  {
    id: "garden-green",
    name: "Garden Green",
    bgColors: ["#F0F5F0", "#E8F0E8"],
    textColor: "#2D4A3E",
    accentColor: "#6B8E6B",
    borderStyle: "floral",
    headerText: "Share the Joy",
    subText: "Scan to add your photos",
    footerText: "Help us remember this day forever",
  },
  {
    id: "midnight-navy",
    name: "Midnight Navy",
    bgColors: ["#1A2744", "#0F1A2E"],
    textColor: "#FFFFFF",
    accentColor: "#F5B800",
    borderStyle: "ornate",
    headerText: "Photo Memories",
    subText: "Scan & upload your snapshots",
    footerText: "Thank you for being part of our story",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    bgColors: ["#FAFAFA", "#F5F5F5"],
    textColor: "#333333",
    accentColor: "#666666",
    borderStyle: "none",
    headerText: "Share Photos",
    subText: "Scan to upload",
    footerText: "",
  },
];

function QRCodeDesignContent({ weddingId }: { weddingId: string }) {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const viewShotRef = useRef<ViewShot>(null);

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  const [selectedTemplate, setSelectedTemplate] = useState<DesignTemplate>(DESIGN_TEMPLATES[0]);
  const [isSaving, setIsSaving] = useState(false);

  const qrValue = wedding?.qrCode || `WEDDING-${weddingId}`;
  const coupleName = wedding?.coupleName || "Our Wedding";
  const weddingDate = wedding?.weddingDate
    ? format(new Date(wedding.weddingDate), "MMMM d, yyyy")
    : "";

  const handleSaveToPhotos = async () => {
    try {
      setIsSaving(true);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission needed", "Please allow access to save photos to your gallery.");
        setIsSaving(false);
        return;
      }

      if (viewShotRef.current?.capture) {
        const uri = await viewShotRef.current.capture();
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("Saved!", "Your QR code design has been saved to your photo library. You can now print it!");
      }
    } catch (error) {
      Alert.alert("Error", "Could not save the image. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      if (viewShotRef.current?.capture) {
        const uri = await viewShotRef.current.capture();
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          await Share.share({ url: uri });
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not share the image. Please try again.");
    }
  };

  const renderBorder = (template: DesignTemplate) => {
    switch (template.borderStyle) {
      case "ornate":
        return (
          <View style={{ position: "absolute", top: 16, left: 16, right: 16, bottom: 16, borderWidth: 2, borderRadius: 8, borderColor: template.accentColor }}>
            <View style={{ position: "absolute", top: -4, left: -4, width: 16, height: 16, borderTopWidth: 3, borderLeftWidth: 3, borderColor: template.accentColor }} />
            <View style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderTopWidth: 3, borderRightWidth: 3, borderColor: template.accentColor }} />
            <View style={{ position: "absolute", bottom: -4, left: -4, width: 16, height: 16, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: template.accentColor }} />
            <View style={{ position: "absolute", bottom: -4, right: -4, width: 16, height: 16, borderBottomWidth: 3, borderRightWidth: 3, borderColor: template.accentColor }} />
          </View>
        );
      case "floral":
        return (
          <View style={{ position: "absolute", top: 12, left: 12, right: 12, bottom: 12 }}>
            <View style={{ position: "absolute", top: 0, left: "50%", transform: [{ translateX: -60 }], flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: template.accentColor, fontSize: 16 }}>✿</Text>
              <View style={{ width: 48, height: 2, marginHorizontal: 4, backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 20 }}>❀</Text>
              <View style={{ width: 48, height: 2, marginHorizontal: 4, backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 16 }}>✿</Text>
            </View>
            <View style={{ position: "absolute", bottom: 0, left: "50%", transform: [{ translateX: -60 }], flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: template.accentColor, fontSize: 16 }}>✿</Text>
              <View style={{ width: 48, height: 2, marginHorizontal: 4, backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 20 }}>❀</Text>
              <View style={{ width: 48, height: 2, marginHorizontal: 4, backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 16 }}>✿</Text>
            </View>
          </View>
        );
      case "simple":
        return (
          <View style={{ position: "absolute", top: 24, left: 24, right: 24, bottom: 24, borderWidth: 1, borderRadius: 8, borderColor: template.accentColor }} />
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      {/* Header */}
      <View
        style={{ paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: "#262626", paddingTop: insets.top + 10 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#262626", alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </Pressable>
          <Text style={{ color: "#F5F5F5", fontSize: 18, fontWeight: "600" }}>Design Your QR Code</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Preview Card */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 24 }}>
          <Text style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 12, textAlign: "center" }}>Preview</Text>

          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
            <View
              style={{ width: SCREEN_WIDTH - 60, aspectRatio: 0.7, borderRadius: 16, overflow: "hidden", alignSelf: "center" }}
            >
              <LinearGradient
                colors={selectedTemplate.bgColors as [string, string]}
                style={{ flex: 1, padding: 24, position: "relative" }}
              >
                {renderBorder(selectedTemplate)}

                {/* Content */}
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 10 }}>
                  {/* Couple Names */}
                  <Text
                    style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 4, color: selectedTemplate.accentColor }}
                  >
                    {coupleName}
                  </Text>

                  {weddingDate ? (
                    <Text
                      style={{ fontSize: 14, marginBottom: 24, color: selectedTemplate.textColor, opacity: 0.7 }}
                    >
                      {weddingDate}
                    </Text>
                  ) : null}

                  {/* Header Text */}
                  <Text
                    style={{ fontSize: 20, fontWeight: "600", textAlign: "center", marginBottom: 8, color: selectedTemplate.textColor }}
                  >
                    {selectedTemplate.headerText}
                  </Text>

                  <Text
                    style={{ fontSize: 14, textAlign: "center", marginBottom: 24, color: selectedTemplate.textColor, opacity: 0.8 }}
                  >
                    {selectedTemplate.subText}
                  </Text>

                  {/* QR Code */}
                  <View
                    style={{ padding: 16, borderRadius: 12, marginBottom: 24, backgroundColor: "#FFFFFF" }}
                  >
                    <QRCode
                      value={qrValue}
                      size={140}
                      color="#000000"
                      backgroundColor="#FFFFFF"
                    />
                  </View>

                  {/* Footer Text */}
                  {selectedTemplate.footerText ? (
                    <Text
                      style={{ fontSize: 14, textAlign: "center", fontStyle: "italic", color: selectedTemplate.textColor, opacity: 0.7 }}
                    >
                      {selectedTemplate.footerText}
                    </Text>
                  ) : null}
                </View>
              </LinearGradient>
            </View>
          </ViewShot>
        </View>

        {/* Template Selection */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ color: "#F5F5F5", fontSize: 18, fontWeight: "600", marginBottom: 16 }}>Choose a Design</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {DESIGN_TEMPLATES.map((template) => (
              <Pressable
                key={template.id}
                onPress={() => setSelectedTemplate(template)}
                style={{
                  marginRight: 12,
                  borderRadius: 12,
                  overflow: "hidden",
                  width: 100,
                  height: 140,
                  borderWidth: selectedTemplate.id === template.id ? 2 : 1,
                  borderColor: selectedTemplate.id === template.id ? "#F5B800" : "#404040",
                }}
              >
                <LinearGradient
                  colors={template.bgColors as [string, string]}
                  style={{ flex: 1, padding: 8, alignItems: "center", justifyContent: "center" }}
                >
                  <View
                    style={{ width: 40, height: 40, borderRadius: 4, alignItems: "center", justifyContent: "center", marginBottom: 8, backgroundColor: "#FFFFFF" }}
                  >
                    <Ionicons name="qr-code" size={24} color="#000" />
                  </View>
                  <Text
                    style={{ fontSize: 12, textAlign: "center", fontWeight: "500", color: template.textColor }}
                    numberOfLines={2}
                  >
                    {template.name}
                  </Text>
                </LinearGradient>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Tips */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View style={{ backgroundColor: "#171717", borderRadius: 16, padding: 20, borderWidth: 1, borderColor: "#262626" }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Ionicons name="bulb" size={20} color="#F5B800" />
              <Text style={{ color: "#F5F5F5", fontWeight: "600", marginLeft: 8 }}>Printing Tips</Text>
            </View>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
              • Print on high-quality cardstock for best results
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
              • Place at the entrance, on each table, or near the guest book
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
              • Consider framing for an elegant display
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20 }}>
              • Test scanning before the big day!
            </Text>
          </View>
        </View>

        <View style={{ height: insets.bottom + 100 }} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#000000", borderTopWidth: 1, borderTopColor: "#262626", paddingHorizontal: 20, paddingTop: 16, paddingBottom: insets.bottom + 16 }}
      >
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={handleShare}
            style={{ flex: 1, backgroundColor: "#262626", borderRadius: 12, paddingVertical: 16, marginRight: 8, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="share-outline" size={20} color="#FFFFFF" />
            <Text style={{ color: "#F5F5F5", fontWeight: "600", marginLeft: 8 }}>Share</Text>
          </Pressable>

          <Pressable
            onPress={handleSaveToPhotos}
            disabled={isSaving}
            style={{ flex: 1, backgroundColor: "#F5B800", borderRadius: 12, paddingVertical: 16, marginLeft: 8, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
          >
            {isSaving ? (
              <Text style={{ color: "#000000", fontWeight: "600" }}>Saving...</Text>
            ) : (
              <>
                <Ionicons name="download-outline" size={20} color="#000000" />
                <Text style={{ color: "#000000", fontWeight: "600", marginLeft: 8 }}>Save to Photos</Text>
              </>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function QRCodeDesignScreen() {
  // Use try-catch pattern to handle NativeWind's static analysis
  let weddingId = "";

  try {
    const route = useRoute();
    weddingId = (route.params as any)?.weddingId ?? "";
  } catch {
    // Ignore navigation context errors during static analysis
  }

  if (!weddingId) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000000", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#9CA3AF" }}>Loading...</Text>
      </View>
    );
  }

  return <QRCodeDesignContent weddingId={weddingId} />;
}
