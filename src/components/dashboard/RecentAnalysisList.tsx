
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileImage, FileVideo, Eye, ArrowRight } from 'lucide-react';

interface AnalysisItem {
  id: string;
  filename: string;
  timestamp: Date;
  fileType: 'image' | 'video';
  result: 'deepfake' | 'authentic' | 'inconclusive';
  confidenceScore: number;
  caseName?: string;
}

const generateMockData = (): AnalysisItem[] => {
  const items: AnalysisItem[] = [];
  const now = new Date();
  
  for (let i = 0; i < 5; i++) {
    const timestamp = new Date(now);
    timestamp.setHours(now.getHours() - i * Math.random() * 5);
    
    const confidenceScore = Math.floor(Math.random() * 100);
    let result: 'deepfake' | 'authentic' | 'inconclusive';
    
    if (confidenceScore > 70) {
      result = 'deepfake';
    } else if (confidenceScore < 30) {
      result = 'authentic';
    } else {
      result = 'inconclusive';
    }
    
    items.push({
      id: `AF-${Date.now().toString(36)}-${i}`,
      filename: [`suspect-interview-${i}.mp4`, `evidence-photo-${i}.jpg`, `surveillance-cam-${i}.mp4`, `suspect-profile-${i}.png`][i % 4],
      timestamp,
      fileType: i % 2 === 0 ? 'video' : 'image',
      result,
      confidenceScore,
      caseName: i % 3 === 0 ? `Case #${1000 + i}` : undefined
    });
  }
  
  return items;
};

const RecentAnalysisList = () => {
  const [analyses] = useState<AnalysisItem[]>(generateMockData);
  
  const getResultBadge = (result: string) => {
    switch (result) {
      case 'deepfake':
        return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200">Deepfake</Badge>;
      case 'authentic':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200">Authentic</Badge>;
      case 'inconclusive':
        return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200">Inconclusive</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Recent Analyses</CardTitle>
            <CardDescription>Latest deepfake analysis results</CardDescription>
          </div>
          <Button variant="ghost" className="text-sm" size="sm">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analyses.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded bg-background flex items-center justify-center">
                  {item.fileType === 'image' ? (
                    <FileImage className="h-5 w-5 text-primary" />
                  ) : (
                    <FileVideo className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.filename}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">
                      {item.timestamp.toLocaleString()}
                    </p>
                    {item.caseName && (
                      <Badge variant="outline" className="text-xs bg-secondary">
                        {item.caseName}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getResultBadge(item.result)}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAnalysisList;
