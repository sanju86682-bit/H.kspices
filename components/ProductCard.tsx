
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl border border-[#f4f3f0] hover:border-primary/30 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-[#f8f7f6]">
        {product.tag && (
          <div className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${product.tag === 'Best Seller' ? 'bg-red-500' : 'bg-primary'}`}>
            {product.tag}
          </div>
        )}
        <img 
          alt={product.name} 
          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
          src={product.image}
        />
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 right-3 bg-white size-10 rounded-full shadow-md text-text-main flex items-center justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:text-primary hover:bg-gray-50"
        >
          <span className="material-symbols-outlined">add_shopping_cart</span>
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-text-main text-lg group-hover:text-primary transition-colors">{product.name}</h3>
        </div>
        <p className="text-text-muted text-sm mb-4">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-xs text-text-muted block">{product.unit}</span>
            <span className="font-bold text-lg">₹{product.price}</span>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 rounded-lg bg-background-light text-text-main text-sm font-bold border border-transparent hover:border-primary hover:text-primary transition-all"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
