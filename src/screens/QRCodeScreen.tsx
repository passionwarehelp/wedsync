import React from "react";
import { View, Text, Pressable, ScrollView, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type QRCodeRouteProp = RouteProp<RootStackParamList, "QRCode">;

export default function QRCodeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<QRCodeRouteProp>();
  const { weddingId } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">Wedding not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // TEMPORARY: Using Worker default URL until custom domain propagates
  // TODO: Change back to https://upload.mywedsync.com/${wedding.qrCode} once DNS is set up
  const uploadUrl = `https://wedsync-guest-upload.passionwarehelp.workers.dev/${wedding.qrCode}`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Upload your photos for ${wedding.coupleName}'s wedding!\n\nScan the QR code or visit: ${uploadUrl}`,
        title: "WedSync Photo Upload",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#C9A961" />
        </Pressable>

        <Text className="text-[#C9A961] text-3xl font-bold mb-2">QR Code</Text>
        <Text className="text-neutral-400 text-base">Guest Photo Upload</Text>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <View className="items-center py-8">
          <View className="bg-white p-8 rounded-3xl shadow-lg">
            <QRCode value={uploadUrl} size={250} backgroundColor="white" color="#000000" />
          </View>

          <Text className="text-neutral-300 text-xl font-semibold mt-8 mb-2 text-center">
            {wedding.coupleName}
          </Text>
          <Text className="text-neutral-500 text-sm text-center px-8">
            Guests can scan this QR code to upload photos from their phones
          </Text>
        </View>

        <View className="bg-neutral-900 rounded-2xl p-6 mb-6 border border-neutral-800">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-[#C9A961]/10 rounded-full items-center justify-center mr-3">
              <Ionicons name="camera" size={20} color="#C9A961" />
            </View>
            <Text className="text-neutral-100 text-lg font-semibold flex-1">How it works</Text>
          </View>

          <View>
            <View className="flex-row mb-4">
              <Text className="text-[#C9A961] font-bold mr-3">1.</Text>
              <Text className="text-neutral-300 flex-1">
                Print this QR code and display it at your event
              </Text>
            </View>
            <View className="flex-row mb-4">
              <Text className="text-[#C9A961] font-bold mr-3">2.</Text>
              <Text className="text-neutral-300 flex-1">
                Guests scan with their phone camera
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-[#C9A961] font-bold mr-3">3.</Text>
              <Text className="text-neutral-300 flex-1">
                Photos upload directly to your wedding gallery
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={handleShare}
          className="bg-[#C9A961] rounded-2xl p-5 flex-row items-center justify-center mb-4"
        >
          <Ionicons name="share-outline" size={24} color="#000000" />
          <Text className="text-black text-lg font-semibold ml-3">Share QR Code</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("GuestUpload", { qrCode: wedding.qrCode })}
          className="bg-neutral-800 rounded-2xl p-5 flex-row items-center justify-center mb-8 border border-neutral-700"
        >
          <Ionicons name="eye-outline" size={24} color="#C9A961" />
          <Text className="text-neutral-100 text-lg font-semibold ml-3">Test Guest View</Text>
        </Pressable>

        <View className="bg-neutral-900/50 rounded-2xl p-4 mb-8 border border-neutral-800/50">
          <Text className="text-neutral-400 text-xs text-center">QR Code: {wedding.qrCode}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
