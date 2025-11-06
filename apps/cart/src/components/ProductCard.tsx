import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className='bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200'>
      <div className='text-6xl text-center mb-4'>{product.image}</div>

      <div className='space-y-3'>
        <h3 className='text-xl font-semibold text-gray-900'>{product.name}</h3>
        <p className='text-gray-600 text-sm leading-relaxed'>{product.description}</p>
        <div className='text-2xl font-bold text-green-600'>₩{formatPrice(product.price)}</div>
      </div>

      <button
        className='w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 active:transform active:scale-95'
        onClick={() => onAddToCart(product)}
      >
        장바구니 담기
      </button>
    </div>
  );
}

export default ProductCard;
