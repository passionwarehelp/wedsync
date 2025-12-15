import { useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import RootNavigator from "./src/navigation/RootNavigator";
import Splash from "./src/components/Splash";
import { View, Text, Platform } from "react-native";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("[App] Platform:", Platform.OS);
    console.log("[App] Initializing app...");
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000000", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <Text style={{ color: "#FF0000", fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Error Loading App</Text>
        <Text style={{ color: "#FFFFFF", fontSize: 14, textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  if (!appIsReady) {
    return (
      <Splash
        onReady={() => {
          console.log("[App] Splash screen ready, showing main app");
          setAppIsReady(true);
        }}
      />
    );
  }

  try {
    return (
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <SafeAreaProvider>
          <NavigationContainer
            linking={{
              prefixes: ["wedsync://", "https://mywedsync.com", "https://www.mywedsync.com"],
              config: {
                screens: {
                  Auth: "",
                  ClientDashboard: "dashboard",
                  GuestUpload: "upload/:qrCode",
                },
              },
            }}
            onReady={() => console.log("[Navigation] Ready")}
            onStateChange={(state) => console.log("[Navigation] State changed:", state?.routes?.[0]?.name)}
          >
            <RootNavigator />
            <StatusBar style="light" />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  } catch (err) {
    console.error("[App] Render error:", err);
    setError(err instanceof Error ? err.message : "Unknown error");
    return (
      <View style={{ flex: 1, backgroundColor: "#000000", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <Text style={{ color: "#FF0000", fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Render Error</Text>
        <Text style={{ color: "#FFFFFF", fontSize: 14, textAlign: "center" }}>{err instanceof Error ? err.message : "Unknown error"}</Text>
      </View>
    );
  }
}
