import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, Download, MessageSquare } from "lucide-react"

export function ContactSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Financial Transparency Office</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">amoghakoulapure@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">9000999000</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Office Location</p>
              <p className="text-sm text-muted-foreground">Administration Building, Room 205</p>
              <p className="text-sm text-muted-foreground">
                ACEAR Institute Financial Transparency System, Bangalore-560090
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Office Hours</p>
              <p className="text-sm text-muted-foreground">Monday - Friday, 9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Request Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Have questions about our financial data or need additional information? We're committed to complete
            transparency and are here to help.
          </p>

          <div className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Complete Financial Report (PDF)
            </Button>

            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Request Custom Financial Analysis
            </Button>

            <Button className="w-full justify-start bg-transparent" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Schedule Meeting with Financial Officer
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Commitment to Transparency</h4>
            <p className="text-sm text-blue-800">
              ACEAR Institute believes in complete financial transparency. All budget information, spending data, and
              financial reports are available to students, parents, donors, and the public.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
