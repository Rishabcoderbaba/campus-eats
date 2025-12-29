import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { OrderProvider } from "@/hooks/useOrders";
import Landing from "./pages/Landing";
import StudentLogin from "./pages/StudentLogin";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import StudentDashboard from "./pages/StudentDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<StudentLogin />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/menu" element={<AdminMenu />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
