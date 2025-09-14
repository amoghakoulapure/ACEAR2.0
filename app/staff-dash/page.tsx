"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function StaffDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) {
        router.replace("/auth/login");
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
