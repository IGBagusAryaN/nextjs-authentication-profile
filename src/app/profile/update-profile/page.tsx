"use client";

import { ChevronLeft, PencilLine } from "lucide-react";
import { useRef, useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useZodiacStore } from "@/app/stores/useZodiac.store";
import { useProfileStore } from "@/app/stores/useProfile.store";
import toast from "react-hot-toast";

export default function UpdateProfile() {
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
    if (profile) {
      setName(profile.name || "");
      setGender(profile.gender || "Male");
      setHeight(profile.height ? String(profile.height) : "");
      setWeight(profile.weight ? String(profile.weight) : "");
      setImage(profile.image || null);
      setInterest(Array.isArray(profile.interests) ? profile.interests : []);
      if (profile.birthday) {
        setBirthday(profile.birthday.slice(0, 10));
      }
    }
  }, [profile]);

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

  const handleClick = () => fileInputRef.current?.click();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("token");
    if (!token) {
      toast.error("Token tidak ditemukan!");
      return;
    }

    const sanitizedInterest = interest.filter((item) => typeof item === "string").map((item) => item.trim());

    try {
      const res = await fetch("/api/update-profile", {
        method: "PUT",
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
          height: Number(height),
          weight: Number(weight),
          interest: sanitizedInterest,
          image,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      router.push("/profile/main-profile");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#1A252A] text-white p-4 font-sans">
      <div className="flex justify-between items-center gap-2 text-md font-medium mb-4">
        <a href="/profile/main-profile" className="text-left text-sm flex items-center">
          <ChevronLeft />
          Back
        </a>
        <span className="-ml-14">@{profile?.username}</span>
        <span></span>
      </div>

      <div className="relative bg-[#1F2A30] rounded-xl mb-4 h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F4247] to-[#1A252A]">
          <img
            src="https://www.shutterstock.com/shutterstock/videos/3777043173/thumb/1.jpg?ip=x480"
            alt="bg"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <p className="text-white font-semibold text-lg">@{profile?.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0E191F] rounded-xl px-[23px] py-4 space-y-4 mb-6 w-full">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-sm">About</h2>
          <button type="submit" className="text-yellow-400 text-sm hover:underline">
            Save & Update
          </button>
        </div>

        <div className="flex items-center gap-4 cursor-pointer" onClick={handleClick}>
          {image ? (
            <img src={image} alt="Selected" className="h-14 w-14 rounded-xl object-cover" />
          ) : (
            <div className="h-14 w-14 rounded-xl bg-[#1F2A30] flex items-center justify-center">
              <span className="text-yellow-200 text-2xl">＋</span>
            </div>
          )}
          <span className="text-sm">Add image</span>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
        </div>

        {/* Fields */}
        <div className="space-y-3">
          {/* Name & Birthday */}
          {[
            { label: "Display name", value: name, set: setName },
            { label: "Birthday", value: birthday, set: setBirthday, type: "date" },
          ].map(({ label, value, set, type = "text" }, i) => (
            <div className="flex items-center" key={i}>
              <label className="text-xs text-gray-400 w-[50%]">{label}:</label>
              <input
                type={type}
                value={value}
                onChange={(e) => set(e.target.value)}
                className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
              />
            </div>
          ))}

          {/* Horoscope & Zodiac */}
          <div className="flex items-center">
            <label className="text-xs text-gray-400 w-[50%]">Horoscope:</label>
            <input
              type="text"
              value={horoscope}
              readOnly
              className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
            />
          </div>
          <div className="flex items-center">
            <label className="text-xs text-gray-400 w-[50%]">Zodiac:</label>
            <input
              type="text"
              value={zodiac}
              readOnly
              className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
            />
          </div>

          {/* Height & Weight */}
          {[
            { label: "Height", value: height, set: setHeight },
            { label: "Weight", value: weight, set: setWeight },
          ].map(({ label, value, set }, i) => (
            <div className="flex items-center" key={i}>
              <label className="text-xs text-gray-400 w-[50%]">{label}:</label>
              <input
                type="text"
                value={value}
                onChange={(e) => set(e.target.value)}
                placeholder={`e.g. ${label === "Height" ? "170" : "60"}`}
                className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
              />
            </div>
          ))}

          {/* Gender */}
          <div className="flex items-center">
            <label className="text-xs text-gray-400 w-[50%]">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </form>

      {/* Interest */}
      <div className="bg-[#0E191F] rounded-xl px-[23px] py-4 relative">
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
              <span key={idx} className="bg-white bg-opacity-10 px-3 py-1 rounded-md">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
