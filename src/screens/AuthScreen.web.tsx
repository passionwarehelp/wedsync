import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../lib/useAuth";

type AuthMode = "welcome" | "login" | "about" | "secret-login";

export default function AuthScreen() {
  const { signIn: authSignIn, isPending, error: authError } = useAuth();

  const [mode, setMode] = useState<AuthMode>("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Easter egg state
  const [heartClickCount, setHeartClickCount] = useState(0);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [secretPassword, setSecretPassword] = useState("");
  const [secretError, setSecretError] = useState("");
  const heartClickTimer = useRef<NodeJS.Timeout | null>(null);

  // Input refs for focus management
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const nameInputRef = useRef<TextInput>(null);

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

  // Easter egg: Heart click handler
  const handleHeartClick = () => {
    const newCount = heartClickCount + 1;
    setHeartClickCount(newCount);

    // Reset counter after 3 seconds of no clicks
    if (heartClickTimer.current) {
      clearTimeout(heartClickTimer.current);
    }
    heartClickTimer.current = setTimeout(() => {
      setHeartClickCount(0);
    }, 3000);

    // Show secret modal after 7 clicks
    if (newCount >= 7) {
      setShowSecretModal(true);
      setHeartClickCount(0);
      if (heartClickTimer.current) {
        clearTimeout(heartClickTimer.current);
      }
    }
  };

  // Secret password check
  const handleSecretSubmit = () => {
    if (secretPassword.toUpperCase() === "WED123") {
      setShowSecretModal(false);
      setSecretPassword("");
      setSecretError("");
      // Auto-fill admin credentials
      setEmail("appletester@gmail.com");
      setPassword("Wed123");
      setMode("secret-login");
    } else {
      setSecretError("Incorrect password");
    }
  };

  // Welcome Screen
  if (mode === "welcome") {
    return (
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        <LinearGradient
          colors={["#1a1a1a", "#000000"]}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 60,
              paddingHorizontal: 24,
              maxWidth: 600,
              marginHorizontal: "auto",
              width: "100%",
            }}
          >
            {/* Logo/Brand with Easter Egg */}
            <View style={{ alignItems: "center", marginBottom: 48 }}>
              <Pressable
                onPress={handleHeartClick}
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  backgroundColor: "rgba(245, 184, 0, 0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                }}
              >
                <Ionicons name="heart" size={48} color="#F5B800" />
              </Pressable>
              <Text style={{ color: "#F5B800", fontSize: 40, fontWeight: "bold" }}>WedSync</Text>
              <Text style={{ color: "#9CA3AF", fontSize: 18, marginTop: 8, textAlign: "center" }}>
                Your wedding, perfectly organized
              </Text>
            </View>

            {/* Features */}
            <View style={{ marginBottom: 48, width: "100%" }}>
              {[
                { icon: "videocam", text: "Professional media management" },
                { icon: "people", text: "Guest list & RSVP tracking" },
                { icon: "grid", text: "Seating chart builder" },
                { icon: "qr-code", text: "QR code media sharing" },
              ].map((feature, index) => (
                <View key={index} style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "rgba(245, 184, 0, 0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 16
                  }}>
                    <Ionicons name={feature.icon as any} size={20} color="#F5B800" />
                  </View>
                  <Text style={{ color: "#D1D5DB", fontSize: 16 }}>{feature.text}</Text>
                </View>
              ))}
            </View>

            {/* Buttons */}
            <View style={{ width: "100%", maxWidth: 400 }}>
              <Pressable
                onPress={() => setMode("about")}
                style={({ pressed }) => ({
                  backgroundColor: "#F5B800",
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: "center",
                  marginBottom: 16,
                  opacity: pressed ? 0.8 : 1,
                  cursor: "pointer",
                })}
              >
                <Text style={{ color: "#000000", fontSize: 18, fontWeight: "600" }}>Get Started</Text>
              </Pressable>

              <Pressable
                onPress={() => setMode("login")}
                style={({ pressed }) => ({
                  borderWidth: 1,
                  borderColor: "#F5B800",
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: "center",
                  opacity: pressed ? 0.8 : 1,
                  cursor: "pointer",
                })}
              >
                <Text style={{ color: "#F5B800", fontSize: 18, fontWeight: "600" }}>I already have an account</Text>
              </Pressable>
            </View>
          </ScrollView>

          {/* Secret Password Modal */}
          <Modal
            visible={showSecretModal}
            transparent
            animationType="fade"
            onRequestClose={() => setShowSecretModal(false)}
          >
            <View style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.8)",
              justifyContent: "center",
              alignItems: "center",
              padding: 24,
            }}>
              <View style={{
                backgroundColor: "#1F1F1F",
                borderRadius: 24,
                padding: 32,
                width: "100%",
                maxWidth: 400,
                alignItems: "center",
              }}>
                <Ionicons name="key" size={48} color="#F5B800" style={{ marginBottom: 16 }} />
                <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
                  Secret Access
                </Text>
                <Text style={{ color: "#9CA3AF", fontSize: 14, textAlign: "center", marginBottom: 24 }}>
                  Enter the secret password to unlock admin access
                </Text>

                {secretError ? (
                  <View style={{
                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                    borderWidth: 1,
                    borderColor: "rgba(239, 68, 68, 0.5)",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    marginBottom: 16,
                    width: "100%",
                  }}>
                    <Text style={{ color: "#F87171", fontSize: 14 }}>{secretError}</Text>
                  </View>
                ) : null}

                <View style={{
                  backgroundColor: "#171717",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#404040",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: 24,
                }}>
                  <TextInput
                    value={secretPassword}
                    onChangeText={(text) => {
                      setSecretPassword(text);
                      setSecretError("");
                    }}
                    placeholder="Enter password"
                    placeholderTextColor="#6B7280"
                    secureTextEntry
                    autoFocus
                    onSubmitEditing={handleSecretSubmit}
                    style={{
                      flex: 1,
                      paddingHorizontal: 16,
                      paddingVertical: 16,
                      fontSize: 16,
                      color: "#FFFFFF",
                    } as any}
                  />
                </View>

                <View style={{ flexDirection: "row", width: "100%", gap: 12 }}>
                  <Pressable
                    onPress={() => {
                      setShowSecretModal(false);
                      setSecretPassword("");
                      setSecretError("");
                    }}
                    style={({ pressed }) => ({
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "#404040",
                      borderRadius: 12,
                      paddingVertical: 14,
                      alignItems: "center",
                      opacity: pressed ? 0.8 : 1,
                      cursor: "pointer",
                    })}
                  >
                    <Text style={{ color: "#9CA3AF", fontSize: 16, fontWeight: "600" }}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleSecretSubmit}
                    style={({ pressed }) => ({
                      flex: 1,
                      backgroundColor: "#F5B800",
                      borderRadius: 12,
                      paddingVertical: 14,
                      alignItems: "center",
                      opacity: pressed ? 0.8 : 1,
                      cursor: "pointer",
                    })}
                  >
                    <Text style={{ color: "#000000", fontSize: 16, fontWeight: "600" }}>Unlock</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </LinearGradient>
      </View>
    );
  }

  // About Screen (Get Started leads here on web)
  if (mode === "about") {
    return (
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        <LinearGradient
          colors={["#1a1a1a", "#000000"]}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 60,
              paddingHorizontal: 24,
              maxWidth: 700,
              marginHorizontal: "auto",
              width: "100%",
            }}
          >
            {/* Back Button */}
            <View style={{ width: "100%", marginBottom: 32 }}>
              <Pressable
                onPress={() => setMode("welcome")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                  cursor: "pointer",
                })}
              >
                <Ionicons name="arrow-back" size={28} color="#F5B800" />
              </Pressable>
            </View>

            {/* App Store Message */}
            <View style={{
              backgroundColor: "#1F1F1F",
              borderRadius: 24,
              padding: 40,
              width: "100%",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#333333",
            }}>
              <View style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "rgba(245, 184, 0, 0.2)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
              }}>
                <Ionicons name="phone-portrait" size={40} color="#F5B800" />
              </View>

              <Text style={{
                color: "#FFFFFF",
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 16,
              }}>
                Download WedSync
              </Text>

              <Text style={{
                color: "#9CA3AF",
                fontSize: 16,
                textAlign: "center",
                lineHeight: 24,
                marginBottom: 32,
                maxWidth: 500,
              }}>
                To create an account and access all WedSync features, please download our app from the Apple App Store or Google Play Store. The mobile app provides the best experience for managing your wedding planning.
              </Text>

              {/* Divider */}
              <View style={{
                width: "100%",
                height: 1,
                backgroundColor: "#333333",
                marginBottom: 24
              }} />

              {/* What is WedSync */}
              <Text style={{
                color: "#F5B800",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 16,
              }}>
                What is WedSync?
              </Text>

              <View style={{ width: "100%" }}>
                {[
                  { icon: "videocam", title: "Media Management", desc: "Professional-grade photo and video organization and sharing for wedding videographers and couples." },
                  { icon: "people", title: "Guest Management", desc: "Easily manage your guest list, track RSVPs, and send invitations." },
                  { icon: "grid", title: "Seating Charts", desc: "Create beautiful seating arrangements with our intuitive drag-and-drop builder." },
                  { icon: "qr-code", title: "QR Media Sharing", desc: "Let guests upload photos and videos directly to your wedding gallery via QR codes." },
                ].map((item, index) => (
                  <View key={index} style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: 20,
                  }}>
                    <View style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: "rgba(245, 184, 0, 0.1)",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 16
                    }}>
                      <Ionicons name={item.icon as any} size={22} color="#F5B800" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600", marginBottom: 4 }}>
                        {item.title}
                      </Text>
                      <Text style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 20 }}>
                        {item.desc}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Already have account */}
            <View style={{ flexDirection: "row", marginTop: 32 }}>
              <Text style={{ color: "#6B7280" }}>Already have an account? </Text>
              <Pressable
                onPress={() => setMode("login")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                  cursor: "pointer",
                })}
              >
                <Text style={{ color: "#F5B800", fontWeight: "600" }}>Sign In</Text>
              </Pressable>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }

  // Login Form (for existing users and secret login)
  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <LinearGradient
        colors={["#1a1a1a", "#000000"]}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 60,
            paddingHorizontal: 24,
            maxWidth: 500,
            marginHorizontal: "auto",
            width: "100%",
          }}
        >
          {/* Back Button */}
          <View style={{ width: "100%", marginBottom: 32 }}>
            <Pressable
              onPress={() => setMode("welcome")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                cursor: "pointer",
              })}
            >
              <Ionicons name="arrow-back" size={28} color="#F5B800" />
            </Pressable>
          </View>

          {/* Header */}
          <View style={{ width: "100%", marginBottom: 32 }}>
            <Text style={{ color: "#F3F4F6", fontSize: 32, fontWeight: "bold", marginBottom: 8 }}>
              {mode === "secret-login" ? "Admin Access" : "Welcome back"}
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 16 }}>
              {mode === "secret-login"
                ? "Sign in with your admin credentials"
                : "Sign in to continue to WedSync"}
            </Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View style={{
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              borderWidth: 1,
              borderColor: "rgba(239, 68, 68, 0.5)",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              marginBottom: 16,
              width: "100%",
            }}>
              <Text style={{ color: "#F87171", fontSize: 14 }}>{error}</Text>
            </View>
          ) : null}

          {/* Email Field */}
          <View style={{ width: "100%", marginBottom: 16 }}>
            <Text style={{ color: "#D1D5DB", fontSize: 14, fontWeight: "500", marginBottom: 8 }}>Email</Text>
            <View style={{
              backgroundColor: "#171717",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#404040",
              flexDirection: "row",
              alignItems: "center",
            }}>
              <View style={{ paddingLeft: 16 }}>
                <Ionicons name="mail-outline" size={20} color="#6B7280" />
              </View>
              <TextInput
                ref={emailInputRef}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError("");
                }}
                placeholder="Enter your email"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                style={{
                  flex: 1,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  fontSize: 16,
                  color: "#F3F4F6",
                } as any}
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={{ width: "100%", marginBottom: 24 }}>
            <Text style={{ color: "#D1D5DB", fontSize: 14, fontWeight: "500", marginBottom: 8 }}>Password</Text>
            <View style={{
              backgroundColor: "#171717",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#404040",
              flexDirection: "row",
              alignItems: "center",
            }}>
              <View style={{ paddingLeft: 16 }}>
                <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
              </View>
              <TextInput
                ref={passwordInputRef}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError("");
                }}
                placeholder="Enter your password"
                placeholderTextColor="#6B7280"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                returnKeyType="done"
                onSubmitEditing={handleSignIn}
                style={{
                  flex: 1,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  fontSize: 16,
                  color: "#F3F4F6",
                } as any}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={({ pressed }) => ({
                  paddingRight: 16,
                  opacity: pressed ? 0.7 : 1,
                  cursor: "pointer",
                })}
              >
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
            onPress={handleSignIn}
            disabled={isPending}
            style={({ pressed }) => ({
              backgroundColor: isPending ? "rgba(245, 184, 0, 0.5)" : "#F5B800",
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: "center",
              marginBottom: 24,
              width: "100%",
              opacity: pressed && !isPending ? 0.8 : 1,
            } as any)}
          >
            {isPending ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={{ color: "#000000", fontSize: 18, fontWeight: "600" }}>Sign In</Text>
            )}
          </Pressable>

          {/* Toggle to About */}
          {mode !== "secret-login" && (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#6B7280" }}>{"Don't have an account? "}</Text>
              <Pressable
                onPress={() => setMode("about")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.7 : 1,
                  cursor: "pointer",
                })}
              >
                <Text style={{ color: "#F5B800", fontWeight: "600" }}>Learn More</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
