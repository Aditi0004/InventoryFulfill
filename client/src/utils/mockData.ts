import type {
  Warehouse,
  InventoryItem,
  Order,
  SystemMetrics,
  ThroughputDataPoint,
  ServiceStatus,
  BatchJob,
  ForecastDataPoint,
  LogEntry,
  RouteOptimization,
} from '@shared/types';

const WAREHOUSE_LOCATIONS = [
  { name: 'Seattle DC', location: 'Seattle, WA', lat: 47.6062, lng: -122.3321 },
  { name: 'Portland DC', location: 'Portland, OR', lat: 45.5152, lng: -122.6784 },
  { name: 'San Francisco DC', location: 'San Francisco, CA', lat: 37.7749, lng: -122.4194 },
  { name: 'Los Angeles DC', location: 'Los Angeles, CA', lat: 34.0522, lng: -118.2437 },
  { name: 'Phoenix DC', location: 'Phoenix, AZ', lat: 33.4484, lng: -112.0740 },
  { name: 'Denver DC', location: 'Denver, CO', lat: 39.7392, lng: -104.9903 },
];

const PRODUCT_CATEGORIES = ['Electronics', 'Apparel', 'Home & Garden', 'Sports', 'Books', 'Toys'];
const PRODUCT_NAMES = [
  'Wireless Headphones', 'Smart Watch', 'Laptop Stand', 'USB-C Cable', 'Backpack',
  'Water Bottle', 'Yoga Mat', 'Resistance Bands', 'Running Shoes', 'T-Shirt',
  'Coffee Maker', 'Blender', 'Desk Lamp', 'Office Chair', 'Monitor', 'Keyboard',
  'Mouse Pad', 'Notebook', 'Pen Set', 'Phone Case', 'Charger', 'Speaker',
];

const SERVICES = ['api-gateway', 'inventory-service', 'order-service', 'warehouse-service', 'routing-engine', 'forecast-service'];

export function generateWarehouses(): Warehouse[] {
  return WAREHOUSE_LOCATIONS.map((loc, idx) => ({
    id: `wh-${idx + 1}`,
    name: loc.name,
    location: loc.location,
    latitude: loc.lat,
    longitude: loc.lng,
    status: Math.random() > 0.85 ? 'warning' : 'healthy',
    capacity: 10000 + Math.floor(Math.random() * 5000),
    utilization: Math.floor(Math.random() * 40) + 50,
    cpu: Math.floor(Math.random() * 50) + 30,
    ram: Math.floor(Math.random() * 50) + 35,
    activeOrders: Math.floor(Math.random() * 100) + 20,
    hashPosition: (360 / WAREHOUSE_LOCATIONS.length) * idx,
  }));
}

export function generateInventory(): InventoryItem[] {
  const warehouses = WAREHOUSE_LOCATIONS;
  const items: InventoryItem[] = [];
  let id = 1000;

  for (let i = 0; i < 550; i++) {
    const warehouse = warehouses[Math.floor(Math.random() * warehouses.length)];
    const product = PRODUCT_NAMES[Math.floor(Math.random() * PRODUCT_NAMES.length)];
    const category = PRODUCT_CATEGORIES[Math.floor(Math.random() * PRODUCT_CATEGORIES.length)];
    const maxCapacity = Math.floor(Math.random() * 500) + 100;
    const quantity = Math.floor(Math.random() * maxCapacity);

    items.push({
      id: `inv-${id++}`,
      sku: `SKU-${String(id).padStart(6, '0')}`,
      name: product,
      category,
      warehouseId: `wh-${WAREHOUSE_LOCATIONS.indexOf(warehouse) + 1}`,
      warehouseName: warehouse.name,
      quantity,
      maxCapacity,
      utilization: Math.floor((quantity / maxCapacity) * 100),
      lastRestocked: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      demand: quantity > maxCapacity * 0.7 ? 'high' : quantity < maxCapacity * 0.3 ? 'low' : 'medium',
      price: Math.floor(Math.random() * 200) + 10,
    });
  }

  return items;
}

export function generateOrders(count: number): Order[] {
  const orders: Order[] = [];
  const cities = ['New York', 'Chicago', 'Miami', 'Boston', 'Dallas', 'Atlanta'];
  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered'];

  for (let i = 0; i < count; i++) {
    orders.push({
      id: `ord-${Date.now()}-${i}`,
      customerId: `cust-${Math.floor(Math.random() * 10000)}`,
      sku: `SKU-${String(Math.floor(Math.random() * 100000)).padStart(6, '0')}`,
      quantity: Math.floor(Math.random() * 5) + 1,
      sourceWarehouse: WAREHOUSE_LOCATIONS[Math.floor(Math.random() * WAREHOUSE_LOCATIONS.length)].name,
      destinationCity: cities[Math.floor(Math.random() * cities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      latency: Math.floor(Math.random() * 200) + 50,
      cost: Math.floor(Math.random() * 50) + 10,
    });
  }

  return orders;
}

export function generateSystemMetrics(): SystemMetrics {
  return {
    uptime: 99.5 + Math.random() * 0.4,
    sla: 97 + Math.random() * 2,
    avgLatency: Math.floor(Math.random() * 150) + 80,
    throughput: Math.floor(Math.random() * 500) + 800,
    totalOrders: Math.floor(Math.random() * 10000) + 50000,
    activeServices: 6,
    totalServices: 6,
  };
}

export function generateThroughputData(hours: number): ThroughputDataPoint[] {
  const data: ThroughputDataPoint[] = [];
  const now = Date.now();

  for (let i = hours - 1; i >= 0; i--) {
    const timestamp = new Date(now - i * 3600000);
    const orders = Math.floor(Math.random() * 200) + 600;
    
    data.push({
      timestamp: timestamp.toISOString(),
      orders,
      throughput: orders * (0.9 + Math.random() * 0.2),
    });
  }

  return data;
}

export function generateServiceStatuses(): ServiceStatus[] {
  return SERVICES.map(name => ({
    name,
    status: Math.random() > 0.9 ? 'degraded' : 'healthy',
    uptime: 99 + Math.random(),
    lastHeartbeat: new Date(Date.now() - Math.random() * 30000).toISOString(),
  }));
}

export function generateBatchJobs(): BatchJob[] {
  const types: BatchJob['type'][] = ['forecast', 'optimization', 'rebalance', 'analytics'];
  const statuses: BatchJob['status'][] = ['running', 'completed', 'failed', 'queued'];
  const jobs: BatchJob[] = [];

  for (let i = 0; i < 15; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const startTime = new Date(Date.now() - Math.random() * 86400000);
    const duration = status === 'completed' ? Math.floor(Math.random() * 3600) + 300 : undefined;
    const endTime = duration ? new Date(startTime.getTime() + duration * 1000).toISOString() : undefined;

    jobs.push({
      id: `job-${String(i + 1).padStart(4, '0')}`,
      name: `${types[Math.floor(Math.random() * types.length)]}-batch-${i + 1}`,
      type: types[Math.floor(Math.random() * types.length)],
      status,
      progress: status === 'completed' ? 100 : status === 'running' ? Math.floor(Math.random() * 70) + 20 : 0,
      startTime: startTime.toISOString(),
      endTime,
      duration,
      recordsProcessed: Math.floor(Math.random() * 100000) + 10000,
    });
  }

  return jobs;
}

export function generateForecastData(days: number): ForecastDataPoint[] {
  const data: ForecastDataPoint[] = [];
  const baseValue = 1000;

  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() + i * 86400000);
    const trend = i * 5;
    const noise = (Math.random() - 0.5) * 100;
    const predicted = baseValue + trend + noise;
    const actual = i < days / 2 ? predicted + (Math.random() - 0.5) * 50 : undefined;

    data.push({
      date: date.toISOString().split('T')[0],
      predicted: Math.floor(predicted),
      actual: actual ? Math.floor(actual) : undefined,
      confidence: 0.85 + Math.random() * 0.1,
    });
  }

  return data;
}

export function generateLogs(count: number): LogEntry[] {
  const severities: LogEntry['severity'][] = ['info', 'warn', 'error', 'debug'];
  const messages = [
    'Request processed successfully',
    'Cache miss, fetching from database',
    'Connection pool exhausted',
    'Rate limit approaching threshold',
    'Inventory sync completed',
    'Order routing optimized',
    'Warehouse health check passed',
    'Database query slow, took 2.3s',
  ];
  const logs: LogEntry[] = [];

  for (let i = 0; i < count; i++) {
    logs.push({
      id: `log-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - i * 1000).toISOString(),
      severity: severities[Math.floor(Math.random() * severities.length)],
      service: SERVICES[Math.floor(Math.random() * SERVICES.length)],
      traceId: `trace-${Math.random().toString(36).substr(2, 9)}`,
      message: messages[Math.floor(Math.random() * messages.length)],
    });
  }

  return logs;
}

export function generateRouteOptimization(algorithm: 'dijkstra' | 'astar' | 'greedy'): RouteOptimization {
  const warehouses = WAREHOUSE_LOCATIONS;
  const source = warehouses[Math.floor(Math.random() * warehouses.length)];
  const destination = ['New York', 'Chicago', 'Miami'][Math.floor(Math.random() * 3)];
  
  const pathLength = algorithm === 'dijkstra' ? 4 : algorithm === 'astar' ? 3 : 5;
  const path = [source.name];
  for (let i = 1; i < pathLength - 1; i++) {
    const intermediate = warehouses[Math.floor(Math.random() * warehouses.length)];
    if (!path.includes(intermediate.name)) {
      path.push(intermediate.name);
    }
  }
  path.push(destination);

  const baseCost = algorithm === 'dijkstra' ? 120 : algorithm === 'astar' ? 115 : 135;
  const baseTime = algorithm === 'dijkstra' ? 180 : algorithm === 'astar' ? 165 : 200;

  return {
    orderId: `ord-${Date.now()}`,
    algorithm,
    sourceWarehouse: source.name,
    destination,
    path,
    totalCost: baseCost + Math.floor(Math.random() * 20),
    estimatedTime: baseTime + Math.floor(Math.random() * 30),
    distance: 1200 + Math.floor(Math.random() * 400),
  };
}
