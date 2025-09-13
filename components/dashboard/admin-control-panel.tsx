import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Users, Database, Shield, FileText, AlertTriangle, CheckCircle } from "lucide-react"

export function AdminControlPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          System Control Panel
        </CardTitle>
        <CardDescription>Administrative system management</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-3 flex flex-col items-center bg-transparent">
              <Users className="h-6 w-6 mb-1" />
              <span className="text-xs">User Management</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 flex flex-col items-center bg-transparent">
              <Database className="h-6 w-6 mb-1" />
              <span className="text-xs">Database Admin</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 flex flex-col items-center bg-transparent">
              <Shield className="h-6 w-6 mb-1" />
              <span className="text-xs">Security Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 flex flex-col items-center bg-transparent">
              <FileText className="h-6 w-6 mb-1" />
              <span className="text-xs">Report Generator</span>
            </Button>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">System Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Authentication Service</span>
                <Badge className="bg-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Connection</span>
                <Badge className="bg-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Healthy
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Backup Service</span>
                <Badge className="bg-amber-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Warning
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
