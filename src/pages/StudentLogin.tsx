import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { ChefHat, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const { loginStudent } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !rollNumber) {
      toast({
        title: 'Missing fields',
        description: 'Please enter your email and roll number.',
        variant: 'destructive',
      });
      return;
    }
    loginStudent(email, rollNumber);
    toast({
      title: 'Welcome!',
      description: 'You are now logged in.',
    });
    navigate('/menu');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/50 to-background -z-10" />
      
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="font-display text-2xl">Student Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the menu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  type="text"
                  placeholder="e.g., CSE2024001"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Continue to Menu
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                💡 Demo Mode: Enter any email and roll number to continue
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/admin/login"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Are you canteen staff? Login here →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
