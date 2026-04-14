import { motion, AnimatePresence } from "motion/react";
import { Heart, Bed, Bath, Maximize, MapPin, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useWishlist } from "../../context/WishlistContext";
import { allProperties } from "../../data/properties";
import { toast } from "sonner";

export function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  // Resolve wishlist IDs to full property objects
  const wishlistProperties = allProperties.filter((p) => wishlist.includes(p.id));

  const handleRemove = (id: string, title: string) => {
    removeFromWishlist(id);
    toast.success(`"${title}" removed from wishlist.`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl mb-2 dark:text-white">My Wishlist</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {wishlistProperties.length > 0
            ? `${wishlistProperties.length} properties saved`
            : "Properties you've saved for later"}
        </p>
      </motion.div>

      {wishlistProperties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-16 text-center"
        >
          <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl mb-2 dark:text-white">No saved properties yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start exploring and save your favorite properties
          </p>
          <Link
            to="/listings"
            className="inline-block px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
          >
            Browse Properties
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {wishlistProperties.map((property, index) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm group"
              >
                <div className="relative h-56">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={() => handleRemove(property.id, property.title)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-amber-600 text-white rounded-full text-sm">
                    {property.price}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg mb-2 dark:text-white">{property.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4" />
                      <span className="text-sm">{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4" />
                      <span className="text-sm">{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-4 h-4" />
                      <span className="text-sm">{property.area} sqft</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/property/${property.id}`}
                      className="flex-1 text-center px-4 py-2.5 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors text-sm font-medium"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleRemove(property.id, property.title)}
                      className="px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
