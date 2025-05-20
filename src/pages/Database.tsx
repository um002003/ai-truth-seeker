
import MainLayout from '@/components/layout/MainLayout';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, FileImage, FileVideo, Eye, Image, Video } from 'lucide-react';

interface MediaItem {
  id: string;
  filename: string;
  type: 'image' | 'video';
  uploadDate: Date;
  fileSize: string;
  isDeepfake: boolean;
  confidenceScore: number;
  caseId?: string;
  thumbnailUrl: string;
}

const generateMockMedia = (): MediaItem[] => {
  const media: MediaItem[] = [];
  const now = new Date();
  
  for (let i = 1; i <= 16; i++) {
    const uploadDate = new Date(now);
    uploadDate.setDate(now.getDate() - Math.floor(Math.random() * 30));
    
    const isDeepfake = Math.random() > 0.5;
    const confidenceScore = isDeepfake ? 
      70 + Math.floor(Math.random() * 30) : 
      Math.floor(Math.random() * 30);
      
    const fileType = i % 3 === 0 ? 'video' : 'image';
    
    media.push({
      id: `MEDIA-${1000 + i}`,
      filename: fileType === 'image' ? 
        `evidence-photo-${i}.jpg` : 
        `video-evidence-${i}.mp4`,
      type: fileType,
      uploadDate,
      fileSize: `${(Math.random() * 15 + 1).toFixed(1)} MB`,
      isDeepfake,
      confidenceScore,
      caseId: i % 4 === 0 ? `CASE-${1000 + Math.floor(i/4)}` : undefined,
      thumbnailUrl: `/placeholder.svg` // Using placeholder.svg since we don't have real images
    });
  }
  
  return media;
};

const Database = () => {
  const [media] = useState<MediaItem[]>(generateMockMedia);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredMedia = media.filter(item => {
    const matchesSearch = item.filename.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      (item.caseId && item.caseId.toLowerCase().includes(searchQuery.toLowerCase()));
                      
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'deepfake') return matchesSearch && item.isDeepfake;
    if (activeTab === 'authentic') return matchesSearch && !item.isDeepfake;
    if (activeTab === 'images') return matchesSearch && item.type === 'image';
    if (activeTab === 'videos') return matchesSearch && item.type === 'video';
    
    return matchesSearch;
  });
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Evidence Database</h1>
          <p className="text-muted-foreground">Browse and search through analyzed media evidence</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="deepfake">Deepfakes</TabsTrigger>
              <TabsTrigger value="authentic">Authentic</TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-1">
                <Image className="h-4 w-4" />
                Images
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                Videos
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div 
                  key={item.id} 
                  className="rounded-lg border bg-card overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video bg-muted">
                    <img 
                      src={item.thumbnailUrl}
                      alt={item.filename}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      {item.type === 'image' ? (
                        <Badge className="bg-blue-100 text-blue-700">
                          <FileImage className="h-3 w-3 mr-1" />
                          Image
                        </Badge>
                      ) : (
                        <Badge className="bg-purple-100 text-purple-700">
                          <FileVideo className="h-3 w-3 mr-1" />
                          Video
                        </Badge>
                      )}
                    </div>
                    {item.isDeepfake && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-red-100 text-red-700">Deepfake</Badge>
                      </div>
                    )}
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 space-y-1">
                    <h3 className="font-medium text-sm truncate" title={item.filename}>
                      {item.filename}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {item.fileSize}
                        </span>
                        {item.caseId && (
                          <Badge variant="outline" className="text-xs">
                            {item.caseId}
                          </Badge>
                        )}
                      </div>
                      {item.isDeepfake && (
                        <div className="text-xs font-medium text-red-600">
                          {item.confidenceScore}% match
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredMedia.length === 0 && (
                <div className="col-span-full p-8 text-center">
                  <p className="text-muted-foreground">No matching media files found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Database;
