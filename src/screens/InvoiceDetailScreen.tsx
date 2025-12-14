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
