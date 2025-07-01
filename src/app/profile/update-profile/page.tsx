"use client";

import { ChevronLeft, Flame, PencilLine, Star } from "lucide-react";
import { useRef, useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useZodiacStore } from "@/app/stores/useZodiac.store";
import { useProfileStore } from "@/app/stores/useProfile.store";
import toast from "react-hot-toast";
import ProfileImageUpload from "@/app/components/form/file-input";
import LabeledInput from "@/app/components/form/label-input";
import DatePicker from "react-datepicker";
import GenderSelect from "@/app/components/form/gender-select";

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
      setGender(profile.gender || "");
      setHeight(profile.height ? String(profile.height) : "");
      setWeight(profile.weight ? String(profile.weight) : "");
      setImage(profile.image || null);

      // cek localStorage interest (dari interest-profile)
      const localInterest = localStorage.getItem("interest");
      if (localInterest) {
        try {
          const parsed = JSON.parse(localInterest);
          if (Array.isArray(parsed)) {
            setInterest(parsed); // pakai yang local
          }
        } catch {
          // fallback ke interest dari profile jika parsing gagal
          setInterest(
            Array.isArray(profile.interests) ? profile.interests : []
          );
        }
      } else {
        setInterest(Array.isArray(profile.interests) ? profile.interests : []);
      }

      if (profile.birthday) {
        setBirthday(profile.birthday.slice(0, 10));
      }
    }
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("token");
    if (!token) {
      toast.error("Token tidak ditemukan!");
      return;
    }

    const sanitizedInterest = interest
      .filter((item) => typeof item === "string")
      .map((item) => item.trim());

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
          interests: sanitizedInterest,
          image,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      localStorage.removeItem("interest");
      router.push("/profile/main-profile");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the profile");
    }
  };

  return (
    <div className="min-h-screen bg-layout-primary text-white p-4 font-sans">
      <div className="flex justify-between items-center gap-2 text-md font-medium mb-4">
        <a
          href="/profile/main-profile"
          className="text-left text-sm flex items-center"
        >
          <ChevronLeft />
          Back
        </a>
        <span className="-ml-16">@{profile?.username}</span>
        <span></span>
      </div>

      <div className="relative bg-layout-secondary rounded-xl mb-4 h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-img-profile">
          <img
            src="https://img.freepik.com/free-photo/anime-moon-landscape_23-2151645908.jpg?semt=ais_hybrid&w=740"
            alt="bg"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <p className="text-white font-semibold text-lg">@{profile?.name}</p>
          <span className="text-sm">{profile.gender}</span>
          <div className="flex gap-2 pt-2">
            <div className="bg-btn-choice rounded-2xl px-3 py-2 flex items-center gap-2">
              <Star />
              {profile.horoscope}
            </div>
            <div className="bg-btn-choice rounded-2xl px-3 py-2 flex items-center gap-2">
              <Flame />
              {profile.zodiac}
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#0E191F] rounded-xl px-[23px] py-4 space-y-4 mb-6 w-full"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-sm">About</h2>
          <button
            type="submit"
            className="bg-gradient-gold bg-clip-text text-transparent font-bold text-sm hover:underline"
          >
            Save & Update
          </button>
        </div>

        <ProfileImageUpload image={image} onImageChange={setImage} />

        <div className="space-y-3">
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
                className="w-[273px] text-end mt-1 px-3 py-2 rounded-md bg-input-primary border border-gray-700 text-sm text-white"
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
              <span
                key={idx}
                className="bg-white bg-opacity-10 px-3 py-1 rounded-md"
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
