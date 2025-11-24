import { useCallback, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ReactFlow, Node, Edge, Background, Controls, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GitBranch, RefreshCw, DollarSign, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderFlow() {
  const routeOptimization = useStore((state) => state.routeOptimization);
  const selectedAlgorithm = useStore((state) => state.selectedAlgorithm);
  const setSelectedAlgorithm = useStore((state) => state.setSelectedAlgorithm);
  const refreshRouteOptimization = useStore((state) => state.refreshRouteOptimization);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshRouteOptimization();
    }, 5000);
    return () => clearInterval(interval);
  }, [refreshRouteOptimization]);

  const nodes: Node[] = routeOptimization
    ? routeOptimization.path.map((location, idx) => ({
        id: `node-${idx}`,
        type: idx === 0 ? 'input' : idx === routeOptimization.path.length - 1 ? 'output' : 'default',
        position: { x: idx * 250, y: 200 },
        data: {
          label: (
            <div className="text-center p-2">
              <div className="font-semibold text-xs">{location}</div>
              {idx === 0 && <div className="text-xs text-muted-foreground mt-1">Source</div>}
              {idx === routeOptimization.path.length - 1 && (
                <div className="text-xs text-muted-foreground mt-1">Destination</div>
              )}
            </div>
          ),
        },
        style: {
          background: idx === 0 || idx === routeOptimization.path.length - 1 ? 'hsl(var(--chart-1))' : 'hsl(var(--card))',
          color: idx === 0 || idx === routeOptimization.path.length - 1 ? 'white' : 'hsl(var(--foreground))',
          border: '2px solid hsl(var(--primary))',
          borderRadius: '0.375rem',
          padding: '10px',
        },
      }))
    : [];

  const edges: Edge[] = routeOptimization
    ? routeOptimization.path.slice(0, -1).map((_, idx) => ({
        id: `edge-${idx}`,
        source: `node-${idx}`,
        target: `node-${idx + 1}`,
        animated: true,
        style: { stroke: 'hsl(var(--chart-2))', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(var(--chart-2))' },
        label: `${Math.floor(Math.random() * 50 + 20)}ms`,
        labelStyle: { fill: 'hsl(var(--muted-foreground))', fontSize: 10 },
      }))
    : [];

  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

  if (!routeOptimization) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Order Flow & Fulfillment Optimization</h1>
          <p className="text-muted-foreground">Route optimization and cost analysis using distributed algorithms</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedAlgorithm} onValueChange={(value: any) => setSelectedAlgorithm(value)}>
            <SelectTrigger className="w-[180px]" data-testid="select-algorithm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dijkstra">Dijkstra</SelectItem>
              <SelectItem value="astar">A* Search</SelectItem>
              <SelectItem value="greedy">Greedy</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={refreshRouteOptimization} variant="outline" className="gap-2" data-testid="button-refresh-route">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-cost">${routeOptimization.totalCost}</div>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Est. Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{routeOptimization.estimatedTime}m</div>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Distance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{routeOptimization.distance} mi</div>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Algorithm</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="default" className="text-sm">
              {selectedAlgorithm.toUpperCase()}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="hover-elevate" data-testid="card-route-pipeline">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-chart-1" />
            Route Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: '500px', width: '100%' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
              attributionPosition="bottom-left"
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </CardContent>
      </Card>

      <Card className="hover-elevate">
        <CardHeader>
          <CardTitle>Route Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-md border border-border">
              <span className="text-sm text-muted-foreground">Base Shipping Cost</span>
              <span className="font-medium">${Math.floor(routeOptimization.totalCost * 0.6)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border border-border">
              <span className="text-sm text-muted-foreground">Fuel Surcharge</span>
              <span className="font-medium">${Math.floor(routeOptimization.totalCost * 0.2)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border border-border">
              <span className="text-sm text-muted-foreground">Handling Fees</span>
              <span className="font-medium">${Math.floor(routeOptimization.totalCost * 0.15)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md border border-border">
              <span className="text-sm text-muted-foreground">Optimization Savings</span>
              <span className="font-medium text-green-500">-${Math.floor(routeOptimization.totalCost * 0.05)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-md bg-primary/10 border-2 border-primary">
              <span className="font-semibold">Total Cost</span>
              <span className="font-bold text-lg">${routeOptimization.totalCost}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
