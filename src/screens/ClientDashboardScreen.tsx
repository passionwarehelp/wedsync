import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import useAuthStore from "../state/authStore";
import useWeddingStore from "../state/weddingStore";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ClientDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  // Wedding store
  const weddings = useWeddingStore((s) => s.weddings);
  const addWedding = useWeddingStore((s) => s.addWedding);

  // Check if user has a wedding (either joined or created)
  const coupleWeddingId = useAuthStore((s) => s.user?.coupleWeddingId);
  const coupleWedding = weddings.find((w) => w.id === coupleWeddingId);

  // Modal states
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCreatePaywallModal, setShowCreatePaywallModal] = useState(false);

  // Join wedding form
  const [inviteCode, setInviteCode] = useState("");
  const [joinError, setJoinError] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  // Create wedding form
  const [partnerOneName, setPartnerOneName] = useState("");
  const [partnerTwoName, setPartnerTwoName] = useState("");
  const [weddingDate, setWeddingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [venue, setVenue] = useState("");

  const handleJoinWedding = async () => {
    if (!inviteCode.trim()) {
      setJoinError("Please enter an invite code");
      return;
    }

    setIsJoining(true);
    setJoinError("");

    // Simulate API call to validate invite code
    setTimeout(() => {
      // Check if any wedding has this QR code
      const foundWedding = weddings.find(
        (w) => w.qrCode?.toLowerCase() === inviteCode.trim().toLowerCase()
      );

      if (foundWedding) {
        // Update user with wedding ID
        useAuthStore.setState((state) => ({
          user: state.user ? { ...state.user, coupleWeddingId: foundWedding.id } : null,
        }));
        setShowJoinModal(false);
        setInviteCode("");
      } else {
        setJoinError("Invalid invite code. Please check with your photographer.");
      }
      setIsJoining(false);
    }, 1000);
  };

  const handleCreateWedding = () => {
    if (!partnerOneName.trim() || !partnerTwoName.trim() || !user?.id) {
      return;
    }

    const newWedding = {
      id: Date.now().toString(),
      coupleName: `${partnerOneName.trim()} & ${partnerTwoName.trim()}`,
      partnerOneName: partnerOneName.trim(),
      partnerTwoName: partnerTwoName.trim(),
      weddingDate: weddingDate.toISOString(),
      venue: venue.trim(),
      status: "planning" as const,
      createdAt: new Date().toISOString(),
      createdBy: user.id,
      qrCode: `WS-${Date.now()}`,
      qrCodeEnabled: true,
      photoAlbumLive: true,
      photoFrameEnabled: false,
      guestCount: 0,
      rsvpCount: 0,
      tasksCompleted: 0,
      totalTasks: 0,
    };

    addWedding(newWedding);

    // Link wedding to couple
    useAuthStore.setState((state) => ({
      user: state.user ? { ...state.user, coupleWeddingId: newWedding.id } : null,
    }));

    setShowCreateModal(false);
    setPartnerOneName("");
    setPartnerTwoName("");
    setVenue("");
    setWeddingDate(new Date());
  };

  const isCreateValid = partnerOneName.trim() && partnerTwoName.trim();

  // If couple has a wedding, show their wedding dashboard
  if (coupleWedding) {
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1a1a1a", "#000000"]}
          style={{ paddingTop: insets.top + 20, paddingBottom: 24, paddingHorizontal: 20 }}
        >
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-neutral-400 text-sm">Welcome back,</Text>
              <Text className="text-neutral-100 text-xl font-semibold">{user?.name}</Text>
            </View>
            <Pressable
              onPress={() => setShowSettingsModal(true)}
              className="w-10 h-10 rounded-full bg-neutral-800 items-center justify-center"
            >
              <Ionicons name="settings-outline" size={20} color="#F5B800" />
            </Pressable>
          </View>

          <View className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800">
            <Text className="text-[#F5B800] text-2xl font-bold mb-1">
              {coupleWedding.coupleName}
            </Text>
            <View className="flex-row items-center mt-2">
              <Ionicons name="calendar" size={16} color="#9CA3AF" />
              <Text className="text-neutral-400 ml-2">
                {format(new Date(coupleWedding.weddingDate), "MMMM d, yyyy")}
              </Text>
            </View>
            {coupleWedding.venue && (
              <View className="flex-row items-center mt-1">
                <Ionicons name="location" size={16} color="#9CA3AF" />
                <Text className="text-neutral-400 ml-2">{coupleWedding.venue}</Text>
              </View>
            )}
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
          {/* Quick Stats */}
          <View className="flex-row mb-6">
            <View className="flex-1 bg-neutral-900 rounded-xl p-4 mr-2 border border-neutral-800">
              <Text className="text-[#F5B800] text-2xl font-bold">
                {coupleWedding.rsvpCount}
              </Text>
              <Text className="text-neutral-400 text-sm">RSVPs</Text>
            </View>
            <View className="flex-1 bg-neutral-900 rounded-xl p-4 mx-2 border border-neutral-800">
              <Text className="text-[#F5B800] text-2xl font-bold">
                {coupleWedding.guestCount}
              </Text>
              <Text className="text-neutral-400 text-sm">Guests</Text>
            </View>
            <View className="flex-1 bg-neutral-900 rounded-xl p-4 ml-2 border border-neutral-800">
              <Text className="text-[#F5B800] text-2xl font-bold">
                {coupleWedding.tasksCompleted}/{coupleWedding.totalTasks}
              </Text>
              <Text className="text-neutral-400 text-sm">Tasks</Text>
            </View>
          </View>

          {/* Menu Items */}
          <Text className="text-neutral-100 text-lg font-semibold mb-4">Manage Your Wedding</Text>

          {/* Guest List & RSVP */}
          <Pressable
            onPress={() => navigation.navigate("GuestList", { weddingId: coupleWedding.id })}
            className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
          >
            <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
              <Ionicons name="people" size={24} color="#F5B800" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-neutral-100 text-lg font-medium">Guests & RSVP</Text>
              <Text className="text-neutral-500 text-sm">
                {coupleWedding.rsvpCount} of {coupleWedding.guestCount} responded
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>

          {/* RSVP Link - Share with guests */}
          <Pressable
            onPress={() => navigation.navigate("RSVPLink", { weddingId: coupleWedding.id })}
            className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
          >
            <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
              <Ionicons name="mail-open" size={24} color="#F5B800" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-neutral-100 text-lg font-medium">RSVP Link</Text>
              <Text className="text-neutral-500 text-sm">Share RSVP form with guests</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>

          {/* Tasks */}
          <Pressable
            onPress={() => navigation.navigate("Tasks", { weddingId: coupleWedding.id })}
            className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
          >
            <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
              <Ionicons name="checkmark-circle" size={24} color="#F5B800" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-neutral-100 text-lg font-medium">Tasks</Text>
              <Text className="text-neutral-500 text-sm">
                {coupleWedding.tasksCompleted} of {coupleWedding.totalTasks} completed
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>

          {/* Seating Chart */}
          <Pressable
            onPress={() => navigation.navigate("SeatingChart", { weddingId: coupleWedding.id })}
            className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
          >
            <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
              <Ionicons name="grid" size={24} color="#F5B800" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-neutral-100 text-lg font-medium">Seating Chart</Text>
              <Text className="text-neutral-500 text-sm">Arrange your table layout</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>

          {/* Photo Gallery - Shows "coming soon" if photographer hasn't made it live */}
          {coupleWedding.photoAlbumLive !== false ? (
            <Pressable
              onPress={() => navigation.navigate("PhotoGallery", { weddingId: coupleWedding.id })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="images" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Photo Gallery</Text>
                <Text className="text-neutral-500 text-sm">View wedding photos</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          ) : (
            <View className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 opacity-60">
              <View className="w-12 h-12 bg-neutral-800 rounded-full items-center justify-center">
                <Ionicons name="images" size={24} color="#666" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-400 text-lg font-medium">Photo Gallery</Text>
                <Text className="text-neutral-600 text-sm">Coming soon from your photographer</Text>
              </View>
              <Ionicons name="time-outline" size={20} color="#666" />
            </View>
          )}

          {/* QR Code Album - Only show if photographer enabled it (for photographer-managed weddings) */}
          {!(coupleWedding as any).isSelfManaged && coupleWedding.qrCodeEnabled !== false && (
            <Pressable
              onPress={() => navigation.navigate("QRCodeDesign", { weddingId: coupleWedding.id })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="qr-code" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Guest Photo Album</Text>
                <Text className="text-neutral-500 text-sm">View photos from guests</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          )}

          {/* Photo Frame - Only show if photographer enabled it */}
          {coupleWedding.photoFrameEnabled === true && (
            <Pressable
              onPress={() => {/* Navigate to photo frame screen */}}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="tablet-landscape-outline" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Photo Frame</Text>
                <Text className="text-neutral-500 text-sm">Digital photo display</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          )}

          {/* Calendar - Only for self-managed weddings */}
          {(coupleWedding as any).isSelfManaged && (
            <Pressable
              onPress={() => navigation.navigate("CoupleCalendar", { weddingId: coupleWedding.id })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="calendar" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Calendar</Text>
                <Text className="text-neutral-500 text-sm">Schedule appointments</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          )}

          {/* Notes - Only for self-managed weddings */}
          {(coupleWedding as any).isSelfManaged && (
            <Pressable
              onPress={() => navigation.navigate("CoupleNotes", { weddingId: coupleWedding.id })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="document-text" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Notes</Text>
                <Text className="text-neutral-500 text-sm">Keep wedding notes & ideas</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          )}

          {/* QR Code - Direct access for self-managed weddings (paid when created) */}
          {(coupleWedding as any).isSelfManaged && coupleWedding.qrCodeEnabled && (
            <Pressable
              onPress={() => navigation.navigate("QRCodeDesign", { weddingId: coupleWedding.id })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="qr-code" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">My Shared Photo Album</Text>
                <Text className="text-neutral-500 text-sm">Share QR code with your guests</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          )}

          <View style={{ height: insets.bottom + 20 }} />
        </ScrollView>

        {/* Settings Modal */}
        <Modal visible={showSettingsModal} transparent animationType="slide">
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-neutral-100 text-xl font-bold">Settings</Text>
                <Pressable onPress={() => setShowSettingsModal(false)}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
              </View>

              <View className="bg-neutral-800 rounded-xl p-4 mb-4">
                <Text className="text-neutral-100 font-medium">{user?.name}</Text>
                <Text className="text-neutral-400 text-sm">{user?.email}</Text>
              </View>

              <Pressable
                onPress={() => {
                  setShowSettingsModal(false);
                  signOut();
                }}
                className="bg-red-900/30 rounded-xl py-4 items-center border border-red-900"
              >
                <Text className="text-red-400 font-semibold">Sign Out</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // No wedding yet - show options to Join or Create
  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1a1a1a", "#000000"]}
        style={{ flex: 1 }}
      >
        <View style={{ paddingTop: insets.top + 20 }} className="flex-1 px-6">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8">
            <View>
              <Text className="text-neutral-400 text-sm">Welcome,</Text>
              <Text className="text-neutral-100 text-2xl font-bold">{user?.name}</Text>
            </View>
            <Pressable
              onPress={() => setShowSettingsModal(true)}
              className="w-10 h-10 rounded-full bg-neutral-800 items-center justify-center"
            >
              <Ionicons name="settings-outline" size={20} color="#F5B800" />
            </Pressable>
          </View>

          {/* Main Content */}
          <View className="flex-1 justify-center">
            <View className="items-center mb-10">
              <View className="w-20 h-20 rounded-full bg-[#F5B800]/20 items-center justify-center mb-4">
                <Ionicons name="heart" size={40} color="#F5B800" />
              </View>
              <Text className="text-neutral-100 text-2xl font-bold text-center mb-2">
                Get Started
              </Text>
              <Text className="text-neutral-400 text-center">
                Join your photographer{"'"}s wedding or create your own
              </Text>
            </View>

            {/* Join Wedding Option */}
            <Pressable
              onPress={() => setShowJoinModal(true)}
              className="bg-neutral-900 rounded-2xl p-6 mb-4 border border-neutral-800 active:border-[#F5B800]"
            >
              <View className="flex-row items-start">
                <View className="w-14 h-14 rounded-xl bg-[#F5B800]/20 items-center justify-center mr-4">
                  <Ionicons name="link" size={28} color="#F5B800" />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-100 text-xl font-bold mb-1">Join My Wedding</Text>
                  <Text className="text-neutral-400 text-sm leading-5">
                    Enter the invite code from your photographer to access your wedding details.
                  </Text>
                </View>
              </View>
            </Pressable>

            {/* Create Wedding Option */}
            <Pressable
              onPress={() => setShowCreatePaywallModal(true)}
              className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 active:border-[#F5B800]"
            >
              <View className="flex-row items-start">
                <View className="w-14 h-14 rounded-xl bg-[#F5B800]/20 items-center justify-center mr-4">
                  <Ionicons name="add-circle" size={28} color="#F5B800" />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-100 text-xl font-bold mb-1">Create My Wedding</Text>
                  <Text className="text-neutral-400 text-sm leading-5">
                    Plan your own wedding with guest management, seating charts, calendar, and more.
                  </Text>
                  <View className="flex-row items-center mt-3">
                    <Text className="text-[#F5B800] font-semibold mr-2">$50</Text>
                    <Text className="text-neutral-500 text-xs">one-time</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      {/* Join Wedding Modal */}
      <Modal visible={showJoinModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-neutral-100 text-xl font-bold">Join Wedding</Text>
                <Pressable onPress={() => {
                  setShowJoinModal(false);
                  setInviteCode("");
                  setJoinError("");
                }}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
              </View>

              <Text className="text-neutral-400 text-sm mb-4">
                Enter the invite code provided by your photographer
              </Text>

              {joinError ? (
                <View className="bg-red-900/30 border border-red-900 rounded-xl px-4 py-3 mb-4">
                  <Text className="text-red-400 text-sm">{joinError}</Text>
                </View>
              ) : null}

              <View className="mb-6">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Invite Code</Text>
                <TextInput
                  value={inviteCode}
                  onChangeText={(text) => {
                    setInviteCode(text);
                    setJoinError("");
                  }}
                  placeholder="e.g. WS-1234567890"
                  placeholderTextColor="#6B7280"
                  className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700 text-center"
                  autoCapitalize="characters"
                  autoCorrect={false}
                />
              </View>

              <Pressable
                onPress={handleJoinWedding}
                disabled={isJoining || !inviteCode.trim()}
                className={`rounded-xl py-4 items-center ${
                  isJoining || !inviteCode.trim() ? "bg-neutral-800" : "bg-[#F5B800] active:opacity-80"
                }`}
              >
                {isJoining ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text className={`text-lg font-semibold ${
                    inviteCode.trim() ? "text-black" : "text-neutral-600"
                  }`}>
                    Join Wedding
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Create Wedding Modal */}
      <Modal visible={showCreateModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <ScrollView
              className="max-h-[85%]"
              contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
              keyboardShouldPersistTaps="handled"
            >
              <View className="bg-neutral-900 rounded-t-3xl p-6">
                <View className="flex-row items-center justify-between mb-6">
                  <Text className="text-neutral-100 text-xl font-bold">Create Wedding</Text>
                  <Pressable onPress={() => {
                    setShowCreateModal(false);
                    setPartnerOneName("");
                    setPartnerTwoName("");
                    setVenue("");
                  }}>
                    <Ionicons name="close" size={24} color="#9CA3AF" />
                  </Pressable>
                </View>

                {/* Partner 1 Name */}
                <View className="mb-4">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Your Name *</Text>
                  <TextInput
                    value={partnerOneName}
                    onChangeText={setPartnerOneName}
                    placeholder="Enter your name"
                    placeholderTextColor="#6B7280"
                    className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                    autoCapitalize="words"
                  />
                </View>

                {/* Partner 2 Name */}
                <View className="mb-4">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Partner{"'"}s Name *</Text>
                  <TextInput
                    value={partnerTwoName}
                    onChangeText={setPartnerTwoName}
                    placeholder="Enter partner's name"
                    placeholderTextColor="#6B7280"
                    className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                    autoCapitalize="words"
                  />
                </View>

                {/* Wedding Date */}
                <View className="mb-4">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Wedding Date</Text>
                  <Pressable
                    onPress={() => setShowDatePicker(true)}
                    className="bg-neutral-800 rounded-xl px-4 py-4 border border-neutral-700 flex-row items-center"
                  >
                    <Ionicons name="calendar-outline" size={20} color="#F5B800" />
                    <Text className="text-neutral-100 text-base ml-3">
                      {format(weddingDate, "MMMM d, yyyy")}
                    </Text>
                  </Pressable>
                  {showDatePicker && (
                    <View className="mt-3">
                      <DateTimePicker
                        value={weddingDate}
                        mode="date"
                        display="spinner"
                        themeVariant="dark"
                        onChange={(event, date) => {
                          setShowDatePicker(false);
                          if (date) setWeddingDate(date);
                        }}
                      />
                    </View>
                  )}
                </View>

                {/* Venue */}
                <View className="mb-6">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Venue (Optional)</Text>
                  <TextInput
                    value={venue}
                    onChangeText={setVenue}
                    placeholder="Enter venue name"
                    placeholderTextColor="#6B7280"
                    className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                  />
                </View>

                <Pressable
                  onPress={handleCreateWedding}
                  disabled={!isCreateValid}
                  className={`rounded-xl py-4 items-center ${
                    isCreateValid ? "bg-[#F5B800] active:opacity-80" : "bg-neutral-800"
                  }`}
                >
                  <Text className={`text-lg font-semibold ${
                    isCreateValid ? "text-black" : "text-neutral-600"
                  }`}>
                    Create Wedding
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Settings Modal */}
      <Modal visible={showSettingsModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-neutral-100 text-xl font-bold">Settings</Text>
              <Pressable onPress={() => setShowSettingsModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            <View className="bg-neutral-800 rounded-xl p-4 mb-4">
              <Text className="text-neutral-100 font-medium">{user?.name}</Text>
              <Text className="text-neutral-400 text-sm">{user?.email}</Text>
              <View className="flex-row items-center mt-2">
                <View className="bg-[#F5B800]/20 px-2 py-1 rounded">
                  <Text className="text-[#F5B800] text-xs font-medium">Bride / Groom</Text>
                </View>
              </View>
            </View>

            <Pressable
              onPress={() => {
                setShowSettingsModal(false);
                signOut();
              }}
              className="bg-red-900/30 rounded-xl py-4 items-center border border-red-900"
            >
              <Text className="text-red-400 font-semibold">Sign Out</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Create Wedding Paywall Modal - Sales Page */}
      <Modal visible={showCreatePaywallModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/80">
          <View className="bg-neutral-900 rounded-t-3xl max-h-[90%]">
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View className="p-6">
                {/* Close Button */}
                <View className="flex-row justify-end mb-2">
                  <Pressable
                    onPress={() => setShowCreatePaywallModal(false)}
                    className="w-8 h-8 rounded-full bg-neutral-800 items-center justify-center"
                  >
                    <Ionicons name="close" size={18} color="#9CA3AF" />
                  </Pressable>
                </View>

                {/* Hero Section */}
                <View className="items-center mb-8">
                  <View className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F5B800] to-[#8B7355] items-center justify-center mb-5">
                    <View className="w-20 h-20 rounded-full bg-[#F5B800]/30 items-center justify-center">
                      <Ionicons name="heart" size={40} color="#F5B800" />
                    </View>
                  </View>
                  <Text className="text-neutral-100 text-2xl font-bold text-center mb-3">
                    Your Wedding, Your Way
                  </Text>
                  <Text className="text-neutral-400 text-center text-base leading-6 px-4">
                    Everything you need to plan and capture your perfect day, all in one place.
                  </Text>
                </View>

                {/* Main Value Prop */}
                <View className="bg-[#F5B800]/10 rounded-2xl p-5 mb-6 border border-[#F5B800]/20">
                  <Text className="text-[#F5B800] text-lg font-semibold text-center mb-2">
                    Complete Wedding Planning Suite
                  </Text>
                  <Text className="text-neutral-300 text-center text-sm">
                    Plan, organize, and capture every moment.
                  </Text>
                </View>

                {/* Benefits List */}
                <View className="mb-6">
                  <Text className="text-neutral-100 text-lg font-semibold mb-4">
                    Everything included:
                  </Text>

                  {[
                    {
                      icon: "people",
                      title: "Guest Management",
                      desc: "Keep track of your guest list, RSVPs, and dietary requirements all in one place."
                    },
                    {
                      icon: "grid",
                      title: "Seating Charts",
                      desc: "Design your perfect seating arrangement with our easy drag-and-drop tool."
                    },
                    {
                      icon: "checkmark-circle",
                      title: "Task Planner",
                      desc: "Stay on top of your wedding to-dos with customizable task lists and reminders."
                    },
                    {
                      icon: "calendar",
                      title: "Calendar & Schedule",
                      desc: "Schedule vendor appointments, dress fittings, and all your wedding events."
                    },
                    {
                      icon: "document-text",
                      title: "Notes & Ideas",
                      desc: "Save inspiration, vendor contacts, and all your wedding ideas in one place."
                    },
                    {
                      icon: "qr-code",
                      title: "Shared Photo Album",
                      desc: "Get a beautiful QR code your guests can scan to share their photos with you!"
                    },
                  ].map((benefit, index) => (
                    <View key={index} className="flex-row mb-4">
                      <View className="w-10 h-10 rounded-full bg-[#F5B800]/10 items-center justify-center mr-3 mt-1">
                        <Ionicons name={benefit.icon as any} size={20} color="#F5B800" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-100 font-semibold mb-1">{benefit.title}</Text>
                        <Text className="text-neutral-400 text-sm leading-5">{benefit.desc}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Social Proof */}
                <View className="items-center mb-6">
                  <View className="flex-row mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons key={star} name="star" size={20} color="#F5B800" />
                    ))}
                  </View>
                  <Text className="text-neutral-400 text-sm text-center italic">
                    {"\"Made planning our wedding so much easier! Love the guest photo feature.\""}
                  </Text>
                  <Text className="text-neutral-500 text-xs mt-1">- Emily & James, married 2024</Text>
                </View>

                {/* Price Section */}
                <View className="bg-gradient-to-r from-[#F5B800]/20 to-[#8B7355]/20 rounded-2xl p-6 mb-6 border border-[#F5B800]/30">
                  <View className="items-center">
                    <Text className="text-neutral-400 text-sm mb-1">One-time purchase</Text>
                    <Text className="text-[#F5B800] text-4xl font-bold mb-1">$50</Text>
                    <Text className="text-neutral-500 text-xs">No subscriptions. Yours forever.</Text>
                  </View>
                </View>

                {/* CTA Button */}
                <Pressable
                  onPress={() => {
                    // TODO: Integrate with RevenueCat payment system
                    // After successful payment, show create wedding form
                    setShowCreatePaywallModal(false);
                    setShowCreateModal(true);
                  }}
                  className="bg-[#F5B800] rounded-2xl py-5 items-center mb-4 active:opacity-90"
                >
                  <Text className="text-black text-lg font-bold">Create My Wedding</Text>
                  <Text className="text-black/70 text-sm mt-1">Get started planning your big day</Text>
                </Pressable>

                {/* Secondary CTA */}
                <Pressable
                  onPress={() => setShowCreatePaywallModal(false)}
                  className="py-4 items-center mb-4"
                >
                  <Text className="text-neutral-500">Maybe later</Text>
                </Pressable>

                {/* Trust Badge */}
                <View className="flex-row items-center justify-center mb-2">
                  <Ionicons name="shield-checkmark" size={16} color="#6B7280" />
                  <Text className="text-neutral-600 text-xs ml-2">Secure payment powered by Stripe</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
