import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export function OrderTicker() {
  const recentOrders = useStore((state) => state.recentOrders);
  const [displayOrders, setDisplayOrders] = useState(recentOrders.slice(0, 10));

  useEffect(() => {
    setDisplayOrders(recentOrders.slice(0, 10));
  }, [recentOrders]);

  return (
    <div className="relative overflow-hidden bg-card border border-card-border rounded-md p-4" data-testid="component-order-ticker">
      <div className="text-xs font-medium text-muted-foreground mb-2">Live Order Stream</div>
      <div className="flex flex-col gap-1 h-32 overflow-hidden">
        {displayOrders.map((order, idx) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1 - idx * 0.08, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xs font-mono flex items-center gap-2"
            data-testid={`order-ticker-${order.id}`}
          >
            <span className="text-primary">#{order.id}</span>
            <span className="text-muted-foreground">→</span>
            <span className="text-foreground">{order.sku}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-chart-1">{order.sourceWarehouse}</span>
            <span className="text-muted-foreground">→</span>
            <span className="text-chart-2">{order.destinationCity}</span>
            <span className="text-muted-foreground ml-auto">{order.latency}ms</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
