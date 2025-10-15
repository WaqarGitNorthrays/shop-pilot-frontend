import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <CheckCircle className="h-24 w-24 text-success mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Order Successful!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your purchase. We'll send you a confirmation email shortly.
          </p>
          <Link to="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
