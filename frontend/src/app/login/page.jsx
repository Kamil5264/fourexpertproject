"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center mt-4">
          New user?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-600 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
