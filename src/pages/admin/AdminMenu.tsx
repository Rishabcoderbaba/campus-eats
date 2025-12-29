import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { menuItems as initialMenu, categoryLabels } from '@/lib/mock-data';
import { FoodItem } from '@/lib/types';
import { ChefHat, LayoutDashboard, UtensilsCrossed, BarChart3, LogOut, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export default function AdminMenu() {
  const [items, setItems] = useState<FoodItem[]>(initialMenu);
  const { logout } = useAuth();

  const toggleAvailability = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, available: !item.available } : item));
    toast({ title: 'Updated', description: 'Item availability changed.' });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-card border-r border-border p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8"><div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"><ChefHat className="w-6 h-6 text-primary-foreground" /></div><span className="font-display font-bold">CampusBites</span></div>
        <nav className="space-y-2">
          <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted"><LayoutDashboard className="w-5 h-5" />Orders</Link>
          <Link to="/admin/menu" className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground"><UtensilsCrossed className="w-5 h-5" />Menu</Link>
          <Link to="/admin/analytics" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted"><BarChart3 className="w-5 h-5" />Analytics</Link>
        </nav>
        <Button variant="ghost" className="w-full mt-8 justify-start gap-3" onClick={logout}><LogOut className="w-5 h-5" />Logout</Button>
      </aside>
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-2xl font-bold">Menu Management</h1>
          <Button className="gap-2"><Plus className="w-4 h-4" />Add Item</Button>
        </div>
        <div className="grid gap-4">
          {items.map(item => (
            <Card key={item.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{categoryLabels[item.category]} • ₹{item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{item.available ? 'In Stock' : 'Out of Stock'}</span>
                    <Switch checked={item.available} onCheckedChange={() => toggleAvailability(item.id)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
