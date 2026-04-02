import ProductCard from "./ProductCard";
import { Product } from "@/data/products";

const ProductGrid = ({ products, title }: { products: Product[]; title?: string }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-muted-foreground">No products found</p>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-lg font-bold text-foreground mb-4">
          {title} <span className="text-sm font-normal text-muted-foreground">- {products.length} items</span>
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default ProductGrid;
