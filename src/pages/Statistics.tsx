import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BadgeAlert, Shield, UserRound, AlertTriangle, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart } from '@tremor/react';
import { StatMetric, IncidentRecord } from '@/types/statistics';

const INITIAL_TABLE_DATA: IncidentRecord[] = [
  { id: 1, type: 'Cyberbullying', severity: 'High', status: 'Active', date: '2024-03-15' },
  { id: 2, type: 'Harassment', severity: 'Medium', status: 'Resolved', date: '2024-03-14' },
  { id: 3, type: 'Threats', severity: 'High', status: 'Under Review', date: '2024-03-13' },
  { id: 4, type: 'Impersonation', severity: 'Medium', status: 'Active', date: '2024-03-12' },
  { id: 5, type: 'Exclusion', severity: 'Low', status: 'Resolved', date: '2024-03-10' },
];

export const Statistics = () => {
  const [activeFilter, setActiveFilter] = useState<'monthly' | 'quarterly'>('monthly');
  const [sortField, setSortField] = useState<keyof IncidentRecord>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const monthlyStats: StatMetric[] = [
    {
      title: 'Total Reports',
      value: '1,234',
      icon: BadgeAlert,
      change: '+12%',
      description: 'Reported incidents this month',
      progress: 78,
      breakdown: [
        { category: 'Verbal Harassment', percentage: 45 },
        { category: 'Exclusion', percentage: 25 },
        { category: 'Threats', percentage: 15 },
        { category: 'Impersonation', percentage: 15 },
      ],
    },
    {
      title: 'Active Cases',
      value: '89',
      icon: AlertTriangle,
      change: '-4%',
      description: 'Currently being investigated',
      progress: 62,
      breakdown: [
        { category: 'High Priority', percentage: 35 },
        { category: 'Medium Priority', percentage: 40 },
        { category: 'Low Priority', percentage: 25 },
      ],
    },
    {
      title: 'Resolved',
      value: '892',
      icon: Shield,
      change: '+24%',
      description: 'Successfully resolved cases',
      progress: 85,
      breakdown: [
        { category: 'School Interventions', percentage: 40 },
        { category: 'Counseling', percentage: 30 },
        { category: 'Direct Support', percentage: 30 },
      ],
    },
    {
      title: 'Affected Users',
      value: '328',
      icon: UserRound,
      change: '+8%',
      description: 'Users requiring support',
      progress: 55,
      breakdown: [
        { category: 'Students', percentage: 70 },
        { category: 'Teachers', percentage: 15 },
        { category: 'Parents', percentage: 15 },
      ],
    },
  ];

  const quarterlyStats: StatMetric[] = monthlyStats.map((stat) => ({
    ...stat,
    value: (parseInt(stat.value.replace(/,/g, ''), 10) * 3).toLocaleString(),
    change: stat.change.startsWith('+')
      ? `+${(parseFloat(stat.change.slice(1)) * 3).toFixed(0)}%`
      : `-${(parseFloat(stat.change.slice(1)) * 3).toFixed(0)}%`,
    progress: Math.min(stat.progress + 10, 95),
  }));

  const renderStats = activeFilter === 'monthly' ? monthlyStats : quarterlyStats;

  const chartdata = [
    { month: 'Jan', Cyberbullying: 45, Harassment: 35 },
    { month: 'Feb', Cyberbullying: 52, Harassment: 42 },
    { month: 'Mar', Cyberbullying: 48, Harassment: 38 },
    { month: 'Apr', Cyberbullying: 61, Harassment: 45 },
    { month: 'May', Cyberbullying: 55, Harassment: 41 },
  ];

  const sortedTableData = [...INITIAL_TABLE_DATA].sort((a, b) => {
    const compareA = a[sortField];
    const compareB = b[sortField];
    if (typeof compareA === 'string' && typeof compareB === 'string') {
      return sortDirection === 'asc'
        ? compareA.localeCompare(compareB)
        : compareB.localeCompare(compareA);
    }
    return sortDirection === 'asc'
      ? (compareA as number) - (compareB as number)
      : (compareB as number) - (compareA as number);
  });

  const handleSort = (field: keyof IncidentRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Incident Analytics & Transparency</h1>
          <p className="text-indigo-200 mt-1">Real-time telemetry and resolution rates across the platform.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white/10 p-1 rounded-xl backdrop-blur-md self-start border border-white/10">
          <button
            type="button"
            onClick={() => setActiveFilter('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeFilter === 'monthly' ? 'bg-white text-indigo-900 shadow-sm' : 'text-white hover:text-indigo-100'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('quarterly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeFilter === 'quarterly' ? 'bg-white text-indigo-900 shadow-sm' : 'text-white hover:text-indigo-100'
            }`}
          >
            Quarterly
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderStats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <Card key={stat.title} className="bg-white/95 backdrop-blur-md border border-indigo-100 shadow-lg rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className="p-2 bg-indigo-50 rounded-xl">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center space-x-1.5 text-xs mt-1">
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-rose-600" />
                  )}
                  <span className={isPositive ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500">vs last period</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Resolution Index</span>
                    <span className="font-medium text-gray-700">{stat.progress}%</span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full mt-4 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 text-xs">
                      View Breakdown
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md bg-white rounded-2xl">
                    <DialogHeader>
                      <DialogTitle>{stat.title} Breakdown</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 pt-3">
                      {stat.breakdown.map((item) => (
                        <div key={item.category} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.category}</span>
                            <span className="font-semibold text-gray-900">{item.percentage}%</span>
                          </div>
                          <Progress value={item.percentage} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tremor Chart */}
      <Card className="bg-white/95 backdrop-blur-md border border-indigo-100 shadow-xl rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Incident Volume Trends</h3>
            <p className="text-xs text-gray-500">Tracked categories: Cyberbullying vs Harassment</p>
          </div>
          <BarChart2 className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="h-72">
          <BarChart
            data={chartdata}
            index="month"
            categories={['Cyberbullying', 'Harassment']}
            colors={['indigo', 'rose']}
            yAxisWidth={32}
            className="h-full"
          />
        </div>
      </Card>

      {/* Incident Case Log Table */}
      <Card className="bg-white/95 backdrop-blur-md border border-indigo-100 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">Recent Incident Records</CardTitle>
          <p className="text-xs text-gray-500">Anonymized logs for audit & safety monitoring</p>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="cursor-pointer hover:text-indigo-600 font-semibold" onClick={() => handleSort('id')}>
                    Case ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer hover:text-indigo-600 font-semibold" onClick={() => handleSort('type')}>
                    Category {sortField === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer hover:text-indigo-600 font-semibold" onClick={() => handleSort('severity')}>
                    Severity {sortField === 'severity' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer hover:text-indigo-600 font-semibold" onClick={() => handleSort('status')}>
                    Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="cursor-pointer hover:text-indigo-600 font-semibold" onClick={() => handleSort('date')}>
                    Date Logged {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedTableData.map((row) => (
                  <TableRow key={row.id} className="hover:bg-indigo-50/40 transition">
                    <TableCell className="font-medium text-gray-900">#CASE-{row.id.toString().padStart(4, '0')}</TableCell>
                    <TableCell className="text-gray-700">{row.type}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                          row.severity === 'High' || row.severity === 'Critical'
                            ? 'bg-rose-100 text-rose-700'
                            : row.severity === 'Medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {row.severity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          row.status === 'Resolved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : row.status === 'Active'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-500 text-xs">{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
