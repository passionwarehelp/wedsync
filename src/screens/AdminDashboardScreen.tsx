import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useAdminStore from "../state/adminStore";
import useAuthStore from "../state/authStore";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdminDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const invoices = useAdminStore((s) => s.invoices);
  const staffMembers = useAdminStore((s) => s.staffMembers);
  const clockEntries = useAdminStore((s) => s.clockEntries);

  const pendingInvoices = invoices.filter((i) => i.status === "sent" || i.status === "overdue").length;
  const activeStaff = staffMembers.length;
  const activeClockedIn = clockEntries.filter((e) => !e.clockOutTime).length;

  const adminSections = [
    {
      title: "Invoices",
      icon: "receipt" as const,
      screen: "Invoices" as const,
      count: pendingInvoices,
      label: "pending",
      color: "#F5B800",
    },
    {
      title: "Payment Setup",
      icon: "card" as const,
      screen: "BusinessSettings" as const,
      color: "#10b981",
      description: "Configure payment methods",
    },
    {
      title: "Staff Management",
      icon: "people" as const,
      screen: "StaffManagement" as const,
      count: activeStaff,
      label: "members",
      color: "#F5B800",
    },
    {
      title: "Time Tracking",
      icon: "time" as const,
      screen: "TimeTracking" as const,
      count: activeClockedIn,
      label: "clocked in",
      color: "#10b981",
    },
    {
      title: "Email Automation",
      icon: "mail" as const,
      screen: "EmailAutomation" as const,
      color: "#F5B800",
    },
    {
      title: "Calendar",
      icon: "calendar" as const,
      screen: "AdminCalendar" as const,
      color: "#F5B800",
    },
  ];

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-[#F5B800] text-3xl font-bold">Admin</Text>
            <Text className="text-neutral-400 text-base mt-1">Business Management</Text>
          </View>
          <Pressable
            onPress={() => setShowSettingsModal(true)}
            className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center"
          >
            <Ionicons name="settings-outline" size={24} color="#F5B800" />
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <View className="pb-8">
          {adminSections.map((section, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate(section.screen as any)}
              className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 active:opacity-70 mb-3"
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                  <Ionicons name={section.icon} size={24} color={section.color} />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-neutral-100 text-lg font-medium">{section.title}</Text>
                  {section.count !== undefined && (
                    <Text className="text-neutral-500 text-sm mt-1">
                      {section.count} {section.label}
                    </Text>
                  )}
                  {section.description && (
                    <Text className="text-neutral-500 text-sm mt-1">
                      {section.description}
                    </Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Quick Stats */}
        <View className="bg-neutral-900 rounded-2xl p-5 mb-8 border border-neutral-800">
          <Text className="text-neutral-100 text-lg font-semibold mb-4">Quick Stats</Text>

          <View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-neutral-400">Total Invoices</Text>
              <Text className="text-neutral-100 font-medium">{invoices.length}</Text>
            </View>

            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-neutral-400">Revenue (Paid)</Text>
              <Text className="text-emerald-400 font-semibold">
                ${invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.total, 0).toLocaleString()}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-neutral-400">Outstanding</Text>
              <Text className="text-amber-400 font-semibold">
                $
                {invoices
                  .filter((i) => i.status === "sent" || i.status === "overdue")
                  .reduce((sum, i) => sum + i.total, 0)
                  .toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
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

            {/* User Info */}
            <View className="bg-neutral-800 rounded-xl p-4 mb-4">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-[#F5B800]/20 rounded-full items-center justify-center mr-4">
                  <Ionicons name="person" size={24} color="#F5B800" />
                </View>
                <View>
                  <Text className="text-neutral-100 font-medium text-lg">{user?.name}</Text>
                  <Text className="text-neutral-400 text-sm">{user?.email}</Text>
                </View>
              </View>
            </View>

            {/* Account Type */}
            <View className="bg-neutral-800 rounded-xl p-4 mb-6">
              <View className="flex-row items-center justify-between">
                <Text className="text-neutral-400">Account Type</Text>
                <View className="flex-row items-center">
                  <Ionicons name="camera" size={16} color="#F5B800" />
                  <Text className="text-[#F5B800] font-medium ml-2">Photographer</Text>
                </View>
              </View>
            </View>

            {/* Sign Out Button */}
            <Pressable
              onPress={() => {
                setShowSettingsModal(false);
                signOut();
              }}
              className="bg-red-900/30 rounded-xl py-4 items-center border border-red-900"
            >
              <View className="flex-row items-center">
                <Ionicons name="log-out-outline" size={20} color="#f87171" />
                <Text className="text-red-400 font-semibold ml-2">Sign Out</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
