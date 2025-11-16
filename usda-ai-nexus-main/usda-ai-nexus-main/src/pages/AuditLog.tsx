import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockUseCases } from '@/types/useCase';
import { Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AuditLog = () => {
  const auditEntries = mockUseCases
    .map(useCase => ({
      id: useCase.id,
      title: useCase.title,
      action: 'Updated',
      owner: useCase.owner,
      timestamp: useCase.updatedAt,
      department: useCase.department
    }))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-4xl font-bold text-foreground">Audit Log</h1>
          <p className="text-muted-foreground">Track all changes and updates to AI use cases</p>
        </div>

        <Card className="card-shadow border-border/50 animate-in fade-in slide-in-from-top-5 duration-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Complete history of use case modifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Use Case</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                    <TableHead className="font-semibold">Owner</TableHead>
                    <TableHead className="font-semibold">Department</TableHead>
                    <TableHead className="font-semibold text-right">Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditEntries.map((entry, index) => {
                    const { date, time } = formatDateTime(entry.timestamp);
                    return (
                      <TableRow 
                        key={entry.id}
                        className="hover:bg-muted/30 transition-colors"
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                          animation: 'fadeIn 0.5s ease-out forwards',
                          opacity: 0
                        }}
                      >
                        <TableCell className="font-medium text-foreground max-w-xs">
                          <div className="line-clamp-1">{entry.title}</div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                            {entry.action}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{entry.owner}</TableCell>
                        <TableCell className="text-muted-foreground text-sm max-w-xs">
                          <div className="line-clamp-1">{entry.department.split(' ').slice(0, 3).join(' ')}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-foreground font-medium text-sm">{date}</span>
                            <span className="text-muted-foreground text-xs">{time}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AuditLog;
