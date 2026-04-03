"use client";
import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useDarkMode } from "./hooks/useDarkMode";
import { Product } from "./types/product";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import DarkModeToggle from "./components/DarkModeToggle";
import toast from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useLocalStorage<Product[]>("products", []);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDark, toggleDark] = useDarkMode();

  const addOrUpdateProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...productData }
            : p
        )
      );
      setEditingProduct(null);
    } else {
      const newProduct: Product = {
        ...productData,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Product Manager</h1>
          <DarkModeToggle isDark={isDark} toggle={() => toggleDark(!isDark)} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ProductForm
            initialProduct={editingProduct || undefined}
            onSubmit={addOrUpdateProduct}
            onCancel={() => setEditingProduct(null)}
          />
          <div className="space-y-4">
            <SearchBar value={search} onChange={setSearch} />
            <ProductList
              products={filteredProducts}
              onEdit={setEditingProduct}
              onDelete={deleteProduct}
            />
          </div>
        </div>
      </div>
    </main>
  );
}