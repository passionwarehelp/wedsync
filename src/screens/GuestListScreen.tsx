import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type GuestListRouteProp = RouteProp<RootStackParamList, "GuestList">;

export default function GuestListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<GuestListRouteProp>();
  const { weddingId } = route.params;

  const wedding = useWeddingStore((s) => s.getWedding(weddingId));
  const guests = useWeddingStore((s) => s.getGuestsForWedding(weddingId));
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "attending" | "declined" | "pending">("all");

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || guest.rsvpStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: guests.length,
    attending: guests.filter((g) => g.rsvpStatus === "attending").length,
    declined: guests.filter((g) => g.rsvpStatus === "declined").length,
    pending: guests.filter((g) => g.rsvpStatus === "pending").length,
  };

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">Wedding not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50">
      <LinearGradient
        colors={["#C9A961", "#F4E8D0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-white text-2xl font-bold">Guest List</Text>
          <Pressable
            onPress={() => navigation.navigate("AddGuest", { weddingId })}
            className="bg-white rounded-full w-11 h-11 items-center justify-center shadow-md"
          >
            <Ionicons name="add" size={26} color="#C9A961" />
          </Pressable>
        </View>

        <View className="bg-white/95 rounded-2xl flex-row items-center px-4 py-3 mb-4">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search guests..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-base text-neutral-800"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-2">
          <Pressable
            onPress={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-full mr-2 ${
              filterStatus === "all" ? "bg-white" : "bg-white/30"
            }`}
          >
            <Text className={`font-medium ${filterStatus === "all" ? "text-[#C9A961]" : "text-white"}`}>
              All ({stats.total})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterStatus("attending")}
            className={`px-4 py-2 rounded-full mr-2 ${
              filterStatus === "attending" ? "bg-white" : "bg-white/30"
            }`}
          >
            <Text
              className={`font-medium ${filterStatus === "attending" ? "text-[#C9A961]" : "text-white"}`}
            >
              Attending ({stats.attending})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterStatus("declined")}
            className={`px-4 py-2 rounded-full mr-2 ${
              filterStatus === "declined" ? "bg-white" : "bg-white/30"
            }`}
          >
            <Text
              className={`font-medium ${filterStatus === "declined" ? "text-[#C9A961]" : "text-white"}`}
            >
              Declined ({stats.declined})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded-full ${filterStatus === "pending" ? "bg-white" : "bg-white/30"}`}
          >
            <Text className={`font-medium ${filterStatus === "pending" ? "text-[#C9A961]" : "text-white"}`}>
              Pending ({stats.pending})
            </Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {filteredGuests.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="people-outline" size={64} color="#D1D5DB" />
            <Text className="text-neutral-400 text-lg mt-4">
              {searchQuery ? "No guests found" : "No guests yet"}
            </Text>
            <Text className="text-neutral-400 text-sm mt-2">
              {searchQuery ? "Try a different search" : "Tap + to add your first guest"}
            </Text>
          </View>
        ) : (
          <View className="space-y-3 pb-6">
            {filteredGuests.map((guest) => (
              <View key={guest.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text className="text-neutral-800 text-lg font-semibold">{guest.name}</Text>
                    {guest.email && (
                      <Text className="text-neutral-500 text-sm mt-1">{guest.email}</Text>
                    )}
                    {guest.plusOne && guest.plusOneName && (
                      <View className="flex-row items-center mt-2">
                        <Ionicons name="person-add-outline" size={14} color="#C9A961" />
                        <Text className="text-neutral-600 text-sm ml-1">+1: {guest.plusOneName}</Text>
                      </View>
                    )}
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      guest.rsvpStatus === "attending"
                        ? "bg-emerald-100"
                        : guest.rsvpStatus === "declined"
                          ? "bg-red-100"
                          : "bg-amber-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        guest.rsvpStatus === "attending"
                          ? "text-emerald-700"
                          : guest.rsvpStatus === "declined"
                            ? "text-red-700"
                            : "text-amber-700"
                      }`}
                    >
                      {guest.rsvpStatus === "attending"
                        ? "Attending"
                        : guest.rsvpStatus === "declined"
                          ? "Declined"
                          : "Pending"}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center mt-3 space-x-4">
                  {guest.tableNumber && (
                    <View className="flex-row items-center">
                      <Ionicons name="restaurant-outline" size={16} color="#6B7280" />
                      <Text className="text-neutral-600 text-sm ml-1">Table {guest.tableNumber}</Text>
                    </View>
                  )}
                  {guest.category && (
                    <View className="flex-row items-center">
                      <Ionicons name="pricetag-outline" size={16} color="#6B7280" />
                      <Text className="text-neutral-600 text-sm ml-1 capitalize">
                        {guest.category.replace("-", " ")}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
