import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FoodCard } from '@/components/FoodCard';
import { CartDrawer } from '@/components/CartDrawer';
import { CategoryTabs } from '@/components/CategoryTabs';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { menuItems } from '@/lib/mock-data';
import { FoodCategory } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import { ChefHat, Search, User, ClipboardList, LogOut } from 'lucide-react';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { student, logout } = useAuth();

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl hidden sm:block">CampusBites</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ClipboardList className="w-4 h-4" />
                  <span className="hidden sm:inline">My Orders</span>
                </Button>
              </Link>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{student?.rollNumber || 'Guest'}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Tabs */}
          <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>
      </header>

      {/* Menu Grid */}
      <main className="container mx-auto px-4 py-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} food={item} />
            ))}
          </div>
        )}
      </main>

      {/* Cart FAB - hidden on mobile since we have bottom nav */}
      <div className="hidden md:block">
        <CartDrawer />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
