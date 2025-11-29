import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput, Alert, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useAdminStore from "../state/adminStore";
import useWeddingStore from "../state/weddingStore";
import { EmailTemplate } from "../types/wedding";
import { LinearGradient } from "expo-linear-gradient";
import { subDays, format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DEFAULT_TEMPLATES: Omit<EmailTemplate, "id">[] = [
  {
    name: "2 Weeks Before Wedding",
    trigger: "2_weeks_before",
    subject: "Your wedding is coming up in 2 weeks!",
    body: "Hi {COUPLE_NAME},\n\nYour special day is just 2 weeks away! Here are some final reminders:\n\n• Confirm final guest count\n• Review timeline\n• Pack emergency kit\n\nWe're excited to celebrate with you!\n\nBest regards,\n{YOUR_NAME}",
    isActive: true,
  },
  {
    name: "Photos Uploaded",
    trigger: "photos_uploaded",
    subject: "Your wedding photos are ready!",
    body: "Hi {COUPLE_NAME},\n\nGreat news! Your wedding photos have been uploaded to the gallery.\n\nYou can view and download them anytime through your WedSync portal.\n\nCheers,\n{YOUR_NAME}",
    isActive: true,
  },
  {
    name: "Thank You (After Wedding)",
    trigger: "after_wedding",
    subject: "Thank you for letting us be part of your special day",
    body: "Dear {COUPLE_NAME},\n\nThank you for choosing us to be part of your wedding day. It was an honor to celebrate with you.\n\nWe hope you had an amazing time and wish you both a lifetime of happiness together.\n\nWarm wishes,\n{YOUR_NAME}",
    isActive: true,
  },
];

export default function EmailAutomationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const emailTemplates = useAdminStore((s) => s.emailTemplates);
  const addEmailTemplate = useAdminStore((s) => s.addEmailTemplate);
  const updateEmailTemplate = useAdminStore((s) => s.updateEmailTemplate);
  const deleteEmailTemplate = useAdminStore((s) => s.deleteEmailTemplate);
  const scheduleEmail = useAdminStore((s) => s.scheduleEmail);
  const weddings = useWeddingStore((s) => s.weddings);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    trigger: "manual" as EmailTemplate["trigger"],
    subject: "",
    body: "",
    isActive: true,
  });

  const initializeDefaultTemplates = () => {
    DEFAULT_TEMPLATES.forEach((template) => {
      const exists = emailTemplates.find((t) => t.name === template.name);
      if (!exists) {
        addEmailTemplate({
          ...template,
          id: Date.now().toString() + Math.random(),
        });
      }
    });
    Alert.alert("Success", "Default templates added!");
  };

  const createTemplate = () => {
    if (!newTemplate.name.trim() || !newTemplate.subject.trim() || !newTemplate.body.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    addEmailTemplate({
      ...newTemplate,
      id: Date.now().toString(),
    });

    setNewTemplate({ name: "", trigger: "manual", subject: "", body: "", isActive: true });
    setShowCreateModal(false);
    Alert.alert("Success", "Email template created!");
  };

  const getTriggerLabel = (trigger: EmailTemplate["trigger"]) => {
    switch (trigger) {
      case "2_weeks_before":
        return "2 Weeks Before Wedding";
      case "1_week_before":
        return "1 Week Before Wedding";
      case "3_days_before":
        return "3 Days Before Wedding";
      case "photos_uploaded":
        return "When Photos Uploaded";
      case "after_wedding":
        return "After Wedding";
      case "manual":
        return "Manual Send";
      default:
        return trigger;
    }
  };

  const getTriggerColor = (trigger: EmailTemplate["trigger"]) => {
    switch (trigger) {
      case "2_weeks_before":
      case "1_week_before":
      case "3_days_before":
        return "#f59e0b";
      case "photos_uploaded":
        return "#a78bfa";
      case "after_wedding":
        return "#10b981";
      case "manual":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  if (showCreateModal) {
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1F1F1F", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
        >
          <View className="flex-row items-center justify-between mb-6">
            <Pressable onPress={() => setShowCreateModal(false)}>
              <Ionicons name="close" size={28} color="#C9A961" />
            </Pressable>
            <Text className="text-[#C9A961] text-xl font-bold">Create Template</Text>
            <Pressable onPress={createTemplate} className="bg-[#C9A961] px-4 py-2 rounded-full">
              <Text className="text-black font-semibold">Create</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          <View className="space-y-4 pb-8">
            <View>
              <Text className="text-neutral-400 text-sm mb-2">Template Name *</Text>
              <TextInput
                value={newTemplate.name}
                onChangeText={(text) => setNewTemplate({ ...newTemplate, name: text })}
                placeholder="e.g., Final Reminder"
                placeholderTextColor="#666666"
                className="bg-neutral-900 text-neutral-100 rounded-xl p-4 border border-neutral-800"
              />
            </View>

            <View>
              <Text className="text-neutral-400 text-sm mb-2">When to Send</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row space-x-2">
                  {(["2_weeks_before", "1_week_before", "3_days_before", "photos_uploaded", "after_wedding", "manual"] as const).map(
                    (trigger) => (
                      <Pressable
                        key={trigger}
                        onPress={() => setNewTemplate({ ...newTemplate, trigger })}
                        className={`px-4 py-2 rounded-full ${
                          newTemplate.trigger === trigger ? "bg-[#C9A961]" : "bg-neutral-800 border border-neutral-700"
                        }`}
                      >
                        <Text
                          className={`text-xs font-medium ${
                            newTemplate.trigger === trigger ? "text-black" : "text-neutral-300"
                          }`}
                        >
                          {getTriggerLabel(trigger)}
                        </Text>
                      </Pressable>
                    )
                  )}
                </View>
              </ScrollView>
            </View>

            <View>
              <Text className="text-neutral-400 text-sm mb-2">Subject Line *</Text>
              <TextInput
                value={newTemplate.subject}
                onChangeText={(text) => setNewTemplate({ ...newTemplate, subject: text })}
                placeholder="Email subject"
                placeholderTextColor="#666666"
                className="bg-neutral-900 text-neutral-100 rounded-xl p-4 border border-neutral-800"
              />
            </View>

            <View>
              <Text className="text-neutral-400 text-sm mb-2">Email Body *</Text>
              <TextInput
                value={newTemplate.body}
                onChangeText={(text) => setNewTemplate({ ...newTemplate, body: text })}
                placeholder="Use {COUPLE_NAME} and {YOUR_NAME} for personalization"
                placeholderTextColor="#666666"
                multiline
                numberOfLines={10}
                textAlignVertical="top"
                className="bg-neutral-900 text-neutral-100 rounded-xl p-4 border border-neutral-800"
                style={{ minHeight: 200 }}
              />
            </View>

            <View className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
              <Text className="text-neutral-400 text-xs mb-2">AVAILABLE VARIABLES</Text>
              <Text className="text-neutral-500 text-xs">
                • {"{"} COUPLE_NAME{"}"} - Couple&apos;s names{"\n"}• {"{"} YOUR_NAME{"}"} - Your business name
              </Text>
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
            <Text className="text-[#C9A961] text-3xl font-bold">Email Automation</Text>
            <Text className="text-neutral-400 text-base mt-1">{emailTemplates.length} templates</Text>
          </View>
          <Pressable
            onPress={() => setShowCreateModal(true)}
            className="w-12 h-12 bg-[#C9A961] rounded-full items-center justify-center active:opacity-70"
          >
            <Ionicons name="add" size={28} color="#000000" />
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {emailTemplates.length === 0 ? (
          <View className="items-center py-12">
            <Ionicons name="mail-outline" size={64} color="#404040" />
            <Text className="text-neutral-500 text-lg mt-4">No email templates</Text>
            <Text className="text-neutral-600 text-sm mt-2 text-center px-8">Create automated emails for your clients</Text>
            <Pressable
              onPress={initializeDefaultTemplates}
              className="bg-neutral-800 px-6 py-3 rounded-full mt-6 border border-neutral-700"
            >
              <Text className="text-neutral-300 font-semibold">Add Default Templates</Text>
            </Pressable>
          </View>
        ) : (
          <View className="space-y-2 pb-8">
            {emailTemplates.map((template) => (
              <View key={template.id} className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1 mr-3">
                    <Text className="text-neutral-100 text-base font-semibold">{template.name}</Text>
                    <View
                      className="px-2 py-1 rounded-full mt-2 self-start"
                      style={{ backgroundColor: `${getTriggerColor(template.trigger)}20` }}
                    >
                      <Text className="text-[10px] font-semibold" style={{ color: getTriggerColor(template.trigger) }}>
                        {getTriggerLabel(template.trigger)}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={template.isActive}
                    onValueChange={(value) => updateEmailTemplate(template.id, { isActive: value })}
                    trackColor={{ false: "#3a3a3a", true: "#C9A961" }}
                    thumbColor="#ffffff"
                  />
                </View>

                <Text className="text-neutral-400 text-xs mb-1">Subject:</Text>
                <Text className="text-neutral-300 text-sm">{template.subject}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
