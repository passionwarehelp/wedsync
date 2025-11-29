import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

type GuestUploadRouteProp = RouteProp<RootStackParamList, "GuestUpload">;

export default function GuestUploadScreen() {
  const route = useRoute<GuestUploadRouteProp>();
  const { qrCode } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.qrCode === qrCode));
  const addPhoto = useWeddingStore((s) => s.addPhoto);

  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your photos to upload them.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && wedding) {
      setUploading(true);
      const newPhotos: string[] = [];

      for (const asset of result.assets) {
        const photo = {
          id: Date.now().toString() + Math.random(),
          weddingId: wedding.id,
          uri: asset.uri,
          uploadedBy: "guest" as const,
          uploadedAt: new Date().toISOString(),
          isFavorite: false,
          isApproved: false,
        };
        addPhoto(photo);
        newPhotos.push(asset.uri);
      }

      setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
      setUploading(false);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your camera to take photos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled && wedding) {
      setUploading(true);
      const photo = {
        id: Date.now().toString(),
        weddingId: wedding.id,
        uri: result.assets[0].uri,
        uploadedBy: "guest" as const,
        uploadedAt: new Date().toISOString(),
        isFavorite: false,
        isApproved: false,
      };
      addPhoto(photo);
      setUploadedPhotos([...uploadedPhotos, result.assets[0].uri]);
      setUploading(false);
    }
  };

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="close-circle-outline" size={80} color="#EF4444" />
          <Text className="text-neutral-100 text-2xl font-bold mt-6 text-center">Invalid QR Code</Text>
          <Text className="text-neutral-400 text-base mt-3 text-center">
            This QR code is not associated with any wedding.
          </Text>
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
        <View className="items-center mb-6">
          <Ionicons name="camera" size={48} color="#C9A961" />
          <Text className="text-[#C9A961] text-3xl font-bold mt-4 text-center">{wedding.coupleName}</Text>
          <Text className="text-neutral-400 text-base mt-2 text-center">
            Share your photos from the celebration
          </Text>
        </View>

        <View className="flex-row space-x-3">
          <Pressable
            onPress={takePhoto}
            disabled={uploading}
            className="flex-1 bg-[#C9A961] rounded-2xl py-4 items-center active:opacity-70"
          >
            <Ionicons name="camera-outline" size={28} color="#000000" />
            <Text className="text-black text-base font-semibold mt-2">Take Photo</Text>
          </Pressable>

          <Pressable
            onPress={pickImage}
            disabled={uploading}
            className="flex-1 bg-neutral-800 rounded-2xl py-4 items-center border border-neutral-700 active:opacity-70"
          >
            <Ionicons name="images-outline" size={28} color="#C9A961" />
            <Text className="text-neutral-100 text-base font-semibold mt-2">Choose Photos</Text>
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {uploading && (
          <View className="bg-neutral-900 rounded-2xl p-6 mb-4 border border-neutral-800">
            <View className="flex-row items-center">
              <Ionicons name="cloud-upload-outline" size={24} color="#C9A961" />
              <Text className="text-neutral-100 text-base ml-3 font-medium">Uploading photos...</Text>
            </View>
          </View>
        )}

        {uploadedPhotos.length > 0 && (
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-neutral-100 text-xl font-bold">Your Uploads</Text>
              <View className="bg-emerald-900 px-3 py-1 rounded-full">
                <Text className="text-emerald-400 text-sm font-medium">{uploadedPhotos.length} photos</Text>
              </View>
            </View>

            <View className="flex-row flex-wrap">
              {uploadedPhotos.map((uri, index) => (
                <View key={index} className="w-[31%] aspect-square mr-[3.5%] mb-3 rounded-xl overflow-hidden">
                  <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
                  <View className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1">
                    <Ionicons name="checkmark" size={14} color="white" />
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {uploadedPhotos.length === 0 && !uploading && (
          <View className="items-center justify-center py-20 px-8">
            <Ionicons name="images-outline" size={64} color="#404040" />
            <Text className="text-neutral-500 text-lg mt-4 text-center">No photos uploaded yet</Text>
            <Text className="text-neutral-600 text-sm mt-2 text-center">
              Tap the buttons above to add your photos to the wedding gallery
            </Text>
          </View>
        )}

        <View className="bg-neutral-900 rounded-2xl p-5 mb-8 border border-neutral-800">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={20} color="#C9A961" />
            <View className="flex-1 ml-3">
              <Text className="text-neutral-300 text-sm leading-5">
                Your photos will be added to the wedding gallery for the couple and all guests to enjoy.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
