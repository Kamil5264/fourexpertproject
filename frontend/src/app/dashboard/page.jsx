"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";


export default function Dashboard() {
  const router = useRouter();
    const [error, setError] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");


   api.get("/dashboard")
      .then(res => console.log("Dashboard data:", res.data))
      .catch(err => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setError("Session expired. Please login again.");
        }
      });
  }, []);

  

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome 🎉</h1>
        <p className="text-gray-600 mb-6">
          You are logged in successfully
        </p>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
        {error && (
        <p className="bg-red-100 text-red-600 p-2 rounded text-center">
          {error}
        </p>
      )}
      </div>
    </div>
  );
}
