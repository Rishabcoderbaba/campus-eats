import { FoodItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useItemRatings } from '@/hooks/useItemRatings';
import { toast } from '@/hooks/use-toast';

interface FoodCardProps {
  food: FoodItem;
}

export function FoodCard({ food }: FoodCardProps) {
  const { addItem } = useCart();
  const { getItemRating } = useItemRatings();
  const rating = getItemRating(food.id);

  const handleAddToCart = () => {
    if (!food.available) return;
    addItem(food);
    toast({
      title: 'Added to cart!',
      description: `${food.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden hover-lift group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!food.available && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm font-medium">
              Sold Out
            </Badge>
          </div>
        )}
        {food.available && (
          <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
            Available
          </Badge>
        )}
        {rating && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-warning text-warning" />
            <span className="text-xs font-semibold">{rating}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-semibold text-lg leading-tight">
            {food.name}
          </h3>
          <span className="font-bold text-primary text-lg">₹{food.price}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {food.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            {food.preparationTime} min
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!food.available}
            className="gap-1"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
