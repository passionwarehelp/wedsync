import React, { useState, useCallback, useEffect } from "react";
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
  Dimensions,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import useAuthStore from "../state/authStore";
import useWeddingStore from "../state/weddingStore";
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ClientDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  // Wedding store
  const weddings = useWeddingStore((s) => s.weddings);
  const addWedding = useWeddingStore((s) => s.addWedding);
  const fetchWeddings = useWeddingStore((s) => s.fetchWeddings);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch weddings on mount and when user changes
  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        fetchWeddings();
      }
    }, [user?.id])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWeddings();
    setRefreshing(false);
  };

  // Check if user has a wedding - use first wedding from server or local coupleWeddingId
  const coupleWeddingId = useAuthStore((s) => s.user?.coupleWeddingId);
  const coupleWedding = weddings.length > 0
    ? (weddings.find((w) => w.id === coupleWeddingId) || weddings[0])
    : undefined;

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
  const [venue, setVenue] = useState("");

  const handleJoinWedding = async () => {
    if (!inviteCode.trim()) {
      setJoinError("Please enter an invite code");
      return;
    }

    setIsJoining(true);
    setJoinError("");

    setTimeout(() => {
      const foundWedding = weddings.find(
        (w) => w.qrCode?.toLowerCase() === inviteCode.trim().toLowerCase()
      );

      if (foundWedding) {
        useAuthStore.setState((state) => ({
          user: state.user ? { ...state.user, coupleWeddingId: foundWedding.id } : null,
        }));
        setShowJoinModal(false);
        setInviteCode("");
      } else {
        setJoinError("Invalid invite code. Please check with your media professional.");
      }
      setIsJoining(false);
    }, 1000);
  };

  const [isCreating, setIsCreating] = useState(false);

  const handleCreateWedding = async () => {
    if (!partnerOneName.trim() || !partnerTwoName.trim() || !user?.id || isCreating) {
      return;
    }

    setIsCreating(true);

    try {
      const weddingData = {
        coupleName: `${partnerOneName.trim()} & ${partnerTwoName.trim()}`,
        partnerOneName: partnerOneName.trim(),
        partnerTwoName: partnerTwoName.trim(),
        weddingDate: weddingDate.toISOString(),
        venue: venue.trim(),
        status: "planning" as const,
        qrCode: `WS-${Date.now()}`,
        qrCodeEnabled: true,
        photoAlbumLive: true,
        photoFrameEnabled: false,
        guestCount: 0,
        rsvpCount: 0,
        tasksCompleted: 0,
        totalTasks: 0,
        isSelfManaged: true,
      };

      const newWedding = await addWedding(weddingData);

      if (newWedding) {
        useAuthStore.setState((state) => ({
          user: state.user ? { ...state.user, coupleWeddingId: newWedding.id } : null,
        }));
      }

      setShowCreateModal(false);
      setPartnerOneName("");
      setPartnerTwoName("");
      setVenue("");
      setWeddingDate(new Date());
    } catch (error) {
      console.error("[ClientDashboard Web] Error creating wedding:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const isCreateValid = partnerOneName.trim() && partnerTwoName.trim();

  // Dashboard with wedding
  if (coupleWedding) {
    const windowWidth = Dimensions.get("window").width;
    const isLargeScreen = windowWidth >= 1024;
    const isMediumScreen = windowWidth >= 768;

    return (
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        {/* Top Navigation Bar */}
        <View
          style={{
            backgroundColor: "#0a0a0a",
            borderBottomWidth: 1,
            borderBottomColor: "#1F1F1F",
            paddingVertical: 16,
            paddingHorizontal: isLargeScreen ? 48 : 24,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#F5B800",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Ionicons name="heart" size={22} color="#000" />
              </View>
              <View>
                <Text style={{ color: "#F5B800", fontSize: 18, fontWeight: "bold" }}>
                  WedSync
                </Text>
                <Text style={{ color: "#666", fontSize: 12 }}>Wedding Dashboard</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#9CA3AF", fontSize: 14, marginRight: 12 }}>
                {user?.name}
              </Text>
              <Pressable
                onPress={() => setShowSettingsModal(true)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "#1F1F1F",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="settings-outline" size={18} color="#F5B800" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: isLargeScreen ? 48 : 24,
            paddingTop: 32,
            paddingBottom: 40,
          }}
        >
          {/* Wedding Header Card */}
          <View
            style={{
              backgroundColor: "#0f0f0f",
              borderRadius: 20,
              padding: isLargeScreen ? 32 : 24,
              borderWidth: 1,
              borderColor: "#1F1F1F",
              marginBottom: 32,
            }}
          >
            <Text style={{ color: "#F5B800", fontSize: isLargeScreen ? 36 : 28, fontWeight: "bold", marginBottom: 8 }}>
              {coupleWedding.coupleName}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
              <Ionicons name="calendar" size={18} color="#9CA3AF" />
              <Text style={{ color: "#9CA3AF", fontSize: 16, marginLeft: 8 }}>
                {format(new Date(coupleWedding.weddingDate), "MMMM d, yyyy")}
              </Text>
            </View>
            {coupleWedding.venue && (
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
                <Ionicons name="location" size={18} color="#9CA3AF" />
                <Text style={{ color: "#9CA3AF", fontSize: 16, marginLeft: 8 }}>
                  {coupleWedding.venue}
                </Text>
              </View>
            )}
          </View>

          {/* Stats Grid */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: 32,
              gap: isLargeScreen ? 24 : 16,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#0f0f0f",
                borderRadius: 16,
                padding: isLargeScreen ? 28 : 20,
                borderWidth: 1,
                borderColor: "#1F1F1F",
              }}
            >
              <Text style={{ color: "#F5B800", fontSize: isLargeScreen ? 40 : 32, fontWeight: "bold" }}>
                {coupleWedding.rsvpCount}
              </Text>
              <Text style={{ color: "#9CA3AF", fontSize: 14, marginTop: 4 }}>RSVPs</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#0f0f0f",
                borderRadius: 16,
                padding: isLargeScreen ? 28 : 20,
                borderWidth: 1,
                borderColor: "#1F1F1F",
              }}
            >
              <Text style={{ color: "#F5B800", fontSize: isLargeScreen ? 40 : 32, fontWeight: "bold" }}>
                {coupleWedding.guestCount}
              </Text>
              <Text style={{ color: "#9CA3AF", fontSize: 14, marginTop: 4 }}>Guests</Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#0f0f0f",
                borderRadius: 16,
                padding: isLargeScreen ? 28 : 20,
                borderWidth: 1,
                borderColor: "#1F1F1F",
              }}
            >
              <Text style={{ color: "#F5B800", fontSize: isLargeScreen ? 40 : 32, fontWeight: "bold" }}>
                {coupleWedding.tasksCompleted}/{coupleWedding.totalTasks}
              </Text>
              <Text style={{ color: "#9CA3AF", fontSize: 14, marginTop: 4 }}>Tasks</Text>
            </View>
          </View>

          {/* Section Title */}
          <Text style={{ color: "#E5E5E5", fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
            Manage Your Wedding
          </Text>

          {/* Menu Grid - 2 columns on large screens */}
          <View
            style={{
              flexDirection: isLargeScreen ? "row" : "column",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            {/* Guest List & RSVP */}
            <Pressable
              onPress={() => navigation.navigate("GuestList", { weddingId: coupleWedding.id })}
              style={{
                backgroundColor: "#0f0f0f",
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: "#1F1F1F",
                flexDirection: "row",
                alignItems: "center",
                width: isLargeScreen ? "49%" : "100%",
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: "rgba(245, 184, 0, 0.1)",
                  borderRadius: 28,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="people" size={28} color="#F5B800" />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={{ color: "#E5E5E5", fontSize: 18, fontWeight: "600" }}>
                  Guests & RSVP
                </Text>
                <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
                  {coupleWedding.rsvpCount} of {coupleWedding.guestCount} responded
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#6B7280" />
            </Pressable>

            {/* RSVP Link */}
            <Pressable
              onPress={() => navigation.navigate("RSVPLink", { weddingId: coupleWedding.id })}
              style={{
                backgroundColor: "#0f0f0f",
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: "#1F1F1F",
                flexDirection: "row",
                alignItems: "center",
                width: isLargeScreen ? "49%" : "100%",
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: "rgba(245, 184, 0, 0.1)",
                  borderRadius: 28,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="mail-open" size={28} color="#F5B800" />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={{ color: "#E5E5E5", fontSize: 18, fontWeight: "600" }}>
                  RSVP Link
                </Text>
                <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
                  Share RSVP form with guests
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#6B7280" />
            </Pressable>

            {/* Tasks */}
            <Pressable
              onPress={() => navigation.navigate("Tasks", { weddingId: coupleWedding.id })}
              style={{
                backgroundColor: "#0f0f0f",
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: "#1F1F1F",
                flexDirection: "row",
                alignItems: "center",
                width: isLargeScreen ? "49%" : "100%",
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: "rgba(245, 184, 0, 0.1)",
                  borderRadius: 28,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="checkmark-circle" size={28} color="#F5B800" />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={{ color: "#E5E5E5", fontSize: 18, fontWeight: "600" }}>
                  Tasks
                </Text>
                <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
                  {coupleWedding.tasksCompleted} of {coupleWedding.totalTasks} completed
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#6B7280" />
            </Pressable>

            {/* Seating Chart */}
            <Pressable
              onPress={() => navigation.navigate("SeatingChart", { weddingId: coupleWedding.id })}
              style={{
                backgroundColor: "#0f0f0f",
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: "#1F1F1F",
                flexDirection: "row",
                alignItems: "center",
                width: isLargeScreen ? "49%" : "100%",
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: "rgba(245, 184, 0, 0.1)",
                  borderRadius: 28,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="grid" size={28} color="#F5B800" />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={{ color: "#E5E5E5", fontSize: 18, fontWeight: "600" }}>
                  Seating Chart
                </Text>
                <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
                  Arrange your table layout
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color="#6B7280" />
            </Pressable>

            {/* Photo Gallery */}
            {coupleWedding.photoAlbumLive !== false ? (
              <Pressable
                onPress={() => navigation.navigate("PhotoGallery", { weddingId: coupleWedding.id })}
                style={{
                  backgroundColor: "#0f0f0f",
                  borderRadius: 16,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "#1F1F1F",
                  flexDirection: "row",
                  alignItems: "center",
                  width: isLargeScreen ? "49%" : "100%",
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: "rgba(245, 184, 0, 0.1)",
                    borderRadius: 28,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="images" size={28} color="#F5B800" />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={{ color: "#E5E5E5", fontSize: 18, fontWeight: "600" }}>
                    Photo Gallery
                  </Text>
                  <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
                    View wedding photos
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#6B7280" />
              </Pressable>
            ) : (
              <View
                style={{
                  backgroundColor: "#0f0f0f",
                  borderRadius: 16,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "#1F1F1F",
                  flexDirection: "row",
                  alignItems: "center",
                  opacity: 0.5,
                  width: isLargeScreen ? "49%" : "100%",
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: "#1a1a1a",
                    borderRadius: 28,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="images" size={28} color="#666" />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={{ color: "#666", fontSize: 18, fontWeight: "600" }}>
                    Media Gallery
                  </Text>
                  <Text style={{ color: "#444", fontSize: 14, marginTop: 2 }}>
                    Coming soon from your media professional
                  </Text>
                </View>
                <Ionicons name="time-outline" size={22} color="#666" />
              </View>
            )}

            {/* QR Code Album - Show for professional-managed weddings */}
            {!(coupleWedding as any).isSelfManaged && coupleWedding.qrCodeEnabled !== false && (
              <Pressable
                onPress={() => navigation.navigate("QRCodeDesign", { weddingId: coupleWedding.id })}
                style={{
                  backgroundColor: "#0f0f0f",
                  borderRadius: 16,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "#1F1F1F",
                  flexDirection: "row",
                  alignItems: "center",
                  width: isLargeScreen ? "49%" : "100%",
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: "rgba(245, 184, 0, 0.1)",
                    borderRadius: 28,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="qr-code" size={28} color="#F5B800" />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={{ color: "#E5E5E5", fontSize: 18, fontWeight: "600" }}>
                    Guest Media Album
                  </Text>
                  <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
                    View photos & videos from guests
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#6B7280" />
              </Pressable>
            )}

            {/* Calendar - Only for self-managed */}
            {(coupleWedding as any).isSelfManaged && (
              <Pressable
                onPress={() => navigation.navigate("CoupleCalendar", { weddingId: coupleWedding.id })}
                style={{
                  backgroundColor: "#0f0f0f",
                  borderRadius: 16,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "#1F1F1F",
                  flexDirection: "row",
                  alignItems: "center",
                  width: isLargeScreen ? "49%" : "100%",
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: "rgba(245, 184, 0, 0.1)",
                    borderRadius: 28,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="calendar" size={28} color="#F5B800" />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={{ color: "#E5E5E5", fontSize: 18, fontWeight: "600" }}>
                    Calendar
                  </Text>
                  <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
                    Schedule appointments
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#6B7280" />
              </Pressable>
            )}

            {/* Notes - Only for self-managed */}
            {(coupleWedding as any).isSelfManaged && (
              <Pressable
                onPress={() => navigation.navigate("CoupleNotes", { weddingId: coupleWedding.id })}
                style={{
                  backgroundColor: "#0f0f0f",
                  borderRadius: 16,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "#1F1F1F",
                  flexDirection: "row",
                  alignItems: "center",
                  width: isLargeScreen ? "49%" : "100%",
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: "rgba(245, 184, 0, 0.1)",
                    borderRadius: 28,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="document-text" size={28} color="#F5B800" />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={{ color: "#E5E5E5", fontSize: 18, fontWeight: "600" }}>
                    Notes
                  </Text>
                  <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
                    Keep wedding notes & ideas
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#6B7280" />
              </Pressable>
            )}

            {/* QR Code - Self-managed weddings */}
            {(coupleWedding as any).isSelfManaged && coupleWedding.qrCodeEnabled && (
              <Pressable
                onPress={() => navigation.navigate("QRCodeDesign", { weddingId: coupleWedding.id })}
                style={{
                  backgroundColor: "#0f0f0f",
                  borderRadius: 16,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "#1F1F1F",
                  flexDirection: "row",
                  alignItems: "center",
                  width: isLargeScreen ? "49%" : "100%",
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: "rgba(245, 184, 0, 0.1)",
                    borderRadius: 28,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="qr-code" size={28} color="#F5B800" />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={{ color: "#E5E5E5", fontSize: 18, fontWeight: "600" }}>
                    My Shared Photo Album
                  </Text>
                  <Text style={{ color: "#6B7280", fontSize: 14, marginTop: 2 }}>
                    Share QR code with your guests
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={22} color="#6B7280" />
              </Pressable>
            )}
          </View>
        </ScrollView>

        {/* Settings Modal */}
        <Modal visible={showSettingsModal} transparent animationType="fade">
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.8)" }}>
            <View
              style={{
                backgroundColor: "#0f0f0f",
                borderRadius: 24,
                padding: 32,
                width: 400,
                maxWidth: "90%",
                borderWidth: 1,
                borderColor: "#1F1F1F",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <Text style={{ color: "#E5E5E5", fontSize: 22, fontWeight: "bold" }}>Settings</Text>
                <Pressable onPress={() => setShowSettingsModal(false)}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
              </View>

              <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, padding: 20, marginBottom: 20 }}>
                <Text style={{ color: "#E5E5E5", fontWeight: "600", fontSize: 16 }}>{user?.name}</Text>
                <Text style={{ color: "#9CA3AF", fontSize: 14, marginTop: 4 }}>{user?.email}</Text>
              </View>

              <Pressable
                onPress={() => {
                  setShowSettingsModal(false);
                  signOut();
                }}
                style={{
                  backgroundColor: "rgba(220, 38, 38, 0.2)",
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#991B1B",
                }}
              >
                <Text style={{ color: "#EF4444", fontWeight: "600" }}>Sign Out</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // No wedding yet - onboarding view
  const windowWidth = Dimensions.get("window").width;
  const isLargeScreen = windowWidth >= 1024;

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
          paddingVertical: 48,
        }}
      >
        {/* Header */}
        <View style={{ position: "absolute", top: 24, right: 24 }}>
          <Pressable
            onPress={() => setShowSettingsModal(true)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#1F1F1F",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="settings-outline" size={20} color="#F5B800" />
          </Pressable>
        </View>

        <View style={{ maxWidth: 600, width: "100%", alignItems: "center" }}>
          {/* Welcome Message */}
          <View style={{ alignItems: "center", marginBottom: 48 }}>
            <View
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                backgroundColor: "rgba(245, 184, 0, 0.15)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <Ionicons name="heart" size={48} color="#F5B800" />
            </View>
            <Text style={{ color: "#E5E5E5", fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 12 }}>
              Welcome, {user?.name}
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 16, textAlign: "center", lineHeight: 24 }}>
              Join your media professional{"'"}s wedding or create your own to get started
            </Text>
          </View>

          {/* Join Wedding Option */}
          <Pressable
            onPress={() => setShowJoinModal(true)}
            style={{
              backgroundColor: "#0f0f0f",
              borderRadius: 20,
              padding: 28,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#1F1F1F",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: "rgba(245, 184, 0, 0.15)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 20,
                }}
              >
                <Ionicons name="link" size={32} color="#F5B800" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#E5E5E5", fontSize: 22, fontWeight: "bold", marginBottom: 6 }}>
                  Join My Wedding
                </Text>
                <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20 }}>
                  Enter the invite code from your media professional to access your wedding details.
                </Text>
              </View>
            </View>
          </Pressable>

          {/* Create Wedding Option */}
          <Pressable
            onPress={() => setShowCreatePaywallModal(true)}
            style={{
              backgroundColor: "#0f0f0f",
              borderRadius: 20,
              padding: 28,
              borderWidth: 1,
              borderColor: "#1F1F1F",
              width: "100%",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: "rgba(245, 184, 0, 0.15)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 20,
                }}
              >
                <Ionicons name="add-circle" size={32} color="#F5B800" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#E5E5E5", fontSize: 22, fontWeight: "bold", marginBottom: 6 }}>
                  Create My Wedding
                </Text>
                <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20, marginBottom: 12 }}>
                  Plan your own wedding with guest management, seating charts, calendar, and more.
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#F5B800", fontWeight: "600", fontSize: 18, marginRight: 8 }}>
                    $50
                  </Text>
                  <Text style={{ color: "#6B7280", fontSize: 12 }}>one-time</Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>

      {/* Join Wedding Modal */}
      <Modal visible={showJoinModal} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.85)" }}>
          <View
            style={{
              backgroundColor: "#0f0f0f",
              borderRadius: 24,
              padding: 32,
              width: 500,
              maxWidth: "90%",
              borderWidth: 1,
              borderColor: "#1F1F1F",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <Text style={{ color: "#E5E5E5", fontSize: 24, fontWeight: "bold" }}>Join Wedding</Text>
              <Pressable
                onPress={() => {
                  setShowJoinModal(false);
                  setInviteCode("");
                  setJoinError("");
                }}
              >
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            <Text style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 20 }}>
              Enter the invite code provided by your media professional
            </Text>

            {joinError ? (
              <View
                style={{
                  backgroundColor: "rgba(220, 38, 38, 0.2)",
                  borderWidth: 1,
                  borderColor: "#991B1B",
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  marginBottom: 16,
                }}
              >
                <Text style={{ color: "#EF4444", fontSize: 14 }}>{joinError}</Text>
              </View>
            ) : null}

            <View style={{ marginBottom: 24 }}>
              <Text style={{ color: "#D1D5DB", fontSize: 14, fontWeight: "500", marginBottom: 8 }}>
                Invite Code
              </Text>
              <TextInput
                value={inviteCode}
                onChangeText={(text) => {
                  setInviteCode(text);
                  setJoinError("");
                }}
                placeholder="e.g. WS-1234567890"
                placeholderTextColor="#6B7280"
                style={{
                  backgroundColor: "#1a1a1a",
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontSize: 16,
                  color: "#E5E5E5",
                  borderWidth: 1,
                  borderColor: "#374151",
                  textAlign: "center",
                }}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>

            <Pressable
              onPress={handleJoinWedding}
              disabled={isJoining || !inviteCode.trim()}
              style={{
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: "center",
                backgroundColor: isJoining || !inviteCode.trim() ? "#1F1F1F" : "#F5B800",
              }}
            >
              {isJoining ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: inviteCode.trim() ? "#000" : "#6B7280",
                  }}
                >
                  Join Wedding
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal visible={showSettingsModal} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.8)" }}>
          <View
            style={{
              backgroundColor: "#0f0f0f",
              borderRadius: 24,
              padding: 32,
              width: 400,
              maxWidth: "90%",
              borderWidth: 1,
              borderColor: "#1F1F1F",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <Text style={{ color: "#E5E5E5", fontSize: 22, fontWeight: "bold" }}>Settings</Text>
              <Pressable onPress={() => setShowSettingsModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <Text style={{ color: "#E5E5E5", fontWeight: "600", fontSize: 16 }}>{user?.name}</Text>
              <Text style={{ color: "#9CA3AF", fontSize: 14, marginTop: 4 }}>{user?.email}</Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
                <View style={{ backgroundColor: "rgba(245, 184, 0, 0.2)", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }}>
                  <Text style={{ color: "#F5B800", fontSize: 12, fontWeight: "500" }}>Bride / Groom</Text>
                </View>
              </View>
            </View>

            <Pressable
              onPress={() => {
                setShowSettingsModal(false);
                signOut();
              }}
              style={{
                backgroundColor: "rgba(220, 38, 38, 0.2)",
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#991B1B",
              }}
            >
              <Text style={{ color: "#EF4444", fontWeight: "600" }}>Sign Out</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Create Wedding Paywall Modal */}
      <Modal visible={showCreatePaywallModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.9)" }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
            <View
              style={{
                backgroundColor: "#0f0f0f",
                borderRadius: 24,
                padding: isLargeScreen ? 48 : 32,
                width: isLargeScreen ? 700 : "100%",
                maxWidth: "100%",
                borderWidth: 1,
                borderColor: "#1F1F1F",
              }}
            >
              {/* Close Button */}
              <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 16 }}>
                <Pressable
                  onPress={() => setShowCreatePaywallModal(false)}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "#1a1a1a",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="close" size={20} color="#9CA3AF" />
                </Pressable>
              </View>

              {/* Hero */}
              <View style={{ alignItems: "center", marginBottom: 40 }}>
                <View
                  style={{
                    width: 112,
                    height: 112,
                    borderRadius: 56,
                    backgroundColor: "#F5B800",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                  }}
                >
                  <View
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 48,
                      backgroundColor: "rgba(245, 184, 0, 0.3)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons name="heart" size={48} color="#F5B800" />
                  </View>
                </View>
                <Text style={{ color: "#E5E5E5", fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 12 }}>
                  Your Wedding, Your Way
                </Text>
                <Text style={{ color: "#9CA3AF", textAlign: "center", fontSize: 16, lineHeight: 24, paddingHorizontal: 24 }}>
                  Everything you need to plan and capture your perfect day, all in one place.
                </Text>
              </View>

              {/* Value Prop */}
              <View
                style={{
                  backgroundColor: "rgba(245, 184, 0, 0.1)",
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 32,
                  borderWidth: 1,
                  borderColor: "rgba(245, 184, 0, 0.2)",
                }}
              >
                <Text style={{ color: "#F5B800", fontSize: 20, fontWeight: "600", textAlign: "center", marginBottom: 8 }}>
                  Complete Wedding Planning Suite
                </Text>
                <Text style={{ color: "#D1D5DB", textAlign: "center", fontSize: 14 }}>
                  Plan, organize, and capture every moment.
                </Text>
              </View>

              {/* Benefits - 2 columns on large screens */}
              <Text style={{ color: "#E5E5E5", fontSize: 20, fontWeight: "600", marginBottom: 20 }}>
                Everything included:
              </Text>
              <View
                style={{
                  flexDirection: isLargeScreen ? "row" : "column",
                  flexWrap: "wrap",
                  gap: 16,
                  marginBottom: 32,
                }}
              >
                {[
                  {
                    icon: "people",
                    title: "Guest Management",
                    desc: "Keep track of your guest list, RSVPs, and dietary requirements.",
                  },
                  {
                    icon: "grid",
                    title: "Seating Charts",
                    desc: "Design your perfect seating arrangement with drag-and-drop.",
                  },
                  {
                    icon: "checkmark-circle",
                    title: "Task Planner",
                    desc: "Stay on top of your wedding to-dos with customizable lists.",
                  },
                  {
                    icon: "calendar",
                    title: "Calendar & Schedule",
                    desc: "Schedule vendor appointments, fittings, and events.",
                  },
                  {
                    icon: "document-text",
                    title: "Notes & Ideas",
                    desc: "Save inspiration, vendor contacts, and wedding ideas.",
                  },
                  {
                    icon: "qr-code",
                    title: "Shared Photo Album",
                    desc: "Get a QR code guests can scan to share their photos!",
                  },
                ].map((benefit, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      width: isLargeScreen ? "49%" : "100%",
                    }}
                  >
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: "rgba(245, 184, 0, 0.1)",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                      }}
                    >
                      <Ionicons name={benefit.icon as any} size={24} color="#F5B800" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#E5E5E5", fontWeight: "600", marginBottom: 4 }}>
                        {benefit.title}
                      </Text>
                      <Text style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 18 }}>
                        {benefit.desc}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Social Proof */}
              <View style={{ alignItems: "center", marginBottom: 32 }}>
                <View style={{ flexDirection: "row", marginBottom: 8 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons key={star} name="star" size={20} color="#F5B800" />
                  ))}
                </View>
                <Text style={{ color: "#9CA3AF", fontSize: 14, textAlign: "center", fontStyle: "italic" }}>
                  {"\"Made planning our wedding so much easier! Love the guest photo feature.\""}
                </Text>
                <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 4 }}>
                  - Emily & James, married 2024
                </Text>
              </View>

              {/* Price */}
              <View
                style={{
                  backgroundColor: "rgba(245, 184, 0, 0.1)",
                  borderRadius: 16,
                  padding: 32,
                  marginBottom: 24,
                  borderWidth: 1,
                  borderColor: "rgba(245, 184, 0, 0.3)",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 4 }}>One-time purchase</Text>
                  <Text style={{ color: "#F5B800", fontSize: 48, fontWeight: "bold", marginBottom: 4 }}>
                    $50
                  </Text>
                  <Text style={{ color: "#6B7280", fontSize: 12 }}>No subscriptions. Yours forever.</Text>
                </View>
              </View>

              {/* CTA */}
              <Pressable
                onPress={() => {
                  setShowCreatePaywallModal(false);
                  setShowCreateModal(true);
                }}
                style={{
                  backgroundColor: "#F5B800",
                  borderRadius: 16,
                  paddingVertical: 20,
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>
                  Create My Wedding
                </Text>
                <Text style={{ color: "rgba(0,0,0,0.7)", fontSize: 14, marginTop: 4 }}>
                  Get started planning your big day
                </Text>
              </Pressable>

              {/* Secondary */}
              <Pressable
                onPress={() => setShowCreatePaywallModal(false)}
                style={{ paddingVertical: 12, alignItems: "center" }}
              >
                <Text style={{ color: "#6B7280" }}>Maybe later</Text>
              </Pressable>

              {/* Trust Badge */}
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 8 }}>
                <Ionicons name="shield-checkmark" size={16} color="#6B7280" />
                <Text style={{ color: "#6B7280", fontSize: 12, marginLeft: 8 }}>
                  Secure payment powered by Stripe
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Create Wedding Form Modal */}
      <Modal visible={showCreateModal} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.85)" }}>
          <View
            style={{
              backgroundColor: "#0f0f0f",
              borderRadius: 24,
              padding: 32,
              width: 550,
              maxWidth: "90%",
              maxHeight: "90%",
              borderWidth: 1,
              borderColor: "#1F1F1F",
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <Text style={{ color: "#E5E5E5", fontSize: 24, fontWeight: "bold" }}>
                  Create Wedding
                </Text>
                <Pressable
                  onPress={() => {
                    setShowCreateModal(false);
                    setPartnerOneName("");
                    setPartnerTwoName("");
                    setVenue("");
                  }}
                >
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
              </View>

              {/* Partner 1 */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: "#D1D5DB", fontSize: 14, fontWeight: "500", marginBottom: 8 }}>
                  Your Name *
                </Text>
                <TextInput
                  value={partnerOneName}
                  onChangeText={setPartnerOneName}
                  placeholder="Enter your name"
                  placeholderTextColor="#6B7280"
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    fontSize: 16,
                    color: "#E5E5E5",
                    borderWidth: 1,
                    borderColor: "#374151",
                  }}
                  autoCapitalize="words"
                />
              </View>

              {/* Partner 2 */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: "#D1D5DB", fontSize: 14, fontWeight: "500", marginBottom: 8 }}>
                  Partner{"'"}s Name *
                </Text>
                <TextInput
                  value={partnerTwoName}
                  onChangeText={setPartnerTwoName}
                  placeholder="Enter partner's name"
                  placeholderTextColor="#6B7280"
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    fontSize: 16,
                    color: "#E5E5E5",
                    borderWidth: 1,
                    borderColor: "#374151",
                  }}
                  autoCapitalize="words"
                />
              </View>

              {/* Wedding Date */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: "#D1D5DB", fontSize: 14, fontWeight: "500", marginBottom: 8 }}>
                  Wedding Date
                </Text>
                <View
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderWidth: 1,
                    borderColor: "#374151",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="calendar-outline" size={20} color="#F5B800" />
                  <input
                    type="date"
                    value={format(weddingDate, "yyyy-MM-dd")}
                    onChange={(e) => {
                      const newDate = new Date(e.target.value + "T12:00:00");
                      if (!isNaN(newDate.getTime())) {
                        setWeddingDate(newDate);
                      }
                    }}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#E5E5E5",
                      fontSize: 16,
                      marginLeft: 12,
                      flex: 1,
                      outline: "none",
                      cursor: "pointer",
                    }}
                  />
                </View>
              </View>

              {/* Venue */}
              <View style={{ marginBottom: 24 }}>
                <Text style={{ color: "#D1D5DB", fontSize: 14, fontWeight: "500", marginBottom: 8 }}>
                  Venue (Optional)
                </Text>
                <TextInput
                  value={venue}
                  onChangeText={setVenue}
                  placeholder="Enter venue name"
                  placeholderTextColor="#6B7280"
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    fontSize: 16,
                    color: "#E5E5E5",
                    borderWidth: 1,
                    borderColor: "#374151",
                  }}
                />
              </View>

              <Pressable
                onPress={handleCreateWedding}
                disabled={!isCreateValid}
                style={{
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  backgroundColor: isCreateValid ? "#F5B800" : "#1F1F1F",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: isCreateValid ? "#000" : "#6B7280",
                  }}
                >
                  Create Wedding
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
