import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import usePhotoStore from "../state/photoStore";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { uploadMediaBatch, isVideoFile, MediaType } from "../api/r2-upload";

type GuestUploadRouteProp = RouteProp<RootStackParamList, "GuestUpload">;

interface UploadedMedia {
  uri: string;
  thumbnailUri?: string;
  mediaType: MediaType;
}

export default function GuestUploadScreen() {
  const route = useRoute<GuestUploadRouteProp>();
  const { qrCode } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.qrCode === qrCode));
  const addPhoto = usePhotoStore((s) => s.addPhoto);

  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ completed: 0, total: 0 });

  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your photos and videos to upload them.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      quality: 0.8,
      videoMaxDuration: 60,
    });

    if (!result.canceled && wedding) {
      setUploading(true);
      setUploadProgress({ completed: 0, total: result.assets.length });

      try {
        // Upload media to R2 via Worker
        const uploadResults = await uploadMediaBatch(
          wedding.id,
          result.assets.map((asset) => ({
            uri: asset.uri,
            mediaType: isVideoFile(asset.uri, asset.type) ? "video" : "photo",
          })),
          (completed, total) => {
            setUploadProgress({ completed, total });
          }
        );

        // Add successful uploads to photo store and local state
        const newMedia: UploadedMedia[] = [];
        for (let i = 0; i < uploadResults.length; i++) {
          const uploadResult = uploadResults[i];
          if (uploadResult.success && uploadResult.publicUrl) {
            const asset = result.assets[i];
            const photo = {
              id: Date.now().toString() + Math.random(),
              weddingId: wedding.id,
              uri: uploadResult.publicUrl,
              thumbnailUri: asset.uri,
              mediaType: uploadResult.mediaType || "photo",
              uploadedBy: "guest" as const,
              uploadedAt: new Date().toISOString(),
              isFavorite: false,
              isApproved: false,
            };
            addPhoto(photo);
            newMedia.push({
              uri: asset.uri,
              thumbnailUri: asset.uri,
              mediaType: uploadResult.mediaType || "photo",
            });
          }
        }

        setUploadedMedia([...uploadedMedia, ...newMedia]);
      } catch (error) {
        console.error("Upload error:", error);
        Alert.alert("Upload Failed", "There was an error uploading your media. Please try again.");
      } finally {
        setUploading(false);
        setUploadProgress({ completed: 0, total: 0 });
      }
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
      setUploadProgress({ completed: 0, total: 1 });

      try {
        const asset = result.assets[0];
        // Upload to R2 via Worker
        const uploadResults = await uploadMediaBatch(
          wedding.id,
          [{ uri: asset.uri, mediaType: "photo" }],
          (completed, total) => {
            setUploadProgress({ completed, total });
          }
        );

        if (uploadResults[0].success && uploadResults[0].publicUrl) {
          const photo = {
            id: Date.now().toString(),
            weddingId: wedding.id,
            uri: uploadResults[0].publicUrl,
            thumbnailUri: asset.uri,
            mediaType: "photo" as const,
            uploadedBy: "guest" as const,
            uploadedAt: new Date().toISOString(),
            isFavorite: false,
            isApproved: false,
          };
          addPhoto(photo);
          setUploadedMedia([
            ...uploadedMedia,
            { uri: asset.uri, thumbnailUri: asset.uri, mediaType: "photo" },
          ]);
        }
      } catch (error) {
        console.error("Upload error:", error);
        Alert.alert("Upload Failed", "There was an error uploading your photo. Please try again.");
      } finally {
        setUploading(false);
        setUploadProgress({ completed: 0, total: 0 });
      }
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

        <View className="flex-row">
          <Pressable
            onPress={takePhoto}
            disabled={uploading}
            className="flex-1 bg-[#C9A961] rounded-2xl py-4 items-center active:opacity-70 mr-3"
          >
            <Ionicons name="camera-outline" size={28} color="#000000" />
            <Text className="text-black text-base font-semibold mt-2">Take Photo</Text>
          </Pressable>

          <Pressable
            onPress={pickMedia}
            disabled={uploading}
            className="flex-1 bg-neutral-800 rounded-2xl py-4 items-center border border-neutral-700 active:opacity-70"
          >
            <Ionicons name="images-outline" size={28} color="#C9A961" />
            <Text className="text-neutral-100 text-base font-semibold mt-2">Choose Media</Text>
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {uploading && (
          <View className="bg-neutral-900 rounded-2xl p-6 mb-4 border border-neutral-800">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center flex-1">
                <Ionicons name="cloud-upload-outline" size={24} color="#C9A961" />
                <Text className="text-neutral-100 text-base ml-3 font-medium">
                  Uploading to cloud...
                </Text>
              </View>
            </View>
            {uploadProgress.total > 0 && (
              <View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-neutral-400 text-sm">
                    {uploadProgress.completed} of {uploadProgress.total}
                  </Text>
                  <Text className="text-neutral-400 text-sm">
                    {Math.round((uploadProgress.completed / uploadProgress.total) * 100)}%
                  </Text>
                </View>
                <View className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-[#C9A961]"
                    style={{
                      width: `${(uploadProgress.completed / uploadProgress.total) * 100}%`,
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        )}

        {uploadedMedia.length > 0 && (
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-neutral-100 text-xl font-bold">Your Uploads</Text>
              <View className="bg-emerald-900 px-3 py-1 rounded-full">
                <Text className="text-emerald-400 text-sm font-medium">
                  {uploadedMedia.length} {uploadedMedia.length === 1 ? "item" : "items"}
                </Text>
              </View>
            </View>

            <View className="flex-row flex-wrap">
              {uploadedMedia.map((item, index) => (
                <View key={index} className="w-[31%] aspect-square mr-[3.5%] mb-3 rounded-xl overflow-hidden">
                  <Image source={{ uri: item.uri }} className="w-full h-full" resizeMode="cover" />
                  {item.mediaType === "video" && (
                    <View className="absolute inset-0 items-center justify-center">
                      <View className="w-10 h-10 bg-black/60 rounded-full items-center justify-center">
                        <Ionicons name="play" size={20} color="#FFFFFF" />
                      </View>
                    </View>
                  )}
                  <View className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1">
                    <Ionicons name="checkmark" size={14} color="white" />
                  </View>
                  {item.mediaType === "video" && (
                    <View className="absolute bottom-2 left-2 bg-black/60 px-1.5 py-0.5 rounded">
                      <Text className="text-white text-[10px] font-medium">VIDEO</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {uploadedMedia.length === 0 && !uploading && (
          <View className="items-center justify-center py-20 px-8">
            <Ionicons name="images-outline" size={64} color="#404040" />
            <Text className="text-neutral-500 text-lg mt-4 text-center">No media uploaded yet</Text>
            <Text className="text-neutral-600 text-sm mt-2 text-center">
              Tap the buttons above to add your photos and videos to the wedding gallery
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
