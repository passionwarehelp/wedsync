import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CreateWeddingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const addWedding = useWeddingStore((s) => s.addWedding);

  const [partnerOneName, setPartnerOneName] = useState("");
  const [partnerTwoName, setPartnerTwoName] = useState("");
  const [weddingDate, setWeddingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [venue, setVenue] = useState("");

  const handleCreate = () => {
    if (!partnerOneName.trim() || !partnerTwoName.trim()) {
      return;
    }

    const newWedding = {
      id: Date.now().toString(),
      coupleName: `${partnerOneName} & ${partnerTwoName}`,
      partnerOneName: partnerOneName.trim(),
      partnerTwoName: partnerTwoName.trim(),
      weddingDate: weddingDate.toISOString(),
      venue: venue.trim(),
      status: "planning" as const,
      createdAt: new Date().toISOString(),
      qrCode: `WS-${Date.now()}`,
      guestCount: 0,
      rsvpCount: 0,
      tasksCompleted: 0,
      totalTasks: 0,
    };

    addWedding(newWedding);
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate("WeddingDetail", { weddingId: newWedding.id });
    }, 100);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-900" edges={["top"]}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="px-6 pt-4 pb-4 border-b border-neutral-800">
          <View className="flex-row items-center justify-between">
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={28} color="#F3F4F6" />
            </Pressable>
            <Text className="text-neutral-100 text-xl font-semibold">Create Wedding</Text>
            <View style={{ width: 28 }} />
          </View>
        </View>

        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          <View className="mb-5">
            <Text className="text-neutral-300 text-sm font-medium mb-2">Partner One Name *</Text>
            <TextInput
              value={partnerOneName}
              onChangeText={setPartnerOneName}
              placeholder="Enter first partner name"
              placeholderTextColor="#6B7280"
              className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
            />
          </View>

          <View className="mb-5">
            <Text className="text-neutral-300 text-sm font-medium mb-2">Partner Two Name *</Text>
            <TextInput
              value={partnerTwoName}
              onChangeText={setPartnerTwoName}
              placeholder="Enter second partner name"
              placeholderTextColor="#6B7280"
              className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
            />
          </View>

          <View className="mb-5">
            <Text className="text-neutral-300 text-sm font-medium mb-2">Wedding Date *</Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="bg-neutral-800 rounded-xl px-4 py-4 border border-neutral-700 flex-row items-center"
            >
              <Ionicons name="calendar-outline" size={20} color="#C9A961" />
              <Text className="text-neutral-100 text-base ml-3">{format(weddingDate, "MMMM d, yyyy")}</Text>
            </Pressable>
            {showDatePicker && (
              <View className="mt-3">
                <DateTimePicker
                  value={weddingDate}
                  mode="date"
                  display="inline"
                  themeVariant="dark"
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) setWeddingDate(date);
                  }}
                />
              </View>
            )}
          </View>

          <View className="mb-8">
            <Text className="text-neutral-300 text-sm font-medium mb-2">Venue</Text>
            <TextInput
              value={venue}
              onChangeText={setVenue}
              placeholder="Enter venue name"
              placeholderTextColor="#6B7280"
              className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
            />
          </View>
        </ScrollView>

        <View className="px-6 pb-6 pt-4 border-t border-neutral-800">
          <Pressable
            onPress={handleCreate}
            disabled={!partnerOneName.trim() || !partnerTwoName.trim()}
            className={`rounded-xl py-4 items-center ${
              partnerOneName.trim() && partnerTwoName.trim() ? "bg-[#C9A961]" : "bg-neutral-700"
            }`}
          >
            <Text className="text-white text-lg font-semibold">Create Wedding</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
