import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useAdminStore from "../state/adminStore";
import useWeddingStore from "../state/weddingStore";
import { StaffMember } from "../types/wedding";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { Swipeable } from "react-native-gesture-handler";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function StaffManagementScreen() {
  const navigation = useNavigation<NavigationProp>();
  const staffMembers = useAdminStore((s) => s.staffMembers);
  const staffAssignments = useAdminStore((s) => s.staffAssignments);
  const assignStaffToWedding = useAdminStore((s) => s.assignStaffToWedding);
  const unassignStaffFromWedding = useAdminStore((s) => s.unassignStaffFromWedding);
  const deleteStaffMember = useAdminStore((s) => s.deleteStaffMember);
  const weddings = useWeddingStore((s) => s.weddings);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "coordinator" as StaffMember["role"],
    hourlyRate: "",
  });

  const filteredStaff = staffMembers.filter((staff) =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAssignedWeddings = (staffId: string) => {
    const assignments = staffAssignments.filter((a) => a.staffId === staffId);
    return assignments.map((a) => weddings.find((w) => w.id === a.weddingId)).filter(Boolean);
  };

  const addStaffMember = () => {
    if (!newStaff.name.trim()) {
      Alert.alert("Error", "Please enter a name");
      return;
    }

    const staff: StaffMember = {
      id: Date.now().toString(),
      name: newStaff.name.trim(),
      email: newStaff.email.trim() || undefined,
      phone: newStaff.phone.trim() || undefined,
      role: newStaff.role,
      hourlyRate: newStaff.hourlyRate ? parseFloat(newStaff.hourlyRate) : undefined,
    };

    useAdminStore.getState().addStaffMember(staff);
    setNewStaff({ name: "", email: "", phone: "", role: "coordinator", hourlyRate: "" });
    setShowAddModal(false);
  };

  const getRoleColor = (role: StaffMember["role"]) => {
    switch (role) {
      case "planner":
        return "#C9A961";
      case "coordinator":
        return "#60a5fa";
      case "photographer":
        return "#a78bfa";
      case "videographer":
        return "#f472b6";
      case "assistant":
        return "#34d399";
      default:
        return "#9ca3af";
    }
  };

  const renderRightActions = (staffId: string) => {
    return (
      <Pressable
        onPress={() => {
          Alert.alert("Delete Staff Member", "Are you sure you want to delete this staff member?", [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => deleteStaffMember(staffId),
            },
          ]);
        }}
        className="bg-red-600 justify-center items-center px-6 rounded-r-2xl"
      >
        <Ionicons name="trash-outline" size={24} color="white" />
        <Text className="text-white text-xs mt-1 font-medium">Delete</Text>
      </Pressable>
    );
  };

  const handleAssignToWedding = (weddingId: string) => {
    if (!selectedStaff) return;

    const assignment = {
      id: Date.now().toString(),
      weddingId,
      staffId: selectedStaff.id,
      role: selectedStaff.role,
      assignedAt: new Date().toISOString(),
    };

    assignStaffToWedding(assignment);
    Alert.alert("Success", `${selectedStaff.name} assigned to wedding`);
  };

  const handleUnassign = (weddingId: string) => {
    if (!selectedStaff) return;

    const assignment = staffAssignments.find((a) => a.staffId === selectedStaff.id && a.weddingId === weddingId);
    if (assignment) {
      unassignStaffFromWedding(assignment.id);
      Alert.alert("Success", "Staff member unassigned");
    }
  };

  const isAssigned = (staffId: string, weddingId: string) => {
    return staffAssignments.some((a) => a.staffId === staffId && a.weddingId === weddingId);
  };

  // Assignment Modal
  if (selectedStaff) {
    const activeWeddings = weddings.filter((w) => w.status !== "completed");
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1F1F1F", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
        >
          <View className="flex-row items-center justify-between mb-6">
            <Pressable onPress={() => setSelectedStaff(null)}>
              <Ionicons name="arrow-back" size={24} color="#C9A961" />
            </Pressable>
            <Text className="text-[#C9A961] text-xl font-bold">Assign to Wedding</Text>
            <View className="w-6" />
          </View>

          <View className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 mb-4">
            <Text className="text-neutral-100 text-lg font-semibold">{selectedStaff.name}</Text>
            <Text className="text-neutral-400 text-sm capitalize mt-1">{selectedStaff.role}</Text>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          <Text className="text-neutral-400 text-xs font-semibold mb-3">SELECT WEDDING</Text>
          <View className="space-y-2 pb-8">
            {activeWeddings.length === 0 ? (
              <View className="items-center py-12">
                <Text className="text-neutral-500">No active weddings</Text>
              </View>
            ) : (
              activeWeddings.map((wedding) => {
                const assigned = isAssigned(selectedStaff.id, wedding.id);
                return (
                  <Pressable
                    key={wedding.id}
                    onPress={() => (assigned ? handleUnassign(wedding.id) : handleAssignToWedding(wedding.id))}
                    className={`rounded-xl p-4 border ${
                      assigned
                        ? "bg-[#C9A961]/10 border-[#C9A961]"
                        : "bg-neutral-900 border-neutral-800"
                    }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        <Text className={`text-base font-semibold ${assigned ? "text-[#C9A961]" : "text-neutral-100"}`}>
                          {wedding.coupleName}
                        </Text>
                        <Text className="text-neutral-500 text-xs mt-1">
                          {format(new Date(wedding.weddingDate), "MMM d, yyyy")}
                        </Text>
                      </View>
                      {assigned && <Ionicons name="checkmark-circle" size={24} color="#C9A961" />}
                    </View>
                  </Pressable>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  if (showAddModal) {
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1F1F1F", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
        >
          <View className="flex-row items-center justify-between mb-6">
            <Pressable onPress={() => setShowAddModal(false)}>
              <Ionicons name="close" size={28} color="#C9A961" />
            </Pressable>
            <Text className="text-[#C9A961] text-xl font-bold">Add Staff Member</Text>
            <Pressable onPress={addStaffMember} className="bg-[#C9A961] px-4 py-2 rounded-full">
              <Text className="text-black font-semibold">Save</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          <View className="space-y-4 pb-8">
            <View>
              <Text className="text-neutral-400 text-sm mb-2">Name *</Text>
              <TextInput
                value={newStaff.name}
                onChangeText={(text) => setNewStaff({ ...newStaff, name: text })}
                placeholder="Enter name"
                placeholderTextColor="#666666"
                className="bg-neutral-900 text-neutral-100 rounded-2xl p-4 border border-neutral-800"
              />
            </View>

            <View>
              <Text className="text-neutral-400 text-sm mb-2">Email</Text>
              <TextInput
                value={newStaff.email}
                onChangeText={(text) => setNewStaff({ ...newStaff, email: text })}
                placeholder="Enter email"
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-neutral-900 text-neutral-100 rounded-2xl p-4 border border-neutral-800"
              />
            </View>

            <View>
              <Text className="text-neutral-400 text-sm mb-2">Phone</Text>
              <TextInput
                value={newStaff.phone}
                onChangeText={(text) => setNewStaff({ ...newStaff, phone: text })}
                placeholder="Enter phone"
                placeholderTextColor="#666666"
                keyboardType="phone-pad"
                className="bg-neutral-900 text-neutral-100 rounded-2xl p-4 border border-neutral-800"
              />
            </View>

            <View>
              <Text className="text-neutral-400 text-sm mb-2">Role</Text>
              <View className="flex-row flex-wrap gap-2">
                {(["planner", "coordinator", "photographer", "videographer", "assistant", "other"] as const).map(
                  (role) => (
                    <Pressable
                      key={role}
                      onPress={() => setNewStaff({ ...newStaff, role })}
                      className={`px-4 py-2 rounded-full ${
                        newStaff.role === role ? "bg-[#C9A961]" : "bg-neutral-800 border border-neutral-700"
                      }`}
                    >
                      <Text
                        className={`text-sm font-medium capitalize ${
                          newStaff.role === role ? "text-black" : "text-neutral-300"
                        }`}
                      >
                        {role}
                      </Text>
                    </Pressable>
                  )
                )}
              </View>
            </View>

            <View>
              <Text className="text-neutral-400 text-sm mb-2">Hourly Rate ($)</Text>
              <TextInput
                value={newStaff.hourlyRate}
                onChangeText={(text) => setNewStaff({ ...newStaff, hourlyRate: text })}
                placeholder="0.00"
                placeholderTextColor="#666666"
                keyboardType="decimal-pad"
                className="bg-neutral-900 text-neutral-100 rounded-2xl p-4 border border-neutral-800"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

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

        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-[#C9A961] text-3xl font-bold">Staff</Text>
            <Text className="text-neutral-400 text-base mt-1">{filteredStaff.length} members</Text>
          </View>
          <Pressable
            onPress={() => setShowAddModal(true)}
            className="w-12 h-12 bg-[#C9A961] rounded-full items-center justify-center active:opacity-70"
          >
            <Ionicons name="person-add" size={24} color="#000000" />
          </Pressable>
        </View>

        {/* Search */}
        <View className="bg-neutral-900 rounded-2xl p-4 flex-row items-center border border-neutral-800">
          <Ionicons name="search" size={20} color="#666666" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search staff..."
            placeholderTextColor="#666666"
            className="flex-1 text-neutral-100 ml-3 text-base"
          />
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <View className="space-y-3 pb-8">
          {filteredStaff.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Ionicons name="people-outline" size={64} color="#404040" />
              <Text className="text-neutral-500 text-lg mt-4">No staff members</Text>
              <Text className="text-neutral-600 text-sm mt-2">Add your first team member to get started</Text>
            </View>
          ) : (
            filteredStaff.map((staff) => {
              const assignedWeddings = getAssignedWeddings(staff.id);
              return (
                <Swipeable
                  key={staff.id}
                  renderRightActions={() => renderRightActions(staff.id)}
                  overshootRight={false}
                >
                  <Pressable
                    onPress={() => setSelectedStaff(staff)}
                    className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 active:opacity-70"
                  >
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="flex-1">
                        <Text className="text-neutral-100 text-lg font-semibold">{staff.name}</Text>
                        <View className="flex-row items-center mt-2">
                          <View
                            className="px-2 py-1 rounded-full"
                            style={{ backgroundColor: `${getRoleColor(staff.role)}20` }}
                          >
                            <Text className="text-xs font-semibold capitalize" style={{ color: getRoleColor(staff.role) }}>
                              {staff.role}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View className="items-end">
                        {staff.hourlyRate && (
                          <Text className="text-[#C9A961] text-base font-semibold">${staff.hourlyRate}/hr</Text>
                        )}
                        <Ionicons name="chevron-forward" size={20} color="#666" className="mt-1" />
                      </View>
                    </View>

                    {(staff.email || staff.phone) && (
                      <View className="space-y-1 mb-3">
                        {staff.email && (
                          <View className="flex-row items-center">
                            <Ionicons name="mail" size={14} color="#666" />
                            <Text className="text-neutral-400 text-sm ml-2">{staff.email}</Text>
                          </View>
                        )}
                        {staff.phone && (
                          <View className="flex-row items-center">
                            <Ionicons name="call" size={14} color="#666" />
                            <Text className="text-neutral-400 text-sm ml-2">{staff.phone}</Text>
                          </View>
                        )}
                      </View>
                    )}

                    {assignedWeddings.length > 0 && (
                      <View className="border-t border-neutral-800 pt-3 mt-3">
                        <Text className="text-neutral-500 text-xs mb-2">ASSIGNED WEDDINGS ({assignedWeddings.length})</Text>
                        {assignedWeddings.slice(0, 2).map((wedding) => (
                          <Text key={wedding?.id} className="text-neutral-300 text-sm">
                            • {wedding?.coupleName}
                          </Text>
                        ))}
                        {assignedWeddings.length > 2 && (
                          <Text className="text-neutral-500 text-xs mt-1">+{assignedWeddings.length - 2} more</Text>
                        )}
                      </View>
                    )}
                  </Pressable>
                </Swipeable>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}
