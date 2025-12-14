import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TasksRouteProp = RouteProp<RootStackParamList, "Tasks">;

export default function TasksScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<TasksRouteProp>();
  const { weddingId } = route.params;

  // Use individual selectors to avoid infinite loops
  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));
  const allTasks = useWeddingStore((s) => s.tasks);
  const tasks = allTasks.filter((t) => t.weddingId === weddingId);
  const updateTask = useWeddingStore((s) => s.updateTask);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "in-progress" | "completed">("all");

  const filteredTasks = tasks.filter((task) => filterStatus === "all" || task.status === filterStatus);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const toggleTaskStatus = (taskId: string, currentStatus: string) => {
    const newStatus =
      currentStatus === "pending"
        ? "in-progress"
        : currentStatus === "in-progress"
          ? "completed"
          : "pending";

    updateTask(taskId, { status: newStatus });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "venue":
        return "business";
      case "catering":
        return "restaurant";
      case "photography":
        return "camera";
      case "florals":
        return "flower";
      case "attire":
        return "shirt";
      case "music":
        return "musical-notes";
      case "decor":
        return "sparkles";
      default:
        return "checkbox";
    }
  };

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">Wedding not found</Text>
        </View>
      </SafeAreaView>
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
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <View className="flex-row items-center justify-between mb-5">
          <Text className="text-[#F5B800] text-2xl font-bold">Tasks</Text>
          <Pressable
            onPress={() => navigation.navigate("AddTask", { weddingId })}
            className="bg-[#F5B800] rounded-full w-11 h-11 items-center justify-center shadow-md"
          >
            <Ionicons name="add" size={26} color="#000000" />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            onPress={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-full mr-2 ${filterStatus === "all" ? "bg-[#F5B800]" : "bg-neutral-800"}`}
          >
            <Text className={`font-medium ${filterStatus === "all" ? "text-black" : "text-neutral-400"}`}>
              All ({stats.total})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded-full mr-2 ${
              filterStatus === "pending" ? "bg-[#F5B800]" : "bg-neutral-800"
            }`}
          >
            <Text className={`font-medium ${filterStatus === "pending" ? "text-black" : "text-neutral-400"}`}>
              Pending ({stats.pending})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterStatus("in-progress")}
            className={`px-4 py-2 rounded-full mr-2 ${
              filterStatus === "in-progress" ? "bg-[#F5B800]" : "bg-neutral-800"
            }`}
          >
            <Text
              className={`font-medium ${filterStatus === "in-progress" ? "text-black" : "text-neutral-400"}`}
            >
              In Progress ({stats.inProgress})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterStatus("completed")}
            className={`px-4 py-2 rounded-full ${filterStatus === "completed" ? "bg-[#F5B800]" : "bg-neutral-800"}`}
          >
            <Text
              className={`font-medium ${filterStatus === "completed" ? "text-black" : "text-neutral-400"}`}
            >
              Completed ({stats.completed})
            </Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {filteredTasks.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="checkmark-circle-outline" size={64} color="#404040" />
            <Text className="text-neutral-500 text-lg mt-4">No tasks yet</Text>
            <Text className="text-neutral-600 text-sm mt-2">Tap + to add your first task</Text>
          </View>
        ) : (
          <View className="pb-6">
            {filteredTasks.map((task, index) => (
              <Pressable
                key={task.id}
                onLongPress={() => toggleTaskStatus(task.id, task.status)}
                className={`bg-neutral-900 rounded-2xl p-4 border border-neutral-800 active:opacity-70${index < filteredTasks.length - 1 ? " mb-3" : ""}`}
              >
                <View className="flex-row items-start">
                  <Pressable
                    onPress={() => toggleTaskStatus(task.id, task.status)}
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 mt-0.5 ${
                      task.status === "completed"
                        ? "bg-emerald-500 border-emerald-500"
                        : task.status === "in-progress"
                          ? "bg-blue-500 border-blue-500"
                          : "border-neutral-600"
                    }`}
                  >
                    {task.status === "completed" && <Ionicons name="checkmark" size={16} color="white" />}
                    {task.status === "in-progress" && (
                      <View className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </Pressable>

                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text
                        className={`text-lg font-semibold flex-1 ${
                          task.status === "completed" ? "text-neutral-600 line-through" : "text-neutral-100"
                        }`}
                      >
                        {task.title}
                      </Text>
                      <View className="flex-row items-center ml-2">
                        <Ionicons name={getCategoryIcon(task.category)} size={16} color="#F5B800" />
                      </View>
                    </View>

                    {task.description && (
                      <Text className="text-neutral-400 text-sm mb-2">{task.description}</Text>
                    )}

                    <View className="flex-row items-center">
                      {task.dueDate && (
                        <View className={`flex-row items-center${task.priority ? " mr-3" : ""}`}>
                          <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                          <Text className="text-neutral-500 text-xs ml-1">
                            {format(new Date(task.dueDate), "MMM d")}
                          </Text>
                        </View>
                      )}
                      {task.priority && (
                        <View
                          className={`px-2 py-0.5 rounded-full ${
                            task.priority === "high"
                              ? "bg-red-900"
                              : task.priority === "medium"
                                ? "bg-amber-900"
                                : "bg-blue-900"
                          }`}
                        >
                          <Text
                            className={`text-xs font-medium ${
                              task.priority === "high"
                                ? "text-red-400"
                                : task.priority === "medium"
                                  ? "text-amber-400"
                                  : "text-blue-400"
                            }`}
                          >
                            {task.priority}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
