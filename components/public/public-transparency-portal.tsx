import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ContactSection } from "@/components/public/contact-section"
import { Building2, Users, DollarSign, TrendingUp, Shield, Eye, Lock, AlertTriangle } from "lucide-react"

export function PublicTransparencyPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Public Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">ACEAR Institute</h1>
                <p className="text-sm text-gray-600">Financial Transparency Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-700 border-green-300">
                <Eye className="h-3 w-3 mr-1" />
                Public Access
              </Badge>
              <Link href="/auth/login">
                <Button>
                  <Lock className="h-4 w-4 mr-2" />
                  Staff Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Limited Access Notice */}
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-3" />
            <div>
              <h3 className="font-semibold text-amber-800">Limited Public Access</h3>
              <p className="text-amber-700 text-sm">
                This is the public transparency portal. For detailed financial data, budget analysis, and administrative
                functions, please log in with your institutional credentials.
              </p>
            </div>
          </div>
        </div>

        {/* Public Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">₹2.4B</div>
              <p className="text-xs text-gray-500">FY 2024-25</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12</div>
              <p className="text-xs text-gray-500">Active departments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">8,500+</div>
              <p className="text-xs text-gray-500">Enrolled students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Transparency Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">94%</div>
              <p className="text-xs text-gray-500">Public disclosure</p>
            </CardContent>
          </Card>
        </div>

        {/* Public Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                Budget Summary
              </CardTitle>
              <CardDescription>High-level budget allocation overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Academic Programs</span>
                  <span className="font-semibold">₹1.2B (50%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Infrastructure</span>
                  <span className="font-semibold">₹720M (30%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Research & Development</span>
                  <span className="font-semibold">₹360M (15%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Administration</span>
                  <span className="font-semibold">₹120M (5%)</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <Lock className="h-3 w-3 inline mr-1" />
                  Detailed breakdowns available to authorized personnel only
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Recent Updates
              </CardTitle>
              <CardDescription>Latest financial transparency updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border-l-2 border-blue-500 pl-3">
                  <p className="text-sm font-medium">Q3 Budget Report Published</p>
                  <p className="text-xs text-gray-500">March 15, 2024</p>
                </div>
                <div className="border-l-2 border-green-500 pl-3">
                  <p className="text-sm font-medium">New Infrastructure Projects Approved</p>
                  <p className="text-xs text-gray-500">March 10, 2024</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-3">
                  <p className="text-sm font-medium">Research Grant Allocations Updated</p>
                  <p className="text-xs text-gray-500">March 5, 2024</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <Lock className="h-3 w-3 inline mr-1" />
                  Real-time updates and detailed reports available to staff
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Access Full Financial Dashboard</CardTitle>
            <CardDescription className="text-lg">
              Staff members can access detailed financial data, budget analysis, and administrative tools
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900">Secure Access</h3>
                <p className="text-sm text-blue-700">Role-based permissions</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900">Real-time Data</h3>
                <p className="text-sm text-green-700">Live financial updates</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900">Collaborative</h3>
                <p className="text-sm text-purple-700">Multi-department access</p>
              </div>
            </div>
            <Link href="/auth/login">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Lock className="h-4 w-4 mr-2" />
                Login to Full Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        <ContactSection />
      </main>
    </div>
  )
}
