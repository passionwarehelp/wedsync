import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Modal, TextInput, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import useAdminStore from "../state/adminStore";
import useAuthStore from "../state/authStore";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { CalendarEvent } from "../types/wedding";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdminCalendarScreen() {
  const navigation = useNavigation<NavigationProp>();
  const userId = useAuthStore((s) => s.user?.id);
  const weddings = useWeddingStore((s) => s.weddings);
  const tasks = useWeddingStore((s) => s.tasks);
  const invoices = useAdminStore((s) => s.invoices);
  const calendarEvents = useAdminStore((s) => s.calendarEvents);
  const addCalendarEvent = useAdminStore((s) => s.addCalendarEvent);
  const deleteCalendarEvent = useAdminStore((s) => s.deleteCalendarEvent);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Add event form
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState<CalendarEvent["type"]>("appointment");
  const [eventAllDay, setEventAllDay] = useState(true);
  const [eventStartTime, setEventStartTime] = useState("09:00");
  const [eventEndTime, setEventEndTime] = useState("10:00");

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get start day of week offset
  const startDayOffset = monthStart.getDay();

  const getEventsForDay = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const weddingEvents = weddings.filter((w) => isSameDay(new Date(w.weddingDate), day));
    const taskEvents = tasks.filter((t) => t.dueDate && isSameDay(new Date(t.dueDate), day));
    const invoiceEvents = invoices.filter((i) => isSameDay(new Date(i.dueDate), day));
    const customEvents = calendarEvents.filter((e) => e.date.startsWith(dateStr));
    return { weddings: weddingEvents, tasks: taskEvents, invoices: invoiceEvents, custom: customEvents };
  };

  const hasEventsOnDay = (day: Date) => {
    const events = getEventsForDay(day);
    return events.weddings.length > 0 || events.tasks.length > 0 || events.invoices.length > 0 || events.custom.length > 0;
  };

  const getEventDotColor = (day: Date) => {
    const events = getEventsForDay(day);
    if (events.weddings.length > 0) return "#ec4899";
    if (events.custom.length > 0) return "#F5B800";
    if (events.tasks.length > 0) return "#60a5fa";
    if (events.invoices.length > 0) return "#f59e0b";
    return "#F5B800";
  };

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : null;

  const handleAddEvent = () => {
    if (!eventTitle.trim() || !selectedDay || !userId) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      userId,
      title: eventTitle.trim(),
      description: eventDescription.trim() || undefined,
      date: format(selectedDay, "yyyy-MM-dd"),
      startTime: eventAllDay ? undefined : eventStartTime,
      endTime: eventAllDay ? undefined : eventEndTime,
      allDay: eventAllDay,
      type: eventType,
      createdAt: new Date().toISOString(),
    };

    addCalendarEvent(newEvent);
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setEventTitle("");
    setEventDescription("");
    setEventType("appointment");
    setEventAllDay(true);
    setEventStartTime("09:00");
    setEventEndTime("10:00");
  };

  const eventTypeOptions: { value: CalendarEvent["type"]; label: string; icon: string }[] = [
    { value: "meeting", label: "Meeting", icon: "people" },
    { value: "appointment", label: "Appointment", icon: "calendar" },
    { value: "deadline", label: "Deadline", icon: "alarm" },
    { value: "personal", label: "Personal", icon: "person" },
    { value: "other", label: "Other", icon: "ellipsis-horizontal" },
  ];

  return (
    <View className="flex-1 bg-black">
      {/* Compact Header */}
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 16, paddingHorizontal: 20 }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Pressable onPress={() => navigation.goBack()} className="p-1">
            <Ionicons name="arrow-back" size={24} color="#F5B800" />
          </Pressable>
          <Text className="text-[#F5B800] text-xl font-bold">Calendar</Text>
          <Pressable
            onPress={() => {
              if (!selectedDay) setSelectedDay(new Date());
              setShowAddModal(true);
            }}
            className="w-10 h-10 bg-[#F5B800] rounded-full items-center justify-center"
          >
            <Ionicons name="add" size={24} color="#000" />
          </Pressable>
        </View>

        {/* Month Navigation - Compact */}
        <View className="flex-row items-center justify-between">
          <Pressable onPress={previousMonth} className="p-2">
            <Ionicons name="chevron-back" size={20} color="#F5B800" />
          </Pressable>
          <Text className="text-neutral-100 text-base font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </Text>
          <Pressable onPress={nextMonth} className="p-2">
            <Ionicons name="chevron-forward" size={20} color="#F5B800" />
          </Pressable>
        </View>

        {/* Day Names - Compact */}
        <View className="flex-row mt-3">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <View key={i} className="flex-1 items-center">
              <Text className="text-neutral-500 text-xs font-medium">{day}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Calendar Grid - Compact */}
        <View className="px-4 pt-2">
          <View className="flex-row flex-wrap">
            {/* Empty cells for offset */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <View key={`empty-${i}`} className="w-[14.28%] aspect-square" />
            ))}
            {monthDays.map((day, i) => {
              const hasEvents = hasEventsOnDay(day);
              const isSelected = selectedDay && isSameDay(day, selectedDay);
              const isToday = isSameDay(day, new Date());
              const dotColor = getEventDotColor(day);

              return (
                <Pressable
                  key={i}
                  onPress={() => setSelectedDay(day)}
                  className="w-[14.28%] aspect-square items-center justify-center"
                >
                  <View
                    className={`w-9 h-9 rounded-full items-center justify-center ${
                      isSelected ? "bg-[#F5B800]" : ""
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${
                        isSelected
                          ? "text-black"
                          : isToday
                          ? "text-[#F5B800]"
                          : isSameMonth(day, currentDate)
                          ? "text-neutral-300"
                          : "text-neutral-700"
                      }`}
                    >
                      {format(day, "d")}
                    </Text>
                  </View>
                  {hasEvents && !isSelected && (
                    <View
                      className="w-1.5 h-1.5 rounded-full mt-0.5"
                      style={{ backgroundColor: dotColor }}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Selected Day Events */}
        <View className="px-4 pt-4 pb-8">
          {selectedDay ? (
            <View>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-neutral-400 text-xs font-semibold">
                  {format(selectedDay, "EEEE, MMMM d").toUpperCase()}
                </Text>
                <Pressable
                  onPress={() => setShowAddModal(true)}
                  className="flex-row items-center"
                >
                  <Ionicons name="add-circle" size={18} color="#F5B800" />
                  <Text className="text-[#F5B800] text-xs font-medium ml-1">Add Event</Text>
                </Pressable>
              </View>

              {selectedEvents &&
              selectedEvents.weddings.length === 0 &&
              selectedEvents.tasks.length === 0 &&
              selectedEvents.invoices.length === 0 &&
              selectedEvents.custom.length === 0 ? (
                <View className="bg-neutral-900 rounded-xl p-5 border border-neutral-800 items-center">
                  <Ionicons name="calendar-outline" size={28} color="#404040" />
                  <Text className="text-neutral-500 text-sm mt-2">No events</Text>
                  <Pressable
                    onPress={() => setShowAddModal(true)}
                    className="mt-3 bg-[#F5B800]/10 px-4 py-2 rounded-full"
                  >
                    <Text className="text-[#F5B800] text-sm font-medium">Add Event</Text>
                  </Pressable>
                </View>
              ) : (
                <View>
                  {/* Custom Events */}
                  {selectedEvents?.custom.map((event) => (
                    <View
                      key={event.id}
                      className="bg-neutral-900 rounded-xl p-3 border border-neutral-800 mb-2"
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                          <View className="w-8 h-8 bg-[#F5B800]/20 rounded-full items-center justify-center mr-3">
                            <Ionicons name="calendar" size={16} color="#F5B800" />
                          </View>
                          <View className="flex-1">
                            <Text className="text-neutral-100 text-sm font-medium">{event.title}</Text>
                            {!event.allDay && event.startTime && (
                              <Text className="text-neutral-500 text-xs mt-0.5">
                                {event.startTime} {event.endTime ? `- ${event.endTime}` : ""}
                              </Text>
                            )}
                          </View>
                        </View>
                        <Pressable
                          onPress={() => deleteCalendarEvent(event.id)}
                          className="p-2"
                        >
                          <Ionicons name="trash-outline" size={16} color="#666" />
                        </Pressable>
                      </View>
                    </View>
                  ))}

                  {/* Weddings */}
                  {selectedEvents?.weddings.map((wedding) => (
                    <Pressable
                      key={wedding.id}
                      onPress={() => navigation.navigate("WeddingDetail", { weddingId: wedding.id })}
                      className="bg-neutral-900 rounded-xl p-3 border border-neutral-800 mb-2 active:opacity-70"
                    >
                      <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-pink-900/30 rounded-full items-center justify-center mr-3">
                          <Ionicons name="heart" size={16} color="#ec4899" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-neutral-100 text-sm font-medium">{wedding.coupleName}</Text>
                          <Text className="text-neutral-500 text-xs mt-0.5">Wedding Day</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#666" />
                      </View>
                    </Pressable>
                  ))}

                  {/* Tasks */}
                  {selectedEvents?.tasks.map((task) => (
                    <View
                      key={task.id}
                      className="bg-neutral-900 rounded-xl p-3 border border-neutral-800 mb-2"
                    >
                      <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-blue-900/30 rounded-full items-center justify-center mr-3">
                          <Ionicons name="checkmark-circle" size={16} color="#60a5fa" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-neutral-100 text-sm font-medium">{task.title}</Text>
                          <Text className="text-neutral-500 text-xs mt-0.5">Task Due</Text>
                        </View>
                      </View>
                    </View>
                  ))}

                  {/* Invoices */}
                  {selectedEvents?.invoices.map((invoice) => (
                    <View
                      key={invoice.id}
                      className="bg-neutral-900 rounded-xl p-3 border border-neutral-800 mb-2"
                    >
                      <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-amber-900/30 rounded-full items-center justify-center mr-3">
                          <Ionicons name="receipt" size={16} color="#f59e0b" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-neutral-100 text-sm font-medium">{invoice.clientName}</Text>
                          <Text className="text-neutral-500 text-xs mt-0.5">Invoice Due - ${invoice.total}</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View className="bg-neutral-900 rounded-xl p-5 border border-neutral-800 items-center">
              <Ionicons name="hand-left-outline" size={28} color="#404040" />
              <Text className="text-neutral-500 text-sm mt-2">Select a day to view events</Text>
            </View>
          )}

          {/* Compact Legend */}
          <View className="mt-4 flex-row flex-wrap">
            <View className="flex-row items-center mr-4 mb-2">
              <View className="w-2 h-2 rounded-full bg-[#ec4899] mr-1.5" />
              <Text className="text-neutral-500 text-xs">Weddings</Text>
            </View>
            <View className="flex-row items-center mr-4 mb-2">
              <View className="w-2 h-2 rounded-full bg-[#F5B800] mr-1.5" />
              <Text className="text-neutral-500 text-xs">Events</Text>
            </View>
            <View className="flex-row items-center mr-4 mb-2">
              <View className="w-2 h-2 rounded-full bg-[#60a5fa] mr-1.5" />
              <Text className="text-neutral-500 text-xs">Tasks</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <View className="w-2 h-2 rounded-full bg-[#f59e0b] mr-1.5" />
              <Text className="text-neutral-500 text-xs">Invoices</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add Event Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6 max-h-[80%]">
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-neutral-100 text-lg font-bold">Add Event</Text>
              <Pressable onPress={() => { setShowAddModal(false); resetForm(); }}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Date Display */}
              {selectedDay && (
                <View className="bg-neutral-800 rounded-xl px-4 py-3 mb-4">
                  <Text className="text-neutral-400 text-xs mb-1">Date</Text>
                  <Text className="text-neutral-100 font-medium">
                    {format(selectedDay, "EEEE, MMMM d, yyyy")}
                  </Text>
                </View>
              )}

              {/* Title */}
              <View className="mb-4">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Title *</Text>
                <TextInput
                  value={eventTitle}
                  onChangeText={setEventTitle}
                  placeholder="Event title"
                  placeholderTextColor="#6B7280"
                  className="bg-neutral-800 rounded-xl px-4 py-3 text-base text-neutral-100 border border-neutral-700"
                />
              </View>

              {/* Description */}
              <View className="mb-4">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Description</Text>
                <TextInput
                  value={eventDescription}
                  onChangeText={setEventDescription}
                  placeholder="Optional description"
                  placeholderTextColor="#6B7280"
                  multiline
                  numberOfLines={3}
                  className="bg-neutral-800 rounded-xl px-4 py-3 text-base text-neutral-100 border border-neutral-700"
                  style={{ minHeight: 80, textAlignVertical: "top" }}
                />
              </View>

              {/* Event Type */}
              <View className="mb-4">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Type</Text>
                <View className="flex-row flex-wrap">
                  {eventTypeOptions.map((option) => (
                    <Pressable
                      key={option.value}
                      onPress={() => setEventType(option.value)}
                      className={`flex-row items-center px-3 py-2 rounded-full mr-2 mb-2 ${
                        eventType === option.value
                          ? "bg-[#F5B800]"
                          : "bg-neutral-800 border border-neutral-700"
                      }`}
                    >
                      <Ionicons
                        name={option.icon as any}
                        size={14}
                        color={eventType === option.value ? "#000" : "#9CA3AF"}
                      />
                      <Text
                        className={`ml-1.5 text-sm ${
                          eventType === option.value ? "text-black font-medium" : "text-neutral-400"
                        }`}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* All Day Toggle */}
              <View className="flex-row items-center justify-between mb-4 bg-neutral-800 rounded-xl px-4 py-3">
                <Text className="text-neutral-100 text-base">All Day</Text>
                <Switch
                  value={eventAllDay}
                  onValueChange={setEventAllDay}
                  trackColor={{ false: "#404040", true: "#F5B800" }}
                  thumbColor="#FFFFFF"
                />
              </View>

              {/* Time Inputs */}
              {!eventAllDay && (
                <View className="flex-row mb-4">
                  <View className="flex-1 mr-2">
                    <Text className="text-neutral-300 text-sm font-medium mb-2">Start Time</Text>
                    <TextInput
                      value={eventStartTime}
                      onChangeText={setEventStartTime}
                      placeholder="09:00"
                      placeholderTextColor="#6B7280"
                      className="bg-neutral-800 rounded-xl px-4 py-3 text-base text-neutral-100 border border-neutral-700"
                    />
                  </View>
                  <View className="flex-1 ml-2">
                    <Text className="text-neutral-300 text-sm font-medium mb-2">End Time</Text>
                    <TextInput
                      value={eventEndTime}
                      onChangeText={setEventEndTime}
                      placeholder="10:00"
                      placeholderTextColor="#6B7280"
                      className="bg-neutral-800 rounded-xl px-4 py-3 text-base text-neutral-100 border border-neutral-700"
                    />
                  </View>
                </View>
              )}

              {/* Add Button */}
              <Pressable
                onPress={handleAddEvent}
                disabled={!eventTitle.trim()}
                className={`rounded-xl py-4 items-center mt-2 ${
                  eventTitle.trim() ? "bg-[#F5B800]" : "bg-neutral-700"
                }`}
              >
                <Text className={`text-lg font-semibold ${eventTitle.trim() ? "text-black" : "text-neutral-500"}`}>
                  Add Event
                </Text>
              </Pressable>

              <View className="h-8" />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
