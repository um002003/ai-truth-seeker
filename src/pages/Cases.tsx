
import MainLayout from '@/components/layout/MainLayout';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileImage, FileVideo, FileText, FolderOpen, Calendar, Search, Plus } from 'lucide-react';

interface CaseFile {
  id: string;
  name: string;
  dateCreated: Date;
  status: 'open' | 'closed' | 'pending';
  priority: 'high' | 'medium' | 'low';
  fileCount: number;
  deepfakesFound: number;
}

const generateMockCases = (): CaseFile[] => {
  const cases: CaseFile[] = [];
  const now = new Date();
  
  for (let i = 1; i <= 10; i++) {
    const dateCreated = new Date(now);
    dateCreated.setDate(now.getDate() - Math.floor(Math.random() * 30));
    
    const status = ['open', 'closed', 'pending'][Math.floor(Math.random() * 3)] as 'open' | 'closed' | 'pending';
    const priority = ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low';
    const fileCount = Math.floor(Math.random() * 10) + 1;
    const deepfakesFound = Math.floor(Math.random() * fileCount);
    
    cases.push({
      id: `CASE-${1000 + i}`,
      name: [`Election Campaign ${i}`, `Celebrity Interview ${i}`, `Political Speech ${i}`, `News Segment ${i}`][i % 4],
      dateCreated,
      status,
      priority,
      fileCount,
      deepfakesFound
    });
  }
  
  return cases;
};

const Cases = () => {
  const [cases] = useState<CaseFile[]>(generateMockCases);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredCases = cases.filter(caseFile => {
    const matchesSearch = caseFile.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       caseFile.id.toLowerCase().includes(searchQuery.toLowerCase());
                       
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && caseFile.status === activeTab;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Open</Badge>;
      case 'closed':
        return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200">Closed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Pending</Badge>;
      default:
        return null;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="border-red-200 text-red-700">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-amber-200 text-amber-700">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-blue-200 text-blue-700">Low</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">Case Files</h1>
            <p className="text-muted-foreground">Manage and review investigation case files</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Case
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Cases</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cases..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Case ID</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Case Name</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Created</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Priority</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Files</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">Deepfakes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map((caseFile) => (
                    <tr key={caseFile.id} className="border-b hover:bg-muted/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <FolderOpen className="h-4 w-4 text-primary" />
                          {caseFile.id}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{caseFile.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {caseFile.dateCreated.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(caseFile.status)}</td>
                      <td className="py-3 px-4">{getPriorityBadge(caseFile.priority)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {caseFile.fileCount}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={`flex items-center gap-1 ${caseFile.deepfakesFound > 0 ? 'text-red-600' : ''}`}>
                          {caseFile.deepfakesFound > 0 ? (
                            <FileVideo className="h-4 w-4" />
                          ) : (
                            <FileImage className="h-4 w-4" />
                          )}
                          {caseFile.deepfakesFound}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredCases.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No matching case files found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Cases;
