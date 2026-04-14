import { Search, MapPin, Home, DollarSign } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function SearchBar() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Property Type");
  const [price, setPrice] = useState("Price Range");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type !== "Property Type") params.set("type", type.toLowerCase());
    if (price !== "Price Range") params.set("price", price);
    
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto border border-white/20"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white transition-all"
          />
        </div>

        <div className="relative">
          <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 dark:text-white transition-all"
          >
            <option>Property Type</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>House</option>
          </select>
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 dark:text-white transition-all"
          >
            <option>Price Range</option>
            <option>Under $500k</option>
            <option>$500k - $1M</option>
            <option>$1M - $2M</option>
            <option>Above $2M</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all flex items-center justify-center gap-2 py-3.5 shadow-lg shadow-amber-500/30"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
