"use client";

import { useProfileStore } from "@/app/stores/useProfile.store";
import { Ellipsis, Flame, PencilLine, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function MainProfile() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { profile, fetchProfile, logout } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditClick = () => {
    const { birthday, horoscope, zodiac, height, weight } = profile;

    const isProfileComplete =
      birthday && horoscope && zodiac && height && weight;

    router.push(
      isProfileComplete ? "/profile/update-profile" : "/profile/create-profile"
    );
  };

  return (
    <div className="min-h-screen bg-layout-primary text-white p-4 font-sans">
      <div className="flex justify-between items-center gap-2 text-md text-white font-medium mb-4">
        <span>@{profile.username}</span>
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button onClick={() => setOpen(!open)} className="p-2">
            <Ellipsis />
          </button>

          {open && (
            <div className="absolute right-0 w-36 rounded-md bg-[#162329] shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <button
                onClick={logout}
                className="block w-full px-4 py-2 text-sm text-white hover:bg-red-600 rounded-md text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative bg-layout-secondary rounded-xl mb-4 h-60 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-img-profile">
          <img
            // image profile manual karena tidak ada api
            src={
              profile.image ||
              "https://img.freepik.com/free-photo/anime-moon-landscape_23-2151645908.jpg?semt=ais_hybrid&w=740"
            }
            alt="bg"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <p className="text-white font-semibold text-lg">@{profile.name}</p>
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

      <div className="bg-layout-secondary rounded-xl p-4 mb-4 relative">
        <button
          onClick={handleEditClick}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <PencilLine />
        </button>
        <div className="pl-[11px] pr-[41px]">
          <p className="text-lg font-semibold mb-1">About</p>
          {!profile.birthday &&
          !profile.horoscope &&
          !profile.zodiac &&
          !profile.height &&
          !profile.weight ? (
            <p className="text-gray-400 text-sm py-[23px]">
              Add in your information to help others know you better.
            </p>
          ) : (
            <div className="text-sm space-y-1 mt-2">
              {profile.birthday && (
                <p>
                  <span className="text-gray-500">Birthday: </span>
                  <span className="text-white">
                    {new Date(profile.birthday).toLocaleDateString("id-ID")}
                  </span>
                </p>
              )}
              {profile.horoscope && (
                <p>
                  <span className="text-gray-500">Horoscope: </span>
                  <span className="text-white">{profile.horoscope}</span>
                </p>
              )}
              {profile.zodiac && (
                <p>
                  <span className="text-gray-500">Zodiac: </span>
                  <span className="text-white">{profile.zodiac}</span>
                </p>
              )}
              {profile.height && (
                <p>
                  <span className="text-gray-500">Height: </span>
                  <span className="text-white">{profile.height} cm</span>
                </p>
              )}
              {profile.weight && (
                <p>
                  <span className="text-gray-500">Weight: </span>
                  <span className="text-white">{profile.weight} kg</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-layout-secondary rounded-xl p-4 relative">
        <div className="pl-[11px] pr-[41px]">
          <p className="text-lg font-semibold mb-1">Interest</p>
          {profile.interests?.length === 0 ? (
            <p className="text-gray-400 text-sm py-[13px]">
              Add in your interest to find a better match
            </p>
          ) : (
            <div className="flex flex-wrap gap-2 py-2">
              {profile.interests.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-white bg-opacity-10 text-white px-3 py-1 rounded-md "
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
