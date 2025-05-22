
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import FileUploader from '@/components/upload/FileUploader';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileAudio, FileVideo } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Analyze = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<'visual' | 'audio'>('visual');
  
  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setMediaType(file.type.includes('audio') ? 'audio' : 'visual');
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
                Upload an image, video, or audio file to analyze for potential deepfake manipulation. 
                Our multi-model AI system processes the file and provides detailed results with official law enforcement reports.
              </p>
            </div>
            
            <Tabs defaultValue="visual" className="mb-6">
              <TabsList className="grid grid-cols-2 mb-4 w-[400px]">
                <TabsTrigger value="visual" onClick={() => setMediaType('visual')}>
                  <FileVideo className="h-4 w-4 mr-2" />
                  Visual Media
                </TabsTrigger>
                <TabsTrigger value="audio" onClick={() => setMediaType('audio')}>
                  <FileAudio className="h-4 w-4 mr-2" />
                  Audio
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="visual" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Upload images or videos to detect visual deepfakes. Our system will analyze facial manipulation, 
                  inconsistencies between frames, lighting anomalies, and metadata.
                </p>
                <FileUploader 
                  onFileSelected={handleFileSelected} 
                  acceptedFileTypes={".jpg,.jpeg,.png,.webp,.mp4,.mov,.avi"} 
                />
              </TabsContent>
              
              <TabsContent value="audio" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Upload audio files to detect voice deepfakes. Our system will analyze voice patterns,
                  spectral inconsistencies, synthesis artifacts, and temporal anomalies.
                </p>
                <FileUploader 
                  onFileSelected={handleFileSelected} 
                  acceptedFileTypes={".mp3,.wav,.ogg,.flac"} 
                />
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {mediaType === 'visual' ? 'Supported Visual File Types' : 'Supported Audio File Types'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {mediaType === 'visual' ? (
                      <>
                        <li>Images: JPEG, PNG, WEBP</li>
                        <li>Videos: MP4, MOV, AVI</li>
                        <li>Maximum file size: 100MB</li>
                      </>
                    ) : (
                      <>
                        <li>Audio: MP3, WAV, OGG, FLAC</li>
                        <li>Maximum file size: 50MB</li>
                        <li>Maximum duration: 10 minutes</li>
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Analysis Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {mediaType === 'visual' ? (
                      <>
                        <li>Facial manipulation detection</li>
                        <li>Video inconsistency analysis</li>
                        <li>Metadata examination</li>
                      </>
                    ) : (
                      <>
                        <li>Voice synthesis detection</li>
                        <li>Spectral analysis</li>
                        <li>Temporal pattern analysis</li>
                      </>
                    )}
                    <li>Confidence scoring</li>
                    <li>Multi-model AI analysis</li>
                    <li>LEA-compliant forensic reports</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6 bg-blue-50 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-blue-800">
                  <Shield className="h-4 w-4" />
                  AI/ML Models in Our System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm text-blue-900">
                  <li><strong>Visual Deepfake Detection:</strong> EfficientNet, XceptionNet, Vision Transformers</li>
                  <li><strong>Video Analysis:</strong> Spatio-Temporal Networks (R(2+1)D), 3D-CNNs, Temporal Transformers</li>
                  <li><strong>Audio Deepfake Detection:</strong> WaveFake, VoicePrint, SpectroGuard</li>
                  <li><strong>Multi-model fusion:</strong> Weighted ensemble for improved accuracy</li>
                  <li><strong>Training:</strong> FaceForensics++, Celeb-DF, DFDC, ASVspoof datasets</li>
                </ul>
              </CardContent>
            </Card>
          </>
        ) : (
          <AnalysisResults file={selectedFile} onReset={handleReset} mediaType={mediaType} />
        )}
      </div>
    </MainLayout>
  );
};

export default Analyze;
