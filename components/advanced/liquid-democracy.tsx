"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const proposals = [
  {
    id: "prop_001",
    title: "Increase Research Budget Allocation",
    description: "Proposal to increase research funding by 15% for next fiscal year",
    status: "active",
    votes: { for: 1247, against: 423, abstain: 89 },
    deadline: "2024-01-20",
    category: "Budget",
  },
  {
    id: "prop_002",
    title: "New Transparency Reporting Standards",
    description: "Implement monthly detailed financial reporting to public",
    status: "active",
    votes: { for: 892, against: 156, abstain: 234 },
    deadline: "2024-01-18",
    category: "Governance",
  },
]

const delegates = [
  {
    name: "Dr. Amogh Koulapure",
    role: "Financial Oversight",
    delegatedVotes: 234,
    expertise: "Budget Management",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Prof. Sarah Johnson",
    role: "Academic Affairs",
    delegatedVotes: 189,
    expertise: "Educational Policy",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Mr. Raj Patel",
    role: "Community Representative",
    delegatedVotes: 156,
    expertise: "Public Interest",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function LiquidDemocracy() {
  const [selectedDelegate, setSelectedDelegate] = useState<string | null>(null)
  const [votingPower, setVotingPower] = useState(1)

  const delegateVote = (delegateName: string) => {
    setSelectedDelegate(delegateName)
    // In real implementation, this would update the blockchain
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🗳️ Decentralized Governance with Liquid Democracy
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Blockchain-Enabled
            </Badge>
          </CardTitle>
          <CardDescription>
            Citizens can delegate their oversight authority to trusted auditors, creating living democracy around budget
            transparency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">1,759</div>
                <div className="text-sm text-green-700">Active Voters</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">579</div>
                <div className="text-sm text-blue-700">Delegated Votes</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-purple-700">Active Proposals</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Proposals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proposals.map((proposal) => {
                  const totalVotes = proposal.votes.for + proposal.votes.against + proposal.votes.abstain
                  const forPercentage = (proposal.votes.for / totalVotes) * 100
                  const againstPercentage = (proposal.votes.against / totalVotes) * 100

                  return (
                    <Card key={proposal.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{proposal.title}</span>
                              <Badge variant="outline">{proposal.category}</Badge>
                            </div>
                            <p className="text-sm text-gray-600">{proposal.description}</p>
                            <p className="text-xs text-gray-500 mt-1">Deadline: {proposal.deadline}</p>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {proposal.id}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>
                              For: {proposal.votes.for} ({forPercentage.toFixed(1)}%)
                            </span>
                            <span>
                              Against: {proposal.votes.against} ({againstPercentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="flex gap-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="bg-green-500" style={{ width: `${forPercentage}%` }} />
                            <div className="bg-red-500" style={{ width: `${againstPercentage}%` }} />
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-600 bg-transparent"
                          >
                            Vote For
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-600 bg-transparent">
                            Vote Against
                          </Button>
                          <Button size="sm" variant="outline">
                            Delegate Vote
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trusted Delegates</CardTitle>
              <CardDescription>Delegate your voting power to experts in specific domains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {delegates.map((delegate, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${
                      selectedDelegate === delegate.name ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                    }`}
                    onClick={() => delegateVote(delegate.name)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarImage src={delegate.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {delegate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-sm">{delegate.name}</div>
                          <div className="text-xs text-gray-600">{delegate.role}</div>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Delegated Votes:</span>
                          <span className="font-semibold">{delegate.delegatedVotes}</span>
                        </div>
                        <div className="text-xs text-gray-600">Expertise: {delegate.expertise}</div>
                      </div>
                      {selectedDelegate === delegate.name && (
                        <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800">
                          Selected
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
