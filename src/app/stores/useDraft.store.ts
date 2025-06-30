// src/stores/useProfileDraftStore.ts
import { create } from "zustand";

type ProfileDraft = {
  image: string | null;
  name: string;
  gender: string;
  birthday: string;
  horoscope: string;
  zodiac: string;
  height: string;
  weight: string;
  interest: string[];
};

type ProfileDraftStore = {
  draft: ProfileDraft;
  setDraft: (updates: Partial<ProfileDraft>) => void;
  clearDraft: () => void;
};

const defaultDraft: ProfileDraft = {
  image: null,
  name: "",
  gender: "Male",
  birthday: "",
  horoscope: "",
  zodiac: "",
  height: "",
  weight: "",
  interest: [],
};

export const useProfileDraftStore = create<ProfileDraftStore>((set) => ({
  draft: defaultDraft,
  setDraft: (updates) =>
    set((state) => ({
      draft: { ...state.draft, ...updates },
    })),
  clearDraft: () => set({ draft: defaultDraft }),
}));
