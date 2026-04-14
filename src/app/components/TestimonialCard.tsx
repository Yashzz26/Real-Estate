import { Star } from "lucide-react";
import { motion } from "motion/react";

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
}

export function TestimonialCard({ name, role, image, text, rating }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-8 rounded-2xl shadow-sm"
    >
      <div className="flex items-center gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
        ))}
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed">{text}</p>
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h4>{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
