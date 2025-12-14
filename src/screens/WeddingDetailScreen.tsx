import React from "react";
import { View, Text, Pressable, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type WeddingDetailRouteProp = RouteProp<RootStackParamList, "WeddingDetail">;

export default function WeddingDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<WeddingDetailRouteProp>();
  const { weddingId } = route.params;

  // Use individual selector to avoid infinite loops
  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));
  const updateWedding = useWeddingStore((s) => s.updateWedding);

  const handleToggleQRCode = () => {
    if (wedding) {
      updateWedding(weddingId, { qrCodeEnabled: !wedding.qrCodeEnabled });
    }
  };

  const handleTogglePhotoAlbum = () => {
    if (wedding) {
      updateWedding(weddingId, { photoAlbumLive: !wedding.photoAlbumLive });
    }
  };

  const handleTogglePhotoFrame = () => {
    if (wedding) {
      updateWedding(weddingId, { photoFrameEnabled: !wedding.photoFrameEnabled });
    }
  };

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">Wedding not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <Text className="text-[#F5B800] text-3xl font-bold mb-2">{wedding.coupleName}</Text>
        <Text className="text-neutral-400 text-lg mb-4">
          {wedding.partnerOneName} & {wedding.partnerTwoName}
        </Text>

        <View className="flex-row items-center">
          <Ionicons name="calendar" size={18} color="#F5B800" />
          <Text className="text-neutral-300 text-base ml-2">
            {format(new Date(wedding.weddingDate), "MMMM d, yyyy")}
          </Text>
        </View>

        {wedding.venue && (
          <View className="flex-row items-center mt-2">
            <Ionicons name="location" size={18} color="#F5B800" />
            <Text className="text-neutral-300 text-base ml-2">{wedding.venue}</Text>
          </View>
        )}
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <View className="pb-8">
          {/* QR Code Album Toggle */}
          <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3">Guest Photo Uploads</Text>

          <View className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 mb-3">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="qr-code" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">QR Code Album</Text>
                <Text className="text-neutral-500 text-sm mt-1">
                  {wedding.qrCodeEnabled ? "Guests can upload photos" : "Disabled for guests"}
                </Text>
              </View>
              <Switch
                value={wedding.qrCodeEnabled}
                onValueChange={handleToggleQRCode}
                trackColor={{ false: "#404040", true: "#F5B800" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* QR Code View Button - Only show when enabled */}
          {wedding.qrCodeEnabled && (
            <Pressable
              onPress={() => navigation.navigate("QRCode", { weddingId })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="share-outline" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">View & Share QR Code</Text>
                <Text className="text-neutral-500 text-sm mt-1">Share with guests to collect photos</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          )}

          {/* Photo Frame Toggle */}
          <View className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 mb-6">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="tablet-landscape-outline" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Photo Frame</Text>
                <Text className="text-neutral-500 text-sm mt-1">
                  {wedding.photoFrameEnabled ? "Digital frame display active" : "Disabled"}
                </Text>
              </View>
              <Switch
                value={wedding.photoFrameEnabled}
                onValueChange={handleTogglePhotoFrame}
                trackColor={{ false: "#404040", true: "#F5B800" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Photo Album Section */}
          <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3">Your Photo Album</Text>

          {/* Photo Album Live Toggle */}
          <View className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 mb-3">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="eye-outline" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Album Visibility</Text>
                <Text className="text-neutral-500 text-sm mt-1">
                  {wedding.photoAlbumLive ? "Couple can view your photos" : "Photos hidden from couple"}
                </Text>
              </View>
              <Switch
                value={wedding.photoAlbumLive}
                onValueChange={handleTogglePhotoAlbum}
                trackColor={{ false: "#404040", true: "#F5B800" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Upload Photos Button */}
          <Pressable
            onPress={() => navigation.navigate("PhotographerUpload", { weddingId })}
            className="bg-[#F5B800] rounded-2xl p-5 flex-row items-center justify-center mb-3 active:opacity-70"
          >
            <Ionicons name="camera" size={24} color="#000000" />
            <Text className="text-black text-lg font-semibold ml-3">Upload Photos</Text>
          </Pressable>

          {/* View Gallery Button */}
          <Pressable
            onPress={() => navigation.navigate("PhotoGallery", { weddingId })}
            className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 active:opacity-70"
          >
            <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
              <Ionicons name="images" size={24} color="#F5B800" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-neutral-100 text-lg font-medium">View Gallery</Text>
              <Text className="text-neutral-500 text-sm mt-1">Manage uploaded photos</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
