
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface AccuracyData {
  name: string;
  value: number;
  color: string;
}

const generateMockData = (): AccuracyData[] => {
  // True Positive: Correctly identified deepfakes
  const truePositive = 78 + Math.floor(Math.random() * 10);
  
  // False Negative: Missed deepfakes (incorrectly classified as authentic)
  const falseNegative = 100 - truePositive;
  
  // True Negative: Correctly identified authentic content
  const trueNegative = 92 + Math.floor(Math.random() * 5);
  
  // False Positive: Authentic content wrongly flagged as deepfakes
  const falsePositive = 100 - trueNegative;
  
  return [
    { name: 'True Positive', value: truePositive, color: '#0369a1' },
    { name: 'False Negative', value: falseNegative, color: '#e11d48' },
    { name: 'True Negative', value: trueNegative, color: '#16a34a' },
    { name: 'False Positive', value: falsePositive, color: '#f59e0b' },
  ];
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DetectionAccuracyChart = () => {
  const data = useMemo(() => generateMockData(), []);
  
  // Calculate F1 Score
  const truePositive = data[0].value;
  const falsePositive = data[3].value;
  const falseNegative = data[1].value;
  
  const precision = truePositive / (truePositive + falsePositive);
  const recall = truePositive / (truePositive + falseNegative);
  const f1Score = 2 * (precision * recall) / (precision + recall);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detection Accuracy</CardTitle>
        <CardDescription>Model performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.25rem',
                  padding: '0.5rem',
                }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={8}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="bg-secondary p-2 rounded">
            <p className="text-xs text-muted-foreground">Precision</p>
            <p className="font-medium">{(precision * 100).toFixed(1)}%</p>
          </div>
          <div className="bg-secondary p-2 rounded">
            <p className="text-xs text-muted-foreground">Recall</p>
            <p className="font-medium">{(recall * 100).toFixed(1)}%</p>
          </div>
          <div className="bg-secondary p-2 rounded">
            <p className="text-xs text-muted-foreground">F1 Score</p>
            <p className="font-medium">{(f1Score * 100).toFixed(1)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetectionAccuracyChart;
