import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import Button from '../components/common/Button';
import { CartItem } from '../types'; // Adjust path if needed
import { Paths } from '../types';

// Accessing the mock globalCart from ShopPage (not ideal, context/global state manager is better)
// This is a simplified approach. A better way would be using React Context or a state management library.
// Ensure globalCartSportify is initialized on the window object
if (typeof (window as any).globalCartSportify === 'undefined') {
    (window as any).globalCartSportify = [];
}

const getMockCart = (): CartItem[] => {
    return Array.isArray((window as any).globalCartSportify) ? [...(window as any).globalCartSportify] : [];
};

const updateMockCart = (newCart: CartItem[]) => {
    (window as any).globalCartSportify = newCart;
};


const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(getMockCart());

  useEffect(() => {
    // This effect ensures that if the global cart (simulated via window object) changes,
    // this component's state also updates.
    const handleStorageChange = () => {
        const currentGlobalCart = getMockCart();
         if (JSON.stringify(cartItems) !== JSON.stringify(currentGlobalCart)) {
            setCartItems(currentGlobalCart);
        }
    };
    // A more robust way to listen for changes if ShopPage dispatches custom event after updating cart
    window.addEventListener('cartUpdated', handleStorageChange);

    // Initial sync
    handleStorageChange();

    // Fallback polling for simpler mock
    const interval = setInterval(handleStorageChange, 500);


    return () => {
        window.removeEventListener('cartUpdated', handleStorageChange);
        clearInterval(interval);
    }
  }, [cartItems]); // re-run if cartItems local state changes to compare with global


  const handleQuantityChange = (productId: string, newQuantity: number) => {
    let updatedCart;
    if (newQuantity < 1) { // Remove item if quantity becomes 0 or less
        updatedCart = cartItems.filter(item => item.id !== productId);
    } else {
        updatedCart = cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
        );
    }
    setCartItems(updatedCart);
    updateMockCart(updatedCart);
    window.dispatchEvent(new CustomEvent('cartUpdated')); // Notify other components
  };

  const handleRemoveItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    updateMockCart(updatedCart);
    window.dispatchEvent(new CustomEvent('cartUpdated')); // Notify other components
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
        alert("سبد خرید شما خالی است!");
        return;
    }
    alert('انتقال به صفحه پرداخت... (شبیه‌سازی شده)');
    // Here you would navigate to a real checkout page or integrate a payment gateway
    // For now, clear the cart and navigate home.
    setCartItems([]);
    updateMockCart([]);
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    navigate(Paths.HOME);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-vazir font-bold text-dark mb-8 text-center">سبد خرید شما</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <img src="https://picsum.photos/seed/empty_cart/300/200" alt="سبد خرید خالی" className="mx-auto mb-4 rounded-lg" />
          <p className="text-xl text-gray-600">سبد خرید شما در حال حاضر خالی است.</p>
          <Link to={Paths.SHOP}>
            <Button variant="primary" className="mt-6">
              بازگشت به فروشگاه
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-vazir font-semibold text-dark mb-6">آیتم‌های سبد خرید</h2>
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <img src={(item.images && item.images[0]) || 'https://picsum.photos/seed/cart_item/100/100'} alt={item.name} className="w-24 h-24 object-cover rounded-md shadow-sm" />
                  <div className="flex-grow text-center sm:text-right">
                    <h3 className="text-lg font-semibold text-medium-dark">{item.name}</h3>
                    <p className="text-sm text-light-text">{item.category}</p>
                    <p className="text-md font-semibold text-primary mt-1">{item.price.toLocaleString('fa-IR')} تومان</p>
                  </div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mt-3 sm:mt-0">
                    <Button size="sm" variant="light" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} >-</Button>
                    <span className="w-10 text-center">{item.quantity}</span>
                    <Button size="sm" variant="light" onClick={() => handleQuantityChange(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</Button>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)} className="mt-3 sm:mt-0 sm:ml-4 rtl:sm:mr-4">
                    حذف
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24"> {/* Sticky summary */}
              <h2 className="text-xl font-vazir font-semibold text-dark mb-6">خلاصه سفارش</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-light-text">
                  <span>جمع کل محصولات:</span>
                  <span>{calculateTotal().toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between text-light-text">
                  <span>هزینه ارسال:</span>
                  <span>رایگان (موقت)</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between text-dark font-semibold text-lg">
                  <span>مبلغ قابل پرداخت:</span>
                  <span>{calculateTotal().toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>
              <Button onClick={handleCheckout} fullWidth size="lg" variant="accent">
                ادامه فرآیند خرید و پرداخت
              </Button>
               <Link to={Paths.SHOP} className="block mt-4 text-center">
                    <Button variant="light" fullWidth>
                    ادامه خرید
                    </Button>
                </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;