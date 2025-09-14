"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Trash2, Save, AlertCircle, DollarSign, TrendingUp, Building } from "lucide-react";

export default function StaffDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingItem, setEditingItem] = useState<string | number | null>(null);

  // Import shared context
  const { useTransparencyData } = require("@/components/public/transparency-data-context");
  const {
    fundingSources,
    setFundingSources,
    spendingTrends,
    setSpendingTrends,
    departments,
    setDepartments,
  } = useTransparencyData() || {};

  useEffect(() => {
    // Check if user is logged in and is staff
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data?.user) {
        router.replace("/auth/login");
        return;
      }
      // Fetch profile and check role
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", data.user.id)
        .single();
        
      if (profileError || !profileData || profileData.role !== "staff") {
        router.replace("/dashboard");
        return;
      }
      setLoading(false);
    });
  }, [router]);

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const calculatePercentage = (spent: number, allocated: number) => {
    if (!allocated || allocated === 0) return 0;
    return Math.round((spent / allocated) * 100);
  };

  // Funding Sources Functions
  const addFundingSource = () => {
    const newSource = {
      id: Date.now(),
      name: '',
      type: 'federal',
      total_amount: 0,
      available_amount: 0,
      description: ''
    };
    setFundingSources([...fundingSources, newSource]);
  setEditingItem(newSource.id);
  };

  const updateFundingSource = (idx: number, field: string, value: string | number) => {
    const updated = [...fundingSources];
    updated[idx][field] = field.includes('amount') ? Number(value) : value;
    
    // Auto-calculate available amount if total is updated
    if (field === 'total_amount') {
      updated[idx].available_amount = Math.max(0, Number(value) - (updated[idx].spent || 0));
    }
    
    setFundingSources(updated);
  };

  const deleteFundingSource = (idx: number) => {
    if (confirm('Are you sure you want to delete this funding source?')) {
  setFundingSources(fundingSources.filter((_: any, i: number) => i !== idx));
      showMessage('success', 'Funding source deleted successfully');
    }
  };

  // Spending Trends Functions
  const addSpendingTrend = () => {
    const newTrend = {
      month: new Date().toISOString().slice(0, 7), // YYYY-MM format
      spending: 0,
      cumulative: (spendingTrends[spendingTrends.length - 1]?.cumulative || 0)
    };
    setSpendingTrends([...spendingTrends, newTrend]);
  setEditingItem(newTrend.month);
  };

  const updateSpendingTrend = (idx: number, field: string, value: string | number) => {
    const updated = [...spendingTrends];
    updated[idx][field] = field === 'month' ? value : Number(value);
    
    // Recalculate cumulative if spending changes
    if (field === 'spending') {
      for (let i = idx; i < updated.length; i++) {
        if (i === 0) {
          updated[i].cumulative = updated[i].spending;
        } else {
          updated[i].cumulative = updated[i - 1].cumulative + updated[i].spending;
        }
      }
    }
    
    setSpendingTrends(updated);
  };

  const deleteSpendingTrend = (idx: number) => {
    if (confirm('Are you sure you want to delete this spending record?')) {
  const updated = spendingTrends.filter((_: any, i: number) => i !== idx);
      // Recalculate cumulative for remaining items
  updated.forEach((item: any, i: number) => {
        item.cumulative = i === 0 ? item.spending : updated[i - 1].cumulative + item.spending;
      });
      setSpendingTrends(updated);
      showMessage('success', 'Spending record deleted successfully');
    }
  };

  // Department Functions
  const addDepartment = () => {
    const newDept = {
      code: '',
      name: '',
      type: 'operational',
      description: '',
      allocated: 0,
      spent: 0
    };
    setDepartments([...departments, newDept]);
  setEditingItem(newDept.code);
  };

  const updateDepartment = (idx: number, field: string, value: string | number) => {
    const updated = [...departments];
    updated[idx][field] = field.includes('allocated') || field.includes('spent') ? Number(value) : value;
    setDepartments(updated);
  };

  const deleteDepartment = (idx: number) => {
    if (confirm('Are you sure you want to delete this department?')) {
  setDepartments(departments.filter((_: any, i: number) => i !== idx));
      showMessage('success', 'Department deleted successfully');
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      // Here you would typically save to your database
      // For now, we'll just simulate a save
      await new Promise(resolve => setTimeout(resolve, 1000));
      showMessage('success', 'Changes saved successfully!');
    } catch (error) {
      showMessage('error', 'Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <Button onClick={() => router.replace('/auth/login')} variant="outline" className="mb-2">
          &larr; Back to Login
        </Button>
      </div>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage financial transparency data</p>
            </div>
            <Button 
              onClick={saveChanges} 
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Messages */}
        {message.text && (
          <Alert className={`mb-6 ${message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className={message.type === 'error' ? 'text-red-800' : 'text-green-800'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Funding</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(fundingSources?.reduce((sum: number, f: any) => sum + (f.total_amount || 0), 0))}
                  </p>
                </div>
                <DollarSign className="h-10 w-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Allocated</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(departments?.reduce((sum: number, d: any) => sum + (d.allocated || 0), 0))}
                  </p>
                </div>
                <Building className="h-10 w-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(departments?.reduce((sum: number, d: any) => sum + (d.spent || 0), 0))}
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="funding" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="funding">Funding Sources</TabsTrigger>
            <TabsTrigger value="spending">Spending Trends</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
          </TabsList>

          {/* Funding Sources Tab */}
          <TabsContent value="funding">
            <Card className="bg-white shadow-lg">
              <CardHeader className="border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">Funding Sources</CardTitle>
                  <Button onClick={addFundingSource} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Source
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fundingSources?.map((fund: any, idx: number) => (
                        <tr key={fund.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <Input
                              value={fund.name}
                              onChange={(e) => updateFundingSource(idx, 'name', e.target.value)}
                              className="min-w-[150px]"
                              placeholder="Funding source name"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <Select value={fund.type} onValueChange={(value) => updateFundingSource(idx, 'type', value)}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="federal">Federal</SelectItem>
                                <SelectItem value="state">State</SelectItem>
                                <SelectItem value="local">Local</SelectItem>
                                <SelectItem value="private">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="px-6 py-4">
                            <Input
                              type="number"
                              value={fund.total_amount}
                              onChange={(e) => updateFundingSource(idx, 'total_amount', e.target.value)}
                              className="w-32"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{formatCurrency(fund.available_amount)}</span>
                              <Badge variant={fund.available_amount > 0 ? "default" : "destructive"}>
                                {fund.available_amount > 0 ? "Available" : "Depleted"}
                              </Badge>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Input
                              value={fund.description}
                              onChange={(e) => updateFundingSource(idx, 'description', e.target.value)}
                              className="min-w-[200px]"
                              placeholder="Description"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              onClick={() => deleteFundingSource(idx)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Spending Trends Tab */}
          <TabsContent value="spending">
            <Card className="bg-white shadow-lg">
              <CardHeader className="border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">Spending Trends</CardTitle>
                  <Button onClick={addSpendingTrend} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Record
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Spending</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cumulative Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {spendingTrends?.map((trend: any, idx: number) => (
                        <tr key={trend.month} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <Input
                              type="month"
                              value={trend.month}
                              onChange={(e) => updateSpendingTrend(idx, 'month', e.target.value)}
                              className="w-40"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <Input
                              type="number"
                              value={trend.spending}
                              onChange={(e) => updateSpendingTrend(idx, 'spending', e.target.value)}
                              className="w-32"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-lg">{formatCurrency(trend.cumulative)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              onClick={() => deleteSpendingTrend(idx)}
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments">
            <Card className="bg-white shadow-lg">
              <CardHeader className="border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">Department Investments</CardTitle>
                  <Button onClick={addDepartment} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Department
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocated</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {departments?.map((dept: any, idx: number) => {
                        const usagePercentage = calculatePercentage(dept.spent, dept.allocated);
                        return (
                          <tr key={dept.code} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <Input
                                value={dept.name}
                                onChange={(e) => updateDepartment(idx, 'name', e.target.value)}
                                className="min-w-[150px]"
                                placeholder="Department name"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <Input
                                value={dept.code}
                                onChange={(e) => updateDepartment(idx, 'code', e.target.value)}
                                className="w-20"
                                placeholder="CODE"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <Select value={dept.type} onValueChange={(value) => updateDepartment(idx, 'type', value)}>
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="operational">Operational</SelectItem>
                                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                  <SelectItem value="social">Social</SelectItem>
                                  <SelectItem value="emergency">Emergency</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="px-6 py-4">
                              <Input
                                type="number"
                                value={dept.allocated}
                                onChange={(e) => updateDepartment(idx, 'allocated', e.target.value)}
                                className="w-32"
                                placeholder="0"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <Input
                                type="number"
                                value={dept.spent}
                                onChange={(e) => updateDepartment(idx, 'spent', e.target.value)}
                                className="w-32"
                                placeholder="0"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      usagePercentage > 90 ? 'bg-red-600' : 
                                      usagePercentage > 70 ? 'bg-yellow-600' : 'bg-green-600'
                                    }`}
                                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{usagePercentage}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Button
                                onClick={() => deleteDepartment(idx)}
                                variant="destructive"
                                size="sm"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}