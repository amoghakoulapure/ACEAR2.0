"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function StaffDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and is staff
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data?.user) {
        router.replace("/auth/login");
        return;
      }
      // Fetch profile and check role
      const { data: profileData, error: profileError } = await supabase.from("profiles").select("role").eq("id", data.user.id).single();
      if (profileError || !profileData || profileData.role !== "staff") {
        router.replace("/dashboard");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <Card className="max-w-xl w-full mx-auto">
        <CardHeader>
          <CardTitle>Staff Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 mb-4">Welcome to the staff dashboard!</p>
          <ul className="list-disc ml-6 space-y-2 text-gray-600">
            <li>View and manage department budgets</li>
            <li>Approve transactions and requests</li>
            <li>Access financial reports</li>
            <li>Monitor anomalies and alerts</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
