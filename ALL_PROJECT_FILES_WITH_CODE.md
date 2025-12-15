# WedSync - Complete Project Source Code

## ✅ COMMIT STRATEGY: ALL FILES TO MAIN BRANCH

This document contains every file with its complete source code.

---

## ROOT CONFIGURATION FILES

### 📄 `package.json`

```
{
  "name": "template-app-53",
  "version": "1.0.0",
  "main": "index.ts",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@expo/react-native-action-sheet": "^4.1.1",
    "@expo/vector-icons": "^14.1.0",
    "@gorhom/bottom-sheet": "^5",
    "@nandorojo/galeria": "2.0.0-rc.4",
    "@react-native-async-storage/async-storage": "2.1.2",
    "@react-native-clipboard/clipboard": "^1.16.2",
    "@react-native-community/datetimepicker": "8.3.0",
    "@react-native-community/netinfo": "11.4.1",
    "@react-native-community/slider": "4.5.6",
    "@react-native-masked-view/masked-view": "0.3.2",
    "@react-native-menu/menu": "1.2.2",
    "@react-native-picker/picker": "2.11.0",
    "@react-native-segmented-control/segmented-control": "2.5.7",
    "@react-navigation/bottom-tabs": "^7.3.10",
    "@react-navigation/drawer": "^7.3.2",
    "@react-navigation/elements": "^2.3.8",
    "@react-navigation/material-top-tabs": "^7.2.3",
    "@react-navigation/native": "^7.1.6",
    "@react-navigation/native-stack": "^7.3.2",
    "@react-navigation/stack": "^7.1.1",
    "@shopify/flash-list": "1.7.6",
    "@shopify/react-native-skia": "v2.0.3",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "expo": "53.0.9",
    "expo-application": "~6.1.4",
    "expo-asset": "11.1.5",
    "expo-auth-session": "^6.0.3",
    "expo-av": "~15.1.4",
    "expo-background-fetch": "~13.1.5",
    "expo-battery": "~9.1.4",
    "expo-blur": "~14.1.4",
    "expo-brightness": "~13.1.4",
    "expo-build-properties": "~0.14.6",
    "expo-calendar": "~14.1.4",
    "expo-camera": "~16.1.6",
    "expo-cellular": "~7.1.4",
    "expo-checkbox": "~4.1.4",
    "expo-clipboard": "~7.1.4",
    "expo-constants": "~17.1.5",
    "expo-contacts": "~14.2.3",
    "expo-crypto": "^14.0.2",
    "expo-dev-client": "~5.1.7",
    "expo-device": "~7.1.4",
    "expo-document-picker": "~13.1.5",
    "expo-file-system": "~18.1.8",
    "expo-font": "~13.3.0",
    "expo-haptics": "~14.1.4",
    "expo-image": "~2.1.6",
    "expo-image-manipulator": "~13.1.5",
    "expo-image-picker": "~16.1.4",
    "expo-insights": "~0.9.3",
    "expo-keep-awake": "~14.1.4",
    "expo-linear-gradient": "~14.1.4",
    "expo-linking": "~7.1.4",
    "expo-live-photo": "~0.1.4",
    "expo-location": "~18.1.4",
    "expo-mail-composer": "~14.1.4",
    "expo-manifests": "~0.16.4",
    "expo-media-library": "~17.1.6",
    "expo-network": "~7.1.5",
    "expo-network-addons": "~0.7.2",
    "expo-notifications": "~0.31.1",
    "expo-secure-store": "^14.0.1",
    "expo-sensors": "~14.1.4",
    "expo-sharing": "~13.1.5",
    "expo-sms": "~13.1.4",
    "expo-speech": "~13.1.6",
    "expo-splash-screen": "~0.30.8",
    "expo-sqlite": "~15.2.9",
    "expo-status-bar": "~2.2.3",
    "expo-symbols": "~0.4.4",
    "expo-system-ui": "~5.0.7",
    "expo-video": "~2.1.8",
    "expo-web-browser": "~14.1.6",
    "lottie-react-native": "7.2.2",
    "nativewind": "^4.1.23",
    "openai": "^4.89.0",
    "patch-package": "^8.0.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-native": "0.79.2",
    "react-native-gesture-handler": "~2.24.0",
    "react-native-get-random-values": "~1.11.0",
    "react-native-ios-context-menu": "3.1.0",
    "react-native-ios-utilities": "5.1.2",
    "react-native-keyboard-controller": "^1.17.0",
    "react-native-maps": "^1.24.3",
    "react-native-markdown-display": "^7.0.2",
    "react-native-mmkv": "^3.2.0",
    "react-native-pager-view": "6.7.1",
    "react-native-purchases": "^9.6.7",
    "react-native-purchases-ui": "^9.6.7",
    "react-native-qrcode-svg": "^6.3.20",
    "react-native-reanimated": "3.17.4",
    "react-native-safe-area-context": "5.4.0",
    "react-native-screens": "~4.10.0",
    "react-native-svg": "^15.15.0",
    "react-native-view-shot": "~4.0.3",
    "react-native-vision-camera": "^4.6.4",
    "react-native-web": "~0.20.0",
    "react-native-webview": "13.13.5",
    "tailwind-merge": "^3.2.0",
    "tailwindcss": "^3.4.17",
    "uuid": "^11.1.0",
    "victory-native": "^41.16.2",
    "zeego": "^3.0.6",
    "zustand": "^5.0.4"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/react": "~19.0.10",
    "@typescript-eslint/eslint-plugin": "^8.29.1",
    "@typescript-eslint/parser": "^8.29.1",
    "babel-plugin-module-resolver": "^5.0.2",
    "eslint": "^9.25.0",
    "eslint-config-expo": "~9.2.0",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^5.2.0",
    "typescript": "~5.8.3"
  },
  "private": true,
  "patchedDependencies": {
    "react-native@0.79.2": "patches/react-native@0.79.2.patch",
    "expo-asset@11.1.5": "patches/expo-asset@11.1.5.patch"
  }
}
```

---

### 📄 `.gitignore`

```
# Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
expo-env.d.ts

# Native
.kotlin/
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# typescript
*.tsbuildinfo

# iOS & Android
ios/
android/

# Expo log
expo.log

```

---

### 📄 `.prettierrc`

```
{
  "printWidth": 120,
  "tabWidth": 2,
  "singleQuote": false
}

```

---

### 📄 `App.tsx`

```
import { useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import RootNavigator from "./src/navigation/RootNavigator";
import Splash from "./src/components/Splash";

// Keep splash screen visible
SplashScreen.preventAutoHideAsync();

/*
IMPORTANT NOTICE: DO NOT REMOVE
There are already environment keys in the project.
Before telling the user to add them, check if you already have access to the required keys through bash.
Directly access them with process.env.${key}

Correct usage:
process.env.EXPO_PUBLIC_VIBECODE_{key}
//directly access the key

Incorrect usage:
import { OPENAI_API_KEY } from '@env';
//don't use @env, its depreicated

Incorrect usage:
import Constants from 'expo-constants';
const openai_api_key = Constants.expoConfig.extra.apikey;
//don't use expo-constants, its depreicated

*/

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <Splash onReady={() => setAppIsReady(true)} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <NavigationContainer
          linking={{
            prefixes: ["wedsync://"],
            config: {
              screens: {
                GuestUpload: "upload/:qrCode",
              },
            },
          }}
        >
          <RootNavigator />
          <StatusBar style="light" />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

```

---

### 📄 `index.ts`

```
//DO NOT REMOVE THIS CODE
console.log("[index] Project ID is: ", process.env.EXPO_PUBLIC_VIBECODE_PROJECT_ID);
import "./global.css";
import "react-native-get-random-values";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Expo AV has been deprecated", "Disconnected from Metro"]);

import { registerRootComponent } from "expo";

import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

```

---

### 📄 `app.json`

```
{
  "expo": {
    "name": "WedSync",
    "slug": "wedsync",
    "scheme": "wedsync",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "dark",
    "newArchEnabled": true,
    "backgroundColor": "#000000",
    "icon": "./assets/image-1764392032.png",
    "splash": {
      "image": "./assets/image-1764392032.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "ios": {
      "supportsTablet": true,
      "backgroundColor": "#000000"
    },
    "android": {
      "edgeToEdgeEnabled": true,
      "backgroundColor": "#000000"
    }
  }
}

```

---

### 📄 `babel.config.js`

```
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
  };
};

```

---

### 📄 `metro.config.js`

```
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const path = require("node:path");
const os = require("node:os");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Disable Watchman for file watching.
config.resolver.useWatchman = false;

// Get environment variables for Metro cache configuration.
const metroCacheVersion = process.env.METRO_CACHE_VERSION || "1";
const metroCacheHttpEndpoint = process.env.METRO_CACHE_HTTP_ENDPOINT;
const metroCacheDir = process.env.METRO_CACHE_DIR || path.join(os.homedir(), ".metro-cache");

// Configure Metro's cache stores.
config.cacheStores = ({ FileStore, HttpStore }) => {
  const stores = [new FileStore({ root: metroCacheDir })];

  if (metroCacheHttpEndpoint) {
    // Create HttpStore with timeout and wrap to make failures non-fatal
    const httpStore = new HttpStore({
      endpoint: metroCacheHttpEndpoint,
      timeout: 10000 // 10 seconds (better to fail quickly and not cache than to hang)
    });

    // Wrap HttpStore methods to catch and log errors without failing
    const wrappedHttpStore = {
      get: async (...args) => {
        try {
          return await httpStore.get(...args);
        } catch (error) {
          console.warn('[Metro Cache] HttpStore get failed:', error.message);
          return null;
        }
      },
      set: async (...args) => {
        try {
          return await httpStore.set(...args);
        } catch (error) {
          console.warn('[Metro Cache] HttpStore set failed:', error.message);
        }
      },
      clear: async (...args) => {
        try {
          return await httpStore.clear(...args);
        } catch (error) {
          console.warn('[Metro Cache] HttpStore clear failed:', error.message);
        }
      }
    };

    stores.push(wrappedHttpStore);
  }
  return stores;
};

// Set the cache version for Metro, which can be incremented
// to invalidate existing caches.
config.cacheVersion = metroCacheVersion;

// Integrate NativeWind with the Metro configuration.
module.exports = withNativeWind(config, { input: "./global.css" });

```

---

### 📄 `tsconfig.json`

```
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "nativewind-env.d.ts"
  ],
  "exclude": [
    "node_modules",
    "backend",
    ".expo"
  ]
}

```

---

### 📄 `tailwind.config.js`

```
/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  corePlugins: {
    space: false,
  },
  theme: {
    // NOTE to AI: You can extend the theme with custom colors or styles here.
    extend: {
      // For example, you can add a primary or secondary color here.
      // colors: {
      //   primary: "#INSERT_VALID_HEX_CODE",
      //   secondary: "#INSERT_VALID_HEX_CODE",
      // },
      fontSize: {
        xs: "10px",
        sm: "12px",
        base: "14px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
        "5xl": "48px",
        "6xl": "56px",
        "7xl": "64px",
        "8xl": "72px",
        "9xl": "80px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

```

---

### 📄 `eslint.config.js`

```
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  {
    ignores: ["backend/**/*"],
  },
  expoConfig,
  {
    ignores: [
      "dist/*",
      "index.ts",
      "rootStore.example.ts",
      "nativewind-env.d.ts",
      "patches/*",
      "bun.lock",
      "eslint.config.js",
    ],
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
    plugins: {
      "react-hooks": require("eslint-plugin-react-hooks"),
    },
    rules: {
      // Formatting nits the sorter doesn't fix
      "comma-spacing": ["warn", { before: false, after: true }],
      // React recommended rules (only those not already covered by expo config)
      "react/jsx-no-undef": "error",
      "react/jsx-uses-react": "off", // React 17+ JSX transform
      "react/react-in-jsx-scope": "off",

      // Enforce React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
]);

```

---

### 📄 `global.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 📄 `nativewind-env.d.ts`

```
/// <reference types="nativewind/types" />
```

---

### 📄 `generate-asset-script.ts`

```
/*
IMPORTANT NOTICE: DO NOT REMOVE
This is a script that generates an image and saves it to the assets folder. 
You should not use this script unless the user EXPLICITLY asks you to generate an asset.
DO NOT PROACTIVELY GENERATE ASSETS FOR THE USER.

You will need to update the prompt and the options (2nd parameter of the generateImage function) depending on your use case.
options: {
  size?: "1024x1024" | "1536x1024" | "1024x1536" | "auto";
  quality?: "low" | "medium" | "high" | "auto";
  format?: "png" | "jpeg" | "webp";
  background?: undefined | "transparent";
}

If you need to generate many assets, REFACTOR THIS SCRIPT TO CONCURRENTLY GENERATE UP TO 3 ASSETS AT A TIME. If you do not, the bash tool may time out.
use npx tsx generate-asset-script.ts to run this script.
*/

import { generateImage } from "./src/api/image-generation";
import * as fs from "fs";
import * as path from "path";
import { Readable } from "stream";
import { finished } from "stream/promises";

async function downloadImage(url: string, outputPath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
  }

  const fileStream = fs.createWriteStream(outputPath);
  // @ts-ignore - Node.js types are not fully compatible with the fetch API
  await finished(Readable.fromWeb(response.body).pipe(fileStream));
  console.log(`Image downloaded successfully to ${outputPath}`);
}

async function logImageGeneration(prompt: string, imageUrl: string): Promise<void> {
  const logDir = path.join(__dirname, "logs");
  const logFile = path.join(logDir, "imageGenerationsLog");

  // Create logs directory if it doesn't exist
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logEntry = `[${new Date().toISOString()}] Prompt: "${prompt}"\nImage URL: ${imageUrl}\n\n`;
  fs.appendFileSync(logFile, logEntry);
}

async function main() {
  try {
    //update this to
    const prompt = "describe the asset you want to generate";

    console.log("Generating image with prompt:", prompt);
    const imageUrl = await generateImage(prompt, {
      size: "1024x1024",
      quality: "high",
      format: "png",
    });

    console.log("Image generated successfully. URL:", imageUrl);

    // Log the image generation
    await logImageGeneration(prompt, imageUrl);

    const outputPath = path.join(__dirname, "assets", "japanese-art-logo.png");
    await downloadImage(imageUrl, outputPath);

    console.log("Process completed successfully");
    console.log("Image URL:", imageUrl);
    console.log("Image saved to:", outputPath);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();

```

---

## SOURCE CODE FILES

### 📄 `./src/navigation/RootNavigator.tsx`

```
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
import GuestRSVPScreen from "../screens/GuestRSVPScreen";
import GuestDetailScreen from "../screens/GuestDetailScreen";
import RSVPLinkScreen from "../screens/RSVPLinkScreen";
import InvoicesScreen from "../screens/InvoicesScreen";
import StaffManagementScreen from "../screens/StaffManagementScreen";
import TimeTrackingScreen from "../screens/TimeTrackingScreen";
import AdminCalendarScreen from "../screens/AdminCalendarScreen";
import EmailAutomationScreen from "../screens/EmailAutomationScreen";
import InvoiceDetailScreen from "../screens/InvoiceDetailScreen";
import CreateInvoiceScreen from "../screens/CreateInvoiceScreen";
import ClientsScreen from "../screens/ClientsScreen";
import BusinessSettingsScreen from "../screens/BusinessSettingsScreen";
import PhotographerUploadScreen from "../screens/PhotographerUploadScreen";
import CoupleCalendarScreen from "../screens/CoupleCalendarScreen";
import CoupleNotesScreen from "../screens/CoupleNotesScreen";
import QRCodeDesignScreen from "../screens/QRCodeDesignScreen";
import InviteCoupleScreen from "../screens/InviteCoupleScreen";

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  ProDashboard: undefined;
  AdminDashboard: undefined;
  ClientDashboard: undefined;
  WeddingDetail: { weddingId: string };
  GuestList: { weddingId: string };
  GuestDetail: { guestId: string };
  Tasks: { weddingId: string };
  SeatingChart: { weddingId: string };
  PhotoGallery: { weddingId: string };
  QRCode: { weddingId: string };
  QRCodeDesign: { weddingId: string };
  PhotographerUpload: { weddingId: string };
  InviteCouple: { weddingId: string };
  CreateWedding: undefined;
  AddGuest: { weddingId: string };
  AddTask: { weddingId: string };
  GuestUpload: { qrCode: string };
  GuestRSVP: { rsvpCode: string };
  RSVPLink: { weddingId: string };
  Invoices: undefined;
  InvoiceDetail: { invoiceId: string };
  CreateInvoice: undefined;
  Clients: undefined;
  BusinessSettings: undefined;
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
        tabBarActiveTintColor: "#F5B800",
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
        tabBarActiveTintColor: "#F5B800",
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
          <Stack.Screen name="InviteCouple" component={InviteCoupleScreen} />

          {/* Admin Screens */}
          <Stack.Screen name="Invoices" component={InvoicesScreen} />
          <Stack.Screen name="InvoiceDetail" component={InvoiceDetailScreen} />
          <Stack.Screen
            name="CreateInvoice"
            component={CreateInvoiceScreen}
            options={{ presentation: "formSheet", sheetAllowedDetents: [0.95] }}
          />
          <Stack.Screen name="Clients" component={ClientsScreen} />
          <Stack.Screen
            name="BusinessSettings"
            component={BusinessSettingsScreen}
            options={{ presentation: "formSheet", sheetAllowedDetents: [0.95] }}
          />
          <Stack.Screen name="StaffManagement" component={StaffManagementScreen} />
          <Stack.Screen name="TimeTracking" component={TimeTrackingScreen} />
          <Stack.Screen name="AdminCalendar" component={AdminCalendarScreen} />
          <Stack.Screen name="EmailAutomation" component={EmailAutomationScreen} />

          {/* Couple Screens */}
          <Stack.Screen name="CoupleCalendar" component={CoupleCalendarScreen} />
          <Stack.Screen name="CoupleNotes" component={CoupleNotesScreen} />
          <Stack.Screen name="QRCodeDesign" component={QRCodeDesignScreen} />
          <Stack.Screen name="RSVPLink" component={RSVPLinkScreen} />

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
          <Stack.Screen name="GuestRSVP" component={GuestRSVPScreen} />
          <Stack.Screen name="GuestDetail" component={GuestDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

```

---

### 📄 `./src/state/rootStore.example.ts`

```
// This is an example of a Zustand store, use this for async storage.
// DO NOTE USE THIS FILE, create new ones in the state folder.

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RootStore {
  someData: number;
  addSomeData: () => void;
}

// Make sure to persist the store using the persist middleware.
const useRootStore = create<RootStore>()(
  persist(
    (set, get) => ({
      someData: 0,
      addSomeData: () => set({ someData: get().someData + 1 }),
    }),
    {
      name: "root-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useRootStore;

```

---

### 📄 `./src/state/authStore.ts`

```
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserRole = "photographer" | "couple";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  coupleWeddingId?: string; // For couples - the wedding they're linked to
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;

  // Actions
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,

      signUp: async (email, password, name, role) => {
        // In a real app, this would call an API
        // For now, we simulate account creation
        const newUser: User = {
          id: Date.now().toString(),
          email: email.toLowerCase().trim(),
          name: name.trim(),
          role,
          createdAt: new Date().toISOString(),
        };

        set({
          isAuthenticated: true,
          user: newUser,
        });
      },

      signIn: async (email, password) => {
        // In a real app, this would validate against an API
        // For now, we simulate a successful login
        const existingUser = get().user;

        if (existingUser && existingUser.email === email.toLowerCase().trim()) {
          set({ isAuthenticated: true });
        } else {
          // Create a temporary user for demo purposes
          const tempUser: User = {
            id: Date.now().toString(),
            email: email.toLowerCase().trim(),
            name: email.split("@")[0],
            role: "photographer",
            createdAt: new Date().toISOString(),
          };
          set({
            isAuthenticated: true,
            user: tempUser,
          });
        }
      },

      signOut: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;

```

---

### 📄 `./src/state/photoStore.ts`

```
import { create } from "zustand";
import { Photo } from "../types/wedding";

interface PhotoStore {
  photos: Photo[];
  addPhoto: (photo: Photo) => void;
  updatePhoto: (id: string, updates: Partial<Photo>) => void;
  deletePhoto: (id: string) => void;
  getPhotosForWedding: (weddingId: string) => Photo[];
  toggleFavorite: (id: string) => void;
  toggleApproved: (id: string) => void;
}

// Not persisted to avoid storage bloat with images
const usePhotoStore = create<PhotoStore>((set, get) => ({
  photos: [],
  addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
  updatePhoto: (id, updates) =>
    set((state) => ({
      photos: state.photos.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  deletePhoto: (id) => set((state) => ({ photos: state.photos.filter((p) => p.id !== id) })),
  getPhotosForWedding: (weddingId) => get().photos.filter((p) => p.weddingId === weddingId),
  toggleFavorite: (id) =>
    set((state) => ({
      photos: state.photos.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)),
    })),
  toggleApproved: (id) =>
    set((state) => ({
      photos: state.photos.map((p) => (p.id === id ? { ...p, isApproved: !p.isApproved } : p)),
    })),
}));

export default usePhotoStore;

```

---

### 📄 `./src/state/businessStore.ts`

```
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Client,
  Invoice,
  Service,
  BusinessSettings,
  InvoiceStatus,
} from "../types/business";

interface BusinessStore {
  clients: Client[];
  invoices: Invoice[];
  services: Service[];
  settings: BusinessSettings;

  // Client actions
  addClient: (client: Omit<Client, "id" | "createdAt" | "updatedAt">) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClient: (id: string) => Client | undefined;

  // Invoice actions
  addInvoice: (invoice: Omit<Invoice, "id" | "createdAt" | "updatedAt" | "invoiceNumber">) => void;
  updateInvoice: (id: string, invoice: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  markInvoicePaid: (id: string) => void;
  getClientInvoices: (clientId: string) => Invoice[];
  getOverdueInvoices: () => Invoice[];

  // Service actions
  addService: (service: Omit<Service, "id" | "createdAt">) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Analytics
  getTotalOwed: () => number;
  getTotalPaid: () => number;
  generateInvoiceNumber: () => string;

  // Settings
  updateSettings: (settings: Partial<BusinessSettings>) => void;
}

const useBusinessStore = create<BusinessStore>()(
  persist(
    (set, get) => ({
      clients: [],
      invoices: [],
      services: [],
      settings: {
        businessName: "My Business",
        invoicePrefix: "INV",
        taxRate: 0,
      },

      // Client actions
      addClient: (client) => {
        const now = new Date().toISOString();
        const newClient: Client = {
          ...client,
          id: Date.now().toString(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ clients: [...state.clients, newClient] }));
      },

      updateClient: (id, updates) => {
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
          ),
        }));
      },

      deleteClient: (id) => {
        set((state) => ({ clients: state.clients.filter((c) => c.id !== id) }));
      },

      getClient: (id) => {
        return get().clients.find((c) => c.id === id);
      },

      // Invoice actions
      addInvoice: (invoice) => {
        const now = new Date().toISOString();
        const invoiceNumber = get().generateInvoiceNumber();
        const newInvoice: Invoice = {
          ...invoice,
          id: Date.now().toString(),
          invoiceNumber,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ invoices: [...state.invoices, newInvoice] }));
      },

      updateInvoice: (id, updates) => {
        set((state) => ({
          invoices: state.invoices.map((i) =>
            i.id === id ? { ...i, ...updates, updatedAt: new Date().toISOString() } : i
          ),
        }));
      },

      deleteInvoice: (id) => {
        set((state) => ({ invoices: state.invoices.filter((i) => i.id !== id) }));
      },

      markInvoicePaid: (id) => {
        const now = new Date().toISOString();
        set((state) => ({
          invoices: state.invoices.map((i) =>
            i.id === id
              ? { ...i, status: "paid" as InvoiceStatus, paidDate: now, updatedAt: now }
              : i
          ),
        }));
      },

      getClientInvoices: (clientId) => {
        return get().invoices.filter((i) => i.clientId === clientId);
      },

      getOverdueInvoices: () => {
        const now = new Date();
        return get().invoices.filter((i) => {
          return (
            i.status !== "paid" &&
            i.status !== "cancelled" &&
            i.dueDate &&
            new Date(i.dueDate) < now
          );
        });
      },

      // Service actions
      addService: (service) => {
        const now = new Date().toISOString();
        const newService: Service = {
          ...service,
          id: Date.now().toString(),
          createdAt: now,
        };
        set((state) => ({ services: [...state.services, newService] }));
      },

      updateService: (id, updates) => {
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        }));
      },

      deleteService: (id) => {
        set((state) => ({ services: state.services.filter((s) => s.id !== id) }));
      },

      // Analytics
      getTotalOwed: () => {
        return get()
          .invoices.filter((i) => i.status !== "paid" && i.status !== "cancelled")
          .reduce((sum, i) => sum + i.total, 0);
      },

      getTotalPaid: () => {
        return get()
          .invoices.filter((i) => i.status === "paid")
          .reduce((sum, i) => sum + i.total, 0);
      },

      generateInvoiceNumber: () => {
        const prefix = get().settings.invoicePrefix || "INV";
        const count = get().invoices.length + 1;
        return `${prefix}-${count.toString().padStart(4, "0")}`;
      },

      // Settings
      updateSettings: (settings) => {
        set((state) => ({
          settings: { ...state.settings, ...settings },
        }));
      },
    }),
    {
      name: "business-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useBusinessStore;

```

---

### 📄 `./src/state/weddingStore.ts`

```
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Wedding, Guest, Task, TimelineEvent, Vendor, Photo, SeatingTable } from "../types/wedding";

interface WeddingStore {
  // Current user role
  userRole: "pro" | "client";
  setUserRole: (role: "pro" | "client") => void;

  // Current wedding (for client view or pro editing)
  currentWeddingId: string | null;
  setCurrentWedding: (weddingId: string | null) => void;

  // Weddings
  weddings: Wedding[];
  addWedding: (wedding: Wedding) => void;
  updateWedding: (id: string, updates: Partial<Wedding>) => void;
  deleteWedding: (id: string) => void;
  getWedding: (id: string) => Wedding | undefined;

  // Guests
  guests: Guest[];
  addGuest: (guest: Guest) => void;
  updateGuest: (id: string, updates: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  getGuestsForWedding: (weddingId: string) => Guest[];

  // Tasks
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksForWedding: (weddingId: string) => Task[];

  // Timeline
  timelineEvents: TimelineEvent[];
  addTimelineEvent: (event: TimelineEvent) => void;
  updateTimelineEvent: (id: string, updates: Partial<TimelineEvent>) => void;
  deleteTimelineEvent: (id: string) => void;
  getTimelineForWedding: (weddingId: string) => TimelineEvent[];

  // Vendors
  vendors: Vendor[];
  addVendor: (vendor: Vendor) => void;
  updateVendor: (id: string, updates: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;
  getVendorsForWedding: (weddingId: string) => Vendor[];

  // Seating
  seatingTables: SeatingTable[];
  addSeatingTable: (table: SeatingTable) => void;
  updateSeatingTable: (id: string, updates: Partial<SeatingTable>) => void;
  deleteSeatingTable: (id: string) => void;
  getSeatingForWedding: (weddingId: string) => SeatingTable[];

  // Photos
  photos: Photo[];
  addPhoto: (photo: Photo) => void;
  deletePhoto: (id: string) => void;
  getPhotosForWedding: (weddingId: string) => Photo[];
}

const useWeddingStore = create<WeddingStore>()(
  persist(
    (set, get) => ({
      // User role
      userRole: "pro",
      setUserRole: (role) => set({ userRole: role }),

      // Current wedding
      currentWeddingId: null,
      setCurrentWedding: (weddingId) => set({ currentWeddingId: weddingId }),

      // Weddings
      weddings: [],
      addWedding: (wedding) => set((state) => ({ weddings: [...state.weddings, wedding] })),
      updateWedding: (id, updates) =>
        set((state) => ({
          weddings: state.weddings.map((w) => (w.id === id ? { ...w, ...updates } : w)),
        })),
      deleteWedding: (id) => set((state) => ({ weddings: state.weddings.filter((w) => w.id !== id) })),
      getWedding: (id) => get().weddings.find((w) => w.id === id),

      // Guests
      guests: [],
      addGuest: (guest) => set((state) => ({ guests: [...state.guests, guest] })),
      updateGuest: (id, updates) =>
        set((state) => ({
          guests: state.guests.map((g) => (g.id === id ? { ...g, ...updates } : g)),
        })),
      deleteGuest: (id) => set((state) => ({ guests: state.guests.filter((g) => g.id !== id) })),
      getGuestsForWedding: (weddingId) => get().guests.filter((g) => g.weddingId === weddingId),

      // Tasks
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
      getTasksForWedding: (weddingId) => get().tasks.filter((t) => t.weddingId === weddingId),

      // Timeline
      timelineEvents: [],
      addTimelineEvent: (event) => set((state) => ({ timelineEvents: [...state.timelineEvents, event] })),
      updateTimelineEvent: (id, updates) =>
        set((state) => ({
          timelineEvents: state.timelineEvents.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),
      deleteTimelineEvent: (id) => set((state) => ({ timelineEvents: state.timelineEvents.filter((e) => e.id !== id) })),
      getTimelineForWedding: (weddingId) => get().timelineEvents.filter((e) => e.weddingId === weddingId),

      // Vendors
      vendors: [],
      addVendor: (vendor) => set((state) => ({ vendors: [...state.vendors, vendor] })),
      updateVendor: (id, updates) =>
        set((state) => ({
          vendors: state.vendors.map((v) => (v.id === id ? { ...v, ...updates } : v)),
        })),
      deleteVendor: (id) => set((state) => ({ vendors: state.vendors.filter((v) => v.id !== id) })),
      getVendorsForWedding: (weddingId) => get().vendors.filter((v) => v.weddingId === weddingId),

      // Seating
      seatingTables: [],
      addSeatingTable: (table) => set((state) => ({ seatingTables: [...state.seatingTables, table] })),
      updateSeatingTable: (id, updates) =>
        set((state) => ({
          seatingTables: state.seatingTables.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteSeatingTable: (id) => set((state) => ({ seatingTables: state.seatingTables.filter((t) => t.id !== id) })),
      getSeatingForWedding: (weddingId) => get().seatingTables.filter((t) => t.weddingId === weddingId),

      // Photos
      photos: [],
      addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
      deletePhoto: (id) => set((state) => ({ photos: state.photos.filter((p) => p.id !== id) })),
      getPhotosForWedding: (weddingId) => get().photos.filter((p) => p.weddingId === weddingId),
    }),
    {
      name: "wedding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useWeddingStore;

```

---

### 📄 `./src/state/adminStore.ts`

```
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Invoice, StaffMember, StaffAssignment, ClockEntry, EmailTemplate, ScheduledEmail } from "../types/wedding";

interface AdminStore {
  // Invoices
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;

  // Staff Members
  staffMembers: StaffMember[];
  addStaffMember: (staff: StaffMember) => void;
  updateStaffMember: (id: string, updates: Partial<StaffMember>) => void;
  deleteStaffMember: (id: string) => void;

  // Staff Assignments
  staffAssignments: StaffAssignment[];
  assignStaffToWedding: (assignment: StaffAssignment) => void;
  unassignStaffFromWedding: (assignmentId: string) => void;

  // Clock Entries
  clockEntries: ClockEntry[];
  clockIn: (entry: Omit<ClockEntry, "id">) => void;
  clockOut: (entryId: string, clockOutData: { clockOutTime: string; clockOutLocation?: any; totalHours: number }) => void;
  addClockEntry: (entry: ClockEntry) => void;
  updateClockEntry: (id: string, updates: Partial<ClockEntry>) => void;
  deleteClockEntry: (id: string) => void;

  // Email Templates
  emailTemplates: EmailTemplate[];
  addEmailTemplate: (template: EmailTemplate) => void;
  updateEmailTemplate: (id: string, updates: Partial<EmailTemplate>) => void;
  deleteEmailTemplate: (id: string) => void;

  // Scheduled Emails
  scheduledEmails: ScheduledEmail[];
  scheduleEmail: (email: ScheduledEmail) => void;
  updateScheduledEmail: (id: string, updates: Partial<ScheduledEmail>) => void;
}

const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      // Invoices
      invoices: [],
      addInvoice: (invoice) => set((state) => ({ invoices: [...state.invoices, invoice] })),
      updateInvoice: (id, updates) =>
        set((state) => ({
          invoices: state.invoices.map((i) => (i.id === id ? { ...i, ...updates } : i)),
        })),
      deleteInvoice: (id) => set((state) => ({ invoices: state.invoices.filter((i) => i.id !== id) })),

      // Staff Members
      staffMembers: [],
      addStaffMember: (staff) => set((state) => ({ staffMembers: [...state.staffMembers, staff] })),
      updateStaffMember: (id, updates) =>
        set((state) => ({
          staffMembers: state.staffMembers.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        })),
      deleteStaffMember: (id) => set((state) => ({ staffMembers: state.staffMembers.filter((s) => s.id !== id) })),

      // Staff Assignments
      staffAssignments: [],
      assignStaffToWedding: (assignment) =>
        set((state) => ({ staffAssignments: [...state.staffAssignments, assignment] })),
      unassignStaffFromWedding: (assignmentId) =>
        set((state) => ({ staffAssignments: state.staffAssignments.filter((a) => a.id !== assignmentId) })),

      // Clock Entries
      clockEntries: [],
      clockIn: (entry) => {
        const newEntry: ClockEntry = {
          ...entry,
          id: Date.now().toString(),
        };
        set((state) => ({ clockEntries: [...state.clockEntries, newEntry] }));
      },
      clockOut: (entryId, clockOutData) =>
        set((state) => ({
          clockEntries: state.clockEntries.map((e) => (e.id === entryId ? { ...e, ...clockOutData } : e)),
        })),
      addClockEntry: (entry) => set((state) => ({ clockEntries: [...state.clockEntries, entry] })),
      updateClockEntry: (id, updates) =>
        set((state) => ({
          clockEntries: state.clockEntries.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),
      deleteClockEntry: (id) => set((state) => ({ clockEntries: state.clockEntries.filter((e) => e.id !== id) })),

      // Email Templates
      emailTemplates: [],
      addEmailTemplate: (template) => set((state) => ({ emailTemplates: [...state.emailTemplates, template] })),
      updateEmailTemplate: (id, updates) =>
        set((state) => ({
          emailTemplates: state.emailTemplates.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteEmailTemplate: (id) => set((state) => ({ emailTemplates: state.emailTemplates.filter((t) => t.id !== id) })),

      // Scheduled Emails
      scheduledEmails: [],
      scheduleEmail: (email) => set((state) => ({ scheduledEmails: [...state.scheduledEmails, email] })),
      updateScheduledEmail: (id, updates) =>
        set((state) => ({
          scheduledEmails: state.scheduledEmails.map((e) => (e.id === id ? { ...e, ...updates } : e)),
        })),
    }),
    {
      name: "admin-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAdminStore;

```

---

### 📄 `./src/utils/invoice-pdf.ts`

```
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Invoice, Client, BusinessSettings } from "../types/business";

export async function generateInvoiceHTML(
  invoice: Invoice,
  client: Client,
  settings: BusinessSettings
): Promise<string> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 40px;
          color: #1a1a1a;
          line-height: 1.6;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 30px;
          border-bottom: 3px solid #F5B800;
          margin-bottom: 40px;
        }
        .invoice-title {
          font-size: 36px;
          font-weight: bold;
          color: #F5B800;
          margin-bottom: 8px;
        }
        .invoice-number {
          font-size: 14px;
          color: #666;
        }
        .business-info {
          text-align: right;
        }
        .business-name {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 8px;
          color: #1a1a1a;
        }
        .business-details {
          font-size: 13px;
          color: #666;
          line-height: 1.8;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 12px;
          font-weight: bold;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }
        .client-info {
          font-size: 14px;
          color: #1a1a1a;
          line-height: 1.8;
        }
        .client-name {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 4px;
        }
        .invoice-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .meta-item {
          flex: 1;
        }
        .meta-label {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
        }
        .meta-value {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }
        .status-paid {
          background: #d1fae5;
          color: #065f46;
        }
        .status-sent {
          background: #dbeafe;
          color: #1e40af;
        }
        .status-overdue {
          background: #fee2e2;
          color: #991b1b;
        }
        .status-draft {
          background: #f3f4f6;
          color: #374151;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 30px 0;
        }
        thead {
          background: #f8f9fa;
        }
        th {
          padding: 14px 16px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        th:last-child,
        td:last-child {
          text-align: right;
        }
        td {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }
        tr:last-child td {
          border-bottom: none;
        }
        .item-name {
          font-weight: 500;
          color: #1a1a1a;
        }
        .item-quantity,
        .item-price {
          color: #666;
        }
        .totals {
          margin-top: 30px;
          display: flex;
          justify-content: flex-end;
        }
        .totals-table {
          width: 300px;
        }
        .totals-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          font-size: 14px;
        }
        .totals-row.subtotal {
          color: #666;
        }
        .totals-row.tax {
          color: #666;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 12px;
        }
        .totals-row.total {
          font-size: 20px;
          font-weight: bold;
          color: #1a1a1a;
          padding-top: 12px;
        }
        .notes {
          margin-top: 40px;
          padding: 20px;
          background: #f8f9fa;
          border-left: 4px solid #F5B800;
          border-radius: 4px;
        }
        .notes-title {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .notes-content {
          font-size: 14px;
          color: #1a1a1a;
          line-height: 1.8;
        }
        .payment-methods {
          margin-top: 40px;
          padding: 24px;
          background: #fffbeb;
          border: 2px solid #F5B800;
          border-radius: 8px;
        }
        .payment-title {
          font-size: 16px;
          font-weight: bold;
          color: #1a1a1a;
          margin-bottom: 16px;
        }
        .payment-method {
          font-size: 14px;
          color: #1a1a1a;
          margin-bottom: 8px;
          line-height: 1.8;
        }
        .payment-label {
          font-weight: 600;
          color: #666;
          display: inline-block;
          width: 100px;
        }
        .footer {
          margin-top: 60px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1 class="invoice-title">INVOICE</h1>
          <p class="invoice-number">#${invoice.invoiceNumber}</p>
        </div>
        <div class="business-info">
          <div class="business-name">${settings.businessName}</div>
          <div class="business-details">
            ${settings.email ? `<div>${settings.email}</div>` : ""}
            ${settings.phone ? `<div>${settings.phone}</div>` : ""}
            ${settings.address?.street ? `<div>${settings.address.street}</div>` : ""}
            ${
              settings.address?.city || settings.address?.state || settings.address?.zipCode
                ? `<div>${[settings.address?.city, settings.address?.state, settings.address?.zipCode]
                    .filter(Boolean)
                    .join(", ")}</div>`
                : ""
            }
          </div>
        </div>
      </div>

      <div class="invoice-meta">
        <div class="meta-item">
          <div class="meta-label">Issue Date</div>
          <div class="meta-value">${new Date(invoice.createdAt).toLocaleDateString()}</div>
        </div>
        ${
          invoice.dueDate
            ? `
        <div class="meta-item">
          <div class="meta-label">Due Date</div>
          <div class="meta-value">${new Date(invoice.dueDate).toLocaleDateString()}</div>
        </div>
        `
            : ""
        }
        <div class="meta-item">
          <div class="meta-label">Status</div>
          <div class="meta-value">
            <span class="status-badge status-${invoice.status}">${invoice.status.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Bill To</div>
        <div class="client-info">
          <div class="client-name">${client.name}</div>
          ${client.businessName ? `<div>${client.businessName}</div>` : ""}
          ${client.email ? `<div>${client.email}</div>` : ""}
          ${client.phone ? `<div>${client.phone}</div>` : ""}
          ${client.address?.street ? `<div>${client.address.street}</div>` : ""}
          ${
            client.address?.city || client.address?.state || client.address?.zipCode
              ? `<div>${[client.address?.city, client.address?.state, client.address?.zipCode]
                  .filter(Boolean)
                  .join(", ")}</div>`
              : ""
          }
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${invoice.items
            .map(
              (item) => `
            <tr>
              <td class="item-name">${item.serviceName}</td>
              <td class="item-quantity">${item.quantity}</td>
              <td class="item-price">$${item.price.toFixed(2)}</td>
              <td class="item-total">$${item.total.toFixed(2)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <div class="totals">
        <div class="totals-table">
          <div class="totals-row subtotal">
            <span>Subtotal</span>
            <span>$${invoice.subtotal.toFixed(2)}</span>
          </div>
          ${
            invoice.tax && invoice.tax > 0
              ? `
          <div class="totals-row tax">
            <span>Tax</span>
            <span>$${invoice.tax.toFixed(2)}</span>
          </div>
          `
              : ""
          }
          <div class="totals-row total">
            <span>Total Due</span>
            <span>$${invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      ${
        invoice.notes
          ? `
      <div class="notes">
        <div class="notes-title">Notes</div>
        <div class="notes-content">${invoice.notes}</div>
      </div>
      `
          : ""
      }

      ${
        settings.paymentMethods &&
        Object.values(settings.paymentMethods).some((v) => v)
          ? `
      <div class="payment-methods">
        <div class="payment-title">Payment Methods</div>
        ${
          settings.paymentMethods.venmo
            ? `<div class="payment-method"><span class="payment-label">Venmo:</span> ${settings.paymentMethods.venmo}</div>`
            : ""
        }
        ${
          settings.paymentMethods.cashapp
            ? `<div class="payment-method"><span class="payment-label">Cash App:</span> ${settings.paymentMethods.cashapp}</div>`
            : ""
        }
        ${
          settings.paymentMethods.zelle
            ? `<div class="payment-method"><span class="payment-label">Zelle:</span> ${settings.paymentMethods.zelle}</div>`
            : ""
        }
        ${
          settings.paymentMethods.paypal
            ? `<div class="payment-method"><span class="payment-label">PayPal:</span> ${settings.paymentMethods.paypal}</div>`
            : ""
        }
        ${
          settings.paymentMethods.other
            ? `<div class="payment-method">${settings.paymentMethods.other}</div>`
            : ""
        }
      </div>
      `
          : ""
      }

      <div class="footer">
        Thank you for your business!
      </div>
    </body>
    </html>
  `;

  return html;
}

export async function shareInvoice(
  invoice: Invoice,
  client: Client,
  settings: BusinessSettings
): Promise<void> {
  const html = await generateInvoiceHTML(invoice, client, settings);

  // Save HTML to a file
  const filename = `invoice-${invoice.invoiceNumber}.html`;
  const fileUri = `${FileSystem.documentDirectory}${filename}`;

  await FileSystem.writeAsStringAsync(fileUri, html, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  // Share the file
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri, {
      mimeType: "text/html",
      dialogTitle: `Invoice ${invoice.invoiceNumber}`,
      UTI: "public.html",
    });
  } else {
    throw new Error("Sharing is not available on this device");
  }
}

```

---

### 📄 `./src/utils/cn.ts`

```
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

---

### 📄 `./src/utils/invoice-email.ts`

```
import * as MailComposer from "expo-mail-composer";
import { Invoice, Client, BusinessSettings } from "../types/business";
import { generateInvoiceHTML } from "./invoice-pdf";
import * as FileSystem from "expo-file-system";

export async function sendInvoiceEmail(
  invoice: Invoice,
  client: Client,
  settings: BusinessSettings
): Promise<void> {
  if (!client.email) {
    throw new Error("Client does not have an email address");
  }

  const isAvailable = await MailComposer.isAvailableAsync();
  if (!isAvailable) {
    throw new Error("Email is not available on this device");
  }

  const html = await generateInvoiceHTML(invoice, client, settings);

  // Save HTML to a file to attach
  const filename = `invoice-${invoice.invoiceNumber}.html`;
  const fileUri = `${FileSystem.documentDirectory}${filename}`;

  await FileSystem.writeAsStringAsync(fileUri, html, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  const subject = `Invoice ${invoice.invoiceNumber} from ${settings.businessName}`;
  const body = `Hi ${client.name},

Please find your invoice attached.

Invoice #: ${invoice.invoiceNumber}
Total Due: $${invoice.total.toFixed(2)}
${invoice.dueDate ? `Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}` : "Due: Upon receipt"}

${invoice.notes ? `\nNotes:\n${invoice.notes}\n` : ""}
Thank you for your business!

${settings.businessName}
${settings.email ? settings.email : ""}
${settings.phone ? settings.phone : ""}`;

  await MailComposer.composeAsync({
    recipients: [client.email],
    subject,
    body,
    isHtml: false,
    attachments: [fileUri],
  });
}

```

---

### 📄 `./src/components/Splash.tsx`

```
import React, { useEffect } from "react";
import { View, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while we load
SplashScreen.preventAutoHideAsync();

interface SplashProps {
  onReady: () => void;
}

export default function Splash({ onReady }: SplashProps) {
  useEffect(() => {
    async function prepare() {
      try {
        // Simulate loading time
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        onReady();
      }
    }

    prepare();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#000000", alignItems: "center", justifyContent: "center" }}>
      <Image source={require("../../assets/image-1764392032.png")} style={{ width: 200, height: 200 }} />
    </View>
  );
}

```

---

### 📄 `./src/api/image-generation.ts`

```
/*
IMPORTANT NOTICE: DO NOT REMOVE
This is a custom asset generation service that uses a custom API endpoint maintained by Vibecode. If the user wants to build an app that generates images, assets, icons, or anything else, you must use this internal endpoint. Do not attempt to use replicate or chatgpt.
You may update this service, but you should not need to.
This endpoint uses openai's latest image generation API, AKA gpt4o, AKA gpt-image-1, so if the user is asking for that, this is the right service to use.
Does not support video and audio generation.
*/

// API endpoint configuration
const baseUrl = "https://api.vibecodeapp.com";
const endpoint = "/api/storage/generate-image";

/**
 * Generate an image using the custom API endpoint
 * @param prompt The text prompt to generate an image from
 * @param options Optional parameters for image generation
 * @returns URL of the generated image, usable to render in the app directly.
 */
export async function generateImage(
  prompt: string,
  options?: {
    size?: "1024x1024" | "1536x1024" | "1024x1536" | "auto";
    quality?: "low" | "medium" | "high" | "auto";
    format?: "png" | "jpeg" | "webp";
    background?: undefined | "transparent";
  },
): Promise<string> {
  try {
    // Create request body
    const requestBody = {
      projectId: process.env.EXPO_PUBLIC_VIBECODE_PROJECT_ID,
      prompt,
      options: {
        ...options,
      },
    };

    // Make API request
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[AssetGenerationService] Error response:", errorData);
      throw new Error(`Image generation API error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    console.log("[AssetGenerationService] Image generated successfully");

    // Return the image data from the response
    if (result.success && result.data) {
      return result.data.imageUrl as string;
    } else {
      console.error("[AssetGenerationService] Invalid response format:", result);
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
}

/**
 * Convert aspect ratio to size format
 * @param aspectRatio The aspect ratio to convert
 * @returns The corresponding size format
 */
export function convertAspectRatioToSize(aspectRatio: string): "1024x1024" | "1536x1024" | "1024x1536" | "auto" {
  switch (aspectRatio) {
    case "1:1":
      return "1024x1024";
    case "3:2":
      return "1536x1024";
    case "2:3":
      return "1024x1536";
    default:
      return "auto";
  }
}

```

---

### 📄 `./src/api/rsvp-sync.ts`

```
/**
 * RSVP Sync API
 * Fetches RSVPs from Cloudflare Worker and syncs to local store
 */

const RSVP_API_URL = "https://rsvp.mywedsync.com";

export interface CloudflareRSVP {
  attending: boolean;
  name: string;
  email: string;
  phone: string;
  plusOne: boolean;
  plusOneName: string;
  mealType: "standard" | "vegetarian" | "vegan" | "glutenFree" | "other";
  dietaryRestrictions: string;
  message: string;
  rsvpCode: string;
  submittedAt: string;
}

export async function fetchRSVPsFromCloud(rsvpCode: string): Promise<CloudflareRSVP[]> {
  try {
    const response = await fetch(`${RSVP_API_URL}/api/rsvps/${rsvpCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSVPs: ${response.status}`);
    }

    const data = await response.json();
    return data as CloudflareRSVP[];
  } catch (error) {
    console.error("Error fetching RSVPs from cloud:", error);
    throw error;
  }
}

```

---

### 📄 `./src/api/chat-service.ts`

```
/*
IMPORTANT NOTICE: DO NOT REMOVE
./src/api/chat-service.ts
If the user wants to use AI to generate text, answer questions, or analyze images you can use the functions defined in this file to communicate with the OpenAI and Grok APIs.
*/
import { AIMessage, AIRequestOptions, AIResponse } from "../types/ai";
import { getOpenAIClient } from "./openai";
import { getGrokClient } from "./grok";

/**
 * Get a text response from OpenAI
 * @param messages - The messages to send to the AI
 * @param options - The options for the request
 * @returns The response from the AI
 */
export const getOpenAITextResponse = async (messages: AIMessage[], options?: AIRequestOptions): Promise<AIResponse> => {
  try {
    const client = getOpenAIClient();
    const defaultModel = "gpt-4o"; //accepts images as well, use this for image analysis

    const response = await client.chat.completions.create({
      model: options?.model || defaultModel,
      messages: messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens || 2048,
    });

    return {
      content: response.choices[0]?.message?.content || "",
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      },
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
};

/**
 * Get a simple chat response from OpenAI
 * @param prompt - The prompt to send to the AI
 * @returns The response from the AI
 */
export const getOpenAIChatResponse = async (prompt: string): Promise<AIResponse> => {
  return await getOpenAITextResponse([{ role: "user", content: prompt }]);
};

/**
 * Get a text response from Grok
 * @param messages - The messages to send to the AI
 * @param options - The options for the request
 * @returns The response from the AI
 */
export const getGrokTextResponse = async (messages: AIMessage[], options?: AIRequestOptions): Promise<AIResponse> => {
  try {
    const client = getGrokClient();
    const defaultModel = "grok-3-beta";

    const response = await client.chat.completions.create({
      model: options?.model || defaultModel,
      messages: messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens || 2048,
    });

    return {
      content: response.choices[0]?.message?.content || "",
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      },
    };
  } catch (error) {
    console.error("Grok API Error:", error);
    throw error;
  }
};

/**
 * Get a simple chat response from Grok
 * @param prompt - The prompt to send to the AI
 * @returns The response from the AI
 */
export const getGrokChatResponse = async (prompt: string): Promise<AIResponse> => {
  return await getGrokTextResponse([{ role: "user", content: prompt }]);
};

```

---

### 📄 `./src/api/grok.ts`

```
/*
IMPORTANT NOTICE: DO NOT REMOVE
This is a custom client for the Grok API. You may update this service, but you should not need to.
The Grok API can be communicated with the "openai" package, so you can use the same functions as the openai package. It may not support all the same features, so please be careful.


grok-3-latest
grok-3-fast-latest
grok-3-mini-latest
*/
import OpenAI from "openai";

export const getGrokClient = () => {
  const apiKey = process.env.EXPO_PUBLIC_VIBECODE_GROK_API_KEY;
  if (!apiKey) {
    console.warn("Grok API key not found in environment variables");
  }
  return new OpenAI({
    apiKey: apiKey,
    baseURL: "https://api.x.ai/v1",
  });
};

```

---

### 📄 `./src/api/transcribe-audio.ts`

```
/*
IMPORTANT NOTICE: DO NOT REMOVE
This is a custom audio transcription service that uses a custom API endpoint maintained by Vibecode.
You can use this function to transcribe audio files, and it will return the text of the audio file.
*/

/**
 * Transcribe an audio file
 * @param localAudioUri - The local URI of the audio file to transcribe. Obtained via the expo-av library.
 * @returns The text of the audio file
 */
export const transcribeAudio = async (localAudioUri: string) => {
  try {
    // Create FormData for the audio file
    const formData = new FormData();
    formData.append("file", {
      uri: localAudioUri,
      type: "audio/m4a",
      name: "recording.m4a",
    } as any);
    formData.append("model", "gpt-4o-transcribe");
    formData.append("language", "en");

    const OPENAI_API_KEY = process.env.EXPO_PUBLIC_VIBECODE_OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    // API call to OpenAI's gpt-4o-transcribe
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Transcription failed: ${errorText}`);
    }

    const result = await response.json();
    return result.text;
  } catch (error) {
    console.error("Transcription error:", error);
    throw error;
  }
};

```

---

### 📄 `./src/api/openai.ts`

```
/*
IMPORTANT NOTICE: DO NOT REMOVE
This is a custom client for the OpenAI API. You may update this service, but you should not need to.

valid model names:
gpt-4.1-2025-04-14
o4-mini-2025-04-16
gpt-4o-2024-11-20
*/
import OpenAI from "openai";

export const getOpenAIClient = () => {
  const apiKey = process.env.EXPO_PUBLIC_VIBECODE_OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("OpenAI API key not found in environment variables");
  }
  return new OpenAI({
    apiKey: apiKey,
  });
};

```

---

### 📄 `./src/api/r2-upload.ts`

```
/**
 * Cloudflare R2 Upload Utility
 *
 * This module handles photo and video uploads to Cloudflare R2 storage.
 * Uses direct fetch with base64 data for reliable uploads.
 */

import * as FileSystem from "expo-file-system";

// Get environment variables - clean up any whitespace and extract valid URL
const getEnvVar = (key: string): string => {
  const value = process.env[`EXPO_PUBLIC_${key}`] || process.env[key] || "";
  // Clean up the value - trim whitespace and try to extract a valid URL if corrupted
  let cleaned = value.trim();

  // If the value contains "https://", extract from there
  const httpsIndex = cleaned.indexOf("https://");
  if (httpsIndex > 0) {
    cleaned = cleaned.substring(httpsIndex);
  }

  // Remove any trailing numbers that shouldn't be there (like "...cloudflarestorage.com2")
  cleaned = cleaned.replace(/\.com\d+/, ".com");

  return cleaned;
};

const R2_ACCESS_KEY_ID = getEnvVar("R2_ACCESS_KEY_ID");
const R2_SECRET_ACCESS_KEY = getEnvVar("R2_SECRET_ACCESS_KEY");
const R2_ENDPOINT = getEnvVar("R2_ENDPOINT");
const R2_BUCKET_NAME = getEnvVar("R2_BUCKET_NAME");
const R2_PUBLIC_URL = getEnvVar("R2_PUBLIC_URL");

// Log the cleaned values on first load (remove in production)
console.log("📦 R2 Config:", {
  endpoint: R2_ENDPOINT ? R2_ENDPOINT.substring(0, 50) + "..." : "NOT SET",
  bucket: R2_BUCKET_NAME || "NOT SET",
  publicUrl: R2_PUBLIC_URL ? R2_PUBLIC_URL.substring(0, 50) + "..." : "NOT SET",
});

export type MediaType = "photo" | "video";

interface UploadOptions {
  weddingId: string;
  fileUri: string;
  fileName?: string;
  contentType?: string;
  mediaType?: MediaType;
}

interface UploadResult {
  success: boolean;
  publicUrl?: string;
  key?: string;
  mediaType?: MediaType;
  error?: string;
}

/**
 * Get content type from file extension
 */
function getContentType(fileUri: string, mediaType?: MediaType): string {
  const extension = fileUri.split(".").pop()?.toLowerCase() || "";

  const mimeTypes: Record<string, string> = {
    // Images
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    heic: "image/heic",
    heif: "image/heif",
    // Videos
    mp4: "video/mp4",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    mkv: "video/x-matroska",
    webm: "video/webm",
  };

  return mimeTypes[extension] || (mediaType === "video" ? "video/mp4" : "image/jpeg");
}

/**
 * Get file extension from content type
 */
function getExtension(contentType: string): string {
  const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/heic": "heic",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/x-msvideo": "avi",
    "video/webm": "webm",
  };

  return extensions[contentType] || "jpg";
}

/**
 * Determine if file is a video based on URI or content type
 */
export function isVideoFile(fileUri: string, contentType?: string): boolean {
  if (contentType?.startsWith("video/")) return true;

  const extension = fileUri.split(".").pop()?.toLowerCase() || "";
  const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm", "m4v"];

  return videoExtensions.includes(extension);
}

/**
 * Upload a file (photo or video) to Cloudflare R2
 *
 * @param options - Upload configuration
 * @returns Upload result with public URL
 */
export async function uploadToR2(options: UploadOptions): Promise<UploadResult> {
  try {
    const { weddingId, fileUri, fileName } = options;

    // Determine media type and content type
    const mediaType: MediaType = options.mediaType || (isVideoFile(fileUri) ? "video" : "photo");
    const contentType = options.contentType || getContentType(fileUri, mediaType);

    // Check if R2 is configured
    if (!R2_ENDPOINT || !R2_BUCKET_NAME) {
      console.warn("R2 credentials not configured. Storing locally instead.");

      // Fall back to local storage
      return await storeLocally(weddingId, fileUri, mediaType, contentType, fileName);
    }

    // Generate unique file name
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const extension = getExtension(contentType);
    const prefix = mediaType === "video" ? "video" : "photo";
    const finalFileName = fileName || `${prefix}_${timestamp}_${randomId}.${extension}`;

    // Create the S3 key (path) with wedding prefix
    const folder = mediaType === "video" ? "videos" : "photos";
    const key = `wedding_${weddingId}/${folder}/${finalFileName}`;

    // Build the upload URL
    // If using a Cloudflare Worker, the endpoint IS the worker URL and we don't need bucket name
    // If using direct R2, we need endpoint/bucket/key
    const cleanEndpoint = R2_ENDPOINT.replace(/\/+$/, ""); // Remove trailing slashes

    // Check if endpoint is a workers.dev URL (Cloudflare Worker)
    const isWorkerEndpoint = cleanEndpoint.includes("workers.dev");

    // Worker URL: https://worker.subdomain.workers.dev/key
    // Direct R2 URL: https://account.r2.cloudflarestorage.com/bucket/key
    const uploadUrl = isWorkerEndpoint
      ? `${cleanEndpoint}/${key}`
      : `${cleanEndpoint}/${R2_BUCKET_NAME}/${key}`;

    console.log(`📤 Upload URL: ${uploadUrl}`);
    console.log(`📤 Using ${isWorkerEndpoint ? "Worker" : "Direct R2"} endpoint`);

    // Use FileSystem.uploadAsync for direct file upload
    console.log(`📤 Uploading ${mediaType}: ${key}`);

    const response = await FileSystem.uploadAsync(uploadUrl, fileUri, {
      httpMethod: "PUT",
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      headers: {
        "Content-Type": contentType,
      },
    });

    // FileSystem.uploadAsync returns { status, headers, body }
    if (response.status >= 200 && response.status < 300) {
      // Construct public URL
      const cleanPublicUrl = R2_PUBLIC_URL.replace(/\/+$/, "");
      const publicUrl = `${cleanPublicUrl}/${key}`;

      console.log(`✅ Upload successful: ${publicUrl}`);

      return {
        success: true,
        publicUrl,
        key,
        mediaType,
      };
    } else {
      // R2 requires authentication - for now, fall back to local storage
      // To enable R2 uploads, you need either:
      // 1. A backend API that generates presigned upload URLs
      // 2. A Cloudflare Worker that handles authenticated uploads
      console.log(`⚠️ R2 requires authentication (status: ${response.status})`);
      console.log("📦 Storing locally instead...");
      return await storeLocally(weddingId, fileUri, mediaType, contentType, fileName);
    }
  } catch (error) {
    console.error("R2 upload error:", error);

    // Try local storage as fallback
    try {
      return await storeLocally(
        options.weddingId,
        options.fileUri,
        options.mediaType || "photo",
        options.contentType || "image/jpeg",
        options.fileName
      );
    } catch (localError) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown upload error",
      };
    }
  }
}

/**
 * Store file locally as fallback
 */
async function storeLocally(
  weddingId: string,
  fileUri: string,
  mediaType: MediaType,
  contentType: string,
  fileName?: string
): Promise<UploadResult> {
  try {
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const extension = getExtension(contentType);
    const prefix = mediaType === "video" ? "video" : "photo";
    const finalFileName = fileName || `${prefix}_${timestamp}_${randomId}.${extension}`;

    const folder = mediaType === "video" ? "videos" : "photos";
    const key = `wedding_${weddingId}/${folder}/${finalFileName}`;

    // Store locally
    const localDir = `${FileSystem.cacheDirectory}wedsync/${weddingId}/${folder}/`;
    await FileSystem.makeDirectoryAsync(localDir, { intermediates: true });

    const localUri = `${localDir}${finalFileName}`;
    await FileSystem.copyAsync({ from: fileUri, to: localUri });

    console.log(`📦 Stored locally: ${localUri}`);

    return {
      success: true,
      publicUrl: localUri,
      key,
      mediaType,
    };
  } catch (error) {
    console.error("Local storage error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to store locally",
    };
  }
}

/**
 * Upload a photo to R2 (convenience wrapper)
 */
export async function uploadPhotoToR2(options: Omit<UploadOptions, "mediaType">): Promise<UploadResult> {
  return uploadToR2({ ...options, mediaType: "photo" });
}

/**
 * Upload a video to R2 (convenience wrapper)
 */
export async function uploadVideoToR2(options: Omit<UploadOptions, "mediaType">): Promise<UploadResult> {
  return uploadToR2({ ...options, mediaType: "video" });
}

/**
 * Upload multiple files in batch
 */
export async function uploadMediaBatch(
  weddingId: string,
  files: Array<{ uri: string; mediaType?: MediaType }>,
  onProgress?: (completed: number, total: number) => void
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const result = await uploadToR2({
      weddingId,
      fileUri: file.uri,
      mediaType: file.mediaType,
    });
    results.push(result);

    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }

  return results;
}

/**
 * Legacy function for backwards compatibility
 */
export async function uploadPhotosToR2Batch(
  weddingId: string,
  fileUris: string[]
): Promise<UploadResult[]> {
  return uploadMediaBatch(
    weddingId,
    fileUris.map((uri) => ({ uri }))
  );
}

/**
 * Get the public URL for a file key
 */
export function getPublicUrl(key: string): string {
  const cleanPublicUrl = R2_PUBLIC_URL.replace(/\/+$/, "");
  return cleanPublicUrl ? `${cleanPublicUrl}/${key}` : key;
}

/**
 * Delete a file from R2
 */
export async function deleteFromR2(key: string): Promise<boolean> {
  try {
    if (!R2_ENDPOINT || !R2_BUCKET_NAME) {
      return false;
    }

    const cleanEndpoint = R2_ENDPOINT.replace(/\/+$/, "");
    const deleteUrl = `${cleanEndpoint}/${R2_BUCKET_NAME}/${key}`;

    const response = await fetch(deleteUrl, {
      method: "DELETE",
    });

    return response.ok;
  } catch (error) {
    console.error("R2 delete error:", error);
    return false;
  }
}

```

---

### 📄 `./src/lib/api.ts`

```
import { fetch as expoFetch } from "expo/fetch";
import * as SecureStore from "expo-secure-store";

const PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID || "wedsync";
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000";

/**
 * Authenticated API client
 * Automatically includes auth token in requests
 */
const fetchFn = async <T,>(
  path: string,
  options: { method: string; body?: object }
): Promise<T> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Get token from secure storage and send as Cookie header
  const token = await SecureStore.getItemAsync(`${PROJECT_ID}_token`);
  if (token) {
    // Better Auth expects token in cookie format
    headers["Cookie"] = `__Secure-better-auth.session_token=${token}`;
  }

  const response = await expoFetch(`${BACKEND_URL}${path}`, {
    method: options.method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: "omit", // Don't send cookies automatically (we handle manually)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
};

/**
 * API client with authentication
 *
 * Usage:
 * ```ts
 * const data = await api.get('/api/me');
 * const result = await api.post('/api/weddings', { name: 'My Wedding' });
 * ```
 */
export const api = {
  get: <T,>(path: string) => fetchFn<T>(path, { method: "GET" }),
  post: <T,>(path: string, body?: object) =>
    fetchFn<T>(path, { method: "POST", body }),
  put: <T,>(path: string, body?: object) =>
    fetchFn<T>(path, { method: "PUT", body }),
  delete: <T,>(path: string) => fetchFn<T>(path, { method: "DELETE" }),
};

```

---

### 📄 `./src/lib/useAuth.tsx`

```
import { useState, useEffect, useCallback } from "react";
import * as sessionManager from "./sessionManager";
import type { User } from "./sessionManager";

// Global state shared across all hook instances
let globalUser: User | null = null;
let globalListeners: Set<(user: User | null) => void> = new Set();

function setGlobalUser(user: User | null) {
  globalUser = user;
  globalListeners.forEach((listener) => listener(user));
}

/**
 * Auth hook with global state
 * All instances of useAuth share the same user state
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(globalUser);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to global user changes
  useEffect(() => {
    const listener = (newUser: User | null) => setUser(newUser);
    globalListeners.add(listener);
    return () => {
      globalListeners.delete(listener);
    };
  }, []);

  // Load session on mount
  const loadSession = useCallback(async () => {
    setIsPending(true);
    try {
      const session = await sessionManager.getSession();
      const newUser = session?.user || null;
      setUser(newUser);
      setGlobalUser(newUser);
    } catch (err) {
      setError(err as Error);
    }
    setIsPending(false);
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    const user = await sessionManager.signIn(email, password);
    setUser(user);
    setGlobalUser(user);
    return user;
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, name: string) => {
      const user = await sessionManager.signUp(email, password, name);
      setUser(user);
      setGlobalUser(user);
      return user;
    },
    []
  );

  const signOut = useCallback(async () => {
    await sessionManager.signOut();
    setUser(null);
    setGlobalUser(null);
  }, []);

  return {
    user,
    isPending,
    error,
    signIn,
    signUp,
    signOut,
    refetch: loadSession,
  };
}

```

---

### 📄 `./src/lib/sessionManager.ts`

```
import * as SecureStore from "expo-secure-store";

// IMPORTANT: Replace with your deployed backend URL after deploying to Render
const BACKEND = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000";
const PROJECT = process.env.EXPO_PUBLIC_PROJECT_ID || "wedsync";

export type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Session = {
  user: User;
  session: { token: string; expiresAt: string };
};

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string): Promise<User> {
  const res = await fetch(`${BACKEND}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Sign in failed");
  if (!data.user) throw new Error("Invalid response from server");

  // CRITICAL: iOS blocks Set-Cookie header - use token from response body
  if (data.token) {
    await SecureStore.setItemAsync(`${PROJECT}_token`, data.token);
  }
  await SecureStore.setItemAsync(`${PROJECT}_user`, JSON.stringify(data.user));

  return data.user;
}

/**
 * Sign up with email, password, and name
 */
export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const res = await fetch(`${BACKEND}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Sign up failed");
  if (!data.user) throw new Error("Invalid response from server");

  // Store token and user data
  if (data.token) {
    await SecureStore.setItemAsync(`${PROJECT}_token`, data.token);
  }
  await SecureStore.setItemAsync(`${PROJECT}_user`, JSON.stringify(data.user));

  return data.user;
}

/**
 * Get current session from secure storage
 */
export async function getSession(): Promise<Session | null> {
  const token = await SecureStore.getItemAsync(`${PROJECT}_token`);
  const userStr = await SecureStore.getItemAsync(`${PROJECT}_user`);

  if (!token || !userStr) return null;

  return {
    user: JSON.parse(userStr),
    session: {
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  };
}

/**
 * Sign out - clear all stored data
 */
export async function signOut(): Promise<void> {
  await SecureStore.deleteItemAsync(`${PROJECT}_token`);
  await SecureStore.deleteItemAsync(`${PROJECT}_user`);
}

```

---

### 📄 `./src/types/ai.ts`

```
export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIRequestOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIService {
  chat(messages: AIMessage[], options?: AIRequestOptions): Promise<AIResponse>;
  complete(prompt: string, options?: AIRequestOptions): Promise<AIResponse>;
}

```

---

### 📄 `./src/types/wedding.ts`

```
export type UserRole = "pro" | "client";

export interface Wedding {
  id: string;
  // Wedding Details
  coupleName: string;
  partnerOneName: string;
  partnerTwoName: string;
  weddingDate: string;
  venue: string;

  // Branding
  primaryColor?: string;
  logoUri?: string;

  // Status
  status: "planning" | "upcoming" | "completed";
  createdAt: string;

  // Creator - who created this wedding
  createdBy: string; // User ID of the creator

  // QR Code for guest uploads
  qrCode: string;
  qrCodeEnabled: boolean; // Toggle for QR code scanner album feature

  // Photographer features
  photoAlbumLive: boolean; // When true, bride/groom can see photographer's uploaded photos
  photoFrameEnabled: boolean; // Toggle for photo frame feature

  // Stats
  guestCount: number;
  rsvpCount: number;
  tasksCompleted: number;
  totalTasks: number;
}

export interface Guest {
  id: string;
  weddingId: string;

  // Personal Info
  name: string;
  email?: string;
  phone?: string;

  // RSVP
  rsvpStatus: "pending" | "attending" | "declined";
  plusOne: boolean;
  plusOneName?: string;

  // Event Details
  mealType?: "standard" | "vegetarian" | "vegan" | "glutenFree" | "other";
  dietaryRestrictions?: string;

  // Message from guest
  message?: string;

  // Seating
  tableNumber?: number;
  seatPosition?: number;

  // Categories
  category: "family" | "friends" | "bridal-party" | "vip" | "other";

  // Metadata
  addedAt: string;
}

export interface Task {
  id: string;
  weddingId: string;

  title: string;
  description?: string;
  category: "venue" | "catering" | "photography" | "florals" | "attire" | "music" | "decor" | "other";

  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";

  dueDate?: string;
  completedAt?: string;

  assignedTo?: "pro" | "client";

  notes?: string;
  attachments?: string[];
}

export interface TimelineEvent {
  id: string;
  weddingId: string;

  title: string;
  description?: string;

  startTime: string;
  endTime?: string;
  duration?: number; // in minutes

  type: "ceremony" | "cocktails" | "reception" | "photos" | "first-look" | "speeches" | "cake" | "other";

  location?: string;
  notes?: string;
}

export interface Vendor {
  id: string;
  weddingId: string;

  name: string;
  type: "photographer" | "videographer" | "caterer" | "florist" | "dj" | "band" | "venue" | "planner" | "other";

  contactName?: string;
  email?: string;
  phone?: string;

  // Contract & Payment
  contractAmount?: number;
  paidAmount?: number;
  dueDate?: string;
  contractUri?: string;

  status: "pending" | "booked" | "paid" | "completed";

  notes?: string;
}

export interface Photo {
  id: string;
  weddingId: string;

  uri: string;
  mediaType?: "photo" | "video";
  thumbnailUri?: string;
  uploadedBy: "guest" | "pro" | "client";
  uploadedByName?: string;

  uploadedAt: string;

  isFavorite: boolean;
  isApproved: boolean;

  tags?: string[];
}

export interface SeatingTable {
  id: string;
  weddingId: string;

  tableNumber: number;
  tableName?: string;
  capacity: number;

  // Position on layout (for drag-and-drop)
  x?: number;
  y?: number;

  shape: "round" | "rectangle" | "square";

  guestIds: string[];
}

export interface WeddingInvite {
  id: string;
  weddingId: string;

  recipientEmail: string;
  recipientName: string;
  role: "client" | "vendor";

  status: "sent" | "opened" | "accepted";
  sentAt: string;

  inviteCode: string;
}

export interface Invoice {
  id: string;
  weddingId?: string;

  clientName: string;
  clientEmail?: string;
  clientPhone?: string;

  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;

  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;

  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  paidDate?: string;

  notes?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface StaffMember {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: "planner" | "coordinator" | "photographer" | "videographer" | "assistant" | "other";
  hourlyRate?: number;
  photoUri?: string;
}

export interface StaffAssignment {
  id: string;
  weddingId: string;
  staffId: string;
  role: string;
  assignedAt: string;
}

export interface ClockEntry {
  id: string;
  staffId: string;
  weddingId?: string;

  clockInTime: string;
  clockInLocation?: {
    latitude: number;
    longitude: number;
    address?: string;
  };

  clockOutTime?: string;
  clockOutLocation?: {
    latitude: number;
    longitude: number;
    address?: string;
  };

  totalHours?: number;
  notes?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  trigger: "2_weeks_before" | "1_week_before" | "3_days_before" | "photos_uploaded" | "after_wedding" | "manual";
  subject: string;
  body: string;
  isActive: boolean;
}

export interface ScheduledEmail {
  id: string;
  weddingId: string;
  templateId: string;
  scheduledFor: string;
  status: "pending" | "sent" | "failed";
  sentAt?: string;
  recipients: string[];
}

```

---

### 📄 `./src/types/business.ts`

```
// Client/Customer
export interface Client {
  id: string;
  name: string;
  businessName?: string;
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Invoice Line Item
export interface InvoiceItem {
  serviceId?: string;
  serviceName: string;
  quantity: number;
  price: number;
  total: number;
}

// Invoice Status
export type InvoiceStatus = "draft" | "sent" | "viewed" | "paid" | "overdue" | "cancelled";

// Payment Method Type
export type PaymentMethodType = "venmo" | "cashapp" | "paypal" | "zelle" | "stripe" | "square" | "other";

// Invoice
export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g., "INV-0001"
  clientId: string;
  clientName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax?: number;
  total: number;
  status: InvoiceStatus;
  dueDate?: string; // ISO date string
  sentDate?: string;
  paidDate?: string;
  notes?: string;
  acceptedPaymentMethods?: PaymentMethodType[]; // Payment methods accepted for this invoice
  createdAt: string;
  updatedAt: string;
}

// Service Package (for quick invoice creation)
export interface Service {
  id: string;
  name: string;
  description?: string;
  defaultPrice: number;
  duration?: number;
  stripePaymentLink?: string;
  createdAt: string;
}

// Business Settings
export interface BusinessSettings {
  businessName: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  logoUri?: string;
  invoicePrefix?: string; // e.g., "INV"
  defaultHourlyRate?: number;
  taxRate?: number;
  paymentMethods?: {
    stripe?: string; // Stripe payment link
    square?: string; // Square payment link
    venmo?: string; // @username
    venmoLink?: string; // https://venmo.com/u/username
    cashapp?: string; // $username
    cashappLink?: string; // https://cash.app/$username
    paypal?: string; // email
    paypalLink?: string; // https://paypal.me/username
    zelle?: string; // email or phone
    other?: string; // custom instructions
  };
}

```

---

### 📄 `./src/screens/TimeTrackingScreen.tsx`

```
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useAdminStore from "../state/adminStore";
import * as Location from "expo-location";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TimeTrackingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const staffMembers = useAdminStore((s) => s.staffMembers);
  const clockEntries = useAdminStore((s) => s.clockEntries);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");
    })();
  }, []);

  const activeEntry = clockEntries.find((e) => e.staffId === selectedStaffId && !e.clockOutTime);

  const handleClockIn = async () => {
    if (!selectedStaffId) {
      Alert.alert("Error", "Please select a staff member");
      return;
    }

    if (activeEntry) {
      Alert.alert("Error", "This staff member is already clocked in");
      return;
    }

    let location = undefined;
    if (locationPermission) {
      try {
        const loc = await Location.getCurrentPositionAsync({});
        location = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
      } catch (error) {
        console.log("Location error:", error);
      }
    }

    useAdminStore.getState().clockIn({
      staffId: selectedStaffId,
      clockInTime: new Date().toISOString(),
      clockInLocation: location,
    });

    Alert.alert("Success", "Clocked in successfully!");
  };

  const handleClockOut = async () => {
    if (!activeEntry) {
      Alert.alert("Error", "No active clock in found");
      return;
    }

    let location = undefined;
    if (locationPermission) {
      try {
        const loc = await Location.getCurrentPositionAsync({});
        location = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
      } catch (error) {
        console.log("Location error:", error);
      }
    }

    const clockOutTime = new Date().toISOString();
    const totalHours =
      (new Date(clockOutTime).getTime() - new Date(activeEntry.clockInTime).getTime()) / (1000 * 60 * 60);

    useAdminStore.getState().clockOut(activeEntry.id, {
      clockOutTime,
      clockOutLocation: location,
      totalHours: Math.round(totalHours * 100) / 100,
    });

    Alert.alert("Success", `Clocked out! Total hours: ${totalHours.toFixed(2)}`);
  };

  const recentEntries = clockEntries
    .sort((a, b) => new Date(b.clockInTime).getTime() - new Date(a.clockInTime).getTime())
    .slice(0, 10);

  const getStaffName = (staffId: string) => {
    return staffMembers.find((s) => s.id === staffId)?.name || "Unknown";
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <Text style={styles.title}>Time Tracking</Text>
        <Text style={styles.subtitle}>
          {locationPermission ? "Location enabled" : "Enable location for tracking"}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Select Staff Member</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.staffScroll}>
            {staffMembers.map((staff, index) => {
              const isActive = clockEntries.some((e) => e.staffId === staff.id && !e.clockOutTime);
              const isSelected = selectedStaffId === staff.id;
              return (
                <Pressable
                  key={staff.id}
                  onPress={() => setSelectedStaffId(staff.id)}
                  style={[
                    styles.staffButton,
                    isSelected && styles.staffButtonSelected,
                    isActive && !isSelected && styles.staffButtonActive,
                    index < staffMembers.length - 1 && styles.staffButtonMargin,
                  ]}
                >
                  {isActive && <View style={styles.activeIndicator} />}
                  <Text
                    style={[
                      styles.staffButtonText,
                      isSelected && styles.staffButtonTextSelected,
                      isActive && !isSelected && styles.staffButtonTextActive,
                    ]}
                  >
                    {staff.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            onPress={handleClockIn}
            disabled={!selectedStaffId || !!activeEntry}
            style={[
              styles.actionButton,
              styles.actionButtonMargin,
              (!selectedStaffId || activeEntry) && styles.actionButtonDisabled,
              (!selectedStaffId || activeEntry) ? {} : styles.clockInButton,
            ]}
          >
            <Ionicons
              name="play-circle"
              size={32}
              color={!selectedStaffId || activeEntry ? "#666" : "#ffffff"}
            />
            <Text
              style={[
                styles.actionButtonText,
                (!selectedStaffId || activeEntry) && styles.actionButtonTextDisabled,
              ]}
            >
              Clock In
            </Text>
          </Pressable>

          <Pressable
            onPress={handleClockOut}
            disabled={!activeEntry}
            style={[
              styles.actionButton,
              !activeEntry && styles.actionButtonDisabled,
              activeEntry && styles.clockOutButton,
            ]}
          >
            <Ionicons name="stop-circle" size={32} color={!activeEntry ? "#666" : "#ffffff"} />
            <Text style={[styles.actionButtonText, !activeEntry && styles.actionButtonTextDisabled]}>
              Clock Out
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      {activeEntry && (
        <View style={styles.activeSession}>
          <View style={styles.activeSessionHeader}>
            <View style={styles.activeSessionDot} />
            <Text style={styles.activeSessionLabel}>ACTIVE SESSION</Text>
          </View>
          <Text style={styles.activeSessionName}>{getStaffName(activeEntry.staffId)}</Text>
          <Text style={styles.activeSessionTime}>
            Clocked in: {format(new Date(activeEntry.clockInTime), "h:mm a")}
          </Text>
          {activeEntry.clockInLocation && (
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color="#10b981" />
              <Text style={styles.locationText}>Location tracked</Text>
            </View>
          )}
        </View>
      )}

      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.listHeader}>RECENT ACTIVITY</Text>
        {recentEntries.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={64} color="#404040" />
            <Text style={styles.emptyStateTitle}>No time entries</Text>
            <Text style={styles.emptyStateSubtitle}>Clock in to start tracking time</Text>
          </View>
        ) : (
          recentEntries.map((entry, index) => (
              <View
                key={entry.id}
                style={[styles.entryCard, index < recentEntries.length - 1 && styles.entryCardMargin]}
              >
                <View style={styles.entryHeader}>
                  <View style={styles.entryHeaderLeft}>
                    <Text style={styles.entryName}>{getStaffName(entry.staffId)}</Text>
                    <Text style={styles.entryDate}>{format(new Date(entry.clockInTime), "MMM d, yyyy")}</Text>
                  </View>
                  {entry.totalHours && (
                    <View style={styles.hoursBadge}>
                      <Text style={styles.hoursText}>{entry.totalHours}h</Text>
                    </View>
                  )}
                </View>

                <View style={styles.entryTimes}>
                  <View style={[styles.entryTimeItem, styles.entryTimeItemMargin]}>
                    <Ionicons name="enter-outline" size={14} color="#10b981" />
                    <Text style={styles.entryTimeText}>{format(new Date(entry.clockInTime), "h:mm a")}</Text>
                  </View>
                  {entry.clockOutTime ? (
                    <View style={[styles.entryTimeItem, styles.entryTimeItemMargin]}>
                      <Ionicons name="exit-outline" size={14} color="#ef4444" />
                      <Text style={styles.entryTimeText}>{format(new Date(entry.clockOutTime), "h:mm a")}</Text>
                    </View>
                  ) : (
                    <View style={styles.entryTimeItem}>
                      <View style={styles.activeEntryDot} />
                      <Text style={styles.activeEntryText}>Active</Text>
                    </View>
                  )}
                </View>

                {(entry.clockInLocation || entry.clockOutLocation) && (
                  <View style={styles.entryLocation}>
                    <Ionicons name="location" size={12} color="#666" />
                    <Text style={styles.entryLocationText}>Location tracked</Text>
                  </View>
                )}
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 24,
  },
  title: {
    color: "#F5B800",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#a3a3a3",
    fontSize: 14,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    color: "#a3a3a3",
    fontSize: 12,
    marginBottom: 12,
  },
  staffScroll: {
    marginBottom: 24,
  },
  staffButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262626",
    borderWidth: 1,
    borderColor: "#404040",
  },
  staffButtonMargin: {
    marginRight: 8,
  },
  staffButtonSelected: {
    backgroundColor: "#F5B800",
    borderColor: "#F5B800",
  },
  staffButtonActive: {
    backgroundColor: "#064e3b",
    borderColor: "#047857",
  },
  activeIndicator: {
    width: 8,
    height: 8,
    backgroundColor: "#34d399",
    borderRadius: 4,
    marginRight: 8,
  },
  staffButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#d4d4d4",
  },
  staffButtonTextSelected: {
    color: "#000000",
  },
  staffButtonTextActive: {
    color: "#34d399",
  },
  buttonRow: {
    flexDirection: "row",
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  actionButtonMargin: {
    marginRight: 12,
  },
  actionButtonDisabled: {
    backgroundColor: "#262626",
  },
  clockInButton: {
    backgroundColor: "#059669",
  },
  clockOutButton: {
    backgroundColor: "#dc2626",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "#ffffff",
  },
  actionButtonTextDisabled: {
    color: "#737373",
  },
  activeSession: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "rgba(6, 78, 59, 0.2)",
    borderWidth: 1,
    borderColor: "#047857",
    borderRadius: 16,
    padding: 20,
  },
  activeSessionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  activeSessionDot: {
    width: 12,
    height: 12,
    backgroundColor: "#34d399",
    borderRadius: 6,
    marginRight: 8,
  },
  activeSessionLabel: {
    color: "#34d399",
    fontSize: 12,
    fontWeight: "600",
  },
  activeSessionName: {
    color: "#f5f5f5",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  activeSessionTime: {
    color: "#a3a3a3",
    fontSize: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  locationText: {
    color: "#34d399",
    fontSize: 10,
    marginLeft: 4,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  listHeader: {
    color: "#a3a3a3",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyStateTitle: {
    color: "#737373",
    fontSize: 18,
    marginTop: 16,
  },
  emptyStateSubtitle: {
    color: "#525252",
    fontSize: 12,
    marginTop: 8,
  },
  entryCard: {
    backgroundColor: "#171717",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#262626",
  },
  entryCardMargin: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  entryHeaderLeft: {
    flex: 1,
  },
  entryName: {
    color: "#f5f5f5",
    fontSize: 14,
    fontWeight: "600",
  },
  entryDate: {
    color: "#737373",
    fontSize: 10,
    marginTop: 4,
  },
  hoursBadge: {
    backgroundColor: "rgba(201, 169, 97, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  hoursText: {
    color: "#F5B800",
    fontSize: 12,
    fontWeight: "600",
  },
  entryTimes: {
    flexDirection: "row",
    alignItems: "center",
  },
  entryTimeItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  entryTimeItemMargin: {
    marginRight: 16,
  },
  entryTimeText: {
    color: "#a3a3a3",
    fontSize: 10,
    marginLeft: 4,
  },
  activeEntryDot: {
    width: 8,
    height: 8,
    backgroundColor: "#34d399",
    borderRadius: 4,
    marginRight: 4,
  },
  activeEntryText: {
    color: "#34d399",
    fontSize: 10,
  },
  entryLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  entryLocationText: {
    color: "#525252",
    fontSize: 10,
    marginLeft: 4,
  },
});

```

---

### 📄 `./src/screens/WeddingDetailScreen.tsx`

```
import React from "react";
import { View, Text, Pressable, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type WeddingDetailRouteProp = RouteProp<RootStackParamList, "WeddingDetail">;

export default function WeddingDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<WeddingDetailRouteProp>();
  const { weddingId } = route.params;

  // Use individual selector to avoid infinite loops
  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));
  const updateWedding = useWeddingStore((s) => s.updateWedding);

  const handleToggleQRCode = () => {
    if (wedding) {
      updateWedding(weddingId, { qrCodeEnabled: !wedding.qrCodeEnabled });
    }
  };

  const handleTogglePhotoAlbum = () => {
    if (wedding) {
      updateWedding(weddingId, { photoAlbumLive: !wedding.photoAlbumLive });
    }
  };

  const handleTogglePhotoFrame = () => {
    if (wedding) {
      updateWedding(weddingId, { photoFrameEnabled: !wedding.photoFrameEnabled });
    }
  };

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
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
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <Text className="text-[#F5B800] text-3xl font-bold mb-2">{wedding.coupleName}</Text>
        <Text className="text-neutral-400 text-lg mb-4">
          {wedding.partnerOneName} & {wedding.partnerTwoName}
        </Text>

        <View className="flex-row items-center">
          <Ionicons name="calendar" size={18} color="#F5B800" />
          <Text className="text-neutral-300 text-base ml-2">
            {format(new Date(wedding.weddingDate), "MMMM d, yyyy")}
          </Text>
        </View>

        {wedding.venue && (
          <View className="flex-row items-center mt-2">
            <Ionicons name="location" size={18} color="#F5B800" />
            <Text className="text-neutral-300 text-base ml-2">{wedding.venue}</Text>
          </View>
        )}
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <View className="pb-8">
          {/* QR Code Album Toggle */}
          <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3">Guest Photo Uploads</Text>

          <View className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 mb-3">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="qr-code" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">QR Code Album</Text>
                <Text className="text-neutral-500 text-sm mt-1">
                  {wedding.qrCodeEnabled !== false ? "Guests can upload photos" : "Disabled for guests"}
                </Text>
              </View>
              <Switch
                value={wedding.qrCodeEnabled !== false}
                onValueChange={handleToggleQRCode}
                trackColor={{ false: "#404040", true: "#F5B800" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* QR Code View Button - Only show when enabled */}
          {wedding.qrCodeEnabled !== false && (
            <Pressable
              onPress={() => navigation.navigate("QRCode", { weddingId })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="share-outline" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">View & Share QR Code</Text>
                <Text className="text-neutral-500 text-sm mt-1">Share with guests to collect photos</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          )}

          {/* Photo Frame Toggle */}
          <View className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 mb-6">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="tablet-landscape-outline" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Photo Frame</Text>
                <Text className="text-neutral-500 text-sm mt-1">
                  {wedding.photoFrameEnabled === true ? "Digital frame display active" : "Disabled"}
                </Text>
              </View>
              <Switch
                value={wedding.photoFrameEnabled === true}
                onValueChange={handleTogglePhotoFrame}
                trackColor={{ false: "#404040", true: "#F5B800" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* Photo Album Section */}
          <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3">Your Photo Album</Text>

          {/* Photo Album Live Toggle */}
          <View className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 mb-3">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="eye-outline" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Album Visibility</Text>
                <Text className="text-neutral-500 text-sm mt-1">
                  {wedding.photoAlbumLive !== false ? "Couple can view your photos" : "Photos hidden from couple"}
                </Text>
              </View>
              <Switch
                value={wedding.photoAlbumLive !== false}
                onValueChange={handleTogglePhotoAlbum}
                trackColor={{ false: "#404040", true: "#F5B800" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          {/* View Gallery Button */}
          <Pressable
            onPress={() => navigation.navigate("PhotoGallery", { weddingId })}
            className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 active:opacity-70"
          >
            <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
              <Ionicons name="images" size={24} color="#F5B800" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-neutral-100 text-lg font-medium">View Gallery</Text>
              <Text className="text-neutral-500 text-sm mt-1">Manage uploaded photos</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>

          {/* Invite Couple Section */}
          <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3 mt-6">Invite Couple</Text>

          <Pressable
            onPress={() => navigation.navigate("InviteCouple", { weddingId })}
            className="bg-[#F5B800] rounded-2xl p-5 flex-row items-center justify-center active:opacity-70"
          >
            <Ionicons name="person-add" size={24} color="#000000" />
            <Text className="text-black text-lg font-semibold ml-3">Add Bride/Groom</Text>
          </Pressable>
          <Text className="text-neutral-500 text-sm text-center mt-3">
            Send an invite code so the couple can access their wedding details
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

```

---

### 📄 `./src/screens/GuestListScreen.tsx`

```
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, ScrollView, TextInput, Share, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";
import { fetchRSVPsFromCloud } from "../api/rsvp-sync";
import QRCode from "react-native-qrcode-svg";
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type GuestListRouteProp = RouteProp<RootStackParamList, "GuestList">;

export default function GuestListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<GuestListRouteProp>();
  const { weddingId } = route.params;
  const hasSynced = useRef(false);

  // Use individual selectors to avoid infinite loops
  const weddings = useWeddingStore((s) => s.weddings);
  const allGuests = useWeddingStore((s) => s.guests);
  const addGuest = useWeddingStore((s) => s.addGuest);
  const updateWedding = useWeddingStore((s) => s.updateWedding);

  const wedding = weddings.find((w) => w.id === weddingId);
  const guests = allGuests.filter((g) => g.weddingId === weddingId);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "attending" | "declined" | "pending">("all");
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Auto-sync RSVPs from cloud on mount
  useEffect(() => {
    if (!wedding || hasSynced.current) return;

    const syncRSVPs = async () => {
      try {
        hasSynced.current = true;
        const cloudRSVPs = await fetchRSVPsFromCloud(wedding.qrCode);

        // Get existing guest names/emails to avoid duplicates
        const currentGuests = allGuests.filter((g) => g.weddingId === weddingId);
        const existingGuests = new Set(
          currentGuests.map((g) => `${g.name.toLowerCase()}-${g.email?.toLowerCase() || ""}`)
        );

        let newGuestsAdded = 0;
        let totalAttending = 0;

        for (const rsvp of cloudRSVPs) {
          const guestKey = `${rsvp.name.toLowerCase()}-${rsvp.email?.toLowerCase() || ""}`;

          if (existingGuests.has(guestKey)) {
            continue;
          }

          const guestId = `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

          addGuest({
            id: guestId,
            weddingId: wedding.id,
            name: rsvp.name,
            email: rsvp.email || undefined,
            phone: rsvp.phone || undefined,
            rsvpStatus: rsvp.attending ? "attending" : "declined",
            plusOne: rsvp.plusOne,
            plusOneName: rsvp.plusOneName || undefined,
            mealType: rsvp.attending ? rsvp.mealType : undefined,
            dietaryRestrictions: rsvp.dietaryRestrictions || undefined,
            message: rsvp.message || undefined,
            category: "other",
            addedAt: rsvp.submittedAt || new Date().toISOString(),
          });

          newGuestsAdded++;
          if (rsvp.attending) {
            totalAttending += rsvp.plusOne ? 2 : 1;
          }

          existingGuests.add(guestKey);
        }

        if (newGuestsAdded > 0) {
          updateWedding(wedding.id, {
            guestCount: wedding.guestCount + newGuestsAdded,
            rsvpCount: wedding.rsvpCount + totalAttending,
          });
        }
      } catch (error) {
        // Silently fail - don't interrupt the user
        console.log("Auto-sync failed:", error);
      }
    };

    syncRSVPs();
  }, [wedding?.qrCode]);

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || guest.rsvpStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: guests.length,
    attending: guests.filter((g) => g.rsvpStatus === "attending").length,
    declined: guests.filter((g) => g.rsvpStatus === "declined").length,
    pending: guests.filter((g) => g.rsvpStatus === "pending").length,
    plusOnes: guests.filter((g) => g.rsvpStatus === "attending" && g.plusOne).length,
  };

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">Wedding not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const rsvpUrl = `https://rsvp.mywedsync.com/${wedding.qrCode}?couple=${encodeURIComponent(wedding.coupleName)}`;

  const handleShare = async () => {
    try {
      const weddingDate = format(new Date(wedding.weddingDate), "MMMM d, yyyy");
      await Share.share({
        message: `You're invited to ${wedding.coupleName}'s wedding on ${weddingDate}!\n\nPlease RSVP here: ${rsvpUrl}`,
        title: "Wedding RSVP",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyLink = async () => {
    await Share.share({
      message: rsvpUrl,
      title: "RSVP Link",
    });
  };

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

        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-[#F5B800] text-2xl font-bold">Guest List</Text>
          <View className="flex-row items-center">
            <Pressable
              onPress={() => setShowInviteModal(true)}
              className="bg-neutral-800 rounded-full px-4 h-11 flex-row items-center justify-center mr-3 border border-neutral-700"
            >
              <Ionicons name="mail-outline" size={18} color="#F5B800" />
              <Text className="text-[#F5B800] font-semibold ml-2">Invite</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("AddGuest", { weddingId })}
              className="bg-[#F5B800] rounded-full w-11 h-11 items-center justify-center shadow-md"
            >
              <Ionicons name="add" size={26} color="#000000" />
            </Pressable>
          </View>
        </View>

        {/* RSVP Summary Stats */}
        <View className="flex-row justify-between mb-4 bg-neutral-900/50 rounded-xl p-3 border border-neutral-800">
          <View className="items-center flex-1">
            <Text className="text-emerald-400 text-lg font-bold">{stats.attending}</Text>
            <Text className="text-neutral-500 text-xs">Attending</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-red-400 text-lg font-bold">{stats.declined}</Text>
            <Text className="text-neutral-500 text-xs">Declined</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-amber-400 text-lg font-bold">{stats.pending}</Text>
            <Text className="text-neutral-500 text-xs">Pending</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-[#F5B800] text-lg font-bold">{stats.attending + stats.plusOnes}</Text>
            <Text className="text-neutral-500 text-xs">Total</Text>
          </View>
        </View>

        <View className="bg-neutral-900 rounded-2xl flex-row items-center px-4 py-3 mb-4 border border-neutral-800">
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search guests..."
            placeholderTextColor="#6B7280"
            className="flex-1 ml-3 text-base text-neutral-100"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            onPress={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-full mr-2 ${
              filterStatus === "all" ? "bg-[#F5B800]" : "bg-neutral-800"
            }`}
          >
            <Text className={`font-medium ${filterStatus === "all" ? "text-black" : "text-neutral-400"}`}>
              All ({stats.total})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterStatus("attending")}
            className={`px-4 py-2 rounded-full mr-2 ${
              filterStatus === "attending" ? "bg-[#F5B800]" : "bg-neutral-800"
            }`}
          >
            <Text
              className={`font-medium ${filterStatus === "attending" ? "text-black" : "text-neutral-400"}`}
            >
              Attending ({stats.attending})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterStatus("declined")}
            className={`px-4 py-2 rounded-full mr-2 ${
              filterStatus === "declined" ? "bg-[#F5B800]" : "bg-neutral-800"
            }`}
          >
            <Text
              className={`font-medium ${filterStatus === "declined" ? "text-black" : "text-neutral-400"}`}
            >
              Declined ({stats.declined})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded-full ${filterStatus === "pending" ? "bg-[#F5B800]" : "bg-neutral-800"}`}
          >
            <Text className={`font-medium ${filterStatus === "pending" ? "text-black" : "text-neutral-400"}`}>
              Pending ({stats.pending})
            </Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {filteredGuests.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="people-outline" size={64} color="#404040" />
            <Text className="text-neutral-500 text-lg mt-4">
              {searchQuery ? "No guests found" : "No guests yet"}
            </Text>
            <Text className="text-neutral-600 text-sm mt-2 text-center px-8">
              {searchQuery ? "Try a different search" : "Tap Invite to send RSVP links or + to add guests manually"}
            </Text>
          </View>
        ) : (
          <View className="pb-6">
            {filteredGuests.map((guest, index) => (
              <Pressable
                key={guest.id}
                onPress={() => navigation.navigate("GuestDetail", { guestId: guest.id })}
                className={`bg-neutral-900 rounded-2xl p-4 border border-neutral-800 active:opacity-70${index < filteredGuests.length - 1 ? " mb-3" : ""}`}
              >
                <View className="flex-row items-start justify-between">
                  <View className="flex-1">
                    <Text className="text-neutral-100 text-lg font-semibold">{guest.name}</Text>
                    {guest.email && (
                      <Text className="text-neutral-400 text-sm mt-1">{guest.email}</Text>
                    )}
                    {guest.plusOne && guest.plusOneName && (
                      <View className="flex-row items-center mt-2">
                        <Ionicons name="person-add-outline" size={14} color="#F5B800" />
                        <Text className="text-neutral-400 text-sm ml-1">+1: {guest.plusOneName}</Text>
                      </View>
                    )}
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      guest.rsvpStatus === "attending"
                        ? "bg-emerald-900"
                        : guest.rsvpStatus === "declined"
                          ? "bg-red-900"
                          : "bg-amber-900"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        guest.rsvpStatus === "attending"
                          ? "text-emerald-400"
                          : guest.rsvpStatus === "declined"
                            ? "text-red-400"
                            : "text-amber-400"
                      }`}
                    >
                      {guest.rsvpStatus === "attending"
                        ? "Attending"
                        : guest.rsvpStatus === "declined"
                          ? "Declined"
                          : "Pending"}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center mt-3">
                  {guest.tableNumber && (
                    <View className={`flex-row items-center${guest.category ? " mr-4" : ""}`}>
                      <Ionicons name="restaurant-outline" size={16} color="#9CA3AF" />
                      <Text className="text-neutral-400 text-sm ml-1">Table {guest.tableNumber}</Text>
                    </View>
                  )}
                  {guest.category && (
                    <View className="flex-row items-center">
                      <Ionicons name="pricetag-outline" size={16} color="#9CA3AF" />
                      <Text className="text-neutral-400 text-sm ml-1 capitalize">
                        {guest.category.replace("-", " ")}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Tap hint */}
                <View className="flex-row items-center justify-end mt-2">
                  <Text className="text-neutral-600 text-xs mr-1">View details</Text>
                  <Ionicons name="chevron-forward" size={14} color="#525252" />
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Invite Modal */}
      <Modal visible={showInviteModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-neutral-100 text-xl font-bold">Invite Guests</Text>
              <Pressable onPress={() => setShowInviteModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            {/* QR Code */}
            <View className="items-center mb-6">
              <View className="bg-white p-4 rounded-2xl">
                <QRCode value={rsvpUrl} size={160} backgroundColor="white" color="#000000" />
              </View>
              <Text className="text-neutral-400 text-sm mt-3 text-center">
                Guests can scan this QR code to RSVP
              </Text>
            </View>

            {/* Share Button */}
            <Pressable
              onPress={() => {
                setShowInviteModal(false);
                handleShare();
              }}
              className="bg-[#F5B800] rounded-xl py-4 flex-row items-center justify-center mb-3"
            >
              <Ionicons name="share-outline" size={22} color="#000000" />
              <Text className="text-black text-lg font-semibold ml-2">Share RSVP Link</Text>
            </Pressable>

            {/* Copy Link Button */}
            <Pressable
              onPress={() => {
                setShowInviteModal(false);
                handleCopyLink();
              }}
              className="bg-neutral-800 rounded-xl py-4 flex-row items-center justify-center border border-neutral-700"
            >
              <Ionicons name="copy-outline" size={22} color="#F5B800" />
              <Text className="text-neutral-100 text-lg font-semibold ml-2">Copy Link</Text>
            </Pressable>

            <Text className="text-neutral-600 text-xs text-center mt-4">
              Guests can RSVP without downloading the app
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

```

---

### 📄 `./src/screens/ClientDashboardScreen.tsx`

```
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import useAuthStore from "../state/authStore";
import useWeddingStore from "../state/weddingStore";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ClientDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  // Wedding store
  const weddings = useWeddingStore((s) => s.weddings);
  const addWedding = useWeddingStore((s) => s.addWedding);

  // Check if user has a wedding (either joined or created)
  const coupleWeddingId = useAuthStore((s) => s.user?.coupleWeddingId);
  const coupleWedding = weddings.find((w) => w.id === coupleWeddingId);

  // Modal states
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCreatePaywallModal, setShowCreatePaywallModal] = useState(false);

  // Join wedding form
  const [inviteCode, setInviteCode] = useState("");
  const [joinError, setJoinError] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  // Create wedding form
  const [partnerOneName, setPartnerOneName] = useState("");
  const [partnerTwoName, setPartnerTwoName] = useState("");
  const [weddingDate, setWeddingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [venue, setVenue] = useState("");

  const handleJoinWedding = async () => {
    if (!inviteCode.trim()) {
      setJoinError("Please enter an invite code");
      return;
    }

    setIsJoining(true);
    setJoinError("");

    // Simulate API call to validate invite code
    setTimeout(() => {
      // Check if any wedding has this QR code
      const foundWedding = weddings.find(
        (w) => w.qrCode?.toLowerCase() === inviteCode.trim().toLowerCase()
      );

      if (foundWedding) {
        // Update user with wedding ID
        useAuthStore.setState((state) => ({
          user: state.user ? { ...state.user, coupleWeddingId: foundWedding.id } : null,
        }));
        setShowJoinModal(false);
        setInviteCode("");
      } else {
        setJoinError("Invalid invite code. Please check with your photographer.");
      }
      setIsJoining(false);
    }, 1000);
  };

  const handleCreateWedding = () => {
    if (!partnerOneName.trim() || !partnerTwoName.trim() || !user?.id) {
      return;
    }

    const newWedding = {
      id: Date.now().toString(),
      coupleName: `${partnerOneName.trim()} & ${partnerTwoName.trim()}`,
      partnerOneName: partnerOneName.trim(),
      partnerTwoName: partnerTwoName.trim(),
      weddingDate: weddingDate.toISOString(),
      venue: venue.trim(),
      status: "planning" as const,
      createdAt: new Date().toISOString(),
      createdBy: user.id,
      qrCode: `WS-${Date.now()}`,
      qrCodeEnabled: true,
      photoAlbumLive: true,
      photoFrameEnabled: false,
      guestCount: 0,
      rsvpCount: 0,
      tasksCompleted: 0,
      totalTasks: 0,
    };

    addWedding(newWedding);

    // Link wedding to couple
    useAuthStore.setState((state) => ({
      user: state.user ? { ...state.user, coupleWeddingId: newWedding.id } : null,
    }));

    setShowCreateModal(false);
    setPartnerOneName("");
    setPartnerTwoName("");
    setVenue("");
    setWeddingDate(new Date());
  };

  const isCreateValid = partnerOneName.trim() && partnerTwoName.trim();

  // If couple has a wedding, show their wedding dashboard
  if (coupleWedding) {
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1a1a1a", "#000000"]}
          style={{ paddingTop: insets.top + 20, paddingBottom: 24, paddingHorizontal: 20 }}
        >
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-neutral-400 text-sm">Welcome back,</Text>
              <Text className="text-neutral-100 text-xl font-semibold">{user?.name}</Text>
            </View>
            <Pressable
              onPress={() => setShowSettingsModal(true)}
              className="w-10 h-10 rounded-full bg-neutral-800 items-center justify-center"
            >
              <Ionicons name="settings-outline" size={20} color="#F5B800" />
            </Pressable>
          </View>

          <View className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800">
            <Text className="text-[#F5B800] text-2xl font-bold mb-1">
              {coupleWedding.coupleName}
            </Text>
            <View className="flex-row items-center mt-2">
              <Ionicons name="calendar" size={16} color="#9CA3AF" />
              <Text className="text-neutral-400 ml-2">
                {format(new Date(coupleWedding.weddingDate), "MMMM d, yyyy")}
              </Text>
            </View>
            {coupleWedding.venue && (
              <View className="flex-row items-center mt-1">
                <Ionicons name="location" size={16} color="#9CA3AF" />
                <Text className="text-neutral-400 ml-2">{coupleWedding.venue}</Text>
              </View>
            )}
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
          {/* Quick Stats */}
          <View className="flex-row mb-6">
            <View className="flex-1 bg-neutral-900 rounded-xl p-4 mr-2 border border-neutral-800">
              <Text className="text-[#F5B800] text-2xl font-bold">
                {coupleWedding.rsvpCount}
              </Text>
              <Text className="text-neutral-400 text-sm">RSVPs</Text>
            </View>
            <View className="flex-1 bg-neutral-900 rounded-xl p-4 mx-2 border border-neutral-800">
              <Text className="text-[#F5B800] text-2xl font-bold">
                {coupleWedding.guestCount}
              </Text>
              <Text className="text-neutral-400 text-sm">Guests</Text>
            </View>
            <View className="flex-1 bg-neutral-900 rounded-xl p-4 ml-2 border border-neutral-800">
              <Text className="text-[#F5B800] text-2xl font-bold">
                {coupleWedding.tasksCompleted}/{coupleWedding.totalTasks}
              </Text>
              <Text className="text-neutral-400 text-sm">Tasks</Text>
            </View>
          </View>

          {/* Menu Items */}
          <Text className="text-neutral-100 text-lg font-semibold mb-4">Manage Your Wedding</Text>

          {/* Guest List & RSVP */}
          <Pressable
            onPress={() => navigation.navigate("GuestList", { weddingId: coupleWedding.id })}
            className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
          >
            <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
              <Ionicons name="people" size={24} color="#F5B800" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-neutral-100 text-lg font-medium">Guests & RSVP</Text>
              <Text className="text-neutral-500 text-sm">
                {coupleWedding.rsvpCount} of {coupleWedding.guestCount} responded
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>

          {/* RSVP Link - Share with guests */}
          <Pressable
            onPress={() => navigation.navigate("RSVPLink", { weddingId: coupleWedding.id })}
            className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
          >
            <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
              <Ionicons name="mail-open" size={24} color="#F5B800" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-neutral-100 text-lg font-medium">RSVP Link</Text>
              <Text className="text-neutral-500 text-sm">Share RSVP form with guests</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>

          {/* Tasks */}
          <Pressable
            onPress={() => navigation.navigate("Tasks", { weddingId: coupleWedding.id })}
            className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
          >
            <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
              <Ionicons name="checkmark-circle" size={24} color="#F5B800" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-neutral-100 text-lg font-medium">Tasks</Text>
              <Text className="text-neutral-500 text-sm">
                {coupleWedding.tasksCompleted} of {coupleWedding.totalTasks} completed
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>

          {/* Seating Chart */}
          <Pressable
            onPress={() => navigation.navigate("SeatingChart", { weddingId: coupleWedding.id })}
            className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
          >
            <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
              <Ionicons name="grid" size={24} color="#F5B800" />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-neutral-100 text-lg font-medium">Seating Chart</Text>
              <Text className="text-neutral-500 text-sm">Arrange your table layout</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>

          {/* Photo Gallery - Shows "coming soon" if photographer hasn't made it live */}
          {coupleWedding.photoAlbumLive !== false ? (
            <Pressable
              onPress={() => navigation.navigate("PhotoGallery", { weddingId: coupleWedding.id })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="images" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Photo Gallery</Text>
                <Text className="text-neutral-500 text-sm">View wedding photos</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          ) : (
            <View className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 opacity-60">
              <View className="w-12 h-12 bg-neutral-800 rounded-full items-center justify-center">
                <Ionicons name="images" size={24} color="#666" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-400 text-lg font-medium">Photo Gallery</Text>
                <Text className="text-neutral-600 text-sm">Coming soon from your photographer</Text>
              </View>
              <Ionicons name="time-outline" size={20} color="#666" />
            </View>
          )}

          {/* QR Code Album - Only show if photographer enabled it (for photographer-managed weddings) */}
          {!(coupleWedding as any).isSelfManaged && coupleWedding.qrCodeEnabled !== false && (
            <Pressable
              onPress={() => navigation.navigate("QRCodeDesign", { weddingId: coupleWedding.id })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="qr-code" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Guest Photo Album</Text>
                <Text className="text-neutral-500 text-sm">View photos from guests</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          )}

          {/* Photo Frame - Only show if photographer enabled it */}
          {coupleWedding.photoFrameEnabled === true && (
            <Pressable
              onPress={() => {/* Navigate to photo frame screen */}}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="tablet-landscape-outline" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Photo Frame</Text>
                <Text className="text-neutral-500 text-sm">Digital photo display</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          )}

          {/* Calendar - Only for self-managed weddings */}
          {(coupleWedding as any).isSelfManaged && (
            <Pressable
              onPress={() => navigation.navigate("CoupleCalendar", { weddingId: coupleWedding.id })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="calendar" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Calendar</Text>
                <Text className="text-neutral-500 text-sm">Schedule appointments</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          )}

          {/* Notes - Only for self-managed weddings */}
          {(coupleWedding as any).isSelfManaged && (
            <Pressable
              onPress={() => navigation.navigate("CoupleNotes", { weddingId: coupleWedding.id })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="document-text" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">Notes</Text>
                <Text className="text-neutral-500 text-sm">Keep wedding notes & ideas</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          )}

          {/* QR Code - Direct access for self-managed weddings (paid when created) */}
          {(coupleWedding as any).isSelfManaged && coupleWedding.qrCodeEnabled && (
            <Pressable
              onPress={() => navigation.navigate("QRCodeDesign", { weddingId: coupleWedding.id })}
              className="bg-neutral-900 rounded-2xl p-5 flex-row items-center border border-neutral-800 mb-3 active:opacity-70"
            >
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                <Ionicons name="qr-code" size={24} color="#F5B800" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-neutral-100 text-lg font-medium">My Shared Photo Album</Text>
                <Text className="text-neutral-500 text-sm">Share QR code with your guests</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </Pressable>
          )}

          <View style={{ height: insets.bottom + 20 }} />
        </ScrollView>

        {/* Settings Modal */}
        <Modal visible={showSettingsModal} transparent animationType="slide">
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-neutral-100 text-xl font-bold">Settings</Text>
                <Pressable onPress={() => setShowSettingsModal(false)}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
              </View>

              <View className="bg-neutral-800 rounded-xl p-4 mb-4">
                <Text className="text-neutral-100 font-medium">{user?.name}</Text>
                <Text className="text-neutral-400 text-sm">{user?.email}</Text>
              </View>

              <Pressable
                onPress={() => {
                  setShowSettingsModal(false);
                  signOut();
                }}
                className="bg-red-900/30 rounded-xl py-4 items-center border border-red-900"
              >
                <Text className="text-red-400 font-semibold">Sign Out</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // No wedding yet - show options to Join or Create
  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1a1a1a", "#000000"]}
        style={{ flex: 1 }}
      >
        <View style={{ paddingTop: insets.top + 20 }} className="flex-1 px-6">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-8">
            <View>
              <Text className="text-neutral-400 text-sm">Welcome,</Text>
              <Text className="text-neutral-100 text-2xl font-bold">{user?.name}</Text>
            </View>
            <Pressable
              onPress={() => setShowSettingsModal(true)}
              className="w-10 h-10 rounded-full bg-neutral-800 items-center justify-center"
            >
              <Ionicons name="settings-outline" size={20} color="#F5B800" />
            </Pressable>
          </View>

          {/* Main Content */}
          <View className="flex-1 justify-center">
            <View className="items-center mb-10">
              <View className="w-20 h-20 rounded-full bg-[#F5B800]/20 items-center justify-center mb-4">
                <Ionicons name="heart" size={40} color="#F5B800" />
              </View>
              <Text className="text-neutral-100 text-2xl font-bold text-center mb-2">
                Get Started
              </Text>
              <Text className="text-neutral-400 text-center">
                Join your photographer{"'"}s wedding or create your own
              </Text>
            </View>

            {/* Join Wedding Option */}
            <Pressable
              onPress={() => setShowJoinModal(true)}
              className="bg-neutral-900 rounded-2xl p-6 mb-4 border border-neutral-800 active:border-[#F5B800]"
            >
              <View className="flex-row items-start">
                <View className="w-14 h-14 rounded-xl bg-[#F5B800]/20 items-center justify-center mr-4">
                  <Ionicons name="link" size={28} color="#F5B800" />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-100 text-xl font-bold mb-1">Join My Wedding</Text>
                  <Text className="text-neutral-400 text-sm leading-5">
                    Enter the invite code from your photographer to access your wedding details.
                  </Text>
                </View>
              </View>
            </Pressable>

            {/* Create Wedding Option */}
            <Pressable
              onPress={() => setShowCreatePaywallModal(true)}
              className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 active:border-[#F5B800]"
            >
              <View className="flex-row items-start">
                <View className="w-14 h-14 rounded-xl bg-[#F5B800]/20 items-center justify-center mr-4">
                  <Ionicons name="add-circle" size={28} color="#F5B800" />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-100 text-xl font-bold mb-1">Create My Wedding</Text>
                  <Text className="text-neutral-400 text-sm leading-5">
                    Plan your own wedding with guest management, seating charts, calendar, and more.
                  </Text>
                  <View className="flex-row items-center mt-3">
                    <Text className="text-[#F5B800] font-semibold mr-2">$50</Text>
                    <Text className="text-neutral-500 text-xs">one-time</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      {/* Join Wedding Modal */}
      <Modal visible={showJoinModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-neutral-100 text-xl font-bold">Join Wedding</Text>
                <Pressable onPress={() => {
                  setShowJoinModal(false);
                  setInviteCode("");
                  setJoinError("");
                }}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
              </View>

              <Text className="text-neutral-400 text-sm mb-4">
                Enter the invite code provided by your photographer
              </Text>

              {joinError ? (
                <View className="bg-red-900/30 border border-red-900 rounded-xl px-4 py-3 mb-4">
                  <Text className="text-red-400 text-sm">{joinError}</Text>
                </View>
              ) : null}

              <View className="mb-6">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Invite Code</Text>
                <TextInput
                  value={inviteCode}
                  onChangeText={(text) => {
                    setInviteCode(text);
                    setJoinError("");
                  }}
                  placeholder="e.g. WS-1234567890"
                  placeholderTextColor="#6B7280"
                  className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700 text-center"
                  autoCapitalize="characters"
                  autoCorrect={false}
                />
              </View>

              <Pressable
                onPress={handleJoinWedding}
                disabled={isJoining || !inviteCode.trim()}
                className={`rounded-xl py-4 items-center ${
                  isJoining || !inviteCode.trim() ? "bg-neutral-800" : "bg-[#F5B800] active:opacity-80"
                }`}
              >
                {isJoining ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text className={`text-lg font-semibold ${
                    inviteCode.trim() ? "text-black" : "text-neutral-600"
                  }`}>
                    Join Wedding
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Create Wedding Modal */}
      <Modal visible={showCreateModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <ScrollView
              className="max-h-[85%]"
              contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
              keyboardShouldPersistTaps="handled"
            >
              <View className="bg-neutral-900 rounded-t-3xl p-6">
                <View className="flex-row items-center justify-between mb-6">
                  <Text className="text-neutral-100 text-xl font-bold">Create Wedding</Text>
                  <Pressable onPress={() => {
                    setShowCreateModal(false);
                    setPartnerOneName("");
                    setPartnerTwoName("");
                    setVenue("");
                  }}>
                    <Ionicons name="close" size={24} color="#9CA3AF" />
                  </Pressable>
                </View>

                {/* Partner 1 Name */}
                <View className="mb-4">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Your Name *</Text>
                  <TextInput
                    value={partnerOneName}
                    onChangeText={setPartnerOneName}
                    placeholder="Enter your name"
                    placeholderTextColor="#6B7280"
                    className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                    autoCapitalize="words"
                  />
                </View>

                {/* Partner 2 Name */}
                <View className="mb-4">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Partner{"'"}s Name *</Text>
                  <TextInput
                    value={partnerTwoName}
                    onChangeText={setPartnerTwoName}
                    placeholder="Enter partner's name"
                    placeholderTextColor="#6B7280"
                    className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                    autoCapitalize="words"
                  />
                </View>

                {/* Wedding Date */}
                <View className="mb-4">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Wedding Date</Text>
                  <Pressable
                    onPress={() => setShowDatePicker(true)}
                    className="bg-neutral-800 rounded-xl px-4 py-4 border border-neutral-700 flex-row items-center"
                  >
                    <Ionicons name="calendar-outline" size={20} color="#F5B800" />
                    <Text className="text-neutral-100 text-base ml-3">
                      {format(weddingDate, "MMMM d, yyyy")}
                    </Text>
                  </Pressable>
                  {showDatePicker && (
                    <View className="mt-3">
                      <DateTimePicker
                        value={weddingDate}
                        mode="date"
                        display="spinner"
                        themeVariant="dark"
                        onChange={(event, date) => {
                          setShowDatePicker(false);
                          if (date) setWeddingDate(date);
                        }}
                      />
                    </View>
                  )}
                </View>

                {/* Venue */}
                <View className="mb-6">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Venue (Optional)</Text>
                  <TextInput
                    value={venue}
                    onChangeText={setVenue}
                    placeholder="Enter venue name"
                    placeholderTextColor="#6B7280"
                    className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                  />
                </View>

                <Pressable
                  onPress={handleCreateWedding}
                  disabled={!isCreateValid}
                  className={`rounded-xl py-4 items-center ${
                    isCreateValid ? "bg-[#F5B800] active:opacity-80" : "bg-neutral-800"
                  }`}
                >
                  <Text className={`text-lg font-semibold ${
                    isCreateValid ? "text-black" : "text-neutral-600"
                  }`}>
                    Create Wedding
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Settings Modal */}
      <Modal visible={showSettingsModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-neutral-100 text-xl font-bold">Settings</Text>
              <Pressable onPress={() => setShowSettingsModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            <View className="bg-neutral-800 rounded-xl p-4 mb-4">
              <Text className="text-neutral-100 font-medium">{user?.name}</Text>
              <Text className="text-neutral-400 text-sm">{user?.email}</Text>
              <View className="flex-row items-center mt-2">
                <View className="bg-[#F5B800]/20 px-2 py-1 rounded">
                  <Text className="text-[#F5B800] text-xs font-medium">Bride / Groom</Text>
                </View>
              </View>
            </View>

            <Pressable
              onPress={() => {
                setShowSettingsModal(false);
                signOut();
              }}
              className="bg-red-900/30 rounded-xl py-4 items-center border border-red-900"
            >
              <Text className="text-red-400 font-semibold">Sign Out</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Create Wedding Paywall Modal - Sales Page */}
      <Modal visible={showCreatePaywallModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/80">
          <View className="bg-neutral-900 rounded-t-3xl max-h-[90%]">
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <View className="p-6">
                {/* Close Button */}
                <View className="flex-row justify-end mb-2">
                  <Pressable
                    onPress={() => setShowCreatePaywallModal(false)}
                    className="w-8 h-8 rounded-full bg-neutral-800 items-center justify-center"
                  >
                    <Ionicons name="close" size={18} color="#9CA3AF" />
                  </Pressable>
                </View>

                {/* Hero Section */}
                <View className="items-center mb-8">
                  <View className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F5B800] to-[#8B7355] items-center justify-center mb-5">
                    <View className="w-20 h-20 rounded-full bg-[#F5B800]/30 items-center justify-center">
                      <Ionicons name="heart" size={40} color="#F5B800" />
                    </View>
                  </View>
                  <Text className="text-neutral-100 text-2xl font-bold text-center mb-3">
                    Your Wedding, Your Way
                  </Text>
                  <Text className="text-neutral-400 text-center text-base leading-6 px-4">
                    Everything you need to plan and capture your perfect day, all in one place.
                  </Text>
                </View>

                {/* Main Value Prop */}
                <View className="bg-[#F5B800]/10 rounded-2xl p-5 mb-6 border border-[#F5B800]/20">
                  <Text className="text-[#F5B800] text-lg font-semibold text-center mb-2">
                    Complete Wedding Planning Suite
                  </Text>
                  <Text className="text-neutral-300 text-center text-sm">
                    Plan, organize, and capture every moment.
                  </Text>
                </View>

                {/* Benefits List */}
                <View className="mb-6">
                  <Text className="text-neutral-100 text-lg font-semibold mb-4">
                    Everything included:
                  </Text>

                  {[
                    {
                      icon: "people",
                      title: "Guest Management",
                      desc: "Keep track of your guest list, RSVPs, and dietary requirements all in one place."
                    },
                    {
                      icon: "grid",
                      title: "Seating Charts",
                      desc: "Design your perfect seating arrangement with our easy drag-and-drop tool."
                    },
                    {
                      icon: "checkmark-circle",
                      title: "Task Planner",
                      desc: "Stay on top of your wedding to-dos with customizable task lists and reminders."
                    },
                    {
                      icon: "calendar",
                      title: "Calendar & Schedule",
                      desc: "Schedule vendor appointments, dress fittings, and all your wedding events."
                    },
                    {
                      icon: "document-text",
                      title: "Notes & Ideas",
                      desc: "Save inspiration, vendor contacts, and all your wedding ideas in one place."
                    },
                    {
                      icon: "qr-code",
                      title: "Shared Photo Album",
                      desc: "Get a beautiful QR code your guests can scan to share their photos with you!"
                    },
                  ].map((benefit, index) => (
                    <View key={index} className="flex-row mb-4">
                      <View className="w-10 h-10 rounded-full bg-[#F5B800]/10 items-center justify-center mr-3 mt-1">
                        <Ionicons name={benefit.icon as any} size={20} color="#F5B800" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-100 font-semibold mb-1">{benefit.title}</Text>
                        <Text className="text-neutral-400 text-sm leading-5">{benefit.desc}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Social Proof */}
                <View className="items-center mb-6">
                  <View className="flex-row mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons key={star} name="star" size={20} color="#F5B800" />
                    ))}
                  </View>
                  <Text className="text-neutral-400 text-sm text-center italic">
                    {"\"Made planning our wedding so much easier! Love the guest photo feature.\""}
                  </Text>
                  <Text className="text-neutral-500 text-xs mt-1">- Emily & James, married 2024</Text>
                </View>

                {/* Price Section */}
                <View className="bg-gradient-to-r from-[#F5B800]/20 to-[#8B7355]/20 rounded-2xl p-6 mb-6 border border-[#F5B800]/30">
                  <View className="items-center">
                    <Text className="text-neutral-400 text-sm mb-1">One-time purchase</Text>
                    <Text className="text-[#F5B800] text-4xl font-bold mb-1">$50</Text>
                    <Text className="text-neutral-500 text-xs">No subscriptions. Yours forever.</Text>
                  </View>
                </View>

                {/* CTA Button */}
                <Pressable
                  onPress={() => {
                    // TODO: Integrate with RevenueCat payment system
                    // After successful payment, show create wedding form
                    setShowCreatePaywallModal(false);
                    setShowCreateModal(true);
                  }}
                  className="bg-[#F5B800] rounded-2xl py-5 items-center mb-4 active:opacity-90"
                >
                  <Text className="text-black text-lg font-bold">Create My Wedding</Text>
                  <Text className="text-black/70 text-sm mt-1">Get started planning your big day</Text>
                </Pressable>

                {/* Secondary CTA */}
                <Pressable
                  onPress={() => setShowCreatePaywallModal(false)}
                  className="py-4 items-center mb-4"
                >
                  <Text className="text-neutral-500">Maybe later</Text>
                </Pressable>

                {/* Trust Badge */}
                <View className="flex-row items-center justify-center mb-2">
                  <Ionicons name="shield-checkmark" size={16} color="#6B7280" />
                  <Text className="text-neutral-600 text-xs ml-2">Secure payment powered by Stripe</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

```

---

### 📄 `./src/screens/TasksScreen.tsx`

```
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

```

---

### 📄 `./src/screens/InviteCoupleScreen.tsx`

```
import React, { useState } from "react";
import { View, Text, Pressable, TextInput, Share, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import useWeddingStore from "../state/weddingStore";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type InviteCoupleRouteProp = RouteProp<RootStackParamList, "InviteCouple">;

export default function InviteCoupleScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<InviteCoupleRouteProp>();
  const { weddingId } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  const [copied, setCopied] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!wedding) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-neutral-500">Wedding not found</Text>
      </View>
    );
  }

  const inviteCode = wedding.qrCode;

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(inviteCode);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `You're invited to access your wedding on WedSync!\n\nCouple: ${wedding.coupleName}\n\nUse this invite code to join:\n${inviteCode}\n\nDownload the app and enter this code to get started!`,
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  const handleSendEmail = () => {
    // In a real app, this would open an email composer or send via backend
    setShowSuccessModal(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <Text className="text-[#F5B800] text-3xl font-bold mb-2">Invite Couple</Text>
        <Text className="text-neutral-400 text-base">
          Share this invite code with {wedding.partnerOneName} & {wedding.partnerTwoName}
        </Text>
      </LinearGradient>

      <View className="flex-1 px-5 pt-6">
        {/* Invite Code Card */}
        <View className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 mb-6">
          <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3 text-center">
            Invite Code
          </Text>
          <View className="bg-neutral-800 rounded-xl p-4 mb-4">
            <Text className="text-[#F5B800] text-2xl font-bold text-center tracking-widest">
              {inviteCode}
            </Text>
          </View>
          <Pressable
            onPress={handleCopyCode}
            className="bg-neutral-800 rounded-xl py-3 flex-row items-center justify-center active:opacity-70"
          >
            <Ionicons name={copied ? "checkmark" : "copy-outline"} size={20} color="#F5B800" />
            <Text className="text-[#F5B800] font-medium ml-2">
              {copied ? "Copied!" : "Copy Code"}
            </Text>
          </Pressable>
        </View>

        {/* Instructions */}
        <View className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 mb-6">
          <Text className="text-neutral-100 font-semibold mb-3">How it works:</Text>
          <View className="flex-row items-start mb-3">
            <View className="w-6 h-6 rounded-full bg-[#F5B800]/20 items-center justify-center mr-3 mt-0.5">
              <Text className="text-[#F5B800] font-bold text-xs">1</Text>
            </View>
            <Text className="text-neutral-400 flex-1">
              Share the invite code with the bride or groom
            </Text>
          </View>
          <View className="flex-row items-start mb-3">
            <View className="w-6 h-6 rounded-full bg-[#F5B800]/20 items-center justify-center mr-3 mt-0.5">
              <Text className="text-[#F5B800] font-bold text-xs">2</Text>
            </View>
            <Text className="text-neutral-400 flex-1">
              They create an account and enter the code
            </Text>
          </View>
          <View className="flex-row items-start">
            <View className="w-6 h-6 rounded-full bg-[#F5B800]/20 items-center justify-center mr-3 mt-0.5">
              <Text className="text-[#F5B800] font-bold text-xs">3</Text>
            </View>
            <Text className="text-neutral-400 flex-1">
              They get access to their wedding details, guest list, tasks, and more
            </Text>
          </View>
        </View>

        {/* Share Button */}
        <Pressable
          onPress={handleShare}
          className="bg-[#F5B800] rounded-2xl p-5 flex-row items-center justify-center mb-3 active:opacity-70"
        >
          <Ionicons name="share-outline" size={24} color="#000000" />
          <Text className="text-black text-lg font-semibold ml-3">Share Invite</Text>
        </Pressable>

        <Text className="text-neutral-600 text-sm text-center">
          The couple will be able to see features you have enabled for them
        </Text>
      </View>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View className="flex-1 bg-black/80 items-center justify-center px-6">
          <View className="bg-neutral-900 rounded-2xl p-6 w-full border border-neutral-800">
            <View className="w-16 h-16 bg-green-500/20 rounded-full items-center justify-center self-center mb-4">
              <Ionicons name="checkmark-circle" size={40} color="#22c55e" />
            </View>
            <Text className="text-neutral-100 text-xl font-bold text-center mb-2">
              Invite Sent!
            </Text>
            <Text className="text-neutral-400 text-center mb-6">
              The couple will receive instructions to join their wedding.
            </Text>
            <Pressable
              onPress={() => {
                setShowSuccessModal(false);
                navigation.goBack();
              }}
              className="bg-[#F5B800] rounded-xl py-4 items-center"
            >
              <Text className="text-black font-semibold">Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

```

---

### 📄 `./src/screens/CoupleCalendarScreen.tsx`

```
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

```

---

### 📄 `./src/screens/AuthScreen.tsx`

```
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
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import useAuthStore, { UserRole } from "../state/authStore";
import { useAuth } from "../lib/useAuth";

type AuthMode = "welcome" | "login" | "signup" | "role-select";

export default function AuthScreen() {
  const insets = useSafeAreaInsets();

  // Use the new professional auth hook
  const { signIn: authSignIn, signUp: authSignUp, isPending, error: authError } = useAuth();

  const [mode, setMode] = useState<AuthMode>("welcome");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim() || !name.trim() || !selectedRole) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError("");

    try {
      await authSignUp(email, password, name);
      // After successful signup, you can store the role in your local state if needed
      // For now, Better Auth handles the user creation
    } catch (err) {
      setError(authError?.message || "Something went wrong. Please try again.");
    }
  };

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      await authSignIn(email, password);
    } catch (err) {
      setError(authError?.message || "Invalid email or password");
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setMode("signup");
  };

  // Welcome Screen
  if (mode === "welcome") {
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1a1a1a", "#000000"]}
          style={{ flex: 1 }}
        >
          <View style={{ paddingTop: insets.top + 60 }} className="flex-1 px-6">
            {/* Logo/Brand */}
            <View className="items-center mb-12">
              <View className="w-24 h-24 rounded-full bg-[#F5B800]/20 items-center justify-center mb-6">
                <Ionicons name="heart" size={48} color="#F5B800" />
              </View>
              <Text className="text-[#F5B800] text-4xl font-bold">WedSync</Text>
              <Text className="text-neutral-400 text-lg mt-2 text-center">
                Your wedding, perfectly organized
              </Text>
            </View>

            {/* Features */}
            <View className="mb-12">
              {[
                { icon: "camera", text: "Professional photo management" },
                { icon: "people", text: "Guest list & RSVP tracking" },
                { icon: "grid", text: "Seating chart builder" },
                { icon: "qr-code", text: "QR code photo sharing" },
              ].map((feature, index) => (
                <View key={index} className="flex-row items-center mb-4">
                  <View className="w-10 h-10 rounded-full bg-[#F5B800]/10 items-center justify-center mr-4">
                    <Ionicons name={feature.icon as any} size={20} color="#F5B800" />
                  </View>
                  <Text className="text-neutral-300 text-base">{feature.text}</Text>
                </View>
              ))}
            </View>

            {/* Buttons */}
            <View className="mt-auto" style={{ paddingBottom: insets.bottom + 40 }}>
              <Pressable
                onPress={() => setMode("role-select")}
                className="bg-[#F5B800] rounded-2xl py-4 items-center mb-4 active:opacity-80"
              >
                <Text className="text-black text-lg font-semibold">Get Started</Text>
              </Pressable>

              <Pressable
                onPress={() => setMode("login")}
                className="border border-[#F5B800] rounded-2xl py-4 items-center active:opacity-80"
              >
                <Text className="text-[#F5B800] text-lg font-semibold">I already have an account</Text>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Role Selection Screen
  if (mode === "role-select") {
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1a1a1a", "#000000"]}
          style={{ flex: 1 }}
        >
          <View style={{ paddingTop: insets.top + 20 }} className="flex-1 px-6">
            {/* Header */}
            <Pressable onPress={() => setMode("welcome")} className="mb-8">
              <Ionicons name="arrow-back" size={28} color="#F5B800" />
            </Pressable>

            <Text className="text-neutral-100 text-3xl font-bold mb-2">
              How will you use WedSync?
            </Text>
            <Text className="text-neutral-400 text-base mb-10">
              Choose the option that best describes you
            </Text>

            {/* Role Options */}
            <View className="flex-1">
              {/* Photographer Option */}
              <Pressable
                onPress={() => handleRoleSelect("photographer")}
                className="bg-neutral-900 rounded-3xl p-6 mb-4 border-2 border-neutral-800 active:border-[#F5B800]"
              >
                <View className="flex-row items-start">
                  <View className="w-16 h-16 rounded-2xl bg-[#F5B800]/20 items-center justify-center mr-4">
                    <Ionicons name="camera" size={32} color="#F5B800" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-neutral-100 text-xl font-bold mb-1">Photographer</Text>
                    <Text className="text-neutral-400 text-sm leading-5">
                      I photograph weddings and want to manage multiple events, share photos, and coordinate with couples.
                    </Text>
                  </View>
                </View>
                <View className="flex-row flex-wrap mt-4">
                  {["Manage Events", "Photo Gallery", "Client Portal", "Invoicing"].map((tag) => (
                    <View key={tag} className="bg-neutral-800 px-3 py-1 rounded-full mr-2 mb-2">
                      <Text className="text-neutral-400 text-xs">{tag}</Text>
                    </View>
                  ))}
                </View>
              </Pressable>

              {/* Bride/Groom Option */}
              <Pressable
                onPress={() => handleRoleSelect("couple")}
                className="bg-neutral-900 rounded-3xl p-6 border-2 border-neutral-800 active:border-[#F5B800]"
              >
                <View className="flex-row items-start">
                  <View className="w-16 h-16 rounded-2xl bg-[#F5B800]/20 items-center justify-center mr-4">
                    <Ionicons name="heart" size={32} color="#F5B800" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-neutral-100 text-xl font-bold mb-1">Bride / Groom</Text>
                    <Text className="text-neutral-400 text-sm leading-5">
                      I am planning my wedding and want to organize guests, seating, tasks, and view photos from my photographer.
                    </Text>
                  </View>
                </View>
                <View className="flex-row flex-wrap mt-4">
                  {["Guest List", "Seating Chart", "RSVP", "Photo Access"].map((tag) => (
                    <View key={tag} className="bg-neutral-800 px-3 py-1 rounded-full mr-2 mb-2">
                      <Text className="text-neutral-400 text-xs">{tag}</Text>
                    </View>
                  ))}
                </View>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Login / Signup Form
  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1a1a1a", "#000000"]}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ paddingTop: insets.top + 20 }} className="flex-1">
            {/* Header */}
            <View className="px-6 mb-6">
              <Pressable
                onPress={() => setMode(mode === "login" ? "welcome" : "role-select")}
                className="mb-8"
              >
                <Ionicons name="arrow-back" size={28} color="#F5B800" />
              </Pressable>

              <Text className="text-neutral-100 text-3xl font-bold mb-2">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </Text>
              <Text className="text-neutral-400 text-base">
                {mode === "login"
                  ? "Sign in to continue to WedSync"
                  : selectedRole === "photographer"
                    ? "Join as a wedding photographer"
                    : "Start planning your perfect day"}
              </Text>
            </View>

            <KeyboardAvoidingView
              className="flex-1"
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={0}
            >
              <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
              >
                {/* Role Badge (signup only) */}
                {mode === "signup" && selectedRole && (
                  <View className="flex-row items-center mb-6">
                    <View className="flex-row items-center bg-[#F5B800]/10 px-4 py-2 rounded-full">
                      <Ionicons
                        name={selectedRole === "photographer" ? "camera" : "heart"}
                        size={16}
                        color="#F5B800"
                      />
                      <Text className="text-[#F5B800] font-medium ml-2 capitalize">
                        {selectedRole === "photographer" ? "Photographer" : "Bride / Groom"}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Error Message */}
                {error ? (
                  <View className="bg-red-900/30 border border-red-900 rounded-xl px-4 py-3 mb-4">
                    <Text className="text-red-400 text-sm">{error}</Text>
                  </View>
                ) : null}

                {/* Name Field (signup only) */}
                {mode === "signup" && (
                  <View className="mb-4">
                    <Text className="text-neutral-300 text-sm font-medium mb-2">Full Name</Text>
                    <View className="bg-neutral-900 rounded-xl border border-neutral-800 flex-row items-center">
                      <View className="pl-4">
                        <Ionicons name="person-outline" size={20} color="#6B7280" />
                      </View>
                      <TextInput
                        value={name}
                        onChangeText={(text) => {
                          setName(text);
                          setError("");
                        }}
                        placeholder="Enter your full name"
                        placeholderTextColor="#6B7280"
                        className="flex-1 px-4 py-4 text-base text-neutral-100"
                        autoCapitalize="words"
                        returnKeyType="next"
                      />
                    </View>
                  </View>
                )}

                {/* Email Field */}
                <View className="mb-4">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Email</Text>
                  <View className="bg-neutral-900 rounded-xl border border-neutral-800 flex-row items-center">
                    <View className="pl-4">
                      <Ionicons name="mail-outline" size={20} color="#6B7280" />
                    </View>
                    <TextInput
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        setError("");
                      }}
                      placeholder="Enter your email"
                      placeholderTextColor="#6B7280"
                      className="flex-1 px-4 py-4 text-base text-neutral-100"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                    />
                  </View>
                </View>

                {/* Password Field */}
                <View className="mb-6">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Password</Text>
                  <View className="bg-neutral-900 rounded-xl border border-neutral-800 flex-row items-center">
                    <View className="pl-4">
                      <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                    </View>
                    <TextInput
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        setError("");
                      }}
                      placeholder={mode === "signup" ? "Create a password (min 6 chars)" : "Enter your password"}
                      placeholderTextColor="#6B7280"
                      className="flex-1 px-4 py-4 text-base text-neutral-100"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      returnKeyType="done"
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)} className="pr-4">
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#6B7280"
                      />
                    </Pressable>
                  </View>
                </View>

                {/* Submit Button */}
                <Pressable
                  onPress={mode === "login" ? handleSignIn : handleSignUp}
                  disabled={isPending}
                  className={`rounded-2xl py-4 items-center mb-6 ${
                    isPending ? "bg-[#F5B800]/50" : "bg-[#F5B800] active:opacity-80"
                  }`}
                >
                  {isPending ? (
                    <ActivityIndicator color="#000" />
                  ) : (
                    <Text className="text-black text-lg font-semibold">
                      {mode === "login" ? "Sign In" : "Create Account"}
                    </Text>
                  )}
                </Pressable>

                {/* Toggle Login/Signup */}
                <View className="flex-row justify-center">
                  <Text className="text-neutral-500">
                    {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setError("");
                      if (mode === "login") {
                        setMode("role-select");
                      } else {
                        setMode("login");
                      }
                    }}
                  >
                    <Text className="text-[#F5B800] font-semibold">
                      {mode === "login" ? "Sign Up" : "Sign In"}
                    </Text>
                  </Pressable>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </View>
  );
}

```

---

### 📄 `./src/screens/EmailAutomationScreen.tsx`

```
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
              <Ionicons name="close" size={28} color="#F5B800" />
            </Pressable>
            <Text className="text-[#F5B800] text-xl font-bold">Create Template</Text>
            <Pressable onPress={createTemplate} className="bg-[#F5B800] px-4 py-2 rounded-full">
              <Text className="text-black font-semibold">Create</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          <View className="pb-8">
            <View className="mb-4">
              <Text className="text-neutral-400 text-sm mb-2">Template Name *</Text>
              <TextInput
                value={newTemplate.name}
                onChangeText={(text) => setNewTemplate({ ...newTemplate, name: text })}
                placeholder="e.g., Final Reminder"
                placeholderTextColor="#666666"
                className="bg-neutral-900 text-neutral-100 rounded-xl p-4 border border-neutral-800"
              />
            </View>

            <View className="mb-4">
              <Text className="text-neutral-400 text-sm mb-2">When to Send</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row">
                  {(["2_weeks_before", "1_week_before", "3_days_before", "photos_uploaded", "after_wedding", "manual"] as const).map(
                    (trigger, index, array) => (
                      <Pressable
                        key={trigger}
                        onPress={() => setNewTemplate({ ...newTemplate, trigger })}
                        className={`px-4 py-2 rounded-full${index < array.length - 1 ? " mr-2" : ""} ${
                          newTemplate.trigger === trigger ? "bg-[#F5B800]" : "bg-neutral-800 border border-neutral-700"
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

            <View className="mb-4">
              <Text className="text-neutral-400 text-sm mb-2">Subject Line *</Text>
              <TextInput
                value={newTemplate.subject}
                onChangeText={(text) => setNewTemplate({ ...newTemplate, subject: text })}
                placeholder="Email subject"
                placeholderTextColor="#666666"
                className="bg-neutral-900 text-neutral-100 rounded-xl p-4 border border-neutral-800"
              />
            </View>

            <View className="mb-4">
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
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-[#F5B800] text-3xl font-bold">Email Automation</Text>
            <Text className="text-neutral-400 text-base mt-1">{emailTemplates.length} templates</Text>
          </View>
          <Pressable
            onPress={() => setShowCreateModal(true)}
            className="w-12 h-12 bg-[#F5B800] rounded-full items-center justify-center active:opacity-70"
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
          <View className="pb-8">
            {emailTemplates.map((template, index) => (
              <View key={template.id} className={`bg-neutral-900 rounded-xl p-4 border border-neutral-800${index < emailTemplates.length - 1 ? " mb-2" : ""}`}>
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
                    trackColor={{ false: "#3a3a3a", true: "#F5B800" }}
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

```

---

### 📄 `./src/screens/CreateInvoiceScreen.tsx`

```
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useBusinessStore from "../state/businessStore";
import { Client, InvoiceItem, Service, PaymentMethodType } from "../types/business";
import DateTimePicker from "@react-native-community/datetimepicker";

// Payment method display info
const PAYMENT_METHOD_INFO: Record<PaymentMethodType, { label: string; icon: string; color: string }> = {
  venmo: { label: "Venmo", icon: "V", color: "#008CFF" },
  cashapp: { label: "Cash App", icon: "$", color: "#00D632" },
  paypal: { label: "PayPal", icon: "P", color: "#003087" },
  zelle: { label: "Zelle", icon: "Z", color: "#6D1ED4" },
  stripe: { label: "Stripe", icon: "S", color: "#635BFF" },
  square: { label: "Square", icon: "□", color: "#006AFF" },
  other: { label: "Other", icon: "•", color: "#F5B800" },
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CreateInvoiceScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const clients = useBusinessStore((s) => s.clients);
  const services = useBusinessStore((s) => s.services);
  const settings = useBusinessStore((s) => s.settings);
  const addInvoice = useBusinessStore((s) => s.addInvoice);
  const addClient = useBusinessStore((s) => s.addClient);

  // Form state
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState<Date>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<PaymentMethodType[]>([]);

  // Get available payment methods from business settings
  const availablePaymentMethods = useMemo(() => {
    const methods: PaymentMethodType[] = [];
    const pm = settings.paymentMethods;
    if (!pm) return methods;

    if (pm.venmo || pm.venmoLink) methods.push("venmo");
    if (pm.cashapp || pm.cashappLink) methods.push("cashapp");
    if (pm.paypal || pm.paypalLink) methods.push("paypal");
    if (pm.zelle) methods.push("zelle");
    if (pm.stripe) methods.push("stripe");
    if (pm.square) methods.push("square");
    if (pm.other) methods.push("other");

    return methods;
  }, [settings.paymentMethods]);

  // Modals
  const [showClientModal, setShowClientModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  // New client form
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");

  // New item form
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("1");
  const [itemPrice, setItemPrice] = useState("");

  // Calculations
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.total, 0);
  }, [items]);

  const tax = useMemo(() => {
    if (settings.taxRate && settings.taxRate > 0) {
      return subtotal * (settings.taxRate / 100);
    }
    return 0;
  }, [subtotal, settings.taxRate]);

  const total = subtotal + tax;

  const handleAddClient = () => {
    if (!newClientName.trim()) return;

    addClient({
      name: newClientName.trim(),
      email: newClientEmail.trim() || undefined,
      phone: newClientPhone.trim() || undefined,
    });

    // Select the newly created client
    const newClient: Client = {
      id: Date.now().toString(),
      name: newClientName.trim(),
      email: newClientEmail.trim() || undefined,
      phone: newClientPhone.trim() || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSelectedClient(newClient);

    // Reset form
    setNewClientName("");
    setNewClientEmail("");
    setNewClientPhone("");
    setShowAddClientModal(false);
    setShowClientModal(false);
  };

  const handleAddItem = () => {
    if (!itemName.trim() || !itemPrice) return;

    const quantity = parseInt(itemQuantity) || 1;
    const price = parseFloat(itemPrice) || 0;

    const newItem: InvoiceItem = {
      serviceName: itemName.trim(),
      quantity,
      price,
      total: quantity * price,
    };

    setItems([...items, newItem]);

    // Reset form
    setItemName("");
    setItemQuantity("1");
    setItemPrice("");
    setShowAddItemModal(false);
  };

  const handleSelectService = (service: Service) => {
    setItemName(service.name);
    setItemPrice(service.defaultPrice.toString());
    setShowServiceModal(false);
    setShowAddItemModal(true);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const togglePaymentMethod = (method: PaymentMethodType) => {
    setSelectedPaymentMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  const handleCreateInvoice = () => {
    if (!selectedClient || items.length === 0) return;

    addInvoice({
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      items,
      subtotal,
      tax: tax > 0 ? tax : undefined,
      total,
      status: "draft",
      dueDate: dueDate.toISOString(),
      notes: notes.trim() || undefined,
      acceptedPaymentMethods: selectedPaymentMethods.length > 0 ? selectedPaymentMethods : undefined,
    });

    navigation.goBack();
  };

  const canCreate = selectedClient && items.length > 0;

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 }}
      >
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => navigation.goBack()} className="flex-row items-center">
            <Ionicons name="chevron-back" size={24} color="#9CA3AF" />
            <Text className="text-neutral-400 text-base ml-1">Cancel</Text>
          </Pressable>
          <Text className="text-neutral-100 text-lg font-bold">New Invoice</Text>
          <View style={{ width: 70 }} />
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Client Section */}
        <View className="mt-6">
          <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3">Client</Text>
          <Pressable
            onPress={() => setShowClientModal(true)}
            className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 flex-row items-center justify-between"
          >
            {selectedClient ? (
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-[#F5B800]/20 items-center justify-center mr-3">
                  <Text className="text-[#F5B800] font-bold text-lg">
                    {selectedClient.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-100 font-medium">{selectedClient.name}</Text>
                  {selectedClient.email && (
                    <Text className="text-neutral-500 text-sm">{selectedClient.email}</Text>
                  )}
                </View>
              </View>
            ) : (
              <Text className="text-neutral-500">Select a client</Text>
            )}
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </Pressable>
        </View>

        {/* Line Items Section */}
        <View className="mt-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-neutral-400 text-xs font-semibold uppercase">Items</Text>
            <View className="flex-row">
              {services.length > 0 && (
                <Pressable
                  onPress={() => setShowServiceModal(true)}
                  className="mr-3"
                >
                  <Text className="text-[#F5B800] text-sm font-medium">From Services</Text>
                </Pressable>
              )}
              <Pressable onPress={() => setShowAddItemModal(true)}>
                <Text className="text-[#F5B800] text-sm font-medium">+ Add Item</Text>
              </Pressable>
            </View>
          </View>

          {items.length === 0 ? (
            <View className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 items-center">
              <Ionicons name="receipt-outline" size={32} color="#666" />
              <Text className="text-neutral-500 mt-2">No items added yet</Text>
              <Pressable
                onPress={() => setShowAddItemModal(true)}
                className="mt-3 bg-neutral-800 px-4 py-2 rounded-xl"
              >
                <Text className="text-neutral-300 font-medium">Add First Item</Text>
              </Pressable>
            </View>
          ) : (
            <View className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
              {items.map((item, index) => (
                <View
                  key={index}
                  className={`p-4 flex-row items-center justify-between ${
                    index < items.length - 1 ? "border-b border-neutral-800" : ""
                  }`}
                >
                  <View className="flex-1">
                    <Text className="text-neutral-100 font-medium">{item.serviceName}</Text>
                    <Text className="text-neutral-500 text-sm">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-[#F5B800] font-bold mr-3">${item.total.toFixed(2)}</Text>
                    <Pressable onPress={() => handleRemoveItem(index)}>
                      <Ionicons name="close-circle" size={22} color="#666" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Due Date */}
        <View className="mt-6">
          <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3">Due Date</Text>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={20} color="#F5B800" />
              <Text className="text-neutral-100 ml-3">{dueDate.toLocaleDateString()}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </Pressable>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="spinner"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setDueDate(date);
            }}
            minimumDate={new Date()}
          />
        )}

        {/* Notes */}
        <View className="mt-6">
          <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3">Notes (Optional)</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Add notes for the client..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={3}
            className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 text-neutral-100 min-h-[100px]"
            textAlignVertical="top"
          />
        </View>

        {/* Payment Methods */}
        <View className="mt-6">
          <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3">Accepted Payment Methods</Text>
          {availablePaymentMethods.length === 0 ? (
            <Pressable
              onPress={() => navigation.navigate("BusinessSettings")}
              className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-[#F5B800]/20 items-center justify-center mr-3">
                  <Ionicons name="card-outline" size={20} color="#F5B800" />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-100 font-medium">No payment methods set up</Text>
                  <Text className="text-neutral-500 text-sm">Tap to add payment methods in settings</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
            </Pressable>
          ) : (
            <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
              <Text className="text-neutral-500 text-sm mb-3">Select which payment methods to accept for this invoice</Text>
              <View className="flex-row flex-wrap">
                {availablePaymentMethods.map((method) => {
                  const info = PAYMENT_METHOD_INFO[method];
                  const isSelected = selectedPaymentMethods.includes(method);
                  return (
                    <Pressable
                      key={method}
                      onPress={() => togglePaymentMethod(method)}
                      className={`flex-row items-center mr-2 mb-2 px-3 py-2 rounded-xl border ${
                        isSelected
                          ? "border-[#F5B800] bg-[#F5B800]/20"
                          : "border-neutral-700 bg-neutral-800"
                      }`}
                    >
                      <View
                        className="w-6 h-6 rounded-full items-center justify-center mr-2"
                        style={{ backgroundColor: info.color }}
                      >
                        <Text className="text-white font-bold text-xs">{info.icon}</Text>
                      </View>
                      <Text className={isSelected ? "text-[#F5B800] font-medium" : "text-neutral-300"}>
                        {info.label}
                      </Text>
                      {isSelected && (
                        <Ionicons name="checkmark" size={16} color="#F5B800" style={{ marginLeft: 6 }} />
                      )}
                    </Pressable>
                  );
                })}
              </View>
              {selectedPaymentMethods.length === 0 && availablePaymentMethods.length > 0 && (
                <Text className="text-neutral-600 text-xs mt-2">
                  No methods selected - all configured methods will be shown on the invoice
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Summary */}
        {items.length > 0 && (
          <View className="mt-6 bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
            <View className="flex-row justify-between mb-2">
              <Text className="text-neutral-400">Subtotal</Text>
              <Text className="text-neutral-100">${subtotal.toFixed(2)}</Text>
            </View>
            {tax > 0 && (
              <View className="flex-row justify-between mb-2">
                <Text className="text-neutral-400">Tax ({settings.taxRate}%)</Text>
                <Text className="text-neutral-100">${tax.toFixed(2)}</Text>
              </View>
            )}
            <View className="flex-row justify-between pt-3 border-t border-neutral-800">
              <Text className="text-neutral-100 font-bold text-lg">Total</Text>
              <Text className="text-[#F5B800] font-bold text-xl">${total.toFixed(2)}</Text>
            </View>
          </View>
        )}

        {/* Create Invoice Button */}
        <View className="mt-8 mb-8">
          <Pressable
            onPress={handleCreateInvoice}
            disabled={!canCreate}
            className={`rounded-2xl p-5 items-center flex-row justify-center ${
              canCreate ? "bg-[#F5B800]" : "bg-neutral-800"
            }`}
          >
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={canCreate ? "#000" : "#666"}
            />
            <Text
              className={`text-lg font-bold ml-2 ${
                canCreate ? "text-black" : "text-neutral-600"
              }`}
            >
              Create Invoice
            </Text>
          </Pressable>
          {!canCreate && (
            <Text className="text-neutral-600 text-center text-sm mt-3">
              {!selectedClient ? "Select a client to continue" : "Add at least one item"}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Client Selection Modal */}
      <Modal visible={showClientModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6 max-h-[70%]">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-neutral-100 text-xl font-bold">Select Client</Text>
              <Pressable onPress={() => setShowClientModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            <Pressable
              onPress={() => {
                setShowClientModal(false);
                setShowAddClientModal(true);
              }}
              className="bg-[#F5B800] rounded-xl p-4 flex-row items-center justify-center mb-4"
            >
              <Ionicons name="add" size={20} color="#000" />
              <Text className="text-black font-semibold ml-2">Add New Client</Text>
            </Pressable>

            <ScrollView showsVerticalScrollIndicator={false}>
              {clients.length === 0 ? (
                <View className="items-center py-8">
                  <Text className="text-neutral-500">No clients yet</Text>
                </View>
              ) : (
                clients.map((client) => (
                  <Pressable
                    key={client.id}
                    onPress={() => {
                      setSelectedClient(client);
                      setShowClientModal(false);
                    }}
                    className="flex-row items-center bg-neutral-800 rounded-xl p-4 mb-2 border border-neutral-700"
                  >
                    <View className="w-10 h-10 rounded-full bg-[#F5B800]/20 items-center justify-center mr-3">
                      <Text className="text-[#F5B800] font-bold text-lg">
                        {client.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-neutral-100 font-medium">{client.name}</Text>
                      {client.email && (
                        <Text className="text-neutral-500 text-sm">{client.email}</Text>
                      )}
                    </View>
                    {selectedClient?.id === client.id && (
                      <Ionicons name="checkmark-circle" size={24} color="#F5B800" />
                    )}
                  </Pressable>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Add Client Modal */}
      <Modal visible={showAddClientModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-neutral-100 text-xl font-bold">New Client</Text>
                <Pressable onPress={() => setShowAddClientModal(false)}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
              </View>

              <View className="mb-4">
                <Text className="text-neutral-400 text-sm mb-2">Name *</Text>
                <TextInput
                  value={newClientName}
                  onChangeText={setNewClientName}
                  placeholder="Client name"
                  placeholderTextColor="#666"
                  className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                />
              </View>

              <View className="mb-4">
                <Text className="text-neutral-400 text-sm mb-2">Email</Text>
                <TextInput
                  value={newClientEmail}
                  onChangeText={setNewClientEmail}
                  placeholder="email@example.com"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                />
              </View>

              <View className="mb-6">
                <Text className="text-neutral-400 text-sm mb-2">Phone</Text>
                <TextInput
                  value={newClientPhone}
                  onChangeText={setNewClientPhone}
                  placeholder="(555) 555-5555"
                  placeholderTextColor="#666"
                  keyboardType="phone-pad"
                  className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                />
              </View>

              <Pressable
                onPress={handleAddClient}
                disabled={!newClientName.trim()}
                className={`rounded-xl p-4 items-center ${
                  newClientName.trim() ? "bg-[#F5B800]" : "bg-neutral-800"
                }`}
              >
                <Text className={`font-semibold ${newClientName.trim() ? "text-black" : "text-neutral-600"}`}>
                  Add Client
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Add Item Modal */}
      <Modal visible={showAddItemModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-neutral-100 text-xl font-bold">Add Item</Text>
                <Pressable onPress={() => setShowAddItemModal(false)}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
              </View>

              <View className="mb-4">
                <Text className="text-neutral-400 text-sm mb-2">Service/Item Name *</Text>
                <TextInput
                  value={itemName}
                  onChangeText={setItemName}
                  placeholder="e.g., Wedding Photography"
                  placeholderTextColor="#666"
                  className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                />
              </View>

              <View className="flex-row mb-4">
                <View className="flex-1 mr-3">
                  <Text className="text-neutral-400 text-sm mb-2">Quantity</Text>
                  <TextInput
                    value={itemQuantity}
                    onChangeText={setItemQuantity}
                    placeholder="1"
                    placeholderTextColor="#666"
                    keyboardType="number-pad"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-400 text-sm mb-2">Price *</Text>
                  <TextInput
                    value={itemPrice}
                    onChangeText={setItemPrice}
                    placeholder="0.00"
                    placeholderTextColor="#666"
                    keyboardType="decimal-pad"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>
              </View>

              {itemName && itemPrice && (
                <View className="bg-neutral-800 rounded-xl p-4 mb-6 border border-neutral-700">
                  <View className="flex-row justify-between">
                    <Text className="text-neutral-400">Line Total</Text>
                    <Text className="text-[#F5B800] font-bold">
                      ${((parseInt(itemQuantity) || 1) * (parseFloat(itemPrice) || 0)).toFixed(2)}
                    </Text>
                  </View>
                </View>
              )}

              <Pressable
                onPress={handleAddItem}
                disabled={!itemName.trim() || !itemPrice}
                className={`rounded-xl p-4 items-center ${
                  itemName.trim() && itemPrice ? "bg-[#F5B800]" : "bg-neutral-800"
                }`}
              >
                <Text className={`font-semibold ${itemName.trim() && itemPrice ? "text-black" : "text-neutral-600"}`}>
                  Add Item
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Service Selection Modal */}
      <Modal visible={showServiceModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6 max-h-[70%]">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-neutral-100 text-xl font-bold">Select Service</Text>
              <Pressable onPress={() => setShowServiceModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {services.map((service) => (
                <Pressable
                  key={service.id}
                  onPress={() => handleSelectService(service)}
                  className="flex-row items-center justify-between bg-neutral-800 rounded-xl p-4 mb-2 border border-neutral-700"
                >
                  <View className="flex-1">
                    <Text className="text-neutral-100 font-medium">{service.name}</Text>
                    {service.description && (
                      <Text className="text-neutral-500 text-sm mt-1">{service.description}</Text>
                    )}
                  </View>
                  <Text className="text-[#F5B800] font-bold">${service.defaultPrice.toFixed(2)}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

```

---

### 📄 `./src/screens/BusinessSettingsScreen.tsx`

```
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import useBusinessStore from "../state/businessStore";
import * as Haptics from "expo-haptics";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function BusinessSettingsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const settings = useBusinessStore((s) => s.settings);
  const updateSettings = useBusinessStore((s) => s.updateSettings);

  // Business Info
  const [businessName, setBusinessName] = useState(settings.businessName || "");
  const [email, setEmail] = useState(settings.email || "");
  const [phone, setPhone] = useState(settings.phone || "");
  const [street, setStreet] = useState(settings.address?.street || "");
  const [city, setCity] = useState(settings.address?.city || "");
  const [state, setState] = useState(settings.address?.state || "");
  const [zipCode, setZipCode] = useState(settings.address?.zipCode || "");

  // Invoice Settings
  const [invoicePrefix, setInvoicePrefix] = useState(settings.invoicePrefix || "INV");
  const [taxRate, setTaxRate] = useState(settings.taxRate?.toString() || "0");

  // Payment Methods
  const [stripe, setStripe] = useState(settings.paymentMethods?.stripe || "");
  const [square, setSquare] = useState(settings.paymentMethods?.square || "");
  const [venmo, setVenmo] = useState(settings.paymentMethods?.venmo || "");
  const [venmoLink, setVenmoLink] = useState(settings.paymentMethods?.venmoLink || "");
  const [cashapp, setCashapp] = useState(settings.paymentMethods?.cashapp || "");
  const [cashappLink, setCashappLink] = useState(settings.paymentMethods?.cashappLink || "");
  const [paypal, setPaypal] = useState(settings.paymentMethods?.paypal || "");
  const [paypalLink, setPaypalLink] = useState(settings.paymentMethods?.paypalLink || "");
  const [zelle, setZelle] = useState(settings.paymentMethods?.zelle || "");
  const [other, setOther] = useState(settings.paymentMethods?.other || "");

  const handleSave = () => {
    updateSettings({
      businessName: businessName.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      address: {
        street: street.trim() || undefined,
        city: city.trim() || undefined,
        state: state.trim() || undefined,
        zipCode: zipCode.trim() || undefined,
      },
      invoicePrefix: invoicePrefix.trim() || "INV",
      taxRate: parseFloat(taxRate) || 0,
      paymentMethods: {
        stripe: stripe.trim() || undefined,
        square: square.trim() || undefined,
        venmo: venmo.trim() || undefined,
        venmoLink: venmoLink.trim() || undefined,
        cashapp: cashapp.trim() || undefined,
        cashappLink: cashappLink.trim() || undefined,
        paypal: paypal.trim() || undefined,
        paypalLink: paypalLink.trim() || undefined,
        zelle: zelle.trim() || undefined,
        other: other.trim() || undefined,
      },
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 }}
      >
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => navigation.goBack()}>
            <Text className="text-neutral-400 text-base">Cancel</Text>
          </Pressable>
          <Text className="text-neutral-100 text-lg font-bold">Business Settings</Text>
          <Pressable onPress={handleSave}>
            <Text className="text-[#F5B800] text-base font-semibold">Save</Text>
          </Pressable>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
          {/* Business Information */}
          <View className="mb-6">
            <Text className="text-[#F5B800] text-lg font-bold mb-4">Business Information</Text>

            <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
              <View className="mb-4">
                <Text className="text-neutral-400 text-sm mb-2">Business Name *</Text>
                <TextInput
                  value={businessName}
                  onChangeText={setBusinessName}
                  placeholder="Your Business Name"
                  placeholderTextColor="#666"
                  className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                />
              </View>

              <View className="mb-4">
                <Text className="text-neutral-400 text-sm mb-2">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="business@example.com"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                />
              </View>

              <View className="mb-4">
                <Text className="text-neutral-400 text-sm mb-2">Phone</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="(555) 555-5555"
                  placeholderTextColor="#666"
                  keyboardType="phone-pad"
                  className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                />
              </View>

              <View className="mb-4">
                <Text className="text-neutral-400 text-sm mb-2">Street Address</Text>
                <TextInput
                  value={street}
                  onChangeText={setStreet}
                  placeholder="123 Main St"
                  placeholderTextColor="#666"
                  className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                />
              </View>

              <View className="flex-row mb-4">
                <View className="flex-1 mr-2">
                  <Text className="text-neutral-400 text-sm mb-2">City</Text>
                  <TextInput
                    value={city}
                    onChangeText={setCity}
                    placeholder="City"
                    placeholderTextColor="#666"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>
                <View className="w-20 mr-2">
                  <Text className="text-neutral-400 text-sm mb-2">State</Text>
                  <TextInput
                    value={state}
                    onChangeText={setState}
                    placeholder="CA"
                    placeholderTextColor="#666"
                    autoCapitalize="characters"
                    maxLength={2}
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>
                <View className="w-24">
                  <Text className="text-neutral-400 text-sm mb-2">Zip</Text>
                  <TextInput
                    value={zipCode}
                    onChangeText={setZipCode}
                    placeholder="90210"
                    placeholderTextColor="#666"
                    keyboardType="number-pad"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Invoice Settings */}
          <View className="mb-6">
            <Text className="text-[#F5B800] text-lg font-bold mb-4">Invoice Settings</Text>

            <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
              <View className="flex-row mb-4">
                <View className="flex-1 mr-3">
                  <Text className="text-neutral-400 text-sm mb-2">Invoice Prefix</Text>
                  <TextInput
                    value={invoicePrefix}
                    onChangeText={setInvoicePrefix}
                    placeholder="INV"
                    placeholderTextColor="#666"
                    autoCapitalize="characters"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-400 text-sm mb-2">Tax Rate (%)</Text>
                  <TextInput
                    value={taxRate}
                    onChangeText={setTaxRate}
                    placeholder="0"
                    placeholderTextColor="#666"
                    keyboardType="decimal-pad"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>
              </View>
              <Text className="text-neutral-500 text-xs">
                Preview: {invoicePrefix || "INV"}-0001
              </Text>
            </View>
          </View>

          {/* Payment Methods */}
          <View className="mb-8">
            <Text className="text-[#F5B800] text-lg font-bold mb-4">Payment Methods</Text>
            <Text className="text-neutral-500 text-sm mb-4">
              Add your payment details to include them on invoices
            </Text>

            {/* Stripe */}
            <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-3">
              <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 rounded-full items-center justify-center mr-3" style={{ backgroundColor: "#635BFF" }}>
                  <Text className="text-white font-bold text-sm">S</Text>
                </View>
                <Text className="text-neutral-100 font-medium">Stripe</Text>
              </View>
              <TextInput
                value={stripe}
                onChangeText={setStripe}
                placeholder="https://buy.stripe.com/your-link"
                placeholderTextColor="#666"
                autoCapitalize="none"
                className="bg-neutral-800 rounded-xl p-3 text-neutral-100 border border-neutral-700"
              />
              <Text className="text-neutral-600 text-xs mt-2">Paste your Stripe payment link</Text>
            </View>

            {/* Square */}
            <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-3">
              <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 rounded-full items-center justify-center mr-3" style={{ backgroundColor: "#006AFF" }}>
                  <Text className="text-white font-bold text-sm">□</Text>
                </View>
                <Text className="text-neutral-100 font-medium">Square</Text>
              </View>
              <TextInput
                value={square}
                onChangeText={setSquare}
                placeholder="https://square.link/your-link"
                placeholderTextColor="#666"
                autoCapitalize="none"
                className="bg-neutral-800 rounded-xl p-3 text-neutral-100 border border-neutral-700"
              />
              <Text className="text-neutral-600 text-xs mt-2">Paste your Square payment link</Text>
            </View>

            {/* Venmo */}
            <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-3">
              <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center mr-3">
                  <Text className="text-white font-bold text-sm">V</Text>
                </View>
                <Text className="text-neutral-100 font-medium">Venmo</Text>
              </View>
              <TextInput
                value={venmo}
                onChangeText={setVenmo}
                placeholder="@username"
                placeholderTextColor="#666"
                className="bg-neutral-800 rounded-xl p-3 text-neutral-100 border border-neutral-700 mb-2"
              />
              <TextInput
                value={venmoLink}
                onChangeText={setVenmoLink}
                placeholder="https://venmo.com/u/username (optional)"
                placeholderTextColor="#666"
                autoCapitalize="none"
                className="bg-neutral-800 rounded-xl p-3 text-neutral-100 border border-neutral-700"
              />
            </View>

            {/* Cash App */}
            <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-3">
              <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 rounded-full bg-green-500 items-center justify-center mr-3">
                  <Text className="text-white font-bold text-sm">$</Text>
                </View>
                <Text className="text-neutral-100 font-medium">Cash App</Text>
              </View>
              <TextInput
                value={cashapp}
                onChangeText={setCashapp}
                placeholder="$username"
                placeholderTextColor="#666"
                className="bg-neutral-800 rounded-xl p-3 text-neutral-100 border border-neutral-700 mb-2"
              />
              <TextInput
                value={cashappLink}
                onChangeText={setCashappLink}
                placeholder="https://cash.app/$username (optional)"
                placeholderTextColor="#666"
                autoCapitalize="none"
                className="bg-neutral-800 rounded-xl p-3 text-neutral-100 border border-neutral-700"
              />
            </View>

            {/* PayPal */}
            <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-3">
              <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 rounded-full bg-blue-600 items-center justify-center mr-3">
                  <Text className="text-white font-bold text-sm">P</Text>
                </View>
                <Text className="text-neutral-100 font-medium">PayPal</Text>
              </View>
              <TextInput
                value={paypal}
                onChangeText={setPaypal}
                placeholder="email@example.com"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-neutral-800 rounded-xl p-3 text-neutral-100 border border-neutral-700 mb-2"
              />
              <TextInput
                value={paypalLink}
                onChangeText={setPaypalLink}
                placeholder="https://paypal.me/username (optional)"
                placeholderTextColor="#666"
                autoCapitalize="none"
                className="bg-neutral-800 rounded-xl p-3 text-neutral-100 border border-neutral-700"
              />
            </View>

            {/* Zelle */}
            <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-3">
              <View className="flex-row items-center mb-3">
                <View className="w-8 h-8 rounded-full bg-purple-600 items-center justify-center mr-3">
                  <Text className="text-white font-bold text-sm">Z</Text>
                </View>
                <Text className="text-neutral-100 font-medium">Zelle</Text>
              </View>
              <TextInput
                value={zelle}
                onChangeText={setZelle}
                placeholder="email@example.com or phone"
                placeholderTextColor="#666"
                className="bg-neutral-800 rounded-xl p-3 text-neutral-100 border border-neutral-700"
              />
            </View>

            {/* Other Instructions */}
            <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
              <View className="flex-row items-center mb-3">
                <Ionicons name="document-text" size={20} color="#F5B800" />
                <Text className="text-neutral-100 font-medium ml-3">Other Instructions</Text>
              </View>
              <TextInput
                value={other}
                onChangeText={setOther}
                placeholder="Additional payment instructions..."
                placeholderTextColor="#666"
                multiline
                numberOfLines={3}
                className="bg-neutral-800 rounded-xl p-3 text-neutral-100 border border-neutral-700 min-h-[80px]"
                textAlignVertical="top"
              />
            </View>
          </View>

          <View className="h-8" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

```

---

### 📄 `./src/screens/CoupleNotesScreen.tsx`

```
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
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CoupleNotesRouteProp = RouteProp<RootStackParamList, "CoupleNotes">;

interface Note {
  id: string;
  weddingId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  color: string;
}

const NOTE_COLORS = [
  "#F5B800", // Gold
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Purple
];

export default function CoupleNotesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CoupleNotesRouteProp>();
  const { weddingId } = route.params;
  const insets = useSafeAreaInsets();

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  // Local state for notes (in production, this would be in the store)
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);

  const handleAddNote = () => {
    if (!newTitle.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      weddingId,
      title: newTitle.trim(),
      content: newContent.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      color: selectedColor,
    };

    setNotes([newNote, ...notes]);
    setShowAddModal(false);
    resetForm();
  };

  const handleUpdateNote = () => {
    if (!selectedNote || !newTitle.trim()) return;

    const updatedNotes = notes.map((note) =>
      note.id === selectedNote.id
        ? {
            ...note,
            title: newTitle.trim(),
            content: newContent.trim(),
            color: selectedColor,
            updatedAt: new Date().toISOString(),
          }
        : note
    );

    setNotes(updatedNotes);
    setShowViewModal(false);
    setIsEditing(false);
    setSelectedNote(null);
    resetForm();
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    setShowViewModal(false);
    setSelectedNote(null);
  };

  const openNote = (note: Note) => {
    setSelectedNote(note);
    setNewTitle(note.title);
    setNewContent(note.content);
    setSelectedColor(note.color);
    setShowViewModal(true);
  };

  const resetForm = () => {
    setNewTitle("");
    setNewContent("");
    setSelectedColor(NOTE_COLORS[0]);
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
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#F5B800" />
          </Pressable>
          <Text className="text-neutral-100 text-xl font-semibold">Notes</Text>
          <Pressable
            onPress={() => setShowAddModal(true)}
            className="w-10 h-10 rounded-full bg-[#F5B800] items-center justify-center"
          >
            <Ionicons name="add" size={24} color="#000" />
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {notes.length === 0 ? (
          <View className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800 items-center mt-4">
            <Ionicons name="document-text-outline" size={48} color="#404040" />
            <Text className="text-neutral-100 text-lg font-semibold mt-4">No notes yet</Text>
            <Text className="text-neutral-500 text-center mt-2">
              Keep track of ideas, vendor info, or anything important for your wedding
            </Text>
            <Pressable
              onPress={() => setShowAddModal(true)}
              className="bg-[#F5B800] rounded-xl px-6 py-3 mt-6"
            >
              <Text className="text-black font-semibold">Create your first note</Text>
            </Pressable>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {notes.map((note) => (
              <Pressable
                key={note.id}
                onPress={() => openNote(note)}
                className="w-[48%] mb-4 rounded-2xl p-4 border border-neutral-800 active:opacity-80"
                style={{ backgroundColor: `${note.color}15` }}
              >
                <View
                  className="w-3 h-3 rounded-full mb-3"
                  style={{ backgroundColor: note.color }}
                />
                <Text className="text-neutral-100 font-semibold mb-2" numberOfLines={2}>
                  {note.title}
                </Text>
                {note.content && (
                  <Text className="text-neutral-400 text-sm mb-3" numberOfLines={3}>
                    {note.content}
                  </Text>
                )}
                <Text className="text-neutral-600 text-xs">
                  {format(new Date(note.updatedAt), "MMM d")}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>

      {/* Add Note Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6 max-h-[90%]">
              <View className="flex-row items-center justify-between mb-6">
                <Pressable onPress={() => { setShowAddModal(false); resetForm(); }}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
                <Text className="text-neutral-100 text-xl font-bold">New Note</Text>
                <Pressable onPress={handleAddNote} disabled={!newTitle.trim()}>
                  <Text className={`font-semibold ${newTitle.trim() ? "text-[#F5B800]" : "text-neutral-600"}`}>
                    Save
                  </Text>
                </Pressable>
              </View>

              {/* Color Selection */}
              <View className="flex-row justify-center mb-6">
                {NOTE_COLORS.map((color) => (
                  <Pressable
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full mx-2 items-center justify-center ${
                      selectedColor === color ? "border-2 border-white" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === color && (
                      <Ionicons name="checkmark" size={16} color="#000" />
                    )}
                  </Pressable>
                ))}
              </View>

              <ScrollView keyboardShouldPersistTaps="handled">
                <View className="mb-4">
                  <TextInput
                    value={newTitle}
                    onChangeText={setNewTitle}
                    placeholder="Note title"
                    placeholderTextColor="#6B7280"
                    className="text-neutral-100 text-xl font-semibold"
                    style={{ paddingVertical: 8 }}
                  />
                </View>

                <View className="mb-6">
                  <TextInput
                    value={newContent}
                    onChangeText={setNewContent}
                    placeholder="Write your note here..."
                    placeholderTextColor="#6B7280"
                    multiline
                    className="text-neutral-300 text-base"
                    style={{ minHeight: 200, textAlignVertical: "top", paddingVertical: 8 }}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* View/Edit Note Modal */}
      <Modal visible={showViewModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6 max-h-[90%]">
              <View className="flex-row items-center justify-between mb-6">
                <Pressable onPress={() => {
                  setShowViewModal(false);
                  setIsEditing(false);
                  setSelectedNote(null);
                  resetForm();
                }}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
                <Text className="text-neutral-100 text-xl font-bold">
                  {isEditing ? "Edit Note" : "Note"}
                </Text>
                {isEditing ? (
                  <Pressable onPress={handleUpdateNote} disabled={!newTitle.trim()}>
                    <Text className={`font-semibold ${newTitle.trim() ? "text-[#F5B800]" : "text-neutral-600"}`}>
                      Save
                    </Text>
                  </Pressable>
                ) : (
                  <View className="flex-row">
                    <Pressable onPress={() => setIsEditing(true)} className="mr-4">
                      <Ionicons name="pencil" size={20} color="#F5B800" />
                    </Pressable>
                    <Pressable onPress={() => selectedNote && handleDeleteNote(selectedNote.id)}>
                      <Ionicons name="trash-outline" size={20} color="#EF4444" />
                    </Pressable>
                  </View>
                )}
              </View>

              {isEditing && (
                <View className="flex-row justify-center mb-6">
                  {NOTE_COLORS.map((color) => (
                    <Pressable
                      key={color}
                      onPress={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full mx-2 items-center justify-center ${
                        selectedColor === color ? "border-2 border-white" : ""
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {selectedColor === color && (
                        <Ionicons name="checkmark" size={16} color="#000" />
                      )}
                    </Pressable>
                  ))}
                </View>
              )}

              <ScrollView keyboardShouldPersistTaps="handled">
                {isEditing ? (
                  <>
                    <View className="mb-4">
                      <TextInput
                        value={newTitle}
                        onChangeText={setNewTitle}
                        placeholder="Note title"
                        placeholderTextColor="#6B7280"
                        className="text-neutral-100 text-xl font-semibold"
                        style={{ paddingVertical: 8 }}
                      />
                    </View>
                    <View className="mb-6">
                      <TextInput
                        value={newContent}
                        onChangeText={setNewContent}
                        placeholder="Write your note here..."
                        placeholderTextColor="#6B7280"
                        multiline
                        className="text-neutral-300 text-base"
                        style={{ minHeight: 200, textAlignVertical: "top", paddingVertical: 8 }}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <View className="flex-row items-center mb-4">
                      <View
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: selectedNote?.color }}
                      />
                      <Text className="text-neutral-500 text-sm">
                        Updated {selectedNote && format(new Date(selectedNote.updatedAt), "MMM d, yyyy")}
                      </Text>
                    </View>
                    <Text className="text-neutral-100 text-2xl font-bold mb-4">
                      {selectedNote?.title}
                    </Text>
                    <Text className="text-neutral-300 text-base leading-6">
                      {selectedNote?.content || "No content"}
                    </Text>
                  </>
                )}
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

```

---

### 📄 `./src/screens/GuestUploadScreen.tsx`

```
import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import usePhotoStore from "../state/photoStore";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { uploadMediaBatch, isVideoFile, MediaType } from "../api/r2-upload";

type GuestUploadRouteProp = RouteProp<RootStackParamList, "GuestUpload">;

interface UploadedMedia {
  uri: string;
  thumbnailUri?: string;
  mediaType: MediaType;
}

export default function GuestUploadScreen() {
  const route = useRoute<GuestUploadRouteProp>();
  const { qrCode } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.qrCode === qrCode));
  const addPhoto = usePhotoStore((s) => s.addPhoto);

  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ completed: 0, total: 0 });

  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your photos and videos to upload them.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      quality: 0.8,
      videoMaxDuration: 60,
    });

    if (!result.canceled && wedding) {
      setUploading(true);
      setUploadProgress({ completed: 0, total: result.assets.length });

      try {
        // Upload media to R2 via Worker
        const uploadResults = await uploadMediaBatch(
          wedding.id,
          result.assets.map((asset) => ({
            uri: asset.uri,
            mediaType: isVideoFile(asset.uri, asset.type) ? "video" : "photo",
          })),
          (completed, total) => {
            setUploadProgress({ completed, total });
          }
        );

        // Add successful uploads to photo store and local state
        const newMedia: UploadedMedia[] = [];
        for (let i = 0; i < uploadResults.length; i++) {
          const uploadResult = uploadResults[i];
          if (uploadResult.success && uploadResult.publicUrl) {
            const asset = result.assets[i];
            const photo = {
              id: Date.now().toString() + Math.random(),
              weddingId: wedding.id,
              uri: uploadResult.publicUrl,
              thumbnailUri: asset.uri,
              mediaType: uploadResult.mediaType || "photo",
              uploadedBy: "guest" as const,
              uploadedAt: new Date().toISOString(),
              isFavorite: false,
              isApproved: false,
            };
            addPhoto(photo);
            newMedia.push({
              uri: asset.uri,
              thumbnailUri: asset.uri,
              mediaType: uploadResult.mediaType || "photo",
            });
          }
        }

        setUploadedMedia([...uploadedMedia, ...newMedia]);
      } catch (error) {
        console.error("Upload error:", error);
        Alert.alert("Upload Failed", "There was an error uploading your media. Please try again.");
      } finally {
        setUploading(false);
        setUploadProgress({ completed: 0, total: 0 });
      }
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your camera to take photos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled && wedding) {
      setUploading(true);
      setUploadProgress({ completed: 0, total: 1 });

      try {
        const asset = result.assets[0];
        // Upload to R2 via Worker
        const uploadResults = await uploadMediaBatch(
          wedding.id,
          [{ uri: asset.uri, mediaType: "photo" }],
          (completed, total) => {
            setUploadProgress({ completed, total });
          }
        );

        if (uploadResults[0].success && uploadResults[0].publicUrl) {
          const photo = {
            id: Date.now().toString(),
            weddingId: wedding.id,
            uri: uploadResults[0].publicUrl,
            thumbnailUri: asset.uri,
            mediaType: "photo" as const,
            uploadedBy: "guest" as const,
            uploadedAt: new Date().toISOString(),
            isFavorite: false,
            isApproved: false,
          };
          addPhoto(photo);
          setUploadedMedia([
            ...uploadedMedia,
            { uri: asset.uri, thumbnailUri: asset.uri, mediaType: "photo" },
          ]);
        }
      } catch (error) {
        console.error("Upload error:", error);
        Alert.alert("Upload Failed", "There was an error uploading your photo. Please try again.");
      } finally {
        setUploading(false);
        setUploadProgress({ completed: 0, total: 0 });
      }
    }
  };

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="close-circle-outline" size={80} color="#EF4444" />
          <Text className="text-neutral-100 text-2xl font-bold mt-6 text-center">Invalid QR Code</Text>
          <Text className="text-neutral-400 text-base mt-3 text-center">
            This QR code is not associated with any wedding.
          </Text>
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
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <View className="items-center mb-6">
          <Ionicons name="camera" size={48} color="#F5B800" />
          <Text className="text-[#F5B800] text-3xl font-bold mt-4 text-center">{wedding.coupleName}</Text>
          <Text className="text-neutral-400 text-base mt-2 text-center">
            Share your photos from the celebration
          </Text>
        </View>

        <View className="flex-row">
          <Pressable
            onPress={takePhoto}
            disabled={uploading}
            className="flex-1 bg-[#F5B800] rounded-2xl py-4 items-center active:opacity-70 mr-3"
          >
            <Ionicons name="camera-outline" size={28} color="#000000" />
            <Text className="text-black text-base font-semibold mt-2">Take Photo</Text>
          </Pressable>

          <Pressable
            onPress={pickMedia}
            disabled={uploading}
            className="flex-1 bg-neutral-800 rounded-2xl py-4 items-center border border-neutral-700 active:opacity-70"
          >
            <Ionicons name="images-outline" size={28} color="#F5B800" />
            <Text className="text-neutral-100 text-base font-semibold mt-2">Choose Media</Text>
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {uploading && (
          <View className="bg-neutral-900 rounded-2xl p-6 mb-4 border border-neutral-800">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center flex-1">
                <Ionicons name="cloud-upload-outline" size={24} color="#F5B800" />
                <Text className="text-neutral-100 text-base ml-3 font-medium">
                  Uploading to cloud...
                </Text>
              </View>
            </View>
            {uploadProgress.total > 0 && (
              <View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-neutral-400 text-sm">
                    {uploadProgress.completed} of {uploadProgress.total}
                  </Text>
                  <Text className="text-neutral-400 text-sm">
                    {Math.round((uploadProgress.completed / uploadProgress.total) * 100)}%
                  </Text>
                </View>
                <View className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-[#F5B800]"
                    style={{
                      width: `${(uploadProgress.completed / uploadProgress.total) * 100}%`,
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        )}

        {uploadedMedia.length > 0 && (
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-neutral-100 text-xl font-bold">Your Uploads</Text>
              <View className="bg-emerald-900 px-3 py-1 rounded-full">
                <Text className="text-emerald-400 text-sm font-medium">
                  {uploadedMedia.length} {uploadedMedia.length === 1 ? "item" : "items"}
                </Text>
              </View>
            </View>

            <View className="flex-row flex-wrap">
              {uploadedMedia.map((item, index) => (
                <View key={index} className="w-[31%] aspect-square mr-[3.5%] mb-3 rounded-xl overflow-hidden">
                  <Image source={{ uri: item.uri }} className="w-full h-full" resizeMode="cover" />
                  {item.mediaType === "video" && (
                    <View className="absolute inset-0 items-center justify-center">
                      <View className="w-10 h-10 bg-black/60 rounded-full items-center justify-center">
                        <Ionicons name="play" size={20} color="#FFFFFF" />
                      </View>
                    </View>
                  )}
                  <View className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1">
                    <Ionicons name="checkmark" size={14} color="white" />
                  </View>
                  {item.mediaType === "video" && (
                    <View className="absolute bottom-2 left-2 bg-black/60 px-1.5 py-0.5 rounded">
                      <Text className="text-white text-[10px] font-medium">VIDEO</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {uploadedMedia.length === 0 && !uploading && (
          <View className="items-center justify-center py-20 px-8">
            <Ionicons name="images-outline" size={64} color="#404040" />
            <Text className="text-neutral-500 text-lg mt-4 text-center">No media uploaded yet</Text>
            <Text className="text-neutral-600 text-sm mt-2 text-center">
              Tap the buttons above to add your photos and videos to the wedding gallery
            </Text>
          </View>
        )}

        <View className="bg-neutral-900 rounded-2xl p-5 mb-8 border border-neutral-800">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={20} color="#F5B800" />
            <View className="flex-1 ml-3">
              <Text className="text-neutral-300 text-sm leading-5">
                Your photos will be added to the wedding gallery for the couple and all guests to enjoy.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

```

---

### 📄 `./src/screens/QRCodeScreen.tsx`

```
import React from "react";
import { View, Text, Pressable, ScrollView, Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type QRCodeRouteProp = RouteProp<RootStackParamList, "QRCode">;

export default function QRCodeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<QRCodeRouteProp>();
  const { weddingId } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">Wedding not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Production URL that guests will scan - uses dedicated upload subdomain
  const uploadUrl = `https://upload.mywedsync.com/${wedding.qrCode}?couple=${encodeURIComponent(wedding.coupleName)}`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Upload your photos for ${wedding.coupleName}'s wedding!\n\nScan the QR code or visit: ${uploadUrl}`,
        title: "WedSync Photo Upload",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <Text className="text-[#F5B800] text-3xl font-bold mb-2">QR Code</Text>
        <Text className="text-neutral-400 text-base">Guest Photo Upload</Text>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <View className="items-center py-8">
          <View className="bg-white p-8 rounded-3xl shadow-lg">
            <QRCode value={uploadUrl} size={250} backgroundColor="white" color="#000000" />
          </View>

          <Text className="text-neutral-300 text-xl font-semibold mt-8 mb-2 text-center">
            {wedding.coupleName} Wedding
          </Text>
          <Text className="text-neutral-500 text-sm text-center px-8">
            Guests can scan this QR code to upload photos and videos
          </Text>
        </View>

        <View className="bg-neutral-900 rounded-2xl p-6 mb-6 border border-neutral-800">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-[#F5B800]/10 rounded-full items-center justify-center mr-3">
              <Ionicons name="camera" size={20} color="#F5B800" />
            </View>
            <Text className="text-neutral-100 text-lg font-semibold flex-1">How it works</Text>
          </View>

          <View>
            <View className="flex-row mb-4">
              <Text className="text-[#F5B800] font-bold mr-3">1.</Text>
              <Text className="text-neutral-300 flex-1">
                Print this QR code and display it at your event
              </Text>
            </View>
            <View className="flex-row mb-4">
              <Text className="text-[#F5B800] font-bold mr-3">2.</Text>
              <Text className="text-neutral-300 flex-1">
                Guests scan with their phone camera
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-[#F5B800] font-bold mr-3">3.</Text>
              <Text className="text-neutral-300 flex-1">
                Photos upload directly to your wedding gallery
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={handleShare}
          className="bg-[#F5B800] rounded-2xl p-5 flex-row items-center justify-center mb-4"
        >
          <Ionicons name="share-outline" size={24} color="#000000" />
          <Text className="text-black text-lg font-semibold ml-3">Share QR Code</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("GuestUpload", { qrCode: wedding.qrCode })}
          className="bg-neutral-800 rounded-2xl p-5 flex-row items-center justify-center mb-8 border border-neutral-700"
        >
          <Ionicons name="eye-outline" size={24} color="#F5B800" />
          <Text className="text-neutral-100 text-lg font-semibold ml-3">Test Guest View</Text>
        </Pressable>

        <View className="bg-neutral-900/50 rounded-2xl p-4 mb-8 border border-neutral-800/50">
          <Text className="text-neutral-400 text-xs text-center">QR Code: {wedding.qrCode}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

```

---

### 📄 `./src/screens/PhotoGalleryScreen.tsx`

```
import React, { useState, useMemo } from "react";
import { View, Text, Pressable, ScrollView, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import usePhotoStore from "../state/photoStore";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";
import { useVideoPlayer, VideoView } from "expo-video";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PhotoGalleryRouteProp = RouteProp<RootStackParamList, "PhotoGallery">;

const { width, height } = Dimensions.get("window");
const imageSize = (width - 60) / 3; // 3 columns with padding

export default function PhotoGalleryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PhotoGalleryRouteProp>();
  const { weddingId } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  // Get all photos and filter outside selector to avoid infinite loop
  const allPhotos = usePhotoStore((s) => s.photos);
  const toggleFavorite = usePhotoStore((s) => s.toggleFavorite);

  // Filter photos for this wedding using useMemo
  const media = useMemo(() => {
    return allPhotos.filter((p) => p.weddingId === weddingId);
  }, [allPhotos, weddingId]);

  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "photos" | "videos" | "favorites">("all");

  // Get the selected media item for video player
  const selectedItem = useMemo(() => {
    return media.find((m) => m.id === selectedMedia);
  }, [media, selectedMedia]);

  // Video player for selected video
  const player = useVideoPlayer(
    selectedItem?.mediaType === "video" ? selectedItem.uri : null,
    (player) => {
      player.loop = false;
    }
  );

  const filteredMedia = useMemo(() => {
    switch (filter) {
      case "photos":
        return media.filter((m) => m.mediaType !== "video");
      case "videos":
        return media.filter((m) => m.mediaType === "video");
      case "favorites":
        return media.filter((m) => m.isFavorite);
      default:
        return media;
    }
  }, [media, filter]);

  const sortedMedia = useMemo(() => {
    return [...filteredMedia].sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  }, [filteredMedia]);

  const photoCount = useMemo(() => media.filter((m) => m.mediaType !== "video").length, [media]);
  const videoCount = useMemo(() => media.filter((m) => m.mediaType === "video").length, [media]);
  const favoriteCount = useMemo(() => media.filter((m) => m.isFavorite).length, [media]);

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
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
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-1">
            <Text className="text-[#F5B800] text-3xl font-bold mb-2">Gallery</Text>
            <Text className="text-neutral-400 text-base">{wedding.coupleName}</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("PhotographerUpload", { weddingId })}
            className="w-12 h-12 bg-[#F5B800] rounded-full items-center justify-center active:opacity-70"
          >
            <Ionicons name="add" size={28} color="#000000" />
          </Pressable>
        </View>

        {/* Filter tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
          <Pressable
            onPress={() => setFilter("all")}
            className={`px-4 py-2 rounded-full mx-1 ${filter === "all" ? "bg-[#F5B800]" : "bg-neutral-900 border border-neutral-800"}`}
          >
            <Text className={`font-semibold ${filter === "all" ? "text-black" : "text-neutral-400"}`}>
              All ({media.length})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("photos")}
            className={`px-4 py-2 rounded-full mx-1 ${filter === "photos" ? "bg-[#F5B800]" : "bg-neutral-900 border border-neutral-800"}`}
          >
            <Text className={`font-semibold ${filter === "photos" ? "text-black" : "text-neutral-400"}`}>
              Photos ({photoCount})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("videos")}
            className={`px-4 py-2 rounded-full mx-1 ${filter === "videos" ? "bg-[#F5B800]" : "bg-neutral-900 border border-neutral-800"}`}
          >
            <Text className={`font-semibold ${filter === "videos" ? "text-black" : "text-neutral-400"}`}>
              Videos ({videoCount})
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setFilter("favorites")}
            className={`px-4 py-2 rounded-full mx-1 ${filter === "favorites" ? "bg-[#F5B800]" : "bg-neutral-900 border border-neutral-800"}`}
          >
            <Text className={`font-semibold ${filter === "favorites" ? "text-black" : "text-neutral-400"}`}>
              Favorites ({favoriteCount})
            </Text>
          </Pressable>
        </ScrollView>
      </LinearGradient>

      {sortedMedia.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-24 h-24 bg-neutral-900 rounded-full items-center justify-center mb-6 border-2 border-neutral-800">
            <Ionicons name="images-outline" size={48} color="#F5B800" />
          </View>
          <Text className="text-neutral-300 text-xl font-semibold mb-2 text-center">
            {filter === "favorites"
              ? "No Favorites"
              : filter === "videos"
                ? "No Videos"
                : filter === "photos"
                  ? "No Photos"
                  : "No Media Yet"}
          </Text>
          <Text className="text-neutral-500 text-center mb-8">
            {filter === "favorites"
              ? "Mark items as favorites by tapping the heart icon"
              : "Upload photos or videos from your library"}
          </Text>
          {filter === "all" && (
            <Pressable
              onPress={() => navigation.navigate("PhotographerUpload", { weddingId })}
              className="bg-[#F5B800] rounded-2xl px-8 py-4 flex-row items-center active:opacity-70"
            >
              <Ionicons name="cloud-upload" size={24} color="#000000" />
              <Text className="text-black text-lg font-semibold ml-3">Upload Media</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap -mx-1 pb-8">
            {sortedMedia.map((item) => (
              <View key={item.id} className="w-1/3 p-1">
                <Pressable
                  onPress={() => setSelectedMedia(item.id)}
                  className="relative bg-neutral-900 rounded-xl overflow-hidden"
                  style={{ height: imageSize }}
                >
                  <Image
                    source={{ uri: item.thumbnailUri || item.uri }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  {item.mediaType === "video" && (
                    <View className="absolute inset-0 items-center justify-center">
                      <View className="w-10 h-10 bg-black/60 rounded-full items-center justify-center">
                        <Ionicons name="play" size={20} color="#FFFFFF" />
                      </View>
                    </View>
                  )}
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.6)"]}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 50,
                    }}
                  />
                  <Pressable
                    onPress={() => toggleFavorite(item.id)}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full items-center justify-center"
                  >
                    <Ionicons
                      name={item.isFavorite ? "heart" : "heart-outline"}
                      size={16}
                      color={item.isFavorite ? "#F5B800" : "#FFFFFF"}
                    />
                  </Pressable>
                  {item.mediaType === "video" && (
                    <View className="absolute bottom-2 left-2 bg-black/60 px-1.5 py-0.5 rounded">
                      <Text className="text-white text-[10px] font-medium">VIDEO</Text>
                    </View>
                  )}
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Full screen media viewer */}
      {selectedMedia && selectedItem && (
        <View className="absolute inset-0 bg-black">
          <SafeAreaView className="flex-1">
            <View className="flex-row items-center justify-between px-5 py-4">
              <Pressable onPress={() => setSelectedMedia(null)}>
                <Ionicons name="close" size={32} color="#F5B800" />
              </Pressable>
              <Pressable onPress={() => toggleFavorite(selectedItem.id)}>
                <Ionicons
                  name={selectedItem.isFavorite ? "heart" : "heart-outline"}
                  size={32}
                  color={selectedItem.isFavorite ? "#F5B800" : "#FFFFFF"}
                />
              </Pressable>
            </View>

            <View className="flex-1 items-center justify-center">
              {selectedItem.mediaType === "video" ? (
                <VideoView
                  player={player}
                  style={{ width: width, height: height * 0.6 }}
                  contentFit="contain"
                  allowsFullscreen
                  allowsPictureInPicture
                />
              ) : (
                <Image
                  source={{ uri: selectedItem.uri }}
                  style={{ width: width, height: height * 0.6 }}
                  resizeMode="contain"
                />
              )}
            </View>

            <View className="px-5 pb-6">
              <View className="flex-row items-center mb-2">
                {selectedItem.mediaType === "video" && (
                  <View className="bg-[#F5B800]/20 px-2 py-1 rounded mr-2">
                    <Text className="text-[#F5B800] text-xs font-semibold">VIDEO</Text>
                  </View>
                )}
                <Text className="text-neutral-100 text-lg font-semibold">
                  {selectedItem.uploadedByName || "Guest"}
                </Text>
              </View>
              <Text className="text-neutral-400 text-sm">
                {format(new Date(selectedItem.uploadedAt), "MMM d, yyyy 'at' h:mm a")}
              </Text>
            </View>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
}

```

---

### 📄 `./src/screens/CreateWeddingScreen.tsx`

```
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import useAuthStore from "../state/authStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CreateWeddingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const addWedding = useWeddingStore((s) => s.addWedding);
  const userId = useAuthStore((s) => s.user?.id);

  const [partnerOneName, setPartnerOneName] = useState("");
  const [partnerTwoName, setPartnerTwoName] = useState("");
  const [weddingDate, setWeddingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [venue, setVenue] = useState("");
  const [qrCodeEnabled, setQrCodeEnabled] = useState(true);

  const isValid = partnerOneName.trim() && partnerTwoName.trim();

  const handleCreate = () => {
    if (!isValid || !userId) {
      return;
    }

    const newWedding = {
      id: Date.now().toString(),
      coupleName: `${partnerOneName} & ${partnerTwoName}`,
      partnerOneName: partnerOneName.trim(),
      partnerTwoName: partnerTwoName.trim(),
      weddingDate: weddingDate.toISOString(),
      venue: venue.trim(),
      status: "planning" as const,
      createdAt: new Date().toISOString(),
      createdBy: userId,
      qrCode: `WS-${Date.now()}`,
      qrCodeEnabled,
      photoAlbumLive: false,
      photoFrameEnabled: false,
      guestCount: 0,
      rsvpCount: 0,
      tasksCompleted: 0,
      totalTasks: 0,
    };

    addWedding(newWedding);
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate("WeddingDetail", { weddingId: newWedding.id });
    }, 100);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-900" edges={["top"]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <View className="px-6 pt-4 pb-4 border-b border-neutral-800">
            <View className="flex-row items-center justify-between">
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={28} color="#F3F4F6" />
              </Pressable>
              <Text className="text-neutral-100 text-xl font-semibold">Create Wedding</Text>
              <Pressable onPress={handleCreate} disabled={!isValid}>
                <Text className={`text-base font-semibold ${isValid ? "text-[#F5B800]" : "text-neutral-600"}`}>
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
              className="flex-1 px-6 pt-6"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
              keyboardShouldPersistTaps="handled"
            >
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Partner One Name *</Text>
                <TextInput
                  value={partnerOneName}
                  onChangeText={setPartnerOneName}
                  placeholder="Enter first partner name"
                  placeholderTextColor="#6B7280"
                  className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                  returnKeyType="next"
                />
              </View>

              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Partner Two Name *</Text>
                <TextInput
                  value={partnerTwoName}
                  onChangeText={setPartnerTwoName}
                  placeholder="Enter second partner name"
                  placeholderTextColor="#6B7280"
                  className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                  returnKeyType="next"
                />
              </View>

              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Wedding Date *</Text>
                <Pressable
                  onPress={() => setShowDatePicker(true)}
                  className="bg-neutral-800 rounded-xl px-4 py-4 border border-neutral-700 flex-row items-center"
                >
                  <Ionicons name="calendar-outline" size={20} color="#F5B800" />
                  <Text className="text-neutral-100 text-base ml-3">{format(weddingDate, "MMMM d, yyyy")}</Text>
                </Pressable>
                {showDatePicker && (
                  <View className="mt-3">
                    <DateTimePicker
                      value={weddingDate}
                      mode="date"
                      display="inline"
                      themeVariant="dark"
                      onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date) setWeddingDate(date);
                      }}
                    />
                  </View>
                )}
              </View>

              <View className="mb-8">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Venue</Text>
                <TextInput
                  value={venue}
                  onChangeText={setVenue}
                  placeholder="Enter venue name"
                  placeholderTextColor="#6B7280"
                  className="bg-neutral-800 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-700"
                  returnKeyType="done"
                />
              </View>

              {/* QR Code Album Toggle */}
              <View className="mb-8 bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 mr-4">
                    <Text className="text-neutral-100 text-base font-medium">QR Code Album</Text>
                    <Text className="text-neutral-500 text-sm mt-1">
                      Allow guests to upload photos via QR code scanner
                    </Text>
                  </View>
                  <Switch
                    value={qrCodeEnabled}
                    onValueChange={setQrCodeEnabled}
                    trackColor={{ false: "#404040", true: "#F5B800" }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>

              {/* Create Button */}
              <Pressable
                onPress={handleCreate}
                disabled={!isValid}
                className={`rounded-xl py-4 items-center ${isValid ? "bg-[#F5B800]" : "bg-neutral-700"}`}
              >
                <Text className={`text-lg font-semibold ${isValid ? "text-black" : "text-neutral-500"}`}>
                  Create Wedding
                </Text>
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

```

---

### 📄 `./src/screens/PhotographerUploadScreen.tsx`

```
import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import usePhotoStore from "../state/photoStore";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { uploadMediaBatch, isVideoFile, MediaType } from "../api/r2-upload";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PhotographerUploadRouteProp = RouteProp<RootStackParamList, "PhotographerUpload">;

interface SelectedMedia {
  uri: string;
  id: string;
  mediaType: MediaType;
}

export default function PhotographerUploadScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<PhotographerUploadRouteProp>();
  const { weddingId } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));
  const addPhoto = usePhotoStore((s) => s.addPhoto);

  const [selectedMedia, setSelectedMedia] = useState<SelectedMedia[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">Wedding not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const pickMedia = async (type: "images" | "videos" | "all") => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant photo library access to upload media.",
          [{ text: "OK" }]
        );
        return;
      }

      const mediaTypes: ImagePicker.MediaType[] =
        type === "images" ? ["images"] : type === "videos" ? ["videos"] : ["images", "videos"];

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 20,
        videoMaxDuration: 60,
      });

      if (!result.canceled && result.assets) {
        const newMedia: SelectedMedia[] = result.assets.map((asset) => ({
          uri: asset.uri,
          id: Math.random().toString(36).substring(2, 15),
          mediaType: asset.type === "video" || isVideoFile(asset.uri) ? "video" : "photo",
        }));
        setSelectedMedia((prev) => [...prev, ...newMedia]);
      }
    } catch (error) {
      console.error("Media picker error:", error);
      Alert.alert("Error", "Failed to select media. Please try again.", [{ text: "OK" }]);
    }
  };

  const removeMedia = (id: string) => {
    setSelectedMedia((prev) => prev.filter((m) => m.id !== id));
  };

  const uploadMedia = async () => {
    if (selectedMedia.length === 0) {
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const files = selectedMedia.map((m) => ({
        uri: m.uri,
        mediaType: m.mediaType,
      }));

      const results = await uploadMediaBatch(weddingId, files, (completed, total) => {
        setUploadProgress((completed / total) * 100);
      });

      let successCount = 0;
      let failCount = 0;

      results.forEach((result, index) => {
        if (result.success && result.publicUrl) {
          addPhoto({
            id: `media_${Date.now()}_${index}`,
            weddingId,
            uri: result.publicUrl,
            mediaType: result.mediaType || "photo",
            uploadedBy: "pro",
            uploadedByName: "Photographer",
            uploadedAt: new Date().toISOString(),
            isFavorite: false,
            isApproved: true,
          });
          successCount++;
        } else {
          failCount++;
          console.error("Upload failed for item:", result.error);
        }
      });

      setTimeout(() => {
        setUploading(false);

        if (failCount > 0 && successCount === 0) {
          Alert.alert(
            "Upload Failed",
            "Could not upload media. Please check your R2 configuration in the ENV tab.",
            [{ text: "OK" }]
          );
        } else if (successCount > 0) {
          const mediaWord = successCount === 1 ? "item" : "items";
          Alert.alert(
            "Upload Complete",
            `Successfully uploaded ${successCount} ${mediaWord} to the wedding gallery!${failCount > 0 ? ` (${failCount} failed)` : ""}`,
            [
              {
                text: "View Gallery",
                onPress: () => navigation.replace("PhotoGallery", { weddingId }),
              },
              { text: "Upload More", style: "cancel", onPress: () => setSelectedMedia([]) },
            ]
          );
        }
      }, 500);
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
      Alert.alert("Upload Failed", "Failed to upload media. Please try again.", [{ text: "OK" }]);
    }
  };

  const photoCount = selectedMedia.filter((m) => m.mediaType === "photo").length;
  const videoCount = selectedMedia.filter((m) => m.mediaType === "video").length;

  const getMediaLabel = () => {
    if (photoCount > 0 && videoCount > 0) {
      return `${photoCount} Photo${photoCount !== 1 ? "s" : ""}, ${videoCount} Video${videoCount !== 1 ? "s" : ""}`;
    } else if (videoCount > 0) {
      return `${videoCount} Video${videoCount !== 1 ? "s" : ""}`;
    } else {
      return `${photoCount} Photo${photoCount !== 1 ? "s" : ""}`;
    }
  };

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <Text className="text-[#F5B800] text-3xl font-bold mb-2">Upload Media</Text>
        <Text className="text-neutral-400 text-base">{wedding.coupleName}</Text>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {selectedMedia.length === 0 ? (
          <View className="items-center py-12">
            <View className="w-24 h-24 bg-neutral-900 rounded-full items-center justify-center mb-6 border-2 border-neutral-800">
              <Ionicons name="images-outline" size={48} color="#F5B800" />
            </View>
            <Text className="text-neutral-300 text-xl font-semibold mb-2">No Media Selected</Text>
            <Text className="text-neutral-500 text-center px-8 mb-8">
              Select photos or videos from your library to upload to this wedding gallery
            </Text>
          </View>
        ) : (
          <View className="mb-6">
            <Text className="text-neutral-300 text-lg font-semibold mb-4">
              {getMediaLabel()} Selected
            </Text>
            <View className="flex-row flex-wrap -mx-1">
              {selectedMedia.map((media) => (
                <View key={media.id} className="w-1/3 p-1">
                  <View className="relative bg-neutral-900 rounded-xl overflow-hidden aspect-square">
                    <Image source={{ uri: media.uri }} className="w-full h-full" resizeMode="cover" />
                    {media.mediaType === "video" && (
                      <View className="absolute inset-0 items-center justify-center">
                        <View className="w-12 h-12 bg-black/60 rounded-full items-center justify-center">
                          <Ionicons name="play" size={24} color="#FFFFFF" />
                        </View>
                      </View>
                    )}
                    <Pressable
                      onPress={() => removeMedia(media.id)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 rounded-full items-center justify-center"
                    >
                      <Ionicons name="close" size={20} color="#FFFFFF" />
                    </Pressable>
                    {media.mediaType === "video" && (
                      <View className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded">
                        <Text className="text-white text-xs font-medium">VIDEO</Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {uploading && (
          <View className="bg-neutral-900 rounded-2xl p-6 mb-6 border border-neutral-800">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-neutral-300 text-base font-medium">Uploading media...</Text>
              <Text className="text-[#F5B800] text-base font-semibold">
                {Math.round(uploadProgress)}%
              </Text>
            </View>
            <View className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <View className="h-full bg-[#F5B800]" style={{ width: `${uploadProgress}%` }} />
            </View>
          </View>
        )}

        {/* Selection buttons */}
        <View className="flex-row mb-4">
          <Pressable
            onPress={() => pickMedia("images")}
            disabled={uploading}
            className="flex-1 bg-neutral-900 rounded-2xl p-4 flex-row items-center justify-center mr-2 border border-neutral-800 active:opacity-70"
          >
            <Ionicons name="images-outline" size={22} color="#F5B800" />
            <Text className="text-neutral-100 text-base font-semibold ml-2">Photos</Text>
          </Pressable>
          <Pressable
            onPress={() => pickMedia("videos")}
            disabled={uploading}
            className="flex-1 bg-neutral-900 rounded-2xl p-4 flex-row items-center justify-center ml-2 border border-neutral-800 active:opacity-70"
          >
            <Ionicons name="videocam-outline" size={22} color="#F5B800" />
            <Text className="text-neutral-100 text-base font-semibold ml-2">Videos</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => pickMedia("all")}
          disabled={uploading}
          className="bg-neutral-900 rounded-2xl p-5 flex-row items-center justify-center mb-4 border border-neutral-800 active:opacity-70"
        >
          <Ionicons name="add-circle-outline" size={24} color="#F5B800" />
          <Text className="text-neutral-100 text-lg font-semibold ml-3">Select All Media</Text>
        </Pressable>

        {selectedMedia.length > 0 && (
          <Pressable
            onPress={uploadMedia}
            disabled={uploading}
            className="bg-[#F5B800] rounded-2xl p-6 flex-row items-center justify-center mb-8 active:opacity-70"
          >
            {uploading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <>
                <Ionicons name="cloud-upload" size={24} color="#000000" />
                <Text className="text-black text-lg font-semibold ml-3">
                  Upload {selectedMedia.length} {selectedMedia.length === 1 ? "Item" : "Items"}
                </Text>
              </>
            )}
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

```

---

### 📄 `./src/screens/ProDashboardScreen.tsx`

```
import React, { useState, useMemo } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import useAuthStore from "../state/authStore";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { Swipeable } from "react-native-gesture-handler";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const allWeddings = useWeddingStore((s) => s.weddings);
  const deleteWedding = useWeddingStore((s) => s.deleteWedding);
  const userId = useAuthStore((s) => s.user?.id);
  const [searchQuery, setSearchQuery] = useState("");

  // Only show weddings created by this user
  const myWeddings = useMemo(() => {
    if (!userId) return [];
    return allWeddings.filter((w) => w.createdBy === userId);
  }, [allWeddings, userId]);

  const activeWeddings = myWeddings.filter((w) => w.status !== "completed");
  const filteredWeddings = activeWeddings.filter(
    (w) =>
      w.coupleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.partnerOneName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.partnerTwoName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRightActions = (weddingId: string) => {
    return (
      <Pressable
        onPress={() => deleteWedding(weddingId)}
        className="bg-red-600 justify-center items-center px-6 rounded-r-2xl"
      >
        <Ionicons name="trash-outline" size={24} color="white" />
        <Text className="text-white text-xs mt-1 font-medium">Delete</Text>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-[#F5B800] text-3xl font-bold">WedSync</Text>
            <Text className="text-neutral-400 text-base mt-1">Professional Dashboard</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("CreateWedding")}
            className="bg-[#F5B800] rounded-full w-12 h-12 items-center justify-center shadow-lg"
          >
            <Ionicons name="add" size={28} color="#000000" />
          </Pressable>
        </View>

        <View className="bg-neutral-900 rounded-2xl flex-row items-center px-4 py-3 border border-neutral-800">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search weddings..."
            placeholderTextColor="#6B7280"
            className="flex-1 ml-3 text-base text-neutral-100"
          />
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {filteredWeddings.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Ionicons name="calendar-outline" size={64} color="#404040" />
            <Text className="text-neutral-500 text-lg mt-4">
              {searchQuery ? "No weddings found" : "No active weddings"}
            </Text>
            <Text className="text-neutral-600 text-sm mt-2 text-center px-8">
              {searchQuery ? "Try a different search" : "Tap + to create your first wedding"}
            </Text>
          </View>
        ) : (
          <View className="pb-8">
            {filteredWeddings.map((wedding, index) => (
              <Swipeable
                key={wedding.id}
                renderRightActions={() => renderRightActions(wedding.id)}
                overshootRight={false}
              >
                <Pressable
                  onPress={() => navigation.navigate("WeddingDetail", { weddingId: wedding.id })}
                  className={`bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 active:opacity-70${index < filteredWeddings.length - 1 ? " mb-4" : ""}`}
                >
                  <View className="p-5">
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="flex-1">
                        <Text className="text-neutral-100 text-xl font-semibold">{wedding.coupleName}</Text>
                        <Text className="text-neutral-400 text-sm mt-1">
                          {wedding.partnerOneName} & {wedding.partnerTwoName}
                        </Text>
                      </View>
                      <View
                        className={`px-3 py-1 rounded-full ${
                          wedding.status === "upcoming" ? "bg-emerald-900" : "bg-blue-900"
                        }`}
                      >
                        <Text
                          className={`text-xs font-medium ${
                            wedding.status === "upcoming" ? "text-emerald-400" : "text-blue-400"
                          }`}
                        >
                          {wedding.status}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center mb-4">
                      <Ionicons name="calendar-outline" size={16} color="#F5B800" />
                      <Text className="text-neutral-300 text-sm ml-2">
                        {format(new Date(wedding.weddingDate), "MMMM d, yyyy")}
                      </Text>
                      {wedding.venue && (
                        <>
                          <View className="w-1 h-1 rounded-full bg-neutral-600 mx-3" />
                          <Ionicons name="location-outline" size={16} color="#F5B800" />
                          <Text className="text-neutral-300 text-sm ml-1 flex-1" numberOfLines={1}>
                            {wedding.venue}
                          </Text>
                        </>
                      )}
                    </View>

                    <View className="flex-row items-center">
                      <View className="flex-row items-center mr-6">
                        <Ionicons name="people-outline" size={18} color="#9CA3AF" />
                        <Text className="text-neutral-400 text-sm ml-2">
                          {wedding.rsvpCount}/{wedding.guestCount}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons name="checkmark-circle-outline" size={18} color="#9CA3AF" />
                        <Text className="text-neutral-400 text-sm ml-2">
                          {wedding.tasksCompleted}/{wedding.totalTasks}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ height: 1, backgroundColor: "#F5B800", opacity: 0.3 }} />
                </Pressable>
              </Swipeable>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

```

---

### 📄 `./src/screens/SeatingChartScreen.tsx`

```
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { SeatingTable, Guest } from "../types/wedding";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SeatingChartRouteProp = RouteProp<RootStackParamList, "SeatingChart">;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CANVAS_WIDTH = SCREEN_WIDTH - 40;
const CANVAS_HEIGHT = 500;

interface DraggableTableProps {
  table: SeatingTable;
  onPositionChange: (id: string, x: number, y: number) => void;
  onTablePress: (table: SeatingTable) => void;
  allGuests: Guest[];
}

function DraggableTable({ table, onPositionChange, onTablePress, allGuests }: DraggableTableProps) {
  const translateX = useSharedValue(table.x || 50);
  const translateY = useSharedValue(table.y || 50);
  const scale = useSharedValue(1);
  const isDragging = useSharedValue(false);

  const assignedGuests = allGuests.filter((g) => table.guestIds.includes(g.id));

  const panGesture = Gesture.Pan()
    .minDistance(10)
    .onStart(() => {
      isDragging.value = true;
      scale.value = withSpring(1.1);
    })
    .onUpdate((event) => {
      translateX.value = Math.max(0, Math.min(CANVAS_WIDTH - 80, (table.x || 50) + event.translationX));
      translateY.value = Math.max(0, Math.min(CANVAS_HEIGHT - 80, (table.y || 50) + event.translationY));
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      isDragging.value = false;
      runOnJS(onPositionChange)(table.id, translateX.value, translateY.value);
    });

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onEnd(() => {
      if (!isDragging.value) {
        runOnJS(onTablePress)(table);
      }
    });

  const composedGesture = Gesture.Exclusive(tapGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const getTableSize = () => {
    switch (table.shape) {
      case "round":
        return { width: 80, height: 80, borderRadius: 40 };
      case "square":
        return { width: 70, height: 70, borderRadius: 8 };
      case "rectangle":
        return { width: 100, height: 60, borderRadius: 8 };
      default:
        return { width: 80, height: 80, borderRadius: 40 };
    }
  };

  const size = getTableSize();

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[
          {
            position: "absolute",
            width: size.width,
            height: size.height,
            borderRadius: size.borderRadius,
            backgroundColor: "#F5B800",
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#F5B800",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          },
          animatedStyle,
        ]}
      >
        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>
          {table.tableNumber}
        </Text>
        <Text style={{ color: "#000", fontSize: 10, marginTop: 2 }}>
          {assignedGuests.length}/{table.capacity}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
}

export default function SeatingChartScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SeatingChartRouteProp>();
  const { weddingId } = route.params;

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));
  const allTables = useWeddingStore((s) => s.seatingTables);
  const allGuests = useWeddingStore((s) => s.guests);
  const addSeatingTable = useWeddingStore((s) => s.addSeatingTable);
  const updateSeatingTable = useWeddingStore((s) => s.updateSeatingTable);
  const deleteSeatingTable = useWeddingStore((s) => s.deleteSeatingTable);
  const updateGuest = useWeddingStore((s) => s.updateGuest);

  const tables = useMemo(() => allTables.filter((t) => t.weddingId === weddingId), [allTables, weddingId]);
  const guests = useMemo(() => allGuests.filter((g) => g.weddingId === weddingId), [allGuests, weddingId]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<SeatingTable | null>(null);
  const [selectedShape, setSelectedShape] = useState<"round" | "square" | "rectangle">("round");
  const [tableCapacity, setTableCapacity] = useState("8");

  const unseatedGuests = guests.filter((g) => {
    const isSeated = tables.some((t) => t.guestIds.includes(g.id));
    return !isSeated && g.rsvpStatus !== "declined";
  });

  const handlePositionChange = (id: string, x: number, y: number) => {
    updateSeatingTable(id, { x, y });
  };

  const handleTablePress = (table: SeatingTable) => {
    setSelectedTable(table);
    setShowTableModal(true);
  };

  const handleSelectShape = (shape: "round" | "square" | "rectangle") => {
    setSelectedShape(shape);
    // Set default capacity based on shape
    const defaultCapacity = shape === "rectangle" ? "10" : shape === "round" ? "8" : "4";
    setTableCapacity(defaultCapacity);
    setShowAddModal(false);
    setShowCapacityModal(true);
  };

  const handleConfirmTable = () => {
    const capacity = parseInt(tableCapacity) || 8;
    const newTableNumber = tables.length + 1;

    const newTable: SeatingTable = {
      id: Date.now().toString(),
      weddingId,
      tableNumber: newTableNumber,
      capacity,
      shape: selectedShape,
      x: 50 + (tables.length % 3) * 100,
      y: 50 + Math.floor(tables.length / 3) * 100,
      guestIds: [],
    };

    addSeatingTable(newTable);
    setShowCapacityModal(false);
    setTableCapacity("8");
  };

  const handleAssignGuest = (guestId: string) => {
    if (!selectedTable) return;

    const updatedGuestIds = [...selectedTable.guestIds, guestId];
    updateSeatingTable(selectedTable.id, { guestIds: updatedGuestIds });
    updateGuest(guestId, { tableNumber: selectedTable.tableNumber });

    setSelectedTable({ ...selectedTable, guestIds: updatedGuestIds });
    setShowGuestModal(false);
  };

  const handleRemoveGuest = (guestId: string) => {
    if (!selectedTable) return;

    const updatedGuestIds = selectedTable.guestIds.filter((id) => id !== guestId);
    updateSeatingTable(selectedTable.id, { guestIds: updatedGuestIds });
    updateGuest(guestId, { tableNumber: undefined });

    setSelectedTable({ ...selectedTable, guestIds: updatedGuestIds });
  };

  const handleDeleteTable = () => {
    if (!selectedTable) return;

    selectedTable.guestIds.forEach((guestId) => {
      updateGuest(guestId, { tableNumber: undefined });
    });

    deleteSeatingTable(selectedTable.id);
    setShowTableModal(false);
    setSelectedTable(null);
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
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-4">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-[#F5B800] text-2xl font-bold">Seating Chart</Text>
            <Text className="text-neutral-500 text-sm mt-1">
              {tables.length} tables · {guests.filter((g) => g.rsvpStatus !== "declined").length - unseatedGuests.length} seated
            </Text>
          </View>
          <Pressable
            onPress={() => setShowAddModal(true)}
            className="bg-[#F5B800] rounded-full w-11 h-11 items-center justify-center"
          >
            <Ionicons name="add" size={26} color="#000000" />
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Canvas Area */}
        <View className="mx-5 mt-4">
          <View
            style={{
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              backgroundColor: "#111",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#333",
              overflow: "hidden",
            }}
          >
            {/* Grid pattern */}
            <View style={{ position: "absolute", width: "100%", height: "100%", opacity: 0.1 }}>
              {[...Array(10)].map((_, i) => (
                <View
                  key={`h-${i}`}
                  style={{
                    position: "absolute",
                    top: i * 50,
                    width: "100%",
                    height: 1,
                    backgroundColor: "#F5B800",
                  }}
                />
              ))}
              {[...Array(8)].map((_, i) => (
                <View
                  key={`v-${i}`}
                  style={{
                    position: "absolute",
                    left: i * 50,
                    width: 1,
                    height: "100%",
                    backgroundColor: "#F5B800",
                  }}
                />
              ))}
            </View>

            {/* Tables */}
            {tables.map((table) => (
              <DraggableTable
                key={table.id}
                table={table}
                allGuests={guests}
                onPositionChange={handlePositionChange}
                onTablePress={handleTablePress}
              />
            ))}

            {tables.length === 0 && (
              <View className="flex-1 items-center justify-center">
                <Ionicons name="grid-outline" size={48} color="#333" />
                <Text className="text-neutral-600 mt-3 text-center">No tables yet</Text>
                <Text className="text-neutral-700 text-sm mt-1">Tap + to add a table</Text>
              </View>
            )}
          </View>
        </View>

        {/* Unseated Guests */}
        <View className="mx-5 mt-6 mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-neutral-100 text-lg font-semibold">Unseated Guests</Text>
            <View className="bg-amber-900 px-3 py-1 rounded-full">
              <Text className="text-amber-400 text-sm font-medium">{unseatedGuests.length}</Text>
            </View>
          </View>

          {unseatedGuests.length === 0 ? (
            <View className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
              <Text className="text-neutral-500 text-center">All guests are seated!</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {unseatedGuests.map((guest) => (
                <View
                  key={guest.id}
                  className="bg-neutral-900 rounded-xl p-3 mr-3 border border-neutral-800"
                  style={{ minWidth: 120 }}
                >
                  <Text className="text-neutral-100 font-medium" numberOfLines={1}>
                    {guest.name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <View
                      className={`w-2 h-2 rounded-full mr-2 ${
                        guest.rsvpStatus === "attending" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    <Text className="text-neutral-500 text-xs capitalize">{guest.rsvpStatus}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {/* Step 1: Select Shape Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-neutral-100 text-xl font-bold">Add Table</Text>
              <Pressable onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            <Text className="text-neutral-400 text-sm mb-4">Step 1: Choose a table shape</Text>

            <View className="flex-row justify-between mb-6">
              <Pressable
                onPress={() => handleSelectShape("round")}
                className="flex-1 bg-neutral-800 rounded-xl p-4 items-center mr-3 border border-neutral-700 active:bg-neutral-700"
              >
                <View className="w-16 h-16 rounded-full bg-[#F5B800] items-center justify-center mb-2">
                  <Ionicons name="ellipse-outline" size={32} color="#000" />
                </View>
                <Text className="text-neutral-300 font-medium">Round</Text>
              </Pressable>

              <Pressable
                onPress={() => handleSelectShape("square")}
                className="flex-1 bg-neutral-800 rounded-xl p-4 items-center mr-3 border border-neutral-700 active:bg-neutral-700"
              >
                <View className="w-14 h-14 rounded-lg bg-[#F5B800] items-center justify-center mb-2">
                  <Ionicons name="square-outline" size={28} color="#000" />
                </View>
                <Text className="text-neutral-300 font-medium">Square</Text>
              </Pressable>

              <Pressable
                onPress={() => handleSelectShape("rectangle")}
                className="flex-1 bg-neutral-800 rounded-xl p-4 items-center border border-neutral-700 active:bg-neutral-700"
              >
                <View
                  className="bg-[#F5B800] items-center justify-center mb-2"
                  style={{ width: 70, height: 40, borderRadius: 6 }}
                >
                  <Ionicons name="tablet-landscape-outline" size={24} color="#000" />
                </View>
                <Text className="text-neutral-300 font-medium">Rectangle</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Step 2: Enter Capacity Modal */}
      <Modal visible={showCapacityModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6">
              <View className="flex-row items-center justify-between mb-6">
                <Pressable onPress={() => {
                  setShowCapacityModal(false);
                  setShowAddModal(true);
                }}>
                  <Ionicons name="arrow-back" size={24} color="#F5B800" />
                </Pressable>
                <Text className="text-neutral-100 text-xl font-bold">Table Capacity</Text>
                <Pressable onPress={() => setShowCapacityModal(false)}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
              </View>

              <Text className="text-neutral-400 text-sm mb-4">Step 2: How many people can sit at this table?</Text>

              {/* Shape Preview */}
              <View className="items-center mb-6">
                {selectedShape === "round" && (
                  <View className="w-20 h-20 rounded-full bg-[#F5B800] items-center justify-center">
                    <Text className="text-black font-bold text-xl">{tableCapacity}</Text>
                  </View>
                )}
                {selectedShape === "square" && (
                  <View className="w-16 h-16 rounded-lg bg-[#F5B800] items-center justify-center">
                    <Text className="text-black font-bold text-xl">{tableCapacity}</Text>
                  </View>
                )}
                {selectedShape === "rectangle" && (
                  <View className="bg-[#F5B800] items-center justify-center" style={{ width: 90, height: 50, borderRadius: 8 }}>
                    <Text className="text-black font-bold text-xl">{tableCapacity}</Text>
                  </View>
                )}
                <Text className="text-neutral-500 text-sm mt-2 capitalize">{selectedShape} Table</Text>
              </View>

              {/* Capacity Input */}
              <View className="mb-6">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Number of Seats</Text>
                <TextInput
                  value={tableCapacity}
                  onChangeText={setTableCapacity}
                  placeholder="Enter capacity"
                  placeholderTextColor="#6B7280"
                  keyboardType="number-pad"
                  className="bg-neutral-800 rounded-xl px-4 py-4 text-center text-2xl text-neutral-100 border border-neutral-700"
                />
              </View>

              {/* Quick Select */}
              <View className="flex-row justify-center mb-6">
                {[4, 6, 8, 10, 12].map((num) => (
                  <Pressable
                    key={num}
                    onPress={() => setTableCapacity(num.toString())}
                    className={`w-12 h-12 rounded-full items-center justify-center mx-1 ${
                      tableCapacity === num.toString()
                        ? "bg-[#F5B800]"
                        : "bg-neutral-800 border border-neutral-700"
                    }`}
                  >
                    <Text
                      className={`font-bold ${
                        tableCapacity === num.toString() ? "text-black" : "text-neutral-400"
                      }`}
                    >
                      {num}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                onPress={handleConfirmTable}
                disabled={!tableCapacity || parseInt(tableCapacity) < 1}
                className={`rounded-xl py-4 items-center ${
                  tableCapacity && parseInt(tableCapacity) >= 1 ? "bg-[#F5B800]" : "bg-neutral-800"
                }`}
              >
                <Text
                  className={`text-lg font-semibold ${
                    tableCapacity && parseInt(tableCapacity) >= 1 ? "text-black" : "text-neutral-600"
                  }`}
                >
                  Add Table
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Table Details Modal */}
      <Modal visible={showTableModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6" style={{ maxHeight: "80%" }}>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-neutral-100 text-xl font-bold">
                Table {selectedTable?.tableNumber}
              </Text>
              <Pressable onPress={() => setShowTableModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            {selectedTable && (
              <>
                <View className="flex-row items-center mb-4">
                  <View className="bg-neutral-800 px-3 py-1.5 rounded-full mr-2">
                    <Text className="text-neutral-400 text-sm capitalize">{selectedTable.shape}</Text>
                  </View>
                  <View className="bg-neutral-800 px-3 py-1.5 rounded-full">
                    <Text className="text-neutral-400 text-sm">
                      {selectedTable.guestIds.length}/{selectedTable.capacity} seated
                    </Text>
                  </View>
                </View>

                <Text className="text-neutral-300 font-medium mb-3">Assigned Guests</Text>

                <ScrollView style={{ maxHeight: 200 }} className="mb-4">
                  {selectedTable.guestIds.length === 0 ? (
                    <View className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                      <Text className="text-neutral-500 text-center">No guests assigned yet</Text>
                    </View>
                  ) : (
                    selectedTable.guestIds.map((guestId) => {
                      const guest = guests.find((g) => g.id === guestId);
                      if (!guest) return null;
                      return (
                        <View
                          key={guestId}
                          className="flex-row items-center justify-between bg-neutral-800 rounded-xl p-3 mb-2 border border-neutral-700"
                        >
                          <View className="flex-row items-center flex-1">
                            <View className="w-8 h-8 rounded-full bg-[#F5B800]/20 items-center justify-center mr-3">
                              <Text className="text-[#F5B800] font-bold">
                                {guest.name.charAt(0)}
                              </Text>
                            </View>
                            <View className="flex-1">
                              <Text className="text-neutral-100 font-medium">{guest.name}</Text>
                              <Text className="text-neutral-500 text-xs capitalize">
                                {guest.rsvpStatus}
                              </Text>
                            </View>
                          </View>
                          <Pressable
                            onPress={() => handleRemoveGuest(guestId)}
                            className="p-2"
                          >
                            <Ionicons name="remove-circle" size={22} color="#EF4444" />
                          </Pressable>
                        </View>
                      );
                    })
                  )}
                </ScrollView>

                {selectedTable.guestIds.length < selectedTable.capacity && (
                  <Pressable
                    onPress={() => setShowGuestModal(true)}
                    className="bg-[#F5B800] rounded-xl py-3 items-center mb-3"
                  >
                    <Text className="text-black font-semibold">Add Guest to Table</Text>
                  </Pressable>
                )}

                <Pressable
                  onPress={handleDeleteTable}
                  className="bg-red-900/30 rounded-xl py-3 items-center border border-red-900"
                >
                  <Text className="text-red-400 font-semibold">Delete Table</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Guest to Table Modal */}
      <Modal visible={showGuestModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6" style={{ maxHeight: "70%" }}>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-neutral-100 text-xl font-bold">Select Guest</Text>
              <Pressable onPress={() => setShowGuestModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            <ScrollView>
              {unseatedGuests.length === 0 ? (
                <View className="bg-neutral-800 rounded-xl p-4 border border-neutral-700">
                  <Text className="text-neutral-500 text-center">All guests are already seated</Text>
                </View>
              ) : (
                unseatedGuests.map((guest) => (
                  <Pressable
                    key={guest.id}
                    onPress={() => handleAssignGuest(guest.id)}
                    className="flex-row items-center bg-neutral-800 rounded-xl p-4 mb-2 border border-neutral-700 active:bg-neutral-700"
                  >
                    <View className="w-10 h-10 rounded-full bg-[#F5B800]/20 items-center justify-center mr-3">
                      <Text className="text-[#F5B800] font-bold text-lg">
                        {guest.name.charAt(0)}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-neutral-100 font-medium">{guest.name}</Text>
                      <View className="flex-row items-center mt-1">
                        <View
                          className={`w-2 h-2 rounded-full mr-2 ${
                            guest.rsvpStatus === "attending"
                              ? "bg-emerald-500"
                              : guest.rsvpStatus === "pending"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                        />
                        <Text className="text-neutral-500 text-xs capitalize">
                          {guest.rsvpStatus}
                        </Text>
                        {guest.plusOne && (
                          <Text className="text-neutral-500 text-xs ml-2">· +1</Text>
                        )}
                      </View>
                    </View>
                    <Ionicons name="add-circle" size={24} color="#F5B800" />
                  </Pressable>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

```

---

### 📄 `./src/screens/GuestDetailScreen.tsx`

```
import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type GuestDetailRouteProp = RouteProp<RootStackParamList, "GuestDetail">;

const MEAL_LABELS: Record<string, string> = {
  standard: "Standard",
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  glutenFree: "Gluten-Free",
  other: "Other",
};

const CATEGORY_LABELS: Record<string, string> = {
  family: "Family",
  friends: "Friends",
  "bridal-party": "Bridal Party",
  vip: "VIP",
  other: "Other",
};

export default function GuestDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<GuestDetailRouteProp>();
  const { guestId } = route.params;
  const insets = useSafeAreaInsets();

  const allGuests = useWeddingStore((s) => s.guests);
  const guest = allGuests.find((g) => g.id === guestId);

  if (!guest) {
    return (
      <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
        <View className="px-5 pt-3">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#F5B800" />
          </Pressable>
        </View>
        <View className="flex-1 items-center justify-center">
          <Ionicons name="person-outline" size={64} color="#404040" />
          <Text className="text-neutral-500 text-lg mt-4">Guest not found</Text>
        </View>
      </View>
    );
  }

  const statusConfig = {
    attending: {
      bg: "bg-emerald-900/30",
      border: "border-emerald-500",
      text: "text-emerald-400",
      icon: "checkmark-circle" as const,
      iconColor: "#10B981",
      label: "Attending",
    },
    declined: {
      bg: "bg-red-900/30",
      border: "border-red-500",
      text: "text-red-400",
      icon: "close-circle" as const,
      iconColor: "#EF4444",
      label: "Declined",
    },
    pending: {
      bg: "bg-amber-900/30",
      border: "border-amber-500",
      text: "text-amber-400",
      icon: "time" as const,
      iconColor: "#F59E0B",
      label: "Pending",
    },
  };

  const status = statusConfig[guest.rsvpStatus];

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: insets.top + 10, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <View className="items-center">
          <View className="w-20 h-20 bg-neutral-800 rounded-full items-center justify-center mb-4">
            <Text className="text-[#F5B800] text-3xl font-bold">
              {guest.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text className="text-neutral-100 text-2xl font-bold text-center mb-2">
            {guest.name}
          </Text>

          <View className={`px-4 py-2 rounded-full ${status.bg} border ${status.border} flex-row items-center`}>
            <Ionicons name={status.icon} size={18} color={status.iconColor} />
            <Text className={`${status.text} font-semibold ml-2`}>{status.label}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* Contact Information */}
        {(guest.email || guest.phone) && (
          <View className="bg-neutral-900 rounded-2xl p-5 mb-4 border border-neutral-800">
            <Text className="text-neutral-100 text-lg font-semibold mb-4">Contact Information</Text>

            {guest.email && (
              <View className="flex-row items-center mb-3">
                <View className="w-10 h-10 bg-neutral-800 rounded-full items-center justify-center mr-3">
                  <Ionicons name="mail-outline" size={20} color="#F5B800" />
                </View>
                <View>
                  <Text className="text-neutral-500 text-xs">Email</Text>
                  <Text className="text-neutral-200 text-base">{guest.email}</Text>
                </View>
              </View>
            )}

            {guest.phone && (
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-neutral-800 rounded-full items-center justify-center mr-3">
                  <Ionicons name="call-outline" size={20} color="#F5B800" />
                </View>
                <View>
                  <Text className="text-neutral-500 text-xs">Phone</Text>
                  <Text className="text-neutral-200 text-base">{guest.phone}</Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* RSVP Details */}
        <View className="bg-neutral-900 rounded-2xl p-5 mb-4 border border-neutral-800">
          <Text className="text-neutral-100 text-lg font-semibold mb-4">RSVP Details</Text>

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-neutral-400">Category</Text>
            <View className="bg-neutral-800 px-3 py-1 rounded-full">
              <Text className="text-neutral-200 text-sm">{CATEGORY_LABELS[guest.category]}</Text>
            </View>
          </View>

          {guest.plusOne && (
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-neutral-400">Plus One</Text>
              <View className="flex-row items-center">
                <Ionicons name="person-add" size={16} color="#F5B800" />
                <Text className="text-[#F5B800] font-medium ml-2">{guest.plusOneName || "Yes"}</Text>
              </View>
            </View>
          )}

          {guest.mealType && (
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-neutral-400">Meal Preference</Text>
              <View className="bg-neutral-800 px-3 py-1 rounded-full">
                <Text className="text-neutral-200 text-sm">{MEAL_LABELS[guest.mealType]}</Text>
              </View>
            </View>
          )}

          {guest.dietaryRestrictions && (
            <View className="mb-4">
              <Text className="text-neutral-400 mb-2">Dietary Restrictions</Text>
              <View className="bg-neutral-800 rounded-xl p-3">
                <Text className="text-neutral-200">{guest.dietaryRestrictions}</Text>
              </View>
            </View>
          )}

          {guest.tableNumber && (
            <View className="flex-row items-center justify-between">
              <Text className="text-neutral-400">Table Assignment</Text>
              <View className="flex-row items-center">
                <Ionicons name="restaurant-outline" size={16} color="#F5B800" />
                <Text className="text-[#F5B800] font-medium ml-2">Table {guest.tableNumber}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Message from Guest */}
        {guest.message && (
          <View className="bg-neutral-900 rounded-2xl p-5 mb-4 border border-neutral-800">
            <View className="flex-row items-center mb-4">
              <Ionicons name="chatbubble-ellipses-outline" size={20} color="#F5B800" />
              <Text className="text-neutral-100 text-lg font-semibold ml-2">Message</Text>
            </View>

            <View className="bg-neutral-800 rounded-xl p-4">
              <Text className="text-neutral-200 text-base leading-6 italic">
                {`"${guest.message}"`}
              </Text>
            </View>
          </View>
        )}

        {/* Added Date */}
        <View className="bg-neutral-900/50 rounded-2xl p-4 mb-8 border border-neutral-800/50">
          <Text className="text-neutral-500 text-sm text-center">
            Added {format(new Date(guest.addedAt), "MMMM d, yyyy 'at' h:mm a")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

```

---

### 📄 `./src/screens/InvoicesScreen.tsx`

```
import React, { useState, useMemo } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useBusinessStore from "../state/businessStore";
import { InvoiceStatus } from "../types/business";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const getStatusColor = (status: InvoiceStatus) => {
  switch (status) {
    case "paid":
      return { bg: "bg-emerald-900/30", text: "text-emerald-400", border: "border-emerald-900" };
    case "sent":
      return { bg: "bg-blue-900/30", text: "text-blue-400", border: "border-blue-900" };
    case "viewed":
      return { bg: "bg-purple-900/30", text: "text-purple-400", border: "border-purple-900" };
    case "overdue":
      return { bg: "bg-red-900/30", text: "text-red-400", border: "border-red-900" };
    case "draft":
      return { bg: "bg-neutral-800", text: "text-neutral-400", border: "border-neutral-700" };
    case "cancelled":
      return { bg: "bg-neutral-800", text: "text-neutral-500", border: "border-neutral-700" };
  }
};

export default function InvoicesScreen() {
  const navigation = useNavigation<NavigationProp>();

  const allInvoices = useBusinessStore((s) => s.invoices);
  const getTotalOwed = useBusinessStore((s) => s.getTotalOwed);
  const getTotalPaid = useBusinessStore((s) => s.getTotalPaid);

  const [selectedFilter, setSelectedFilter] = useState<"all" | InvoiceStatus>("all");

  // Calculate overdue status
  const invoicesWithOverdue = useMemo(() => {
    const now = new Date();
    return allInvoices.map((invoice) => {
      const isOverdue =
        invoice.status !== "paid" &&
        invoice.status !== "cancelled" &&
        invoice.dueDate &&
        new Date(invoice.dueDate) < now;
      return {
        ...invoice,
        status: isOverdue ? ("overdue" as InvoiceStatus) : invoice.status,
      };
    });
  }, [allInvoices]);

  const filteredInvoices = useMemo(() => {
    if (selectedFilter === "all") return invoicesWithOverdue;
    return invoicesWithOverdue.filter((i) => i.status === selectedFilter);
  }, [invoicesWithOverdue, selectedFilter]);

  const stats = useMemo(() => {
    return {
      total: invoicesWithOverdue.length,
      draft: invoicesWithOverdue.filter((i) => i.status === "draft").length,
      sent: invoicesWithOverdue.filter((i) => i.status === "sent" || i.status === "viewed").length,
      paid: invoicesWithOverdue.filter((i) => i.status === "paid").length,
      overdue: invoicesWithOverdue.filter((i) => i.status === "overdue").length,
    };
  }, [invoicesWithOverdue]);

  const totalOwed = getTotalOwed();
  const totalPaid = getTotalPaid();

  const filters: Array<{ key: "all" | InvoiceStatus; label: string; count: number }> = [
    { key: "all", label: "All", count: stats.total },
    { key: "draft", label: "Draft", count: stats.draft },
    { key: "sent", label: "Sent", count: stats.sent },
    { key: "paid", label: "Paid", count: stats.paid },
    { key: "overdue", label: "Overdue", count: stats.overdue },
  ];

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

        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-[#F5B800] text-3xl font-bold">Invoices</Text>
            <Text className="text-neutral-500 text-sm mt-1">
              {stats.total} {stats.total === 1 ? "invoice" : "invoices"}
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("CreateInvoice")}
            className="bg-[#F5B800] rounded-full w-12 h-12 items-center justify-center"
          >
            <Ionicons name="add" size={28} color="#000000" />
          </Pressable>
        </View>

        {/* Stats Cards */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
            <Text className="text-neutral-400 text-xs mb-1">Outstanding</Text>
            <Text className="text-[#F5B800] text-2xl font-bold">${totalOwed.toFixed(0)}</Text>
            {stats.overdue > 0 && (
              <Text className="text-red-400 text-xs mt-1">{stats.overdue} overdue</Text>
            )}
          </View>
          <View className="flex-1 bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
            <Text className="text-neutral-400 text-xs mb-1">Collected</Text>
            <Text className="text-emerald-400 text-2xl font-bold">${totalPaid.toFixed(0)}</Text>
            <Text className="text-neutral-500 text-xs mt-1">{stats.paid} paid</Text>
          </View>
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
          contentContainerStyle={{ gap: 8 }}
        >
          {filters.map((filter) => (
            <Pressable
              key={filter.key}
              onPress={() => setSelectedFilter(filter.key)}
              className={`px-4 py-2 rounded-full flex-row items-center ${
                selectedFilter === filter.key
                  ? "bg-[#F5B800]"
                  : "bg-neutral-800 border border-neutral-700"
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedFilter === filter.key ? "text-black" : "text-neutral-300"
                }`}
              >
                {filter.label}
              </Text>
              {filter.count > 0 && (
                <View
                  className={`ml-2 px-2 py-0.5 rounded-full ${
                    selectedFilter === filter.key ? "bg-black/20" : "bg-neutral-700"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selectedFilter === filter.key ? "text-black" : "text-neutral-400"
                    }`}
                  >
                    {filter.count}
                  </Text>
                </View>
              )}
            </Pressable>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {filteredInvoices.length === 0 ? (
          <View className="items-center justify-center py-16">
            <View className="w-20 h-20 rounded-full bg-neutral-900 items-center justify-center mb-4">
              <Ionicons name="document-text-outline" size={36} color="#666" />
            </View>
            <Text className="text-neutral-400 text-lg font-medium">No invoices yet</Text>
            <Text className="text-neutral-600 text-sm mt-2 text-center px-8">
              {selectedFilter === "all"
                ? "Create your first invoice to get started"
                : `No ${selectedFilter} invoices`}
            </Text>
            {selectedFilter === "all" && (
              <Pressable
                onPress={() => navigation.navigate("CreateInvoice")}
                className="mt-6 bg-[#F5B800] px-6 py-3 rounded-xl"
              >
                <Text className="text-black font-semibold">Create Invoice</Text>
              </Pressable>
            )}
          </View>
        ) : (
          filteredInvoices.map((invoice) => {
            const colors = getStatusColor(invoice.status);
            return (
              <Pressable
                key={invoice.id}
                onPress={() => navigation.navigate("InvoiceDetail", { invoiceId: invoice.id })}
                className="bg-neutral-900 rounded-2xl p-4 mb-3 border border-neutral-800"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <Text className="text-neutral-100 text-lg font-bold">
                      {invoice.invoiceNumber}
                    </Text>
                    <Text className="text-neutral-400 text-sm mt-0.5">{invoice.clientName}</Text>
                  </View>
                  <View
                    className={`px-3 py-1.5 rounded-full border ${colors.bg} ${colors.border}`}
                  >
                    <Text className={`text-xs font-semibold uppercase ${colors.text}`}>
                      {invoice.status}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={14} color="#666" />
                    <Text className="text-neutral-500 text-xs ml-1.5">
                      {invoice.dueDate
                        ? `Due ${new Date(invoice.dueDate).toLocaleDateString()}`
                        : "No due date"}
                    </Text>
                  </View>
                  <Text className="text-[#F5B800] text-xl font-bold">
                    ${invoice.total.toFixed(2)}
                  </Text>
                </View>

                {invoice.items.length > 0 && (
                  <View className="mt-3 pt-3 border-t border-neutral-800">
                    <Text className="text-neutral-500 text-xs">
                      {invoice.items.length} {invoice.items.length === 1 ? "item" : "items"}
                      {" · "}
                      {invoice.items[0].serviceName}
                      {invoice.items.length > 1 && ` +${invoice.items.length - 1} more`}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })
        )}

        <View className="h-8" />
      </ScrollView>
    </View>
  );
}

```

---

### 📄 `./src/screens/AdminCalendarScreen.tsx`

```
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
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-[#F5B800] text-3xl font-bold">Calendar</Text>
            <Text className="text-neutral-400 text-base mt-1">{format(currentDate, "MMMM yyyy")}</Text>
          </View>
          <View className="flex-row">
            <Pressable
              onPress={previousMonth}
              className="w-10 h-10 bg-neutral-800 rounded-full items-center justify-center border border-neutral-700 mr-2"
            >
              <Ionicons name="chevron-back" size={20} color="#F5B800" />
            </Pressable>
            <Pressable
              onPress={nextMonth}
              className="w-10 h-10 bg-neutral-800 rounded-full items-center justify-center border border-neutral-700"
            >
              <Ionicons name="chevron-forward" size={20} color="#F5B800" />
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
                  isSelected ? "bg-[#F5B800] rounded-2xl" : ""
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
                {hasEvents && !isSelected && <View className="w-1 h-1 bg-[#F5B800] rounded-full mt-1" />}
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

```

---

### 📄 `./src/screens/QRCodeDesignScreen.tsx`

```
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  Share,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import useWeddingStore from "../state/weddingStore";
import { format } from "date-fns";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 60;

interface DesignTemplate {
  id: string;
  name: string;
  bgColors: string[];
  textColor: string;
  accentColor: string;
  secondaryAccent: string;
  style: "classic" | "romantic" | "modern" | "rustic" | "elegant" | "whimsical";
  headerText: string;
  subText: string;
  footerText: string;
}

const DESIGN_TEMPLATES: DesignTemplate[] = [
  {
    id: "timeless-gold",
    name: "Timeless Gold",
    bgColors: ["#0F0F0F", "#1A1A1A"],
    textColor: "#FFFFFF",
    accentColor: "#F5B800",
    secondaryAccent: "#D4A574",
    style: "elegant",
    headerText: "Share the Love",
    subText: "Scan to capture your favorite moments",
    footerText: "Thank you for celebrating with us",
  },
  {
    id: "romantic-rose",
    name: "Romantic Rose",
    bgColors: ["#FFF5F5", "#FFE4E8"],
    textColor: "#5C3D3D",
    accentColor: "#C77D7D",
    secondaryAccent: "#E8B4B8",
    style: "romantic",
    headerText: "Capture the Magic",
    subText: "Share your photos with the happy couple",
    footerText: "Forever & Always",
  },
  {
    id: "ivory-elegance",
    name: "Ivory Elegance",
    bgColors: ["#FFFEF7", "#FBF8F1"],
    textColor: "#3D3D3D",
    accentColor: "#B8997A",
    secondaryAccent: "#D4C5B0",
    style: "classic",
    headerText: "Photo Memories",
    subText: "Scan to share your snapshots",
    footerText: "With Love & Gratitude",
  },
  {
    id: "sage-garden",
    name: "Sage Garden",
    bgColors: ["#F5F7F4", "#E8EDE5"],
    textColor: "#3D4A3D",
    accentColor: "#6B7F6B",
    secondaryAccent: "#A8B8A8",
    style: "rustic",
    headerText: "Share Your Joy",
    subText: "Help us remember this beautiful day",
    footerText: "Growing Together in Love",
  },
  {
    id: "midnight-glamour",
    name: "Midnight Glamour",
    bgColors: ["#1A1F3D", "#0D1129"],
    textColor: "#FFFFFF",
    accentColor: "#F5B800",
    secondaryAccent: "#A8936A",
    style: "modern",
    headerText: "Capture Every Moment",
    subText: "Your photos mean the world to us",
    footerText: "A Night to Remember",
  },
  {
    id: "blush-whimsy",
    name: "Blush Whimsy",
    bgColors: ["#FDF2F8", "#FCE7F3"],
    textColor: "#6B4E5C",
    accentColor: "#DB7093",
    secondaryAccent: "#F0B6C8",
    style: "whimsical",
    headerText: "Happily Ever After",
    subText: "Scan & share your favorite shots",
    footerText: "Love, Laughter & Memories",
  },
];

function QRCodeDesignContent({ weddingId }: { weddingId: string }) {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const viewShotRef = useRef<ViewShot>(null);

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  const [selectedTemplate, setSelectedTemplate] = useState<DesignTemplate>(DESIGN_TEMPLATES[0]);
  const [isSaving, setIsSaving] = useState(false);

  const coupleName = wedding?.coupleName || "Our Wedding";
  // Use full upload URL so guests can scan and upload photos
  const qrValue = wedding?.qrCode
    ? `https://upload.mywedsync.com/${wedding.qrCode}?couple=${encodeURIComponent(coupleName)}`
    : `https://upload.mywedsync.com/WEDDING-${weddingId}`;
  const weddingDate = wedding?.weddingDate
    ? format(new Date(wedding.weddingDate), "MMMM d, yyyy")
    : "";

  const handleSaveToPhotos = async () => {
    try {
      setIsSaving(true);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission needed", "Please allow access to save photos to your gallery.");
        setIsSaving(false);
        return;
      }

      if (viewShotRef.current?.capture) {
        const uri = await viewShotRef.current.capture();
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("Saved!", "Your QR code design has been saved to your photo library. You can now print it!");
      }
    } catch (error) {
      Alert.alert("Error", "Could not save the image. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      if (viewShotRef.current?.capture) {
        const uri = await viewShotRef.current.capture();
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          await Share.share({ url: uri });
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not share the image. Please try again.");
    }
  };

  const renderDecoration = (template: DesignTemplate, position: "top" | "bottom") => {
    const isTop = position === "top";

    switch (template.style) {
      case "elegant":
        return (
          <View style={{ alignItems: "center", marginBottom: isTop ? 16 : 0, marginTop: isTop ? 0 : 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 40, height: 1, backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 18, marginHorizontal: 12 }}>✦</Text>
              <View style={{ width: 20, height: 1, backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 14, marginHorizontal: 8 }}>♥</Text>
              <View style={{ width: 20, height: 1, backgroundColor: template.accentColor }} />
              <Text style={{ color: template.accentColor, fontSize: 18, marginHorizontal: 12 }}>✦</Text>
              <View style={{ width: 40, height: 1, backgroundColor: template.accentColor }} />
            </View>
          </View>
        );

      case "romantic":
        return (
          <View style={{ alignItems: "center", marginBottom: isTop ? 12 : 0, marginTop: isTop ? 0 : 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: template.secondaryAccent, fontSize: 16 }}>❀</Text>
              <View style={{ width: 30, height: 1, backgroundColor: template.secondaryAccent, marginHorizontal: 6 }} />
              <Text style={{ color: template.accentColor, fontSize: 20 }}>♥</Text>
              <View style={{ width: 30, height: 1, backgroundColor: template.secondaryAccent, marginHorizontal: 6 }} />
              <Text style={{ color: template.secondaryAccent, fontSize: 16 }}>❀</Text>
            </View>
          </View>
        );

      case "classic":
        return (
          <View style={{ alignItems: "center", marginBottom: isTop ? 16 : 0, marginTop: isTop ? 0 : 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 50, height: 1, backgroundColor: template.accentColor }} />
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: template.accentColor,
                marginHorizontal: 10
              }} />
              <View style={{ width: 50, height: 1, backgroundColor: template.accentColor }} />
            </View>
          </View>
        );

      case "rustic":
        return (
          <View style={{ alignItems: "center", marginBottom: isTop ? 12 : 0, marginTop: isTop ? 0 : 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: template.accentColor, fontSize: 14 }}>✿</Text>
              <View style={{ width: 25, height: 1, backgroundColor: template.secondaryAccent, marginHorizontal: 8 }} />
              <Text style={{ color: template.accentColor, fontSize: 18 }}>❧</Text>
              <View style={{ width: 25, height: 1, backgroundColor: template.secondaryAccent, marginHorizontal: 8 }} />
              <Text style={{ color: template.accentColor, fontSize: 14 }}>✿</Text>
            </View>
          </View>
        );

      case "modern":
        return (
          <View style={{ alignItems: "center", marginBottom: isTop ? 16 : 0, marginTop: isTop ? 0 : 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 60, height: 2, backgroundColor: template.accentColor }} />
              <View style={{
                width: 10,
                height: 10,
                transform: [{ rotate: "45deg" }],
                backgroundColor: template.accentColor,
                marginHorizontal: 12
              }} />
              <View style={{ width: 60, height: 2, backgroundColor: template.accentColor }} />
            </View>
          </View>
        );

      case "whimsical":
        return (
          <View style={{ alignItems: "center", marginBottom: isTop ? 12 : 0, marginTop: isTop ? 0 : 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: template.secondaryAccent, fontSize: 14 }}>♡</Text>
              <Text style={{ color: template.accentColor, fontSize: 12, marginHorizontal: 6 }}>✦</Text>
              <Text style={{ color: template.secondaryAccent, fontSize: 18 }}>♡</Text>
              <Text style={{ color: template.accentColor, fontSize: 12, marginHorizontal: 6 }}>✦</Text>
              <Text style={{ color: template.secondaryAccent, fontSize: 14 }}>♡</Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  const renderBorder = (template: DesignTemplate) => {
    switch (template.style) {
      case "elegant":
      case "modern":
        return (
          <View style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            borderWidth: 2,
            borderColor: template.accentColor,
            borderRadius: 4
          }}>
            {/* Corner accents */}
            <View style={{ position: "absolute", top: -6, left: -6, width: 12, height: 12, borderTopWidth: 3, borderLeftWidth: 3, borderColor: template.accentColor }} />
            <View style={{ position: "absolute", top: -6, right: -6, width: 12, height: 12, borderTopWidth: 3, borderRightWidth: 3, borderColor: template.accentColor }} />
            <View style={{ position: "absolute", bottom: -6, left: -6, width: 12, height: 12, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: template.accentColor }} />
            <View style={{ position: "absolute", bottom: -6, right: -6, width: 12, height: 12, borderBottomWidth: 3, borderRightWidth: 3, borderColor: template.accentColor }} />
          </View>
        );

      case "romantic":
      case "whimsical":
        return (
          <View style={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            bottom: 16,
            borderWidth: 1,
            borderColor: template.secondaryAccent,
            borderRadius: 16,
            borderStyle: "dashed"
          }} />
        );

      case "classic":
        return (
          <View style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            borderWidth: 1,
            borderColor: template.accentColor,
          }}>
            {/* Inner border */}
            <View style={{
              position: "absolute",
              top: 4,
              left: 4,
              right: 4,
              bottom: 4,
              borderWidth: 1,
              borderColor: template.secondaryAccent,
            }} />
          </View>
        );

      case "rustic":
        return (
          <View style={{
            position: "absolute",
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            borderWidth: 2,
            borderColor: template.secondaryAccent,
            borderRadius: 8
          }} />
        );

      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      {/* Header */}
      <View
        style={{ paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: "#262626", paddingTop: insets.top + 10 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#262626", alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </Pressable>
          <Text style={{ color: "#F5F5F5", fontSize: 18, fontWeight: "600" }}>Design Your QR Code</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Preview Card */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 24 }}>
          <Text style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 12, textAlign: "center" }}>Preview</Text>

          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
            <View style={{ width: CARD_WIDTH, aspectRatio: 0.7, borderRadius: 0, overflow: "hidden", alignSelf: "center" }}>
              <LinearGradient
                colors={selectedTemplate.bgColors as [string, string]}
                style={{ flex: 1, padding: 32, position: "relative" }}
              >
                {renderBorder(selectedTemplate)}

                {/* Content - Centered */}
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", zIndex: 10 }}>

                  {/* Top Decoration */}
                  {renderDecoration(selectedTemplate, "top")}

                  {/* Couple Names */}
                  <Text
                    style={{
                      fontSize: 26,
                      fontWeight: "700",
                      textAlign: "center",
                      marginBottom: 4,
                      color: selectedTemplate.accentColor,
                      letterSpacing: 1
                    }}
                  >
                    {coupleName}
                  </Text>

                  {weddingDate ? (
                    <Text
                      style={{
                        fontSize: 13,
                        marginBottom: 20,
                        color: selectedTemplate.textColor,
                        opacity: 0.7,
                        letterSpacing: 0.5
                      }}
                    >
                      {weddingDate}
                    </Text>
                  ) : null}

                  {/* Header Text */}
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      textAlign: "center",
                      marginBottom: 6,
                      color: selectedTemplate.textColor,
                      letterSpacing: 0.5
                    }}
                  >
                    {selectedTemplate.headerText}
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      marginBottom: 20,
                      color: selectedTemplate.textColor,
                      opacity: 0.75,
                      paddingHorizontal: 16
                    }}
                  >
                    {selectedTemplate.subText}
                  </Text>

                  {/* QR Code with elegant frame */}
                  <View
                    style={{
                      padding: 12,
                      backgroundColor: "#FFFFFF",
                      borderRadius: 8,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.15,
                      shadowRadius: 8,
                      elevation: 8,
                      marginBottom: 20
                    }}
                  >
                    <View style={{
                      padding: 4,
                      borderWidth: 1,
                      borderColor: selectedTemplate.secondaryAccent,
                      borderRadius: 4
                    }}>
                      <QRCode
                        value={qrValue}
                        size={130}
                        color="#1A1A1A"
                        backgroundColor="#FFFFFF"
                      />
                    </View>
                  </View>

                  {/* Footer Text */}
                  {selectedTemplate.footerText ? (
                    <Text
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                        fontStyle: "italic",
                        color: selectedTemplate.textColor,
                        opacity: 0.6,
                        letterSpacing: 0.5
                      }}
                    >
                      {selectedTemplate.footerText}
                    </Text>
                  ) : null}

                  {/* Bottom Decoration */}
                  {renderDecoration(selectedTemplate, "bottom")}
                </View>
              </LinearGradient>
            </View>
          </ViewShot>
        </View>

        {/* Template Selection */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ color: "#F5F5F5", fontSize: 18, fontWeight: "600", marginBottom: 16 }}>Choose a Design</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {DESIGN_TEMPLATES.map((template) => (
              <Pressable
                key={template.id}
                onPress={() => setSelectedTemplate(template)}
                style={{
                  marginRight: 12,
                  borderRadius: 12,
                  overflow: "hidden",
                  width: 100,
                  height: 140,
                  borderWidth: selectedTemplate.id === template.id ? 2 : 1,
                  borderColor: selectedTemplate.id === template.id ? "#F5B800" : "#404040",
                }}
              >
                <LinearGradient
                  colors={template.bgColors as [string, string]}
                  style={{ flex: 1, padding: 8, alignItems: "center", justifyContent: "center" }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 4,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                      backgroundColor: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: template.secondaryAccent
                    }}
                  >
                    <Ionicons name="qr-code" size={20} color="#1A1A1A" />
                  </View>
                  <Text
                    style={{ fontSize: 11, textAlign: "center", fontWeight: "600", color: template.textColor }}
                    numberOfLines={2}
                  >
                    {template.name}
                  </Text>
                </LinearGradient>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Tips */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <View style={{ backgroundColor: "#171717", borderRadius: 16, padding: 20, borderWidth: 1, borderColor: "#262626" }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Ionicons name="bulb" size={20} color="#F5B800" />
              <Text style={{ color: "#F5F5F5", fontWeight: "600", marginLeft: 8 }}>Printing Tips</Text>
            </View>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
              • Print on premium cardstock (110lb or higher) for best results
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
              • Use a professional print service for crisp, vibrant colors
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
              • Place at the entrance, on each table, or near the guest book
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20, marginBottom: 8 }}>
              • Consider elegant frames or acrylic stands for display
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20 }}>
              • Always test the QR code scanning before the big day!
            </Text>
          </View>
        </View>

        <View style={{ height: insets.bottom + 100 }} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#000000", borderTopWidth: 1, borderTopColor: "#262626", paddingHorizontal: 20, paddingTop: 16, paddingBottom: insets.bottom + 16 }}
      >
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={handleShare}
            style={{ flex: 1, backgroundColor: "#262626", borderRadius: 12, paddingVertical: 16, marginRight: 8, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons name="share-outline" size={20} color="#FFFFFF" />
            <Text style={{ color: "#F5F5F5", fontWeight: "600", marginLeft: 8 }}>Share</Text>
          </Pressable>

          <Pressable
            onPress={handleSaveToPhotos}
            disabled={isSaving}
            style={{ flex: 1, backgroundColor: "#F5B800", borderRadius: 12, paddingVertical: 16, marginLeft: 8, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
          >
            {isSaving ? (
              <Text style={{ color: "#000000", fontWeight: "600" }}>Saving...</Text>
            ) : (
              <>
                <Ionicons name="download-outline" size={20} color="#000000" />
                <Text style={{ color: "#000000", fontWeight: "600", marginLeft: 8 }}>Save to Photos</Text>
              </>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function QRCodeDesignScreen() {
  // Use try-catch pattern to handle NativeWind's static analysis
  let weddingId = "";

  try {
    const route = useRoute();
    weddingId = (route.params as any)?.weddingId ?? "";
  } catch {
    // Ignore navigation context errors during static analysis
  }

  if (!weddingId) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000000", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#9CA3AF" }}>Loading...</Text>
      </View>
    );
  }

  return <QRCodeDesignContent weddingId={weddingId} />;
}

```

---

### 📄 `./src/screens/GuestRSVPScreen.tsx`

```
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";

type GuestRSVPRouteProp = RouteProp<RootStackParamList, "GuestRSVP">;

type MealType = "standard" | "vegetarian" | "vegan" | "glutenFree" | "other";

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attending: boolean | null;
  plusOne: boolean;
  plusOneName: string;
  mealType: MealType;
  dietaryRestrictions: string;
  message: string;
}

const MEAL_OPTIONS: { value: MealType; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "glutenFree", label: "Gluten-Free" },
  { value: "other", label: "Other" },
];

export default function GuestRSVPScreen() {
  const route = useRoute<GuestRSVPRouteProp>();
  const { rsvpCode } = route.params;
  const scrollViewRef = useRef<ScrollView>(null);

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.qrCode === rsvpCode));
  const addGuest = useWeddingStore((s) => s.addGuest);
  const updateWedding = useWeddingStore((s) => s.updateWedding);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    email: "",
    phone: "",
    attending: null,
    plusOne: false,
    plusOneName: "",
    mealType: "standard",
    dietaryRestrictions: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (formData.attending === null) {
      newErrors.attending = "Please select your attendance";
    }

    if (formData.plusOne && !formData.plusOneName.trim()) {
      newErrors.plusOneName = "Please enter your guest's name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm() || !wedding) return;

    // Create guest record
    const guestId = `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    addGuest({
      id: guestId,
      weddingId: wedding.id,
      name: formData.name.trim(),
      email: formData.email.trim() || undefined,
      phone: formData.phone.trim() || undefined,
      rsvpStatus: formData.attending ? "attending" : "declined",
      plusOne: formData.plusOne,
      plusOneName: formData.plusOneName.trim() || undefined,
      mealType: formData.attending ? formData.mealType : undefined,
      dietaryRestrictions: formData.dietaryRestrictions.trim() || undefined,
      message: formData.message.trim() || undefined,
      category: "other",
      addedAt: new Date().toISOString(),
    });

    // Update wedding stats
    const attendingCount = formData.attending ? (formData.plusOne ? 2 : 1) : 0;
    updateWedding(wedding.id, {
      guestCount: wedding.guestCount + 1,
      rsvpCount: wedding.rsvpCount + attendingCount,
    });

    setSubmitted(true);
  };

  const updateField = <K extends keyof RSVPFormData>(field: K, value: RSVPFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (!wedding) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="close-circle-outline" size={80} color="#EF4444" />
          <Text className="text-neutral-100 text-2xl font-bold mt-6 text-center">
            Invalid RSVP Link
          </Text>
          <Text className="text-neutral-400 text-base mt-3 text-center">
            This RSVP link is not associated with any wedding.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (submitted) {
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1F1F1F", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
          <SafeAreaView className="flex-1 items-center justify-center px-6">
            <View className="items-center">
              <View className="w-24 h-24 bg-emerald-900/30 rounded-full items-center justify-center mb-6">
                <Ionicons
                  name={formData.attending ? "checkmark-circle" : "close-circle"}
                  size={64}
                  color={formData.attending ? "#10B981" : "#F59E0B"}
                />
              </View>

              <Text className="text-neutral-100 text-3xl font-bold text-center mb-3">
                {formData.attending ? "Thank You!" : "Response Received"}
              </Text>

              <Text className="text-neutral-400 text-lg text-center mb-8">
                {formData.attending
                  ? `We can't wait to celebrate with you at ${wedding.coupleName}'s wedding!`
                  : `We're sorry you can't make it. ${wedding.coupleName} will miss you!`}
              </Text>

              {formData.attending && (
                <View className="bg-neutral-900 rounded-2xl p-5 w-full border border-neutral-800">
                  <Text className="text-neutral-300 text-center text-base">
                    <Text className="text-[#F5B800] font-semibold">{wedding.venue}</Text>
                    {"\n"}
                    {format(new Date(wedding.weddingDate), "EEEE, MMMM d, yyyy")}
                  </Text>
                </View>
              )}
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }

  const weddingDate = new Date(wedding.weddingDate);
  const formattedDate = format(weddingDate, "EEEE, MMMM d, yyyy");

  return (
    <View className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            ref={scrollViewRef}
            className="flex-1"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <LinearGradient
              colors={["#1F1F1F", "#000000"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
            >
              <View className="items-center">
                <View className="w-16 h-16 bg-[#F5B800]/10 rounded-full items-center justify-center mb-4">
                  <Ionicons name="mail-open" size={32} color="#F5B800" />
                </View>

                <Text className="text-neutral-400 text-sm uppercase tracking-widest mb-2">
                  You are invited to
                </Text>

                <Text className="text-[#F5B800] text-3xl font-bold text-center mb-2">
                  {wedding.coupleName}
                </Text>

                <Text className="text-neutral-300 text-lg text-center mb-1">{formattedDate}</Text>

                <Text className="text-neutral-500 text-base text-center">{wedding.venue}</Text>
              </View>
            </LinearGradient>

            <View className="px-5 pt-6 pb-8">
              {/* Attendance Selection */}
              <View className="mb-6">
                <Text className="text-neutral-100 text-lg font-semibold mb-4">
                  Will you be attending?
                </Text>

                <View className="flex-row">
                  <Pressable
                    onPress={() => updateField("attending", true)}
                    className={`flex-1 p-4 rounded-2xl mr-3 border ${
                      formData.attending === true
                        ? "bg-emerald-900/30 border-emerald-500"
                        : "bg-neutral-900 border-neutral-800"
                    }`}
                  >
                    <View className="items-center">
                      <Ionicons
                        name="checkmark-circle"
                        size={32}
                        color={formData.attending === true ? "#10B981" : "#666666"}
                      />
                      <Text
                        className={`text-base font-semibold mt-2 ${
                          formData.attending === true ? "text-emerald-400" : "text-neutral-400"
                        }`}
                      >
                        Joyfully Accept
                      </Text>
                    </View>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      updateField("attending", false);
                      updateField("plusOne", false);
                    }}
                    className={`flex-1 p-4 rounded-2xl border ${
                      formData.attending === false
                        ? "bg-amber-900/30 border-amber-500"
                        : "bg-neutral-900 border-neutral-800"
                    }`}
                  >
                    <View className="items-center">
                      <Ionicons
                        name="close-circle"
                        size={32}
                        color={formData.attending === false ? "#F59E0B" : "#666666"}
                      />
                      <Text
                        className={`text-base font-semibold mt-2 ${
                          formData.attending === false ? "text-amber-400" : "text-neutral-400"
                        }`}
                      >
                        Regretfully Decline
                      </Text>
                    </View>
                  </Pressable>
                </View>

                {errors.attending && (
                  <Text className="text-red-400 text-sm mt-2">{errors.attending}</Text>
                )}
              </View>

              {/* Name Input */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">
                  Your Name <Text className="text-red-400">*</Text>
                </Text>
                <TextInput
                  value={formData.name}
                  onChangeText={(text) => updateField("name", text)}
                  placeholder="Enter your full name"
                  placeholderTextColor="#666666"
                  className="bg-neutral-900 rounded-xl p-4 text-neutral-100 border border-neutral-800"
                />
                {errors.name && <Text className="text-red-400 text-sm mt-1">{errors.name}</Text>}
              </View>

              {/* Email Input */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Email</Text>
                <TextInput
                  value={formData.email}
                  onChangeText={(text) => updateField("email", text)}
                  placeholder="your@email.com"
                  placeholderTextColor="#666666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-neutral-900 rounded-xl p-4 text-neutral-100 border border-neutral-800"
                />
              </View>

              {/* Phone Input */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Phone Number</Text>
                <TextInput
                  value={formData.phone}
                  onChangeText={(text) => updateField("phone", text)}
                  placeholder="(555) 123-4567"
                  placeholderTextColor="#666666"
                  keyboardType="phone-pad"
                  className="bg-neutral-900 rounded-xl p-4 text-neutral-100 border border-neutral-800"
                />
              </View>

              {/* Plus One Section - Only show if attending */}
              {formData.attending && (
                <>
                  <View className="mb-5">
                    <Pressable
                      onPress={() => updateField("plusOne", !formData.plusOne)}
                      className="flex-row items-center"
                    >
                      <View
                        className={`w-6 h-6 rounded-md border mr-3 items-center justify-center ${
                          formData.plusOne
                            ? "bg-[#F5B800] border-[#F5B800]"
                            : "border-neutral-600"
                        }`}
                      >
                        {formData.plusOne && <Ionicons name="checkmark" size={18} color="#000000" />}
                      </View>
                      <Text className="text-neutral-100 text-base">I will be bringing a +1</Text>
                    </Pressable>
                  </View>

                  {formData.plusOne && (
                    <View className="mb-5">
                      <Text className="text-neutral-300 text-sm font-medium mb-2">
                        Guest Name <Text className="text-red-400">*</Text>
                      </Text>
                      <TextInput
                        value={formData.plusOneName}
                        onChangeText={(text) => updateField("plusOneName", text)}
                        placeholder="Enter your guest's name"
                        placeholderTextColor="#666666"
                        className="bg-neutral-900 rounded-xl p-4 text-neutral-100 border border-neutral-800"
                      />
                      {errors.plusOneName && (
                        <Text className="text-red-400 text-sm mt-1">{errors.plusOneName}</Text>
                      )}
                    </View>
                  )}

                  {/* Meal Selection */}
                  <View className="mb-5">
                    <Text className="text-neutral-300 text-sm font-medium mb-3">
                      Meal Preference
                    </Text>
                    <View className="flex-row flex-wrap">
                      {MEAL_OPTIONS.map((option) => (
                        <Pressable
                          key={option.value}
                          onPress={() => updateField("mealType", option.value)}
                          className={`px-4 py-2 rounded-full mr-2 mb-2 border ${
                            formData.mealType === option.value
                              ? "bg-[#F5B800]/20 border-[#F5B800]"
                              : "bg-neutral-900 border-neutral-700"
                          }`}
                        >
                          <Text
                            className={`text-sm font-medium ${
                              formData.mealType === option.value
                                ? "text-[#F5B800]"
                                : "text-neutral-400"
                            }`}
                          >
                            {option.label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  {/* Dietary Restrictions */}
                  <View className="mb-5">
                    <Text className="text-neutral-300 text-sm font-medium mb-2">
                      Dietary Restrictions or Allergies
                    </Text>
                    <TextInput
                      value={formData.dietaryRestrictions}
                      onChangeText={(text) => updateField("dietaryRestrictions", text)}
                      placeholder="e.g., nut allergy, lactose intolerant"
                      placeholderTextColor="#666666"
                      multiline
                      numberOfLines={2}
                      className="bg-neutral-900 rounded-xl p-4 text-neutral-100 border border-neutral-800 min-h-[80px]"
                      textAlignVertical="top"
                    />
                  </View>
                </>
              )}

              {/* Message to Couple */}
              <View className="mb-8">
                <Text className="text-neutral-300 text-sm font-medium mb-2">
                  Message for the Couple (Optional)
                </Text>
                <TextInput
                  value={formData.message}
                  onChangeText={(text) => updateField("message", text)}
                  placeholder="Send your well wishes..."
                  placeholderTextColor="#666666"
                  multiline
                  numberOfLines={3}
                  className="bg-neutral-900 rounded-xl p-4 text-neutral-100 border border-neutral-800 min-h-[100px]"
                  textAlignVertical="top"
                />
              </View>

              {/* Submit Button */}
              <Pressable
                onPress={handleSubmit}
                className="bg-[#F5B800] rounded-2xl p-5 items-center active:opacity-70"
              >
                <Text className="text-black text-lg font-bold">Submit RSVP</Text>
              </Pressable>

              <View className="items-center mt-6">
                <Text className="text-neutral-600 text-xs text-center">
                  Your response helps the couple plan their special day
                </Text>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

```

---

### 📄 `./src/screens/StaffManagementScreen.tsx`

```
import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useAdminStore from "../state/adminStore";
import useWeddingStore from "../state/weddingStore";
import { StaffMember } from "../types/wedding";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { Swipeable } from "react-native-gesture-handler";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function StaffManagementScreen() {
  const navigation = useNavigation<NavigationProp>();
  const staffMembers = useAdminStore((s) => s.staffMembers);
  const staffAssignments = useAdminStore((s) => s.staffAssignments);
  const assignStaffToWedding = useAdminStore((s) => s.assignStaffToWedding);
  const unassignStaffFromWedding = useAdminStore((s) => s.unassignStaffFromWedding);
  const deleteStaffMember = useAdminStore((s) => s.deleteStaffMember);
  const weddings = useWeddingStore((s) => s.weddings);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "coordinator" as StaffMember["role"],
    hourlyRate: "",
  });

  const filteredStaff = staffMembers.filter((staff) =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAssignedWeddings = (staffId: string) => {
    const assignments = staffAssignments.filter((a) => a.staffId === staffId);
    return assignments.map((a) => weddings.find((w) => w.id === a.weddingId)).filter(Boolean);
  };

  const addStaffMember = () => {
    if (!newStaff.name.trim()) {
      Alert.alert("Error", "Please enter a name");
      return;
    }

    const staff: StaffMember = {
      id: Date.now().toString(),
      name: newStaff.name.trim(),
      email: newStaff.email.trim() || undefined,
      phone: newStaff.phone.trim() || undefined,
      role: newStaff.role,
      hourlyRate: newStaff.hourlyRate ? parseFloat(newStaff.hourlyRate) : undefined,
    };

    useAdminStore.getState().addStaffMember(staff);
    setNewStaff({ name: "", email: "", phone: "", role: "coordinator", hourlyRate: "" });
    setShowAddModal(false);
  };

  const getRoleColor = (role: StaffMember["role"]) => {
    switch (role) {
      case "planner":
        return "#F5B800";
      case "coordinator":
        return "#60a5fa";
      case "photographer":
        return "#a78bfa";
      case "videographer":
        return "#f472b6";
      case "assistant":
        return "#34d399";
      default:
        return "#9ca3af";
    }
  };

  const renderRightActions = (staffId: string) => {
    return (
      <Pressable
        onPress={() => {
          Alert.alert("Delete Staff Member", "Are you sure you want to delete this staff member?", [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => deleteStaffMember(staffId),
            },
          ]);
        }}
        className="bg-red-600 justify-center items-center px-6 rounded-r-2xl"
      >
        <Ionicons name="trash-outline" size={24} color="white" />
        <Text className="text-white text-xs mt-1 font-medium">Delete</Text>
      </Pressable>
    );
  };

  const handleAssignToWedding = (weddingId: string) => {
    if (!selectedStaff) return;

    const assignment = {
      id: Date.now().toString(),
      weddingId,
      staffId: selectedStaff.id,
      role: selectedStaff.role,
      assignedAt: new Date().toISOString(),
    };

    assignStaffToWedding(assignment);
    Alert.alert("Success", `${selectedStaff.name} assigned to wedding`);
  };

  const handleUnassign = (weddingId: string) => {
    if (!selectedStaff) return;

    const assignment = staffAssignments.find((a) => a.staffId === selectedStaff.id && a.weddingId === weddingId);
    if (assignment) {
      unassignStaffFromWedding(assignment.id);
      Alert.alert("Success", "Staff member unassigned");
    }
  };

  const isAssigned = (staffId: string, weddingId: string) => {
    return staffAssignments.some((a) => a.staffId === staffId && a.weddingId === weddingId);
  };

  // Assignment Modal
  if (selectedStaff) {
    const activeWeddings = weddings.filter((w) => w.status !== "completed");
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1F1F1F", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
        >
          <View className="flex-row items-center justify-between mb-6">
            <Pressable onPress={() => setSelectedStaff(null)}>
              <Ionicons name="arrow-back" size={24} color="#F5B800" />
            </Pressable>
            <Text className="text-[#F5B800] text-xl font-bold">Assign to Wedding</Text>
            <View className="w-6" />
          </View>

          <View className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 mb-4">
            <Text className="text-neutral-100 text-lg font-semibold">{selectedStaff.name}</Text>
            <Text className="text-neutral-400 text-sm capitalize mt-1">{selectedStaff.role}</Text>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          <Text className="text-neutral-400 text-xs font-semibold mb-3">SELECT WEDDING</Text>
          <View className="pb-8">
            {activeWeddings.length === 0 ? (
              <View className="items-center py-12">
                <Text className="text-neutral-500">No active weddings</Text>
              </View>
            ) : (
              activeWeddings.map((wedding, index) => {
                const assigned = isAssigned(selectedStaff.id, wedding.id);
                return (
                  <Pressable
                    key={wedding.id}
                    onPress={() => (assigned ? handleUnassign(wedding.id) : handleAssignToWedding(wedding.id))}
                    className={`rounded-xl p-4 border${index < activeWeddings.length - 1 ? " mb-2" : ""} ${
                      assigned
                        ? "bg-[#F5B800]/10 border-[#F5B800]"
                        : "bg-neutral-900 border-neutral-800"
                    }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        <Text className={`text-base font-semibold ${assigned ? "text-[#F5B800]" : "text-neutral-100"}`}>
                          {wedding.coupleName}
                        </Text>
                        <Text className="text-neutral-500 text-xs mt-1">
                          {format(new Date(wedding.weddingDate), "MMM d, yyyy")}
                        </Text>
                      </View>
                      {assigned && <Ionicons name="checkmark-circle" size={24} color="#F5B800" />}
                    </View>
                  </Pressable>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  if (showAddModal) {
    return (
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={["#1F1F1F", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
        >
          <View className="flex-row items-center justify-between mb-6">
            <Pressable onPress={() => setShowAddModal(false)}>
              <Ionicons name="close" size={28} color="#F5B800" />
            </Pressable>
            <Text className="text-[#F5B800] text-xl font-bold">Add Staff Member</Text>
            <Pressable onPress={addStaffMember} className="bg-[#F5B800] px-4 py-2 rounded-full">
              <Text className="text-black font-semibold">Save</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          <View className="pb-8">
            <View className="mb-4">
              <Text className="text-neutral-400 text-sm mb-2">Name *</Text>
              <TextInput
                value={newStaff.name}
                onChangeText={(text) => setNewStaff({ ...newStaff, name: text })}
                placeholder="Enter name"
                placeholderTextColor="#666666"
                className="bg-neutral-900 text-neutral-100 rounded-2xl p-4 border border-neutral-800"
              />
            </View>

            <View className="mb-4">
              <Text className="text-neutral-400 text-sm mb-2">Email</Text>
              <TextInput
                value={newStaff.email}
                onChangeText={(text) => setNewStaff({ ...newStaff, email: text })}
                placeholder="Enter email"
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCapitalize="none"
                className="bg-neutral-900 text-neutral-100 rounded-2xl p-4 border border-neutral-800"
              />
            </View>

            <View className="mb-4">
              <Text className="text-neutral-400 text-sm mb-2">Phone</Text>
              <TextInput
                value={newStaff.phone}
                onChangeText={(text) => setNewStaff({ ...newStaff, phone: text })}
                placeholder="Enter phone"
                placeholderTextColor="#666666"
                keyboardType="phone-pad"
                className="bg-neutral-900 text-neutral-100 rounded-2xl p-4 border border-neutral-800"
              />
            </View>

            <View className="mb-4">
              <Text className="text-neutral-400 text-sm mb-2">Role</Text>
              <View className="flex-row flex-wrap gap-2">
                {(["planner", "coordinator", "photographer", "videographer", "assistant", "other"] as const).map(
                  (role) => (
                    <Pressable
                      key={role}
                      onPress={() => setNewStaff({ ...newStaff, role })}
                      className={`px-4 py-2 rounded-full ${
                        newStaff.role === role ? "bg-[#F5B800]" : "bg-neutral-800 border border-neutral-700"
                      }`}
                    >
                      <Text
                        className={`text-sm font-medium capitalize ${
                          newStaff.role === role ? "text-black" : "text-neutral-300"
                        }`}
                      >
                        {role}
                      </Text>
                    </Pressable>
                  )
                )}
              </View>
            </View>

            <View>
              <Text className="text-neutral-400 text-sm mb-2">Hourly Rate ($)</Text>
              <TextInput
                value={newStaff.hourlyRate}
                onChangeText={(text) => setNewStaff({ ...newStaff, hourlyRate: text })}
                placeholder="0.00"
                placeholderTextColor="#666666"
                keyboardType="decimal-pad"
                className="bg-neutral-900 text-neutral-100 rounded-2xl p-4 border border-neutral-800"
              />
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
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-[#F5B800] text-3xl font-bold">Staff</Text>
            <Text className="text-neutral-400 text-base mt-1">{filteredStaff.length} members</Text>
          </View>
          <Pressable
            onPress={() => setShowAddModal(true)}
            className="w-12 h-12 bg-[#F5B800] rounded-full items-center justify-center active:opacity-70"
          >
            <Ionicons name="person-add" size={24} color="#000000" />
          </Pressable>
        </View>

        {/* Search */}
        <View className="bg-neutral-900 rounded-2xl p-4 flex-row items-center border border-neutral-800">
          <Ionicons name="search" size={20} color="#666666" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search staff..."
            placeholderTextColor="#666666"
            className="flex-1 text-neutral-100 ml-3 text-base"
          />
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <View className="pb-8">
          {filteredStaff.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Ionicons name="people-outline" size={64} color="#404040" />
              <Text className="text-neutral-500 text-lg mt-4">No staff members</Text>
              <Text className="text-neutral-600 text-sm mt-2">Add your first team member to get started</Text>
            </View>
          ) : (
            filteredStaff.map((staff, index) => {
              const assignedWeddings = getAssignedWeddings(staff.id);
              return (
                <Swipeable
                  key={staff.id}
                  renderRightActions={() => renderRightActions(staff.id)}
                  overshootRight={false}
                >
                  <Pressable
                    onPress={() => setSelectedStaff(staff)}
                    className={`bg-neutral-900 rounded-2xl p-5 border border-neutral-800 active:opacity-70${index < filteredStaff.length - 1 ? " mb-3" : ""}`}
                  >
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="flex-1">
                        <Text className="text-neutral-100 text-lg font-semibold">{staff.name}</Text>
                        <View className="flex-row items-center mt-2">
                          <View
                            className="px-2 py-1 rounded-full"
                            style={{ backgroundColor: `${getRoleColor(staff.role)}20` }}
                          >
                            <Text className="text-xs font-semibold capitalize" style={{ color: getRoleColor(staff.role) }}>
                              {staff.role}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View className="items-end">
                        {staff.hourlyRate && (
                          <Text className="text-[#F5B800] text-base font-semibold">${staff.hourlyRate}/hr</Text>
                        )}
                        <Ionicons name="chevron-forward" size={20} color="#666" className="mt-1" />
                      </View>
                    </View>

                    {(staff.email || staff.phone) && (
                      <View className="mb-3">
                        {staff.email && (
                          <View className={`flex-row items-center${staff.phone ? " mb-1" : ""}`}>
                            <Ionicons name="mail" size={14} color="#666" />
                            <Text className="text-neutral-400 text-sm ml-2">{staff.email}</Text>
                          </View>
                        )}
                        {staff.phone && (
                          <View className="flex-row items-center">
                            <Ionicons name="call" size={14} color="#666" />
                            <Text className="text-neutral-400 text-sm ml-2">{staff.phone}</Text>
                          </View>
                        )}
                      </View>
                    )}

                    {assignedWeddings.length > 0 && (
                      <View className="border-t border-neutral-800 pt-3 mt-3">
                        <Text className="text-neutral-500 text-xs mb-2">ASSIGNED WEDDINGS ({assignedWeddings.length})</Text>
                        {assignedWeddings.slice(0, 2).map((wedding) => (
                          <Text key={wedding?.id} className="text-neutral-300 text-sm">
                            • {wedding?.coupleName}
                          </Text>
                        ))}
                        {assignedWeddings.length > 2 && (
                          <Text className="text-neutral-500 text-xs mt-1">+{assignedWeddings.length - 2} more</Text>
                        )}
                      </View>
                    )}
                  </Pressable>
                </Swipeable>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}

```

---

### 📄 `./src/screens/AdminDashboardScreen.tsx`

```
import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useAdminStore from "../state/adminStore";
import useAuthStore from "../state/authStore";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AdminDashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const invoices = useAdminStore((s) => s.invoices);
  const staffMembers = useAdminStore((s) => s.staffMembers);
  const clockEntries = useAdminStore((s) => s.clockEntries);

  const pendingInvoices = invoices.filter((i) => i.status === "sent" || i.status === "overdue").length;
  const activeStaff = staffMembers.length;
  const activeClockedIn = clockEntries.filter((e) => !e.clockOutTime).length;

  const adminSections = [
    {
      title: "Invoices",
      icon: "receipt" as const,
      screen: "Invoices" as const,
      count: pendingInvoices,
      label: "pending",
      color: "#F5B800",
    },
    {
      title: "Payment Setup",
      icon: "card" as const,
      screen: "BusinessSettings" as const,
      color: "#10b981",
      description: "Configure payment methods",
    },
    {
      title: "Staff Management",
      icon: "people" as const,
      screen: "StaffManagement" as const,
      count: activeStaff,
      label: "members",
      color: "#F5B800",
    },
    {
      title: "Time Tracking",
      icon: "time" as const,
      screen: "TimeTracking" as const,
      count: activeClockedIn,
      label: "clocked in",
      color: "#10b981",
    },
    {
      title: "Email Automation",
      icon: "mail" as const,
      screen: "EmailAutomation" as const,
      color: "#F5B800",
    },
    {
      title: "Calendar",
      icon: "calendar" as const,
      screen: "AdminCalendar" as const,
      color: "#F5B800",
    },
  ];

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-[#F5B800] text-3xl font-bold">Admin</Text>
            <Text className="text-neutral-400 text-base mt-1">Business Management</Text>
          </View>
          <Pressable
            onPress={() => setShowSettingsModal(true)}
            className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center"
          >
            <Ionicons name="settings-outline" size={24} color="#F5B800" />
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <View className="pb-8">
          {adminSections.map((section, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate(section.screen as any)}
              className="bg-neutral-900 rounded-2xl p-5 border border-neutral-800 active:opacity-70 mb-3"
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center">
                  <Ionicons name={section.icon} size={24} color={section.color} />
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-neutral-100 text-lg font-medium">{section.title}</Text>
                  {section.count !== undefined && (
                    <Text className="text-neutral-500 text-sm mt-1">
                      {section.count} {section.label}
                    </Text>
                  )}
                  {section.description && (
                    <Text className="text-neutral-500 text-sm mt-1">
                      {section.description}
                    </Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Quick Stats */}
        <View className="bg-neutral-900 rounded-2xl p-5 mb-8 border border-neutral-800">
          <Text className="text-neutral-100 text-lg font-semibold mb-4">Quick Stats</Text>

          <View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-neutral-400">Total Invoices</Text>
              <Text className="text-neutral-100 font-medium">{invoices.length}</Text>
            </View>

            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-neutral-400">Revenue (Paid)</Text>
              <Text className="text-emerald-400 font-semibold">
                ${invoices.filter((i) => i.status === "paid").reduce((sum, i) => sum + i.total, 0).toLocaleString()}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-neutral-400">Outstanding</Text>
              <Text className="text-amber-400 font-semibold">
                $
                {invoices
                  .filter((i) => i.status === "sent" || i.status === "overdue")
                  .reduce((sum, i) => sum + i.total, 0)
                  .toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Settings Modal */}
      <Modal visible={showSettingsModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/70">
          <View className="bg-neutral-900 rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-neutral-100 text-xl font-bold">Settings</Text>
              <Pressable onPress={() => setShowSettingsModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </Pressable>
            </View>

            {/* User Info */}
            <View className="bg-neutral-800 rounded-xl p-4 mb-4">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-[#F5B800]/20 rounded-full items-center justify-center mr-4">
                  <Ionicons name="person" size={24} color="#F5B800" />
                </View>
                <View>
                  <Text className="text-neutral-100 font-medium text-lg">{user?.name}</Text>
                  <Text className="text-neutral-400 text-sm">{user?.email}</Text>
                </View>
              </View>
            </View>

            {/* Account Type */}
            <View className="bg-neutral-800 rounded-xl p-4 mb-6">
              <View className="flex-row items-center justify-between">
                <Text className="text-neutral-400">Account Type</Text>
                <View className="flex-row items-center">
                  <Ionicons name="camera" size={16} color="#F5B800" />
                  <Text className="text-[#F5B800] font-medium ml-2">Photographer</Text>
                </View>
              </View>
            </View>

            {/* Sign Out Button */}
            <Pressable
              onPress={() => {
                setShowSettingsModal(false);
                signOut();
              }}
              className="bg-red-900/30 rounded-xl py-4 items-center border border-red-900"
            >
              <View className="flex-row items-center">
                <Ionicons name="log-out-outline" size={20} color="#f87171" />
                <Text className="text-red-400 font-semibold ml-2">Sign Out</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

```

---

### 📄 `./src/screens/InvoiceDetailScreen.tsx`

```
import React, { useState, useMemo } from "react";
import { View, Text, Pressable, ScrollView, Modal, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useBusinessStore from "../state/businessStore";
import { InvoiceStatus } from "../types/business";
import { LinearGradient } from "expo-linear-gradient";
import { shareInvoice } from "../utils/invoice-pdf";
import { sendInvoiceEmail } from "../utils/invoice-email";
import * as Haptics from "expo-haptics";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type InvoiceDetailRouteProp = RouteProp<RootStackParamList, "InvoiceDetail">;

const getStatusColor = (status: InvoiceStatus) => {
  switch (status) {
    case "paid":
      return { bg: "bg-emerald-900/30", text: "text-emerald-400", border: "border-emerald-900" };
    case "sent":
      return { bg: "bg-blue-900/30", text: "text-blue-400", border: "border-blue-900" };
    case "viewed":
      return { bg: "bg-purple-900/30", text: "text-purple-400", border: "border-purple-900" };
    case "overdue":
      return { bg: "bg-red-900/30", text: "text-red-400", border: "border-red-900" };
    case "draft":
      return { bg: "bg-neutral-800", text: "text-neutral-400", border: "border-neutral-700" };
    case "cancelled":
      return { bg: "bg-neutral-800", text: "text-neutral-500", border: "border-neutral-700" };
  }
};

export default function InvoiceDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<InvoiceDetailRouteProp>();
  const { invoiceId } = route.params;

  const allInvoices = useBusinessStore((s) => s.invoices);
  const allClients = useBusinessStore((s) => s.clients);
  const settings = useBusinessStore((s) => s.settings);
  const updateInvoice = useBusinessStore((s) => s.updateInvoice);
  const markInvoicePaid = useBusinessStore((s) => s.markInvoicePaid);
  const deleteInvoice = useBusinessStore((s) => s.deleteInvoice);

  const invoice = useMemo(() => allInvoices.find((i) => i.id === invoiceId), [allInvoices, invoiceId]);
  const client = useMemo(
    () => (invoice ? allClients.find((c) => c.id === invoice.clientId) : null),
    [allClients, invoice]
  );

  const [showActionsModal, setShowActionsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate if overdue
  const displayStatus = useMemo(() => {
    if (!invoice) return "draft";
    if (
      invoice.status !== "paid" &&
      invoice.status !== "cancelled" &&
      invoice.dueDate &&
      new Date(invoice.dueDate) < new Date()
    ) {
      return "overdue" as InvoiceStatus;
    }
    return invoice.status;
  }, [invoice]);

  if (!invoice) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Ionicons name="document-text-outline" size={48} color="#666" />
        <Text className="text-neutral-500 mt-4">Invoice not found</Text>
        <Pressable onPress={() => navigation.goBack()} className="mt-4">
          <Text className="text-[#F5B800]">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const statusColors = getStatusColor(displayStatus);

  const handleMarkPaid = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    markInvoicePaid(invoiceId);
    setShowActionsModal(false);
  };

  const handleMarkSent = () => {
    updateInvoice(invoiceId, {
      status: "sent",
      sentDate: new Date().toISOString()
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowActionsModal(false);
  };

  const handleShare = async () => {
    if (!client) return;
    setIsLoading(true);
    try {
      await shareInvoice(invoice, client, settings);
    } catch (error) {
      console.log("Share error:", error);
    }
    setIsLoading(false);
  };

  const handleSendEmail = async () => {
    if (!client) return;
    setIsLoading(true);
    try {
      await sendInvoiceEmail(invoice, client, settings);
      updateInvoice(invoiceId, {
        status: "sent",
        sentDate: new Date().toISOString()
      });
    } catch (error) {
      console.log("Email error:", error);
    }
    setIsLoading(false);
    setShowActionsModal(false);
  };

  const handleDelete = () => {
    deleteInvoice(invoiceId);
    navigation.goBack();
  };

  const handleOpenPaymentLink = (type: string) => {
    const pm = settings.paymentMethods;
    if (!pm) return;

    let url = "";
    switch (type) {
      case "venmo":
        url = pm.venmoLink || `https://venmo.com/u/${pm.venmo}`;
        break;
      case "cashapp":
        url = pm.cashappLink || `https://cash.app/${pm.cashapp}`;
        break;
      case "paypal":
        url = pm.paypalLink || `https://paypal.me/${pm.paypal}`;
        break;
    }

    if (url) {
      Linking.openURL(url);
    }
    setShowPaymentModal(false);
  };

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20 }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#F5B800" />
          </Pressable>
          <Pressable onPress={() => setShowActionsModal(true)}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#F5B800" />
          </Pressable>
        </View>

        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-[#F5B800] text-3xl font-bold">{invoice.invoiceNumber}</Text>
            <Text className="text-neutral-400 mt-1">{invoice.clientName}</Text>
          </View>
          <View className={`px-4 py-2 rounded-full border ${statusColors.bg} ${statusColors.border}`}>
            <Text className={`text-sm font-semibold uppercase ${statusColors.text}`}>
              {displayStatus}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {/* Amount Card */}
        <View className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 mb-4">
          <Text className="text-neutral-400 text-sm mb-2">Amount Due</Text>
          <Text className="text-[#F5B800] text-4xl font-bold">${invoice.total.toFixed(2)}</Text>
          {invoice.dueDate && (
            <View className="flex-row items-center mt-3">
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text className="text-neutral-500 ml-2">
                {displayStatus === "overdue" ? "Was due " : "Due "}
                {new Date(invoice.dueDate).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        {invoice.status !== "paid" && invoice.status !== "cancelled" && (
          <View className="flex-row gap-3 mb-4">
            <Pressable
              onPress={handleMarkPaid}
              className="flex-1 bg-emerald-900/30 border border-emerald-900 rounded-2xl p-4 items-center"
            >
              <Ionicons name="checkmark-circle" size={24} color="#34D399" />
              <Text className="text-emerald-400 font-medium mt-2">Mark Paid</Text>
            </Pressable>
            <Pressable
              onPress={handleSendEmail}
              disabled={isLoading || !client?.email}
              className="flex-1 bg-blue-900/30 border border-blue-900 rounded-2xl p-4 items-center"
            >
              <Ionicons name="mail" size={24} color="#60A5FA" />
              <Text className="text-blue-400 font-medium mt-2">
                {isLoading ? "Sending..." : "Send Email"}
              </Text>
            </Pressable>
          </View>
        )}

        {/* Client Info */}
        {client && (
          <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-4">
            <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3">Client</Text>
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full bg-[#F5B800]/20 items-center justify-center mr-4">
                <Text className="text-[#F5B800] font-bold text-xl">
                  {client.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-neutral-100 font-medium text-lg">{client.name}</Text>
                {client.email && <Text className="text-neutral-500">{client.email}</Text>}
                {client.phone && <Text className="text-neutral-500">{client.phone}</Text>}
              </View>
            </View>
          </View>
        )}

        {/* Line Items */}
        <View className="bg-neutral-900 rounded-2xl border border-neutral-800 mb-4 overflow-hidden">
          <View className="p-4 border-b border-neutral-800">
            <Text className="text-neutral-400 text-xs font-semibold uppercase">Items</Text>
          </View>
          {invoice.items.map((item, index) => (
            <View
              key={index}
              className={`p-4 flex-row items-center justify-between ${
                index < invoice.items.length - 1 ? "border-b border-neutral-800" : ""
              }`}
            >
              <View className="flex-1">
                <Text className="text-neutral-100 font-medium">{item.serviceName}</Text>
                <Text className="text-neutral-500 text-sm">
                  {item.quantity} × ${item.price.toFixed(2)}
                </Text>
              </View>
              <Text className="text-neutral-100 font-semibold">${item.total.toFixed(2)}</Text>
            </View>
          ))}
          {/* Totals */}
          <View className="p-4 bg-neutral-800/50">
            <View className="flex-row justify-between mb-2">
              <Text className="text-neutral-400">Subtotal</Text>
              <Text className="text-neutral-100">${invoice.subtotal.toFixed(2)}</Text>
            </View>
            {invoice.tax && invoice.tax > 0 && (
              <View className="flex-row justify-between mb-2">
                <Text className="text-neutral-400">Tax</Text>
                <Text className="text-neutral-100">${invoice.tax.toFixed(2)}</Text>
              </View>
            )}
            <View className="flex-row justify-between pt-2 border-t border-neutral-700">
              <Text className="text-neutral-100 font-bold">Total</Text>
              <Text className="text-[#F5B800] font-bold text-lg">${invoice.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-4">
            <Text className="text-neutral-400 text-xs font-semibold uppercase mb-2">Notes</Text>
            <Text className="text-neutral-300">{invoice.notes}</Text>
          </View>
        )}

        {/* Payment Methods */}
        {settings.paymentMethods && Object.values(settings.paymentMethods).some((v) => v) && (
          <Pressable
            onPress={() => setShowPaymentModal(true)}
            className="bg-[#F5B800] rounded-2xl p-4 items-center mb-4"
          >
            <Text className="text-black font-bold text-lg">View Payment Options</Text>
          </Pressable>
        )}

        {/* Dates */}
        <View className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800 mb-8">
          <Text className="text-neutral-400 text-xs font-semibold uppercase mb-3">Timeline</Text>
          <View className="flex-row items-center mb-2">
            <Ionicons name="create-outline" size={16} color="#666" />
            <Text className="text-neutral-500 ml-2">
              Created {new Date(invoice.createdAt).toLocaleDateString()}
            </Text>
          </View>
          {invoice.sentDate && (
            <View className="flex-row items-center mb-2">
              <Ionicons name="send-outline" size={16} color="#666" />
              <Text className="text-neutral-500 ml-2">
                Sent {new Date(invoice.sentDate).toLocaleDateString()}
              </Text>
            </View>
          )}
          {invoice.paidDate && (
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle-outline" size={16} color="#34D399" />
              <Text className="text-emerald-400 ml-2">
                Paid {new Date(invoice.paidDate).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Actions Modal */}
      <Modal visible={showActionsModal} transparent animationType="slide">
        <Pressable className="flex-1 bg-black/70" onPress={() => setShowActionsModal(false)}>
          <View className="flex-1 justify-end">
            <View className="bg-neutral-900 rounded-t-3xl p-6">
              <View className="w-10 h-1 bg-neutral-700 rounded-full self-center mb-6" />

              {invoice.status === "draft" && (
                <Pressable
                  onPress={handleMarkSent}
                  className="flex-row items-center py-4 border-b border-neutral-800"
                >
                  <Ionicons name="send" size={22} color="#60A5FA" />
                  <Text className="text-neutral-100 text-lg ml-4">Mark as Sent</Text>
                </Pressable>
              )}

              {invoice.status !== "paid" && invoice.status !== "cancelled" && (
                <Pressable
                  onPress={handleMarkPaid}
                  className="flex-row items-center py-4 border-b border-neutral-800"
                >
                  <Ionicons name="checkmark-circle" size={22} color="#34D399" />
                  <Text className="text-neutral-100 text-lg ml-4">Mark as Paid</Text>
                </Pressable>
              )}

              <Pressable
                onPress={handleShare}
                className="flex-row items-center py-4 border-b border-neutral-800"
              >
                <Ionicons name="share-outline" size={22} color="#F5B800" />
                <Text className="text-neutral-100 text-lg ml-4">Share Invoice</Text>
              </Pressable>

              {client?.email && (
                <Pressable
                  onPress={handleSendEmail}
                  className="flex-row items-center py-4 border-b border-neutral-800"
                >
                  <Ionicons name="mail-outline" size={22} color="#F5B800" />
                  <Text className="text-neutral-100 text-lg ml-4">Send via Email</Text>
                </Pressable>
              )}

              <Pressable
                onPress={() => {
                  setShowActionsModal(false);
                  setShowDeleteModal(true);
                }}
                className="flex-row items-center py-4"
              >
                <Ionicons name="trash-outline" size={22} color="#EF4444" />
                <Text className="text-red-400 text-lg ml-4">Delete Invoice</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* Payment Options Modal */}
      <Modal visible={showPaymentModal} transparent animationType="slide">
        <Pressable className="flex-1 bg-black/70" onPress={() => setShowPaymentModal(false)}>
          <View className="flex-1 justify-end">
            <View className="bg-neutral-900 rounded-t-3xl p-6">
              <View className="w-10 h-1 bg-neutral-700 rounded-full self-center mb-6" />
              <Text className="text-neutral-100 text-xl font-bold mb-4">Payment Options</Text>

              {settings.paymentMethods?.venmo && (
                <Pressable
                  onPress={() => handleOpenPaymentLink("venmo")}
                  className="flex-row items-center py-4 border-b border-neutral-800"
                >
                  <View className="w-10 h-10 rounded-full bg-blue-500 items-center justify-center">
                    <Text className="text-white font-bold">V</Text>
                  </View>
                  <View className="ml-4">
                    <Text className="text-neutral-100 text-lg">Venmo</Text>
                    <Text className="text-neutral-500">{settings.paymentMethods.venmo}</Text>
                  </View>
                </Pressable>
              )}

              {settings.paymentMethods?.cashapp && (
                <Pressable
                  onPress={() => handleOpenPaymentLink("cashapp")}
                  className="flex-row items-center py-4 border-b border-neutral-800"
                >
                  <View className="w-10 h-10 rounded-full bg-green-500 items-center justify-center">
                    <Text className="text-white font-bold">$</Text>
                  </View>
                  <View className="ml-4">
                    <Text className="text-neutral-100 text-lg">Cash App</Text>
                    <Text className="text-neutral-500">{settings.paymentMethods.cashapp}</Text>
                  </View>
                </Pressable>
              )}

              {settings.paymentMethods?.paypal && (
                <Pressable
                  onPress={() => handleOpenPaymentLink("paypal")}
                  className="flex-row items-center py-4 border-b border-neutral-800"
                >
                  <View className="w-10 h-10 rounded-full bg-blue-600 items-center justify-center">
                    <Text className="text-white font-bold">P</Text>
                  </View>
                  <View className="ml-4">
                    <Text className="text-neutral-100 text-lg">PayPal</Text>
                    <Text className="text-neutral-500">{settings.paymentMethods.paypal}</Text>
                  </View>
                </Pressable>
              )}

              {settings.paymentMethods?.zelle && (
                <View className="flex-row items-center py-4 border-b border-neutral-800">
                  <View className="w-10 h-10 rounded-full bg-purple-600 items-center justify-center">
                    <Text className="text-white font-bold">Z</Text>
                  </View>
                  <View className="ml-4">
                    <Text className="text-neutral-100 text-lg">Zelle</Text>
                    <Text className="text-neutral-500">{settings.paymentMethods.zelle}</Text>
                  </View>
                </View>
              )}

              {settings.paymentMethods?.other && (
                <View className="py-4">
                  <Text className="text-neutral-400 text-sm mb-2">Other Instructions</Text>
                  <Text className="text-neutral-100">{settings.paymentMethods.other}</Text>
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View className="flex-1 bg-black/70 items-center justify-center px-6">
          <View className="bg-neutral-900 rounded-2xl p-6 w-full">
            <Text className="text-neutral-100 text-xl font-bold mb-2">Delete Invoice?</Text>
            <Text className="text-neutral-400 mb-6">
              This will permanently delete invoice {invoice.invoiceNumber}. This action cannot be undone.
            </Text>
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setShowDeleteModal(false)}
                className="flex-1 bg-neutral-800 rounded-xl py-3 items-center"
              >
                <Text className="text-neutral-100 font-semibold">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleDelete}
                className="flex-1 bg-red-600 rounded-xl py-3 items-center"
              >
                <Text className="text-white font-semibold">Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

```

---

### 📄 `./src/screens/AddTaskScreen.tsx`

```
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
                <Text className={`text-base font-semibold ${title.trim() ? "text-[#F5B800]" : "text-neutral-600"}`}>
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
                        category === cat.value ? "bg-[#F5B800]" : "bg-neutral-900 border border-neutral-800"
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
                    <Ionicons name="calendar-outline" size={20} color="#F5B800" />
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
                  title.trim() ? "bg-[#F5B800] active:opacity-80" : "bg-neutral-800"
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

```

---

### 📄 `./src/screens/AddGuestScreen.tsx`

```
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type AddGuestRouteProp = RouteProp<RootStackParamList, "AddGuest">;

const CATEGORIES = [
  { label: "Friends", value: "friends", icon: "people" },
  { label: "Family", value: "family", icon: "heart" },
  { label: "Bridal Party", value: "bridal-party", icon: "sparkles" },
  { label: "VIP", value: "vip", icon: "star" },
  { label: "Other", value: "other", icon: "ellipsis-horizontal" },
] as const;

const RSVP_OPTIONS = [
  { label: "Pending", value: "pending", color: "#F59E0B", bg: "bg-amber-900" },
  { label: "Attending", value: "attending", color: "#10B981", bg: "bg-emerald-900" },
  { label: "Declined", value: "declined", color: "#EF4444", bg: "bg-red-900" },
] as const;

export default function AddGuestScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AddGuestRouteProp>();
  const { weddingId } = route.params;
  const insets = useSafeAreaInsets();

  const addGuest = useWeddingStore((s) => s.addGuest);
  const updateWedding = useWeddingStore((s) => s.updateWedding);
  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState("");
  const [category, setCategory] = useState<"family" | "friends" | "bridal-party" | "vip" | "other">("friends");
  const [rsvpStatus, setRsvpStatus] = useState<"pending" | "attending" | "declined">("pending");

  const handleAdd = () => {
    if (!name.trim()) {
      return;
    }

    const newGuest = {
      id: Date.now().toString(),
      weddingId,
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      plusOne,
      plusOneName: plusOne ? plusOneName.trim() || undefined : undefined,
      category,
      rsvpStatus,
      addedAt: new Date().toISOString(),
    };

    addGuest(newGuest);

    if (wedding) {
      const newGuestCount = wedding.guestCount + (plusOne ? 2 : 1);
      const newRsvpCount =
        wedding.rsvpCount + (rsvpStatus === "attending" ? (plusOne ? 2 : 1) : 0);
      updateWedding(weddingId, {
        guestCount: newGuestCount,
        rsvpCount: newRsvpCount,
      });
    }

    navigation.goBack();
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
              <Text className="text-neutral-100 text-lg font-semibold">Add Guest</Text>
              <Pressable
                onPress={handleAdd}
                disabled={!name.trim()}
                className="px-4 py-2"
              >
                <Text className={`text-base font-semibold ${name.trim() ? "text-[#F5B800]" : "text-neutral-600"}`}>
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
              {/* Guest Name */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Guest Name *</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter guest name"
                  placeholderTextColor="#6B7280"
                  className="bg-neutral-900 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-800"
                  returnKeyType="next"
                />
              </View>

              {/* Email */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="guest@email.com"
                  placeholderTextColor="#6B7280"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-neutral-900 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-800"
                  returnKeyType="next"
                />
              </View>

              {/* Phone */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-2">Phone</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="(555) 123-4567"
                  placeholderTextColor="#6B7280"
                  keyboardType="phone-pad"
                  className="bg-neutral-900 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-800"
                  returnKeyType="done"
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
                      className={`flex-row items-center px-4 py-2.5 rounded-full mr-2 mb-2 ${
                        category === cat.value ? "bg-[#F5B800]" : "bg-neutral-900 border border-neutral-800"
                      }`}
                    >
                      <Ionicons
                        name={cat.icon as any}
                        size={16}
                        color={category === cat.value ? "#000000" : "#9CA3AF"}
                      />
                      <Text
                        className={`ml-2 font-medium ${
                          category === cat.value ? "text-black" : "text-neutral-400"
                        }`}
                      >
                        {cat.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* RSVP Status */}
              <View className="mb-5">
                <Text className="text-neutral-300 text-sm font-medium mb-3">RSVP Status</Text>
                <View className="flex-row">
                  {RSVP_OPTIONS.map((option, index) => (
                    <Pressable
                      key={option.value}
                      onPress={() => setRsvpStatus(option.value)}
                      className={`flex-1 py-3 rounded-xl items-center ${
                        index < RSVP_OPTIONS.length - 1 ? "mr-2" : ""
                      } ${
                        rsvpStatus === option.value
                          ? option.bg + " border-2"
                          : "bg-neutral-900 border border-neutral-800"
                      }`}
                      style={rsvpStatus === option.value ? { borderColor: option.color } : {}}
                    >
                      <Text
                        className={`font-semibold ${
                          rsvpStatus === option.value ? "text-white" : "text-neutral-500"
                        }`}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Plus One Toggle */}
              <View className="mb-5">
                <View className="flex-row items-center justify-between bg-neutral-900 rounded-xl px-4 py-4 border border-neutral-800">
                  <View className="flex-1 mr-4">
                    <Text className="text-neutral-100 text-base font-medium">Plus One</Text>
                    <Text className="text-neutral-500 text-sm mt-1">Allow guest to bring a partner</Text>
                  </View>
                  <Switch
                    value={plusOne}
                    onValueChange={setPlusOne}
                    trackColor={{ false: "#404040", true: "#F5B800" }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              </View>

              {/* Plus One Name */}
              {plusOne && (
                <View className="mb-5">
                  <Text className="text-neutral-300 text-sm font-medium mb-2">Plus One Name</Text>
                  <TextInput
                    value={plusOneName}
                    onChangeText={setPlusOneName}
                    placeholder="Enter plus one name (optional)"
                    placeholderTextColor="#6B7280"
                    className="bg-neutral-900 rounded-xl px-4 py-4 text-base text-neutral-100 border border-neutral-800"
                    returnKeyType="done"
                  />
                </View>
              )}

              {/* Add Button at bottom of scroll */}
              <Pressable
                onPress={handleAdd}
                disabled={!name.trim()}
                className={`rounded-xl py-4 items-center mt-4 ${
                  name.trim() ? "bg-[#F5B800] active:opacity-80" : "bg-neutral-800"
                }`}
              >
                <Text className={`text-lg font-semibold ${name.trim() ? "text-black" : "text-neutral-600"}`}>
                  Add Guest
                </Text>
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

```

---

### 📄 `./src/screens/ClientsScreen.tsx`

```
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import useBusinessStore from "../state/businessStore";
import { Client } from "../types/business";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ClientsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const clients = useBusinessStore((s) => s.clients);
  const invoices = useBusinessStore((s) => s.invoices);
  const addClient = useBusinessStore((s) => s.addClient);
  const updateClient = useBusinessStore((s) => s.updateClient);
  const deleteClient = useBusinessStore((s) => s.deleteClient);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [notes, setNotes] = useState("");

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;
    const query = searchQuery.toLowerCase();
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email?.toLowerCase().includes(query) ||
        c.businessName?.toLowerCase().includes(query)
    );
  }, [clients, searchQuery]);

  const getClientStats = (clientId: string) => {
    const clientInvoices = invoices.filter((i) => i.clientId === clientId);
    const totalInvoices = clientInvoices.length;
    const totalSpent = clientInvoices
      .filter((i) => i.status === "paid")
      .reduce((sum, i) => sum + i.total, 0);
    const outstanding = clientInvoices
      .filter((i) => i.status !== "paid" && i.status !== "cancelled")
      .reduce((sum, i) => sum + i.total, 0);
    return { totalInvoices, totalSpent, outstanding };
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setBusinessName("");
    setNotes("");
  };

  const handleAddClient = () => {
    if (!name.trim()) return;

    addClient({
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      businessName: businessName.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    resetForm();
    setShowAddModal(false);
  };

  const handleOpenDetail = (client: Client) => {
    setSelectedClient(client);
    setName(client.name);
    setEmail(client.email || "");
    setPhone(client.phone || "");
    setBusinessName(client.businessName || "");
    setNotes(client.notes || "");
    setShowDetailModal(true);
  };

  const handleUpdateClient = () => {
    if (!selectedClient || !name.trim()) return;

    updateClient(selectedClient.id, {
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      businessName: businessName.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    resetForm();
    setSelectedClient(null);
    setShowDetailModal(false);
  };

  const handleDeleteClient = () => {
    if (!selectedClient) return;
    deleteClient(selectedClient.id);
    resetForm();
    setSelectedClient(null);
    setShowDetailModal(false);
  };

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

        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-[#F5B800] text-3xl font-bold">Clients</Text>
            <Text className="text-neutral-500 text-sm mt-1">
              {clients.length} {clients.length === 1 ? "client" : "clients"}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="bg-[#F5B800] rounded-full w-12 h-12 items-center justify-center"
          >
            <Ionicons name="add" size={28} color="#000000" />
          </Pressable>
        </View>

        {/* Search */}
        <View className="bg-neutral-900 rounded-2xl px-4 py-3 flex-row items-center border border-neutral-800">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search clients..."
            placeholderTextColor="#666"
            className="flex-1 text-neutral-100 ml-3"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </Pressable>
          )}
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {filteredClients.length === 0 ? (
          <View className="items-center justify-center py-16">
            <View className="w-20 h-20 rounded-full bg-neutral-900 items-center justify-center mb-4">
              <Ionicons name="people-outline" size={36} color="#666" />
            </View>
            <Text className="text-neutral-400 text-lg font-medium">
              {searchQuery ? "No clients found" : "No clients yet"}
            </Text>
            <Text className="text-neutral-600 text-sm mt-2 text-center px-8">
              {searchQuery
                ? "Try a different search term"
                : "Add your first client to get started"}
            </Text>
            {!searchQuery && (
              <Pressable
                onPress={() => {
                  resetForm();
                  setShowAddModal(true);
                }}
                className="mt-6 bg-[#F5B800] px-6 py-3 rounded-xl"
              >
                <Text className="text-black font-semibold">Add Client</Text>
              </Pressable>
            )}
          </View>
        ) : (
          filteredClients.map((client) => {
            const stats = getClientStats(client.id);
            return (
              <Pressable
                key={client.id}
                onPress={() => handleOpenDetail(client)}
                className="bg-neutral-900 rounded-2xl p-4 mb-3 border border-neutral-800"
              >
                <View className="flex-row items-center">
                  <View className="w-12 h-12 rounded-full bg-[#F5B800]/20 items-center justify-center mr-4">
                    <Text className="text-[#F5B800] font-bold text-xl">
                      {client.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-neutral-100 font-bold text-lg">{client.name}</Text>
                    {client.businessName && (
                      <Text className="text-neutral-500 text-sm">{client.businessName}</Text>
                    )}
                    {client.email && (
                      <Text className="text-neutral-500 text-sm">{client.email}</Text>
                    )}
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </View>

                {stats.totalInvoices > 0 && (
                  <View className="flex-row mt-3 pt-3 border-t border-neutral-800">
                    <View className="flex-1">
                      <Text className="text-neutral-500 text-xs">Invoices</Text>
                      <Text className="text-neutral-100 font-semibold">{stats.totalInvoices}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-neutral-500 text-xs">Total Paid</Text>
                      <Text className="text-emerald-400 font-semibold">
                        ${stats.totalSpent.toFixed(0)}
                      </Text>
                    </View>
                    {stats.outstanding > 0 && (
                      <View className="flex-1">
                        <Text className="text-neutral-500 text-xs">Outstanding</Text>
                        <Text className="text-[#F5B800] font-semibold">
                          ${stats.outstanding.toFixed(0)}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </Pressable>
            );
          })
        )}

        <View className="h-8" />
      </ScrollView>

      {/* Add Client Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6 max-h-[85%]">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-neutral-100 text-xl font-bold">New Client</Text>
                <Pressable onPress={() => setShowAddModal(false)}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mb-4">
                  <Text className="text-neutral-400 text-sm mb-2">Name *</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Client name"
                    placeholderTextColor="#666"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-neutral-400 text-sm mb-2">Business Name</Text>
                  <TextInput
                    value={businessName}
                    onChangeText={setBusinessName}
                    placeholder="Company or business name"
                    placeholderTextColor="#666"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-neutral-400 text-sm mb-2">Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="email@example.com"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-neutral-400 text-sm mb-2">Phone</Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="(555) 555-5555"
                    placeholderTextColor="#666"
                    keyboardType="phone-pad"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>

                <View className="mb-6">
                  <Text className="text-neutral-400 text-sm mb-2">Notes</Text>
                  <TextInput
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Additional notes..."
                    placeholderTextColor="#666"
                    multiline
                    numberOfLines={3}
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700 min-h-[80px]"
                    textAlignVertical="top"
                  />
                </View>

                <Pressable
                  onPress={handleAddClient}
                  disabled={!name.trim()}
                  className={`rounded-xl p-4 items-center mb-4 ${
                    name.trim() ? "bg-[#F5B800]" : "bg-neutral-800"
                  }`}
                >
                  <Text
                    className={`font-semibold ${name.trim() ? "text-black" : "text-neutral-600"}`}
                  >
                    Add Client
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Client Detail Modal */}
      <Modal visible={showDetailModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6 max-h-[85%]">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-neutral-100 text-xl font-bold">Edit Client</Text>
                <Pressable onPress={() => setShowDetailModal(false)}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="mb-4">
                  <Text className="text-neutral-400 text-sm mb-2">Name *</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Client name"
                    placeholderTextColor="#666"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-neutral-400 text-sm mb-2">Business Name</Text>
                  <TextInput
                    value={businessName}
                    onChangeText={setBusinessName}
                    placeholder="Company or business name"
                    placeholderTextColor="#666"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-neutral-400 text-sm mb-2">Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="email@example.com"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-neutral-400 text-sm mb-2">Phone</Text>
                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="(555) 555-5555"
                    placeholderTextColor="#666"
                    keyboardType="phone-pad"
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700"
                  />
                </View>

                <View className="mb-6">
                  <Text className="text-neutral-400 text-sm mb-2">Notes</Text>
                  <TextInput
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Additional notes..."
                    placeholderTextColor="#666"
                    multiline
                    numberOfLines={3}
                    className="bg-neutral-800 rounded-xl p-4 text-neutral-100 border border-neutral-700 min-h-[80px]"
                    textAlignVertical="top"
                  />
                </View>

                <Pressable
                  onPress={handleUpdateClient}
                  disabled={!name.trim()}
                  className={`rounded-xl p-4 items-center mb-3 ${
                    name.trim() ? "bg-[#F5B800]" : "bg-neutral-800"
                  }`}
                >
                  <Text
                    className={`font-semibold ${name.trim() ? "text-black" : "text-neutral-600"}`}
                  >
                    Save Changes
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleDeleteClient}
                  className="rounded-xl p-4 items-center border border-red-900 bg-red-900/20 mb-4"
                >
                  <Text className="text-red-400 font-semibold">Delete Client</Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

```

---

### 📄 `./src/screens/RSVPLinkScreen.tsx`

```
import React from "react";
import { View, Text, Pressable, ScrollView, Share } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useWeddingStore from "../state/weddingStore";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RSVPLinkRouteProp = RouteProp<RootStackParamList, "RSVPLink">;

export default function RSVPLinkScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RSVPLinkRouteProp>();
  const { weddingId } = route.params;
  const insets = useSafeAreaInsets();

  // Use individual selectors to avoid infinite loops
  const weddings = useWeddingStore((s) => s.weddings);
  const allGuests = useWeddingStore((s) => s.guests);

  // Filter outside selector
  const wedding = weddings.find((w) => w.id === weddingId);
  const guests = allGuests.filter((g) => g.weddingId === weddingId);

  if (!wedding) {
    return (
      <View className="flex-1 bg-black" style={{ paddingTop: insets.top }}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-500">Wedding not found</Text>
        </View>
      </View>
    );
  }

  const rsvpUrl = `https://rsvp.mywedsync.com/${wedding.qrCode}?couple=${encodeURIComponent(wedding.coupleName)}`;

  const handleShare = async () => {
    try {
      const weddingDate = format(new Date(wedding.weddingDate), "MMMM d, yyyy");
      await Share.share({
        message: `You're invited to ${wedding.coupleName}'s wedding on ${weddingDate}!\n\nPlease RSVP here: ${rsvpUrl}`,
        title: "Wedding RSVP",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyLink = async () => {
    await Share.share({
      message: rsvpUrl,
      title: "RSVP Link",
    });
  };

  // Calculate RSVP stats
  const attendingCount = guests.filter((g) => g.rsvpStatus === "attending").length;
  const declinedCount = guests.filter((g) => g.rsvpStatus === "declined").length;
  const pendingCount = guests.filter((g) => g.rsvpStatus === "pending").length;
  const plusOnesCount = guests.filter((g) => g.rsvpStatus === "attending" && g.plusOne).length;

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: insets.top + 10, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <Pressable onPress={() => navigation.goBack()} className="mb-6">
          <Ionicons name="arrow-back" size={24} color="#F5B800" />
        </Pressable>

        <Text className="text-[#F5B800] text-3xl font-bold mb-2">RSVP Link</Text>
        <Text className="text-neutral-400 text-base">Share with your guests</Text>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* QR Code */}
        <View className="items-center py-6">
          <View className="bg-white p-6 rounded-3xl shadow-lg">
            <QRCode value={rsvpUrl} size={200} backgroundColor="white" color="#000000" />
          </View>

          <Text className="text-neutral-300 text-xl font-semibold mt-6 mb-2 text-center">
            {wedding.coupleName}
          </Text>
          <Text className="text-neutral-500 text-sm text-center px-8">
            Guests can scan this QR code or use the link to RSVP
          </Text>
        </View>

        {/* RSVP Stats */}
        <View className="bg-neutral-900 rounded-2xl p-5 mb-6 border border-neutral-800">
          <Text className="text-neutral-100 text-lg font-semibold mb-4">RSVP Summary</Text>

          <View className="flex-row justify-between mb-3">
            <View className="flex-1 items-center">
              <View className="w-12 h-12 bg-emerald-900/30 rounded-full items-center justify-center mb-2">
                <Text className="text-emerald-400 text-xl font-bold">{attendingCount}</Text>
              </View>
              <Text className="text-neutral-400 text-xs">Attending</Text>
            </View>

            <View className="flex-1 items-center">
              <View className="w-12 h-12 bg-amber-900/30 rounded-full items-center justify-center mb-2">
                <Text className="text-amber-400 text-xl font-bold">{declinedCount}</Text>
              </View>
              <Text className="text-neutral-400 text-xs">Declined</Text>
            </View>

            <View className="flex-1 items-center">
              <View className="w-12 h-12 bg-neutral-800 rounded-full items-center justify-center mb-2">
                <Text className="text-neutral-400 text-xl font-bold">{pendingCount}</Text>
              </View>
              <Text className="text-neutral-400 text-xs">Pending</Text>
            </View>

            <View className="flex-1 items-center">
              <View className="w-12 h-12 bg-[#F5B800]/10 rounded-full items-center justify-center mb-2">
                <Text className="text-[#F5B800] text-xl font-bold">{plusOnesCount}</Text>
              </View>
              <Text className="text-neutral-400 text-xs">+1s</Text>
            </View>
          </View>

          <View className="bg-neutral-800 rounded-xl p-3 mt-2">
            <Text className="text-neutral-300 text-center text-sm">
              Total Expected: <Text className="text-[#F5B800] font-bold">{attendingCount + plusOnesCount}</Text> guests
            </Text>
          </View>
        </View>

        {/* How it works */}
        <View className="bg-neutral-900 rounded-2xl p-6 mb-6 border border-neutral-800">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-[#F5B800]/10 rounded-full items-center justify-center mr-3">
              <Ionicons name="mail-open" size={20} color="#F5B800" />
            </View>
            <Text className="text-neutral-100 text-lg font-semibold flex-1">How it works</Text>
          </View>

          <View>
            <View className="flex-row mb-4">
              <Text className="text-[#F5B800] font-bold mr-3">1.</Text>
              <Text className="text-neutral-300 flex-1">Share the RSVP link with your guests via text, email, or social media</Text>
            </View>
            <View className="flex-row mb-4">
              <Text className="text-[#F5B800] font-bold mr-3">2.</Text>
              <Text className="text-neutral-300 flex-1">Guests click the link and fill out the RSVP form on their phone or computer</Text>
            </View>
            <View className="flex-row mb-4">
              <Text className="text-[#F5B800] font-bold mr-3">3.</Text>
              <Text className="text-neutral-300 flex-1">No app download required - it works directly in their browser</Text>
            </View>
            <View className="flex-row">
              <Text className="text-[#F5B800] font-bold mr-3">4.</Text>
              <Text className="text-neutral-300 flex-1">Responses automatically appear in your guest list</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <Pressable
          onPress={handleShare}
          className="bg-[#F5B800] rounded-2xl p-5 flex-row items-center justify-center mb-4"
        >
          <Ionicons name="share-outline" size={24} color="#000000" />
          <Text className="text-black text-lg font-semibold ml-3">Share RSVP Link</Text>
        </Pressable>

        <Pressable
          onPress={handleCopyLink}
          className="bg-neutral-800 rounded-2xl p-5 flex-row items-center justify-center mb-4 border border-neutral-700"
        >
          <Ionicons name="copy-outline" size={24} color="#F5B800" />
          <Text className="text-neutral-100 text-lg font-semibold ml-3">Copy Link</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("GuestRSVP", { rsvpCode: wedding.qrCode })}
          className="bg-neutral-800 rounded-2xl p-5 flex-row items-center justify-center mb-4 border border-neutral-700"
        >
          <Ionicons name="eye-outline" size={24} color="#F5B800" />
          <Text className="text-neutral-100 text-lg font-semibold ml-3">Preview RSVP Form</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("GuestList", { weddingId: wedding.id })}
          className="bg-neutral-900 rounded-2xl p-5 flex-row items-center justify-center mb-8 border border-neutral-800"
        >
          <Ionicons name="people-outline" size={24} color="#F5B800" />
          <Text className="text-neutral-100 text-lg font-semibold ml-3">View Guest List</Text>
        </Pressable>

        <View className="bg-neutral-900/50 rounded-2xl p-4 mb-8 border border-neutral-800/50">
          <Text className="text-neutral-400 text-xs text-center">RSVP Code: {wedding.qrCode}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

```

---

