import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Wedding } from "../types/wedding";

// Import screens
import ProDashboardScreen from "../screens/ProDashboardScreen";
import ClientDashboardScreen from "../screens/ClientDashboardScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
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
import QRCodeScreen from "../screens/QRCodeScreen";
import InvoicesScreen from "../screens/InvoicesScreen";
import StaffManagementScreen from "../screens/StaffManagementScreen";
import TimeTrackingScreen from "../screens/TimeTrackingScreen";
import AdminCalendarScreen from "../screens/AdminCalendarScreen";
import EmailAutomationScreen from "../screens/EmailAutomationScreen";

export type RootStackParamList = {
  MainTabs: undefined;
  ProDashboard: undefined;
  AdminDashboard: undefined;
  ClientDashboard: undefined;
  WeddingDetail: { weddingId: string };
  GuestList: { weddingId: string };
  Tasks: { weddingId: string };
  Timeline: { weddingId: string };
  Vendors: { weddingId: string };
  SeatingChart: { weddingId: string };
  PhotoGallery: { weddingId: string };
  QRCode: { weddingId: string };
  CreateWedding: undefined;
  AddGuest: { weddingId: string };
  AddTask: { weddingId: string };
  AddVendor: { weddingId: string };
  AddTimelineEvent: { weddingId: string };
  GuestUpload: { qrCode: string };
  Invoices: undefined;
  StaffManagement: undefined;
  TimeTracking: undefined;
  AdminCalendar: undefined;
  EmailAutomation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopColor: "#1F1F1F",
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarActiveTintColor: "#C9A961",
        tabBarInactiveTintColor: "#666666",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Weddings"
        component={ProDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Admin"
        component={AdminDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="briefcase" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
      initialRouteName="MainTabs"
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="ProDashboard" component={ProDashboardScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="ClientDashboard" component={ClientDashboardScreen} />
      <Stack.Screen name="WeddingDetail" component={WeddingDetailScreen} />
      <Stack.Screen name="GuestList" component={GuestListScreen} />
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen name="Timeline" component={TimelineScreen} />
      <Stack.Screen name="Vendors" component={VendorsScreen} />
      <Stack.Screen name="SeatingChart" component={SeatingChartScreen} />
      <Stack.Screen name="PhotoGallery" component={PhotoGalleryScreen} />
      <Stack.Screen name="QRCode" component={QRCodeScreen} />

      {/* Admin Screens */}
      <Stack.Screen name="Invoices" component={InvoicesScreen} />
      <Stack.Screen name="StaffManagement" component={StaffManagementScreen} />
      <Stack.Screen name="TimeTracking" component={TimeTrackingScreen} />
      <Stack.Screen name="AdminCalendar" component={AdminCalendarScreen} />
      <Stack.Screen name="EmailAutomation" component={EmailAutomationScreen} />

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
