import { Product } from "../types/product";
import { Pencil, Trash2 } from "lucide-react";

export default function ProductCard({ product, onEdit, onDelete }: { product: Product; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-3" />}
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-green-600 font-bold">${product.price}</p>
      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{product.description}</p>
      <div className="flex justify-end gap-2 mt-3">
        <button onClick={onEdit} className="text-blue-600"><Pencil size={18} /></button>
        <button onClick={onDelete} className="text-red-600"><Trash2 size={18} /></button>
      </div>
    </div>
  );
}