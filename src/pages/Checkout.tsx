import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimeSlotPicker } from '@/components/TimeSlotPicker';
import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Checkout() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const { items, totalAmount, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { student } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!selectedSlot) {
      toast({
        title: 'Select a time slot',
        description: 'Please choose a pickup time for your order.',
        variant: 'destructive',
      });
      return;
    }

    const newOrderId = `ORD-${String(Date.now()).slice(-6)}`;
    
    addOrder({
      id: newOrderId,
      studentId: student?.id || 'STU-001',
      studentName: student?.name || 'Student',
      items: items,
      totalAmount,
      pickupTime: selectedSlot,
      status: 'pending',
      createdAt: new Date(),
      specialInstructions: specialInstructions || undefined,
    });

    setOrderId(newOrderId);
    setIsConfirmed(true);
    clearCart();
    
    toast({
      title: 'Order Placed!',
      description: `Your order ${newOrderId} has been confirmed.`,
    });
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-background to-background -z-10" />
        
        <Card className="w-full max-w-md text-center border-success/30">
          <CardContent className="pt-8 pb-8">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            
            <h1 className="font-display text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              Your order has been placed successfully
            </p>

            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Order ID</p>
              <p className="font-display text-2xl font-bold text-primary">{orderId}</p>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
              <Clock className="w-4 h-4" />
              <span>Pickup Time: <strong className="text-foreground">{selectedSlot}</strong></span>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => navigate('/dashboard')}
                className="w-full"
                size="lg"
              >
                View My Orders
              </Button>
              <Button
                onClick={() => navigate('/menu')}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Order More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => navigate('/menu')}>Browse Menu</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </Link>

        <h1 className="font-display text-2xl font-bold mb-6">Checkout</h1>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((item) => (
              <div key={item.foodItem.id} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.foodItem.name}
                </span>
                <span className="font-medium">
                  ₹{item.foodItem.price * item.quantity}
                </span>
              </div>
            ))}
            <div className="flex justify-between pt-3 border-t border-border">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-primary text-lg">₹{totalAmount}</span>
            </div>
          </CardContent>
        </Card>

        {/* Time Slot Selection */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Select Pickup Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TimeSlotPicker selected={selectedSlot} onSelect={setSelectedSlot} />
          </CardContent>
        </Card>

        {/* Special Instructions */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Special Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="instructions">Any special requests? (optional)</Label>
              <Textarea
                id="instructions"
                placeholder="e.g., Less spicy, no onions..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Place Order Button */}
        <Button
          size="lg"
          className="w-full"
          onClick={handlePlaceOrder}
        >
          Place Order • ₹{totalAmount}
        </Button>
      </div>
    </div>
  );
}
