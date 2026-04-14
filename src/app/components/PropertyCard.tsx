import { Link } from "react-router";
import { Bed, Bath, Maximize, MapPin, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "sonner";

interface PropertyCardProps {
  id: string;
  image: string;
  price: string;
  title: string;
  location: string;
  type: string;
  beds: number;
  baths: number;
  area: number;
}

export function PropertyCard({ id, image, price, title, location, type, beds, baths, area }: PropertyCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(id);
      toast.success(`"${title}" removed from wishlist.`);
    } else {
      addToWishlist(id);
      toast.success(`"${title}" saved to wishlist!`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/property/${id}`} className="block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-sm">
            {type}
          </div>
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-amber-600 text-white rounded-full">
            {price}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className="absolute bottom-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </motion.button>
        </div>

        <div className="p-6">
          <h3 className="text-xl mb-2 dark:text-white">{title}</h3>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Bed className="w-4 h-4" />
              <span className="text-sm">{beds}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Bath className="w-4 h-4" />
              <span className="text-sm">{baths}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Maximize className="w-4 h-4" />
              <span className="text-sm">{area} sqft</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
