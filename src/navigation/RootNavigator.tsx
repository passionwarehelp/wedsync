import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Wedding } from "../types/wedding";

// Import screens (will be created)
import ProDashboardScreen from "../screens/ProDashboardScreen";
import ClientDashboardScreen from "../screens/ClientDashboardScreen";
import WeddingDetailScreen from "../screens/WeddingDetailScreen";
import GuestListScreen from "../screens/GuestListScreen";
import TasksScreen from "../screens/TasksScreen";
import TimelineScreen from "../screens/TimelineScreen";
import VendorsScreen from "../screens/VendorsScreen";
import SeatingChartScreen from "../screens/SeatingChartScreen";
import PhotoGalleryScreen from "../screens/PhotoGalleryScreen";
import CreateWeddingScreen from "../screens/CreateWeddingScreen";
import AddGuestScreen from "../screens/AddGuestScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import AddVendorScreen from "../screens/AddVendorScreen";
import GuestUploadScreen from "../screens/GuestUploadScreen";

export type RootStackParamList = {
  ProDashboard: undefined;
  ClientDashboard: undefined;
  WeddingDetail: { weddingId: string };
  GuestList: { weddingId: string };
  Tasks: { weddingId: string };
  Timeline: { weddingId: string };
  Vendors: { weddingId: string };
  SeatingChart: { weddingId: string };
  PhotoGallery: { weddingId: string };
  CreateWedding: undefined;
  AddGuest: { weddingId: string };
  AddTask: { weddingId: string };
  AddVendor: { weddingId: string };
  GuestUpload: { qrCode: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="ProDashboard" component={ProDashboardScreen} />
      <Stack.Screen name="ClientDashboard" component={ClientDashboardScreen} />
      <Stack.Screen name="WeddingDetail" component={WeddingDetailScreen} />
      <Stack.Screen name="GuestList" component={GuestListScreen} />
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen name="Timeline" component={TimelineScreen} />
      <Stack.Screen name="Vendors" component={VendorsScreen} />
      <Stack.Screen name="SeatingChart" component={SeatingChartScreen} />
      <Stack.Screen name="PhotoGallery" component={PhotoGalleryScreen} />

      {/* Modals */}
      <Stack.Screen
        name="CreateWedding"
        component={CreateWeddingScreen}
        options={{ presentation: "formSheet", sheetAllowedDetents: [0.9] }}
      />
      <Stack.Screen
        name="AddGuest"
        component={AddGuestScreen}
        options={{ presentation: "formSheet", sheetAllowedDetents: [0.85] }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{ presentation: "formSheet", sheetAllowedDetents: [0.75] }}
      />
      <Stack.Screen
        name="AddVendor"
        component={AddVendorScreen}
        options={{ presentation: "formSheet", sheetAllowedDetents: [0.85] }}
      />

      {/* Guest Upload Portal */}
      <Stack.Screen name="GuestUpload" component={GuestUploadScreen} />
    </Stack.Navigator>
  );
}
