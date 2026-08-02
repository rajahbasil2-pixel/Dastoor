"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="bg-[#FAFAFA] w-full max-w-sm p-8 space-y-6">
        <div className="text-center">
          <Image src="/logo.png" alt="Dastoor" width={100} height={36} className="h-10 w-auto object-contain mx-auto mb-4" />
          <p className="text-xs text-[#737373] uppercase tracking-widest">Admin Access</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#D4D4D4] px-4 py-3 text-sm outline-none focus:border-[#0A0A0A]"
              placeholder="admin@dastoor.pk"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#737373] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full border border-[#D4D4D4] px-4 py-3 text-sm outline-none focus:border-[#0A0A0A]"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-xs text-[#EF4444]">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#0A0A0A] text-[#FAFAFA] py-4 text-xs uppercase tracking-widest hover:bg-[#404040] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
