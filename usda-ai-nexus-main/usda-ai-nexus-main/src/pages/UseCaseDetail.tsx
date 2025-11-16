import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUseCases } from '@/types/useCase';
import { ArrowLeft, Calendar, User, Building2, TrendingUp } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const UseCaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const useCase = mockUseCases.find(uc => uc.id === id);

  if (!useCase) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Use Case Not Found</h1>
            <Button onClick={() => navigate('/all-use-cases')}>Back to All Use Cases</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-start justify-between py-3 border-b border-border last:border-0">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span className="text-foreground text-right font-semibold max-w-[60%]">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <Button
            variant="ghost"
            onClick={() => navigate('/all-use-cases')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Use Cases
          </Button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">{useCase.title}</h1>
              <p className="text-muted-foreground">{useCase.description}</p>
            </div>
            <span className={`flex-shrink-0 inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              useCase.stage === 'Production' ? 'bg-success/10 text-success' :
              useCase.stage === 'Pilot' ? 'bg-accent/10 text-accent' :
              'bg-warning/10 text-warning'
            }`}>
              {useCase.stage}
            </span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6 animate-in fade-in slide-in-from-top-5 duration-700">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="kpis">KPIs</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="card-shadow border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Project Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                  <InfoRow label="Department" value={useCase.department} />
                  <InfoRow label="Project Owner" value={useCase.owner} />
                  <InfoRow label="Development Stage" value={useCase.stage} />
                </CardContent>
              </Card>

              <Card className="card-shadow border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                  <InfoRow 
                    label="Created On" 
                    value={new Date(useCase.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} 
                  />
                  <InfoRow 
                    label="Last Updated" 
                    value={new Date(useCase.updatedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} 
                  />
                  <InfoRow 
                    label="Days Active" 
                    value={Math.floor((new Date().getTime() - new Date(useCase.createdAt).getTime()) / (1000 * 60 * 60 * 24)).toString()} 
                  />
                </CardContent>
              </Card>
            </div>

            <Card className="card-shadow border-border/50">
              <CardHeader>
                <CardTitle>Ethical Considerations</CardTitle>
                <CardDescription>Key ethical and compliance factors for this project</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{useCase.ethicalConsiderations}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kpis" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="card-shadow border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Target KPIs
                  </CardTitle>
                  <CardDescription>Defined performance indicators for this project</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {useCase.kpis.map((kpi, index) => (
                      <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                          {index + 1}
                        </div>
                        <span className="text-foreground flex-1">{kpi}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {useCase.kpisAchieved && useCase.kpisAchieved.length > 0 && (
                <Card className="card-shadow border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-success">
                      <TrendingUp className="h-5 w-5" />
                      KPIs Achieved
                    </CardTitle>
                    <CardDescription>Successfully met performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {useCase.kpisAchieved.map((kpi, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                          <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center flex-shrink-0">
                            ✓
                          </div>
                          <span className="text-foreground flex-1">{kpi}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card className="card-shadow border-border/50">
              <CardHeader>
                <CardTitle>Challenges & Observations</CardTitle>
                <CardDescription>Key challenges and notes from the project team</CardDescription>
              </CardHeader>
              <CardContent>
                {useCase.challenges ? (
                  <p className="text-foreground leading-relaxed">{useCase.challenges}</p>
                ) : (
                  <p className="text-muted-foreground italic">No challenges or notes recorded yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default UseCaseDetail;
