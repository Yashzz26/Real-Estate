import { motion } from "motion/react";
import { Building2, Heart, Eye, MessageSquare, TrendingUp, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";

const recentActivity = [
  { action: "Viewed", property: "Modern Luxury Villa", time: "2 hours ago", image: "https://images.unsplash.com/photo-1706855203772-c249b75fe016?w=100&h=100&fit=crop" },
  { action: "Saved", property: "Urban Penthouse", time: "5 hours ago", image: "https://images.unsplash.com/photo-1738168273959-952fdc961991?w=100&h=100&fit=crop" },
  { action: "Contacted", property: "Oceanfront Villa", time: "1 day ago", image: "https://images.unsplash.com/photo-1757264119016-7e6b568b810d?w=100&h=100&fit=crop" },
];

export function Dashboard() {
  const { user } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const firstName = user?.name?.split(" ")[0] || "there";

  const stats = [
    { label: "Saved Properties", value: wishlist.length.toString(), icon: Heart, color: "text-rose-600", bg: "bg-rose-100 dark:bg-rose-900/20", link: "/dashboard/wishlist" },
    { label: "Browse Listings", value: "9+", icon: Eye, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20", link: "/listings" },
    { label: "My Listings", value: user?.role === "seller" ? "2" : "—", icon: Building2, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/20", link: "/dashboard/properties" },
    { label: "Messages", value: "0", icon: MessageSquare, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/20", link: "/dashboard/messages" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl mb-2 dark:text-white">
          Welcome back, <span className="text-amber-600">{firstName}</span>!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {user?.role === "seller"
            ? "Here's an overview of your property listings and activity."
            : "Here's what's happening with your saved properties."}
        </p>
      </motion.div>

      {/* Quick search bar for buyers */}
      {user?.role === "buyer" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 bg-gradient-to-r from-amber-500 to-amber-700 rounded-2xl p-6 text-white"
        >
          <p className="text-lg mb-3 font-medium">Find your dream property</p>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Search by location, type..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = (e.target as HTMLInputElement).value;
                    navigate(`/listings?location=${encodeURIComponent(val)}`);
                  }
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button
              onClick={() => navigate("/listings")}
              className="px-5 py-2.5 bg-white text-amber-600 rounded-xl hover:bg-amber-50 transition-colors font-medium"
            >
              Browse All
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(stat.link)}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-3xl mb-1 dark:text-white">{stat.value}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl dark:text-white">Recent Activity</h2>
            <Link to="/dashboard/properties" className="text-amber-600 hover:text-amber-700 text-sm">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <img src={activity.image} alt={activity.property} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="dark:text-white">
                    <span className="text-amber-600 font-medium">{activity.action}</span>{" "}
                    {activity.property}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl p-6 text-white shadow-lg"
        >
          <TrendingUp className="w-10 h-10 mb-4" />
          <h3 className="text-xl mb-2">
            {user?.role === "seller" ? "Grow Your Listings" : "Property Market Insights"}
          </h3>
          <p className="text-white/90 mb-6 leading-relaxed">
            {user?.role === "seller"
              ? "Add new listings and reach thousands of potential buyers today."
              : "Get personalized recommendations based on your preferences and market trends."}
          </p>
          <Link
            to={user?.role === "seller" ? "/dashboard/properties" : "/listings"}
            className="block w-full text-center bg-white text-amber-600 py-2.5 rounded-xl hover:bg-amber-50 transition-colors font-medium"
          >
            {user?.role === "seller" ? "Add a Listing" : "Explore Properties"}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
