import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth, UserRole } from "../lib/useAuth";

type AuthMode = "welcome" | "login" | "signup" | "role-select";

export default function AuthScreen() {
  const insets = useSafeAreaInsets();

  // Use the auth hook
  const { signIn: authSignIn, signUp: authSignUp, isPending } = useAuth();

  const [mode, setMode] = useState<AuthMode>("welcome");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim() || !name.trim() || !selectedRole) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    try {
      await authSignUp(email, password, name, selectedRole);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    }
  };

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      await authSignIn(email, password);
    } catch (err: any) {
      setError(err?.message || "Invalid email or password");
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setMode("signup");
  };

  // Welcome Screen
  if (mode === "welcome") {
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1a1a1a", "#000000"]}
          style={{ flex: 1 }}
        >
          <View style={{ paddingTop: insets.top + 60 }} className="flex-1 px-6">
            {/* Logo/Brand */}
            <View className="items-center mb-12">
              <View className="w-24 h-24 rounded-full bg-[#F5B800]/20 items-center justify-center mb-6">
                <Ionicons name="heart" size={48} color="#F5B800" />
              </View>
              <Text className="text-[#F5B800] text-4xl font-bold">WedSync</Text>
              <Text className="text-neutral-400 text-lg mt-2 text-center">
                Your wedding, perfectly organized
              </Text>
            </View>

            {/* Features */}
            <View className="mb-12">
              {[
                { icon: "videocam", text: "Professional media management" },
                { icon: "people", text: "Guest list & RSVP tracking" },
                { icon: "grid", text: "Seating chart builder" },
                { icon: "qr-code", text: "QR code media sharing" },
              ].map((feature, index) => (
                <View key={index} className="flex-row items-center mb-4">
                  <View className="w-10 h-10 rounded-full bg-[#F5B800]/10 items-center justify-center mr-4">
                    <Ionicons name={feature.icon as any} size={20} color="#F5B800" />
                  </View>
                  <Text className="text-neutral-300 text-base">{feature.text}</Text>
                </View>
              ))}
            </View>

            {/* Buttons */}
            <View className="mt-auto" style={{ paddingBottom: insets.bottom + 40 }}>
              <Pressable
                onPress={() => setMode("role-select")}
                className="bg-[#F5B800] rounded-2xl py-4 items-center mb-4 active:opacity-80"
              >
                <Text className="text-black text-lg font-semibold">Get Started</Text>
              </Pressable>

              <Pressable
                onPress={() => setMode("login")}
                className="border border-[#F5B800] rounded-2xl py-4 items-center active:opacity-80"
              >
                <Text className="text-[#F5B800] text-lg font-semibold">I already have an account</Text>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Role Selection Screen
  if (mode === "role-select") {
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1a1a1a", "#000000"]}
          style={{ flex: 1 }}
        >
          <View style={{ paddingTop: insets.top + 20 }} className="flex-1 px-6">
            {/* Header */}
            <Pressable onPress={() => setMode("welcome")} className="mb-8">
              <Ionicons name="arrow-back" size={28} color="#F5B800" />
            </Pressable>

            <Text className="text-neutral-100 text-3xl font-bold mb-2">
              How will you use WedSync?
            </Text>
            <Text className="text-neutral-400 text-base mb-10">
              Choose the option that best describes you
            </Text>

            {/* Role Options */}
            <View className="flex-1">
              {/* Photographer/Videographer Option */}
              <Pressable
                onPress={() => handleRoleSelect("photographer")}
                className="bg-neutral-900 rounded-3xl p-6 mb-4 border-2 border-neutral-800 active:border-[#F5B800]"
              >
                <View className="flex-row items-start">
                  <View className="w-16 h-16 rounded-2xl bg-[#F5B800]/20 items-center justify-center mr-4">
                    <Ionicons name="videocam" size={32} color="#F5B800" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-neutral-100 text-xl font-bold mb-1">Photographer / Videographer</Text>
                    <Text className="text-neutral-400 text-sm leading-5">
                      I capture weddings and want to manage multiple events, share media, and coordinate with couples.
                    </Text>
                  </View>
                </View>
                <View className="flex-row flex-wrap mt-4">
                  {["Manage Events", "Media Gallery", "Client Portal", "Invoicing"].map((tag) => (
                    <View key={tag} className="bg-neutral-800 px-3 py-1 rounded-full mr-2 mb-2">
                      <Text className="text-neutral-400 text-xs">{tag}</Text>
                    </View>
                  ))}
                </View>
              </Pressable>

              {/* Bride/Groom Option */}
              <Pressable
                onPress={() => handleRoleSelect("couple")}
                className="bg-neutral-900 rounded-3xl p-6 border-2 border-neutral-800 active:border-[#F5B800]"
              >
                <View className="flex-row items-start">
                  <View className="w-16 h-16 rounded-2xl bg-[#F5B800]/20 items-center justify-center mr-4">
                    <Ionicons name="heart" size={32} color="#F5B800" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-neutral-100 text-xl font-bold mb-1">Bride / Groom</Text>
                    <Text className="text-neutral-400 text-sm leading-5">
                      I am planning my wedding and want to organize guests, seating, tasks, and view media from my photographer/videographer.
                    </Text>
                  </View>
                </View>
                <View className="flex-row flex-wrap mt-4">
                  {["Guest List", "Seating Chart", "RSVP", "Media Access"].map((tag) => (
                    <View key={tag} className="bg-neutral-800 px-3 py-1 rounded-full mr-2 mb-2">
                      <Text className="text-neutral-400 text-xs">{tag}</Text>
                    </View>
                  ))}
                </View>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Login / Signup Form
  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1a1a1a", "#000000"]}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ paddingTop: insets.top + 20 }} className="flex-1">
            {/* Header */}
            <View className="px-6 mb-6">
              <Pressable
                onPress={() => setMode(mode === "login" ? "welcome" : "role-select")}
                className="mb-8"
              >
                <Ionicons name="arrow-back" size={28} color="#F5B800" />
              </Pressable>

              <Text className="text-neutral-100 text-3xl font-bold mb-2">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </Text>
              <Text className="text-neutral-400 text-base">
                {mode === "login"
                  ? "Sign in to continue to WedSync"
                  : selectedRole === "photographer"
                    ? "Join as a wedding photographer/videographer"
                    : "Start planning your perfect day"}
              </Text>
            </View>

            <KeyboardAvoidingView
              className="flex-1"
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={0}
            >
              <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
              >
                {/* Role Badge (signup only) */}
                {mode === "signup" && selectedRole && (
                  <View className="flex-row items-center mb-6">
                    <View className="flex-row items-center bg-[#F5B800]/10 px-4 py-2 rounded-full">
                      <Ionicons
                        name={selectedRole === "photographer" ? "videocam" : "heart"}
                        size={16}
                        color="#F5B800"
                      />
                      <Text className="text-[#F5B800] font-medium ml-2 capitalize">
                        {selectedRole === "photographer" ? "Photographer / Videographer" : "Bride / Groom"}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Error Message */}
                {error ? (
                  <View className="bg-red-900/30 border border-red-900 rounded-xl px-4 py-3 mb-4">
                    <Text className="text-red-400 text-sm">{error}</Text>
                  </View>
                ) : null}

                {/* Name Field (signup only) */}
                {mode === "signup" && (
                  <View className="mb-4">
                    <Text className="text-neutral-300 text-sm font-medium mb-2">Full Name</Text>
                    <View className="bg-neutral-900 rounded-xl border border-neutral-800 flex-row items-center">
                      <View className="pl-4">
                        <Ionicons name="person-outline" size={20} color="#6B7280" />
                      </View>
                      <TextInput
                        value={name}
                        onChangeText={(text) => {
                          setName(text);
                          setError("");
                        }}
                        placeholder="Enter your full name"
                        placeholderTextColor="#6B7280"
                        className="flex-1 px-4 py-4 text-base text-neutral-100"
                        autoCapitalize="words"
                        returnKeyType="next"
                      />
                    </View>
                  </View>
                )}

                {/* Email Field */}
                <View className="mb-4">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Email</Text>
                  <View className="bg-neutral-900 rounded-xl border border-neutral-800 flex-row items-center">
                    <View className="pl-4">
                      <Ionicons name="mail-outline" size={20} color="#6B7280" />
                    </View>
                    <TextInput
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        setError("");
                      }}
                      placeholder="Enter your email"
                      placeholderTextColor="#6B7280"
                      className="flex-1 px-4 py-4 text-base text-neutral-100"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                    />
                  </View>
                </View>

                {/* Password Field */}
                <View className="mb-6">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Password</Text>
                  <View className="bg-neutral-900 rounded-xl border border-neutral-800 flex-row items-center">
                    <View className="pl-4">
                      <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                    </View>
                    <TextInput
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        setError("");
                      }}
                      placeholder={mode === "signup" ? "Create a password (min 6 chars)" : "Enter your password"}
                      placeholderTextColor="#6B7280"
                      className="flex-1 px-4 py-4 text-base text-neutral-100"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      returnKeyType="done"
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)} className="pr-4">
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#6B7280"
                      />
                    </Pressable>
                  </View>
                </View>

                {/* Submit Button */}
                <Pressable
                  onPress={mode === "login" ? handleSignIn : handleSignUp}
                  disabled={isPending}
                  className={`rounded-2xl py-4 items-center mb-6 ${
                    isPending ? "bg-[#F5B800]/50" : "bg-[#F5B800] active:opacity-80"
                  }`}
                >
                  {isPending ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <Text className="text-black text-lg font-semibold">
                      {mode === "login" ? "Sign In" : "Create Account"}
                    </Text>
                  )}
                </Pressable>

                {/* Toggle Login/Signup */}
                <View className="flex-row justify-center">
                  <Text className="text-neutral-500">
                    {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setError("");
                      if (mode === "login") {
                        setMode("role-select");
                      } else {
                        setMode("login");
                      }
                    }}
                  >
                    <Text className="text-[#F5B800] font-semibold">
                      {mode === "login" ? "Sign Up" : "Sign In"}
                    </Text>
                  </Pressable>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </View>
  );
}
