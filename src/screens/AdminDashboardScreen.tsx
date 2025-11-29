import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useAdminStore from "../state/adminStore";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdminDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();

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
      color: "#C9A961",
    },
    {
      title: "Staff Management",
      icon: "people" as const,
      screen: "StaffManagement" as const,
      count: activeStaff,
      label: "members",
      color: "#C9A961",
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
      title: "Calendar",
      icon: "calendar" as const,
      screen: "AdminCalendar" as const,
      color: "#C9A961",
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
            <Text className="text-[#C9A961] text-3xl font-bold">Admin</Text>
            <Text className="text-neutral-400 text-base mt-1">Business Management</Text>
          </View>
          <View className="w-12 h-12 bg-[#C9A961]/10 rounded-full items-center justify-center">
            <Ionicons name="briefcase" size={24} color="#C9A961" />
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <View className="space-y-3 pb-8">
          {adminSections.map((section, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate(section.screen as any)}
              className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 active:opacity-70"
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-[#C9A961]/10 rounded-full items-center justify-center">
                  <Ionicons name={section.icon} size={24} color={section.color} />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-neutral-100 text-lg font-medium">{section.title}</Text>
                  {section.count !== undefined && (
                    <Text className="text-neutral-500 text-sm mt-1">
                      {section.count} {section.label}
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

          <View className="space-y-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-neutral-400">Total Invoices</Text>
              <Text className="text-neutral-100 font-medium">{invoices.length}</Text>
            </View>

            <View className="flex-row justify-between items-center">
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
    </View>
  );
}
