"use client";

import { useEffect, useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);


    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      toast.success(data.message || "Account created successfully!");
      window.location.href = "/profile/create-profile";
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(200%_200%_at_90%_10%,_#1F4247,_#0D1D23,_#09141A)]  text-white px-4 ">
      <div className="w-full max-w-md space-y-6 pt-24">
        <h1 className="text-3xl font-bold ml-4">Register</h1>

        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full  px-5 py-4 rounded-[9px] bg-white bg-opacity-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Create Username"
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

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-5 py-4 rounded-[9px] bg-white bg-opacity-5 text-white placeholder-gray-400 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-gradient-primary rounded-[9px] text-white font-semibold hover:bg-gradient-primary-hover"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 ">
          Have an account?{" "}
          <a href="/auth/login" className="text-yellow-300 underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
