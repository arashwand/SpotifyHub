
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { CartDisplayItem, ProductCartItem, VenueBookingCartItem } from '../types'; 
import { Paths } from '../types';

// Accessing the mock globalCart from window
// Ensure globalCartSportify is initialized on the window object
if (typeof (window as any).globalCartSportify === 'undefined') {
    (window as any).globalCartSportify = [];
}

const getMockCart = (): CartDisplayItem[] => {
    return Array.isArray((window as any).globalCartSportify) ? [...(window as any).globalCartSportify] : [];
};

const updateMockCart = (newCart: CartDisplayItem[]) => {
    (window as any).globalCartSportify = newCart;
    window.dispatchEvent(new CustomEvent('cartUpdated')); // Notify other components
};


const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartDisplayItem[]>(getMockCart());

  useEffect(() => {
    const handleStorageChange = () => {
        const currentGlobalCart = getMockCart();
         if (JSON.stringify(cartItems) !== JSON.stringify(currentGlobalCart)) {
            setCartItems(currentGlobalCart);
        }
    };
    window.addEventListener('cartUpdated', handleStorageChange);
    handleStorageChange(); // Initial sync

    return () => {
        window.removeEventListener('cartUpdated', handleStorageChange);
    }
  }, [cartItems]); 


  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    let updatedCart = cartItems.map(item => {
      if (item.id === itemId && item.type === 'product') {
        const quantity = Math.max(1, Math.min(newQuantity, item.stock)); // Ensure quantity is between 1 and stock
        return { ...item, quantity };
      }
      return item;
    }).filter(item => item.type === 'venue_booking' || (item.type === 'product' && item.quantity > 0)); // Remove product if quantity is 0

    setCartItems(updatedCart);
    updateMockCart(updatedCart);
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    updateMockCart(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.type === 'product') {
        return total + item.price * item.quantity;
      }
      if (item.type === 'venue_booking') {
        return total + item.totalPrice;
      }
      return total;
    }, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
        alert("سبد خرید شما خالی است!");
        return;
    }
    alert('انتقال به صفحه پرداخت... (شبیه‌سازی شده)');
    setCartItems([]);
    updateMockCart([]);
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
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <img 
                    src={item.type === 'product' ? item.image : (item as VenueBookingCartItem).venueImage || 'https://picsum.photos/seed/cart_item/100/100'} 
                    alt={item.type === 'product' ? item.name : (item as VenueBookingCartItem).venueName} 
                    className="w-24 h-24 object-cover rounded-md shadow-sm" 
                  />
                  <div className="flex-grow text-center sm:text-right">
                    <h3 className="text-lg font-semibold text-medium-dark">{item.type === 'product' ? item.name : (item as VenueBookingCartItem).venueName}</h3>
                    {item.type === 'product' && <p className="text-sm text-light-text">دسته: {item.category}</p>}
                    {item.type === 'venue_booking' && (
                        <div className="text-xs text-light-text mt-1 space-y-0.5">
                            {item.slots.slice(0, 3).map(slot => ( // Show first 3 slots for brevity
                                <p key={slot.date + slot.timeSlot}>
                                    {new Date(slot.date).toLocaleDateString('fa-IR', {day:'2-digit', month:'2-digit'})} - {slot.timeSlot}
                                </p>
                            ))}
                            {item.slots.length > 3 && <p>و {item.slots.length - 3} سانس دیگر...</p>}
                        </div>
                    )}
                    <p className="text-md font-semibold text-primary mt-1">
                      {item.type === 'product' ? item.price.toLocaleString('fa-IR') : (item as VenueBookingCartItem).totalPrice.toLocaleString('fa-IR')} تومان
                      {item.type === 'product' ? '' : ' (مجموع)'}
                    </p>
                  </div>
                  {item.type === 'product' && (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mt-3 sm:mt-0">
                      <Button size="sm" variant="light" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} >-</Button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <Button size="sm" variant="light" onClick={() => handleQuantityChange(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</Button>
                    </div>
                  )}
                   {item.type === 'venue_booking' && (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mt-3 sm:mt-0 text-sm text-gray-500">
                        <span>{item.slots.length} جلسه</span>
                    </div>
                  )}
                  <Button variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)} className="mt-3 sm:mt-0 sm:ml-4 rtl:sm:mr-4">
                    حذف
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-xl font-vazir font-semibold text-dark mb-6">خلاصه سفارش</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-light-text">
                  <span>جمع کل موارد:</span>
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
