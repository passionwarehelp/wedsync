import React, { useState, useMemo } from "react";
import { View, Text, Pressable, ScrollView, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import usePhotoStore from "../state/photoStore";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PhotoGalleryRouteProp = RouteProp<RootStackParamList, "PhotoGallery">;

const { width } = Dimensions.get("window");
const imageSize = (width - 60) / 3; // 3 columns with padding

export default function PhotoGalleryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PhotoGalleryRouteProp>();
  const { weddingId } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  // Get all photos and filter outside selector to avoid infinite loop
  const allPhotos = usePhotoStore((s) => s.photos);
  const toggleFavorite = usePhotoStore((s) => s.toggleFavorite);

  // Filter photos for this wedding using useMemo
  const photos = useMemo(() => {
    return allPhotos.filter((p) => p.weddingId === weddingId);
  }, [allPhotos, weddingId]);

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "favorites">("all");

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">Wedding not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const filteredPhotos = filter === "favorites" ? photos.filter((p) => p.isFavorite) : photos;
  const sortedPhotos = [...filteredPhotos].sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );

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

        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <Text className="text-[#C9A961] text-3xl font-bold mb-2">Photo Gallery</Text>
            <Text className="text-neutral-400 text-base">{wedding.coupleName}</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("PhotographerUpload", { weddingId })}
            className="w-12 h-12 bg-[#C9A961] rounded-full items-center justify-center active:opacity-70"
          >
            <Ionicons name="add" size={28} color="#000000" />
          </Pressable>
        </View>

        <View className="flex-row">
          <Pressable
            onPress={() => setFilter("all")}
            className={`flex-1 py-3 rounded-xl mr-2 ${filter === "all" ? "bg-[#C9A961]" : "bg-neutral-900 border border-neutral-800"}`}
          >
            <Text
              className={`text-center font-semibold ${filter === "all" ? "text-black" : "text-neutral-400"}`}
            >
              All ({photos.length})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("favorites")}
            className={`flex-1 py-3 rounded-xl ml-2 ${filter === "favorites" ? "bg-[#C9A961]" : "bg-neutral-900 border border-neutral-800"}`}
          >
            <Text
              className={`text-center font-semibold ${filter === "favorites" ? "text-black" : "text-neutral-400"}`}
            >
              Favorites ({photos.filter((p) => p.isFavorite).length})
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      {sortedPhotos.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-24 h-24 bg-neutral-900 rounded-full items-center justify-center mb-6 border-2 border-neutral-800">
            <Ionicons name="images-outline" size={48} color="#C9A961" />
          </View>
          <Text className="text-neutral-300 text-xl font-semibold mb-2 text-center">
            {filter === "favorites" ? "No Favorite Photos" : "No Photos Yet"}
          </Text>
          <Text className="text-neutral-500 text-center mb-8">
            {filter === "favorites"
              ? "Mark photos as favorites by tapping the heart icon"
              : "Upload photos from your library or receive guest uploads via QR code"}
          </Text>
          {filter === "all" && (
            <Pressable
              onPress={() => navigation.navigate("PhotographerUpload", { weddingId })}
              className="bg-[#C9A961] rounded-2xl px-8 py-4 flex-row items-center active:opacity-70"
            >
              <Ionicons name="cloud-upload" size={24} color="#000000" />
              <Text className="text-black text-lg font-semibold ml-3">Upload Photos</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap -mx-1 pb-8">
            {sortedPhotos.map((photo) => (
              <View key={photo.id} className="w-1/3 p-1">
                <Pressable
                  onPress={() => setSelectedPhoto(photo.id)}
                  className="relative bg-neutral-900 rounded-xl overflow-hidden"
                  style={{ height: imageSize }}
                >
                  <Image source={{ uri: photo.uri }} className="w-full h-full" resizeMode="cover" />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.6)"]}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 60,
                    }}
                  />
                  <Pressable
                    onPress={() => toggleFavorite(photo.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full items-center justify-center"
                  >
                    <Ionicons
                      name={photo.isFavorite ? "heart" : "heart-outline"}
                      size={18}
                      color={photo.isFavorite ? "#C9A961" : "#FFFFFF"}
                    />
                  </Pressable>
                  <View className="absolute bottom-2 left-2">
                    <Text className="text-white text-xs font-medium">
                      {photo.uploadedByName || "Guest"}
                    </Text>
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Simple photo detail view */}
      {selectedPhoto && (
        <Pressable
          onPress={() => setSelectedPhoto(null)}
          className="absolute inset-0 bg-black/95 items-center justify-center"
        >
          {(() => {
            const photo = photos.find((p) => p.id === selectedPhoto);
            if (!photo) return null;

            return (
              <View className="w-full h-full">
                <SafeAreaView className="flex-1">
                  <View className="flex-row items-center justify-between px-5 mb-4">
                    <Pressable onPress={() => setSelectedPhoto(null)}>
                      <Ionicons name="close" size={32} color="#C9A961" />
                    </Pressable>
                    <Pressable onPress={() => toggleFavorite(photo.id)}>
                      <Ionicons
                        name={photo.isFavorite ? "heart" : "heart-outline"}
                        size={32}
                        color={photo.isFavorite ? "#C9A961" : "#FFFFFF"}
                      />
                    </Pressable>
                  </View>
                  <View className="flex-1 items-center justify-center">
                    <Image
                      source={{ uri: photo.uri }}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                  </View>
                  <View className="px-5 pb-6">
                    <Text className="text-neutral-100 text-lg font-semibold mb-1">
                      {photo.uploadedByName || "Guest"}
                    </Text>
                    <Text className="text-neutral-400 text-sm">
                      {format(new Date(photo.uploadedAt), "MMM d, yyyy 'at' h:mm a")}
                    </Text>
                  </View>
                </SafeAreaView>
              </View>
            );
          })()}
        </Pressable>
      )}
    </View>
  );
}
