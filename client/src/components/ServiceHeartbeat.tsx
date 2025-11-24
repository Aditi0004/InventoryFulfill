import { motion } from 'framer-motion';

interface ServiceHeartbeatProps {
  status: 'healthy' | 'degraded' | 'down';
  size?: 'sm' | 'md' | 'lg';
}

export function ServiceHeartbeat({ status, size = 'md' }: ServiceHeartbeatProps) {
  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  const colors = {
    healthy: 'bg-green-500',
    degraded: 'bg-amber-500',
    down: 'bg-red-500',
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className={`rounded-full ${colors[status]} ${sizeClasses[size]}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className={`absolute rounded-full ${colors[status]} ${sizeClasses[size]}`}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
