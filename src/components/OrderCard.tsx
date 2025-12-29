import { Order } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';

interface OrderCardProps {
  order: Order;
  showActions?: boolean;
  onStatusChange?: (status: Order['status']) => void;
}

export function OrderCard({ order, showActions, onStatusChange }: OrderCardProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="overflow-hidden animate-fade-in">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="font-display font-semibold text-sm text-primary">
              {order.id}
            </p>
            <p className="text-xs text-muted-foreground">
              Ordered at {formatTime(order.createdAt)}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {showActions && (
          <p className="font-medium text-sm mb-2">{order.studentName}</p>
        )}

        <div className="space-y-1 mb-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.foodItem.name}
              </span>
              <span className="text-muted-foreground">
                ₹{item.foodItem.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Pickup Time</p>
            <p className="font-medium text-sm">{order.pickupTime}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-bold text-primary">₹{order.totalAmount}</p>
          </div>
        </div>

        {showActions && order.status !== 'completed' && (
          <div className="mt-3 pt-3 border-t border-border flex gap-2">
            {order.status === 'pending' && (
              <button
                onClick={() => onStatusChange?.('preparing')}
                className="flex-1 py-2 px-3 bg-warning text-warning-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Start Preparing
              </button>
            )}
            {order.status === 'preparing' && (
              <button
                onClick={() => onStatusChange?.('ready')}
                className="flex-1 py-2 px-3 bg-success text-success-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Mark Ready
              </button>
            )}
            {order.status === 'ready' && (
              <button
                onClick={() => onStatusChange?.('completed')}
                className="flex-1 py-2 px-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Complete Order
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
