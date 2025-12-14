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

  // Use individual selectors to avoid infinite loops
  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));
  const allGuests = useWeddingStore((s) => s.guests);
  const guests = allGuests.filter((g) => g.weddingId === weddingId);

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
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-[#F5B800] text-2xl font-bold">Guest List</Text>
          <View className="flex-row items-center">
            <Pressable
              onPress={() => navigation.navigate("RSVPLink", { weddingId })}
              className="bg-neutral-800 rounded-full px-4 h-11 flex-row items-center justify-center mr-3 border border-neutral-700"
            >
              <Ionicons name="mail-outline" size={18} color="#F5B800" />
              <Text className="text-[#F5B800] font-semibold ml-2">Invite</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("AddGuest", { weddingId })}
              className="bg-[#F5B800] rounded-full w-11 h-11 items-center justify-center shadow-md"
            >
              <Ionicons name="add" size={26} color="#000000" />
            </Pressable>
          </View>
        </View>

        <View className="bg-neutral-900 rounded-2xl flex-row items-center px-4 py-3 mb-4 border border-neutral-800">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search guests..."
            placeholderTextColor="#6B7280"
            className="flex-1 ml-3 text-base text-neutral-100"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            onPress={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-full mr-2 ${
              filterStatus === "all" ? "bg-[#F5B800]" : "bg-neutral-800"
            }`}
          >
            <Text className={`font-medium ${filterStatus === "all" ? "text-black" : "text-neutral-400"}`}>
              All ({stats.total})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterStatus("attending")}
            className={`px-4 py-2 rounded-full mr-2 ${
              filterStatus === "attending" ? "bg-[#F5B800]" : "bg-neutral-800"
            }`}
          >
            <Text
              className={`font-medium ${filterStatus === "attending" ? "text-black" : "text-neutral-400"}`}
            >
              Attending ({stats.attending})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterStatus("declined")}
            className={`px-4 py-2 rounded-full mr-2 ${
              filterStatus === "declined" ? "bg-[#F5B800]" : "bg-neutral-800"
            }`}
          >
            <Text
              className={`font-medium ${filterStatus === "declined" ? "text-black" : "text-neutral-400"}`}
            >
              Declined ({stats.declined})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded-full ${filterStatus === "pending" ? "bg-[#F5B800]" : "bg-neutral-800"}`}
          >
            <Text className={`font-medium ${filterStatus === "pending" ? "text-black" : "text-neutral-400"}`}>
              Pending ({stats.pending})
            </Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {filteredGuests.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="people-outline" size={64} color="#404040" />
            <Text className="text-neutral-500 text-lg mt-4">
              {searchQuery ? "No guests found" : "No guests yet"}
            </Text>
            <Text className="text-neutral-600 text-sm mt-2">
              {searchQuery ? "Try a different search" : "Tap + to add your first guest"}
            </Text>
          </View>
        ) : (
          <View className="pb-6">
            {filteredGuests.map((guest, index) => (
              <Pressable
                key={guest.id}
                onPress={() => navigation.navigate("GuestDetail", { guestId: guest.id })}
                className={`bg-neutral-900 rounded-2xl p-4 border border-neutral-800 active:opacity-70${index < filteredGuests.length - 1 ? " mb-3" : ""}`}
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text className="text-neutral-100 text-lg font-semibold">{guest.name}</Text>
                    {guest.email && (
                      <Text className="text-neutral-400 text-sm mt-1">{guest.email}</Text>
                    )}
                    {guest.plusOne && guest.plusOneName && (
                      <View className="flex-row items-center mt-2">
                        <Ionicons name="person-add-outline" size={14} color="#F5B800" />
                        <Text className="text-neutral-400 text-sm ml-1">+1: {guest.plusOneName}</Text>
                      </View>
                    )}
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      guest.rsvpStatus === "attending"
                        ? "bg-emerald-900"
                        : guest.rsvpStatus === "declined"
                          ? "bg-red-900"
                          : "bg-amber-900"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        guest.rsvpStatus === "attending"
                          ? "text-emerald-400"
                          : guest.rsvpStatus === "declined"
                            ? "text-red-400"
                            : "text-amber-400"
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

                <View className="flex-row items-center mt-3">
                  {guest.tableNumber && (
                    <View className={`flex-row items-center${guest.category ? " mr-4" : ""}`}>
                      <Ionicons name="restaurant-outline" size={16} color="#9CA3AF" />
                      <Text className="text-neutral-400 text-sm ml-1">Table {guest.tableNumber}</Text>
                    </View>
                  )}
                  {guest.category && (
                    <View className="flex-row items-center">
                      <Ionicons name="pricetag-outline" size={16} color="#9CA3AF" />
                      <Text className="text-neutral-400 text-sm ml-1 capitalize">
                        {guest.category.replace("-", " ")}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Tap hint */}
                <View className="flex-row items-center justify-end mt-2">
                  <Text className="text-neutral-600 text-xs mr-1">View details</Text>
                  <Ionicons name="chevron-forward" size={14} color="#525252" />
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
