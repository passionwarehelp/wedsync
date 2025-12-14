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
import { useVideoPlayer, VideoView } from "expo-video";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PhotoGalleryRouteProp = RouteProp<RootStackParamList, "PhotoGallery">;

const { width, height } = Dimensions.get("window");
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
  const media = useMemo(() => {
    return allPhotos.filter((p) => p.weddingId === weddingId);
  }, [allPhotos, weddingId]);

  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "photos" | "videos" | "favorites">("all");

  // Get the selected media item for video player
  const selectedItem = useMemo(() => {
    return media.find((m) => m.id === selectedMedia);
  }, [media, selectedMedia]);

  // Video player for selected video
  const player = useVideoPlayer(
    selectedItem?.mediaType === "video" ? selectedItem.uri : null,
    (player) => {
      player.loop = false;
    }
  );

  const filteredMedia = useMemo(() => {
    switch (filter) {
      case "photos":
        return media.filter((m) => m.mediaType !== "video");
      case "videos":
        return media.filter((m) => m.mediaType === "video");
      case "favorites":
        return media.filter((m) => m.isFavorite);
      default:
        return media;
    }
  }, [media, filter]);

  const sortedMedia = useMemo(() => {
    return [...filteredMedia].sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  }, [filteredMedia]);

  const photoCount = useMemo(() => media.filter((m) => m.mediaType !== "video").length, [media]);
  const videoCount = useMemo(() => media.filter((m) => m.mediaType === "video").length, [media]);
  const favoriteCount = useMemo(() => media.filter((m) => m.isFavorite).length, [media]);

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

        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <Text className="text-[#F5B800] text-3xl font-bold mb-2">Gallery</Text>
            <Text className="text-neutral-400 text-base">{wedding.coupleName}</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("PhotographerUpload", { weddingId })}
            className="w-12 h-12 bg-[#F5B800] rounded-full items-center justify-center active:opacity-70"
          >
            <Ionicons name="add" size={28} color="#000000" />
          </Pressable>
        </View>

        {/* Filter tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
          <Pressable
            onPress={() => setFilter("all")}
            className={`px-4 py-2 rounded-full mx-1 ${filter === "all" ? "bg-[#F5B800]" : "bg-neutral-900 border border-neutral-800"}`}
          >
            <Text className={`font-semibold ${filter === "all" ? "text-black" : "text-neutral-400"}`}>
              All ({media.length})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("photos")}
            className={`px-4 py-2 rounded-full mx-1 ${filter === "photos" ? "bg-[#F5B800]" : "bg-neutral-900 border border-neutral-800"}`}
          >
            <Text className={`font-semibold ${filter === "photos" ? "text-black" : "text-neutral-400"}`}>
              Photos ({photoCount})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("videos")}
            className={`px-4 py-2 rounded-full mx-1 ${filter === "videos" ? "bg-[#F5B800]" : "bg-neutral-900 border border-neutral-800"}`}
          >
            <Text className={`font-semibold ${filter === "videos" ? "text-black" : "text-neutral-400"}`}>
              Videos ({videoCount})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("favorites")}
            className={`px-4 py-2 rounded-full mx-1 ${filter === "favorites" ? "bg-[#F5B800]" : "bg-neutral-900 border border-neutral-800"}`}
          >
            <Text className={`font-semibold ${filter === "favorites" ? "text-black" : "text-neutral-400"}`}>
              Favorites ({favoriteCount})
            </Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>

      {sortedMedia.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-24 h-24 bg-neutral-900 rounded-full items-center justify-center mb-6 border-2 border-neutral-800">
            <Ionicons name="images-outline" size={48} color="#F5B800" />
          </View>
          <Text className="text-neutral-300 text-xl font-semibold mb-2 text-center">
            {filter === "favorites"
              ? "No Favorites"
              : filter === "videos"
                ? "No Videos"
                : filter === "photos"
                  ? "No Photos"
                  : "No Media Yet"}
          </Text>
          <Text className="text-neutral-500 text-center mb-8">
            {filter === "favorites"
              ? "Mark items as favorites by tapping the heart icon"
              : "Upload photos or videos from your library"}
          </Text>
          {filter === "all" && (
            <Pressable
              onPress={() => navigation.navigate("PhotographerUpload", { weddingId })}
              className="bg-[#F5B800] rounded-2xl px-8 py-4 flex-row items-center active:opacity-70"
            >
              <Ionicons name="cloud-upload" size={24} color="#000000" />
              <Text className="text-black text-lg font-semibold ml-3">Upload Media</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap -mx-1 pb-8">
            {sortedMedia.map((item) => (
              <View key={item.id} className="w-1/3 p-1">
                <Pressable
                  onPress={() => setSelectedMedia(item.id)}
                  className="relative bg-neutral-900 rounded-xl overflow-hidden"
                  style={{ height: imageSize }}
                >
                  <Image
                    source={{ uri: item.thumbnailUri || item.uri }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  {item.mediaType === "video" && (
                    <View className="absolute inset-0 items-center justify-center">
                      <View className="w-10 h-10 bg-black/60 rounded-full items-center justify-center">
                        <Ionicons name="play" size={20} color="#FFFFFF" />
                      </View>
                    </View>
                  )}
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.6)"]}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 50,
                    }}
                  />
                  <Pressable
                    onPress={() => toggleFavorite(item.id)}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full items-center justify-center"
                  >
                    <Ionicons
                      name={item.isFavorite ? "heart" : "heart-outline"}
                      size={16}
                      color={item.isFavorite ? "#F5B800" : "#FFFFFF"}
                    />
                  </Pressable>
                  {item.mediaType === "video" && (
                    <View className="absolute bottom-2 left-2 bg-black/60 px-1.5 py-0.5 rounded">
                      <Text className="text-white text-[10px] font-medium">VIDEO</Text>
                    </View>
                  )}
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Full screen media viewer */}
      {selectedMedia && selectedItem && (
        <View className="absolute inset-0 bg-black">
          <SafeAreaView className="flex-1">
            <View className="flex-row items-center justify-between px-5 py-4">
              <Pressable onPress={() => setSelectedMedia(null)}>
                <Ionicons name="close" size={32} color="#F5B800" />
              </Pressable>
              <Pressable onPress={() => toggleFavorite(selectedItem.id)}>
                <Ionicons
                  name={selectedItem.isFavorite ? "heart" : "heart-outline"}
                  size={32}
                  color={selectedItem.isFavorite ? "#F5B800" : "#FFFFFF"}
                />
              </Pressable>
            </View>

            <View className="flex-1 items-center justify-center">
              {selectedItem.mediaType === "video" ? (
                <VideoView
                  player={player}
                  style={{ width: width, height: height * 0.6 }}
                  contentFit="contain"
                  allowsFullscreen
                  allowsPictureInPicture
                />
              ) : (
                <Image
                  source={{ uri: selectedItem.uri }}
                  style={{ width: width, height: height * 0.6 }}
                  resizeMode="contain"
                />
              )}
            </View>

            <View className="px-5 pb-6">
              <View className="flex-row items-center mb-2">
                {selectedItem.mediaType === "video" && (
                  <View className="bg-[#F5B800]/20 px-2 py-1 rounded mr-2">
                    <Text className="text-[#F5B800] text-xs font-semibold">VIDEO</Text>
                  </View>
                )}
                <Text className="text-neutral-100 text-lg font-semibold">
                  {selectedItem.uploadedByName || "Guest"}
                </Text>
              </View>
              <Text className="text-neutral-400 text-sm">
                {format(new Date(selectedItem.uploadedAt), "MMM d, yyyy 'at' h:mm a")}
              </Text>
            </View>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
}
