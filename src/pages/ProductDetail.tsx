import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Star, ShoppingBag, Truck, RotateCcw } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductGrid from "@/components/ProductGrid";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { dispatch } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);

  if (!product) return <div className="text-center py-20 text-muted-foreground">Product not found</div>;

  const wishlisted = isWishlisted(product.id);
  const similar = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    dispatch({ type: "ADD", product, size: selectedSize });
    navigate("/cart");
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="grid grid-cols-2 gap-2">
          <img src={product.images[0]} alt={product.title} className="col-span-2 w-full aspect-[3/4] object-cover rounded-sm" />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-xl font-bold text-foreground">{product.brand}</h1>
          <p className="text-base text-muted-foreground mt-1">{product.title}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3 border-b border-border pb-4">
            <span className="flex items-center gap-1 bg-myntra-success text-primary-foreground text-xs font-bold px-2 py-[2px] rounded-sm">
              {product.rating} <Star size={10} className="fill-current" />
            </span>
            <span className="text-sm text-muted-foreground">{product.ratingCount.toLocaleString()} Ratings</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-2xl font-bold text-foreground">Rs. {product.price}</span>
            <span className="text-lg text-muted-foreground line-through">MRP Rs. {product.originalPrice}</span>
            <span className="text-lg font-semibold text-myntra-discount">({product.discount}% OFF)</span>
          </div>
          <p className="text-xs text-myntra-success font-semibold mt-1">inclusive of all taxes</p>

          {/* Sizes */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground uppercase">Select Size</h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {product.sizes.map(size => (
                <button key={size} onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  className={`w-12 h-12 rounded-full border-2 text-sm font-semibold transition-colors ${selectedSize === size ? "border-primary text-primary" : "border-border text-foreground hover:border-primary"}`}>
                  {size}
                </button>
              ))}
            </div>
            {sizeError && <p className="text-xs text-destructive mt-2">Please select a size</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-sm font-bold text-sm hover:opacity-90 transition-opacity">
              <ShoppingBag size={18} /> ADD TO BAG
            </button>
            <button onClick={() => toggle(product)}
              className="flex items-center justify-center gap-2 border-2 border-border px-6 py-3 rounded-sm font-bold text-sm text-foreground hover:border-foreground transition-colors">
              <Heart size={18} className={wishlisted ? "fill-primary text-primary" : ""} />
              WISHLIST
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border-t border-border mt-6 pt-6 space-y-3">
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-foreground" />
              <div>
                <p className="text-sm font-semibold text-foreground">Get it by 3-5 business days</p>
                <p className="text-xs text-muted-foreground">Free delivery on orders above Rs. 799</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={18} className="text-foreground" />
              <div>
                <p className="text-sm font-semibold text-foreground">Easy 30 day returns</p>
                <p className="text-xs text-muted-foreground">Choose to return or exchange</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-border mt-6 pt-6">
            <h3 className="text-sm font-bold text-foreground uppercase mb-2">Product Details</h3>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similar.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wider">Similar Products</h2>
          <ProductGrid products={similar} />
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
