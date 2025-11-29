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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { Picker } from "@react-native-picker/picker";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type AddGuestRouteProp = RouteProp<RootStackParamList, "AddGuest">;

export default function AddGuestScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AddGuestRouteProp>();
  const { weddingId } = route.params;

  const addGuest = useWeddingStore((s) => s.addGuest);
  const updateWedding = useWeddingStore((s) => s.updateWedding);
  const wedding = useWeddingStore((s) => s.getWedding(weddingId));

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

    // Update wedding guest count
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
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="px-6 pt-4 pb-4 border-b border-neutral-200">
          <View className="flex-row items-center justify-between">
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={28} color="#374151" />
            </Pressable>
            <Text className="text-neutral-800 text-xl font-semibold">Add Guest</Text>
            <View style={{ width: 28 }} />
          </View>
        </View>

        <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
          <View className="mb-5">
            <Text className="text-neutral-700 text-sm font-medium mb-2">Guest Name *</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter guest name"
              placeholderTextColor="#9CA3AF"
              className="bg-neutral-50 rounded-xl px-4 py-4 text-base text-neutral-800 border border-neutral-200"
            />
          </View>

          <View className="mb-5">
            <Text className="text-neutral-700 text-sm font-medium mb-2">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="guest@email.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-neutral-50 rounded-xl px-4 py-4 text-base text-neutral-800 border border-neutral-200"
            />
          </View>

          <View className="mb-5">
            <Text className="text-neutral-700 text-sm font-medium mb-2">Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="(555) 123-4567"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              className="bg-neutral-50 rounded-xl px-4 py-4 text-base text-neutral-800 border border-neutral-200"
            />
          </View>

          <View className="mb-5">
            <Text className="text-neutral-700 text-sm font-medium mb-2">Category</Text>
            <View className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden">
              <Picker
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}
                style={{ height: 150 }}
              >
                <Picker.Item label="Friends" value="friends" />
                <Picker.Item label="Family" value="family" />
                <Picker.Item label="Bridal Party" value="bridal-party" />
                <Picker.Item label="VIP" value="vip" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>

          <View className="mb-5">
            <Text className="text-neutral-700 text-sm font-medium mb-2">RSVP Status</Text>
            <View className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden">
              <Picker
                selectedValue={rsvpStatus}
                onValueChange={(value) => setRsvpStatus(value)}
                style={{ height: 150 }}
              >
                <Picker.Item label="Pending" value="pending" />
                <Picker.Item label="Attending" value="attending" />
                <Picker.Item label="Declined" value="declined" />
              </Picker>
            </View>
          </View>

          <View className="mb-5">
            <View className="flex-row items-center justify-between bg-neutral-50 rounded-xl px-4 py-4 border border-neutral-200">
              <View>
                <Text className="text-neutral-800 text-base font-medium">Plus One</Text>
                <Text className="text-neutral-500 text-sm mt-1">Allow guest to bring a partner</Text>
              </View>
              <Switch
                value={plusOne}
                onValueChange={setPlusOne}
                trackColor={{ false: "#D1D5DB", true: "#C9A961" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {plusOne && (
            <View className="mb-8">
              <Text className="text-neutral-700 text-sm font-medium mb-2">Plus One Name</Text>
              <TextInput
                value={plusOneName}
                onChangeText={setPlusOneName}
                placeholder="Enter plus one name (optional)"
                placeholderTextColor="#9CA3AF"
                className="bg-neutral-50 rounded-xl px-4 py-4 text-base text-neutral-800 border border-neutral-200"
              />
            </View>
          )}
        </ScrollView>

        <View className="px-6 pb-6 pt-4 border-t border-neutral-200">
          <Pressable
            onPress={handleAdd}
            disabled={!name.trim()}
            className={`rounded-xl py-4 items-center ${name.trim() ? "bg-[#C9A961]" : "bg-neutral-300"}`}
          >
            <Text className="text-white text-lg font-semibold">Add Guest</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
