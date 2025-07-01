"use client";

import { useRef, useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useZodiacStore } from "@/app/stores/useZodiac.store";
import { ChevronDown, ChevronRight, PencilLine } from "lucide-react";
import { useProfileStore } from "@/app/stores/useProfile.store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import ProfileImageUpload from "@/app/components/create-profile/file-input";
import GenderSelect from "@/app/components/create-profile/gender-select";
import LabeledInput from "@/app/components/create-profile/label-input";
import InterestDisplay from "@/app/components/create-profile/interest-input";

export default function CreateProfile() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [interest, setInterest] = useState<string[]>([]);

  const { birthday, horoscope, zodiac, setBirthday } = useZodiacStore();
  const { profile, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("token");
    if (!token) {
      toast.error("Please login first!");
      return;
    }

    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);

    if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
      toast.error("Height and weight must be valid numbers.");
      return;
    }

    const sanitizedInterest = Array.isArray(interest)
      ? interest
          .filter((i): i is string => typeof i === "string")
          .map((i) => i.trim())
      : [];

    const submitPromise = fetch("/api/create-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        name,
        gender,
        birthday,
        horoscope,
        zodiac,
        height: parsedHeight,
        weight: parsedWeight,
        interests: sanitizedInterest,
        image,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create profile.");
      return data.message;
    });

    toast.promise(submitPromise, {
      loading: "Saving your profile...",
      success: (msg) => {
        router.push("/profile/main-profile");
        return msg;
      },
      error: (err) => err.message || "Something went wrong.",
    });
  };

  return (
    <div className="min-h-screen bg-layout-primary text-white p-4 font-sans">
      <div className="flex justify-between items-center mb-4 text-md font-medium">
        <span>@{profile.username}</span>
        <a href="/profile/main-profile" className="flex items-center text-sm">
          Skip <ChevronRight />
        </a>
      </div>

      <div className="relative h-48 mb-4 w-full bg-layout-secondary rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-img-profile">
          <img
            src="https://img.freepik.com/free-photo/anime-moon-landscape_23-2151645908.jpg?semt=ais_hybrid&w=740"
            alt="Profile"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-layout-secondary rounded-xl px-6 py-4 space-y-4 mb-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-sm">About</h2>
          <button
            type="submit"
            className="font-bold bg-gradient-gold bg-clip-text text-transparent text-sm hover:underline"
          >
            Save
          </button>
        </div>

        <ProfileImageUpload image={image} onImageChange={setImage} />

        <LabeledInput
          placeholder="your name"
          label="Display name"
          value={name}
          onChange={setName}
        />

        <div className="flex items-center">
          <label className="text-xs text-gray-400 w-[50%]">Birthday:</label>
          <div className="w-full ml-1">
            <DatePicker
              selected={birthday ? new Date(birthday) : null}
              onChange={(date) => {
                if (date) setBirthday(date.toISOString());
              }}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className="w-[271px] text-end mt-1 px-3 py-2 rounded-md bg-input-primary border border-gray-700 text-sm text-white"
            />
          </div>
        </div>

        <LabeledInput
          placeholder="auto-filled"
          label="Horoscope"
          value={horoscope}
          onChange={() => {}}
          readOnly
        />

        <LabeledInput
          placeholder="auto-filled"
          label="Zodiac"
          value={zodiac}
          onChange={() => {}}
          readOnly
        />

        <div className="flex items-center">
          <label className="text-xs text-gray-400 w-[50%]">Gender:</label>
          <div className="w-full text-end">
            {/* custom select dropdown */}
            <GenderSelect value={gender} onChange={setGender} />
          </div>
        </div>

        <LabeledInput
          placeholder="e.g 170"
          label="Height"
          value={height}
          onChange={setHeight}
        />
        <LabeledInput
          placeholder="e.g 70"
          label="Weight"
          value={weight}
          onChange={setWeight}
        />
      </form>

      <InterestDisplay
        interests={interest}
        onEditClick={() => router.push("/profile/interest-profile")}
      />
    </div>
  );
}
