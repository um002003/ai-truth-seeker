
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  FileSpreadsheet,
  Share2,
  Shield,
  X
} from 'lucide-react';

// Define the types for analysis results
interface AnalysisDetail {
  name: string;
  score: number;
  description: string;
}

interface AnalysisResult {
  id: string;
  filename: string;
  fileType: 'image' | 'video';
  fileSize: string;
  uploadDate: string;
  isDeepfake: boolean;
  confidenceScore: number;
  processingTime: string;
  analysisDetails: {
    facial: AnalysisDetail[];
    metadata: AnalysisDetail[];
    visual: AnalysisDetail[];
  };
  anomalies: string[];
}

interface AnalysisResultsProps {
  file: File | null;
  onReset: () => void;
}

// This is a mock analysis function that would be replaced with actual AI processing
const generateMockAnalysis = (file: File): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isDeepfake = Math.random() > 0.5;
      const confidenceScore = isDeepfake 
        ? 70 + Math.random() * 25 
        : 15 + Math.random() * 20;
      
      const result: AnalysisResult = {
        id: `AF-${Date.now().toString(36)}`,
        filename: file.name,
        fileType: file.type.includes('image') ? 'image' : 'video',
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        uploadDate: new Date().toISOString(),
        isDeepfake: isDeepfake,
        confidenceScore: Number(confidenceScore.toFixed(1)),
        processingTime: `${(1 + Math.random() * 4).toFixed(1)} seconds`,
        analysisDetails: {
          facial: [
            {
              name: 'Face Inconsistency',
              score: isDeepfake ? 65 + Math.random() * 30 : 10 + Math.random() * 20,
              description: 'Analysis of facial structure and features consistency between frames'
            },
            {
              name: 'Eye Blinking',
              score: isDeepfake ? 70 + Math.random() * 25 : 5 + Math.random() * 15,
              description: 'Detection of natural eye blinking patterns'
            },
            {
              name: 'Lip Sync',
              score: isDeepfake ? 60 + Math.random() * 35 : 5 + Math.random() * 10,
              description: 'Analysis of lip movement synchronization with audio'
            }
          ],
          metadata: [
            {
              name: 'Compression Analysis',
              score: isDeepfake ? 55 + Math.random() * 30 : 10 + Math.random() * 25,
              description: 'Analysis of compression artifacts and patterns'
            },
            {
              name: 'Metadata Consistency',
              score: isDeepfake ? 50 + Math.random() * 45 : 5 + Math.random() * 20,
              description: 'Evaluation of file metadata integrity'
            }
          ],
          visual: [
            {
              name: 'Lighting Inconsistency',
              score: isDeepfake ? 65 + Math.random() * 25 : 10 + Math.random() * 15,
              description: 'Detection of inconsistent lighting and shadows'
            },
            {
              name: 'Boundary Detection',
              score: isDeepfake ? 70 + Math.random() * 20 : 5 + Math.random() * 15,
              description: 'Analysis of facial boundaries and masking artifacts'
            },
            {
              name: 'Motion Analysis',
              score: isDeepfake ? 60 + Math.random() * 30 : 10 + Math.random() * 20,
              description: 'Evaluation of natural movement patterns'
            }
          ]
        },
        anomalies: isDeepfake 
          ? [
              'Unnatural eye movement detected',
              'Facial boundary inconsistencies', 
              'Irregular light reflection patterns',
              'Abnormal compression artifacts around facial region'
            ].slice(0, 2 + Math.floor(Math.random() * 3))
          : []
      };
      
      resolve(result);
    }, 3000); // Simulate processing time
  });
};

const AnalysisResults = ({ file, onReset }: AnalysisResultsProps) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (!file) return;

    let mounted = true;
    setIsProcessing(true);
    setProgress(0);

    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + (95 - prev) * 0.1;
      });
    }, 300);

    // Generate mock analysis result
    generateMockAnalysis(file).then((result) => {
      if (mounted) {
        setProgress(100);
        setTimeout(() => {
          setIsProcessing(false);
          setAnalysis(result);
        }, 500);
      }
    });

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [file]);

  if (isProcessing) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Processing Evidence</CardTitle>
          <CardDescription>
            Running advanced deepfake detection analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-20 h-20 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-primary border-b-muted border-l-muted animate-spin-slow"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="h-10 w-10 text-primary" />
              </div>
            </div>
            <Progress value={progress} className="w-full max-w-md h-2 mt-4" />
            <p className="text-sm text-muted-foreground mt-2">
              {progress < 100 ? 'Analyzing file patterns...' : 'Finalizing results...'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) return null;

  const scoreColor = (score: number) => {
    if (score < 30) return 'bg-green-100 text-green-600';
    if (score < 60) return 'bg-amber-100 text-amber-600';
    return 'bg-red-100 text-red-600';
  };

  const severityBadge = () => {
    const score = analysis.confidenceScore;
    if (score < 30) return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Low Risk</Badge>;
    if (score < 60) return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200">Moderate Risk</Badge>;
    if (score < 80) return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">High Risk</Badge>;
    return <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Critical Risk</Badge>;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Analysis Report
              <span className="text-xs font-normal bg-primary/10 py-1 px-2 rounded-md text-primary">
                #{analysis.id}
              </span>
            </CardTitle>
            <CardDescription>
              Analysis completed {new Date(analysis.uploadDate).toLocaleString()}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onReset}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* File Information */}
        <div className="flex flex-wrap gap-6 bg-secondary p-4 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">File Name</p>
            <p className="font-medium">{analysis.filename}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">File Type</p>
            <p className="font-medium capitalize">{analysis.fileType}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">File Size</p>
            <p className="font-medium">{analysis.fileSize}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Processing Time</p>
            <p className="font-medium">{analysis.processingTime}</p>
          </div>
        </div>

        {/* Analysis Summary */}
        <Alert variant={analysis.isDeepfake ? "destructive" : "default"} className={analysis.isDeepfake ? "bg-red-50 text-red-900 border-red-200" : "bg-green-50 text-green-900 border-green-200"}>
          <div className="flex items-center gap-2">
            {analysis.isDeepfake ? 
              <AlertTriangle className="h-5 w-5" /> : 
              <CheckCircle className="h-5 w-5" />
            }
            <AlertTitle>
              {analysis.isDeepfake ? 
                "Deepfake Detected" : 
                "No Deepfake Detected"
              }
            </AlertTitle>
          </div>
          <AlertDescription className="mt-2">
            {analysis.isDeepfake ? 
              `Our analysis indicates this content is likely manipulated with ${analysis.confidenceScore}% confidence.` : 
              `Our analysis indicates this content is likely authentic with ${100 - analysis.confidenceScore}% confidence.`
            }
          </AlertDescription>
        </Alert>

        {/* Confidence Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Deepfake Confidence Score</h3>
              {severityBadge()}
            </div>
            <span className="font-bold text-lg">{analysis.confidenceScore}%</span>
          </div>
          <Progress value={analysis.confidenceScore} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            <Clock className="inline h-3 w-3 mr-1" />
            Last updated: {new Date(analysis.uploadDate).toLocaleString()}
          </p>
        </div>

        {analysis.anomalies.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <h3 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Detected Anomalies
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {analysis.anomalies.map((anomaly, index) => (
                <li key={index} className="text-amber-700 text-sm">{anomaly}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Detailed Analysis Tabs */}
        <Tabs defaultValue="facial" className="mt-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="facial">Facial Analysis</TabsTrigger>
            <TabsTrigger value="visual">Visual Analysis</TabsTrigger>
            <TabsTrigger value="metadata">Metadata Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="facial" className="space-y-4">
            {analysis.analysisDetails.facial.map((detail, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{detail.name}</h4>
                    <p className="text-sm text-muted-foreground">{detail.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${scoreColor(detail.score)}`}>
                    {detail.score.toFixed(1)}%
                  </span>
                </div>
                <Progress value={detail.score} className="h-2" />
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="visual" className="space-y-4">
            {analysis.analysisDetails.visual.map((detail, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{detail.name}</h4>
                    <p className="text-sm text-muted-foreground">{detail.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${scoreColor(detail.score)}`}>
                    {detail.score.toFixed(1)}%
                  </span>
                </div>
                <Progress value={detail.score} className="h-2" />
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="metadata" className="space-y-4">
            {analysis.analysisDetails.metadata.map((detail, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{detail.name}</h4>
                    <p className="text-sm text-muted-foreground">{detail.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${scoreColor(detail.score)}`}>
                    {detail.score.toFixed(1)}%
                  </span>
                </div>
                <Progress value={detail.score} className="h-2" />
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <Separator />

        {/* Actions Row */}
        <div className="flex flex-wrap justify-between items-center pt-2">
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Export Data
            </Button>
          </div>
          <div>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share with Team
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
