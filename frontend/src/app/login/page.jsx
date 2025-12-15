"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import { useSearchParams } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const reason = params.get("reason");

  const submit = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
    
    {/* Session expired message */}
    {reason === "session-expired" && (
      <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4 border border-red-200">
        Session expired. Please login again.
      </p>
    )}

    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>

    {/* Email Input */}
    <input
      className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Email"
      onChange={e => setForm({ ...form, email: e.target.value })}
    />

    {/* Password Input */}
    <input
      type="password"
      className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Password"
      onChange={e => setForm({ ...form, password: e.target.value })}
    />

    {/* Login Button */}
    <button
      onClick={submit}
      disabled={loading}
      className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
    >
      {loading ? "Logging in..." : "Login"}
    </button>

    {/* Register Link */}
    <p className="text-sm text-center mt-5 text-gray-600">
      New user?{" "}
      <span
        onClick={() => router.push("/register")}
        className="text-blue-600 cursor-pointer hover:underline"
      >
        Register
      </span>
    </p>
  </div>
</div>

  );
}
