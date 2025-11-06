import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import type { ViewType } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('products');

  return (
    <div className='min-h-screen bg-red-500'>
      <Header currentView={currentView} onViewChange={setCurrentView} cartItemCount={3} />

      <main className='max-w-7xl mx-auto px-4 py-8'>{currentView === 'products' ? <ProductList /> : <Cart />}</main>
    </div>
  );
}

export default App;
