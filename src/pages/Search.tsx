
import MainLayout from '@/components/layout/MainLayout';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search as SearchIcon,
  FileImage,
  FileVideo,
  FolderOpen,
  Calendar,
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'case' | 'media';
  title: string;
  date: Date;
  details: string;
  tags: string[];
  mediaType?: 'image' | 'video';
  isDeepfake?: boolean;
  caseId?: string;
}

const generateMockSearchResults = (): SearchResult[] => {
  const results: SearchResult[] = [];
  const now = new Date();

  // Cases
  for (let i = 1; i <= 3; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - Math.floor(Math.random() * 30));

    results.push({
      id: `CASE-${1000 + i}`,
      type: 'case',
      title: [`Election Campaign ${i}`, `Celebrity Interview ${i}`, `Political Speech ${i}`][
        i - 1
      ],
      date,
      details: `Case file containing ${
        Math.floor(Math.random() * 10) + 1
      } media items related to potential deepfake evidence`,
      tags: ['case', 'investigation', i % 2 === 0 ? 'high-priority' : 'medium-priority'],
    });
  }

  // Media files
  for (let i = 1; i <= 8; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - Math.floor(Math.random() * 30));
    const mediaType = i % 3 === 0 ? 'video' : 'image';
    const isDeepfake = i % 2 === 0;

    results.push({
      id: `MEDIA-${1000 + i}`,
      type: 'media',
      title: mediaType === 'image' ? `evidence-photo-${i}.jpg` : `video-evidence-${i}.mp4`,
      date,
      details: isDeepfake
        ? `Analyzed media with ${70 + Math.floor(Math.random() * 25)}% confidence of being manipulated`
        : 'Analyzed media determined to be authentic',
      tags: [
        mediaType,
        isDeepfake ? 'deepfake' : 'authentic',
        'analyzed',
        i % 4 === 0 ? 'facial-manipulation' : 'voice-manipulation',
      ],
      mediaType,
      isDeepfake,
      caseId: i % 3 === 0 ? `CASE-${1000 + Math.floor(i / 3)}` : undefined,
    });
  }

  return results;
};

const Search = () => {
  const [results] = useState<SearchResult[]>(generateMockSearchResults);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const performSearch = () => {
    setSearchPerformed(true);
  };

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      !searchPerformed ||
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === 'all') {
      if (selectedType === 'all') return matchesSearch;
      if (selectedType === 'cases') return matchesSearch && result.type === 'case';
      if (selectedType === 'media') return matchesSearch && result.type === 'media';
      return matchesSearch;
    }

    if (activeTab === 'cases') return matchesSearch && result.type === 'case';
    if (activeTab === 'media') return matchesSearch && result.type === 'media';
    if (activeTab === 'deepfakes')
      return matchesSearch && result.type === 'media' && result.isDeepfake;

    return matchesSearch;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Advanced Search</h1>
          <p className="text-muted-foreground">
            Search across all case files, evidence, and analysis results
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Criteria</CardTitle>
            <CardDescription>Filter and search for specific content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by keyword, case ID, or file name..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') performSearch();
                    }}
                  />
                </div>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="cases">Cases Only</SelectItem>
                    <SelectItem value="media">Media Only</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="sm:w-[120px]" onClick={performSearch}>
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="deepfakes">Deepfakes</TabsTrigger>
          </TabsList>
        </Tabs>

        {searchPerformed && filteredResults.length > 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded">
                          {result.type === 'case' ? (
                            <FolderOpen className="h-5 w-5 text-primary" />
                          ) : result.mediaType === 'image' ? (
                            <FileImage className="h-5 w-5 text-blue-500" />
                          ) : (
                            <FileVideo className="h-5 w-5 text-purple-500" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{result.title}</h3>
                            {result.type === 'media' && result.isDeepfake && (
                              <Badge className="bg-red-100 text-red-700">Deepfake</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            {result.date.toLocaleDateString()}
                            <span className="mx-1">•</span>
                            <span className="font-medium">{result.id}</span>
                            {result.type === 'media' && result.caseId && (
                              <>
                                <span className="mx-1">•</span>
                                <span>{result.caseId}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">{result.details}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {result.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : searchPerformed ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try using different keywords or removing filters
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto opacity-50 mb-4" />
              <p className="text-muted-foreground">
                Enter search terms and press Search to find cases and media
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
