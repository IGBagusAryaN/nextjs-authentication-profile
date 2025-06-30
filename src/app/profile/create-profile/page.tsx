"use client";

import { useRef, useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useZodiacStore } from "@/app/stores/useZodiac.store";
import { ChevronRight, PencilLine } from "lucide-react";
import { useProfileStore } from "@/app/stores/useProfile.store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateProfile() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [interest, setInterest] = useState<string[]>([]);

  const { birthday, horoscope, zodiac, setBirthday } = useZodiacStore();
  const { profile, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setName(localStorage.getItem("profile_name") || "");
    setGender(localStorage.getItem("profile_gender") || "Male");
    setBirthday(localStorage.getItem("profile_birthday") || "");
    setHeight(localStorage.getItem("profile_height") || "");
    setWeight(localStorage.getItem("profile_weight") || "");
    setImage(localStorage.getItem("profile_image") || null);

    const storedInterest = localStorage.getItem("interest");
    if (storedInterest) {
      try {
        setInterest(JSON.parse(storedInterest));
      } catch {
        setInterest([]);
      }
    }
  }, [setBirthday]);

  useEffect(() => {
    localStorage.setItem("profile_name", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("profile_gender", gender);
  }, [gender]);

  useEffect(() => {
    localStorage.setItem("profile_birthday", birthday);
  }, [birthday]);

  useEffect(() => {
    localStorage.setItem("profile_height", height);
  }, [height]);

  useEffect(() => {
    localStorage.setItem("profile_weight", weight);
  }, [weight]);
  useEffect(() => {
    localStorage.setItem("profile_horoscope", horoscope);
  }, [horoscope]);

  useEffect(() => {
    localStorage.setItem("profile_zodiac", zodiac);
  }, [zodiac]);

  useEffect(() => {
    if (image) {
      localStorage.setItem("profile_image", image);
    }
  }, [image]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("token");
    if (!token) {
      toast.error("Token not found!");
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
        [
          "profile_name",
          "profile_gender",
          "profile_birthday",
          "profile_height",
          "profile_weight",
          "profile_image",
          "interest",
        ].forEach((key) => localStorage.removeItem(key));

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
            className="font-bold bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88] bg-clip-text text-transparent text-sm hover:underline"
          >
            Save
          </button>
        </div>

        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={handleClick}
        >
          {image ? (
            <img
              src={image}
              alt="Selected"
              className="h-14 w-14 rounded-xl object-cover"
            />
          ) : (
            <div className="h-14 w-14 rounded-xl bg-[#1F2A30] flex items-center justify-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#94783E] via-[#F3EDA6] to-[#D5BE88] bg-clip-text text-transparent">
                ＋
              </span>
            </div>
          )}
          <span className="text-sm">Add image</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center">
          <label className="text-xs text-gray-400 w-[50%]">Display name:</label>
          <input
            type="text"
            value={name}
            placeholder="your name"
            onChange={(e) => setName(e.target.value)}
            className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
          />
        </div>

        <div className="flex items-center">
          <label className="text-xs text-gray-400 w-[50%]">Birthday:</label>
          <div className="w-full -ml-1">
            <DatePicker
              selected={birthday ? new Date(birthday) : null}
              onChange={(date) => {
                if (date) setBirthday(date.toISOString());
              }}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className="w-[274px] text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm text-white"
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="text-xs text-gray-400 w-[50%]">Horoscope:</label>
          <input
            type="text"
            value={horoscope}
            placeholder="auto-filled"
            readOnly
            className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
          />
        </div>

        <div className="flex items-center">
          <label className="text-xs text-gray-400 w-[50%]">Zodiac:</label>
          <input
            type="text"
            value={zodiac}
            placeholder="auto-filled"
            readOnly
            className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
          />
        </div>

        <div className="flex items-center">
          <label className="text-xs text-gray-400 w-[50%]">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm text-white"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {[
          { label: "Height", value: height, set: setHeight },
          { label: "Weight", value: weight, set: setWeight },
        ].map(({ label, value, set }, i) => (
          <div className="flex items-center" key={i}>
            <label className="text-xs text-gray-400 w-[50%]">{label}:</label>
            <div className="w-full flex items-center justify-end">
              <input
                type="text"
                value={value}
                onChange={(e) => set(e.target.value)}
                placeholder={`e.g. ${label === "Height" ? "170" : "60"}`}
                className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
              />
            </div>
          </div>
        ))}
      </form>

      <div className="bg-layout-secondary rounded-xl px-[23px] py-4 relative">
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-white"
          onClick={() => router.push("/profile/interest-profile")}
        >
          <PencilLine />
        </button>
        <p className="text-sm font-semibold mb-1">Interest</p>
        {interest.length === 0 ? (
          <p className="text-gray-400 text-sm py-[13px]">
            Add in your interest to find a better match
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 py-2">
            {interest.map((item, idx) => (
              <span
                key={idx}
                className="bg-white bg-opacity-10 text-white px-3 py-1 rounded-md"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
