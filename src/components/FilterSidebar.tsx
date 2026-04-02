import { brands, categories } from "@/data/products";

interface FilterProps {
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: [number, number];
  minRating: number;
  onCategoryChange: (cat: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onRatingChange: (rating: number) => void;
  onClear: () => void;
}

const priceRanges: { label: string; range: [number, number] }[] = [
  { label: "Under ₹500", range: [0, 500] },
  { label: "₹500 - ₹1000", range: [500, 1000] },
  { label: "₹1000 - ₹2000", range: [1000, 2000] },
  { label: "₹2000 - ₹5000", range: [2000, 5000] },
  { label: "Above ₹5000", range: [5000, 100000] },
];

const FilterSidebar = ({ selectedCategories, selectedBrands, priceRange, minRating, onCategoryChange, onBrandChange, onPriceChange, onRatingChange, onClear }: FilterProps) => {
  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Filters</h3>
        <button onClick={onClear} className="text-xs text-primary font-semibold hover:underline">CLEAR ALL</button>
      </div>

      {/* Categories */}
      <div className="border-b border-border pb-4 mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Categories</h4>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => onCategoryChange(cat)}
                className="w-4 h-4 accent-primary" />
              <span className="text-xs text-foreground">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="border-b border-border pb-4 mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Brand</h4>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => onBrandChange(brand)}
                className="w-4 h-4 accent-primary" />
              <span className="text-xs text-foreground">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="border-b border-border pb-4 mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Price</h4>
        <div className="space-y-2">
          {priceRanges.map(pr => (
            <label key={pr.label} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="price" checked={priceRange[0] === pr.range[0] && priceRange[1] === pr.range[1]}
                onChange={() => onPriceChange(pr.range)} className="w-4 h-4 accent-primary" />
              <span className="text-xs text-foreground">{pr.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="pb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">Customer Ratings</h4>
        <div className="space-y-2">
          {[4, 3, 2].map(r => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="rating" checked={minRating === r} onChange={() => onRatingChange(r)}
                className="w-4 h-4 accent-primary" />
              <span className="text-xs text-foreground">{r}★ & above</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
