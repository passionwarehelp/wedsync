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
            onPress={() => navigation.navigate("CreateInvoice" as any)}
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
                onPress={() => navigation.navigate("CreateInvoice" as any)}
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
