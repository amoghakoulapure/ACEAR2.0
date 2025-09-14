"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  // Prompt for staff type if missing
  const handleStaffTypeSave = async () => {
    if (!staffType || !pendingUserId) {
      setError("Please select your staff type.");
      return;
    }
    setIsLoading(true);
    try {
      const supabase = createClient();
      await supabase.from("profiles").upsert({ id: pendingUserId, role: staffType });
      setShowStaffTypePrompt(false);
      setStatus("Staff type saved. Redirecting...");
      let target = "/dashboard";
      if (staffType === "staff") target = "/staff-dash";
      else if (staffType === "admin") target = "/admin";
      else if (staffType === "student") target = "/dashboard";
      router.push(target);
      setTimeout(() => {
        window.location.href = target;
      }, 500);
    } catch (e: any) {
      setError("Failed to save staff type. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [showStaffTypePrompt, setShowStaffTypePrompt] = useState(false);
  const [staffType, setStaffType] = useState("");
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setStatus("Verifying credentials...");

    try {
      const supabase = createClient();
      setStatus("Contacting authentication server...");
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setStatus(null);
        if (signInError.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("Login failed: " + signInError.message);
        }
        setIsLoading(false);
        return;
      }

      setStatus("Login successful! Fetching user profile...");
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        setStatus(null);
        setError("Could not retrieve user data. Please try again.");
        setIsLoading(false);
        return;
      }

      // Check if email is verified
      if (!userData.user.email_confirmed_at) {
        setStatus(null);
        setError("Please verify your email before logging in. Check your inbox for the verification link.");
        setIsLoading(false);
        return;
      }

      // Use maybeSingle() for robust handling
      const { data: profileData, error: profileError } = await supabase.from("profiles").select("role").eq("id", userData.user.id).maybeSingle();
      if (profileError) {
        setStatus(null);
        setError("Profile fetch failed: " + profileError.message);
        setIsLoading(false);
        return;
      }
      // Fallback: if result is array, use first item
      let role = profileData?.role;
      if (!role && Array.isArray(profileData) && profileData.length > 0) {
        role = profileData[0].role;
      }
      if (!role) {
        setStatus(null);
        setPendingUserId(userData.user.id);
        setShowStaffTypePrompt(true);
        setIsLoading(false);
        return;
      }
      setStatus("Redirecting...");
      setTimeout(() => {
        let target = "/dashboard";
        if (role === "staff") target = "/staff-dash";
        else if (role === "admin") target = "/admin";
        else if (role === "student") target = "/dashboard";
        router.push(target);
        setTimeout(() => {
          window.location.href = target;
        }, 500);
      }, 500);
  // Prompt for staff type if missing
  const handleStaffTypeSave = async () => {
    if (!staffType || !pendingUserId) {
      setError("Please select your staff type.");
      return;
    }
    setIsLoading(true);
    try {
      const supabase = createClient();
      await supabase.from("profiles").upsert({ id: pendingUserId, role: staffType });
      setShowStaffTypePrompt(false);
      setStatus("Staff type saved. Redirecting...");
      let target = "/dashboard";
      if (staffType === "staff") target = "/staff-dash";
      else if (staffType === "admin") target = "/admin";
      else if (staffType === "student") target = "/dashboard";
      router.push(target);
      setTimeout(() => {
        window.location.href = target;
      }, 500);
    } catch (e: any) {
      setError("Failed to save staff type. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
    } catch (e: any) {
      setStatus(null);
      setError("Unexpected error: " + (e?.message || "Please try again."));
    } finally {
      setIsLoading(false);
    }
  } 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">ACEAR Institute</CardTitle>
            <CardDescription className="text-gray-600">Financial Transparency System Login</CardDescription>
          </CardHeader>
          <CardContent>
            {showStaffTypePrompt ? (
              <div className="space-y-4">
                <div className="text-lg font-semibold mb-2">Select your staff type to continue:</div>
                <select
                  value={staffType}
                  onChange={e => setStaffType(e.target.value)}
                  className="border p-2 rounded w-full"
                  disabled={isLoading}
                >
                  <option value="">Select staff type...</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                </select>
                <Button className="w-full" onClick={handleStaffTypeSave} disabled={isLoading || !staffType}>
                  {isLoading ? "Saving..." : "Save and Continue"}
                </Button>
                {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                {status && <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-md">{status}</div>}
                {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            )}
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => router.push('/public/transparency')}
              disabled={isLoading}
            >
              Back to Public View
            </Button>
            <div className="mt-6 text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-blue-600 hover:text-blue-800 underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
