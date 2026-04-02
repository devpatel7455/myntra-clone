import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import FilterSidebar from "@/components/FilterSidebar";
import { products } from "@/data/products";
import { Filter, X } from "lucide-react";

type SortOption = "popular" | "price-low" | "price-high" | "rating";

const ProductListing = ({ categoryFilter }: { categoryFilter?: "men" | "women" | "kids" }) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = products;
    if (categoryFilter) result = result.filter(p => p.category === categoryFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.subCategory.toLowerCase().includes(q));
    }
    if (selectedCategories.length) result = result.filter(p => selectedCategories.includes(p.subCategory));
    if (selectedBrands.length) result = result.filter(p => selectedBrands.includes(p.brand));
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating) result = result.filter(p => p.rating >= minRating);

    switch (sortBy) {
      case "price-low": return [...result].sort((a, b) => a.price - b.price);
      case "price-high": return [...result].sort((a, b) => b.price - a.price);
      case "rating": return [...result].sort((a, b) => b.rating - a.rating);
      default: return [...result].sort((a, b) => b.ratingCount - a.ratingCount);
    }
  }, [categoryFilter, searchQuery, selectedCategories, selectedBrands, priceRange, minRating, sortBy]);

  const pageTitle = categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}'s Fashion` : searchQuery ? `Results for "${searchQuery}"` : "All Products";

  const toggleCategory = (cat: string) => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  const toggleBrand = (brand: string) => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  const clearFilters = () => { setSelectedCategories([]); setSelectedBrands([]); setPriceRange([0, 100000]); setMinRating(0); };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
        <h1 className="text-base font-bold text-foreground">{pageTitle}</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-1 text-sm font-semibold text-foreground">
            <Filter size={14} /> Filters
          </button>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}
            className="text-sm border border-border rounded-sm px-3 py-1 bg-background text-foreground outline-none">
            <option value="popular">Sort by: Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop Filters */}
        <div className="hidden lg:block w-[240px] flex-shrink-0">
          <FilterSidebar selectedCategories={selectedCategories} selectedBrands={selectedBrands} priceRange={priceRange} minRating={minRating}
            onCategoryChange={toggleCategory} onBrandChange={toggleBrand} onPriceChange={setPriceRange} onRatingChange={setMinRating} onClear={clearFilters} />
        </div>

        {/* Mobile Filters Overlay */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-foreground/50">
            <div className="absolute right-0 top-0 h-full w-[280px] bg-background p-4 overflow-y-auto animate-slide-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-foreground">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X size={20} /></button>
              </div>
              <FilterSidebar selectedCategories={selectedCategories} selectedBrands={selectedBrands} priceRange={priceRange} minRating={minRating}
                onCategoryChange={toggleCategory} onBrandChange={toggleBrand} onPriceChange={setPriceRange} onRatingChange={setMinRating} onClear={clearFilters} />
            </div>
          </div>
        )}

        {/* Products */}
        <div className="flex-1">
          <ProductGrid products={filtered} title={pageTitle} />
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
