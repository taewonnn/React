import type { CartItem } from '../types';

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

function CartItems({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className='bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow'>
      <div className='flex flex-col md:flex-row items-start md:items-center gap-4'>
        <div className='text-5xl'>{item.image}</div>

        <div className='flex-1 min-w-0'>
          <h3 className='text-lg font-semibold text-gray-900 mb-1'>{item.name}</h3>
          <p className='text-gray-600 text-sm mb-2'>{item.description}</p>
          <div className='text-lg font-medium text-gray-900'>₩{formatPrice(item.price)}</div>
        </div>

        <div className='flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto'>
          <div className='flex items-center gap-3'>
            <button
              className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors'
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              -
            </button>
            <span className='w-12 text-center font-medium'>{item.quantity}</span>
            <button
              className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors'
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              +
            </button>
          </div>

          <div className='text-xl font-bold text-green-600 min-w-0'>₩{formatPrice(item.price * item.quantity)}</div>

          <button
            className='px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors'
            onClick={() => onRemove(item.id)}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
