
"use client"

import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area } from "recharts"
import { Application } from "@/lib/types"

type AnalyticsChartsProps = {
  applications: Application[]
}

const COLORS = {
    'Accepted': 'hsl(var(--primary))',
    'Under Review': 'hsl(var(--chart-2))',
    'Rejected': 'hsl(var(--destructive))',
    'Submitted': 'hsl(var(--muted-foreground))',
    'Correction Requested': 'hsl(var(--chart-4))',
};

// Helper function to process data for charts
const processData = (applications: Application[]) => {
  const facultyCounts: { [key: string]: number } = {}
  const statusCounts: { [key: string]: number } = {}
   const monthlyCounts: { [key: string]: number } = {
    'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0,
    'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0
  };

  applications.forEach(app => {
    // Faculty distribution
    facultyCounts[app.faculty] = (facultyCounts[app.faculty] || 0) + 1
    
    // Status distribution
    statusCounts[app.status] = (statusCounts[app.status] || 0) + 1

    // Monthly submission trends
    const month = new Date(app.submissionDate).toLocaleString('default', { month: 'short' });
    if (monthlyCounts.hasOwnProperty(month)) {
        monthlyCounts[month]++;
    }
  })

  const facultyData = Object.keys(facultyCounts).map(faculty => ({
    name: faculty,
    applications: facultyCounts[faculty],
  }))

  const statusData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status],
  }))

  const trendData = Object.keys(monthlyCounts).map(month => ({
      name: month,
      applications: monthlyCounts[month]
  }));


  return { facultyData, statusData, trendData }
}

export function AnalyticsCharts({ applications }: AnalyticsChartsProps) {
  const { facultyData, statusData, trendData } = processData(applications)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="col-span-1 lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4 text-center">Application Submission Trends</h3>
         <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        borderColor: 'hsl(var(--border))'
                    }}
                />
                <Area type="monotone" dataKey="applications" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">Applications by Faculty</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={facultyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    borderColor: 'hsl(var(--border))'
                }}
            />
            <Bar dataKey="applications" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">Application Status Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                return (
                  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
              ))}
            </Pie>
            <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    borderColor: 'hsl(var(--border))'
                }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
