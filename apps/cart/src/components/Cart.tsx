import CartSummary from './CartSummary';
import type { CartItem as CartItemType } from '../types';
import CartItems from './CartItems';

const mockCartItems: CartItemType[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 1290000,
    image: '📱',
    description: '최신 iPhone 15 Pro 모델',
    category: 'smartphone',
    quantity: 1,
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 329000,
    image: '🎧',
    description: '노이즈 캔슬링 이어폰',
    category: 'accessory',
    quantity: 2,
  },
];

function Cart() {
  const handleUpdateQuantity = (id: number, quantity: number) => {
    console.log('Update quantity:', id, quantity);
  };

  const handleRemoveItem = (id: number) => {
    console.log('Remove item:', id);
  };

  const handleClearCart = () => {
    console.log('Clear cart');
  };

  const totalPrice = mockCartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (mockCartItems.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-96'>
        <div className='text-center'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>장바구니가 비어있습니다</h2>
          <p className='text-gray-600'>상품을 추가해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
        <h2 className='text-3xl font-bold text-gray-900'>장바구니 ({mockCartItems.length}개 상품)</h2>
        <button
          className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors'
          onClick={handleClearCart}
        >
          전체 삭제
        </button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-4'>
          {mockCartItems.map(item => (
            <CartItems key={item.id} item={item} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveItem} />
          ))}
        </div>

        <div className='lg:col-span-1'>
          <CartSummary items={mockCartItems} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
