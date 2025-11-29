import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const weddings = useWeddingStore((s) => s.weddings);
  const [searchQuery, setSearchQuery] = useState("");

  const activeWeddings = weddings.filter((w) => w.status !== "completed");
  const filteredWeddings = activeWeddings.filter(
    (w) =>
      w.coupleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.partnerOneName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.partnerTwoName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-[#C9A961] text-3xl font-bold">WedSync</Text>
            <Text className="text-neutral-400 text-base mt-1">Professional Dashboard</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("CreateWedding")}
            className="bg-[#C9A961] rounded-full w-12 h-12 items-center justify-center shadow-lg"
          >
            <Ionicons name="add" size={28} color="#000000" />
          </Pressable>
        </View>

        <View className="bg-neutral-900 rounded-2xl flex-row items-center px-4 py-3 border border-neutral-800">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search weddings..."
            placeholderTextColor="#6B7280"
            className="flex-1 ml-3 text-base text-neutral-100"
          />
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {filteredWeddings.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="calendar-outline" size={64} color="#404040" />
            <Text className="text-neutral-500 text-lg mt-4">
              {searchQuery ? "No weddings found" : "No active weddings"}
            </Text>
            <Text className="text-neutral-600 text-sm mt-2 text-center px-8">
              {searchQuery ? "Try a different search" : "Tap + to create your first wedding"}
            </Text>
          </View>
        ) : (
          <View className="space-y-4 pb-8">
            {filteredWeddings.map((wedding) => (
              <Pressable
                key={wedding.id}
                onPress={() => navigation.navigate("WeddingDetail", { weddingId: wedding.id })}
                className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 active:opacity-70"
              >
                <View className="p-5">
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <Text className="text-neutral-100 text-xl font-semibold">{wedding.coupleName}</Text>
                      <Text className="text-neutral-400 text-sm mt-1">
                        {wedding.partnerOneName} & {wedding.partnerTwoName}
                      </Text>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-full ${
                        wedding.status === "upcoming" ? "bg-emerald-900" : "bg-blue-900"
                      }`}
                    >
                      <Text
                        className={`text-xs font-medium ${
                          wedding.status === "upcoming" ? "text-emerald-400" : "text-blue-400"
                        }`}
                      >
                        {wedding.status}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center mb-4">
                    <Ionicons name="calendar-outline" size={16} color="#C9A961" />
                    <Text className="text-neutral-300 text-sm ml-2">
                      {format(new Date(wedding.weddingDate), "MMMM d, yyyy")}
                    </Text>
                    {wedding.venue && (
                      <>
                        <View className="w-1 h-1 rounded-full bg-neutral-600 mx-3" />
                        <Ionicons name="location-outline" size={16} color="#C9A961" />
                        <Text className="text-neutral-300 text-sm ml-1 flex-1" numberOfLines={1}>
                          {wedding.venue}
                        </Text>
                      </>
                    )}
                  </View>

                  <View className="flex-row items-center space-x-6">
                    <View className="flex-row items-center">
                      <Ionicons name="people-outline" size={18} color="#9CA3AF" />
                      <Text className="text-neutral-400 text-sm ml-2">
                        {wedding.rsvpCount}/{wedding.guestCount}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="checkmark-circle-outline" size={18} color="#9CA3AF" />
                      <Text className="text-neutral-400 text-sm ml-2">
                        {wedding.tasksCompleted}/{wedding.totalTasks}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ height: 1, backgroundColor: "#C9A961", opacity: 0.3 }} />
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
