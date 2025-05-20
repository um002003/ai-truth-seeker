
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import FileUploader from '@/components/upload/FileUploader';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Analyze = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };
  
  const handleReset = () => {
    setSelectedFile(null);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {!selectedFile ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Upload Media for Analysis</h1>
              <p className="text-muted-foreground">
                Upload an image or video file to analyze for potential deepfake manipulation. 
                Our AI-powered system will process the file and provide detailed results.
              </p>
            </div>
            
            <FileUploader onFileSelected={handleFileSelected} />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Supported File Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Images: JPEG, PNG, WEBP</li>
                    <li>Videos: MP4, MOV, AVI</li>
                    <li>Maximum file size: 100MB</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Analysis Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Facial manipulation detection</li>
                    <li>Video inconsistency analysis</li>
                    <li>Metadata examination</li>
                    <li>Confidence scoring</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <AnalysisResults file={selectedFile} onReset={handleReset} />
        )}
      </div>
    </MainLayout>
  );
};

export default Analyze;
