import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { SeatingTable, Guest } from "../types/wedding";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SeatingChartRouteProp = RouteProp<RootStackParamList, "SeatingChart">;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CANVAS_WIDTH = SCREEN_WIDTH - 40;
const CANVAS_HEIGHT = 500;

interface DraggableTableProps {
  table: SeatingTable;
  guests: Guest[];
  onPositionChange: (id: string, x: number, y: number) => void;
  onTablePress: (table: SeatingTable) => void;
  allGuests: Guest[];
}

function DraggableTable({ table, guests, onPositionChange, onTablePress, allGuests }: DraggableTableProps) {
  const translateX = useSharedValue(table.x || 50);
  const translateY = useSharedValue(table.y || 50);
  const scale = useSharedValue(1);

  const assignedGuests = allGuests.filter((g) => table.guestIds.includes(g.id));

  const panGesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.1);
    })
    .onUpdate((event) => {
      translateX.value = Math.max(0, Math.min(CANVAS_WIDTH - 80, (table.x || 50) + event.translationX));
      translateY.value = Math.max(0, Math.min(CANVAS_HEIGHT - 80, (table.y || 50) + event.translationY));
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      runOnJS(onPositionChange)(table.id, translateX.value, translateY.value);
    });

  const tapGesture = Gesture.Tap().onEnd(() => {
    runOnJS(onTablePress)(table);
  });

  const composedGesture = Gesture.Simultaneous(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const getTableSize = () => {
    switch (table.shape) {
      case "round":
        return { width: 80, height: 80, borderRadius: 40 };
      case "square":
        return { width: 70, height: 70, borderRadius: 8 };
      case "rectangle":
        return { width: 100, height: 60, borderRadius: 8 };
      default:
        return { width: 80, height: 80, borderRadius: 40 };
    }
  };

  const size = getTableSize();

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size.width,
            height: size.height,
            borderRadius: size.borderRadius,
            backgroundColor: "#C9A961",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#C9A961",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          },
          animatedStyle,
        ]}
      >
        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>
          {table.tableNumber}
        </Text>
        <Text style={{ color: "#000", fontSize: 10, marginTop: 2 }}>
          {assignedGuests.length}/{table.capacity}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
}

export default function SeatingChartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SeatingChartRouteProp>();
  const { weddingId } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));
  const allTables = useWeddingStore((s) => s.seatingTables);
  const allGuests = useWeddingStore((s) => s.guests);
  const addSeatingTable = useWeddingStore((s) => s.addSeatingTable);
  const updateSeatingTable = useWeddingStore((s) => s.updateSeatingTable);
  const deleteSeatingTable = useWeddingStore((s) => s.deleteSeatingTable);
  const updateGuest = useWeddingStore((s) => s.updateGuest);

  const tables = useMemo(() => allTables.filter((t) => t.weddingId === weddingId), [allTables, weddingId]);
  const guests = useMemo(() => allGuests.filter((g) => g.weddingId === weddingId), [allGuests, weddingId]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<SeatingTable | null>(null);
  const [selectedShape, setSelectedShape] = useState<"round" | "square" | "rectangle">("round");

  const unseatedGuests = guests.filter((g) => {
    const isSeated = tables.some((t) => t.guestIds.includes(g.id));
    return !isSeated && g.rsvpStatus !== "declined";
  });

  const handlePositionChange = (id: string, x: number, y: number) => {
    updateSeatingTable(id, { x, y });
  };

  const handleTablePress = (table: SeatingTable) => {
    setSelectedTable(table);
    setShowTableModal(true);
  };

  const handleAddTable = (shape: "round" | "square" | "rectangle") => {
    const newTableNumber = tables.length + 1;
    const capacity = shape === "rectangle" ? 10 : shape === "round" ? 8 : 4;

    const newTable: SeatingTable = {
      id: Date.now().toString(),
      weddingId,
      tableNumber: newTableNumber,
      capacity,
      shape,
      x: 50 + (tables.length % 3) * 100,
      y: 50 + Math.floor(tables.length / 3) * 100,
      guestIds: [],
    };

    addSeatingTable(newTable);
    setShowAddModal(false);
  };

  const handleAssignGuest = (guestId: string) => {
    if (!selectedTable) return;

    const updatedGuestIds = [...selectedTable.guestIds, guestId];
    updateSeatingTable(selectedTable.id, { guestIds: updatedGuestIds });
    updateGuest(guestId, { tableNumber: selectedTable.tableNumber });

    setSelectedTable({ ...selectedTable, guestIds: updatedGuestIds });
    setShowGuestModal(false);
  };

  const handleRemoveGuest = (guestId: string) => {
    if (!selectedTable) return;

    const updatedGuestIds = selectedTable.guestIds.filter((id) => id !== guestId);
    updateSeatingTable(selectedTable.id, { guestIds: updatedGuestIds });
    updateGuest(guestId, { tableNumber: undefined });

    setSelectedTable({ ...selectedTable, guestIds: updatedGuestIds });
  };

  const handleDeleteTable = () => {
    if (!selectedTable) return;

    // Remove table assignments from guests
    selectedTable.guestIds.forEach((guestId) => {
      updateGuest(guestId, { tableNumber: undefined });
    });

    deleteSeatingTable(selectedTable.id);
    setShowTableModal(false);
    setSelectedTable(null);
  };

  if (!wedding) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-neutral-500">Wedding not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="#C9A961" />
        </Pressable>

        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[#C9A961] text-2xl font-bold">Seating Chart</Text>
            <Text className="text-neutral-500 text-sm mt-1">
              {tables.length} tables · {guests.filter((g) => g.rsvpStatus !== "declined").length - unseatedGuests.length} seated
            </Text>
          </View>
          <Pressable
            onPress={() => setShowAddModal(true)}
            className="bg-[#C9A961] rounded-full w-11 h-11 items-center justify-center"
          >
            <Ionicons name="add" size={26} color="#000000" />
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Canvas Area */}
        <View className="mx-5 mt-4">
          <View
            style={{
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              backgroundColor: "#111",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#333",
              overflow: "hidden",
            }}
          >
            {/* Grid pattern */}
            <View style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.1 }}>
              {[...Array(10)].map((_, i) => (
                <View
                  key={`h-${i}`}
                  style={{
                    position: "absolute",
                    top: i * 50,
                    width: "100%",
                    height: 1,
                    backgroundColor: "#C9A961",
                  }}
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <View
                  key={`v-${i}`}
                  style={{
                    position: "absolute",
                    left: i * 50,
                    width: 1,
                    height: "100%",
                    backgroundColor: "#C9A961",
                  }}
                />
              ))}
            </View>

            {/* Tables */}
            {tables.map((table) => (
              <DraggableTable
                key={table.id}
                table={table}
                guests={guests}
                allGuests={guests}
                onPositionChange={handlePositionChange}
                onTablePress={handleTablePress}
              />
            ))}

            {tables.length === 0 && (
              <View className="flex-1 items-center justify-center">
                <Ionicons name="grid-outline" size={48} color="#333" />
                <Text className="text-neutral-600 mt-3 text-center">No tables yet</Text>
                <Text className="text-neutral-700 text-sm mt-1">Tap + to add a table</Text>
              </View>
            )}
          </View>
        </View>

        {/* Unseated Guests */}
        <View className="mx-5 mt-6 mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-neutral-100 text-lg font-semibold">Unseated Guests</Text>
            <View className="bg-amber-900 px-3 py-1 rounded-full">
              <Text className="text-amber-400 text-sm font-medium">{unseatedGuests.length}</Text>
            </View>
          </View>

          {unseatedGuests.length === 0 ? (
            <View className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
              <Text className="text-neutral-500 text-center">All guests are seated!</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {unseatedGuests.map((guest) => (
                <View
                  key={guest.id}
                  className="bg-neutral-900 rounded-xl p-3 mr-3 border border-neutral-800"
                  style={{ minWidth: 120 }}
                >
                  <Text className="text-neutral-100 font-medium" numberOfLines={1}>
                    {guest.name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <View
                      className={`w-2 h-2 rounded-full mr-2 ${
                        guest.rsvpStatus === "attending" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    <Text className="text-neutral-500 text-xs capitalize">{guest.rsvpStatus}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {/* Add Table Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-neutral-100 text-xl font-bold">Add Table</Text>
              <Pressable onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            <Text className="text-neutral-400 text-sm mb-4">Choose a table shape:</Text>

            <View className="flex-row justify-between mb-6">
              <Pressable
                onPress={() => handleAddTable("round")}
                className="flex-1 bg-neutral-800 rounded-xl p-4 items-center mr-3 border border-neutral-700 active:bg-neutral-700"
              >
                <View className="w-16 h-16 rounded-full bg-[#C9A961] items-center justify-center mb-2">
                  <Text className="text-black font-bold">8</Text>
                </View>
                <Text className="text-neutral-300 font-medium">Round</Text>
                <Text className="text-neutral-500 text-xs">8 seats</Text>
              </Pressable>

              <Pressable
                onPress={() => handleAddTable("square")}
                className="flex-1 bg-neutral-800 rounded-xl p-4 items-center mr-3 border border-neutral-700 active:bg-neutral-700"
              >
                <View className="w-14 h-14 rounded-lg bg-[#C9A961] items-center justify-center mb-2">
                  <Text className="text-black font-bold">4</Text>
                </View>
                <Text className="text-neutral-300 font-medium">Square</Text>
                <Text className="text-neutral-500 text-xs">4 seats</Text>
              </Pressable>

              <Pressable
                onPress={() => handleAddTable("rectangle")}
                className="flex-1 bg-neutral-800 rounded-xl p-4 items-center border border-neutral-700 active:bg-neutral-700"
              >
                <View
                  className="bg-[#C9A961] items-center justify-center mb-2"
                  style={{ width: 70, height: 40, borderRadius: 6 }}
                >
                  <Text className="text-black font-bold">10</Text>
                </View>
                <Text className="text-neutral-300 font-medium">Rectangle</Text>
                <Text className="text-neutral-500 text-xs">10 seats</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Table Details Modal */}
      <Modal visible={showTableModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6" style={{ maxHeight: "80%" }}>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-neutral-100 text-xl font-bold">
                Table {selectedTable?.tableNumber}
              </Text>
              <Pressable onPress={() => setShowTableModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            {selectedTable && (
              <>
                <View className="flex-row items-center mb-4">
                  <View className="bg-neutral-800 px-3 py-1.5 rounded-full mr-2">
                    <Text className="text-neutral-400 text-sm capitalize">{selectedTable.shape}</Text>
                  </View>
                  <View className="bg-neutral-800 px-3 py-1.5 rounded-full">
                    <Text className="text-neutral-400 text-sm">
                      {selectedTable.guestIds.length}/{selectedTable.capacity} seated
                    </Text>
                  </View>
                </View>

                <Text className="text-neutral-300 font-medium mb-3">Assigned Guests</Text>

                <ScrollView style={{ maxHeight: 200 }} className="mb-4">
                  {selectedTable.guestIds.length === 0 ? (
                    <View className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                      <Text className="text-neutral-500 text-center">No guests assigned yet</Text>
                    </View>
                  ) : (
                    selectedTable.guestIds.map((guestId) => {
                      const guest = guests.find((g) => g.id === guestId);
                      if (!guest) return null;
                      return (
                        <View
                          key={guestId}
                          className="flex-row items-center justify-between bg-neutral-800 rounded-xl p-3 mb-2 border border-neutral-700"
                        >
                          <View className="flex-row items-center flex-1">
                            <View className="w-8 h-8 rounded-full bg-[#C9A961]/20 items-center justify-center mr-3">
                              <Text className="text-[#C9A961] font-bold">
                                {guest.name.charAt(0)}
                              </Text>
                            </View>
                            <View className="flex-1">
                              <Text className="text-neutral-100 font-medium">{guest.name}</Text>
                              <Text className="text-neutral-500 text-xs capitalize">
                                {guest.rsvpStatus}
                              </Text>
                            </View>
                          </View>
                          <Pressable
                            onPress={() => handleRemoveGuest(guestId)}
                            className="p-2"
                          >
                            <Ionicons name="remove-circle" size={22} color="#EF4444" />
                          </Pressable>
                        </View>
                      );
                    })
                  )}
                </ScrollView>

                {selectedTable.guestIds.length < selectedTable.capacity && (
                  <Pressable
                    onPress={() => setShowGuestModal(true)}
                    className="bg-[#C9A961] rounded-xl py-3 items-center mb-3"
                  >
                    <Text className="text-black font-semibold">Add Guest to Table</Text>
                  </Pressable>
                )}

                <Pressable
                  onPress={handleDeleteTable}
                  className="bg-red-900/30 rounded-xl py-3 items-center border border-red-900"
                >
                  <Text className="text-red-400 font-semibold">Delete Table</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Guest to Table Modal */}
      <Modal visible={showGuestModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6" style={{ maxHeight: "70%" }}>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-neutral-100 text-xl font-bold">Select Guest</Text>
              <Pressable onPress={() => setShowGuestModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            <ScrollView>
              {unseatedGuests.length === 0 ? (
                <View className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                  <Text className="text-neutral-500 text-center">All guests are already seated</Text>
                </View>
              ) : (
                unseatedGuests.map((guest) => (
                  <Pressable
                    key={guest.id}
                    onPress={() => handleAssignGuest(guest.id)}
                    className="flex-row items-center bg-neutral-800 rounded-xl p-4 mb-2 border border-neutral-700 active:bg-neutral-700"
                  >
                    <View className="w-10 h-10 rounded-full bg-[#C9A961]/20 items-center justify-center mr-3">
                      <Text className="text-[#C9A961] font-bold text-lg">
                        {guest.name.charAt(0)}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-neutral-100 font-medium">{guest.name}</Text>
                      <View className="flex-row items-center mt-1">
                        <View
                          className={`w-2 h-2 rounded-full mr-2 ${
                            guest.rsvpStatus === "attending"
                              ? "bg-emerald-500"
                              : guest.rsvpStatus === "pending"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                        />
                        <Text className="text-neutral-500 text-xs capitalize">
                          {guest.rsvpStatus}
                        </Text>
                        {guest.plusOne && (
                          <Text className="text-neutral-500 text-xs ml-2">· +1</Text>
                        )}
                      </View>
                    </View>
                    <Ionicons name="add-circle" size={24} color="#C9A961" />
                  </Pressable>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
