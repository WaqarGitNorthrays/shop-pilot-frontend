import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
}
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductCardProps {
  product?: Product | null;
  loading?: boolean;
}

export const ProductCard = ({ product, loading = false }: ProductCardProps) => {
  if (loading) {
    return (
      <Card className="h-full flex flex-col border-0 shadow-md hover:shadow-lg transition-shadow">
        <div className="animate-pulse bg-gray-200 h-48 w-full rounded-t-lg" />
        <CardContent className="flex-1 p-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </CardContent>
      </Card>
    );
  }

  if (!product) {
    return null; // or return a placeholder/error message
  }

  const { id, name, price, image, category, description } = product;
  const addItem = useCartStore((state) => state.addItem);

  console.log("category in  product card", category);

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
            <p className="text-sm font-medium">
              {description}
            </p>
            {/* <Star className="h-4 w-4 fill-warning text-warning" /> */}
            {/* <span className="text-sm font-medium">{rating}</span> */}
          </div>
          
          <p className="text-2xl font-bold text-primary">{price.toFixed(2)}</p>
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
