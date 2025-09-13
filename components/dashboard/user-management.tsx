import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, UserPlus, UserCheck, UserX } from "lucide-react"

export function UserManagement() {
  const recentUsers = [
    { name: "Dr. Rajesh Kumar", email: "rajesh@acear.edu", role: "faculty", status: "active", initials: "RK" },
    { name: "Priya Sharma", email: "priya@acear.edu", role: "staff", status: "pending", initials: "PS" },
    { name: "Amit Patel", email: "amit@acear.edu", role: "department_head", status: "active", initials: "AP" },
    { name: "Sarah Johnson", email: "sarah@acear.edu", role: "auditor", status: "active", initials: "SJ" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          User Management
        </CardTitle>
        <CardDescription>Manage user accounts and permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">247</div>
                <div className="text-xs text-gray-500">Total Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">231</div>
                <div className="text-xs text-gray-500">Active</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">16</div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
            </div>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-1" />
              Add User
            </Button>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Recent Activity</h4>
            <div className="space-y-3">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {user.role.replace("_", " ")}
                    </Badge>
                    {user.status === "active" ? (
                      <UserCheck className="h-4 w-4 text-green-600" />
                    ) : (
                      <UserX className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
