import { motion, AnimatePresence } from "motion/react";
import { Plus, Edit, Trash2, Eye, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";

interface Listing {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  status: "active" | "pending" | "sold";
  views: number;
}

const initialProperties: Listing[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1706855203772-c249b75fe016?w=400&h=300&fit=crop",
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: "$1,250,000",
    status: "active",
    views: 342,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1757264119016-7e6b568b810d?w=400&h=300&fit=crop",
    title: "Oceanfront Villa",
    location: "Miami Beach, FL",
    price: "$1,850,000",
    status: "active",
    views: 521,
  },
];

const statusColors: Record<string, string> = {
  active: "bg-emerald-500",
  pending: "bg-amber-500",
  sold: "bg-gray-400",
};

export function MyProperties() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>(
    user?.role === "seller" ? initialProperties : []
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ title: "", location: "", price: "", description: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.price) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const newListing: Listing = {
      id: Date.now().toString(),
      image: "https://images.unsplash.com/photo-1706808849827-7366c098b317?w=400&h=300&fit=crop",
      title: form.title,
      location: form.location,
      price: form.price.startsWith("$") ? form.price : `$${form.price}`,
      status: "pending",
      views: 0,
    };
    setListings((prev) => [newListing, ...prev]);
    setForm({ title: "", location: "", price: "", description: "" });
    setShowAddModal(false);
    toast.success(`"${newListing.title}" listed successfully!`);
  };

  const handleDelete = (id: string, title: string) => {
    setListings((prev) => prev.filter((p) => p.id !== id));
    toast.success(`"${title}" removed from listings.`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl mb-2 dark:text-white">My Properties</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {listings.length} active listing{listings.length !== 1 ? "s" : ""}
          </p>
        </div>
        {user?.role === "seller" && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg shadow-amber-500/30"
          >
            <Plus className="w-5 h-5" />
            <span>Add Property</span>
          </motion.button>
        )}
      </motion.div>

      {listings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-16 text-center"
        >
          <Plus className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl mb-2 dark:text-white">
            {user?.role === "seller" ? "No listings yet" : "No properties to manage"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {user?.role === "seller"
              ? "Add your first property listing to get started."
              : "As a buyer, you can save properties to your wishlist instead."}
          </p>
          {user?.role === "seller" ? (
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Your First Property
            </button>
          ) : (
            <Link
              to="/listings"
              className="inline-block px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
            >
              Browse Properties
            </Link>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {listings.map((property, index) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="relative h-48">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                  <div className={`absolute top-4 right-4 px-3 py-1.5 ${statusColors[property.status]} text-white text-sm rounded-full capitalize`}>
                    {property.status}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg mb-1 dark:text-white">{property.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{property.location}</p>
                  <p className="text-2xl text-amber-600 mb-4">{property.price}</p>

                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span>{property.views} views</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(property.id, property.title)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add Property Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl dark:text-white">Add New Property</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 dark:text-white" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block mb-2 dark:text-white">Property Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Modern Luxury Villa"
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 dark:text-white">Price <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={form.price}
                      onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                      placeholder="$1,250,000"
                      required
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 dark:text-white">Location <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      placeholder="Beverly Hills, CA"
                      required
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 dark:text-white">Description</label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Describe your property..."
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors font-medium"
                  >
                    Add Property
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
