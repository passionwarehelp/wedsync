import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type AddGuestRouteProp = RouteProp<RootStackParamList, "AddGuest">;

const CATEGORIES = [
  { label: "Friends", value: "friends", icon: "people" },
  { label: "Family", value: "family", icon: "heart" },
  { label: "Bridal Party", value: "bridal-party", icon: "sparkles" },
  { label: "VIP", value: "vip", icon: "star" },
  { label: "Other", value: "other", icon: "ellipsis-horizontal" },
] as const;

const RSVP_OPTIONS = [
  { label: "Pending", value: "pending", color: "#F59E0B", bg: "bg-amber-900" },
  { label: "Attending", value: "attending", color: "#10B981", bg: "bg-emerald-900" },
  { label: "Declined", value: "declined", color: "#EF4444", bg: "bg-red-900" },
] as const;

export default function AddGuestScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AddGuestRouteProp>();
  const { weddingId } = route.params;
  const insets = useSafeAreaInsets();

  const addGuest = useWeddingStore((s) => s.addGuest);
  const updateWedding = useWeddingStore((s) => s.updateWedding);
  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");
  const [category, setCategory] = useState<"family" | "friends" | "bridal-party" | "vip" | "other">("friends");
  const [rsvpStatus, setRsvpStatus] = useState<"pending" | "attending" | "declined">("pending");

  const handleAdd = () => {
    if (!name.trim()) {
      return;
    }

    const newGuest = {
      id: Date.now().toString(),
      weddingId,
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      plusOne,
      plusOneName: plusOne ? plusOneName.trim() || undefined : undefined,
      category,
      rsvpStatus,
      addedAt: new Date().toISOString(),
    };

    addGuest(newGuest);

    if (wedding) {
      const newGuestCount = wedding.guestCount + (plusOne ? 2 : 1);
      const newRsvpCount =
        wedding.rsvpCount + (rsvpStatus === "attending" ? (plusOne ? 2 : 1) : 0);
      updateWedding(weddingId, {
        guestCount: newGuestCount,
        rsvpCount: newRsvpCount,
      });
    }

    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-black/95">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          {/* Header */}
          <View
            className="bg-neutral-900 border-b border-neutral-800"
            style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 20 }}
          >
            <View className="flex-row items-center justify-between">
              <Pressable
                onPress={() => navigation.goBack()}
                className="w-10 h-10 items-center justify-center"
              >
                <Ionicons name="close" size={28} color="#9CA3AF" />
              </Pressable>
              <Text className="text-neutral-100 text-lg font-semibold">Add Guest</Text>
              <Pressable
                onPress={handleAdd}
                disabled={!name.trim()}
                className="px-4 py-2"
              >
                <Text className={`text-base font-semibold ${name.trim() ? "text-[#F5B800]" : "text-neutral-600"}`}>
                  Done
                </Text>
              </Pressable>
            </View>
          </View>

          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
          >
            <ScrollView
              className="flex-1 px-5"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
              keyboardShouldPersistTaps="handled"
            >
              {/* Guest Name */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Guest Name *</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter guest name"
                  placeholderTextColor="#6B7280"
                  className="bg-neutral-900 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-800"
                  returnKeyType="next"
                />
              </View>

              {/* Email */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="guest@email.com"
                  placeholderTextColor="#6B7280"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-neutral-900 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-800"
                  returnKeyType="next"
                />
              </View>

              {/* Phone */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Phone</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="(555) 123-4567"
                  placeholderTextColor="#6B7280"
                  keyboardType="phone-pad"
                  className="bg-neutral-900 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-800"
                  returnKeyType="done"
                />
              </View>

              {/* Category */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-3">Category</Text>
                <View className="flex-row flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <Pressable
                      key={cat.value}
                      onPress={() => setCategory(cat.value)}
                      className={`flex-row items-center px-4 py-2.5 rounded-full mr-2 mb-2 ${
                        category === cat.value ? "bg-[#F5B800]" : "bg-neutral-900 border border-neutral-800"
                      }`}
                    >
                      <Ionicons
                        name={cat.icon as any}
                        size={16}
                        color={category === cat.value ? "#000000" : "#9CA3AF"}
                      />
                      <Text
                        className={`ml-2 font-medium ${
                          category === cat.value ? "text-black" : "text-neutral-400"
                        }`}
                      >
                        {cat.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* RSVP Status */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-3">RSVP Status</Text>
                <View className="flex-row">
                  {RSVP_OPTIONS.map((option, index) => (
                    <Pressable
                      key={option.value}
                      onPress={() => setRsvpStatus(option.value)}
                      className={`flex-1 py-3 rounded-xl items-center ${
                        index < RSVP_OPTIONS.length - 1 ? "mr-2" : ""
                      } ${
                        rsvpStatus === option.value
                          ? option.bg + " border-2"
                          : "bg-neutral-900 border border-neutral-800"
                      }`}
                      style={rsvpStatus === option.value ? { borderColor: option.color } : {}}
                    >
                      <Text
                        className={`font-semibold ${
                          rsvpStatus === option.value ? "text-white" : "text-neutral-500"
                        }`}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Plus One Toggle */}
              <View className="mb-5">
                <View className="flex-row items-center justify-between bg-neutral-900 rounded-xl px-4 py-4 border border-neutral-800">
                  <View className="flex-1 mr-4">
                    <Text className="text-neutral-100 text-base font-medium">Plus One</Text>
                    <Text className="text-neutral-500 text-sm mt-1">Allow guest to bring a partner</Text>
                  </View>
                  <Switch
                    value={plusOne}
                    onValueChange={setPlusOne}
                    trackColor={{ false: "#404040", true: "#F5B800" }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>

              {/* Plus One Name */}
              {plusOne && (
                <View className="mb-5">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Plus One Name</Text>
                  <TextInput
                    value={plusOneName}
                    onChangeText={setPlusOneName}
                    placeholder="Enter plus one name (optional)"
                    placeholderTextColor="#6B7280"
                    className="bg-neutral-900 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-800"
                    returnKeyType="done"
                  />
                </View>
              )}

              {/* Add Button at bottom of scroll */}
              <Pressable
                onPress={handleAdd}
                disabled={!name.trim()}
                className={`rounded-xl py-4 items-center mt-4 ${
                  name.trim() ? "bg-[#F5B800] active:opacity-80" : "bg-neutral-800"
                }`}
              >
                <Text className={`text-lg font-semibold ${name.trim() ? "text-black" : "text-neutral-600"}`}>
                  Add Guest
                </Text>
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
