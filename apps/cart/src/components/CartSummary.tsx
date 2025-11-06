import type { CartItem } from '../types';

interface CartSummaryProps {
  items: CartItem[];
  totalPrice: number;
}

function CartSummary({ items, totalPrice }: CartSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const shippingFee = totalPrice >= 50000 ? 0 : 3000;
  const finalTotal = totalPrice + shippingFee;

  return (
    <div className='bg-white rounded-xl border border-gray-200 p-6 sticky top-4'>
      <h3 className='text-xl font-semibold text-gray-900 mb-6'>주문 요약</h3>

      <div className='space-y-4'>
        <div className='flex justify-between'>
          <span className='text-gray-600'>상품 개수</span>
          <span className='font-medium'>{totalItems}개</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-gray-600'>상품 금액</span>
          <span className='font-medium'>₩{formatPrice(totalPrice)}</span>
        </div>

        <div className='flex justify-between'>
          <span className='text-gray-600'>배송비</span>
          <span className='font-medium'>
            {shippingFee === 0 ? <span className='text-green-600'>무료</span> : `₩${formatPrice(shippingFee)}`}
          </span>
        </div>

        <div className='border-t pt-4'>
          <div className='flex justify-between text-lg font-bold'>
            <span>총 결제 금액</span>
            <span className='text-blue-600'>₩{formatPrice(finalTotal)}</span>
          </div>
        </div>
      </div>

      <button className='w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors'>
        주문하기
      </button>

      {totalPrice < 50000 && (
        <p className='text-sm text-gray-600 text-center mt-4'>₩{formatPrice(50000 - totalPrice)} 더 주문하면 무료배송!</p>
      )}
    </div>
  );
}

export default CartSummary;
