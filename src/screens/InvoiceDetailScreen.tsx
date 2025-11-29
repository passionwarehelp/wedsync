import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useAdminStore from "../state/adminStore";
import { Invoice, InvoiceItem } from "../types/wedding";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type InvoiceDetailRouteProp = RouteProp<RootStackParamList, "InvoiceDetail">;

export default function InvoiceDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<InvoiceDetailRouteProp>();
  const { invoiceId } = route.params;

  const invoice = useAdminStore((s) => s.invoices.find((i) => i.id === invoiceId));
  const updateInvoice = useAdminStore((s) => s.updateInvoice);
  const deleteInvoice = useAdminStore((s) => s.deleteInvoice);

  const [clientName, setClientName] = useState(invoice?.clientName || "");
  const [clientEmail, setClientEmail] = useState(invoice?.clientEmail || "");
  const [items, setItems] = useState<InvoiceItem[]>(invoice?.items || []);
  const [dueDate, setDueDate] = useState(new Date(invoice?.dueDate || Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notes, setNotes] = useState(invoice?.notes || "");
  const [taxRate, setTaxRate] = useState("10");

  if (!invoice) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-neutral-500">Invoice not found</Text>
      </View>
    );
  }

  const addLineItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const updateLineItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === "quantity" || field === "rate") {
            updated.amount = updated.quantity * updated.rate;
          }
          return updated;
        }
        return item;
      })
    );
  };

  const removeLineItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * (parseFloat(taxRate) / 100);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const saveInvoice = () => {
    if (!clientName.trim()) {
      Alert.alert("Error", "Please enter client name");
      return;
    }

    const { subtotal, tax, total } = calculateTotals();

    updateInvoice(invoice.id, {
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim() || undefined,
      items,
      dueDate: dueDate.toISOString(),
      notes: notes.trim() || undefined,
      subtotal,
      tax,
      total,
    });

    Alert.alert("Success", "Invoice saved successfully");
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert("Delete Invoice", "Are you sure you want to delete this invoice?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteInvoice(invoice.id);
          navigation.goBack();
        },
      },
    ]);
  };

  const handleStatusChange = (status: Invoice["status"]) => {
    updateInvoice(invoice.id, { status });
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1F1F1F", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color="#C9A961" />
          </Pressable>
          <Text className="text-[#C9A961] text-xl font-bold">{invoice.invoiceNumber}</Text>
          <Pressable onPress={handleDelete}>
            <Ionicons name="trash-outline" size={24} color="#ef4444" />
          </Pressable>
        </View>

        <View className="flex-row space-x-2 mb-4">
          {(["draft", "sent", "paid", "overdue", "cancelled"] as const).map((status) => (
            <Pressable
              key={status}
              onPress={() => handleStatusChange(status)}
              className={`px-3 py-2 rounded-full ${
                invoice.status === status ? "bg-[#C9A961]" : "bg-neutral-800 border border-neutral-700"
              }`}
            >
              <Text
                className={`text-xs font-semibold capitalize ${
                  invoice.status === status ? "text-black" : "text-neutral-300"
                }`}
              >
                {status}
              </Text>
            </Pressable>
          ))}
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="space-y-4 pb-8">
          {/* Client Info */}
          <View>
            <Text className="text-neutral-400 text-sm mb-2">Client Name *</Text>
            <TextInput
              value={clientName}
              onChangeText={setClientName}
              placeholder="Enter client name"
              placeholderTextColor="#666666"
              className="bg-neutral-900 text-neutral-100 rounded-xl p-4 border border-neutral-800"
            />
          </View>

          <View>
            <Text className="text-neutral-400 text-sm mb-2">Client Email</Text>
            <TextInput
              value={clientEmail}
              onChangeText={setClientEmail}
              placeholder="client@example.com"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-neutral-900 text-neutral-100 rounded-xl p-4 border border-neutral-800"
            />
          </View>

          {/* Due Date */}
          <View>
            <Text className="text-neutral-400 text-sm mb-2">Due Date</Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="bg-neutral-900 rounded-xl p-4 border border-neutral-800"
            >
              <Text className="text-neutral-100 text-base">{format(dueDate, "MMMM d, yyyy")}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display="inline"
                themeVariant="dark"
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) setDueDate(date);
                }}
              />
            )}
          </View>

          {/* Line Items */}
          <View>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-neutral-100 text-lg font-semibold">Items</Text>
              <Pressable onPress={addLineItem} className="bg-[#C9A961] px-4 py-2 rounded-full">
                <Text className="text-black font-semibold text-sm">Add Item</Text>
              </Pressable>
            </View>

            {items.length === 0 ? (
              <View className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 items-center">
                <Ionicons name="receipt-outline" size={32} color="#404040" />
                <Text className="text-neutral-500 text-sm mt-2">No items added yet</Text>
              </View>
            ) : (
              <View className="space-y-2">
                {items.map((item, index) => (
                  <View key={item.id} className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
                    <View className="flex-row items-center justify-between mb-3">
                      <Text className="text-neutral-400 text-xs">ITEM {index + 1}</Text>
                      <Pressable onPress={() => removeLineItem(item.id)}>
                        <Ionicons name="close-circle" size={20} color="#ef4444" />
                      </Pressable>
                    </View>

                    <TextInput
                      value={item.description}
                      onChangeText={(text) => updateLineItem(item.id, "description", text)}
                      placeholder="Description"
                      placeholderTextColor="#666666"
                      className="bg-neutral-800 text-neutral-100 rounded-lg p-3 mb-2 border border-neutral-700"
                    />

                    <View className="flex-row space-x-2">
                      <View className="flex-1">
                        <Text className="text-neutral-500 text-xs mb-1">Quantity</Text>
                        <TextInput
                          value={item.quantity.toString()}
                          onChangeText={(text) => updateLineItem(item.id, "quantity", parseFloat(text) || 0)}
                          placeholder="0"
                          placeholderTextColor="#666666"
                          keyboardType="numeric"
                          className="bg-neutral-800 text-neutral-100 rounded-lg p-3 border border-neutral-700"
                        />
                      </View>

                      <View className="flex-1">
                        <Text className="text-neutral-500 text-xs mb-1">Rate ($)</Text>
                        <TextInput
                          value={item.rate.toString()}
                          onChangeText={(text) => updateLineItem(item.id, "rate", parseFloat(text) || 0)}
                          placeholder="0.00"
                          placeholderTextColor="#666666"
                          keyboardType="decimal-pad"
                          className="bg-neutral-800 text-neutral-100 rounded-lg p-3 border border-neutral-700"
                        />
                      </View>

                      <View className="flex-1">
                        <Text className="text-neutral-500 text-xs mb-1">Amount</Text>
                        <View className="bg-neutral-800 rounded-lg p-3 border border-neutral-700 justify-center">
                          <Text className="text-[#C9A961] font-semibold">${item.amount.toFixed(2)}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Totals */}
          <View className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
            <View className="flex-row justify-between mb-2">
              <Text className="text-neutral-400">Subtotal</Text>
              <Text className="text-neutral-100 font-semibold">${subtotal.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center">
                <Text className="text-neutral-400 mr-2">Tax</Text>
                <TextInput
                  value={taxRate}
                  onChangeText={setTaxRate}
                  keyboardType="decimal-pad"
                  className="bg-neutral-800 text-neutral-100 rounded px-2 py-1 w-16 text-sm border border-neutral-700"
                />
                <Text className="text-neutral-400 ml-1">%</Text>
              </View>
              <Text className="text-neutral-100 font-semibold">${tax.toFixed(2)}</Text>
            </View>

            <View className="border-t border-neutral-800 pt-3 mt-1">
              <View className="flex-row justify-between">
                <Text className="text-neutral-100 text-lg font-bold">Total</Text>
                <Text className="text-[#C9A961] text-xl font-bold">${total.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* Notes */}
          <View>
            <Text className="text-neutral-400 text-sm mb-2">Notes</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Additional notes..."
              placeholderTextColor="#666666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="bg-neutral-900 text-neutral-100 rounded-xl p-4 border border-neutral-800"
              style={{ minHeight: 100 }}
            />
          </View>

          {/* Save Button */}
          <Pressable onPress={saveInvoice} className="bg-[#C9A961] rounded-2xl p-5 items-center active:opacity-70">
            <Text className="text-black text-lg font-bold">Save Invoice</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
