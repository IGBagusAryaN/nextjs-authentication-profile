"use client";

import { useEffect, useState } from "react";
import { EyeOff, Eye, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/profile/main-profile");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.access_token) {
        alert(data.message);
        return;
      }

      Cookies.set("token", data.access_token);

      alert(data.message);
      window.location.href = "/profile/main-profile";
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat login.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(200%_200%_at_90%_10%,_#1F4247,_#0D1D23,_#09141A)]  text-white px-4 ">
      <button className="text-left text-sm text-white flex items-center gap-1 -ml-1 pt-10 pb-20">
        <span>
          <ChevronLeft />
        </span>{" "}
        Back
      </button>
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold ml-4">Login</h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            className="w-full  px-5 py-4 rounded-[9px] bg-white bg-opacity-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full  px-5 py-4 rounded-[9px] bg-white bg-opacity-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password"
              className="w-full  px-5 py-4 rounded-[9px] bg-white bg-opacity-5 text-white placeholder-gray-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-primaryFrom to-primaryTo rounded-[9px] text-white font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-300">
          Have an account?{" "}
          <a href="/auth/register" className="text-yellow-300 underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
