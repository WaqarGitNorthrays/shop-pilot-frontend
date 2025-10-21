'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFilterStore } from '@/stores/filterStore';
import { useProductStore } from '@/stores/useProductStore';
import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Products() {
  const {
    category,
    priceRange,
    sortBy,
    searchQuery,
    setCategory,
    setPriceRange,
    setSortBy,
    setSearchQuery,
    resetFilters,
  } = useFilterStore();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const { products, loading, error, fetchProducts, categories, fetchCategories } = useProductStore();
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    fetchProducts(page, limit);
    fetchCategories();
  }, [page, fetchProducts, fetchCategories]);

  // Get unique categories from the fetched categories
  const categoryOptions = ['All', ...categories.map(cat => cat.name)];

  // 🟢 TEMPORARY: no filter logic — just show all fetched products
  const displayedProducts = products;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">All Products</h1>
            <p className="text-muted-foreground">
              {loading ? (
                <Skeleton className="h-5 w-40" />
              ) : (
                `Showing ${displayedProducts.length} products`
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar — UI only */}
          <aside className="lg:col-span-1">
            <Card className="border-0 shadow-md sticky top-24">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    min={0}
                    max={1000}
                    step={10}
                    className="mt-2"
                  />
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sort order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductCard key={`loading-${i}`} loading />
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                Error loading products: {error}
              </div>
            ) : displayedProducts.length === 0 ? (
              <Card className="p-12 text-center border-0 shadow-md">
                <p className="text-muted-foreground">No products available.</p>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product) => {
                  const productData = product ? {
                    id: product._id || '',
                    name: product.name || 'Unnamed Product',
                    price: product.price || 0,
                    image: product.image || '/placeholder.svg',
                    category: product.category || 'Uncategorized',
                    description: product.description || 'No description available.'
                  } : null;
                  
                  return (
                    <ProductCard
                      key={product._id}
                      product={productData}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
