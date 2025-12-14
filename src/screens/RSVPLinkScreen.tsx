import React from "react";
import { View, Text, Pressable, ScrollView, Share } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RSVPLinkRouteProp = RouteProp<RootStackParamList, "RSVPLink">;

export default function RSVPLinkScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RSVPLinkRouteProp>();
  const { weddingId } = route.params;
  const insets = useSafeAreaInsets();

  // Use individual selectors to avoid infinite loops
  const weddings = useWeddingStore((s) => s.weddings);
  const allGuests = useWeddingStore((s) => s.guests);

  // Filter outside selector
  const wedding = weddings.find((w) => w.id === weddingId);
  const guests = allGuests.filter((g) => g.weddingId === weddingId);

  if (!wedding) {
    return (
      <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">Wedding not found</Text>
        </View>
      </View>
    );
  }

  const rsvpUrl = `https://rsvp.mywedsync.com/${wedding.qrCode}?couple=${encodeURIComponent(wedding.coupleName)}`;

  const handleShare = async () => {
    try {
      const weddingDate = format(new Date(wedding.weddingDate), "MMMM d, yyyy");
      await Share.share({
        message: `You're invited to ${wedding.coupleName}'s wedding on ${weddingDate}!\n\nPlease RSVP here: ${rsvpUrl}`,
        title: "Wedding RSVP",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyLink = async () => {
    await Share.share({
      message: rsvpUrl,
      title: "RSVP Link",
    });
  };

  // Calculate RSVP stats
  const attendingCount = guests.filter((g) => g.rsvpStatus === "attending").length;
  const declinedCount = guests.filter((g) => g.rsvpStatus === "declined").length;
  const pendingCount = guests.filter((g) => g.rsvpStatus === "pending").length;
  const plusOnesCount = guests.filter((g) => g.rsvpStatus === "attending" && g.plusOne).length;

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: insets.top + 10, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <Text className="text-[#F5B800] text-3xl font-bold mb-2">RSVP Link</Text>
        <Text className="text-neutral-400 text-base">Share with your guests</Text>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* QR Code */}
        <View className="items-center py-6">
          <View className="bg-white p-6 rounded-3xl shadow-lg">
            <QRCode value={rsvpUrl} size={200} backgroundColor="white" color="#000000" />
          </View>

          <Text className="text-neutral-300 text-xl font-semibold mt-6 mb-2 text-center">
            {wedding.coupleName}
          </Text>
          <Text className="text-neutral-500 text-sm text-center px-8">
            Guests can scan this QR code or use the link to RSVP
          </Text>
        </View>

        {/* RSVP Stats */}
        <View className="bg-neutral-900 rounded-2xl p-5 mb-6 border border-neutral-800">
          <Text className="text-neutral-100 text-lg font-semibold mb-4">RSVP Summary</Text>

          <View className="flex-row justify-between mb-3">
            <View className="flex-1 items-center">
              <View className="w-12 h-12 bg-emerald-900/30 rounded-full items-center justify-center mb-2">
                <Text className="text-emerald-400 text-xl font-bold">{attendingCount}</Text>
              </View>
              <Text className="text-neutral-400 text-xs">Attending</Text>
            </View>

            <View className="flex-1 items-center">
              <View className="w-12 h-12 bg-amber-900/30 rounded-full items-center justify-center mb-2">
                <Text className="text-amber-400 text-xl font-bold">{declinedCount}</Text>
              </View>
              <Text className="text-neutral-400 text-xs">Declined</Text>
            </View>

            <View className="flex-1 items-center">
              <View className="w-12 h-12 bg-neutral-800 rounded-full items-center justify-center mb-2">
                <Text className="text-neutral-400 text-xl font-bold">{pendingCount}</Text>
              </View>
              <Text className="text-neutral-400 text-xs">Pending</Text>
            </View>

            <View className="flex-1 items-center">
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center mb-2">
                <Text className="text-[#F5B800] text-xl font-bold">{plusOnesCount}</Text>
              </View>
              <Text className="text-neutral-400 text-xs">+1s</Text>
            </View>
          </View>

          <View className="bg-neutral-800 rounded-xl p-3 mt-2">
            <Text className="text-neutral-300 text-center text-sm">
              Total Expected: <Text className="text-[#F5B800] font-bold">{attendingCount + plusOnesCount}</Text> guests
            </Text>
          </View>
        </View>

        {/* How it works */}
        <View className="bg-neutral-900 rounded-2xl p-6 mb-6 border border-neutral-800">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-[#F5B800]/10 rounded-full items-center justify-center mr-3">
              <Ionicons name="mail-open" size={20} color="#F5B800" />
            </View>
            <Text className="text-neutral-100 text-lg font-semibold flex-1">How it works</Text>
          </View>

          <View>
            <View className="flex-row mb-4">
              <Text className="text-[#F5B800] font-bold mr-3">1.</Text>
              <Text className="text-neutral-300 flex-1">Share the RSVP link with your guests via text, email, or social media</Text>
            </View>
            <View className="flex-row mb-4">
              <Text className="text-[#F5B800] font-bold mr-3">2.</Text>
              <Text className="text-neutral-300 flex-1">Guests click the link and fill out the RSVP form on their phone or computer</Text>
            </View>
            <View className="flex-row mb-4">
              <Text className="text-[#F5B800] font-bold mr-3">3.</Text>
              <Text className="text-neutral-300 flex-1">No app download required - it works directly in their browser</Text>
            </View>
            <View className="flex-row">
              <Text className="text-[#F5B800] font-bold mr-3">4.</Text>
              <Text className="text-neutral-300 flex-1">Responses automatically appear in your guest list</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <Pressable
          onPress={handleShare}
          className="bg-[#F5B800] rounded-2xl p-5 flex-row items-center justify-center mb-4"
        >
          <Ionicons name="share-outline" size={24} color="#000000" />
          <Text className="text-black text-lg font-semibold ml-3">Share RSVP Link</Text>
        </Pressable>

        <Pressable
          onPress={handleCopyLink}
          className="bg-neutral-800 rounded-2xl p-5 flex-row items-center justify-center mb-4 border border-neutral-700"
        >
          <Ionicons name="copy-outline" size={24} color="#F5B800" />
          <Text className="text-neutral-100 text-lg font-semibold ml-3">Copy Link</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("GuestRSVP", { rsvpCode: wedding.qrCode })}
          className="bg-neutral-800 rounded-2xl p-5 flex-row items-center justify-center mb-4 border border-neutral-700"
        >
          <Ionicons name="eye-outline" size={24} color="#F5B800" />
          <Text className="text-neutral-100 text-lg font-semibold ml-3">Preview RSVP Form</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("GuestList", { weddingId: wedding.id })}
          className="bg-neutral-900 rounded-2xl p-5 flex-row items-center justify-center mb-8 border border-neutral-800"
        >
          <Ionicons name="people-outline" size={24} color="#F5B800" />
          <Text className="text-neutral-100 text-lg font-semibold ml-3">View Guest List</Text>
        </Pressable>

        <View className="bg-neutral-900/50 rounded-2xl p-4 mb-8 border border-neutral-800/50">
          <Text className="text-neutral-400 text-xs text-center">RSVP Code: {wedding.qrCode}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
