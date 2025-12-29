import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyticsData } from '@/lib/mock-data';
import { ChefHat, LayoutDashboard, UtensilsCrossed, BarChart3, LogOut, TrendingUp, DollarSign, Clock, Leaf } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminAnalytics() {
  const { logout } = useAuth();
  const data = analyticsData;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-card border-r border-border p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8"><div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"><ChefHat className="w-6 h-6 text-primary-foreground" /></div><span className="font-display font-bold">CampusBites</span></div>
        <nav className="space-y-2">
          <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted"><LayoutDashboard className="w-5 h-5" />Orders</Link>
          <Link to="/admin/menu" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted"><UtensilsCrossed className="w-5 h-5" />Menu</Link>
          <Link to="/admin/analytics" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground"><BarChart3 className="w-5 h-5" />Analytics</Link>
        </nav>
        <Button variant="ghost" className="w-full mt-8 justify-start gap-3" onClick={logout}><LogOut className="w-5 h-5" />Logout</Button>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="font-display text-2xl font-bold mb-6">Analytics Dashboard</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"><TrendingUp className="w-5 h-5 text-primary" /></div><div><p className="text-2xl font-bold">{data.totalOrdersToday}</p><p className="text-xs text-muted-foreground">Orders Today</p></div></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center"><DollarSign className="w-5 h-5 text-success" /></div><div><p className="text-2xl font-bold">₹{data.revenueToday}</p><p className="text-xs text-muted-foreground">Revenue Today</p></div></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center"><Clock className="w-5 h-5 text-warning" /></div><div><p className="text-2xl font-bold">{data.peakTimeSlot}</p><p className="text-xs text-muted-foreground">Peak Time</p></div></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center"><Leaf className="w-5 h-5 text-success" /></div><div><p className="text-2xl font-bold">{data.wastageReduction}%</p><p className="text-xs text-muted-foreground">Waste Reduced</p></div></div></CardContent></Card>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card><CardHeader><CardTitle className="text-lg">Popular Items</CardTitle></CardHeader><CardContent><div className="space-y-3">{data.popularItems.map((item, i) => (<div key={i} className="flex items-center justify-between"><span className="text-sm">{i+1}. {item.name}</span><span className="text-sm font-medium text-primary">{item.count} orders</span></div>))}</div></CardContent></Card>
          <Card><CardHeader><CardTitle className="text-lg">Orders by Time</CardTitle></CardHeader><CardContent><div className="space-y-2">{data.ordersByTimeSlot.map((slot, i) => (<div key={i} className="flex items-center gap-3"><span className="text-sm w-12">{slot.slot}</span><div className="flex-1 h-6 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${(slot.orders / 50) * 100}%` }} /></div><span className="text-sm font-medium w-8">{slot.orders}</span></div>))}</div></CardContent></Card>
        </div>
      </main>
    </div>
  );
}
