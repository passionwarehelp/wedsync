import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import useWeddingStore from "../state/weddingStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CoupleCalendarRouteProp = RouteProp<RootStackParamList, "CoupleCalendar">;

interface Appointment {
  id: string;
  weddingId: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  notes?: string;
}

export default function CoupleCalendarScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CoupleCalendarRouteProp>();
  const { weddingId } = route.params;
  const insets = useSafeAreaInsets();

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  // Local state for appointments (in production, this would be in the store)
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState(new Date());
  const [newTime, setNewTime] = useState<Date | null>(null);
  const [newLocation, setNewLocation] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);

  const selectedDayAppointments = appointments.filter((apt) =>
    isSameDay(new Date(apt.date), selectedDate)
  );

  const hasAppointment = (date: Date) => {
    return appointments.some((apt) => isSameDay(new Date(apt.date), date));
  };

  const handleAddAppointment = () => {
    if (!newTitle.trim()) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      weddingId,
      title: newTitle.trim(),
      date: newDate.toISOString(),
      time: newTime ? format(newTime, "h:mm a") : undefined,
      location: newLocation.trim() || undefined,
      notes: newNotes.trim() || undefined,
    };

    setAppointments([...appointments, newAppointment]);
    setShowAddModal(false);
    resetForm();
  };

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  const resetForm = () => {
    setNewTitle("");
    setNewDate(selectedDate);
    setNewTime(null);
    setNewLocation("");
    setNewNotes("");
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
        colors={["#1a1a1a", "#000000"]}
        style={{ paddingTop: insets.top + 10, paddingBottom: 20, paddingHorizontal: 20 }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#F5B800" />
          </Pressable>
          <Text className="text-neutral-100 text-xl font-semibold">Calendar</Text>
          <Pressable
            onPress={() => {
              setNewDate(selectedDate);
              setShowAddModal(true);
            }}
            className="w-10 h-10 rounded-full bg-[#F5B800] items-center justify-center"
          >
            <Ionicons name="add" size={24} color="#000" />
          </Pressable>
        </View>

        {/* Month Navigation */}
        <View className="flex-row items-center justify-between mb-4">
          <Pressable onPress={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <Ionicons name="chevron-back" size={24} color="#F5B800" />
          </Pressable>
          <Text className="text-neutral-100 text-lg font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </Text>
          <Pressable onPress={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <Ionicons name="chevron-forward" size={24} color="#F5B800" />
          </Pressable>
        </View>

        {/* Day Headers */}
        <View className="flex-row mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <View key={day} className="flex-1 items-center">
              <Text className="text-neutral-500 text-xs font-medium">{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View className="flex-row flex-wrap">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: startDayOfWeek }).map((_, index) => (
            <View key={`empty-${index}`} className="w-[14.28%] aspect-square" />
          ))}

          {/* Month days */}
          {monthDays.map((day) => {
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            const hasApt = hasAppointment(day);

            return (
              <Pressable
                key={day.toISOString()}
                onPress={() => setSelectedDate(day)}
                className="w-[14.28%] aspect-square items-center justify-center"
              >
                <View
                  className={`w-9 h-9 rounded-full items-center justify-center ${
                    isSelected ? "bg-[#F5B800]" : isToday ? "border border-[#F5B800]" : ""
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      isSelected ? "text-black" : isToday ? "text-[#F5B800]" : "text-neutral-100"
                    }`}
                  >
                    {format(day, "d")}
                  </Text>
                </View>
                {hasApt && !isSelected && (
                  <View className="w-1.5 h-1.5 rounded-full bg-[#F5B800] mt-0.5" />
                )}
              </Pressable>
            );
          })}
        </View>
      </LinearGradient>

      {/* Selected Day Appointments */}
      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        <Text className="text-neutral-100 text-lg font-semibold mb-4">
          {format(selectedDate, "EEEE, MMMM d")}
        </Text>

        {selectedDayAppointments.length === 0 ? (
          <View className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 items-center">
            <Ionicons name="calendar-outline" size={40} color="#404040" />
            <Text className="text-neutral-500 mt-3">No appointments</Text>
            <Pressable
              onPress={() => {
                setNewDate(selectedDate);
                setShowAddModal(true);
              }}
              className="mt-4"
            >
              <Text className="text-[#F5B800] font-medium">Add appointment</Text>
            </Pressable>
          </View>
        ) : (
          selectedDayAppointments.map((apt) => (
            <View
              key={apt.id}
              className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-3"
            >
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="text-neutral-100 text-lg font-semibold">{apt.title}</Text>
                  {apt.time && (
                    <View className="flex-row items-center mt-2">
                      <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                      <Text className="text-neutral-400 text-sm ml-1">{apt.time}</Text>
                    </View>
                  )}
                  {apt.location && (
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="location-outline" size={14} color="#9CA3AF" />
                      <Text className="text-neutral-400 text-sm ml-1">{apt.location}</Text>
                    </View>
                  )}
                  {apt.notes && (
                    <Text className="text-neutral-500 text-sm mt-2">{apt.notes}</Text>
                  )}
                </View>
                <Pressable onPress={() => handleDeleteAppointment(apt.id)} className="p-2">
                  <Ionicons name="trash-outline" size={18} color="#EF4444" />
                </Pressable>
              </View>
            </View>
          ))
        )}

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>

      {/* Add Appointment Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <ScrollView
              className="max-h-[80%]"
              contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
              keyboardShouldPersistTaps="handled"
            >
              <View className="bg-neutral-900 rounded-t-3xl p-6">
                <View className="flex-row items-center justify-between mb-6">
                  <Pressable onPress={() => { setShowAddModal(false); resetForm(); }}>
                    <Ionicons name="close" size={24} color="#9CA3AF" />
                  </Pressable>
                  <Text className="text-neutral-100 text-xl font-bold">Add Appointment</Text>
                  <Pressable onPress={handleAddAppointment} disabled={!newTitle.trim()}>
                    <Text className={`font-semibold ${newTitle.trim() ? "text-[#F5B800]" : "text-neutral-600"}`}>
                      Save
                    </Text>
                  </Pressable>
                </View>

                <View className="mb-4">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Title *</Text>
                  <TextInput
                    value={newTitle}
                    onChangeText={setNewTitle}
                    placeholder="e.g. Venue visit, Dress fitting"
                    placeholderTextColor="#6B7280"
                    className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Date</Text>
                  <Pressable
                    onPress={() => setShowDatePicker(true)}
                    className="bg-neutral-800 rounded-xl px-4 py-4 border border-neutral-700 flex-row items-center"
                  >
                    <Ionicons name="calendar-outline" size={20} color="#F5B800" />
                    <Text className="text-neutral-100 text-base ml-3">
                      {format(newDate, "MMMM d, yyyy")}
                    </Text>
                  </Pressable>
                </View>

                <View className="mb-4">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Time (Optional)</Text>
                  <Pressable
                    onPress={() => setShowTimeModal(true)}
                    className="bg-neutral-800 rounded-xl px-4 py-4 border border-neutral-700 flex-row items-center justify-between"
                  >
                    <Text className={newTime ? "text-neutral-100" : "text-neutral-500"}>
                      {newTime ? format(newTime, "h:mm a") : "Select time"}
                    </Text>
                    {newTime && (
                      <Pressable onPress={() => setNewTime(null)}>
                        <Ionicons name="close-circle" size={20} color="#6B7280" />
                      </Pressable>
                    )}
                  </Pressable>
                </View>

                <View className="mb-4">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Location (Optional)</Text>
                  <TextInput
                    value={newLocation}
                    onChangeText={setNewLocation}
                    placeholder="Enter location"
                    placeholderTextColor="#6B7280"
                    className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                  />
                </View>

                <View className="mb-6">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Notes (Optional)</Text>
                  <TextInput
                    value={newNotes}
                    onChangeText={setNewNotes}
                    placeholder="Add any notes"
                    placeholderTextColor="#6B7280"
                    multiline
                    numberOfLines={3}
                    className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                    style={{ minHeight: 80, textAlignVertical: "top" }}
                  />
                </View>

                <Pressable
                  onPress={handleAddAppointment}
                  disabled={!newTitle.trim()}
                  className={`rounded-xl py-4 items-center ${
                    newTitle.trim() ? "bg-[#F5B800]" : "bg-neutral-800"
                  }`}
                >
                  <Text className={`text-lg font-semibold ${newTitle.trim() ? "text-black" : "text-neutral-600"}`}>
                    Add Appointment
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Date Picker Modal */}
      <Modal visible={showDatePicker} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Pressable onPress={() => setShowDatePicker(false)}>
                <Text className="text-neutral-400">Cancel</Text>
              </Pressable>
              <Text className="text-neutral-100 text-lg font-semibold">Select Date</Text>
              <Pressable onPress={() => setShowDatePicker(false)}>
                <Text className="text-[#F5B800] font-semibold">Done</Text>
              </Pressable>
            </View>
            <DateTimePicker
              value={newDate}
              mode="date"
              display="spinner"
              themeVariant="dark"
              onChange={(e, date) => date && setNewDate(date)}
            />
          </View>
        </View>
      </Modal>

      {/* Time Picker Modal */}
      <Modal visible={showTimeModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Pressable onPress={() => setShowTimeModal(false)}>
                <Text className="text-neutral-400">Cancel</Text>
              </Pressable>
              <Text className="text-neutral-100 text-lg font-semibold">Select Time</Text>
              <Pressable onPress={() => setShowTimeModal(false)}>
                <Text className="text-[#F5B800] font-semibold">Done</Text>
              </Pressable>
            </View>
            <DateTimePicker
              value={newTime || new Date()}
              mode="time"
              display="spinner"
              themeVariant="dark"
              onChange={(e, time) => time && setNewTime(time)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
