"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()
      // Supabase will append access_token, refresh_token, type, etc. to the URL
      const params = new URLSearchParams(window.location.hash.replace("#", "?"))
      const access_token = params.get("access_token")
      const refresh_token = params.get("refresh_token")
      if (access_token && refresh_token) {
        // Exchange tokens for session
        await supabase.auth.setSession({ access_token, refresh_token })
        router.replace("/dashboard")
      } else {
        // If no tokens, prompt user to login
        router.replace("/auth/login")
      }
    }
    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold">Verifying your account...</h2>
        <p className="mt-2 text-gray-600">Please wait while we log you in.</p>
      </div>
    </div>
  )
}
