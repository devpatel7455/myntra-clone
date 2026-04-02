import { Link } from "react-router-dom";
import { Heart, X } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const Wishlist = () => {
  const { items, remove } = useWishlist();
  const { dispatch } = useCart();

  const moveToCart = (product: typeof items[0]) => {
    dispatch({ type: "ADD", product, size: product.sizes[0] });
    remove(product.id);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-20 text-center">
        <Heart size={64} className="mx-auto text-muted-foreground mb-4" />
        <h2 className="text-lg font-bold text-foreground mb-2">Your wishlist is empty</h2>
        <p className="text-sm text-muted-foreground mb-6">Add items that you like to your wishlist.</p>
        <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-sm font-bold text-sm hover:opacity-90 transition-opacity">
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      <h1 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
        My Wishlist <span className="font-normal text-muted-foreground">{items.length} item(s)</span>
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map(product => (
          <div key={product.id} className="relative group border border-border rounded-sm overflow-hidden">
            <button onClick={() => remove(product.id)}
              className="absolute top-2 right-2 z-10 p-1 bg-background/80 rounded-full hover:bg-background">
              <X size={14} />
            </button>
            <Link to={`/product/${product.id}`}>
              <img src={product.images[0]} alt={product.title} className="w-full aspect-[3/4] object-cover" loading="lazy" />
            </Link>
            <div className="p-2">
              <h3 className="text-sm font-bold text-foreground truncate">{product.brand}</h3>
              <p className="text-xs text-muted-foreground truncate">{product.title}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm font-bold text-foreground">Rs. {product.price}</span>
                <span className="text-xs text-muted-foreground line-through">Rs. {product.originalPrice}</span>
              </div>
              <button onClick={() => moveToCart(product)}
                className="w-full mt-2 border border-primary text-primary text-xs font-bold py-2 rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                MOVE TO BAG
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
