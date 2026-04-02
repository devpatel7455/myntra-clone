import { Link } from "react-router-dom";
import Banner from "@/components/Banner";
import ProductGrid from "@/components/ProductGrid";
import { products, categoryCards } from "@/data/products";

const Index = () => {
  const trending = products.filter(p => p.rating >= 4.2).slice(0, 10);

  return (
    <div>
      {/* Banner Carousel */}
      <Banner />

      {/* Category Cards */}
      <section className="max-w-[1280px] mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-foreground mb-6 text-center uppercase tracking-wider">
          Shop By Category
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {categoryCards.map(cat => (
            <Link key={cat.title} to={cat.link} className="group text-center">
              <div className="overflow-hidden rounded-full aspect-square mb-2 mx-auto w-[100px] sm:w-[120px]">
                <img src={cat.image} alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-foreground">{cat.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals Banner */}
      <section className="bg-myntra-light-gray py-8">
        <div className="max-w-[1280px] mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-playfair text-foreground">DEALS OF THE DAY</h2>
          <p className="text-sm text-muted-foreground mt-1">Up to 80% Off on Top Brands</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Men's Clothing", discount: "40-80% OFF", img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=300&h=200&fit=crop", link: "/men" },
              { label: "Women's Ethnic", discount: "50-70% OFF", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=200&fit=crop", link: "/women" },
              { label: "Footwear", discount: "40-60% OFF", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop", link: "/products?category=Sports+Shoes" },
              { label: "Kids' Wear", discount: "50-80% OFF", img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=300&h=200&fit=crop", link: "/kids" },
            ].map(deal => (
              <Link key={deal.label} to={deal.link} className="bg-background rounded-sm overflow-hidden group myntra-shadow hover:myntra-shadow-hover transition-shadow">
                <img src={deal.img} alt={deal.label} className="w-full h-[120px] sm:h-[160px] object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="p-3">
                  <p className="text-sm font-bold text-foreground">{deal.label}</p>
                  <p className="text-xs font-semibold text-primary">{deal.discount}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-[1280px] mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-foreground mb-6 text-center uppercase tracking-wider">
          Trending Now
        </h2>
        <ProductGrid products={trending} />
      </section>
    </div>
  );
};

export default Index;
