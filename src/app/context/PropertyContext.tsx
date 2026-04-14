import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Property, allProperties as initialProperties } from "../data/properties";

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, "id">) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  getProperty: (id: string) => Property | undefined;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem("app_properties");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved properties", e);
      }
    }
    return initialProperties;
  });

  useEffect(() => {
    localStorage.setItem("app_properties", JSON.stringify(properties));
  }, [properties]);

  const addProperty = (newProp: Omit<Property, "id">) => {
    const propertyWithId: Property = {
      ...newProp,
      id: Date.now().toString(),
    };
    setProperties((prev) => [propertyWithId, ...prev]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const getProperty = (id: string) => {
    return properties.find((p) => p.id === id);
  };

  return (
    <PropertyContext.Provider
      value={{ properties, addProperty, updateProperty, deleteProperty, getProperty }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  return context;
}
