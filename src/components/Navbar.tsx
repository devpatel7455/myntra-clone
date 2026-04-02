import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { label: "Men", href: "/men", megaItems: ["T-Shirts", "Shirts", "Jeans", "Trousers", "Sports Shoes", "Casual Shoes", "Sweatshirts", "Watches"] },
  { label: "Women", href: "/women", megaItems: ["Kurtas", "Dresses", "Tops", "Jeans", "Sarees", "Heels", "Bags", "Jewellery", "Palazzos"] },
  { label: "Kids", href: "/kids", megaItems: ["T-Shirts", "Shorts", "Dresses", "Sports Shoes", "Nightwear", "Jackets"] },
  { label: "Home & Living", href: "/products", megaItems: [] },
  { label: "Beauty", href: "/products", megaItems: [] },
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { state: cart } = useCart();
  const { items: wishlist } = useWishlist();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const cartCount = cart.items.reduce((a, i) => a + i.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleMouseEnter = (label: string) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  };

  return (
    <header className="sticky top-0 z-50 bg-background myntra-shadow">
      <div className="max-w-[1280px] mx-auto px-4 h-[56px] flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <span className="text-xl font-bold tracking-tight text-primary font-playfair">Myntra</span>
        </Link>

        {/* Nav Links - Desktop */}
        <nav className="hidden lg:flex items-center gap-0 ml-4">
          {navLinks.map(link => (
            <div key={link.label} className="relative" onMouseEnter={() => handleMouseEnter(link.label)} onMouseLeave={handleMouseLeave}>
              <Link
                to={link.href}
                className="px-3 py-4 text-sm font-semibold uppercase tracking-wider text-foreground hover:border-b-[3px] hover:border-primary transition-all"
              >
                {link.label}
              </Link>
              {/* Mega menu */}
              {activeMenu === link.label && link.megaItems.length > 0 && (
                <div className="absolute top-full left-0 bg-background myntra-shadow-hover border border-border p-6 min-w-[250px] animate-fade-in z-50">
                  <div className="grid gap-2">
                    {link.megaItems.map(item => (
                      <Link
                        key={item}
                        to={`${link.href}?category=${encodeURIComponent(item)}`}
                        className="text-sm text-foreground hover:text-primary hover:font-semibold py-1 transition-colors"
                        onClick={() => setActiveMenu(null)}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-[550px] ml-auto hidden sm:block">
          <div className="flex items-center bg-secondary rounded-sm px-3 py-[6px]">
            <Search size={16} className="text-muted-foreground mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm w-full outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </form>

        {/* Action Icons */}
        <div className="flex items-center gap-5 ml-4">
          <Link to="/login" className="hidden sm:flex flex-col items-center text-foreground hover:text-primary transition-colors">
            <User size={18} strokeWidth={1.8} />
            <span className="text-[10px] font-semibold mt-[2px]">Profile</span>
          </Link>
          <Link to="/wishlist" className="relative flex flex-col items-center text-foreground hover:text-primary transition-colors">
            <Heart size={18} strokeWidth={1.8} />
            <span className="text-[10px] font-semibold mt-[2px] hidden sm:block">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative flex flex-col items-center text-foreground hover:text-primary transition-colors">
            <ShoppingBag size={18} strokeWidth={1.8} />
            <span className="text-[10px] font-semibold mt-[2px] hidden sm:block">Bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-slide-in">
          <form onSubmit={handleSearch} className="px-4 py-3 sm:hidden">
            <div className="flex items-center bg-secondary rounded-sm px-3 py-2">
              <Search size={16} className="text-muted-foreground mr-2" />
              <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="bg-transparent text-sm w-full outline-none" />
            </div>
          </form>
          {navLinks.map(link => (
            <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm font-semibold uppercase border-b border-border text-foreground hover:text-primary">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
