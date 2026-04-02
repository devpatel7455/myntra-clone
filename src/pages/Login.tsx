import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="max-w-[400px] mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold font-playfair text-primary">Myntra</h1>
        <p className="text-sm text-muted-foreground mt-2">{isLogin ? "Login to your account" : "Create a new account"}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
            <input type="text" required className="w-full border border-border rounded-sm px-3 py-2 text-sm mt-1 outline-none focus:border-primary" />
          </div>
        )}
        <div>
          <label className="text-xs font-semibold text-muted-foreground">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full border border-border rounded-sm px-3 py-2 text-sm mt-1 outline-none focus:border-primary" />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
            className="w-full border border-border rounded-sm px-3 py-2 text-sm mt-1 outline-none focus:border-primary" />
        </div>

        <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-sm font-bold text-sm hover:opacity-90 transition-opacity">
          {isLogin ? "LOGIN" : "SIGN UP"}
        </button>
      </form>

      <p className="text-sm text-center text-muted-foreground mt-6">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold hover:underline">
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>

      <p className="text-xs text-center text-muted-foreground mt-8">
        By continuing, I agree to the <Link to="#" className="text-primary">Terms of Use</Link> & <Link to="#" className="text-primary">Privacy Policy</Link>.
      </p>
    </div>
  );
};

export default Login;
