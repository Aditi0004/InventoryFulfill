import { useCallback } from 'react';
import { useStore } from '../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ReactFlow, Node, Edge, Background, Controls, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { MapPin, RefreshCw, Server, Cpu, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WarehouseManager() {
  const warehouses = useStore((state) => state.warehouses);
  const simulateRebalance = useStore((state) => state.simulateRebalance);

  const nodes: Node[] = warehouses.map((wh) => {
    const angle = (wh.hashPosition * Math.PI) / 180;
    const radius = 200;
    const x = 400 + radius * Math.cos(angle);
    const y = 300 + radius * Math.sin(angle);

    return {
      id: wh.id,
      type: 'default',
      position: { x, y },
      data: {
        label: (
          <div className="text-center p-2">
            <div className="font-semibold text-xs">{wh.name}</div>
            <div className="text-xs text-muted-foreground">{wh.utilization}%</div>
          </div>
        ),
      },
      style: {
        background: wh.status === 'healthy' ? 'hsl(var(--chart-1))' : 'hsl(var(--destructive))',
        color: 'white',
        border: '2px solid hsl(var(--primary))',
        borderRadius: '0.375rem',
        width: 120,
      },
    };
  });

  const edges: Edge[] = warehouses.map((wh, idx) => {
    const nextIdx = (idx + 1) % warehouses.length;
    return {
      id: `e${wh.id}-${warehouses[nextIdx].id}`,
      source: wh.id,
      target: warehouses[nextIdx].id,
      animated: true,
      style: { stroke: 'hsl(var(--chart-2))', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'hsl(var(--chart-2))' },
    };
  });

  const onNodesChange = useCallback(() => {}, []);
  const onEdgesChange = useCallback(() => {}, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Warehouse Node & Cluster Manager</h1>
          <p className="text-muted-foreground">Consistent hashing ring and distributed node health monitoring</p>
        </div>
        <Button onClick={simulateRebalance} className="gap-2" data-testid="button-simulate-rebalance">
          <RefreshCw className="h-4 w-4" />
          Simulate Rebalance
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 hover-elevate" data-testid="card-hashing-ring">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-chart-1" />
              Consistent Hashing Ring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ height: '600px', width: '100%' }}>
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

        <div className="space-y-4">
          <Card className="hover-elevate">
            <CardHeader>
              <CardTitle className="text-base">Node Health Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {warehouses.map((wh) => (
                <div key={wh.id} className="space-y-2" data-testid={`warehouse-${wh.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{wh.name}</div>
                    <Badge
                      variant={wh.status === 'healthy' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {wh.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Cpu className="h-3 w-3" />
                        CPU
                      </span>
                      <span>{wh.cpu}%</span>
                    </div>
                    <Progress value={wh.cpu} className="h-1.5" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <HardDrive className="h-3 w-3" />
                        RAM
                      </span>
                      <span>{wh.ram}%</span>
                    </div>
                    <Progress value={wh.ram} className="h-1.5" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Active Orders: <span className="text-foreground font-medium">{wh.activeOrders}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="hover-elevate" data-testid="card-warehouse-map">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-chart-3" />
            Warehouse Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {warehouses.map((wh) => (
              <div key={wh.id} className="flex items-start gap-3 p-3 rounded-md border border-border hover-elevate">
                <MapPin className="h-5 w-5 text-chart-3 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{wh.name}</div>
                  <div className="text-xs text-muted-foreground">{wh.location}</div>
                  <div className="text-xs text-muted-foreground mt-1 font-mono">
                    {wh.latitude.toFixed(4)}, {wh.longitude.toFixed(4)}
                  </div>
                  <div className="text-xs mt-2">
                    <span className="text-muted-foreground">Capacity: </span>
                    <span className="text-foreground font-medium">{wh.capacity.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
