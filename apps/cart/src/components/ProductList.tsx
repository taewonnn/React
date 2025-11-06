import type { Product } from '../types';
import ProductCard from './ProductCard';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 1290000,
    image: '📱',
    description: '최신 iPhone 15 Pro 모델',
    category: 'smartphone',
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    price: 1590000,
    image: '💻',
    description: 'Apple M2 칩셋 탑재',
    category: 'laptop',
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 329000,
    image: '🎧',
    description: '노이즈 캔슬링 이어폰',
    category: 'accessory',
  },
  {
    id: 4,
    name: 'iPad Pro',
    price: 1490000,
    image: '📱',
    description: 'M2 칩셋 iPad Pro',
    category: 'tablet',
  },
  {
    id: 5,
    name: 'iPhone 14',
    price: 120000,
    image: '📱',
    description: 'iphone 14 모델',
    category: 'phone',
  },
  {
    id: 6,
    name: 'iPhone 13',
    price: 100000,
    image: '📱',
    description: 'iphone 13 모델',
    category: 'phone',
  },
];

function ProductList() {
  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product);
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
        <h2 className='text-3xl font-bold text-gray-900'>상품 목록</h2>

        <div className='flex gap-4 w-full md:w-auto'>
          <select className='px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value=''>전체 카테고리</option>
            <option value='smartphone'>스마트폰</option>
            <option value='laptop'>노트북</option>
            <option value='accessory'>액세서리</option>
            <option value='tablet'>태블릿</option>
          </select>

          <select className='px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
            <option value='price-asc'>가격 낮은순</option>
            <option value='price-desc'>가격 높은순</option>
            <option value='name'>이름순</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {mockProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
