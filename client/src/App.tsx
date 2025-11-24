import { Switch, Route } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { AnimatedBackground } from './components/AnimatedBackground';
import SystemOverview from './pages/SystemOverview';
import WarehouseManager from './pages/WarehouseManager';
import InventoryExplorer from './pages/InventoryExplorer';
import OrderFlow from './pages/OrderFlow';
import PredictionsConsole from './pages/PredictionsConsole';
import DistributedTracing from './pages/DistributedTracing';
import NotFound from './pages/not-found';
import { Activity } from 'lucide-react';
import { useStore } from './store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={SystemOverview} />
        <Route path="/warehouses" component={WarehouseManager} />
        <Route path="/inventory" component={InventoryExplorer} />
        <Route path="/orders" component={OrderFlow} />
        <Route path="/predictions" component={PredictionsConsole} />
        <Route path="/tracing" component={DistributedTracing} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const systemMetrics = useStore((state) => state.systemMetrics);
  
  const style = {
    '--sidebar-width': '16rem',
    '--sidebar-width-icon': '3rem',
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full overflow-hidden">
            <AnimatedBackground />
            <AppSidebar />
            <div className="flex flex-col flex-1 relative z-10">
              <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-chart-1" />
                    <span className="text-sm font-medium">System Status</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">Uptime</div>
                    <div className="text-sm font-bold text-green-500">{systemMetrics.uptime.toFixed(2)}%</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">SLA</div>
                    <div className="text-sm font-bold text-chart-1">{systemMetrics.sla.toFixed(1)}%</div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-chart-1 to-chart-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AD</span>
                  </div>
                </div>
              </motion.header>
              <main className="flex-1 overflow-auto p-6 md:p-8">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
