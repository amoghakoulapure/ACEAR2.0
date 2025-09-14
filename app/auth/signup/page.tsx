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

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [staffType, setStaffType] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false);
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Clear any previous errors

    if (!staffType) {
      setError("Please select your staff type.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }
    // Professional Gmail validation: must end with @gmail.com and not be a personal address
    if (!email.match(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) || email.startsWith("personal")) {
      setError("Please enter your professional Gmail address (not a personal one)");
      return;
    }

    const supabase = createClient()
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      // Save staff type to profile table
      if (data?.user?.id) {
        await supabase.from("profiles").upsert({ id: data.user.id, role: staffType });
      }
      setVerificationSent(true);
      setSuccess(true);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      if (errorMessage.includes("Invalid email") || errorMessage.includes("invalid email")) {
        setError("Please enter a valid email address")
      } else if (errorMessage.includes("Password") || errorMessage.includes("password")) {
        setError("Password must be at least 6 characters long")
      } else if (errorMessage.includes("already registered")) {
        setError("An account with this email already exists. Please sign in instead.")
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-green-700">Verify Your Email</CardTitle>
              <CardDescription className="text-green-600">
                A verification email has been sent to <span className="font-semibold">{email}</span>.<br />
                Please check your inbox and follow the link to activate your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                After verifying, you can log in to access the dashboard.
              </p>
              <Link href="/auth/login">
                <Button className="w-full">Go to Login</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
            <CardDescription className="text-gray-600">
              Join ACEAR Institute Financial Transparency System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="staffType">Staff Type</Label>
                <select
                  id="staffType"
                  required
                  value={staffType}
                  onChange={e => setStaffType(e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select staff type...</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError(null) // Clear error when user types
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(null) // Clear error when user types
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setError(null) // Clear error when user types
                  }}
                />
              </div>
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{error}</div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm space-y-2">
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 underline block">
                Already have an account? Sign In
              </Link>
              <Link href="/public/transparency" className="text-blue-600 hover:text-blue-800 underline block">
                View Public Financial Data
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
