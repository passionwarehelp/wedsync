import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useAdminStore from "../state/adminStore";
import * as Location from "expo-location";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
    <View style={styles.container}>
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <Text style={styles.title}>Time Tracking</Text>
        <Text style={styles.subtitle}>
          {locationPermission ? "Location enabled" : "Enable location for tracking"}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Select Staff Member</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.staffScroll}>
            {staffMembers.map((staff, index) => {
              const isActive = clockEntries.some((e) => e.staffId === staff.id && !e.clockOutTime);
              const isSelected = selectedStaffId === staff.id;
              return (
                <Pressable
                  key={staff.id}
                  onPress={() => setSelectedStaffId(staff.id)}
                  style={[
                    styles.staffButton,
                    isSelected && styles.staffButtonSelected,
                    isActive && !isSelected && styles.staffButtonActive,
                    index < staffMembers.length - 1 && styles.staffButtonMargin,
                  ]}
                >
                  {isActive && <View style={styles.activeIndicator} />}
                  <Text
                    style={[
                      styles.staffButtonText,
                      isSelected && styles.staffButtonTextSelected,
                      isActive && !isSelected && styles.staffButtonTextActive,
                    ]}
                  >
                    {staff.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            onPress={handleClockIn}
            disabled={!selectedStaffId || !!activeEntry}
            style={[
              styles.actionButton,
              styles.actionButtonMargin,
              (!selectedStaffId || activeEntry) && styles.actionButtonDisabled,
              (!selectedStaffId || activeEntry) ? {} : styles.clockInButton,
            ]}
          >
            <Ionicons
              name="play-circle"
              size={32}
              color={!selectedStaffId || activeEntry ? "#666" : "#ffffff"}
            />
            <Text
              style={[
                styles.actionButtonText,
                (!selectedStaffId || activeEntry) && styles.actionButtonTextDisabled,
              ]}
            >
              Clock In
            </Text>
          </Pressable>

          <Pressable
            onPress={handleClockOut}
            disabled={!activeEntry}
            style={[
              styles.actionButton,
              !activeEntry && styles.actionButtonDisabled,
              activeEntry && styles.clockOutButton,
            ]}
          >
            <Ionicons name="stop-circle" size={32} color={!activeEntry ? "#666" : "#ffffff"} />
            <Text style={[styles.actionButtonText, !activeEntry && styles.actionButtonTextDisabled]}>
              Clock Out
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      {activeEntry && (
        <View style={styles.activeSession}>
          <View style={styles.activeSessionHeader}>
            <View style={styles.activeSessionDot} />
            <Text style={styles.activeSessionLabel}>ACTIVE SESSION</Text>
          </View>
          <Text style={styles.activeSessionName}>{getStaffName(activeEntry.staffId)}</Text>
          <Text style={styles.activeSessionTime}>
            Clocked in: {format(new Date(activeEntry.clockInTime), "h:mm a")}
          </Text>
          {activeEntry.clockInLocation && (
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color="#10b981" />
              <Text style={styles.locationText}>Location tracked</Text>
            </View>
          )}
        </View>
      )}

      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.listHeader}>RECENT ACTIVITY</Text>
        {recentEntries.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={64} color="#404040" />
            <Text style={styles.emptyStateTitle}>No time entries</Text>
            <Text style={styles.emptyStateSubtitle}>Clock in to start tracking time</Text>
          </View>
        ) : (
          recentEntries.map((entry, index) => (
              <View
                key={entry.id}
                style={[styles.entryCard, index < recentEntries.length - 1 && styles.entryCardMargin]}
              >
                <View style={styles.entryHeader}>
                  <View style={styles.entryHeaderLeft}>
                    <Text style={styles.entryName}>{getStaffName(entry.staffId)}</Text>
                    <Text style={styles.entryDate}>{format(new Date(entry.clockInTime), "MMM d, yyyy")}</Text>
                  </View>
                  {entry.totalHours && (
                    <View style={styles.hoursBadge}>
                      <Text style={styles.hoursText}>{entry.totalHours}h</Text>
                    </View>
                  )}
                </View>

                <View style={styles.entryTimes}>
                  <View style={[styles.entryTimeItem, styles.entryTimeItemMargin]}>
                    <Ionicons name="enter-outline" size={14} color="#10b981" />
                    <Text style={styles.entryTimeText}>{format(new Date(entry.clockInTime), "h:mm a")}</Text>
                  </View>
                  {entry.clockOutTime ? (
                    <View style={[styles.entryTimeItem, styles.entryTimeItemMargin]}>
                      <Ionicons name="exit-outline" size={14} color="#ef4444" />
                      <Text style={styles.entryTimeText}>{format(new Date(entry.clockOutTime), "h:mm a")}</Text>
                    </View>
                  ) : (
                    <View style={styles.entryTimeItem}>
                      <View style={styles.activeEntryDot} />
                      <Text style={styles.activeEntryText}>Active</Text>
                    </View>
                  )}
                </View>

                {(entry.clockInLocation || entry.clockOutLocation) && (
                  <View style={styles.entryLocation}>
                    <Ionicons name="location" size={12} color="#666" />
                    <Text style={styles.entryLocationText}>Location tracked</Text>
                  </View>
                )}
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    color: "#F5B800",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#a3a3a3",
    fontSize: 14,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    color: "#a3a3a3",
    fontSize: 12,
    marginBottom: 12,
  },
  staffScroll: {
    marginBottom: 24,
  },
  staffButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262626",
    borderWidth: 1,
    borderColor: "#404040",
  },
  staffButtonMargin: {
    marginRight: 8,
  },
  staffButtonSelected: {
    backgroundColor: "#F5B800",
    borderColor: "#F5B800",
  },
  staffButtonActive: {
    backgroundColor: "#064e3b",
    borderColor: "#047857",
  },
  activeIndicator: {
    width: 8,
    height: 8,
    backgroundColor: "#34d399",
    borderRadius: 4,
    marginRight: 8,
  },
  staffButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#d4d4d4",
  },
  staffButtonTextSelected: {
    color: "#000000",
  },
  staffButtonTextActive: {
    color: "#34d399",
  },
  buttonRow: {
    flexDirection: "row",
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  actionButtonMargin: {
    marginRight: 12,
  },
  actionButtonDisabled: {
    backgroundColor: "#262626",
  },
  clockInButton: {
    backgroundColor: "#059669",
  },
  clockOutButton: {
    backgroundColor: "#dc2626",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "#ffffff",
  },
  actionButtonTextDisabled: {
    color: "#737373",
  },
  activeSession: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "rgba(6, 78, 59, 0.2)",
    borderWidth: 1,
    borderColor: "#047857",
    borderRadius: 16,
    padding: 20,
  },
  activeSessionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  activeSessionDot: {
    width: 12,
    height: 12,
    backgroundColor: "#34d399",
    borderRadius: 6,
    marginRight: 8,
  },
  activeSessionLabel: {
    color: "#34d399",
    fontSize: 12,
    fontWeight: "600",
  },
  activeSessionName: {
    color: "#f5f5f5",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  activeSessionTime: {
    color: "#a3a3a3",
    fontSize: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  locationText: {
    color: "#34d399",
    fontSize: 10,
    marginLeft: 4,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  listHeader: {
    color: "#a3a3a3",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyStateTitle: {
    color: "#737373",
    fontSize: 18,
    marginTop: 16,
  },
  emptyStateSubtitle: {
    color: "#525252",
    fontSize: 12,
    marginTop: 8,
  },
  entryCard: {
    backgroundColor: "#171717",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#262626",
  },
  entryCardMargin: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  entryHeaderLeft: {
    flex: 1,
  },
  entryName: {
    color: "#f5f5f5",
    fontSize: 14,
    fontWeight: "600",
  },
  entryDate: {
    color: "#737373",
    fontSize: 10,
    marginTop: 4,
  },
  hoursBadge: {
    backgroundColor: "rgba(201, 169, 97, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  hoursText: {
    color: "#F5B800",
    fontSize: 12,
    fontWeight: "600",
  },
  entryTimes: {
    flexDirection: "row",
    alignItems: "center",
  },
  entryTimeItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  entryTimeItemMargin: {
    marginRight: 16,
  },
  entryTimeText: {
    color: "#a3a3a3",
    fontSize: 10,
    marginLeft: 4,
  },
  activeEntryDot: {
    width: 8,
    height: 8,
    backgroundColor: "#34d399",
    borderRadius: 4,
    marginRight: 4,
  },
  activeEntryText: {
    color: "#34d399",
    fontSize: 10,
  },
  entryLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  entryLocationText: {
    color: "#525252",
    fontSize: 10,
    marginLeft: 4,
  },
});
