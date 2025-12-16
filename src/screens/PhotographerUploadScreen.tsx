import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import usePhotoStore from "../state/photoStore";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { uploadMediaBatch, isVideoFile, MediaType } from "../api/r2-upload";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PhotographerUploadRouteProp = RouteProp<RootStackParamList, "PhotographerUpload">;

interface SelectedMedia {
  uri: string;
  id: string;
  mediaType: MediaType;
}

export default function PhotographerUploadScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PhotographerUploadRouteProp>();
  const { weddingId } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));
  const addPhoto = usePhotoStore((s) => s.addPhoto);

  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">Wedding not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const pickMedia = async (type: "images" | "videos" | "all") => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant photo library access to upload media.",
          [{ text: "OK" }]
        );
        return;
      }

      const mediaTypes: ImagePicker.MediaType[] =
        type === "images" ? ["images"] : type === "videos" ? ["videos"] : ["images", "videos"];

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 20,
        videoMaxDuration: 60,
      });

      if (!result.canceled && result.assets) {
        const newMedia: SelectedMedia[] = result.assets.map((asset) => ({
          uri: asset.uri,
          id: Math.random().toString(36).substring(2, 15),
          mediaType: asset.type === "video" || isVideoFile(asset.uri) ? "video" : "photo",
        }));
        setSelectedMedia((prev) => [...prev, ...newMedia]);
      }
    } catch (error) {
      console.error("Media picker error:", error);
      Alert.alert("Error", "Failed to select media. Please try again.", [{ text: "OK" }]);
    }
  };

  const removeMedia = (id: string) => {
    setSelectedMedia((prev) => prev.filter((m) => m.id !== id));
  };

  const uploadMedia = async () => {
    if (selectedMedia.length === 0) {
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const files = selectedMedia.map((m) => ({
        uri: m.uri,
        mediaType: m.mediaType,
      }));

      const results = await uploadMediaBatch(weddingId, files, (completed, total) => {
        setUploadProgress((completed / total) * 100);
      });

      let successCount = 0;
      let failCount = 0;

      results.forEach((result, index) => {
        if (result.success && result.publicUrl) {
          addPhoto({
            id: `media_${Date.now()}_${index}`,
            weddingId,
            uri: result.publicUrl,
            mediaType: result.mediaType || "photo",
            uploadedBy: "pro",
            uploadedByName: "Media Pro",
            uploadedAt: new Date().toISOString(),
            isFavorite: false,
            isApproved: true,
          });
          successCount++;
        } else {
          failCount++;
          console.error("Upload failed for item:", result.error);
        }
      });

      setTimeout(() => {
        setUploading(false);

        if (failCount > 0 && successCount === 0) {
          Alert.alert(
            "Upload Failed",
            "Could not upload media. Please check your R2 configuration in the ENV tab.",
            [{ text: "OK" }]
          );
        } else if (successCount > 0) {
          const mediaWord = successCount === 1 ? "item" : "items";
          Alert.alert(
            "Upload Complete",
            `Successfully uploaded ${successCount} ${mediaWord} to the wedding gallery!${failCount > 0 ? ` (${failCount} failed)` : ""}`,
            [
              {
                text: "View Gallery",
                onPress: () => navigation.replace("PhotoGallery", { weddingId }),
              },
              { text: "Upload More", style: "cancel", onPress: () => setSelectedMedia([]) },
            ]
          );
        }
      }, 500);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
      Alert.alert("Upload Failed", "Failed to upload media. Please try again.", [{ text: "OK" }]);
    }
  };

  const photoCount = selectedMedia.filter((m) => m.mediaType === "photo").length;
  const videoCount = selectedMedia.filter((m) => m.mediaType === "video").length;

  const getMediaLabel = () => {
    if (photoCount > 0 && videoCount > 0) {
      return `${photoCount} Photo${photoCount !== 1 ? "s" : ""}, ${videoCount} Video${videoCount !== 1 ? "s" : ""}`;
    } else if (videoCount > 0) {
      return `${videoCount} Video${videoCount !== 1 ? "s" : ""}`;
    } else {
      return `${photoCount} Photo${photoCount !== 1 ? "s" : ""}`;
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
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <Text className="text-[#F5B800] text-3xl font-bold mb-2">Upload Media</Text>
        <Text className="text-neutral-400 text-base">{wedding.coupleName}</Text>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {selectedMedia.length === 0 ? (
          <View className="items-center py-12">
            <View className="w-24 h-24 bg-neutral-900 rounded-full items-center justify-center mb-6 border-2 border-neutral-800">
              <Ionicons name="images-outline" size={48} color="#F5B800" />
            </View>
            <Text className="text-neutral-300 text-xl font-semibold mb-2">No Media Selected</Text>
            <Text className="text-neutral-500 text-center px-8 mb-8">
              Select photos or videos from your library to upload to this wedding gallery
            </Text>
          </View>
        ) : (
          <View className="mb-6">
            <Text className="text-neutral-300 text-lg font-semibold mb-4">
              {getMediaLabel()} Selected
            </Text>
            <View className="flex-row flex-wrap -mx-1">
              {selectedMedia.map((media) => (
                <View key={media.id} className="w-1/3 p-1">
                  <View className="relative bg-neutral-900 rounded-xl overflow-hidden aspect-square">
                    <Image source={{ uri: media.uri }} className="w-full h-full" resizeMode="cover" />
                    {media.mediaType === "video" && (
                      <View className="absolute inset-0 items-center justify-center">
                        <View className="w-12 h-12 bg-black/60 rounded-full items-center justify-center">
                          <Ionicons name="play" size={24} color="#FFFFFF" />
                        </View>
                      </View>
                    )}
                    <Pressable
                      onPress={() => removeMedia(media.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 rounded-full items-center justify-center"
                    >
                      <Ionicons name="close" size={20} color="#FFFFFF" />
                    </Pressable>
                    {media.mediaType === "video" && (
                      <View className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded">
                        <Text className="text-white text-xs font-medium">VIDEO</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {uploading && (
          <View className="bg-neutral-900 rounded-2xl p-6 mb-6 border border-neutral-800">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-neutral-300 text-base font-medium">Uploading media...</Text>
              <Text className="text-[#F5B800] text-base font-semibold">
                {Math.round(uploadProgress)}%
              </Text>
            </View>
            <View className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <View className="h-full bg-[#F5B800]" style={{ width: `${uploadProgress}%` }} />
            </View>
          </View>
        )}

        {/* Selection buttons */}
        <View className="flex-row mb-4">
          <Pressable
            onPress={() => pickMedia("images")}
            disabled={uploading}
            className="flex-1 bg-neutral-900 rounded-2xl p-4 flex-row items-center justify-center mr-2 border border-neutral-800 active:opacity-70"
          >
            <Ionicons name="images-outline" size={22} color="#F5B800" />
            <Text className="text-neutral-100 text-base font-semibold ml-2">Photos</Text>
          </Pressable>
          <Pressable
            onPress={() => pickMedia("videos")}
            disabled={uploading}
            className="flex-1 bg-neutral-900 rounded-2xl p-4 flex-row items-center justify-center ml-2 border border-neutral-800 active:opacity-70"
          >
            <Ionicons name="videocam-outline" size={22} color="#F5B800" />
            <Text className="text-neutral-100 text-base font-semibold ml-2">Videos</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => pickMedia("all")}
          disabled={uploading}
          className="bg-neutral-900 rounded-2xl p-5 flex-row items-center justify-center mb-4 border border-neutral-800 active:opacity-70"
        >
          <Ionicons name="add-circle-outline" size={24} color="#F5B800" />
          <Text className="text-neutral-100 text-lg font-semibold ml-3">Select All Media</Text>
        </Pressable>

        {selectedMedia.length > 0 && (
          <Pressable
            onPress={uploadMedia}
            disabled={uploading}
            className="bg-[#F5B800] rounded-2xl p-6 flex-row items-center justify-center mb-8 active:opacity-70"
          >
            {uploading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <>
                <Ionicons name="cloud-upload" size={24} color="#000000" />
                <Text className="text-black text-lg font-semibold ml-3">
                  Upload {selectedMedia.length} {selectedMedia.length === 1 ? "Item" : "Items"}
                </Text>
              </>
            )}
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}
