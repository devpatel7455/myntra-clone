import { Link } from "react-router-dom";

const footerSections = [
  { title: "ONLINE SHOPPING", links: [{ label: "Men", to: "/men" }, { label: "Women", to: "/women" }, { label: "Kids", to: "/kids" }, { label: "Home & Living", to: "/products" }] },
  { title: "USEFUL LINKS", links: [{ label: "Contact Us", to: "#" }, { label: "FAQ", to: "#" }, { label: "T&C", to: "#" }, { label: "Track Orders", to: "#" }] },
  { title: "EXPERIENCE MYNTRA APP ON MOBILE", links: [{ label: "Google Play", to: "#" }, { label: "App Store", to: "#" }] },
];

const Footer = () => (
  <footer className="bg-secondary border-t border-border mt-8">
    <div className="max-w-[1280px] mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {footerSections.map(section => (
          <div key={section.title}>
            <h4 className="text-xs font-bold tracking-wider text-foreground mb-3">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map(link => (
                <li key={link.label}><Link to={link.to} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="text-xs font-bold tracking-wider text-foreground mb-3">KEEP IN TOUCH</h4>
          <p className="text-xs text-muted-foreground mb-2">We'd love to hear what you think!</p>
          <button className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-sm hover:opacity-90 transition-opacity">Feedback</button>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6">
        <p className="text-xs text-muted-foreground text-center">© 2026 www.myntra.com. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
