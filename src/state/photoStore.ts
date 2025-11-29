import { create } from "zustand";
import { Photo } from "../types/wedding";

interface PhotoStore {
  photos: Photo[];
  addPhoto: (photo: Photo) => void;
  updatePhoto: (id: string, updates: Partial<Photo>) => void;
  deletePhoto: (id: string) => void;
  getPhotosForWedding: (weddingId: string) => Photo[];
  toggleFavorite: (id: string) => void;
  toggleApproved: (id: string) => void;
}

// Not persisted to avoid storage bloat with images
const usePhotoStore = create<PhotoStore>((set, get) => ({
  photos: [],
  addPhoto: (photo) => set((state) => ({ photos: [...state.photos, photo] })),
  updatePhoto: (id, updates) =>
    set((state) => ({
      photos: state.photos.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  deletePhoto: (id) => set((state) => ({ photos: state.photos.filter((p) => p.id !== id) })),
  getPhotosForWedding: (weddingId) => get().photos.filter((p) => p.weddingId === weddingId),
  toggleFavorite: (id) =>
    set((state) => ({
      photos: state.photos.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)),
    })),
  toggleApproved: (id) =>
    set((state) => ({
      photos: state.photos.map((p) => (p.id === id ? { ...p, isApproved: !p.isApproved } : p)),
    })),
}));

export default usePhotoStore;
