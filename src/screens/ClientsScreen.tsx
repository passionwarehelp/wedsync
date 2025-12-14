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
