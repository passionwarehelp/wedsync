import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type AddTaskRouteProp = RouteProp<RootStackParamList, "AddTask">;

const CATEGORIES = [
  { label: "Venue", value: "venue", icon: "business" },
  { label: "Catering", value: "catering", icon: "restaurant" },
  { label: "Photography", value: "photography", icon: "camera" },
  { label: "Florals", value: "florals", icon: "flower" },
  { label: "Attire", value: "attire", icon: "shirt" },
  { label: "Music", value: "music", icon: "musical-notes" },
  { label: "Decor", value: "decor", icon: "sparkles" },
  { label: "Other", value: "other", icon: "ellipsis-horizontal" },
] as const;

const PRIORITIES = [
  { label: "Low", value: "low", color: "#3B82F6", bg: "bg-blue-900" },
  { label: "Medium", value: "medium", color: "#F59E0B", bg: "bg-amber-900" },
  { label: "High", value: "high", color: "#EF4444", bg: "bg-red-900" },
] as const;

export default function AddTaskScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AddTaskRouteProp>();
  const { weddingId } = route.params;
  const insets = useSafeAreaInsets();

  const addTask = useWeddingStore((s) => s.addTask);
  const updateWedding = useWeddingStore((s) => s.updateWedding);
  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"venue" | "catering" | "photography" | "florals" | "attire" | "music" | "decor" | "other">("other");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAdd = () => {
    if (!title.trim()) {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      weddingId,
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      status: "pending" as const,
      priority,
      dueDate: dueDate ? dueDate.toISOString() : undefined,
    };

    addTask(newTask);

    // Update wedding task count
    if (wedding) {
      updateWedding(weddingId, {
        totalTasks: wedding.totalTasks + 1,
      });
    }

    navigation.goBack();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <View className="flex-1 bg-black/95">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          {/* Header */}
          <View
            className="bg-neutral-900 border-b border-neutral-800"
            style={{ paddingTop: insets.top + 10, paddingBottom: 16, paddingHorizontal: 20 }}
          >
            <View className="flex-row items-center justify-between">
              <Pressable
                onPress={() => navigation.goBack()}
                className="w-10 h-10 items-center justify-center"
              >
                <Ionicons name="close" size={28} color="#9CA3AF" />
              </Pressable>
              <Text className="text-neutral-100 text-lg font-semibold">Add Task</Text>
              <Pressable
                onPress={handleAdd}
                disabled={!title.trim()}
                className="px-4 py-2"
              >
                <Text className={`text-base font-semibold ${title.trim() ? "text-[#C9A961]" : "text-neutral-600"}`}>
                  Done
                </Text>
              </Pressable>
            </View>
          </View>

          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
          >
            <ScrollView
              className="flex-1 px-5"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
              keyboardShouldPersistTaps="handled"
            >
              {/* Task Title */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Task Title *</Text>
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder="What needs to be done?"
                  placeholderTextColor="#6B7280"
                  className="bg-neutral-900 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-800"
                  returnKeyType="next"
                />
              </View>

              {/* Description */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Description</Text>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Add details or notes..."
                  placeholderTextColor="#6B7280"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  className="bg-neutral-900 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-800"
                  style={{ minHeight: 80 }}
                />
              </View>

              {/* Category */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-3">Category</Text>
                <View className="flex-row flex-wrap">
                  {CATEGORIES.map((cat) => (
                    <Pressable
                      key={cat.value}
                      onPress={() => setCategory(cat.value)}
                      className={`flex-row items-center px-3 py-2 rounded-full mr-2 mb-2 ${
                        category === cat.value ? "bg-[#C9A961]" : "bg-neutral-900 border border-neutral-800"
                      }`}
                    >
                      <Ionicons
                        name={cat.icon as any}
                        size={14}
                        color={category === cat.value ? "#000000" : "#9CA3AF"}
                      />
                      <Text
                        className={`ml-1.5 text-sm font-medium ${
                          category === cat.value ? "text-black" : "text-neutral-400"
                        }`}
                      >
                        {cat.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Priority */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-3">Priority</Text>
                <View className="flex-row">
                  {PRIORITIES.map((p, index) => (
                    <Pressable
                      key={p.value}
                      onPress={() => setPriority(p.value)}
                      className={`flex-1 py-3 rounded-xl items-center ${
                        index < PRIORITIES.length - 1 ? "mr-2" : ""
                      } ${
                        priority === p.value
                          ? p.bg + " border-2"
                          : "bg-neutral-900 border border-neutral-800"
                      }`}
                      style={priority === p.value ? { borderColor: p.color } : {}}
                    >
                      <Text
                        className={`font-semibold ${
                          priority === p.value ? "text-white" : "text-neutral-500"
                        }`}
                      >
                        {p.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Due Date */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Due Date</Text>
                <Pressable
                  onPress={() => setShowDatePicker(true)}
                  className="bg-neutral-900 rounded-xl px-4 py-4 border border-neutral-800 flex-row items-center justify-between"
                >
                  <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={20} color="#C9A961" />
                    <Text className={`ml-3 text-base ${dueDate ? "text-neutral-100" : "text-neutral-500"}`}>
                      {dueDate ? format(dueDate, "MMMM d, yyyy") : "Select a due date"}
                    </Text>
                  </View>
                  {dueDate && (
                    <Pressable onPress={() => setDueDate(null)}>
                      <Ionicons name="close-circle" size={20} color="#6B7280" />
                    </Pressable>
                  )}
                </Pressable>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={dueDate || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                  textColor="#FFFFFF"
                  themeVariant="dark"
                />
              )}

              {/* Add Button at bottom of scroll */}
              <Pressable
                onPress={handleAdd}
                disabled={!title.trim()}
                className={`rounded-xl py-4 items-center mt-4 ${
                  title.trim() ? "bg-[#C9A961] active:opacity-80" : "bg-neutral-800"
                }`}
              >
                <Text className={`text-lg font-semibold ${title.trim() ? "text-black" : "text-neutral-600"}`}>
                  Add Task
                </Text>
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
