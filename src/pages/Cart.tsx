import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { state, dispatch } = useCart();
  const { items } = state;

  const totalMRP = items.reduce((a, i) => a + i.product.originalPrice * i.quantity, 0);
  const totalDiscount = items.reduce((a, i) => a + (i.product.originalPrice - i.product.price) * i.quantity, 0);
  const totalAmount = totalMRP - totalDiscount;
  const deliveryFee = totalAmount >= 799 ? 0 : 99;

  if (items.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
        <h2 className="text-lg font-bold text-foreground mb-2">Your bag is empty</h2>
        <p className="text-sm text-muted-foreground mb-6">There is nothing in your bag. Let's add some items.</p>
        <Link to="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-sm font-bold text-sm hover:opacity-90 transition-opacity">
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto px-4 py-6">
      <h1 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
        My Bag <span className="font-normal text-muted-foreground">{items.length} item(s)</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map(item => (
            <div key={`${item.product.id}-${item.size}`} className="flex gap-4 border border-border p-3 rounded-sm">
              <Link to={`/product/${item.product.id}`}>
                <img src={item.product.images[0]} alt={item.product.title} className="w-[100px] h-[130px] object-cover rounded-sm" />
              </Link>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-foreground">{item.product.brand}</h3>
                <p className="text-xs text-muted-foreground">{item.product.title}</p>
                <p className="text-xs text-muted-foreground mt-1">Size: {item.size}</p>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-bold text-foreground">Rs. {item.product.price}</span>
                  <span className="text-xs text-muted-foreground line-through">Rs. {item.product.originalPrice}</span>
                  <span className="text-xs font-semibold text-myntra-discount">{item.product.discount}% OFF</span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 border border-border rounded-sm">
                    <button onClick={() => item.quantity > 1 ? dispatch({ type: "UPDATE_QTY", productId: item.product.id, size: item.size, quantity: item.quantity - 1 }) : null}
                      className="p-1 hover:bg-muted transition-colors" disabled={item.quantity <= 1}>
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => dispatch({ type: "UPDATE_QTY", productId: item.product.id, size: item.size, quantity: item.quantity + 1 })}
                      className="p-1 hover:bg-muted transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => dispatch({ type: "REMOVE", productId: item.product.id, size: item.size })}
                    className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="border border-border rounded-sm p-4 h-fit sticky top-[72px]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Price Details ({items.length} Item{items.length > 1 ? 's' : ''})</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-foreground">Total MRP</span><span className="text-foreground">Rs. {totalMRP}</span></div>
            <div className="flex justify-between"><span className="text-foreground">Discount on MRP</span><span className="text-myntra-success">-Rs. {totalDiscount}</span></div>
            <div className="flex justify-between"><span className="text-foreground">Delivery Fee</span><span className={deliveryFee === 0 ? "text-myntra-success" : "text-foreground"}>{deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee}`}</span></div>
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between font-bold text-foreground">
            <span>Total Amount</span>
            <span>Rs. {totalAmount + deliveryFee}</span>
          </div>
          <Link to="/checkout"
            className="block mt-4 bg-primary text-primary-foreground text-center py-3 rounded-sm font-bold text-sm hover:opacity-90 transition-opacity">
            PLACE ORDER
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
