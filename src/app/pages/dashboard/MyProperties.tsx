import { motion, AnimatePresence } from "motion/react";
import { Plus, Edit, Trash2, Eye, X, MapPin, Home, Maximize, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { useProperties } from "../../context/PropertyContext";
import { Property } from "../../data/properties";
import { Link } from "react-router";

const statusColors: Record<string, string> = {
  active: "bg-emerald-500",
  pending: "bg-amber-500",
  sold: "bg-gray-400",
};

export function MyProperties() {
  const { user } = useAuth();
  const { properties, addProperty, updateProperty, deleteProperty } = useProperties();
  const [showModal, setShowModal] = useState<"add" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const initialFormState: Omit<Property, "id"> = {
    image: "",
    images: [],
    title: "",
    location: "",
    price: "",
    type: "House",
    beds: 0,
    baths: 0,
    area: 0,
    year: new Date().getFullYear(),
    description: "",
    features: [],
    status: "active",
    views: 0,
  };

  const [form, setForm] = useState<Omit<Property, "id">>(initialFormState);

  const myProperties = properties.filter(p => user?.role === "seller" ? true : false); // In a real app, we'd filter by seller ID

  const handleOpenAdd = () => {
    setForm(initialFormState);
    setShowModal("add");
  };

  const handleOpenEdit = (property: Property) => {
    setForm({ ...property });
    setEditingId(property.id);
    setShowModal("edit");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.price || !form.image) {
      toast.error("Please fill in all required fields including a main image URL.");
      return;
    }

    if (showModal === "add") {
      addProperty(form);
      toast.success(`"${form.title}" listed successfully!`);
    } else if (showModal === "edit" && editingId) {
      updateProperty(editingId, form);
      toast.success(`"${form.title}" updated successfully!`);
    }

    setShowModal(null);
    setEditingId(null);
    setForm(initialFormState);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProperty(id);
      toast.success(`"${title}" removed from listings.`);
    }
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
            {myProperties.length} listing{myProperties.length !== 1 ? "s" : ""}
          </p>
        </div>
        {user?.role === "seller" && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg shadow-amber-500/30"
          >
            <Plus className="w-5 h-5" />
            <span>Add Property</span>
          </motion.button>
        )}
      </motion.div>

      {myProperties.length === 0 ? (
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
              onClick={handleOpenAdd}
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
            {myProperties.map((property, index) => (
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
                  <div className={`absolute top-4 right-4 px-3 py-1.5 ${statusColors[property.status || "active"]} text-white text-sm rounded-full capitalize`}>
                    {property.status || "active"}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg mb-1 dark:text-white">{property.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{property.location}</p>
                  <p className="text-2xl text-amber-600 mb-4">{property.price}</p>

                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <Eye className="w-4 h-4" />
                    <span>{property.views || 0} views</span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenEdit(property)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                    >
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

      {/* Property Modal (Add/Edit) */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold dark:text-white">
                  {showModal === "add" ? "Add New Property" : "Edit Property"}
                </h2>
                <button
                  onClick={() => setShowModal(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 dark:text-white" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-white">Property Title <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                        placeholder="Modern Luxury Villa"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-white">Location <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                        placeholder="Beverly Hills, CA"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-white">Price ($) <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={form.price}
                      onChange={(e) => setForm((f) => ({ ...f, price: e.target.value.startsWith("$") ? e.target.value : `$${e.target.value}` }))}
                      placeholder="$1,250,000"
                      required
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-white">Property Type</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all appearance-none"
                    >
                      <option>House</option>
                      <option>Villa</option>
                      <option>Apartment</option>
                      <option>Penthouse</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-white">Beds</label>
                    <input
                      type="number"
                      value={form.beds}
                      onChange={(e) => setForm((f) => ({ ...f, beds: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-white">Baths</label>
                    <input
                      type="number"
                      value={form.baths}
                      onChange={(e) => setForm((f) => ({ ...f, baths: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-white">Sq Ft</label>
                    <input
                      type="number"
                      value={form.area}
                      onChange={(e) => setForm((f) => ({ ...f, area: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-white">Year</label>
                    <input
                      type="number"
                      value={form.year}
                      onChange={(e) => setForm((f) => ({ ...f, year: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-white">Main Image URL <span className="text-red-500">*</span></label>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    required
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-white">Description</label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="Describe your property..."
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white resize-none transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(null)}
                    className="flex-1 px-6 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all font-medium shadow-lg shadow-amber-500/30"
                  >
                    {showModal === "add" ? "List Property" : "Save Changes"}
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
