import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type GuestDetailRouteProp = RouteProp<RootStackParamList, "GuestDetail">;

const MEAL_LABELS: Record<string, string> = {
  standard: "Standard",
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  glutenFree: "Gluten-Free",
  other: "Other",
};

const CATEGORY_LABELS: Record<string, string> = {
  family: "Family",
  friends: "Friends",
  "bridal-party": "Bridal Party",
  vip: "VIP",
  other: "Other",
};

export default function GuestDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<GuestDetailRouteProp>();
  const { guestId } = route.params;
  const insets = useSafeAreaInsets();

  const allGuests = useWeddingStore((s) => s.guests);
  const guest = allGuests.find((g) => g.id === guestId);

  if (!guest) {
    return (
      <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
        <View className="px-5 pt-3">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#F5B800" />
          </Pressable>
        </View>
        <View className="flex-1 items-center justify-center">
          <Ionicons name="person-outline" size={64} color="#404040" />
          <Text className="text-neutral-500 text-lg mt-4">Guest not found</Text>
        </View>
      </View>
    );
  }

  const statusConfig = {
    attending: {
      bg: "bg-emerald-900/30",
      border: "border-emerald-500",
      text: "text-emerald-400",
      icon: "checkmark-circle" as const,
      iconColor: "#10B981",
      label: "Attending",
    },
    declined: {
      bg: "bg-red-900/30",
      border: "border-red-500",
      text: "text-red-400",
      icon: "close-circle" as const,
      iconColor: "#EF4444",
      label: "Declined",
    },
    pending: {
      bg: "bg-amber-900/30",
      border: "border-amber-500",
      text: "text-amber-400",
      icon: "time" as const,
      iconColor: "#F59E0B",
      label: "Pending",
    },
  };

  const status = statusConfig[guest.rsvpStatus];

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: insets.top + 10, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <View className="items-center">
          <View className="w-20 h-20 bg-neutral-800 rounded-full items-center justify-center mb-4">
            <Text className="text-[#F5B800] text-3xl font-bold">
              {guest.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text className="text-neutral-100 text-2xl font-bold text-center mb-2">
            {guest.name}
          </Text>

          <View className={`px-4 py-2 rounded-full ${status.bg} border ${status.border} flex-row items-center`}>
            <Ionicons name={status.icon} size={18} color={status.iconColor} />
            <Text className={`${status.text} font-semibold ml-2`}>{status.label}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* Contact Information */}
        {(guest.email || guest.phone) && (
          <View className="bg-neutral-900 rounded-2xl p-5 mb-4 border border-neutral-800">
            <Text className="text-neutral-100 text-lg font-semibold mb-4">Contact Information</Text>

            {guest.email && (
              <View className="flex-row items-center mb-3">
                <View className="w-10 h-10 bg-neutral-800 rounded-full items-center justify-center mr-3">
                  <Ionicons name="mail-outline" size={20} color="#F5B800" />
                </View>
                <View>
                  <Text className="text-neutral-500 text-xs">Email</Text>
                  <Text className="text-neutral-200 text-base">{guest.email}</Text>
                </View>
              </View>
            )}

            {guest.phone && (
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-neutral-800 rounded-full items-center justify-center mr-3">
                  <Ionicons name="call-outline" size={20} color="#F5B800" />
                </View>
                <View>
                  <Text className="text-neutral-500 text-xs">Phone</Text>
                  <Text className="text-neutral-200 text-base">{guest.phone}</Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* RSVP Details */}
        <View className="bg-neutral-900 rounded-2xl p-5 mb-4 border border-neutral-800">
          <Text className="text-neutral-100 text-lg font-semibold mb-4">RSVP Details</Text>

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-neutral-400">Category</Text>
            <View className="bg-neutral-800 px-3 py-1 rounded-full">
              <Text className="text-neutral-200 text-sm">{CATEGORY_LABELS[guest.category]}</Text>
            </View>
          </View>

          {guest.plusOne && (
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-neutral-400">Plus One</Text>
              <View className="flex-row items-center">
                <Ionicons name="person-add" size={16} color="#F5B800" />
                <Text className="text-[#F5B800] font-medium ml-2">{guest.plusOneName || "Yes"}</Text>
              </View>
            </View>
          )}

          {guest.mealType && (
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-neutral-400">Meal Preference</Text>
              <View className="bg-neutral-800 px-3 py-1 rounded-full">
                <Text className="text-neutral-200 text-sm">{MEAL_LABELS[guest.mealType]}</Text>
              </View>
            </View>
          )}

          {guest.dietaryRestrictions && (
            <View className="mb-4">
              <Text className="text-neutral-400 mb-2">Dietary Restrictions</Text>
              <View className="bg-neutral-800 rounded-xl p-3">
                <Text className="text-neutral-200">{guest.dietaryRestrictions}</Text>
              </View>
            </View>
          )}

          {guest.tableNumber && (
            <View className="flex-row items-center justify-between">
              <Text className="text-neutral-400">Table Assignment</Text>
              <View className="flex-row items-center">
                <Ionicons name="restaurant-outline" size={16} color="#F5B800" />
                <Text className="text-[#F5B800] font-medium ml-2">Table {guest.tableNumber}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Message from Guest */}
        {guest.message && (
          <View className="bg-neutral-900 rounded-2xl p-5 mb-4 border border-neutral-800">
            <View className="flex-row items-center mb-4">
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="#F5B800" />
              <Text className="text-neutral-100 text-lg font-semibold ml-2">Message</Text>
            </View>

            <View className="bg-neutral-800 rounded-xl p-4">
              <Text className="text-neutral-200 text-base leading-6 italic">
                {`"${guest.message}"`}
              </Text>
            </View>
          </View>
        )}

        {/* Added Date */}
        <View className="bg-neutral-900/50 rounded-2xl p-4 mb-8 border border-neutral-800/50">
          <Text className="text-neutral-500 text-sm text-center">
            Added {format(new Date(guest.addedAt), "MMMM d, yyyy 'at' h:mm a")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
