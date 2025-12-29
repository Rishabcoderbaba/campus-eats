import { FoodCategory } from '@/lib/types';
import { categoryLabels } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { UtensilsCrossed, Coffee, Sandwich, GlassWater, IceCream, Star } from 'lucide-react';

interface CategoryTabsProps {
  selected: FoodCategory | 'all';
  onSelect: (category: FoodCategory | 'all') => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  'all': UtensilsCrossed,
  'breakfast': Coffee,
  'main-course': UtensilsCrossed,
  'snacks': Sandwich,
  'beverages': GlassWater,
  'desserts': IceCream,
  'todays-special': Star,
};

const categories: (FoodCategory | 'all')[] = [
  'all',
  'breakfast',
  'main-course',
  'snacks',
  'beverages',
  'desserts',
  'todays-special',
];

export function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = categoryIcons[category];
        const label = category === 'all' ? 'All Items' : categoryLabels[category];
        
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              selected === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
