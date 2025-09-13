"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactInfoCard() {
  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-indigo-900">Contact Information</CardTitle>
        <p className="text-sm text-indigo-700">Financial Transparency Office</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-indigo-600" />
          <div>
            <p className="text-sm font-medium text-indigo-900">Email</p>
            <p className="text-sm text-indigo-700">amoghakoulapure@gmail.com</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-indigo-600" />
          <div>
            <p className="text-sm font-medium text-indigo-900">Phone</p>
            <p className="text-sm text-indigo-700">9000999000</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-indigo-600" />
          <div>
            <p className="text-sm font-medium text-indigo-900">Office Location</p>
            <p className="text-sm text-indigo-700">Administration Building, Room 205</p>
            <p className="text-sm text-indigo-700">ACEAR Institute, Bangalore-560090</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Clock className="h-5 w-5 text-indigo-600" />
          <div>
            <p className="text-sm font-medium text-indigo-900">Office Hours</p>
            <p className="text-sm text-indigo-700">Monday - Friday, 9:00 AM - 5:00 PM</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
