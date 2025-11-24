// IDIFOS TypeScript Interfaces and Types

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'healthy' | 'warning' | 'critical';
  capacity: number;
  utilization: number;
  cpu: number;
  ram: number;
  activeOrders: number;
  hashPosition: number;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  warehouseId: string;
  warehouseName: string;
  quantity: number;
  maxCapacity: number;
  utilization: number;
  lastRestocked: string;
  demand: 'low' | 'medium' | 'high';
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  sku: string;
  quantity: number;
  sourceWarehouse: string;
  destinationCity: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  timestamp: string;
  latency: number;
  cost: number;
}

export interface SystemMetrics {
  uptime: number;
  sla: number;
  avgLatency: number;
  throughput: number;
  totalOrders: number;
  activeServices: number;
  totalServices: number;
}

export interface ThroughputDataPoint {
  timestamp: string;
  orders: number;
  throughput: number;
}

export interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  lastHeartbeat: string;
}

export interface BatchJob {
  id: string;
  name: string;
  type: 'forecast' | 'optimization' | 'rebalance' | 'analytics';
  status: 'running' | 'completed' | 'failed' | 'queued';
  progress: number;
  startTime: string;
  endTime?: string;
  duration?: number;
  recordsProcessed: number;
}

export interface ForecastDataPoint {
  date: string;
  predicted: number;
  actual?: number;
  confidence: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  severity: 'info' | 'warn' | 'error' | 'debug';
  service: string;
  traceId: string;
  message: string;
}

export interface TraceSpan {
  id: string;
  name: string;
  service: string;
  duration: number;
  status: 'ok' | 'error';
  parentId?: string;
  children?: TraceSpan[];
}

export interface RouteOptimization {
  orderId: string;
  algorithm: 'dijkstra' | 'astar' | 'greedy';
  sourceWarehouse: string;
  destination: string;
  path: string[];
  totalCost: number;
  estimatedTime: number;
  distance: number;
}
