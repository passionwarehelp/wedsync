import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../state/authStore";

// Import screens
import AuthScreen from "../screens/AuthScreen";
import ProDashboardScreen from "../screens/ProDashboardScreen";
import ClientDashboardScreen from "../screens/ClientDashboardScreen";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import WeddingDetailScreen from "../screens/WeddingDetailScreen";
import GuestListScreen from "../screens/GuestListScreen";
import TasksScreen from "../screens/TasksScreen";
import SeatingChartScreen from "../screens/SeatingChartScreen";
import PhotoGalleryScreen from "../screens/PhotoGalleryScreen";
import CreateWeddingScreen from "../screens/CreateWeddingScreen";
import AddGuestScreen from "../screens/AddGuestScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import GuestUploadScreen from "../screens/GuestUploadScreen";
import QRCodeScreen from "../screens/QRCodeScreen";
import InvoicesScreen from "../screens/InvoicesScreen";
import StaffManagementScreen from "../screens/StaffManagementScreen";
import TimeTrackingScreen from "../screens/TimeTrackingScreen";
import AdminCalendarScreen from "../screens/AdminCalendarScreen";
import EmailAutomationScreen from "../screens/EmailAutomationScreen";
import InvoiceDetailScreen from "../screens/InvoiceDetailScreen";
import PhotographerUploadScreen from "../screens/PhotographerUploadScreen";
import CoupleCalendarScreen from "../screens/CoupleCalendarScreen";
import CoupleNotesScreen from "../screens/CoupleNotesScreen";
import QRCodeDesignScreen from "../screens/QRCodeDesignScreen";

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  ProDashboard: undefined;
  AdminDashboard: undefined;
  ClientDashboard: undefined;
  WeddingDetail: { weddingId: string };
  GuestList: { weddingId: string };
  Tasks: { weddingId: string };
  SeatingChart: { weddingId: string };
  PhotoGallery: { weddingId: string };
  QRCode: { weddingId: string };
  QRCodeDesign: { weddingId: string };
  PhotographerUpload: { weddingId: string };
  CreateWedding: undefined;
  AddGuest: { weddingId: string };
  AddTask: { weddingId: string };
  GuestUpload: { qrCode: string };
  Invoices: undefined;
  InvoiceDetail: { invoiceId: string };
  StaffManagement: undefined;
  TimeTracking: undefined;
  AdminCalendar: undefined;
  EmailAutomation: undefined;
  CoupleCalendar: { weddingId: string };
  CoupleNotes: { weddingId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function PhotographerTabs() {
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

function CoupleTabs() {
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
        name="My Wedding"
        component={ClientDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function MainTabs() {
  const userRole = useAuthStore((s) => s.user?.role);

  if (userRole === "couple") {
    return <CoupleTabs />;
  }

  return <PhotographerTabs />;
}

export default function RootNavigator() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#000000" },
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ animationTypeForReplace: "pop" }}
        />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="ProDashboard" component={ProDashboardScreen} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
          <Stack.Screen name="ClientDashboard" component={ClientDashboardScreen} />
          <Stack.Screen name="WeddingDetail" component={WeddingDetailScreen} />
          <Stack.Screen name="GuestList" component={GuestListScreen} />
          <Stack.Screen name="Tasks" component={TasksScreen} />
          <Stack.Screen name="SeatingChart" component={SeatingChartScreen} />
          <Stack.Screen name="PhotoGallery" component={PhotoGalleryScreen} />
          <Stack.Screen name="QRCode" component={QRCodeScreen} />
          <Stack.Screen name="PhotographerUpload" component={PhotographerUploadScreen} />

          {/* Admin Screens */}
          <Stack.Screen name="Invoices" component={InvoicesScreen} />
          <Stack.Screen name="InvoiceDetail" component={InvoiceDetailScreen} />
          <Stack.Screen name="StaffManagement" component={StaffManagementScreen} />
          <Stack.Screen name="TimeTracking" component={TimeTrackingScreen} />
          <Stack.Screen name="AdminCalendar" component={AdminCalendarScreen} />
          <Stack.Screen name="EmailAutomation" component={EmailAutomationScreen} />

          {/* Couple Screens */}
          <Stack.Screen name="CoupleCalendar" component={CoupleCalendarScreen} />
          <Stack.Screen name="CoupleNotes" component={CoupleNotesScreen} />
          <Stack.Screen name="QRCodeDesign" component={QRCodeDesignScreen} />

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

          {/* Guest Upload Portal */}
          <Stack.Screen name="GuestUpload" component={GuestUploadScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
