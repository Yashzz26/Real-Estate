import { createContext, useContext, useState, ReactNode } from "react";

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const addToWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = [...prev, id];
      localStorage.setItem("wishlist", JSON.stringify(next));
      return next;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = prev.filter((item) => item !== id);
      localStorage.setItem("wishlist", JSON.stringify(next));
      return next;
    });
  };

  const isInWishlist = (id: string) => {
    return wishlist.includes(id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
