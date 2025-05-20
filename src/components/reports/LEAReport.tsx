
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileDown, Printer, FileText, ShieldAlert } from 'lucide-react';
import { AnalysisResult } from '@/components/analysis/AnalysisResults';

interface LEAReportProps {
  analysisResult: AnalysisResult;
}

const LEAReport = ({ analysisResult }: LEAReportProps) => {
  const currentDate = new Date().toLocaleString();
  const caseNumber = `DCF-${Date.now().toString().slice(-8)}`;
  
  // Prepare evidence summary
  const getEvidenceSummary = () => {
    const anomalies = analysisResult.anomalies.length > 0 
      ? analysisResult.anomalies.join("; ") 
      : "No significant anomalies detected";
      
    return anomalies;
  };

  // Prepare evidence classification
  const getEvidenceClass = () => {
    const score = analysisResult.confidenceScore;
    if (score > 80) return "Class A (High Confidence Deepfake)";
    if (score > 60) return "Class B (Moderate Confidence Deepfake)";
    if (score > 30) return "Class C (Suspicious but Inconclusive)";
    return "Class D (Likely Authentic)";
  };

  const handlePrint = () => {
    window.print();
  };

  // Mock function to generate PDF - in a real system, this would use a PDF library
  const handleDownloadPDF = () => {
    alert("In a production environment, this would generate a PDF for download.");
  };

  return (
    <div className="law-enforcement-report print:bg-white print:p-10">
      <div className="print:hidden mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Law Enforcement Official Report
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleDownloadPDF}
          >
            <FileDown className="h-4 w-4" />
            Download PDF
          </Button>
          <Button 
            variant="default" 
            className="flex items-center gap-2"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4" />
            Print Report
          </Button>
        </div>
      </div>
      
      <Card className="border-2 border-blue-200 print:border-none print:shadow-none">
        <CardHeader className="bg-blue-50 print:bg-white border-b border-blue-200 print:border-blue-800">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs uppercase text-blue-600 font-semibold mb-1">Confidential - Law Enforcement Use Only</div>
              <CardTitle className="text-xl">Digital Content Forensics Report</CardTitle>
              <div className="text-sm text-muted-foreground mt-1">Report generated on {currentDate}</div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-blue-600 h-10 w-10" />
              <div className="text-right">
                <div className="text-sm font-semibold">Case Ref:</div>
                <div className="text-base">{caseNumber}</div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Evidence Overview Section */}
          <section>
            <h3 className="text-lg font-semibold mb-3">1. Evidence Overview</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <span className="font-semibold">File Reference:</span> {analysisResult.id}
              </div>
              <div>
                <span className="font-semibold">File Name:</span> {analysisResult.filename}
              </div>
              <div>
                <span className="font-semibold">File Type:</span> {analysisResult.fileType.toUpperCase()}
              </div>
              <div>
                <span className="font-semibold">File Size:</span> {analysisResult.fileSize}
              </div>
              <div>
                <span className="font-semibold">Submitted On:</span> {new Date(analysisResult.uploadDate).toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Processing Time:</span> {analysisResult.processingTime}
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Classification:</span> {getEvidenceClass()}
              </div>
            </div>
          </section>

          <Separator />

          {/* Forensic Analysis Section */}
          <section>
            <h3 className="text-lg font-semibold mb-3">2. Forensic Analysis Results</h3>
            
            <div className="mb-4">
              <div className="font-semibold mb-2">Overall Assessment:</div>
              <div className="p-3 rounded-md border flex items-start gap-3">
                {analysisResult.isDeepfake ? (
                  <Badge variant="destructive" className="mt-0.5">MANIPULATED CONTENT</Badge>
                ) : (
                  <Badge variant="outline" className="bg-green-50 text-green-800 mt-0.5">LIKELY AUTHENTIC</Badge>
                )}
                <div>
                  {analysisResult.isDeepfake ? (
                    <p>The submitted digital media has been analyzed and determined to be manipulated with a confidence level of {analysisResult.confidenceScore}%. Multiple detection models indicate synthetic generation or digital manipulation techniques have been applied to this content.</p>
                  ) : (
                    <p>The submitted digital media has been analyzed and appears to be authentic with a confidence level of {(100 - analysisResult.confidenceScore).toFixed(1)}%. No significant indicators of manipulation were detected by the analysis models.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="font-semibold mb-2">Key Findings:</div>
              <div className="p-3 rounded-md border">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li><span className="font-medium">Deepfake Probability:</span> {analysisResult.confidenceScore}%</li>
                  {analysisResult.isDeepfake && (
                    <li>
                      <span className="font-medium">Detected Anomalies:</span> {getEvidenceSummary()}
                    </li>
                  )}
                  <li>
                    <span className="font-medium">Highest Confidence Model:</span> {analysisResult.modelInfo.sort((a, b) => b.confidence - a.confidence)[0].name} ({analysisResult.modelInfo.sort((a, b) => b.confidence - a.confidence)[0].confidence.toFixed(1)}%)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <Separator />

          {/* AI Analysis Models Section */}
          <section>
            <h3 className="text-lg font-semibold mb-3">3. AI Model Analysis Details</h3>
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="text-left p-2 border">Model Name</th>
                  <th className="text-left p-2 border">Version</th>
                  <th className="text-left p-2 border">Confidence</th>
                  <th className="text-left p-2 border">Specialization</th>
                </tr>
              </thead>
              <tbody>
                {analysisResult.modelInfo.map((model, idx) => (
                  <tr key={idx} className="border">
                    <td className="p-2 border font-medium">{model.name}</td>
                    <td className="p-2 border">{model.version}</td>
                    <td className="p-2 border">
                      <Badge className={`${model.confidence > 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {model.confidence.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="p-2 border">{model.specialization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <Separator />

          {/* Detailed Findings Section */}
          <section>
            <h3 className="text-lg font-semibold mb-3">4. Detection Category Analysis</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">4.1 Facial Analysis</h4>
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-2 border">Detection Method</th>
                      <th className="text-left p-2 border">Confidence Score</th>
                      <th className="text-left p-2 border">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisResult.analysisDetails.facial.map((detail, idx) => (
                      <tr key={idx}>
                        <td className="p-2 border">{detail.name}</td>
                        <td className="p-2 border">
                          <Badge className={`${detail.score > 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {detail.score.toFixed(1)}%
                          </Badge>
                        </td>
                        <td className="p-2 border">{detail.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">4.2 Visual Analysis</h4>
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-2 border">Detection Method</th>
                      <th className="text-left p-2 border">Confidence Score</th>
                      <th className="text-left p-2 border">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisResult.analysisDetails.visual.map((detail, idx) => (
                      <tr key={idx}>
                        <td className="p-2 border">{detail.name}</td>
                        <td className="p-2 border">
                          <Badge className={`${detail.score > 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {detail.score.toFixed(1)}%
                          </Badge>
                        </td>
                        <td className="p-2 border">{detail.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">4.3 Metadata Analysis</h4>
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-2 border">Detection Method</th>
                      <th className="text-left p-2 border">Confidence Score</th>
                      <th className="text-left p-2 border">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisResult.analysisDetails.metadata.map((detail, idx) => (
                      <tr key={idx}>
                        <td className="p-2 border">{detail.name}</td>
                        <td className="p-2 border">
                          <Badge className={`${detail.score > 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {detail.score.toFixed(1)}%
                          </Badge>
                        </td>
                        <td className="p-2 border">{detail.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <Separator />

          {/* Legal Information Section */}
          <section>
            <h3 className="text-lg font-semibold mb-3">5. Legal Information</h3>
            <div className="p-3 rounded-md border bg-blue-50">
              <p className="text-sm mb-2">
                This report is intended for authorized law enforcement personnel only. The analysis results are based on current AI detection models and should be considered as technical evidence that may require additional corroboration. The confidence scores indicate probability, not absolute certainty.
              </p>
              <p className="text-sm">
                <span className="font-medium">Chain of Custody ID:</span> COC-{Date.now().toString(36).slice(-6).toUpperCase()}
              </p>
            </div>
          </section>
          
          {/* Certification Section */}
          <section className="print:mt-10">
            <div className="border-t pt-4 mt-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-medium">Analysis Certified By:</p>
                  <p className="mt-6 text-muted-foreground">Digital Signature Verification</p>
                </div>
                <div>
                  <p className="font-medium">System Information:</p>
                  <p className="text-sm mt-1">Deepfake Detection Platform v2.1.3</p>
                  <p className="text-sm">Analysis Engine: Multi-Model Neural Ensemble v3.5</p>
                  <p className="text-sm">Report ID: LEA-{Date.now().toString(36).slice(-10).toUpperCase()}</p>
                </div>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .law-enforcement-report,
          .law-enforcement-report * {
            visibility: visible;
          }
          .law-enforcement-report {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default LEAReport;
