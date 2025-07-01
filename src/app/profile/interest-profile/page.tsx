"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useProfileStore } from "@/app/stores/useProfile.store";
import toast from "react-hot-toast";

export default function AddInterest() {
  const router = useRouter();
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const { profile, fetchProfile } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    const local = localStorage.getItem("interest");

    if (local) {
      setInterests(JSON.parse(local));
    } else if (profile && Array.isArray(profile.interests)) {
      setInterests(profile.interests);
    }
  }, [profile]);

  const addInterest = () => {
    const trimmed = interestInput.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed]);
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleSave = () => {
    localStorage.setItem("interest", JSON.stringify(interests));
    const isComplete =
      profile?.name &&
      profile?.gender &&
      profile?.birthday &&
      profile?.horoscope &&
      profile?.zodiac &&
      profile?.height &&
      profile?.weight;

    toast.success(
      isComplete
        ? "Interest updated! Redirecting to Update Profile..."
        : "Interest saved! Let's complete your profile."
    );

    router.push(
      isComplete ? "/profile/update-profile" : "/profile/create-profile"
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(200%_200%_at_90%_10%,_#1F4247,_#0D1D23,_#09141A)] text-white p-6">
      <div className="flex justify-between items-center gap-2 text-md text-white font-medium mb-4">
        <a
          href="/profile/create-profile"
          className="text-left text-sm text-white flex items-center"
        >
          <ChevronLeft />
          Back
        </a>

        <button
          onClick={handleSave}
          className="text-transparent bg-clip-text bg-gradient-savebtn font-semibold"
        >
          Save
        </button>
      </div>

      <div className="pt-20 pb-5 px-3 flex flex-col">
        <span className="text-xl font-bold bg-gradient-gold-complex bg-clip-text text-transparent">
          Tell everyone about yourself
        </span>
        <span className="font-semibold text-3xl">What interest you?</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 mx-3 px-[17px] py-2 bg-input-primary border border-gray-600 rounded-2xl text-white min-h-[3rem] mb-6">
        {interests.map((item, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 text-white px-3 py-1 rounded-md text-sm flex items-center gap-2"
          >
            {item}
            <button
              onClick={() => removeInterest(item)}
              className="text-white hover:text-red-500"
            >
              ✕
            </button>
          </div>
        ))}

        <input
          type="text"
          placeholder="Type and Enter"
          value={interestInput}
          onChange={(e) => setInterestInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addInterest();
            }
          }}
          className="flex-grow bg-transparent border-none focus:outline-none text-white min-w-[100px]"
        />
      </div>
    </div>
  );
}
