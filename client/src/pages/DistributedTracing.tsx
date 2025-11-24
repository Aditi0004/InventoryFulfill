import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { generateLogs } from '../utils/mockData';

export default function DistributedTracing() {
  const logs = useStore((state) => state.logs);
  const addLogEntry = useStore((state) => state.addLogEntry);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = generateLogs(1)[0];
      addLogEntry(newLog);
    }, 2000);

    return () => clearInterval(interval);
  }, [addLogEntry]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [logs]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'text-red-500';
      case 'warn':
        return 'text-amber-500';
      case 'info':
        return 'text-blue-500';
      case 'debug':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

  const traceSpans = [
    { name: 'api-gateway', duration: 45, level: 0, status: 'ok' as const },
    { name: 'auth-middleware', duration: 12, level: 1, status: 'ok' as const },
    { name: 'order-service', duration: 89, level: 1, status: 'ok' as const },
    { name: 'validate-order', duration: 15, level: 2, status: 'ok' as const },
    { name: 'inventory-check', duration: 34, level: 2, status: 'ok' as const },
    { name: 'database-query', duration: 28, level: 3, status: 'ok' as const },
    { name: 'warehouse-service', duration: 56, level: 2, status: 'ok' as const },
    { name: 'routing-engine', duration: 42, level: 3, status: 'ok' as const },
    { name: 'create-shipment', duration: 31, level: 2, status: 'ok' as const },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Distributed Tracing & System Logs</h1>
        <p className="text-muted-foreground">Real-time service call graphs and streaming log aggregation</p>
      </div>

      <Card className="hover-elevate" data-testid="card-trace-graph">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-chart-1" />
            X-Ray Call Graph
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 font-mono text-sm">
            {traceSpans.map((span, idx) => {
              const indent = span.level * 40;
              const widthPercent = (span.duration / 100) * 100;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-2"
                  style={{ paddingLeft: `${indent}px` }}
                >
                  <div className="flex-1 flex items-center gap-2">
                    <div className="text-muted-foreground text-xs">
                      {span.level > 0 && '└─ '}
                    </div>
                    <div className="text-xs text-foreground min-w-[180px]">{span.name}</div>
                    <div className="flex-1 h-6 bg-card-border rounded overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPercent}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        className={`h-full ${span.status === 'ok' ? 'bg-chart-1' : 'bg-destructive'}`}
                      />
                      <div className="absolute inset-0 flex items-center justify-end px-2">
                        <span className="text-xs font-medium text-white">{span.duration}ms</span>
                      </div>
                    </div>
                    <Badge variant={span.status === 'ok' ? 'default' : 'destructive'} className="text-xs">
                      {span.status}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Total request duration: {traceSpans.reduce((acc, span) => Math.max(acc, span.duration), 0)}ms
          </div>
        </CardContent>
      </Card>

      <Card className="hover-elevate" data-testid="card-logs">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-chart-2" />
            Real-time System Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] rounded-md border border-border bg-black/20 p-4" ref={scrollRef}>
            <div className="space-y-1 font-mono text-xs">
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-2"
                  data-testid={`log-${log.id}`}
                >
                  <span className="text-muted-foreground shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                  <Badge
                    variant={
                      log.severity === 'error'
                        ? 'destructive'
                        : log.severity === 'warn'
                        ? 'default'
                        : 'secondary'
                    }
                    className="text-xs shrink-0"
                  >
                    {log.severity.toUpperCase()}
                  </Badge>
                  <span className="text-chart-1 shrink-0">[{log.service}]</span>
                  <span className="text-muted-foreground shrink-0 text-[10px]">{log.traceId}</span>
                  <span className={getSeverityColor(log.severity)}>{log.message}</span>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  );
}
