"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  email: string
  full_name: string
  role: string
  department_id?: string
}

interface DashboardHeaderProps {
  user: User
  profile: Profile
}

export function DashboardHeader({ user, profile }: DashboardHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/auth/login"
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-red-100 text-red-800"
      case "financial_admin":
        return "bg-blue-100 text-blue-800"
      case "department_head":
        return "bg-green-100 text-green-800"
      case "faculty":
        return "bg-purple-100 text-purple-800"
      case "staff":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isAdmin = profile.role === "super_admin" || profile.role === "financial_admin"

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">ACEAR Financial System</h1>
            <Badge className={getRoleBadgeColor(profile.role)}>{profile.role.replace("_", " ").toUpperCase()}</Badge>
          </div>

          <nav className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>

            <Link href="/analytics">
              <Button variant="ghost">Analytics</Button>
            </Link>

            {isAdmin && (
              <>
                <Link href="/admin/funds">
                  <Button variant="ghost">Fund Management</Button>
                </Link>
                <Link href="/admin/departments">
                  <Button variant="ghost">Departments</Button>
                </Link>
                <Link href="/admin/users">
                  <Button variant="ghost">Users</Button>
                </Link>
              </>
            )}

            <Link href="/transactions">
              <Button variant="ghost">Transactions</Button>
            </Link>

            <Link href="/reports">
              <Button variant="ghost">Reports</Button>
            </Link>

            <Link href="/advanced">
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                Advanced
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarInitials>{profile.full_name.charAt(0)}</AvatarInitials>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{profile.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/public/transparency">Public Portal</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
