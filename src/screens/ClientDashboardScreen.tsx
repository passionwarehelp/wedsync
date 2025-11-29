import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ClientDashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-neutral-800 text-xl">Client Dashboard</Text>
        <Text className="text-neutral-500 mt-2">Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
