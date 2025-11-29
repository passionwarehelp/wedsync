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
