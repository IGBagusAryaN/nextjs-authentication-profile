"use client";

import { ChevronLeft, PencilLine } from "lucide-react";
import { useRef, useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function CreateProfile() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const [name, setName] = useState("John Doe");
  const [gender, setGender] = useState("Male");
  const [birthday, setBirthday] = useState("1995-08-28");
  const [horoscope, setHoroscope] = useState("Virgo");
  const [zodiac, setZodiac] = useState("Pig");
  const [height, setHeight] = useState("175 cm");
  const [weight, setWeight] = useState("69 kg");
  const [interest, setInterest] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("interest");
    if (stored) {
      try {
        setInterest(JSON.parse(stored));
      } catch (_) {
        setInterest([]);
      }
    }
  }, []);

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

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Token tidak ditemukan!");
    return;
  }

  try {
    const res = await fetch("/api/create-profile", {
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
        height,
        weight,
        interest,
        image, // kalau image base64 disimpan juga
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Gagal membuat profil.");
      return;
    }

    alert("Profil berhasil dibuat!");
    localStorage.removeItem("interest");
    router.push("/profile/main-profile");
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat membuat profil.");
  }
};

  return (
    <div>
      <div className="min-h-screen bg-[#1A252A] text-white p-4 font-sans">
        <div className="flex justify-between items-center gap-2 text-md text-white font-medium mb-4">
          <a
            href="/profile/main-profile"
            className="text-left text-sm text-white flex items-center"
          >
            <span>
              <ChevronLeft />
            </span>
            Back
          </a>
          <span className="-ml-14">@johndoe</span>
          <span></span>
        </div>

        <div className="relative bg-[#1F2A30] rounded-xl mb-4 h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1F4247] to-[#1A252A]">
            <img
              src=""
              alt="bg"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          <div className="absolute bottom-4 left-4 z-10">
            <p className="text-white font-semibold text-lg">@johndoe123,</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0E191F] rounded-xl px-[23px] py-4 text-white space-y-4 mb-6 w-full"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-sm">About</h2>
            <button
              type="submit"
              className="text-yellow-400 text-sm hover:underline"
            >
              Save & Update
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
                <span className="text-yellow-200 text-2xl">＋</span>
              </div>
            )}
            <span className="text-white text-sm">Add image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <label className="text-xs text-gray-400 w-[50%]">
                Display name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm focus:outline-none focus:ring focus:ring-blue-500"
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

            <div className="flex items-center">
              <label className="text-xs text-gray-400 w-[50%]">Birthday:</label>
              <input
                type="text"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="text-xs text-gray-400 w-[50%]">
                Horoscope:
              </label>
              <input
                type="text"
                value={horoscope}
                onChange={(e) => setHoroscope(e.target.value)}
                className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="text-xs text-gray-400 w-[50%]">Zodiac:</label>
              <input
                type="text"
                value={zodiac}
                onChange={(e) => setZodiac(e.target.value)}
                className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="text-xs text-gray-400 w-[50%]">Height:</label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
              />
            </div>

            <div className="flex items-center">
              <label className="text-xs text-gray-400 w-[50%]">Weight:</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full text-end mt-1 px-3 py-2 rounded-md bg-[#1A252A] border border-gray-700 text-sm"
              />
            </div>
          </div>
        </form>

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
