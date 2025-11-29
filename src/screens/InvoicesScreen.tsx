import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import useAdminStore from "../state/adminStore";
import { Invoice } from "../types/wedding";
import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function InvoicesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const invoices = useAdminStore((s) => s.invoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | Invoice["status"]>("all");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "text-emerald-400";
      case "sent":
        return "text-blue-400";
      case "overdue":
        return "text-red-400";
      case "draft":
        return "text-neutral-500";
      case "cancelled":
        return "text-neutral-600";
      default:
        return "text-neutral-400";
    }
  };

  const getStatusBg = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "bg-emerald-900/30";
      case "sent":
        return "bg-blue-900/30";
      case "overdue":
        return "bg-red-900/30";
      case "draft":
        return "bg-neutral-800/30";
      case "cancelled":
        return "bg-neutral-700/30";
      default:
        return "bg-neutral-800/30";
    }
  };

  const createNewInvoice = () => {
    // Create a new draft invoice
    const newInvoice: Invoice = {
      id: Date.now().toString(),
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      invoiceDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      clientName: "",
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      status: "draft",
    };
    useAdminStore.getState().addInvoice(newInvoice);
    navigation.navigate("InvoiceDetail" as any, { invoiceId: newInvoice.id });
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
          <Ionicons name="arrow-back" size={24} color="#C9A961" />
        </Pressable>

        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-[#C9A961] text-3xl font-bold">Invoices</Text>
            <Text className="text-neutral-400 text-base mt-1">{filteredInvoices.length} total</Text>
          </View>
          <Pressable
            onPress={createNewInvoice}
            className="w-12 h-12 bg-[#C9A961] rounded-full items-center justify-center active:opacity-70"
          >
            <Ionicons name="add" size={28} color="#000000" />
          </Pressable>
        </View>

        {/* Search */}
        <View className="bg-neutral-900 rounded-2xl p-4 flex-row items-center border border-neutral-800">
          <Ionicons name="search" size={20} color="#666666" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search invoices..."
            placeholderTextColor="#666666"
            className="flex-1 text-neutral-100 ml-3 text-base"
          />
        </View>
      </LinearGradient>

      {/* Status Filter */}
      <View className="px-5 py-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            {(["all", "draft", "sent", "paid", "overdue", "cancelled"] as const).map((status) => (
              <Pressable
                key={status}
                onPress={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-full ${
                  filterStatus === status ? "bg-[#C9A961]" : "bg-neutral-800 border border-neutral-700"
                }`}
              >
                <Text
                  className={`text-xs font-semibold capitalize ${
                    filterStatus === status ? "text-black" : "text-neutral-300"
                  }`}
                >
                  {status}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="space-y-2 pb-8">
          {filteredInvoices.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Ionicons name="receipt-outline" size={64} color="#404040" />
              <Text className="text-neutral-500 text-lg mt-4">No invoices found</Text>
              <Text className="text-neutral-600 text-sm mt-2 text-center px-8">
                {searchQuery ? "Try adjusting your search" : "Create your first invoice to get started"}
              </Text>
            </View>
          ) : (
            filteredInvoices.map((invoice) => (
              <Pressable
                key={invoice.id}
                onPress={() => navigation.navigate("InvoiceDetail" as any, { invoiceId: invoice.id })}
                className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 active:opacity-70"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 mr-3">
                    <Text className="text-neutral-100 text-base font-semibold">
                      {invoice.clientName || "Unnamed Client"}
                    </Text>
                    <View className="flex-row items-center mt-1 space-x-2">
                      <Text className="text-neutral-500 text-xs">{invoice.invoiceNumber}</Text>
                      <Text className="text-neutral-700">•</Text>
                      <Text className="text-neutral-500 text-xs">Due {format(new Date(invoice.dueDate), "MMM d")}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-[#C9A961] text-lg font-bold">${invoice.total.toLocaleString()}</Text>
                    <View className={`px-2 py-0.5 rounded-full mt-1 ${getStatusBg(invoice.status)}`}>
                      <Text className={`text-[10px] font-semibold uppercase ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
