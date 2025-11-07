import { useCartStore } from '../../stores/cartStore';

function Cart() {
  const { products } = useCartStore();
  console.log('Products from store:', products);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold'>장바구니 테스트</h2>
      <p>Zustand 테스트 중...</p>
      <p>상품 개수: {}개</p>
    </div>
  );
}

export default Cart;
