import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

export const ProductCard = ({ id, name, price, image, rating, category }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, price, image });
    toast.success('Added to cart!', {
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover-scale">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{category}</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{name}</h3>
          
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          
          <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
