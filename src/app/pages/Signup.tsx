import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, User, ArrowRight, Building2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await signup(name, email, password, role);
      toast.success(`Welcome to LuxeEstate! ${role === "buyer" ? "Start exploring properties." : "Set up your listings in the dashboard."}`);
      // Buyers go to listings to start browsing; sellers go to dashboard to manage listings
      navigate(role === "buyer" ? "/listings" : "/dashboard");
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-emerald-700 to-amber-600 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1706855203772-c249b75fe016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Luxury property"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Building2 className="w-7 h-7" />
              </div>
              <span className="text-3xl tracking-tight">LuxeEstate</span>
            </div>
            <h1 className="text-5xl mb-6 leading-tight">
              Start Your Real Estate Journey Today
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of satisfied clients who've found their dream homes through our platform.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex items-center justify-center px-6 py-12 bg-white dark:bg-gray-900"
      >
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl tracking-tight dark:text-white">LuxeEstate</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-3xl mb-2 dark:text-white">Create Account</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sign up to get started with your real estate journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 dark:text-white">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-800 dark:text-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 dark:text-white">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-800 dark:text-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 dark:text-white">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-800 dark:text-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 dark:text-white">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-800 dark:text-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-3 dark:text-white">I am a:</label>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setRole("buyer")}
                    className={`py-3 rounded-xl border-2 transition-all ${
                      role === "buyer"
                        ? "border-amber-600 bg-amber-50 dark:bg-amber-900/20 text-amber-600"
                        : "border-gray-200 dark:border-gray-700 dark:text-white hover:border-amber-300"
                    }`}
                  >
                    Buyer
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setRole("seller")}
                    className={`py-3 rounded-xl border-2 transition-all ${
                      role === "seller"
                        ? "border-amber-600 bg-amber-50 dark:bg-amber-900/20 text-amber-600"
                        : "border-gray-200 dark:border-gray-700 dark:text-white hover:border-amber-300"
                    }`}
                  >
                    Seller / Agent
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-emerald-600 text-white py-3.5 rounded-xl hover:from-amber-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="text-amber-600 hover:text-amber-700">
                  Sign In
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <Link
                to="/"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 flex items-center justify-center gap-2"
              >
                ← Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
