import { ArrowRight, Laptop, Shirt, Watch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import productsData from '@/data/products.json';

export default function Home() {
  const featuredProducts = productsData.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Discover Amazing Products
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Shop the latest trends in electronics, fashion, and accessories with unbeatable prices.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/products">
                  <Button size="lg" className="group">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/admin/dashboard">
                  <Button size="lg" variant="outline">
                    Admin Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CategoryCard
                name="Electronics"
                icon={Laptop}
                itemCount={3}
                link="/products?category=Electronics"
              />
              <CategoryCard
                name="Clothing"
                icon={Shirt}
                itemCount={2}
                link="/products?category=Clothing"
              />
              <CategoryCard
                name="Accessories"
                icon={Watch}
                itemCount={3}
                link="/products?category=Accessories"
              />
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Link to="/products">
                <Button variant="ghost">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  rating={product.rating}
                  category={product.category}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of happy customers today.
            </p>
            <Link to="/products">
              <Button size="lg" variant="secondary">
                Browse Products
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
