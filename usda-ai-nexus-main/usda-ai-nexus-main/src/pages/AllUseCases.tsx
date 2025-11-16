import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUseCases, departments, Stage } from '@/types/useCase';
import { Search } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AllUseCases = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStage, setFilterStage] = useState<Stage | 'all'>('all');

  const filteredUseCases = mockUseCases.filter((useCase) => {
    const matchesSearch = useCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         useCase.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         useCase.owner.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || useCase.department === filterDepartment;
    const matchesStage = filterStage === 'all' || useCase.stage === filterStage;

    return matchesSearch && matchesDepartment && matchesStage;
  });

  const handleCardClick = (id: string) => {
    navigate(`/use-case/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-4xl font-bold text-foreground">All Use Cases</h1>
          <p className="text-muted-foreground">Browse and search through all AI projects in the inventory</p>
        </div>

        {/* Search and Filters */}
        <Card className="card-shadow border-border/50 animate-in fade-in slide-in-from-top-5 duration-700">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>Find specific use cases by keywords, department, or stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, description, or owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStage} onValueChange={(value) => setFilterStage(value as Stage | 'all')}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="Idea">Idea</SelectItem>
                  <SelectItem value="Pilot">Pilot</SelectItem>
                  <SelectItem value="Production">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredUseCases.length} of {mockUseCases.length} use cases
            </div>
          </CardContent>
        </Card>

        {/* Use Cases Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-900">
          {filteredUseCases.map((useCase, index) => (
            <Card
              key={useCase.id}
              className="card-shadow border-border/50 hover:card-shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => handleCardClick(useCase.id)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {useCase.title}
                  </CardTitle>
                  <span className={`ml-2 flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    useCase.stage === 'Production' ? 'bg-success/10 text-success' :
                    useCase.stage === 'Pilot' ? 'bg-accent/10 text-accent' :
                    'bg-warning/10 text-warning'
                  }`}>
                    {useCase.stage}
                  </span>
                </div>
                <CardDescription className="line-clamp-3 text-sm">
                  {useCase.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium text-foreground">{useCase.owner}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="font-medium text-foreground text-right text-xs">
                      {useCase.department.split(' ').slice(0, 3).join(' ')}
                    </span>
                  </div>
                </div>

                {useCase.kpis.length > 0 && (
                  <div className="pt-3 border-t border-border">
                    <div className="flex flex-wrap gap-1">
                      {useCase.kpis.slice(0, 2).map((kpi, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground"
                        >
                          {kpi.length > 20 ? kpi.substring(0, 20) + '...' : kpi}
                        </span>
                      ))}
                      {useCase.kpis.length > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                          +{useCase.kpis.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUseCases.length === 0 && (
          <Card className="card-shadow border-border/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground text-center">
                No use cases found matching your search criteria.
                <br />
                Try adjusting your filters or search terms.
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllUseCases;
