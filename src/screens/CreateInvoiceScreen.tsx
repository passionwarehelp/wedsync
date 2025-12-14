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
import { Client, InvoiceItem, Service } from "../types/business";
import DateTimePicker from "@react-native-community/datetimepicker";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CreateInvoiceScreen() {
  const navigation = useNavigation<NavigationProp>();

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
          <Pressable onPress={() => navigation.goBack()}>
            <Text className="text-neutral-400 text-base">Cancel</Text>
          </Pressable>
          <Text className="text-neutral-100 text-lg font-bold">New Invoice</Text>
          <Pressable onPress={handleCreateInvoice} disabled={!canCreate}>
            <Text className={`text-base font-semibold ${canCreate ? "text-[#F5B800]" : "text-neutral-600"}`}>
              Create
            </Text>
          </Pressable>
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

        <View className="h-12" />
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
