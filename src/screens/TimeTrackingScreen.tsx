import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useAdminStore from "../state/adminStore";
import useWeddingStore from "../state/weddingStore";
import * as Location from "expo-location";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Time Tracking Screen - Staff clock in/out management
export default function TimeTrackingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const staffMembers = useAdminStore((s) => s.staffMembers);
  const clockEntries = useAdminStore((s) => s.clockEntries);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");
    })();
  }, []);

  const activeEntry = clockEntries.find((e) => e.staffId === selectedStaffId && !e.clockOutTime);

  const handleClockIn = async () => {
    if (!selectedStaffId) {
      Alert.alert("Error", "Please select a staff member");
      return;
    }

    if (activeEntry) {
      Alert.alert("Error", "This staff member is already clocked in");
      return;
    }

    let location = undefined;
    if (locationPermission) {
      try {
        const loc = await Location.getCurrentPositionAsync({});
        location = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
      } catch (error) {
        console.log("Location error:", error);
      }
    }

    useAdminStore.getState().clockIn({
      staffId: selectedStaffId,
      clockInTime: new Date().toISOString(),
      clockInLocation: location,
    });

    Alert.alert("Success", "Clocked in successfully!");
  };

  const handleClockOut = async () => {
    if (!activeEntry) {
      Alert.alert("Error", "No active clock in found");
      return;
    }

    let location = undefined;
    if (locationPermission) {
      try {
        const loc = await Location.getCurrentPositionAsync({});
        location = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
      } catch (error) {
        console.log("Location error:", error);
      }
    }

    const clockOutTime = new Date().toISOString();
    const totalHours =
      (new Date(clockOutTime).getTime() - new Date(activeEntry.clockInTime).getTime()) / (1000 * 60 * 60);

    useAdminStore.getState().clockOut(activeEntry.id, {
      clockOutTime,
      clockOutLocation: location,
      totalHours: Math.round(totalHours * 100) / 100,
    });

    Alert.alert("Success", `Clocked out! Total hours: ${totalHours.toFixed(2)}`);
  };

  const recentEntries = clockEntries
    .sort((a, b) => new Date(b.clockInTime).getTime() - new Date(a.clockInTime).getTime())
    .slice(0, 10);

  const getStaffName = (staffId: string) => {
    return staffMembers.find((s) => s.id === staffId)?.name || "Unknown";
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
          <Ionicons name="arrow-back" size={24} color="#C9A961" />
        </Pressable>

        <Text className="text-[#C9A961] text-3xl font-bold mb-2">Time Tracking</Text>
        <Text className="text-neutral-400 text-base mb-6">
          {locationPermission ? "Location enabled" : "Enable location for tracking"}
        </Text>

        {/* Staff Selector */}
        <View>
          <Text className="text-neutral-400 text-sm mb-3">Select Staff Member</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row">
              {staffMembers.map((staff) => {
                const isActive = clockEntries.some((e) => e.staffId === staff.id && !e.clockOutTime);
                const isSelected = selectedStaffId === staff.id;
                return (
                  <Pressable
                    key={staff.id}
                    onPress={() => setSelectedStaffId(staff.id)}
                    className={`px-4 py-3 rounded-2xl flex-row items-center mr-2 ${
                      isSelected
                        ? "bg-[#C9A961]"
                        : isActive
                        ? "bg-emerald-900 border border-emerald-700"
                        : "bg-neutral-800 border border-neutral-700"
                    }`}
                  >
                    {isActive && <View className="w-2 h-2 bg-emerald-400 rounded-full mr-2" />}
                    <Text
                      className={`text-sm font-semibold ${
                        isSelected ? "text-black" : isActive ? "text-emerald-400" : "text-neutral-300"
                      }`}
                    >
                      {staff.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Clock In/Out Buttons */}
        <View className="flex-row">
          <Pressable
            onPress={handleClockIn}
            disabled={!selectedStaffId || !!activeEntry}
            className={`flex-1 rounded-2xl p-4 items-center mr-3 ${
              !selectedStaffId || activeEntry ? "bg-neutral-800" : "bg-emerald-600"
            }`}
          >
            <Ionicons
              name="play-circle"
              size={32}
              color={!selectedStaffId || activeEntry ? "#666" : "#ffffff"}
            />
            <Text
              className={`text-base font-semibold mt-2 ${
                !selectedStaffId || activeEntry ? "text-neutral-500" : "text-white"
              }`}
            >
              Clock In
            </Text>
          </Pressable>

          <Pressable
            onPress={handleClockOut}
            disabled={!activeEntry}
            className={`flex-1 rounded-2xl p-4 items-center ${!activeEntry ? "bg-neutral-800" : "bg-red-600"}`}
          >
            <Ionicons name="stop-circle" size={32} color={!activeEntry ? "#666" : "#ffffff"} />
            <Text className={`text-base font-semibold mt-2 ${!activeEntry ? "text-neutral-500" : "text-white"}`}>
              Clock Out
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      {/* Active Session */}
      {activeEntry && (
        <View className="mx-5 mt-4 bg-emerald-900/20 border border-emerald-700 rounded-2xl p-5">
          <View className="flex-row items-center mb-3">
            <View className="w-3 h-3 bg-emerald-400 rounded-full mr-2" />
            <Text className="text-emerald-400 text-sm font-semibold uppercase">Active Session</Text>
          </View>
          <Text className="text-neutral-100 text-lg font-semibold mb-2">{getStaffName(activeEntry.staffId)}</Text>
          <Text className="text-neutral-400 text-sm">
            Clocked in: {format(new Date(activeEntry.clockInTime), "h:mm a")}
          </Text>
          {activeEntry.clockInLocation && (
            <View className="flex-row items-center mt-2">
              <Ionicons name="location" size={14} color="#10b981" />
              <Text className="text-emerald-400 text-xs ml-1">Location tracked</Text>
            </View>
          )}
        </View>
      )}

      {/* Recent Entries */}
      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-neutral-400 text-sm font-semibold mb-4">RECENT ACTIVITY</Text>
        <View className="pb-8">
          {recentEntries.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Ionicons name="time-outline" size={64} color="#404040" />
              <Text className="text-neutral-500 text-lg mt-4">No time entries</Text>
              <Text className="text-neutral-600 text-sm mt-2">Clock in to start tracking time</Text>
            </View>
          ) : (
            recentEntries.map((entry) => (
              <View key={entry.id} className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-3">
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-1">
                    <Text className="text-neutral-100 text-base font-semibold">{getStaffName(entry.staffId)}</Text>
                    <Text className="text-neutral-500 text-xs mt-1">
                      {format(new Date(entry.clockInTime), "MMM d, yyyy")}
                    </Text>
                  </View>
                  {entry.totalHours && (
                    <View className="bg-[#C9A961]/10 px-3 py-1 rounded-full">
                      <Text className="text-[#C9A961] text-sm font-semibold">{entry.totalHours}h</Text>
                    </View>
                  )}
                </View>

                <View className="flex-row items-center">
                  <View className="flex-row items-center mr-4">
                    <Ionicons name="enter-outline" size={14} color="#10b981" />
                    <Text className="text-neutral-400 text-xs ml-1">
                      {format(new Date(entry.clockInTime), "h:mm a")}
                    </Text>
                  </View>
                  {entry.clockOutTime && (
                    <View className="flex-row items-center mr-4">
                      <Ionicons name="exit-outline" size={14} color="#ef4444" />
                      <Text className="text-neutral-400 text-xs ml-1">
                        {format(new Date(entry.clockOutTime), "h:mm a")}
                      </Text>
                    </View>
                  )}
                  {!entry.clockOutTime && (
                    <View className="flex-row items-center">
                      <View className="w-2 h-2 bg-emerald-400 rounded-full mr-1" />
                      <Text className="text-emerald-400 text-xs">Active</Text>
                    </View>
                  )}
                </View>

                {(entry.clockInLocation || entry.clockOutLocation) && (
                  <View className="flex-row items-center mt-2">
                    <Ionicons name="location" size={12} color="#666" />
                    <Text className="text-neutral-600 text-xs ml-1">Location tracked</Text>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
