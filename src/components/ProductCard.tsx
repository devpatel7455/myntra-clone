import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group relative bg-background transition-shadow duration-200 hover:myntra-shadow-hover">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Rating badge */}
          <div className="absolute bottom-2 left-2 bg-background/90 px-2 py-[2px] flex items-center gap-1 rounded-sm text-xs font-semibold">
            <span>{product.rating}</span>
            <Star size={10} className="fill-myntra-rating text-myntra-rating" />
            <span className="text-muted-foreground font-normal">| {product.ratingCount >= 1000 ? `${(product.ratingCount / 1000).toFixed(1)}k` : product.ratingCount}</span>
          </div>
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        onClick={() => toggle(product)}
        className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors z-10"
      >
        <Heart
          size={16}
          className={wishlisted ? "fill-primary text-primary" : "text-muted-foreground"}
        />
      </button>

      <Link to={`/product/${product.id}`} className="block p-2 pt-3">
        <h3 className="text-sm font-bold text-foreground truncate">{product.brand}</h3>
        <p className="text-xs text-muted-foreground truncate mt-[2px]">{product.title}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-sm font-bold text-foreground">Rs. {product.price}</span>
          <span className="text-xs text-muted-foreground line-through">Rs. {product.originalPrice}</span>
          <span className="text-xs font-semibold text-myntra-discount">({product.discount}% OFF)</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
