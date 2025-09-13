import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ZKProofVerification } from "@/components/advanced/zk-proof-verification"
import { BiometricAuth } from "@/components/advanced/biometric-auth"
import { QuantumResistantContracts } from "@/components/advanced/quantum-contracts"
import { AIPredictiveEngine } from "@/components/advanced/ai-predictive-engine"
import { LiquidDemocracy } from "@/components/advanced/liquid-democracy"
import { CrossChainIntegration } from "@/components/advanced/cross-chain-integration"
import { TemporalAuditTrails } from "@/components/advanced/temporal-audit-trails"
import { NaturalLanguageQuery } from "@/components/advanced/natural-language-query"

export default function AdvancedFeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Advanced Financial Transparency Features
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cutting-edge technology ensuring unprecedented transparency, security, and accountability in institutional
            finance
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Zero-Knowledge Proofs
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Quantum-Resistant
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Blockchain-Enabled
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="ai-engine" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="ai-engine">AI Engine</TabsTrigger>
            <TabsTrigger value="nlp-query">NLP Query</TabsTrigger>
            <TabsTrigger value="zk-proof">ZK Proofs</TabsTrigger>
            <TabsTrigger value="biometric">Biometric</TabsTrigger>
            <TabsTrigger value="quantum">Quantum</TabsTrigger>
            <TabsTrigger value="democracy">Democracy</TabsTrigger>
            <TabsTrigger value="cross-chain">Cross-Chain</TabsTrigger>
            <TabsTrigger value="audit-trails">Audit Trails</TabsTrigger>
          </TabsList>

          <TabsContent value="ai-engine" className="space-y-6">
            <AIPredictiveEngine />
          </TabsContent>

          <TabsContent value="nlp-query" className="space-y-6">
            <NaturalLanguageQuery />
          </TabsContent>

          <TabsContent value="zk-proof" className="space-y-6">
            <ZKProofVerification />
          </TabsContent>

          <TabsContent value="biometric" className="space-y-6">
            <BiometricAuth />
          </TabsContent>

          <TabsContent value="quantum" className="space-y-6">
            <QuantumResistantContracts />
          </TabsContent>

          <TabsContent value="democracy" className="space-y-6">
            <LiquidDemocracy />
          </TabsContent>

          <TabsContent value="cross-chain" className="space-y-6">
            <CrossChainIntegration />
          </TabsContent>

          <TabsContent value="audit-trails" className="space-y-6">
            <TemporalAuditTrails />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
