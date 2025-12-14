import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";

type GuestRSVPRouteProp = RouteProp<RootStackParamList, "GuestRSVP">;

type MealType = "standard" | "vegetarian" | "vegan" | "glutenFree" | "other";

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attending: boolean | null;
  plusOne: boolean;
  plusOneName: string;
  mealType: MealType;
  dietaryRestrictions: string;
  message: string;
}

const MEAL_OPTIONS: { value: MealType; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "glutenFree", label: "Gluten-Free" },
  { value: "other", label: "Other" },
];

export default function GuestRSVPScreen() {
  const route = useRoute<GuestRSVPRouteProp>();
  const { rsvpCode } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.qrCode === rsvpCode));
  const addGuest = useWeddingStore((s) => s.addGuest);
  const updateWedding = useWeddingStore((s) => s.updateWedding);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    email: "",
    phone: "",
    attending: null,
    plusOne: false,
    plusOneName: "",
    mealType: "standard",
    dietaryRestrictions: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (formData.attending === null) {
      newErrors.attending = "Please select your attendance";
    }

    if (formData.plusOne && !formData.plusOneName.trim()) {
      newErrors.plusOneName = "Please enter your guest's name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm() || !wedding) return;

    // Create guest record
    const guestId = `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    addGuest({
      id: guestId,
      weddingId: wedding.id,
      name: formData.name.trim(),
      email: formData.email.trim() || undefined,
      phone: formData.phone.trim() || undefined,
      rsvpStatus: formData.attending ? "attending" : "declined",
      plusOne: formData.plusOne,
      plusOneName: formData.plusOneName.trim() || undefined,
      mealType: formData.attending ? formData.mealType : undefined,
      dietaryRestrictions: formData.dietaryRestrictions.trim() || undefined,
      category: "other",
      addedAt: new Date().toISOString(),
    });

    // Update wedding stats
    const attendingCount = formData.attending ? (formData.plusOne ? 2 : 1) : 0;
    updateWedding(wedding.id, {
      guestCount: wedding.guestCount + 1,
      rsvpCount: wedding.rsvpCount + attendingCount,
    });

    setSubmitted(true);
  };

  const updateField = <K extends keyof RSVPFormData>(field: K, value: RSVPFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="close-circle-outline" size={80} color="#EF4444" />
          <Text className="text-neutral-100 text-2xl font-bold mt-6 text-center">
            Invalid RSVP Link
          </Text>
          <Text className="text-neutral-400 text-base mt-3 text-center">
            This RSVP link is not associated with any wedding.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (submitted) {
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1F1F1F", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
          <SafeAreaView className="flex-1 items-center justify-center px-6">
            <View className="items-center">
              <View className="w-24 h-24 bg-emerald-900/30 rounded-full items-center justify-center mb-6">
                <Ionicons
                  name={formData.attending ? "checkmark-circle" : "close-circle"}
                  size={64}
                  color={formData.attending ? "#10B981" : "#F59E0B"}
                />
              </View>

              <Text className="text-neutral-100 text-3xl font-bold text-center mb-3">
                {formData.attending ? "Thank You!" : "Response Received"}
              </Text>

              <Text className="text-neutral-400 text-lg text-center mb-8">
                {formData.attending
                  ? `We can't wait to celebrate with you at ${wedding.coupleName}'s wedding!`
                  : `We're sorry you can't make it. ${wedding.coupleName} will miss you!`}
              </Text>

              {formData.attending && (
                <View className="bg-neutral-900 rounded-2xl p-5 w-full border border-neutral-800">
                  <Text className="text-neutral-300 text-center text-base">
                    <Text className="text-[#F5B800] font-semibold">{wedding.venue}</Text>
                    {"\n"}
                    {format(new Date(wedding.weddingDate), "EEEE, MMMM d, yyyy")}
                  </Text>
                </View>
              )}
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }

  const weddingDate = new Date(wedding.weddingDate);
  const formattedDate = format(weddingDate, "EEEE, MMMM d, yyyy");

  return (
    <View className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <LinearGradient
              colors={["#1F1F1F", "#000000"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
            >
              <View className="items-center">
                <View className="w-16 h-16 bg-[#F5B800]/10 rounded-full items-center justify-center mb-4">
                  <Ionicons name="mail-open" size={32} color="#F5B800" />
                </View>

                <Text className="text-neutral-400 text-sm uppercase tracking-widest mb-2">
                  You are invited to
                </Text>

                <Text className="text-[#F5B800] text-3xl font-bold text-center mb-2">
                  {wedding.coupleName}
                </Text>

                <Text className="text-neutral-300 text-lg text-center mb-1">{formattedDate}</Text>

                <Text className="text-neutral-500 text-base text-center">{wedding.venue}</Text>
              </View>
            </LinearGradient>

            <View className="px-5 pt-6 pb-8">
              {/* Attendance Selection */}
              <View className="mb-6">
                <Text className="text-neutral-100 text-lg font-semibold mb-4">
                  Will you be attending?
                </Text>

                <View className="flex-row">
                  <Pressable
                    onPress={() => updateField("attending", true)}
                    className={`flex-1 p-4 rounded-2xl mr-3 border ${
                      formData.attending === true
                        ? "bg-emerald-900/30 border-emerald-500"
                        : "bg-neutral-900 border-neutral-800"
                    }`}
                  >
                    <View className="items-center">
                      <Ionicons
                        name="checkmark-circle"
                        size={32}
                        color={formData.attending === true ? "#10B981" : "#666666"}
                      />
                      <Text
                        className={`text-base font-semibold mt-2 ${
                          formData.attending === true ? "text-emerald-400" : "text-neutral-400"
                        }`}
                      >
                        Joyfully Accept
                      </Text>
                    </View>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      updateField("attending", false);
                      updateField("plusOne", false);
                    }}
                    className={`flex-1 p-4 rounded-2xl border ${
                      formData.attending === false
                        ? "bg-amber-900/30 border-amber-500"
                        : "bg-neutral-900 border-neutral-800"
                    }`}
                  >
                    <View className="items-center">
                      <Ionicons
                        name="close-circle"
                        size={32}
                        color={formData.attending === false ? "#F59E0B" : "#666666"}
                      />
                      <Text
                        className={`text-base font-semibold mt-2 ${
                          formData.attending === false ? "text-amber-400" : "text-neutral-400"
                        }`}
                      >
                        Regretfully Decline
                      </Text>
                    </View>
                  </Pressable>
                </View>

                {errors.attending && (
                  <Text className="text-red-400 text-sm mt-2">{errors.attending}</Text>
                )}
              </View>

              {/* Name Input */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">
                  Your Name <Text className="text-red-400">*</Text>
                </Text>
                <TextInput
                  value={formData.name}
                  onChangeText={(text) => updateField("name", text)}
                  placeholder="Enter your full name"
                  placeholderTextColor="#666666"
                  className="bg-neutral-900 rounded-xl p-4 text-neutral-100 border border-neutral-800"
                />
                {errors.name && <Text className="text-red-400 text-sm mt-1">{errors.name}</Text>}
              </View>

              {/* Email Input */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Email</Text>
                <TextInput
                  value={formData.email}
                  onChangeText={(text) => updateField("email", text)}
                  placeholder="your@email.com"
                  placeholderTextColor="#666666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-neutral-900 rounded-xl p-4 text-neutral-100 border border-neutral-800"
                />
              </View>

              {/* Phone Input */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Phone Number</Text>
                <TextInput
                  value={formData.phone}
                  onChangeText={(text) => updateField("phone", text)}
                  placeholder="(555) 123-4567"
                  placeholderTextColor="#666666"
                  keyboardType="phone-pad"
                  className="bg-neutral-900 rounded-xl p-4 text-neutral-100 border border-neutral-800"
                />
              </View>

              {/* Plus One Section - Only show if attending */}
              {formData.attending && (
                <>
                  <View className="mb-5">
                    <Pressable
                      onPress={() => updateField("plusOne", !formData.plusOne)}
                      className="flex-row items-center"
                    >
                      <View
                        className={`w-6 h-6 rounded-md border mr-3 items-center justify-center ${
                          formData.plusOne
                            ? "bg-[#F5B800] border-[#F5B800]"
                            : "border-neutral-600"
                        }`}
                      >
                        {formData.plusOne && <Ionicons name="checkmark" size={18} color="#000000" />}
                      </View>
                      <Text className="text-neutral-100 text-base">I will be bringing a +1</Text>
                    </Pressable>
                  </View>

                  {formData.plusOne && (
                    <View className="mb-5">
                      <Text className="text-neutral-300 text-sm font-medium mb-2">
                        Guest Name <Text className="text-red-400">*</Text>
                      </Text>
                      <TextInput
                        value={formData.plusOneName}
                        onChangeText={(text) => updateField("plusOneName", text)}
                        placeholder="Enter your guest's name"
                        placeholderTextColor="#666666"
                        className="bg-neutral-900 rounded-xl p-4 text-neutral-100 border border-neutral-800"
                      />
                      {errors.plusOneName && (
                        <Text className="text-red-400 text-sm mt-1">{errors.plusOneName}</Text>
                      )}
                    </View>
                  )}

                  {/* Meal Selection */}
                  <View className="mb-5">
                    <Text className="text-neutral-300 text-sm font-medium mb-3">
                      Meal Preference
                    </Text>
                    <View className="flex-row flex-wrap">
                      {MEAL_OPTIONS.map((option) => (
                        <Pressable
                          key={option.value}
                          onPress={() => updateField("mealType", option.value)}
                          className={`px-4 py-2 rounded-full mr-2 mb-2 border ${
                            formData.mealType === option.value
                              ? "bg-[#F5B800]/20 border-[#F5B800]"
                              : "bg-neutral-900 border-neutral-700"
                          }`}
                        >
                          <Text
                            className={`text-sm font-medium ${
                              formData.mealType === option.value
                                ? "text-[#F5B800]"
                                : "text-neutral-400"
                            }`}
                          >
                            {option.label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  {/* Dietary Restrictions */}
                  <View className="mb-5">
                    <Text className="text-neutral-300 text-sm font-medium mb-2">
                      Dietary Restrictions or Allergies
                    </Text>
                    <TextInput
                      value={formData.dietaryRestrictions}
                      onChangeText={(text) => updateField("dietaryRestrictions", text)}
                      placeholder="e.g., nut allergy, lactose intolerant"
                      placeholderTextColor="#666666"
                      multiline
                      numberOfLines={2}
                      className="bg-neutral-900 rounded-xl p-4 text-neutral-100 border border-neutral-800 min-h-[80px]"
                      textAlignVertical="top"
                    />
                  </View>
                </>
              )}

              {/* Message to Couple */}
              <View className="mb-8">
                <Text className="text-neutral-300 text-sm font-medium mb-2">
                  Message for the Couple (Optional)
                </Text>
                <TextInput
                  value={formData.message}
                  onChangeText={(text) => updateField("message", text)}
                  placeholder="Send your well wishes..."
                  placeholderTextColor="#666666"
                  multiline
                  numberOfLines={3}
                  className="bg-neutral-900 rounded-xl p-4 text-neutral-100 border border-neutral-800 min-h-[100px]"
                  textAlignVertical="top"
                />
              </View>

              {/* Submit Button */}
              <Pressable
                onPress={handleSubmit}
                className="bg-[#F5B800] rounded-2xl p-5 items-center active:opacity-70"
              >
                <Text className="text-black text-lg font-bold">Submit RSVP</Text>
              </Pressable>

              <View className="items-center mt-6">
                <Text className="text-neutral-600 text-xs text-center">
                  Your response helps the couple plan their special day
                </Text>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}
