import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";
import useWeddingStore from "../state/weddingStore";
import { format } from "date-fns";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type CoupleNotesRouteProp = RouteProp<RootStackParamList, "CoupleNotes">;

interface Note {
  id: string;
  weddingId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  color: string;
}

const NOTE_COLORS = [
  "#C9A961", // Gold
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Purple
];

export default function CoupleNotesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CoupleNotesRouteProp>();
  const { weddingId } = route.params;
  const insets = useSafeAreaInsets();

  const wedding = useWeddingStore((s) => s.weddings.find((w) => w.id === weddingId));

  // Local state for notes (in production, this would be in the store)
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);

  const handleAddNote = () => {
    if (!newTitle.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      weddingId,
      title: newTitle.trim(),
      content: newContent.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      color: selectedColor,
    };

    setNotes([newNote, ...notes]);
    setShowAddModal(false);
    resetForm();
  };

  const handleUpdateNote = () => {
    if (!selectedNote || !newTitle.trim()) return;

    const updatedNotes = notes.map((note) =>
      note.id === selectedNote.id
        ? {
            ...note,
            title: newTitle.trim(),
            content: newContent.trim(),
            color: selectedColor,
            updatedAt: new Date().toISOString(),
          }
        : note
    );

    setNotes(updatedNotes);
    setShowViewModal(false);
    setIsEditing(false);
    setSelectedNote(null);
    resetForm();
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    setShowViewModal(false);
    setSelectedNote(null);
  };

  const openNote = (note: Note) => {
    setSelectedNote(note);
    setNewTitle(note.title);
    setNewContent(note.content);
    setSelectedColor(note.color);
    setShowViewModal(true);
  };

  const resetForm = () => {
    setNewTitle("");
    setNewContent("");
    setSelectedColor(NOTE_COLORS[0]);
  };

  if (!wedding) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-neutral-500">Wedding not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <LinearGradient
        colors={["#1a1a1a", "#000000"]}
        style={{ paddingTop: insets.top + 10, paddingBottom: 20, paddingHorizontal: 20 }}
      >
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#C9A961" />
          </Pressable>
          <Text className="text-neutral-100 text-xl font-semibold">Notes</Text>
          <Pressable
            onPress={() => setShowAddModal(true)}
            className="w-10 h-10 rounded-full bg-[#C9A961] items-center justify-center"
          >
            <Ionicons name="add" size={24} color="#000" />
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {notes.length === 0 ? (
          <View className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800 items-center mt-4">
            <Ionicons name="document-text-outline" size={48} color="#404040" />
            <Text className="text-neutral-100 text-lg font-semibold mt-4">No notes yet</Text>
            <Text className="text-neutral-500 text-center mt-2">
              Keep track of ideas, vendor info, or anything important for your wedding
            </Text>
            <Pressable
              onPress={() => setShowAddModal(true)}
              className="bg-[#C9A961] rounded-xl px-6 py-3 mt-6"
            >
              <Text className="text-black font-semibold">Create your first note</Text>
            </Pressable>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {notes.map((note) => (
              <Pressable
                key={note.id}
                onPress={() => openNote(note)}
                className="w-[48%] mb-4 rounded-2xl p-4 border border-neutral-800 active:opacity-80"
                style={{ backgroundColor: `${note.color}15` }}
              >
                <View
                  className="w-3 h-3 rounded-full mb-3"
                  style={{ backgroundColor: note.color }}
                />
                <Text className="text-neutral-100 font-semibold mb-2" numberOfLines={2}>
                  {note.title}
                </Text>
                {note.content && (
                  <Text className="text-neutral-400 text-sm mb-3" numberOfLines={3}>
                    {note.content}
                  </Text>
                )}
                <Text className="text-neutral-600 text-xs">
                  {format(new Date(note.updatedAt), "MMM d")}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>

      {/* Add Note Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6 max-h-[90%]">
              <View className="flex-row items-center justify-between mb-6">
                <Pressable onPress={() => { setShowAddModal(false); resetForm(); }}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
                <Text className="text-neutral-100 text-xl font-bold">New Note</Text>
                <Pressable onPress={handleAddNote} disabled={!newTitle.trim()}>
                  <Text className={`font-semibold ${newTitle.trim() ? "text-[#C9A961]" : "text-neutral-600"}`}>
                    Save
                  </Text>
                </Pressable>
              </View>

              {/* Color Selection */}
              <View className="flex-row justify-center mb-6">
                {NOTE_COLORS.map((color) => (
                  <Pressable
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full mx-2 items-center justify-center ${
                      selectedColor === color ? "border-2 border-white" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === color && (
                      <Ionicons name="checkmark" size={16} color="#000" />
                    )}
                  </Pressable>
                ))}
              </View>

              <ScrollView keyboardShouldPersistTaps="handled">
                <View className="mb-4">
                  <TextInput
                    value={newTitle}
                    onChangeText={setNewTitle}
                    placeholder="Note title"
                    placeholderTextColor="#6B7280"
                    className="text-neutral-100 text-xl font-semibold"
                    style={{ paddingVertical: 8 }}
                  />
                </View>

                <View className="mb-6">
                  <TextInput
                    value={newContent}
                    onChangeText={setNewContent}
                    placeholder="Write your note here..."
                    placeholderTextColor="#6B7280"
                    multiline
                    className="text-neutral-300 text-base"
                    style={{ minHeight: 200, textAlignVertical: "top", paddingVertical: 8 }}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* View/Edit Note Modal */}
      <Modal visible={showViewModal} transparent animationType="slide">
        <KeyboardAvoidingView
          className="flex-1 justify-end"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-end bg-black/70">
            <View className="bg-neutral-900 rounded-t-3xl p-6 max-h-[90%]">
              <View className="flex-row items-center justify-between mb-6">
                <Pressable onPress={() => {
                  setShowViewModal(false);
                  setIsEditing(false);
                  setSelectedNote(null);
                  resetForm();
                }}>
                  <Ionicons name="close" size={24} color="#9CA3AF" />
                </Pressable>
                <Text className="text-neutral-100 text-xl font-bold">
                  {isEditing ? "Edit Note" : "Note"}
                </Text>
                {isEditing ? (
                  <Pressable onPress={handleUpdateNote} disabled={!newTitle.trim()}>
                    <Text className={`font-semibold ${newTitle.trim() ? "text-[#C9A961]" : "text-neutral-600"}`}>
                      Save
                    </Text>
                  </Pressable>
                ) : (
                  <View className="flex-row">
                    <Pressable onPress={() => setIsEditing(true)} className="mr-4">
                      <Ionicons name="pencil" size={20} color="#C9A961" />
                    </Pressable>
                    <Pressable onPress={() => selectedNote && handleDeleteNote(selectedNote.id)}>
                      <Ionicons name="trash-outline" size={20} color="#EF4444" />
                    </Pressable>
                  </View>
                )}
              </View>

              {isEditing && (
                <View className="flex-row justify-center mb-6">
                  {NOTE_COLORS.map((color) => (
                    <Pressable
                      key={color}
                      onPress={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full mx-2 items-center justify-center ${
                        selectedColor === color ? "border-2 border-white" : ""
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {selectedColor === color && (
                        <Ionicons name="checkmark" size={16} color="#000" />
                      )}
                    </Pressable>
                  ))}
                </View>
              )}

              <ScrollView keyboardShouldPersistTaps="handled">
                {isEditing ? (
                  <>
                    <View className="mb-4">
                      <TextInput
                        value={newTitle}
                        onChangeText={setNewTitle}
                        placeholder="Note title"
                        placeholderTextColor="#6B7280"
                        className="text-neutral-100 text-xl font-semibold"
                        style={{ paddingVertical: 8 }}
                      />
                    </View>
                    <View className="mb-6">
                      <TextInput
                        value={newContent}
                        onChangeText={setNewContent}
                        placeholder="Write your note here..."
                        placeholderTextColor="#6B7280"
                        multiline
                        className="text-neutral-300 text-base"
                        style={{ minHeight: 200, textAlignVertical: "top", paddingVertical: 8 }}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <View className="flex-row items-center mb-4">
                      <View
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: selectedNote?.color }}
                      />
                      <Text className="text-neutral-500 text-sm">
                        Updated {selectedNote && format(new Date(selectedNote.updatedAt), "MMM d, yyyy")}
                      </Text>
                    </View>
                    <Text className="text-neutral-100 text-2xl font-bold mb-4">
                      {selectedNote?.title}
                    </Text>
                    <Text className="text-neutral-300 text-base leading-6">
                      {selectedNote?.content || "No content"}
                    </Text>
                  </>
                )}
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
