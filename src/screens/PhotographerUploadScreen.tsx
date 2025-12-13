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
import { uploadPhotoToR2, uploadPhotosToR2Batch } from "../api/r2-upload";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PhotographerUploadRouteProp = RouteProp<RootStackParamList, "PhotographerUpload">;

interface SelectedPhoto {
  uri: string;
  id: string;
}

export default function PhotographerUploadScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PhotographerUploadRouteProp>();
  const { weddingId } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));
  const addPhoto = usePhotoStore((s) => s.addPhoto);

  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
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

  const pickImages = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant photo library access to upload photos.",
          [{ text: "OK" }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 20,
      });

      if (!result.canceled && result.assets) {
        const newPhotos: SelectedPhoto[] = result.assets.map((asset) => ({
          uri: asset.uri,
          id: Math.random().toString(36).substring(2, 15),
        }));
        setSelectedPhotos((prev) => [...prev, ...newPhotos]);
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Error", "Failed to select photos. Please try again.", [{ text: "OK" }]);
    }
  };

  const removePhoto = (id: string) => {
    setSelectedPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const uploadPhotos = async () => {
    if (selectedPhotos.length === 0) {
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const fileUris = selectedPhotos.map((p) => p.uri);
      const results = await uploadPhotosToR2Batch(weddingId, fileUris);

      let successCount = 0;

      results.forEach((result, index) => {
        if (result.success && result.localUri) {
          // Add to photo store
          addPhoto({
            id: `photo_${Date.now()}_${index}`,
            weddingId,
            uri: result.localUri,
            uploadedBy: "pro",
            uploadedByName: "Photographer",
            uploadedAt: new Date().toISOString(),
            isFavorite: false,
            isApproved: true,
          });
          successCount++;
        }
        setUploadProgress(((index + 1) / results.length) * 100);
      });

      setTimeout(() => {
        setUploading(false);
        if (successCount > 0) {
          Alert.alert(
            "Upload Complete",
            `Successfully uploaded ${successCount} photo${successCount !== 1 ? "s" : ""} to the wedding gallery!`,
            [
              {
                text: "View Gallery",
                onPress: () => navigation.replace("PhotoGallery", { weddingId }),
              },
              { text: "Upload More", style: "cancel", onPress: () => setSelectedPhotos([]) },
            ]
          );
        }
      }, 500);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
      Alert.alert("Upload Failed", "Failed to upload photos. Please try again.", [{ text: "OK" }]);
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

        <Text className="text-[#C9A961] text-3xl font-bold mb-2">Upload Photos</Text>
        <Text className="text-neutral-400 text-base">{wedding.coupleName}</Text>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {selectedPhotos.length === 0 ? (
          <View className="items-center py-12">
            <View className="w-24 h-24 bg-neutral-900 rounded-full items-center justify-center mb-6 border-2 border-neutral-800">
              <Ionicons name="images-outline" size={48} color="#C9A961" />
            </View>
            <Text className="text-neutral-300 text-xl font-semibold mb-2">No Photos Selected</Text>
            <Text className="text-neutral-500 text-center px-8 mb-8">
              Select photos from your library to upload to this wedding gallery
            </Text>
          </View>
        ) : (
          <View className="mb-6">
            <Text className="text-neutral-300 text-lg font-semibold mb-4">
              {selectedPhotos.length} Photo{selectedPhotos.length !== 1 ? "s" : ""} Selected
            </Text>
            <View className="flex-row flex-wrap -mx-1">
              {selectedPhotos.map((photo) => (
                <View key={photo.id} className="w-1/3 p-1">
                  <View className="relative bg-neutral-900 rounded-xl overflow-hidden aspect-square">
                    <Image source={{ uri: photo.uri }} className="w-full h-full" resizeMode="cover" />
                    <Pressable
                      onPress={() => removePhoto(photo.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 rounded-full items-center justify-center"
                    >
                      <Ionicons name="close" size={20} color="#FFFFFF" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {uploading && (
          <View className="bg-neutral-900 rounded-2xl p-6 mb-6 border border-neutral-800">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-neutral-300 text-base font-medium">Uploading photos...</Text>
              <Text className="text-[#C9A961] text-base font-semibold">
                {Math.round(uploadProgress)}%
              </Text>
            </View>
            <View className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <View
                className="h-full bg-[#C9A961]"
                style={{ width: `${uploadProgress}%` }}
              />
            </View>
          </View>
        )}

        <Pressable
          onPress={pickImages}
          disabled={uploading}
          className="bg-neutral-900 rounded-2xl p-6 flex-row items-center justify-center mb-4 border border-neutral-800 active:opacity-70"
        >
          <Ionicons name="add-circle-outline" size={24} color="#C9A961" />
          <Text className="text-neutral-100 text-lg font-semibold ml-3">Select Photos</Text>
        </Pressable>

        {selectedPhotos.length > 0 && (
          <Pressable
            onPress={uploadPhotos}
            disabled={uploading}
            className="bg-[#C9A961] rounded-2xl p-6 flex-row items-center justify-center mb-8 active:opacity-70"
          >
            {uploading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <>
                <Ionicons name="cloud-upload" size={24} color="#000000" />
                <Text className="text-black text-lg font-semibold ml-3">
                  Upload {selectedPhotos.length} Photo{selectedPhotos.length !== 1 ? "s" : ""}
                </Text>
              </>
            )}
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}
