import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { MetricCard } from '../components/MetricCard';
import { ServiceHeartbeat } from '../components/ServiceHeartbeat';
import { OrderTicker } from '../components/OrderTicker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Zap, Clock, TrendingUp, Server } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function SystemOverview() {
  const systemMetrics = useStore((state) => state.systemMetrics);
  const throughputData = useStore((state) => state.throughputData);
  const serviceStatuses = useStore((state) => state.serviceStatuses);
  const updateMetrics = useStore((state) => state.updateMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics();
    }, 3000);

    return () => clearInterval(interval);
  }, [updateMetrics]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">System Overview</h1>
        <p className="text-muted-foreground">Real-time distributed system metrics and performance monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="System Uptime"
          value={systemMetrics.uptime.toFixed(2)}
          suffix="%"
          icon={Activity}
          trend={0.1}
        />
        <MetricCard
          title="SLA Compliance"
          value={systemMetrics.sla.toFixed(1)}
          suffix="%"
          icon={TrendingUp}
          trend={0.3}
        />
        <MetricCard
          title="Avg Latency"
          value={systemMetrics.avgLatency}
          suffix="ms"
          icon={Clock}
        />
        <MetricCard
          title="Throughput"
          value={systemMetrics.throughput}
          suffix="ops/s"
          icon={Zap}
          trend={2.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 hover-elevate" data-testid="card-throughput-chart">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-chart-1" />
              Throughput Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={throughputData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="timestamp"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                <Line
                  type="monotone"
                  dataKey="throughput"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover-elevate" data-testid="card-service-status">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-chart-2" />
              Service Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {serviceStatuses.map((service) => (
              <div key={service.name} className="flex items-center justify-between" data-testid={`service-${service.name}`}>
                <div className="flex items-center gap-3">
                  <ServiceHeartbeat status={service.status} />
                  <div>
                    <div className="text-sm font-medium">{service.name}</div>
                    <div className="text-xs text-muted-foreground">{service.uptime.toFixed(2)}% uptime</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(service.lastHeartbeat).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <OrderTicker />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-orders">
              {systemMetrics.totalOrders.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Last 24 hours</div>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500" data-testid="text-active-services">
              {systemMetrics.activeServices}/{systemMetrics.totalServices}
            </div>
            <div className="text-xs text-muted-foreground mt-1">All systems operational</div>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">0.02%</div>
            <div className="text-xs text-muted-foreground mt-1">Within SLA threshold</div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
