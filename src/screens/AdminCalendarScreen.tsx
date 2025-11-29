import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import useAdminStore from "../state/adminStore";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdminCalendarScreen() {
  const navigation = useNavigation<NavigationProp>();
  const weddings = useWeddingStore((s) => s.weddings);
  const tasks = useWeddingStore((s) => s.tasks);
  const invoices = useAdminStore((s) => s.invoices);
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day: Date) => {
    const weddingEvents = weddings.filter((w) => isSameDay(new Date(w.weddingDate), day));
    const taskEvents = tasks.filter((t) => t.dueDate && isSameDay(new Date(t.dueDate), day));
    const invoiceEvents = invoices.filter((i) => isSameDay(new Date(i.dueDate), day));
    return { weddings: weddingEvents, tasks: taskEvents, invoices: invoiceEvents };
  };

  const hasEventsOnDay = (day: Date) => {
    const events = getEventsForDay(day);
    return events.weddings.length > 0 || events.tasks.length > 0 || events.invoices.length > 0;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : null;

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
            <Text className="text-[#C9A961] text-3xl font-bold">Calendar</Text>
            <Text className="text-neutral-400 text-base mt-1">{format(currentDate, "MMMM yyyy")}</Text>
          </View>
          <View className="flex-row">
            <Pressable
              onPress={previousMonth}
              className="w-10 h-10 bg-neutral-800 rounded-full items-center justify-center border border-neutral-700 mr-2"
            >
              <Ionicons name="chevron-back" size={20} color="#C9A961" />
            </Pressable>
            <Pressable
              onPress={nextMonth}
              className="w-10 h-10 bg-neutral-800 rounded-full items-center justify-center border border-neutral-700"
            >
              <Ionicons name="chevron-forward" size={20} color="#C9A961" />
            </Pressable>
          </View>
        </View>

        {/* Day Names */}
        <View className="flex-row mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <View key={i} className="flex-1 items-center">
              <Text className="text-neutral-500 text-xs font-semibold">{day}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Calendar Grid */}
        <View className="flex-row flex-wrap mb-6">
          {monthDays.map((day, i) => {
            const hasEvents = hasEventsOnDay(day);
            const isSelected = selectedDay && isSameDay(day, selectedDay);
            const isToday = isSameDay(day, new Date());
            return (
              <Pressable
                key={i}
                onPress={() => setSelectedDay(day)}
                className={`w-[14.28%] aspect-square p-1 items-center justify-center ${
                  isSelected ? "bg-[#C9A961] rounded-2xl" : ""
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    isSelected
                      ? "text-black"
                      : isToday
                      ? "text-[#C9A961]"
                      : isSameMonth(day, currentDate)
                      ? "text-neutral-300"
                      : "text-neutral-700"
                  }`}
                >
                  {format(day, "d")}
                </Text>
                {hasEvents && !isSelected && <View className="w-1 h-1 bg-[#C9A961] rounded-full mt-1" />}
              </Pressable>
            );
          })}
        </View>

        {/* Selected Day Events */}
        {selectedEvents && (
          <View className="mb-8">
            <Text className="text-neutral-400 text-sm font-semibold mb-4">
              {format(selectedDay!, "MMMM d, yyyy").toUpperCase()}
            </Text>

            {selectedEvents.weddings.length === 0 &&
            selectedEvents.tasks.length === 0 &&
            selectedEvents.invoices.length === 0 ? (
              <View className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 items-center">
                <Ionicons name="calendar-outline" size={32} color="#404040" />
                <Text className="text-neutral-500 text-sm mt-2">No events on this day</Text>
              </View>
            ) : (
              <View>
                {selectedEvents.weddings.map((wedding) => (
                  <Pressable
                    key={wedding.id}
                    onPress={() => navigation.navigate("WeddingDetail", { weddingId: wedding.id })}
                    className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 active:opacity-70 mb-3"
                  >
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 bg-pink-900/30 rounded-full items-center justify-center mr-3">
                        <Ionicons name="heart" size={20} color="#ec4899" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-100 text-base font-semibold">{wedding.coupleName}</Text>
                        <Text className="text-neutral-500 text-xs mt-1">Wedding</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#666" />
                    </View>
                  </Pressable>
                ))}

                {selectedEvents.tasks.map((task) => (
                  <View
                    key={task.id}
                    className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-3"
                  >
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 bg-blue-900/30 rounded-full items-center justify-center mr-3">
                        <Ionicons name="checkmark-circle" size={20} color="#60a5fa" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-100 text-base font-semibold">{task.title}</Text>
                        <Text className="text-neutral-500 text-xs mt-1">Task Due</Text>
                      </View>
                    </View>
                  </View>
                ))}

                {selectedEvents.invoices.map((invoice) => (
                  <View
                    key={invoice.id}
                    className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800"
                  >
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 bg-amber-900/30 rounded-full items-center justify-center mr-3">
                        <Ionicons name="receipt" size={20} color="#f59e0b" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-100 text-base font-semibold">{invoice.clientName}</Text>
                        <Text className="text-neutral-500 text-xs mt-1">Invoice Due - ${invoice.total}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Legend */}
        <View className="bg-neutral-900 rounded-2xl p-5 mb-8 border border-neutral-800">
          <Text className="text-neutral-100 text-base font-semibold mb-3">Legend</Text>
          <View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="heart" size={16} color="#ec4899" />
              <Text className="text-neutral-400 text-sm ml-2">Weddings</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="checkmark-circle" size={16} color="#60a5fa" />
              <Text className="text-neutral-400 text-sm ml-2">Task Deadlines</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="receipt" size={16} color="#f59e0b" />
              <Text className="text-neutral-400 text-sm ml-2">Invoice Due Dates</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
