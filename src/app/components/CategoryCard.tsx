import { Link } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";

interface CategoryCardProps {
  image: string;
  title: string;
  count: number;
  type: string;
}

export function CategoryCard({ image, title, count, type }: CategoryCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      style={{
        transform: `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/listings?type=${type}`} className="block relative h-80 rounded-2xl overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-emerald-500/0 group-hover:from-amber-500/20 group-hover:to-emerald-500/20 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h3 className="text-3xl mb-2">{title}</h3>
          <p className="text-white/90">{count} Properties</p>
        </div>
      </Link>
    </motion.div>
  );
}
