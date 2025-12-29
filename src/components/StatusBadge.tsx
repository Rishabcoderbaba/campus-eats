import { OrderStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Clock, ChefHat, CheckCircle, Package } from 'lucide-react';

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    pending: {
      label: 'Pending',
      icon: Clock,
      className: 'bg-muted text-muted-foreground',
    },
    preparing: {
      label: 'Preparing',
      icon: ChefHat,
      className: 'bg-warning/20 text-warning-foreground border-warning',
    },
    ready: {
      label: 'Ready',
      icon: Package,
      className: 'bg-success/20 text-success border-success',
    },
    completed: {
      label: 'Completed',
      icon: CheckCircle,
      className: 'bg-primary/20 text-primary border-primary',
    },
  };

  const { label, icon: Icon, className } = config[status];

  return (
    <Badge variant="outline" className={`gap-1 ${className}`}>
      <Icon className="w-3 h-3" />
      {label}
    </Badge>
  );
}
