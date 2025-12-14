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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import useWeddingStore from "../state/weddingStore";
import { format } from "date-fns";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

type Props = NativeStackScreenProps<RootStackParamList, "QRCodeDesign">;

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

export default function QRCodeDesignScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const viewShotRef = useRef<ViewShot>(null);

  const weddingId = route?.params?.weddingId ?? "";
  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  const [selectedTemplate, setSelectedTemplate] = useState<DesignTemplate>(DESIGN_TEMPLATES[0]);
  const [isSaving, setIsSaving] = useState(false);

  const qrValue = wedding?.qrCode || `WEDDING-${weddingId || "preview"}`;
  const coupleName = wedding?.coupleName || "Our Wedding";
  const weddingDate = wedding?.weddingDate
    ? format(new Date(wedding.weddingDate), "MMMM d, yyyy")
    : "";

  // Early return if no valid navigation context
  if (!route?.params?.weddingId) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-neutral-400">Loading...</Text>
      </View>
    );
  }

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
          <View className="absolute inset-4 border-2 rounded-lg" style={{ borderColor: template.accentColor }}>
            {/* Corner decorations */}
            <View className="absolute -top-1 -left-1 w-4 h-4" style={{ borderTopWidth: 3, borderLeftWidth: 3, borderColor: template.accentColor }} />
            <View className="absolute -top-1 -right-1 w-4 h-4" style={{ borderTopWidth: 3, borderRightWidth: 3, borderColor: template.accentColor }} />
            <View className="absolute -bottom-1 -left-1 w-4 h-4" style={{ borderBottomWidth: 3, borderLeftWidth: 3, borderColor: template.accentColor }} />
            <View className="absolute -bottom-1 -right-1 w-4 h-4" style={{ borderBottomWidth: 3, borderRightWidth: 3, borderColor: template.accentColor }} />
          </View>
        );
      case "floral":
        return (
          <View className="absolute inset-3">
            {/* Top floral decoration */}
            <View className="absolute top-0 left-1/2 -translate-x-1/2 flex-row items-center">
              <Text style={{ color: template.accentColor, fontSize: 16 }}>✿</Text>
              <View className="w-12 h-0.5 mx-1" style={{ backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 20 }}>❀</Text>
              <View className="w-12 h-0.5 mx-1" style={{ backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 16 }}>✿</Text>
            </View>
            {/* Bottom floral decoration */}
            <View className="absolute bottom-0 left-1/2 -translate-x-1/2 flex-row items-center">
              <Text style={{ color: template.accentColor, fontSize: 16 }}>✿</Text>
              <View className="w-12 h-0.5 mx-1" style={{ backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 20 }}>❀</Text>
              <View className="w-12 h-0.5 mx-1" style={{ backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 16 }}>✿</Text>
            </View>
          </View>
        );
      case "simple":
        return (
          <View className="absolute inset-6 border rounded-lg" style={{ borderColor: template.accentColor }} />
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View
        className="px-5 pb-4 border-b border-neutral-800"
        style={{ paddingTop: insets.top + 10 }}
      >
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => navigation?.goBack?.()}
            className="w-10 h-10 rounded-full bg-neutral-800 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </Pressable>
          <Text className="text-neutral-100 text-lg font-semibold">Design Your QR Code</Text>
          <View className="w-10" />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Preview Card */}
        <View className="px-5 py-6">
          <Text className="text-neutral-400 text-sm mb-3 text-center">Preview</Text>

          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
            <View
              className="mx-auto rounded-2xl overflow-hidden"
              style={{ width: SCREEN_WIDTH - 60, aspectRatio: 0.7 }}
            >
              <LinearGradient
                colors={selectedTemplate.bgColors as [string, string]}
                style={{ flex: 1, padding: 24, position: "relative" }}
              >
                {renderBorder(selectedTemplate)}

                {/* Content */}
                <View className="flex-1 items-center justify-center z-10">
                  {/* Couple Names */}
                  <Text
                    className="text-2xl font-bold text-center mb-1"
                    style={{ color: selectedTemplate.accentColor, fontFamily: "serif" }}
                  >
                    {coupleName}
                  </Text>

                  {weddingDate && (
                    <Text
                      className="text-sm mb-6"
                      style={{ color: selectedTemplate.textColor, opacity: 0.7 }}
                    >
                      {weddingDate}
                    </Text>
                  )}

                  {/* Header Text */}
                  <Text
                    className="text-xl font-semibold text-center mb-2"
                    style={{ color: selectedTemplate.textColor }}
                  >
                    {selectedTemplate.headerText}
                  </Text>

                  <Text
                    className="text-sm text-center mb-6"
                    style={{ color: selectedTemplate.textColor, opacity: 0.8 }}
                  >
                    {selectedTemplate.subText}
                  </Text>

                  {/* QR Code */}
                  <View
                    className="p-4 rounded-xl mb-6"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <QRCode
                      value={qrValue}
                      size={140}
                      color="#000000"
                      backgroundColor="#FFFFFF"
                    />
                  </View>

                  {/* Footer Text */}
                  {selectedTemplate.footerText && (
                    <Text
                      className="text-sm text-center italic"
                      style={{ color: selectedTemplate.textColor, opacity: 0.7 }}
                    >
                      {selectedTemplate.footerText}
                    </Text>
                  )}
                </View>
              </LinearGradient>
            </View>
          </ViewShot>
        </View>

        {/* Template Selection */}
        <View className="px-5 mb-6">
          <Text className="text-neutral-100 text-lg font-semibold mb-4">Choose a Design</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {DESIGN_TEMPLATES.map((template) => (
              <Pressable
                key={template.id}
                onPress={() => setSelectedTemplate(template)}
                className={`mr-3 rounded-xl overflow-hidden ${
                  selectedTemplate.id === template.id ? "border-2 border-[#F5B800]" : "border border-neutral-700"
                }`}
                style={{ width: 100, height: 140 }}
              >
                <LinearGradient
                  colors={template.bgColors as [string, string]}
                  style={{ flex: 1, padding: 8, alignItems: "center", justifyContent: "center" }}
                >
                  <View
                    className="w-10 h-10 rounded items-center justify-center mb-2"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <Ionicons name="qr-code" size={24} color="#000" />
                  </View>
                  <Text
                    className="text-xs text-center font-medium"
                    style={{ color: template.textColor }}
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
        <View className="px-5 mb-6">
          <View className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800">
            <View className="flex-row items-center mb-3">
              <Ionicons name="bulb" size={20} color="#F5B800" />
              <Text className="text-neutral-100 font-semibold ml-2">Printing Tips</Text>
            </View>
            <Text className="text-neutral-400 text-sm leading-5 mb-2">
              • Print on high-quality cardstock for best results
            </Text>
            <Text className="text-neutral-400 text-sm leading-5 mb-2">
              • Place at the entrance, on each table, or near the guest book
            </Text>
            <Text className="text-neutral-400 text-sm leading-5 mb-2">
              • Consider framing for an elegant display
            </Text>
            <Text className="text-neutral-400 text-sm leading-5">
              • Test scanning before the big day!
            </Text>
          </View>
        </View>

        <View style={{ height: insets.bottom + 100 }} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-black border-t border-neutral-800 px-5 pt-4"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="flex-row">
          <Pressable
            onPress={handleShare}
            className="flex-1 bg-neutral-800 rounded-xl py-4 mr-2 flex-row items-center justify-center active:opacity-80"
          >
            <Ionicons name="share-outline" size={20} color="#FFFFFF" />
            <Text className="text-neutral-100 font-semibold ml-2">Share</Text>
          </Pressable>

          <Pressable
            onPress={handleSaveToPhotos}
            disabled={isSaving}
            className="flex-1 bg-[#F5B800] rounded-xl py-4 ml-2 flex-row items-center justify-center active:opacity-80"
          >
            {isSaving ? (
              <Text className="text-black font-semibold">Saving...</Text>
            ) : (
              <>
                <Ionicons name="download-outline" size={20} color="#000000" />
                <Text className="text-black font-semibold ml-2">Save to Photos</Text>
              </>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
