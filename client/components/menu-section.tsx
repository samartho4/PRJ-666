"use client";

import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/apiService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export default function MenuSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  return (
    <section id="menu" className="py-16 bg-amber-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Menu</h2>
          <p className="text-amber-700 max-w-2xl mx-auto">
            Explore our carefully curated selection of premium coffees.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name || "Product Image"}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-amber-900">{item.name}</h3>
                  <span className="font-medium text-amber-800">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-amber-700 text-sm mb-4">{item.description}</p>
                <Button className="w-full bg-amber-800 hover:bg-amber-900 text-white">
                  Add to Order
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
