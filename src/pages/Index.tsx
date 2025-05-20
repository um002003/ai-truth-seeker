
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import AnalysisTrendChart from '@/components/dashboard/AnalysisTrendChart';
import DetectionAccuracyChart from '@/components/dashboard/DetectionAccuracyChart';
import RecentAnalysisList from '@/components/dashboard/RecentAnalysisList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  FileSpreadsheet,
  FileVideo,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <Card className="bg-primary text-primary-foreground border-none">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to the Deepfake Detection System</h2>
              <p className="opacity-90 max-w-xl">
                Use our advanced AI-powered tools to analyze and detect manipulated media. Upload files for analysis or view existing case data.
              </p>
            </div>
            <div className="hidden md:block">
              <Shield className="h-16 w-16 opacity-80" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Analyses" 
            value="1,284" 
            description="last 30 days" 
            icon={Activity}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard 
            title="Deepfakes Detected" 
            value="328" 
            description="last 30 days" 
            icon={AlertTriangle}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard 
            title="Authentic Media" 
            value="956" 
            description="last 30 days" 
            icon={CheckCircle}
            trend={{ value: 14, isPositive: true }}
          />
          <StatsCard 
            title="Pending Analysis" 
            value="42" 
            description="in queue" 
            icon={FileVideo}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnalysisTrendChart />
          <DetectionAccuracyChart />
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentAnalysisList />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-between" asChild>
                <Link to="/analyze">
                  Analyze New Media
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Generate Report <FileSpreadsheet className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                View Detection Statistics <Activity className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
