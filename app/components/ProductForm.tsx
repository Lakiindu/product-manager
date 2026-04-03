"use client";
import { useState, useEffect } from "react";
import { Product } from "../types/product";
import toast from "react-hot-toast";

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (product: Omit<Product, "id" | "createdAt">) => void;
  onCancel?: () => void;
}

export default function ProductForm({ initialProduct, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setPrice(initialProduct.price.toString());
      setDescription(initialProduct.description);
      setImageUrl(initialProduct.imageUrl);
    }
  }, [initialProduct]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Product name required";
    if (!price || isNaN(Number(price)) || Number(price) <= 0)
      newErrors.price = "Valid price > 0 required";
    if (!description.trim()) newErrors.description = "Description required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: name.trim(),
      price: Number(price),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
    });
    if (!initialProduct) {
      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
    }
    toast.success(initialProduct ? "Product updated" : "Product added");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold">{initialProduct ? "Edit Product" : "Add Product"}</h2>
      <div>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <input type="number" placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700" />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>
      <div>
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700" rows={3} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>
      <div>
        <input type="text" placeholder="Image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700" />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {initialProduct ? "Update" : "Add"} Product
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-gray-400 px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}