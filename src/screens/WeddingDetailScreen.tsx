import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
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

  const wedding = useWeddingStore((s) => s.getWedding(weddingId));

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">Wedding not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const menuItems = [
    {
      title: "Guest List",
      icon: "people" as const,
      screen: "GuestList" as const,
      count: wedding.rsvpCount,
      total: wedding.guestCount,
    },
    {
      title: "Tasks",
      icon: "checkmark-circle" as const,
      screen: "Tasks" as const,
      count: wedding.tasksCompleted,
      total: wedding.totalTasks,
    },
    { title: "Timeline", icon: "time" as const, screen: "Timeline" as const },
    { title: "Vendors", icon: "briefcase" as const, screen: "Vendors" as const },
    { title: "Seating Chart", icon: "grid" as const, screen: "SeatingChart" as const },
    { title: "Photo Gallery", icon: "images" as const, screen: "PhotoGallery" as const },
  ];

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

        <Text className="text-[#C9A961] text-3xl font-bold mb-2">{wedding.coupleName}</Text>
        <Text className="text-neutral-400 text-lg mb-4">
          {wedding.partnerOneName} & {wedding.partnerTwoName}
        </Text>

        <View className="flex-row items-center">
          <Ionicons name="calendar" size={18} color="#C9A961" />
          <Text className="text-neutral-300 text-base ml-2">
            {format(new Date(wedding.weddingDate), "MMMM d, yyyy")}
          </Text>
        </View>

        {wedding.venue && (
          <View className="flex-row items-center mt-2">
            <Ionicons name="location" size={18} color="#C9A961" />
            <Text className="text-neutral-300 text-base ml-2">{wedding.venue}</Text>
          </View>
        )}
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <View className="space-y-3 pb-8">
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate(item.screen, { weddingId })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#C9A961]/10 rounded-full items-center justify-center">
                <Ionicons name={item.icon} size={24} color="#C9A961" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">{item.title}</Text>
                {item.count !== undefined && item.total !== undefined && (
                  <Text className="text-neutral-500 text-sm mt-1">
                    {item.count} of {item.total}
                  </Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
