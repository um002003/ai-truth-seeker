
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnalysisData {
  date: string;
  deepfakes: number;
  authentic: number;
  total: number;
}

const generateMockData = (): AnalysisData[] => {
  const data: AnalysisData[] = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const currentDate = new Date();
    currentDate.setDate(today.getDate() - i);
    
    const deepfakes = Math.floor(Math.random() * 8) + 2;
    const authentic = Math.floor(Math.random() * 15) + 5;
    
    data.push({
      date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      deepfakes,
      authentic,
      total: deepfakes + authentic
    });
  }
  
  return data;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-md">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const AnalysisTrendChart = () => {
  const allData = useMemo(() => generateMockData(), []);
  const [data, setData] = useState<AnalysisData[]>(allData);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    switch (timeRange) {
      case "7d":
        setData(allData.slice(-7));
        break;
      case "14d":
        setData(allData.slice(-14));
        break;
      case "30d":
      default:
        setData(allData);
        break;
    }
  }, [timeRange, allData]);

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Analysis Trends</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="14d">Last 14 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="deepfakes"
              name="Deepfakes"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="authentic"
              name="Authentic"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AnalysisTrendChart;
