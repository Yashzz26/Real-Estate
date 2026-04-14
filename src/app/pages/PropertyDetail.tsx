import { useParams } from "react-router";
import { motion } from "motion/react";
import { MapPin, Bed, Bath, Maximize, Calendar, Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { allProperties } from "../data/properties";
import { toast } from "sonner";

export function PropertyDetail() {
  const { id } = useParams();
  const property = allProperties.find(p => p.id === id) || allProperties[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Inquiry sent successfully! An agent will contact you soon.");
    }, 1500);
  };

  return (
    <div className="pt-20">
      <section className="py-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/listings" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-amber-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Listings
          </Link>
        </div>
      </section>

      <section className="pb-16 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4"
              >
                <img
                  src={property.images[selectedImage] || property.image}
                  alt={property.title}
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl"
                />
              </motion.div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {(property.images.length > 0 ? property.images : [property.image]).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 md:h-32 rounded-xl overflow-hidden ${
                      selectedImage === index ? "ring-4 ring-amber-600" : ""
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm mb-8">
                <h1 className="text-4xl mb-4 text-gray-900 dark:text-white">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <Bed className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-2xl mb-1 dark:text-white">{property.beds}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</p>
                  </div>
                  <div className="text-center">
                    <Bath className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-2xl mb-1 dark:text-white">{property.baths}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <Maximize className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-2xl mb-1 dark:text-white">{property.area}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sq Ft</p>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-2xl mb-1 dark:text-white">{property.year}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Year Built</p>
                  </div>
                </div>

                <div className="pt-6">
                  <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Description</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{property.description}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl mb-6 text-gray-900 dark:text-white">Features & Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm sticky top-28 border border-gray-100 dark:border-gray-700">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Price</p>
                  <p className="text-4xl text-amber-600 font-bold">{property.price}</p>
                </div>

                <form onSubmit={handleInquiry} className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm mb-2 dark:text-white">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 dark:text-white">Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 dark:text-white">Message</label>
                    <textarea
                      rows={4}
                      placeholder="I'm interested in this property..."
                      required
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-600 text-white py-3 rounded-xl hover:bg-amber-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Contact Agent"
                    )}
                  </button>
                </form>

                <button 
                  onClick={() => toast.success("Tour request sent! We will contact you to confirm the time.")}
                  className="w-full border-2 border-amber-600 text-amber-600 py-3 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors font-medium"
                >
                  Schedule Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
