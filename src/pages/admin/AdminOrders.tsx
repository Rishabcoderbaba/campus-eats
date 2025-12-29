import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { OrderCard } from '@/components/OrderCard';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/hooks/useAuth';
import { ChefHat, LayoutDashboard, UtensilsCrossed, BarChart3, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminOrders() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'preparing' | 'ready'>('all');
  const { orders, updateOrderStatus } = useOrders();
  const { logout } = useAuth();

  const filteredOrders = orders.filter(o => o.status !== 'completed' && (filter === 'all' || o.status === filter));
  const counts = { pending: orders.filter(o => o.status === 'pending').length, preparing: orders.filter(o => o.status === 'preparing').length, ready: orders.filter(o => o.status === 'ready').length };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-card border-r border-border p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"><ChefHat className="w-6 h-6 text-primary-foreground" /></div>
          <span className="font-display font-bold">CampusBites</span>
        </div>
        <nav className="space-y-2">
          <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground"><LayoutDashboard className="w-5 h-5" />Orders</Link>
          <Link to="/admin/menu" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted"><UtensilsCrossed className="w-5 h-5" />Menu</Link>
          <Link to="/admin/analytics" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted"><BarChart3 className="w-5 h-5" />Analytics</Link>
        </nav>
        <Button variant="ghost" className="w-full mt-8 justify-start gap-3" onClick={logout}><LogOut className="w-5 h-5" />Logout</Button>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="font-display text-2xl font-bold mb-6">Order Queue</h1>
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'pending', 'preparing', 'ready'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={cn('px-4 py-2 rounded-full text-sm font-medium transition-colors', filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80')}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)} {f !== 'all' && `(${counts[f]})`}
            </button>
          ))}
        </div>
        {filteredOrders.length === 0 ? <p className="text-muted-foreground text-center py-12">No orders in this category</p> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map(order => <OrderCard key={order.id} order={order} showActions onStatusChange={(status) => updateOrderStatus(order.id, status)} />)}
          </div>
        )}
      </main>
    </div>
  );
}
