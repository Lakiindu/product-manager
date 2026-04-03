import { Product } from "../types/product";
import ProductCard from "./ProductCard";

export default function ProductList({ products, onEdit, onDelete }: { products: Product[]; onEdit: (p: Product) => void; onDelete: (id: string) => void }) {
  if (products.length === 0) return <p className="text-center text-gray-500">No products yet. Add one above ☝️</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={() => onEdit(product)} onDelete={() => onDelete(product.id)} />
      ))}
    </div>
  );
}