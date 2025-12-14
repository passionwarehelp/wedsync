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
