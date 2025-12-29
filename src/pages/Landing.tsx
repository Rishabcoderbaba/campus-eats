import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Leaf, Users, ArrowRight, ChefHat, Timer, TrendingUp } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent to-background" />
        <div className="relative container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">CampusBites</span>
            </div>
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="ghost">Student Login</Button>
              </Link>
              <Link to="/admin/login">
                <Button variant="outline">Canteen Staff</Button>
              </Link>
            </div>
          </nav>

          <div className="max-w-3xl mx-auto text-center py-16 md:py-24">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 animate-fade-in">
              🍽️ Skip the Queue, Savor the Food
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Pre-Order Your
              <span className="text-primary block">Campus Meals</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto animate-fade-in">
              No more waiting in long queues. Order ahead, pick up on time, 
              and enjoy fresh food without the hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/login">
                <Button size="lg" className="gap-2 text-base px-8">
                  Order Food Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                  Canteen Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              The Campus Canteen Problem
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every day, students and canteens face the same challenges
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Long Queues</h3>
                <p className="text-sm text-muted-foreground">
                  Students waste 20-30 minutes daily standing in lunch lines
                </p>
              </CardContent>
            </Card>

            <Card className="bg-warning/5 border-warning/20">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Timer className="w-7 h-7 text-warning" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Rushed Breaks</h3>
                <p className="text-sm text-muted-foreground">
                  Limited time to eat between classes leads to skipped meals
                </p>
              </CardContent>
            </Card>

            <Card className="bg-muted border-border">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Food Wastage</h3>
                <p className="text-sm text-muted-foreground">
                  Unpredictable demand causes over-preparation and waste
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-success/10 text-success rounded-full text-sm font-medium mb-4">
              The Solution
            </span>
            <h2 className="font-display text-3xl font-bold mb-4">
              How CampusBites Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'Browse Menu', desc: 'View available items with real-time availability' },
              { step: '2', title: 'Place Order', desc: 'Select items and choose your pickup time slot' },
              { step: '3', title: 'Get Notified', desc: 'Receive updates when your order is ready' },
              { step: '4', title: 'Pick Up & Enjoy', desc: 'Skip the line and collect your fresh meal' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-display font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="font-display text-3xl font-bold mb-6">
                Benefits for Everyone
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">For Students</h3>
                    <p className="text-sm text-muted-foreground">
                      Save time, guaranteed fresh food, know exactly when to pick up
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <ChefHat className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">For Canteen Staff</h3>
                    <p className="text-sm text-muted-foreground">
                      Better demand forecasting, reduced waste, organized workflow
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      35% reduction in food waste, 80% less queue time
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="font-display text-4xl font-bold text-primary">35%</p>
                  <p className="text-sm text-muted-foreground mt-1">Less Food Waste</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-primary">80%</p>
                  <p className="text-sm text-muted-foreground mt-1">Time Saved</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground mt-1">Daily Orders</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-bold text-primary">98%</p>
                  <p className="text-sm text-muted-foreground mt-1">Happy Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to Skip the Queue?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join hundreds of students already enjoying hassle-free meals
          </p>
          <Link to="/login">
            <Button size="lg" className="gap-2 text-base px-8">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold">CampusBites</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for college hackathon demo • © 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
