import React, { useState } from "react";
import { View, Text, Pressable, TextInput, Share, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import useWeddingStore from "../state/weddingStore";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type InviteCoupleRouteProp = RouteProp<RootStackParamList, "InviteCouple">;

export default function InviteCoupleScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<InviteCoupleRouteProp>();
  const { weddingId } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  const [copied, setCopied] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!wedding) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-neutral-500">Wedding not found</Text>
      </View>
    );
  }

  const inviteCode = wedding.qrCode;

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(inviteCode);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `You're invited to access your wedding on WedSync!\n\nCouple: ${wedding.coupleName}\n\nUse this invite code to join:\n${inviteCode}\n\nDownload the app and enter this code to get started!`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  const handleSendEmail = () => {
    // In a real app, this would open an email composer or send via backend
    setShowSuccessModal(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <Text className="text-[#F5B800] text-3xl font-bold mb-2">Invite Couple</Text>
        <Text className="text-neutral-400 text-base">
          Share this invite code with {wedding.partnerOneName} & {wedding.partnerTwoName}
        </Text>
      </LinearGradient>

      <View className="flex-1 px-5 pt-6">
        {/* Invite Code Card */}
        <View className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 mb-6">
          <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3 text-center">
            Invite Code
          </Text>
          <View className="bg-neutral-800 rounded-xl p-4 mb-4">
            <Text className="text-[#F5B800] text-2xl font-bold text-center tracking-widest">
              {inviteCode}
            </Text>
          </View>
          <Pressable
            onPress={handleCopyCode}
            className="bg-neutral-800 rounded-xl py-3 flex-row items-center justify-center active:opacity-70"
          >
            <Ionicons name={copied ? "checkmark" : "copy-outline"} size={20} color="#F5B800" />
            <Text className="text-[#F5B800] font-medium ml-2">
              {copied ? "Copied!" : "Copy Code"}
            </Text>
          </Pressable>
        </View>

        {/* Instructions */}
        <View className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 mb-6">
          <Text className="text-neutral-100 font-semibold mb-3">How it works:</Text>
          <View className="flex-row items-start mb-3">
            <View className="w-6 h-6 rounded-full bg-[#F5B800]/20 items-center justify-center mr-3 mt-0.5">
              <Text className="text-[#F5B800] font-bold text-xs">1</Text>
            </View>
            <Text className="text-neutral-400 flex-1">
              Share the invite code with the bride or groom
            </Text>
          </View>
          <View className="flex-row items-start mb-3">
            <View className="w-6 h-6 rounded-full bg-[#F5B800]/20 items-center justify-center mr-3 mt-0.5">
              <Text className="text-[#F5B800] font-bold text-xs">2</Text>
            </View>
            <Text className="text-neutral-400 flex-1">
              They create an account and enter the code
            </Text>
          </View>
          <View className="flex-row items-start">
            <View className="w-6 h-6 rounded-full bg-[#F5B800]/20 items-center justify-center mr-3 mt-0.5">
              <Text className="text-[#F5B800] font-bold text-xs">3</Text>
            </View>
            <Text className="text-neutral-400 flex-1">
              They get access to their wedding details, guest list, tasks, and more
            </Text>
          </View>
        </View>

        {/* Share Button */}
        <Pressable
          onPress={handleShare}
          className="bg-[#F5B800] rounded-2xl p-5 flex-row items-center justify-center mb-3 active:opacity-70"
        >
          <Ionicons name="share-outline" size={24} color="#000000" />
          <Text className="text-black text-lg font-semibold ml-3">Share Invite</Text>
        </Pressable>

        <Text className="text-neutral-600 text-sm text-center">
          The couple will be able to see features you have enabled for them
        </Text>
      </View>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View className="flex-1 bg-black/80 items-center justify-center px-6">
          <View className="bg-neutral-900 rounded-2xl p-6 w-full border border-neutral-800">
            <View className="w-16 h-16 bg-green-500/20 rounded-full items-center justify-center self-center mb-4">
              <Ionicons name="checkmark-circle" size={40} color="#22c55e" />
            </View>
            <Text className="text-neutral-100 text-xl font-bold text-center mb-2">
              Invite Sent!
            </Text>
            <Text className="text-neutral-400 text-center mb-6">
              The couple will receive instructions to join their wedding.
            </Text>
            <Pressable
              onPress={() => {
                setShowSuccessModal(false);
                navigation.goBack();
              }}
              className="bg-[#F5B800] rounded-xl py-4 items-center"
            >
              <Text className="text-black font-semibold">Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
