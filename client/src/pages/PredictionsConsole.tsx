import { useStore } from '../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Briefcase, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PredictionsConsole() {
  const forecastData = useStore((state) => state.forecastData);
  const batchJobs = useStore((state) => state.batchJobs);

  const avgAccuracy = forecastData
    .filter((d) => d.actual !== undefined)
    .reduce((acc, d) => {
      const error = d.actual && d.predicted ? Math.abs(d.predicted - d.actual) / d.actual : 0;
      return acc + (1 - error);
    }, 0) / forecastData.filter((d) => d.actual !== undefined).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Prediction & Batch Jobs Console</h1>
        <p className="text-muted-foreground">Demand forecasting and batch processing analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Model Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">{(avgAccuracy * 100).toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">30-day average</div>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">
              {batchJobs.filter((j) => j.status === 'running').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Currently processing</div>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {batchJobs.filter((j) => j.status === 'completed').length}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Success rate: 96%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover-elevate" data-testid="card-forecast-chart">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-chart-1" />
            30-Day Demand Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--popover-border))',
                  borderRadius: '0.375rem',
                }}
                labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
                name="Predicted"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                dot={false}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="hover-elevate" data-testid="card-batch-jobs">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-chart-2" />
            Batch Job History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Records</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batchJobs.map((job) => (
                  <TableRow key={job.id} className="hover-elevate" data-testid={`row-job-${job.id}`}>
                    <TableCell className="font-mono text-xs text-primary">{job.id}</TableCell>
                    <TableCell className="text-sm">{job.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {job.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          job.status === 'completed'
                            ? 'default'
                            : job.status === 'failed'
                            ? 'destructive'
                            : job.status === 'running'
                            ? 'default'
                            : 'secondary'
                        }
                        className="gap-1 text-xs"
                      >
                        {job.status === 'completed' && <CheckCircle className="h-3 w-3" />}
                        {job.status === 'failed' && <XCircle className="h-3 w-3" />}
                        {job.status === 'running' && <Clock className="h-3 w-3" />}
                        {job.status === 'queued' && <AlertTriangle className="h-3 w-3" />}
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={job.progress} className="h-2 w-24" />
                        <span className="text-xs font-medium min-w-[3ch] text-right">{job.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {job.recordsProcessed.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {job.duration ? `${Math.floor(job.duration / 60)}m ${job.duration % 60}s` : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
