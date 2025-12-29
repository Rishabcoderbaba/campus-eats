import { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '@/lib/types';
import { mockOrders } from '@/lib/mock-data';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  rateOrder: (orderId: string, rating: number) => void;
  getStudentOrders: (studentId: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const rateOrder = (orderId: string, rating: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, rating } : order
      )
    );
  };

  const getStudentOrders = (studentId: string) => {
    return orders.filter((order) => order.studentId === studentId);
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrderStatus, rateOrder, getStudentOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
