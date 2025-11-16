import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { departments, Stage } from '@/types/useCase';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AddUseCase = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [stage, setStage] = useState<Stage | ''>('');
  const [owner, setOwner] = useState('');
  const [kpiInput, setKpiInput] = useState('');
  const [kpis, setKpis] = useState<string[]>([]);
  const [ethicalConsiderations, setEthicalConsiderations] = useState('');

  const handleAddKpi = () => {
    if (kpiInput.trim()) {
      setKpis([...kpis, kpiInput.trim()]);
      setKpiInput('');
    }
  };

  const handleRemoveKpi = (index: number) => {
    setKpis(kpis.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !department || !stage || !owner || kpis.length === 0 || !ethicalConsiderations) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Use case saved successfully!');
    navigate('/all-use-cases');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Add New Use Case</h1>
            <p className="text-muted-foreground">Submit a new AI project or use case to the inventory</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card className="card-shadow border-border/50">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide core details about the AI use case</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., AI for Crop Prediction"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the AI use case, its objectives, and expected outcomes..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stage">Development Stage *</Label>
                    <Select value={stage} onValueChange={(value) => setStage(value as Stage)}>
                      <SelectTrigger id="stage">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Idea">Idea</SelectItem>
                        <SelectItem value="Pilot">Pilot</SelectItem>
                        <SelectItem value="Production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner">Project Owner *</Label>
                  <Input
                    id="owner"
                    placeholder="e.g., Dr. Jane Smith"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* KPIs */}
            <Card className="card-shadow border-border/50">
              <CardHeader>
                <CardTitle>Key Performance Indicators (KPIs)</CardTitle>
                <CardDescription>Define measurable goals for this project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., 95% accuracy, Reduce processing time by 50%"
                    value={kpiInput}
                    onChange={(e) => setKpiInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKpi())}
                  />
                  <Button type="button" onClick={handleAddKpi}>Add</Button>
                </div>

                {kpis.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {kpis.map((kpi, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {kpi}
                        <button
                          type="button"
                          onClick={() => handleRemoveKpi(index)}
                          className="hover:text-destructive transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ethical Considerations */}
            <Card className="card-shadow border-border/50">
              <CardHeader>
                <CardTitle>Ethical Considerations</CardTitle>
                <CardDescription>Address potential ethical implications and safeguards</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe data privacy measures, bias mitigation strategies, transparency requirements, etc."
                  rows={4}
                  value={ethicalConsiderations}
                  onChange={(e) => setEthicalConsiderations(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4 justify-end">
              <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-primary text-primary-foreground">
                Save Use Case
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddUseCase;
