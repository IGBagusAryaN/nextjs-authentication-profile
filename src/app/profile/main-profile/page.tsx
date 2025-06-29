"use client";

import { Ellipsis, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

export default function MainProfile() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/auth/login");
  };

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
  return (
    <div>
      <div className="min-h-screen bg-[#0D1D23] text-white p-4 font-sans">
        <div className="flex justify-between items-center gap-2 text-md text-white font-medium mb-4">
          <span>@johndoe</span>
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <button onClick={() => setOpen(!open)} className="p-2">
              <Ellipsis />
            </button>

            {open && (
              <div className="absolute right-0  w-36 rounded-md bg-[#1F2A30] shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm text-white hover:bg-red-600 rounded-md text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="relative bg-[#1F2A30] rounded-xl mb-4 h-60 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F4247] to-[#0D1D23]">
            <img
              src="https://wallpapers.com/images/hd/naruto-landscape-1920-x-1080-7etx167z132c0vhm.jpg"
              alt="bg"
              className="w-full h-full object-cover opacity-40"
            />
          </div>

          <a
            href="/profile/detail-profile"
            className="absolute top-3 right-3 text-gray-400 hover:text-white z-10"
          >
            <PencilLine />
          </a>

          <div className="absolute bottom-4 left-4 z-10">
            <p className="text-white font-semibold text-lg">@johndoe123,</p>
          </div>
        </div>

        <div className="bg-[#1F2A30] rounded-xl p-4 mb-4 relative">
          <a
            href="/profile/update-profile"
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <PencilLine />
          </a>
          <div className="pl-[11px] pr-[41px]">
            <p className="text-sm font-semibold mb-1">About</p>
            <p className="text-gray-400 text-sm py-[23px]">
              Add in your your to help others know you better
              dadadadaddadadadadad
            </p>
          </div>
        </div>

        <div className="bg-[#1F2A30] rounded-xl p-4 relative">
          <a
            href="/profile/interest-profile"
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <PencilLine />
          </a>
          <div className="pl-[11px] pr-[41px]">
            <p className="text-sm font-semibold mb-1">Interest</p>
            <p className="text-gray-400 text-sm py-[23px]">
              Add in your interest to find a better match
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
