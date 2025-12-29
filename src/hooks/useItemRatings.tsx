import { useMemo } from 'react';
import { useOrders } from './useOrders';

export function useItemRatings() {
  const { orders } = useOrders();

  const itemRatings = useMemo(() => {
    const ratings: Record<string, { total: number; count: number }> = {};

    orders
      .filter((order) => order.status === 'completed' && order.rating)
      .forEach((order) => {
        order.items.forEach((item) => {
          const itemId = item.foodItem.id;
          if (!ratings[itemId]) {
            ratings[itemId] = { total: 0, count: 0 };
          }
          ratings[itemId].total += order.rating!;
          ratings[itemId].count += 1;
        });
      });

    const averages: Record<string, number> = {};
    Object.entries(ratings).forEach(([itemId, { total, count }]) => {
      averages[itemId] = Math.round((total / count) * 10) / 10;
    });

    return averages;
  }, [orders]);

  const getItemRating = (itemId: string): number | null => {
    return itemRatings[itemId] ?? null;
  };

  return { itemRatings, getItemRating };
}
