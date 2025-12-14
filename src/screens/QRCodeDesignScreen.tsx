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
const CARD_WIDTH = SCREEN_WIDTH - 60;

interface DesignTemplate {
  id: string;
  name: string;
  bgColors: string[];
  textColor: string;
  accentColor: string;
  secondaryAccent: string;
  style: "classic" | "romantic" | "modern" | "rustic" | "elegant" | "whimsical";
  headerText: string;
  subText: string;
  footerText: string;
}

const DESIGN_TEMPLATES: DesignTemplate[] = [
  {
    id: "timeless-gold",
    name: "Timeless Gold",
    bgColors: ["#0F0F0F", "#1A1A1A"],
    textColor: "#FFFFFF",
    accentColor: "#F5B800",
    secondaryAccent: "#D4A574",
    style: "elegant",
    headerText: "Share the Love",
    subText: "Scan to capture your favorite moments",
    footerText: "Thank you for celebrating with us",
  },
  {
    id: "romantic-rose",
    name: "Romantic Rose",
    bgColors: ["#FFF5F5", "#FFE4E8"],
    textColor: "#5C3D3D",
    accentColor: "#C77D7D",
    secondaryAccent: "#E8B4B8",
    style: "romantic",
    headerText: "Capture the Magic",
    subText: "Share your photos with the happy couple",
    footerText: "Forever & Always",
  },
  {
    id: "ivory-elegance",
    name: "Ivory Elegance",
    bgColors: ["#FFFEF7", "#FBF8F1"],
    textColor: "#3D3D3D",
    accentColor: "#B8997A",
    secondaryAccent: "#D4C5B0",
    style: "classic",
    headerText: "Photo Memories",
    subText: "Scan to share your snapshots",
    footerText: "With Love & Gratitude",
  },
  {
    id: "sage-garden",
    name: "Sage Garden",
    bgColors: ["#F5F7F4", "#E8EDE5"],
    textColor: "#3D4A3D",
    accentColor: "#6B7F6B",
    secondaryAccent: "#A8B8A8",
    style: "rustic",
    headerText: "Share Your Joy",
    subText: "Help us remember this beautiful day",
    footerText: "Growing Together in Love",
  },
  {
    id: "midnight-glamour",
    name: "Midnight Glamour",
    bgColors: ["#1A1F3D", "#0D1129"],
    textColor: "#FFFFFF",
    accentColor: "#F5B800",
    secondaryAccent: "#A8936A",
    style: "modern",
    headerText: "Capture Every Moment",
    subText: "Your photos mean the world to us",
    footerText: "A Night to Remember",
  },
  {
    id: "blush-whimsy",
    name: "Blush Whimsy",
    bgColors: ["#FDF2F8", "#FCE7F3"],
    textColor: "#6B4E5C",
    accentColor: "#DB7093",
    secondaryAccent: "#F0B6C8",
    style: "whimsical",
    headerText: "Happily Ever After",
    subText: "Scan & share your favorite shots",
    footerText: "Love, Laughter & Memories",
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

  const renderDecoration = (template: DesignTemplate, position: "top" | "bottom") => {
    const isTop = position === "top";

    switch (template.style) {
      case "elegant":
        return (
          <View style={{ alignItems: "center", marginBottom: isTop ? 16 : 0, marginTop: isTop ? 0 : 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 40, height: 1, backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 18, marginHorizontal: 12 }}>✦</Text>
              <View style={{ width: 20, height: 1, backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 14, marginHorizontal: 8 }}>♥</Text>
              <View style={{ width: 20, height: 1, backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 18, marginHorizontal: 12 }}>✦</Text>
              <View style={{ width: 40, height: 1, backgroundColor: template.accentColor }} />
            </View>
          </View>
        );

      case "romantic":
        return (
          <View style={{ alignItems: "center", marginBottom: isTop ? 12 : 0, marginTop: isTop ? 0 : 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: template.secondaryAccent, fontSize: 16 }}>❀</Text>
              <View style={{ width: 30, height: 1, backgroundColor: template.secondaryAccent, marginHorizontal: 6 }} />
              <Text style={{ color: template.accentColor, fontSize: 20 }}>♥</Text>
              <View style={{ width: 30, height: 1, backgroundColor: template.secondaryAccent, marginHorizontal: 6 }} />
              <Text style={{ color: template.secondaryAccent, fontSize: 16 }}>❀</Text>
            </View>
          </View>
        );

      case "classic":
        return (
          <View style={{ alignItems: "center", marginBottom: isTop ? 16 : 0, marginTop: isTop ? 0 : 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 50, height: 1, backgroundColor: template.accentColor }} />
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: template.accentColor,
                marginHorizontal: 10
              }} />
              <View style={{ width: 50, height: 1, backgroundColor: template.accentColor }} />
            </View>
          </View>
        );

      case "rustic":
        return (
          <View style={{ alignItems: "center", marginBottom: isTop ? 12 : 0, marginTop: isTop ? 0 : 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: template.accentColor, fontSize: 14 }}>✿</Text>
              <View style={{ width: 25, height: 1, backgroundColor: template.secondaryAccent, marginHorizontal: 8 }} />
              <Text style={{ color: template.accentColor, fontSize: 18 }}>❧</Text>
              <View style={{ width: 25, height: 1, backgroundColor: template.secondaryAccent, marginHorizontal: 8 }} />
              <Text style={{ color: template.accentColor, fontSize: 14 }}>✿</Text>
            </View>
          </View>
        );

      case "modern":
        return (
          <View style={{ alignItems: "center", marginBottom: isTop ? 16 : 0, marginTop: isTop ? 0 : 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 60, height: 2, backgroundColor: template.accentColor }} />
              <View style={{
                width: 10,
                height: 10,
                transform: [{ rotate: "45deg" }],
                backgroundColor: template.accentColor,
                marginHorizontal: 12
              }} />
              <View style={{ width: 60, height: 2, backgroundColor: template.accentColor }} />
            </View>
          </View>
        );

      case "whimsical":
        return (
          <View style={{ alignItems: "center", marginBottom: isTop ? 12 : 0, marginTop: isTop ? 0 : 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: template.secondaryAccent, fontSize: 14 }}>♡</Text>
              <Text style={{ color: template.accentColor, fontSize: 12, marginHorizontal: 6 }}>✦</Text>
              <Text style={{ color: template.secondaryAccent, fontSize: 18 }}>♡</Text>
              <Text style={{ color: template.accentColor, fontSize: 12, marginHorizontal: 6 }}>✦</Text>
              <Text style={{ color: template.secondaryAccent, fontSize: 14 }}>♡</Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const renderBorder = (template: DesignTemplate) => {
    switch (template.style) {
      case "elegant":
      case "modern":
        return (
          <View style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            borderWidth: 2,
            borderColor: template.accentColor,
            borderRadius: 4
          }}>
            {/* Corner accents */}
            <View style={{ position: "absolute", top: -6, left: -6, width: 12, height: 12, borderTopWidth: 3, borderLeftWidth: 3, borderColor: template.accentColor }} />
            <View style={{ position: "absolute", top: -6, right: -6, width: 12, height: 12, borderTopWidth: 3, borderRightWidth: 3, borderColor: template.accentColor }} />
            <View style={{ position: "absolute", bottom: -6, left: -6, width: 12, height: 12, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: template.accentColor }} />
            <View style={{ position: "absolute", bottom: -6, right: -6, width: 12, height: 12, borderBottomWidth: 3, borderRightWidth: 3, borderColor: template.accentColor }} />
          </View>
        );

      case "romantic":
      case "whimsical":
        return (
          <View style={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            bottom: 16,
            borderWidth: 1,
            borderColor: template.secondaryAccent,
            borderRadius: 16,
            borderStyle: "dashed"
          }} />
        );

      case "classic":
        return (
          <View style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            borderWidth: 1,
            borderColor: template.accentColor,
          }}>
            {/* Inner border */}
            <View style={{
              position: "absolute",
              top: 4,
              left: 4,
              right: 4,
              bottom: 4,
              borderWidth: 1,
              borderColor: template.secondaryAccent,
            }} />
          </View>
        );

      case "rustic":
        return (
          <View style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            borderWidth: 2,
            borderColor: template.secondaryAccent,
            borderRadius: 8
          }} />
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
            <View style={{ width: CARD_WIDTH, aspectRatio: 0.7, borderRadius: 0, overflow: "hidden", alignSelf: "center" }}>
              <LinearGradient
                colors={selectedTemplate.bgColors as [string, string]}
                style={{ flex: 1, padding: 32, position: "relative" }}
              >
                {renderBorder(selectedTemplate)}

                {/* Content - Centered */}
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 10 }}>

                  {/* Top Decoration */}
                  {renderDecoration(selectedTemplate, "top")}

                  {/* Couple Names */}
                  <Text
                    style={{
                      fontSize: 26,
                      fontWeight: "700",
                      textAlign: "center",
                      marginBottom: 4,
                      color: selectedTemplate.accentColor,
                      letterSpacing: 1
                    }}
                  >
                    {coupleName}
                  </Text>

                  {weddingDate ? (
                    <Text
                      style={{
                        fontSize: 13,
                        marginBottom: 20,
                        color: selectedTemplate.textColor,
                        opacity: 0.7,
                        letterSpacing: 0.5
                      }}
                    >
                      {weddingDate}
                    </Text>
                  ) : null}

                  {/* Header Text */}
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      textAlign: "center",
                      marginBottom: 6,
                      color: selectedTemplate.textColor,
                      letterSpacing: 0.5
                    }}
                  >
                    {selectedTemplate.headerText}
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      marginBottom: 20,
                      color: selectedTemplate.textColor,
                      opacity: 0.75,
                      paddingHorizontal: 16
                    }}
                  >
                    {selectedTemplate.subText}
                  </Text>

                  {/* QR Code with elegant frame */}
                  <View
                    style={{
                      padding: 12,
                      backgroundColor: "#FFFFFF",
                      borderRadius: 8,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.15,
                      shadowRadius: 8,
                      elevation: 8,
                      marginBottom: 20
                    }}
                  >
                    <View style={{
                      padding: 4,
                      borderWidth: 1,
                      borderColor: selectedTemplate.secondaryAccent,
                      borderRadius: 4
                    }}>
                      <QRCode
                        value={qrValue}
                        size={130}
                        color="#1A1A1A"
                        backgroundColor="#FFFFFF"
                      />
                    </View>
                  </View>

                  {/* Footer Text */}
                  {selectedTemplate.footerText ? (
                    <Text
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                        fontStyle: "italic",
                        color: selectedTemplate.textColor,
                        opacity: 0.6,
                        letterSpacing: 0.5
                      }}
                    >
                      {selectedTemplate.footerText}
                    </Text>
                  ) : null}

                  {/* Bottom Decoration */}
                  {renderDecoration(selectedTemplate, "bottom")}
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
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 4,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                      backgroundColor: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: template.secondaryAccent
                    }}
                  >
                    <Ionicons name="qr-code" size={20} color="#1A1A1A" />
                  </View>
                  <Text
                    style={{ fontSize: 11, textAlign: "center", fontWeight: "600", color: template.textColor }}
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
              • Print on premium cardstock (110lb or higher) for best results
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
              • Use a professional print service for crisp, vibrant colors
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
              • Place at the entrance, on each table, or near the guest book
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
              • Consider elegant frames or acrylic stands for display
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20 }}>
              • Always test the QR code scanning before the big day!
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
