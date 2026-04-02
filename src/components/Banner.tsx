import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "@/data/products";

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % banners.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {banners.map(b => (
          <Link key={b.id} to={b.link} className="w-full flex-shrink-0 relative">
            <img src={b.image} alt={b.title} className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover" />
            <div className="absolute inset-0 bg-foreground/30 flex flex-col items-center justify-center text-primary-foreground">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-playfair tracking-wider">{b.title}</h2>
              <p className="text-lg sm:text-2xl font-semibold mt-2">{b.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
      <button onClick={() => setCurrent(p => (p - 1 + banners.length) % banners.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full hover:bg-background transition-colors">
        <ChevronLeft size={20} />
      </button>
      <button onClick={() => setCurrent(p => (p + 1) % banners.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 p-2 rounded-full hover:bg-background transition-colors">
        <ChevronRight size={20} />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary-foreground" : "bg-primary-foreground/50"}`} />
        ))}
      </div>
    </div>
  );
};

export default Banner;
