"use client";

import { useEffect, useState } from "react";
import { EyeOff, Eye, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //trigger username karena require
  const [username] = useState("");

  useEffect(() => {
    const logoutSuccess = localStorage.getItem("logoutSuccess");
    if (logoutSuccess) {
      toast.success("Logout berhasil👋");
      localStorage.removeItem("logoutSuccess");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginPromise = fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok || !data.access_token) {
        throw new Error(data.message);
      }

      Cookies.set("token", data.access_token);
      return data.message;
    });

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: (msg) => {
        router.push("/profile/main-profile");
        return msg;
      },
      error: (err) => err.message,
    });
  };

  return (
    <div className="min-h-screen bg-radial-accent text-white px-4 ">
      <div className="pt-10 mb-20">
        <a
          href="/auth/register"
          className="text-left text-sm text-white flex items-center gap-1 -ml-1 "
        >
          <span>
            <ChevronLeft />
          </span>
          Back
        </a>
      </div>
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold ml-4">Login</h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full  px-5 py-4 rounded-[9px] bg-white bg-opacity-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create Password"
              className="w-full  px-5 py-4 rounded-[9px] bg-white bg-opacity-5 text-white placeholder-gray-400 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
            className="w-full p-3 bg-gradient-primary rounded-[9px] text-white font-semibold hover:bg-gradient-primary-hover"
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
