import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const { items, totalItems, totalAmount, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 animate-bounce-soft"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">
                Add some delicious items!
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.foodItem.id}
                  className="flex gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <img
                    src={item.foodItem.image}
                    alt={item.foodItem.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.foodItem.name}
                    </h4>
                    <p className="text-primary font-semibold text-sm">
                      ₹{item.foodItem.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.foodItem.id, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.foodItem.id, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.foodItem.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-sm">
                      ₹{item.foodItem.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{totalAmount}
                </span>
              </div>
              <Button
                size="lg"
                className="w-full"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
