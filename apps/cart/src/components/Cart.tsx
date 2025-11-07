import { useCartStore } from '../../stores/cartStore';
import CartItems from './CartItems';

function Cart() {
  const { products, removeProduct } = useCartStore();

  const handleUpdateQuantity = (id: number, quantity: number) => {
    // quantity 업데이트 로직 구현 필요
    console.log('Update quantity:', id, quantity);
  };

  const handleRemove = (id: number) => {
    const productToRemove = products.find(p => p.id === id);
    if (productToRemove) {
      removeProduct(productToRemove);
    }
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold'>장바구니 페이지</h2>
      {products.length > 0 ? (
        <>
          {products.map(product => (
            <CartItems key={product.id} item={product} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemove} />
          ))}
        </>
      ) : (
        <p>장바구니에 상품이 없습니다.</p>
      )}
    </div>
  );
}

export default Cart;
