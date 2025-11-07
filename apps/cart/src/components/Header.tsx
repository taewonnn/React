import { useCartStore } from '../../stores/cartStore';
import type { ViewType } from '../types';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

function Header({ currentView, onViewChange }: HeaderProps) {
  const { products } = useCartStore();

  return (
    <header className='bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 py-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-gray-900'>🛒 ShopCart</h1>

          <nav className='flex gap-4'>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => onViewChange('products')}
            >
              상품 목록
            </button>

            <button
              className={`relative px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'cart' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => onViewChange('cart')}
            >
              장바구니
              {products.length > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  {products.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
