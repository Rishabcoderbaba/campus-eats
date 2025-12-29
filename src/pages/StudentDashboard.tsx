import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OrderCard } from '@/components/OrderCard';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { StarRating } from '@/components/StarRating';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { notifyUser } from '@/lib/notifications';
import { ChefHat, ArrowLeft, ShoppingBag, Clock } from 'lucide-react';

export default function StudentDashboard() {
  const { orders, updateOrderStatus, rateOrder } = useOrders();
  const { student } = useAuth();
  const prevStatusRef = useRef<Record<string, string>>({});

  const handleRate = (orderId: string, rating: number) => {
    rateOrder(orderId, rating);
    toast({
      title: 'Thanks for your feedback!',
      description: `You rated this order ${rating} star${rating > 1 ? 's' : ''}.`,
    });
  };

  const studentOrders = orders.filter(
    (order) => order.studentId === (student?.id || 'STU-001')
  );
  
  const activeOrders = studentOrders.filter(
    (order) => order.status !== 'completed'
  );
  
  const completedOrders = studentOrders.filter(
    (order) => order.status === 'completed'
  );

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      const pendingOrder = activeOrders.find(o => o.status === 'pending');
      const preparingOrder = activeOrders.find(o => o.status === 'preparing');
      
      if (pendingOrder) {
        updateOrderStatus(pendingOrder.id, 'preparing');
      } else if (preparingOrder) {
        updateOrderStatus(preparingOrder.id, 'ready');
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [activeOrders, updateOrderStatus]);

  // Show toast when order status changes
  useEffect(() => {
    studentOrders.forEach((order) => {
      const prevStatus = prevStatusRef.current[order.id];
      if (prevStatus && prevStatus !== order.status) {
        const messages: Record<string, { title: string; description: string }> = {
          preparing: {
            title: '👨‍🍳 Order Being Prepared!',
            description: `Your order ${order.id} is now being prepared.`,
          },
          ready: {
            title: '✅ Order Ready for Pickup!',
            description: `Your order ${order.id} is ready! Head to the counter.`,
          },
          completed: {
            title: '🎉 Order Completed!',
            description: `Thanks for ordering! Order ${order.id} is complete.`,
          },
        };
        
        const msg = messages[order.status];
        if (msg) {
          // Play sound and vibrate for "ready" status
          if (order.status === 'ready') {
            notifyUser();
          }
          toast({ title: msg.title, description: msg.description });
        }
      }
      prevStatusRef.current[order.id] = order.status;
    });
  }, [studentOrders]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/menu" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl hidden sm:block">CampusBites</span>
            </Link>
            
            <Link to="/menu">
              <Button className="gap-2">
                <ShoppingBag className="w-4 h-4" />
                Order More
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex items-center gap-2 mb-6">
          <Link
            to="/menu"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-display text-2xl font-bold">My Orders</h1>
        </div>

        {/* Active Orders */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold">Active Orders</h2>
            {activeOrders.length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                {activeOrders.length}
              </span>
            )}
          </div>

          {activeOrders.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground mb-4">No active orders</p>
                <Link to="/menu">
                  <Button>Browse Menu</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </section>

        {/* Order History */}
        <section>
          <h2 className="font-display text-lg font-semibold mb-4">Order History</h2>

          {completedOrders.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No past orders yet</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {completedOrders.map((order) => (
                    <div key={order.id} className="p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{order.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.items.map(i => `${i.quantity}x ${i.foodItem.name}`).join(', ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">₹{order.totalAmount}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Intl.DateTimeFormat('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            }).format(order.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">
                          {order.rating ? 'Your rating:' : 'Rate this order:'}
                        </span>
                        <StarRating
                          rating={order.rating || 0}
                          onRate={(rating) => handleRate(order.id, rating)}
                          readonly={!!order.rating}
                          size="sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
