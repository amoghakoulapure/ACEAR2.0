import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const reportId = params.id

    // In a real application, this would:
    // 1. Verify the user has access to this report
    // 2. Retrieve the report file from storage
    // 3. Return the file with appropriate headers

    // For demo purposes, return a simple response
    const reportContent = `Financial Report ${reportId}
Generated: ${new Date().toISOString()}
User: ${user.email}

This is a sample report. In a real application, this would contain
the actual financial data formatted according to the requested type.`

    return new NextResponse(reportContent, {
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `attachment; filename="report_${reportId}.txt"`,
      },
    })
  } catch (error) {
    console.error("Report download error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
