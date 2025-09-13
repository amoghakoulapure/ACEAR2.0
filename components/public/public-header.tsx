import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogIn, Download } from "lucide-react"

export function PublicHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-900">ACEAR Institute</h1>
            <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">Public Portal</span>
          </div>

          <nav className="flex items-center space-x-4">
            <a href="#budget-overview" className="text-gray-600 hover:text-gray-900">
              Budget
            </a>
            <a href="#fund-sources" className="text-gray-600 hover:text-gray-900">
              Funding
            </a>
            <a href="#spending-trends" className="text-gray-600 hover:text-gray-900">
              Trends
            </a>
            <a href="#departments" className="text-gray-600 hover:text-gray-900">
              Departments
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>

            <div className="flex items-center space-x-2 ml-6">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Link href="/auth/login">
                <Button size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Staff Login
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
