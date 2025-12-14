"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    try {
      await api.post("/auth/register", form);
      alert("Registered successfully");
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

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
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Register
        </button>
      </div>
    </div>
  );
}
