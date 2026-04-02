import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { CheckCircle } from "lucide-react";

const Checkout = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"address" | "payment" | "success">("address");
  const [address, setAddress] = useState({ name: "", phone: "", pincode: "", address: "", city: "", state: "" });

  const totalAmount = state.items.reduce((a, i) => a + i.product.price * i.quantity, 0);

  if (state.items.length === 0 && step !== "success") {
    navigate("/cart");
    return null;
  }

  const handlePlaceOrder = () => {
    dispatch({ type: "CLEAR" });
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
        <CheckCircle size={64} className="mx-auto text-myntra-success mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Order Placed Successfully!</h2>
        <p className="text-sm text-muted-foreground mb-6">Your order has been placed and will be delivered in 3-5 business days.</p>
        <button onClick={() => navigate("/")} className="bg-primary text-primary-foreground px-8 py-3 rounded-sm font-bold text-sm hover:opacity-90 transition-opacity">
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 py-6">
      {/* Steps */}
      <div className="flex items-center gap-4 mb-8">
        {["BAG", "ADDRESS", "PAYMENT"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i <= (step === "address" ? 1 : 2) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {i + 1}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">{s}</span>
            {i < 2 && <div className="w-8 h-[1px] bg-border" />}
          </div>
        ))}
      </div>

      {step === "address" && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Delivery Address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "name", label: "Full Name", type: "text" },
              { key: "phone", label: "Mobile Number", type: "tel" },
              { key: "pincode", label: "Pincode", type: "text" },
              { key: "city", label: "City", type: "text" },
              { key: "state", label: "State", type: "text" },
            ].map(field => (
              <div key={field.key}>
                <label className="text-xs font-semibold text-muted-foreground">{field.label}</label>
                <input type={field.type} value={address[field.key as keyof typeof address]}
                  onChange={e => setAddress({ ...address, [field.key]: e.target.value })}
                  className="w-full border border-border rounded-sm px-3 py-2 text-sm mt-1 outline-none focus:border-primary" />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground">Address</label>
              <textarea value={address.address} onChange={e => setAddress({ ...address, address: e.target.value })}
                className="w-full border border-border rounded-sm px-3 py-2 text-sm mt-1 outline-none focus:border-primary" rows={3} />
            </div>
          </div>
          <button onClick={() => setStep("payment")}
            className="mt-6 bg-primary text-primary-foreground px-8 py-3 rounded-sm font-bold text-sm hover:opacity-90 transition-opacity">
            CONTINUE TO PAYMENT
          </button>
        </div>
      )}

      {step === "payment" && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4">Payment Method</h2>
          <div className="space-y-3 border border-border rounded-sm p-4">
            {["Cash on Delivery", "Credit / Debit Card", "UPI", "Net Banking"].map(method => (
              <label key={method} className="flex items-center gap-3 p-3 border border-border rounded-sm cursor-pointer hover:border-primary transition-colors">
                <input type="radio" name="payment" className="accent-primary" defaultChecked={method === "Cash on Delivery"} />
                <span className="text-sm font-semibold text-foreground">{method}</span>
              </label>
            ))}
          </div>
          <div className="border border-border rounded-sm p-4 mt-4">
            <h3 className="text-xs font-bold uppercase text-muted-foreground mb-2">Order Summary</h3>
            <div className="flex justify-between text-sm font-bold text-foreground">
              <span>Total</span>
              <span>Rs. {totalAmount}</span>
            </div>
          </div>
          <button onClick={handlePlaceOrder}
            className="mt-6 bg-primary text-primary-foreground px-8 py-3 rounded-sm font-bold text-sm hover:opacity-90 transition-opacity">
            PLACE ORDER
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
