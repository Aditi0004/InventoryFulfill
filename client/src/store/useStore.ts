import { create } from 'zustand';
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
import {
  generateWarehouses,
  generateInventory,
  generateOrders,
  generateSystemMetrics,
  generateThroughputData,
  generateServiceStatuses,
  generateBatchJobs,
  generateForecastData,
  generateLogs,
  generateRouteOptimization,
} from '../utils/mockData';

interface StoreState {
  warehouses: Warehouse[];
  inventory: InventoryItem[];
  recentOrders: Order[];
  systemMetrics: SystemMetrics;
  throughputData: ThroughputDataPoint[];
  serviceStatuses: ServiceStatus[];
  batchJobs: BatchJob[];
  forecastData: ForecastDataPoint[];
  logs: LogEntry[];
  routeOptimization: RouteOptimization | null;
  selectedAlgorithm: 'dijkstra' | 'astar' | 'greedy';
  
  updateMetrics: () => void;
  addLogEntry: (entry: LogEntry) => void;
  setSelectedAlgorithm: (algo: 'dijkstra' | 'astar' | 'greedy') => void;
  simulateRebalance: () => void;
  refreshRouteOptimization: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  warehouses: generateWarehouses(),
  inventory: generateInventory(),
  recentOrders: generateOrders(20),
  systemMetrics: generateSystemMetrics(),
  throughputData: generateThroughputData(24),
  serviceStatuses: generateServiceStatuses(),
  batchJobs: generateBatchJobs(),
  forecastData: generateForecastData(30),
  logs: generateLogs(50),
  routeOptimization: generateRouteOptimization('dijkstra'),
  selectedAlgorithm: 'dijkstra',

  updateMetrics: () => {
    set({
      systemMetrics: generateSystemMetrics(),
      throughputData: [...get().throughputData.slice(1), generateThroughputData(1)[0]],
      recentOrders: [generateOrders(1)[0], ...get().recentOrders.slice(0, 19)],
      warehouses: get().warehouses.map(w => ({
        ...w,
        cpu: Math.min(95, Math.max(20, w.cpu + (Math.random() - 0.5) * 10)),
        ram: Math.min(95, Math.max(20, w.ram + (Math.random() - 0.5) * 10)),
        activeOrders: Math.max(0, w.activeOrders + Math.floor((Math.random() - 0.5) * 5)),
      })),
    });
  },

  addLogEntry: (entry) => {
    set({ logs: [entry, ...get().logs.slice(0, 499)] });
  },

  setSelectedAlgorithm: (algo) => {
    set({ 
      selectedAlgorithm: algo,
      routeOptimization: generateRouteOptimization(algo),
    });
  },

  simulateRebalance: () => {
    set({
      warehouses: get().warehouses.map(w => ({
        ...w,
        utilization: Math.min(95, Math.max(30, Math.random() * 70 + 20)),
        cpu: Math.min(80, Math.max(20, Math.random() * 40 + 20)),
        ram: Math.min(80, Math.max(25, Math.random() * 40 + 25)),
        status: Math.random() > 0.9 ? 'warning' : 'healthy',
      })),
    });
  },

  refreshRouteOptimization: () => {
    set({ routeOptimization: generateRouteOptimization(get().selectedAlgorithm) });
  },
}));
