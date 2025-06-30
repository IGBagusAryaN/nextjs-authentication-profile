// src/store/useProfileStore.ts
import { create } from "zustand";
import Cookies from "js-cookie";

type Profile = {
  name: string;
  username: string;
  gender: string;
  birthday: string;
  horoscope: string;
  zodiac: string;
  height: string;
  weight: string;
  interests: string[];
  image: string | null;
};

type ProfileState = {
  profile: Profile;
  fetchProfile: () => Promise<void>;
  logout: () => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: {
    name: "",
    username: "",
    gender: "Male",
    birthday: "",
    horoscope: "",
    zodiac: "",
    height: "",
    weight: "",
    interests: [],
    image: null,
  },
  fetchProfile: async () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const res = await fetch("/api/get-profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });

      if (res.status === 500) {
        Cookies.remove("token");
        localStorage.setItem(
          "logoutMessage",
          "Session expired. Please login again."
        );
        window.location.href = "/auth/login";
        return;
      }

      const data = await res.json();
      console.log("data:", data);
      if (res.ok) {
        const profile = data.data;
        set({
          profile: {
            name: profile.name || "",
            username: profile.username || "",
            gender: profile.gender || "Male",
            birthday: profile.birthday || "",
            horoscope: profile.horoscope || "",
            zodiac: profile.zodiac || "",
            height: profile.height ? `${profile.height}` : "",
            weight: profile.weight ? `${profile.weight}` : "",
            interests: profile.interests || [],
            image: profile.image || null,
          },
        });
      } else {
        console.error("Failed to fetch profile:", data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  },
  logout: () => {
    Cookies.remove("token");
    localStorage.setItem("logoutSuccess", "true");
    window.location.href = "/auth/login";
  },
}));
