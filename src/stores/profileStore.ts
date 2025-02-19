import { create } from "zustand";

interface ProfileState {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const useProfileStore = create<ProfileState>((set) => ({
  isEditing: false,
  setIsEditing: (value: boolean) => set({ isEditing: value }),
}));

export default useProfileStore;
