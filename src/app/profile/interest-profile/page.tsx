"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Cookies from "js-cookie";

export default function AddInterest() {
  const router = useRouter();
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState<string[]>([]);


useEffect(() => {
  const fetchInterests = async () => {
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

      const data = await res.json();
      if (res.ok && Array.isArray(data.data?.interests)) {
        const interestsFromApi = data.data.interests;
        setInterests(interestsFromApi);
        localStorage.setItem("interest", JSON.stringify(interestsFromApi));
      } else {
        const local = localStorage.getItem("interest");
        if (local) setInterests(JSON.parse(local));
      }
    } catch (error) {
      console.error("Gagal fetch interests:", error);
      const local = localStorage.getItem("interest");
      if (local) setInterests(JSON.parse(local));
    }
  };

  fetchInterests();
}, []);

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleSave = () => {
    localStorage.setItem("interest", JSON.stringify(interests));
    router.push("/profile/create-profile"); // Balik ke halaman create profile
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(200%_200%_at_90%_10%,_#1F4247,_#0D1D23,_#09141A)] text-white p-6">
      <div className="flex justify-between items-center gap-2 text-md text-white font-medium mb-4">
        <a
          href="/profile/create-profile"
          className="text-left text-sm text-white flex items-center"
        >
          <span>
            <ChevronLeft />
          </span>
          Back
        </a>

        <button
          onClick={handleSave}
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#ABFFFD] via-[#AADAFF] to-[#4599DB] font-semibold"
        >
          Save
        </button>
      </div>

      <div className="pt-20 pb-5 px-3 flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-[#94783E] via-[#F3EDA6] via-[#F8FAE5] via-[#FFE2BE] to-[#D5BE88] bg-clip-text text-transparent">Tell everyone about yourself</span>
        <span className="font-semibold text-3xl">What interest you?</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 mx-3 px-[17px] py-2 bg-[#1A252A] border border-gray-600 rounded-2xl text-white min-h-[3rem] mb-6">
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
