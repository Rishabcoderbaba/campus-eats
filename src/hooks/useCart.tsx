import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, FoodItem } from '@/lib/types';

interface CartContextType {
  items: CartItem[];
  addItem: (food: FoodItem) => void;
  removeItem: (foodId: string) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (food: FoodItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.foodItem.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.foodItem.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { foodItem: food, quantity: 1 }];
    });
  };

  const removeItem = (foodId: string) => {
    setItems((prev) => prev.filter((item) => item.foodItem.id !== foodId));
  };

  const updateQuantity = (foodId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(foodId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.foodItem.id === foodId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.foodItem.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
