export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: FoodCategory;
  image: string;
  available: boolean;
  preparationTime: number; // in minutes
}

export type FoodCategory = 
  | 'breakfast'
  | 'main-course'
  | 'snacks'
  | 'beverages'
  | 'desserts'
  | 'todays-special';

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export interface Order {
  id: string;
  studentId: string;
  studentName: string;
  items: CartItem[];
  totalAmount: number;
  pickupTime: string;
  status: OrderStatus;
  createdAt: Date;
  specialInstructions?: string;
  rating?: number;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed';

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface AnalyticsData {
  totalOrdersToday: number;
  revenueToday: number;
  averageOrderValue: number;
  peakTimeSlot: string;
  popularItems: { name: string; count: number }[];
  ordersByTimeSlot: { slot: string; orders: number }[];
  wastageReduction: number;
}
