import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUseCases } from '@/types/useCase';
import { TrendingUp, Users, Zap, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const totalProjects = mockUseCases.length;
  const departments = new Set(mockUseCases.map(uc => uc.department)).size;
  
  const stageData = [
    { name: 'Idea', value: mockUseCases.filter(uc => uc.stage === 'Idea').length, color: 'hsl(var(--chart-4))' },
    { name: 'Pilot', value: mockUseCases.filter(uc => uc.stage === 'Pilot').length, color: 'hsl(var(--chart-2))' },
    { name: 'Production', value: mockUseCases.filter(uc => uc.stage === 'Production').length, color: 'hsl(var(--chart-3))' },
  ];

  const departmentData = mockUseCases.reduce((acc, uc) => {
    const existing = acc.find(d => d.name === uc.department);
    if (existing) {
      existing.projects += 1;
    } else {
      acc.push({ name: uc.department.split(' ').slice(0, 3).join(' '), projects: 1 });
    }
    return acc;
  }, [] as { name: string; projects: number }[]);

  const recentUseCases = [...mockUseCases]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const stats = [
    { title: 'Total AI Projects', value: totalProjects.toString(), icon: Zap, description: 'Active use cases', color: 'text-chart-1' },
    { title: 'Departments', value: departments.toString(), icon: Users, description: 'Using AI solutions', color: 'text-chart-2' },
    { title: 'In Production', value: stageData.find(s => s.name === 'Production')?.value.toString() || '0', icon: TrendingUp, description: 'Fully deployed', color: 'text-chart-3' },
    { title: 'In Development', value: (stageData.find(s => s.name === 'Pilot')?.value || 0).toString(), icon: Clock, description: 'Pilot stage', color: 'text-chart-4' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of AI initiatives across USDA.</p>
          <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-top-5 duration-700">
          {stats.map((stat, index) => (
            <Card key={index} className="card-shadow border-border/50 hover:card-shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2 animate-in fade-in slide-in-from-top-6 duration-900">
          {/* Stage Distribution Pie Chart */}
          <Card className="card-shadow border-border/50">
            <CardHeader>
              <CardTitle>Projects by Stage</CardTitle>
              <CardDescription>Distribution across development stages</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Bar Chart */}
          <Card className="card-shadow border-border/50">
            <CardHeader>
              <CardTitle>Projects by Department</CardTitle>
              <CardDescription>AI initiatives across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="projects" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recently Updated Use Cases */}
        <Card className="card-shadow border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <CardHeader>
            <CardTitle>Recently Updated Use Cases</CardTitle>
            <CardDescription>Latest activity across all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUseCases.map((useCase) => (
                <div
                  key={useCase.id}
                  className="flex items-start justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50"
                >
                  <div className="space-y-1 flex-1">
                    <h4 className="font-semibold text-foreground">{useCase.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{useCase.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                        {useCase.department.split(' ').slice(0, 3).join(' ')}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        useCase.stage === 'Production' ? 'bg-success text-success-foreground' :
                        useCase.stage === 'Pilot' ? 'bg-accent text-accent-foreground' :
                        'bg-warning text-warning-foreground'
                      }`}>
                        {useCase.stage}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground ml-4 flex-shrink-0">
                    {new Date(useCase.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
