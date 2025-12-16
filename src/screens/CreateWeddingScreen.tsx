import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Switch, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import useAuthStore from "../state/authStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CreateWeddingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const addWedding = useWeddingStore((s) => s.addWedding);
  const userId = useAuthStore((s) => s.user?.id);

  const [partnerOneName, setPartnerOneName] = useState("");
  const [partnerTwoName, setPartnerTwoName] = useState("");
  const [weddingDate, setWeddingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [venue, setVenue] = useState("");
  const [qrCodeEnabled, setQrCodeEnabled] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const isValid = partnerOneName.trim() && partnerTwoName.trim();

  const handleCreate = async () => {
    if (!isValid || !userId || isCreating) {
      return;
    }

    setIsCreating(true);

    try {
      const weddingData = {
        coupleName: `${partnerOneName} & ${partnerTwoName}`,
        partnerOneName: partnerOneName.trim(),
        partnerTwoName: partnerTwoName.trim(),
        weddingDate: weddingDate.toISOString(),
        venue: venue.trim(),
        status: "planning" as const,
        qrCode: `WS-${Date.now()}`,
        qrCodeEnabled,
        photoAlbumLive: false,
        photoFrameEnabled: false,
        guestCount: 0,
        rsvpCount: 0,
        tasksCompleted: 0,
        totalTasks: 0,
      };

      const newWedding = await addWedding(weddingData);

      if (newWedding) {
        navigation.goBack();
        setTimeout(() => {
          navigation.navigate("WeddingDetail", { weddingId: newWedding.id });
        }, 100);
      }
    } catch (error: any) {
      console.error("[CreateWedding] Error:", error);
      Alert.alert("Error", error.message || "Failed to create wedding. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-900" edges={["top"]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <View className="px-6 pt-4 pb-4 border-b border-neutral-800">
            <View className="flex-row items-center justify-between">
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={28} color="#F3F4F6" />
              </Pressable>
              <Text className="text-neutral-100 text-xl font-semibold">Create Wedding</Text>
              <Pressable onPress={handleCreate} disabled={!isValid || isCreating}>
                {isCreating ? (
                  <ActivityIndicator size="small" color="#F5B800" />
                ) : (
                  <Text className={`text-base font-semibold ${isValid ? "text-[#F5B800]" : "text-neutral-600"}`}>
                    Done
                  </Text>
                )}
              </Pressable>
            </View>
          </View>

          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
          >
            <ScrollView
              className="flex-1 px-6 pt-6"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
              keyboardShouldPersistTaps="handled"
            >
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Partner One Name *</Text>
                <TextInput
                  value={partnerOneName}
                  onChangeText={setPartnerOneName}
                  placeholder="Enter first partner name"
                  placeholderTextColor="#6B7280"
                  className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                  returnKeyType="next"
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
                  returnKeyType="next"
                />
              </View>

              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Wedding Date *</Text>
                <Pressable
                  onPress={() => setShowDatePicker(true)}
                  className="bg-neutral-800 rounded-xl px-4 py-4 border border-neutral-700 flex-row items-center"
                >
                  <Ionicons name="calendar-outline" size={20} color="#F5B800" />
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
                  returnKeyType="done"
                />
              </View>

              {/* QR Code Album Toggle */}
              <View className="mb-8 bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 mr-4">
                    <Text className="text-neutral-100 text-base font-medium">QR Code Album</Text>
                    <Text className="text-neutral-500 text-sm mt-1">
                      Allow guests to upload photos via QR code scanner
                    </Text>
                  </View>
                  <Switch
                    value={qrCodeEnabled}
                    onValueChange={setQrCodeEnabled}
                    trackColor={{ false: "#404040", true: "#F5B800" }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>

              {/* Create Button */}
              <Pressable
                onPress={handleCreate}
                disabled={!isValid || isCreating}
                className={`rounded-xl py-4 items-center ${isValid && !isCreating ? "bg-[#F5B800]" : "bg-neutral-700"}`}
              >
                {isCreating ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text className={`text-lg font-semibold ${isValid ? "text-black" : "text-neutral-500"}`}>
                    Create Wedding
                  </Text>
                )}
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
