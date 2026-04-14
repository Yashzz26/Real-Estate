import { useState, useEffect } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useSearchParams } from "react-router";
import { allProperties } from "../data/properties";

export function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "All");
  const [priceRange, setPriceRange] = useState(searchParams.get("price") || "All");
  const [beds, setBeds] = useState(searchParams.get("beds") || "All");
  const [baths, setBaths] = useState(searchParams.get("baths") || "All");

  useEffect(() => {
    const params: any = {};
    if (selectedType !== "All") params.type = selectedType;
    if (priceRange !== "All") params.price = priceRange;
    if (beds !== "All") params.beds = beds;
    if (baths !== "All") params.baths = baths;
    setSearchParams(params, { replace: true });
  }, [selectedType, priceRange, beds, baths]);

  const filteredProperties = allProperties.filter((property) => {
    // Type filter
    if (selectedType !== "All" && property.type.toLowerCase() !== selectedType.toLowerCase()) return false;
    
    // Price filter
    const priceNum = parseInt(property.price.replace(/[^0-9]/g, ""));
    if (priceRange === "Under $500k" && priceNum >= 500000) return false;
    if (priceRange === "$500k - $1M" && (priceNum < 500000 || priceNum > 1000000)) return false;
    if (priceRange === "$1M - $2M" && (priceNum < 1000000 || priceNum > 2000000)) return false;
    if (priceRange === "Above $2M" && priceNum <= 2000000) return false;

    // Beds filter
    if (beds !== "All") {
      const minBeds = parseInt(beds);
      if (property.beds < minBeds) return false;
    }

    // Baths filter
    if (baths !== "All") {
      const minBaths = parseInt(baths);
      if (property.baths < minBaths) return false;
    }

    return true;
  });

  return (
    <div className="pt-20">
      <section className="relative h-80 flex items-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1628744448839-a475cc0e90c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Properties"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl mb-4 text-white"
          >
            Premium Properties
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90"
          >
            Explore our curated collection of exceptional homes
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-80 flex-shrink-0"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm sticky top-28">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="w-5 h-5 dark:text-white" />
                  <h2 className="text-xl dark:text-white">Filters</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block mb-3 text-sm dark:text-white">Property Type</label>
                    <div className="space-y-2">
                      {["All", "Apartment", "Villa", "House"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                            selectedType === type
                              ? "bg-amber-600 text-white"
                              : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-3 text-sm dark:text-white">Price Range</label>
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option>All</option>
                      <option>Under $500k</option>
                      <option>$500k - $1M</option>
                      <option>$1M - $2M</option>
                      <option>Above $2M</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-3 text-sm dark:text-white">Bedrooms</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["All", "1", "2", "3", "4+"].map((val) => (
                        <button
                          key={val}
                          onClick={() => setBeds(val === "4+" ? "4" : val)}
                          className={`px-3 py-2 border rounded-lg transition-colors text-sm ${
                            (beds === val || (beds === "4" && val === "4+"))
                              ? "bg-amber-600 border-amber-600 text-white"
                              : "border-gray-200 dark:border-gray-700 dark:text-white hover:border-amber-600"
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-3 text-sm dark:text-white">Bathrooms</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["All", "1", "2", "3", "4+"].map((val) => (
                        <button
                          key={val}
                          onClick={() => setBaths(val === "4+" ? "4" : val)}
                          className={`px-3 py-2 border rounded-lg transition-colors text-sm ${
                            (baths === val || (baths === "4" && val === "4+"))
                              ? "bg-amber-600 border-amber-600 text-white"
                              : "border-gray-200 dark:border-gray-700 dark:text-white hover:border-amber-600"
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setSelectedType("All");
                      setPriceRange("All");
                      setBeds("All");
                      setBaths("All");
                    }}
                    className="w-full py-2 text-amber-600 text-sm font-medium hover:text-amber-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </motion.aside>

            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 flex items-center justify-between"
              >
                <p className="text-gray-600 dark:text-gray-400">
                  Showing <span className="font-medium text-gray-900 dark:text-white">{filteredProperties.length}</span> properties
                </p>
                <select className="px-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>Most Recent</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </motion.div>

              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProperties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <PropertyCard {...property} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No properties found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
