
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import FilterPanel from '../components/common/FilterPanel';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import StarRating from '../components/common/StarRating';
import { MOCK_PRODUCTS, PRODUCT_CATEGORY_OPTIONS } from '../mockData.tsx'; 
import { Product, FilterGroup, CartDisplayItem, ProductCartItem } from '../types'; 
import { Paths } from '../types'; 

// Simulate global cart using a window property for this exercise.
if (!(window as any).globalCartSportify) {
    (window as any).globalCartSportify = [];
}
const getGlobalCart = (): CartDisplayItem[] => (window as any).globalCartSportify;
const updateGlobalCart = (newCart: CartDisplayItem[]) => {
    (window as any).globalCartSportify = newCart;
    window.dispatchEvent(new CustomEvent('cartUpdated')); // Notify other components
};


const filterGroupsConfig: FilterGroup[] = [
  { id: 'category', name: 'دسته‌بندی محصول', options: PRODUCT_CATEGORY_OPTIONS, type: 'select' },
];

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState<CartDisplayItem[]>(getGlobalCart()); 
  
  const [currentFilters, setCurrentFilters] = useState<Record<string, string>>(() => {
    const initialFilters: Record<string, string> = {};
    filterGroupsConfig.forEach(group => {
      initialFilters[group.id] = searchParams.get(group.id) || '';
    });
    initialFilters['searchTerm'] = searchParams.get('q') || '';
    return initialFilters;
  });

  // Effect to listen for cart changes from other components (e.g., VenuesPage)
  useEffect(() => {
    const handleCartUpdate = () => {
      setCart(getGlobalCart());
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    handleCartUpdate(); // Initial sync
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);


  const applyFilters = useCallback(() => {
    let tempProducts = MOCK_PRODUCTS;

    if (currentFilters.searchTerm) {
      tempProducts = tempProducts.filter(product => 
        product.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase())
      );
    }
    if (currentFilters.category && currentFilters.category !== PRODUCT_CATEGORY_OPTIONS[0].value) {
      tempProducts = tempProducts.filter(product => product.category === currentFilters.category);
    }
    
    setFilteredProducts(tempProducts);
  }, [currentFilters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    Object.entries(currentFilters).forEach(([key, value]) => {
      if (value) newSearchParams.set(key, value);
    });
    if (searchParams.toString() !== newSearchParams.toString()) {
        setSearchParams(newSearchParams, { replace: true });
    }
    
    const productId = searchParams.get('id');
    if (productId) {
        if (!selectedProduct || selectedProduct.id !== productId) {
            const product = MOCK_PRODUCTS.find(p => p.id === productId);
            if (product) {
                setSelectedProduct(product);
                setIsModalOpen(true);
            }
        }
    } else if (isModalOpen) {
        setIsModalOpen(false);
        setSelectedProduct(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilters, searchParams]);

  const handleFilterChange = (groupId: string, value: string) => {
    setCurrentFilters(prev => ({ ...prev, [groupId]: value }));
  };
  
  const handleSearch = (searchTerm: string) => {
    setCurrentFilters(prev => ({ ...prev, searchTerm }));
  };

  const handleResetFilters = () => {
    setCurrentFilters({searchTerm: ''});
    setSearchParams({}, {replace: true});
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('id', product.id);
    setSearchParams(newSearchParams, { replace: true });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('id');
    setSearchParams(newSearchParams, { replace: true });
  };
  
  const handleAddToCart = (product: Product) => {
    const currentGlobalCart = getGlobalCart();
    const existingItemIndex = currentGlobalCart.findIndex(item => item.type === 'product' && item.id === product.id);
    
    let updatedCart;
    if (existingItemIndex > -1) {
      updatedCart = currentGlobalCart.map((item, index) => 
        index === existingItemIndex ? { ...item, quantity: (item as ProductCartItem).quantity + 1 } : item
      );
    } else {
      const newProductItem: ProductCartItem = {
          type: 'product',
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0] || 'https://picsum.photos/seed/product_default/100/100',
          quantity: 1,
          stock: product.stock,
          category: product.category, // Populate category
      };
      updatedCart = [...currentGlobalCart, newProductItem];
    }
    updateGlobalCart(updatedCart);
    setCart(updatedCart); // Update local state to trigger re-render
    alert(`محصول "${product.name}" به سبد خرید اضافه شد.`);
  };

  const getTotalCartItems = () => {
    return cart.reduce((count, item) => {
        if (item.type === 'product') {
            return count + item.quantity;
        }
        return count + 1; // Each venue booking is one item package
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-vazir font-bold text-dark mb-8 text-center">فروشگاه لوازم ورزشی</h1>
      
      <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder="جستجوی محصول (نام)..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <FilterPanel 
            filterGroups={filterGroupsConfig} 
            currentFilters={currentFilters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
           <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-semibold text-dark mb-2">سبد خرید ({getTotalCartItems()} آیتم)</h4>
            {cart.length === 0 ? <p className="text-sm text-gray-500">سبد خرید شما خالی است.</p> : (
              <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
                {cart.map(item => (
                    <li key={item.id}>
                        {item.type === 'product' ? item.name : item.venueName} 
                        {item.type === 'product' && ` (x${item.quantity})`}
                        {item.type === 'venue_booking' && ` (رزرو مکان)`}
                    </li>
                ))}
              </ul>
            )}
             <Button onClick={() => navigate(Paths.CART)} fullWidth variant='primary' size='sm' className="mt-3" disabled={cart.length === 0}>مشاهده سبد و پرداخت</Button>
          </div>
        </div>
        <div className="md:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  item={product} 
                  type="product" 
                  onDetailsClick={openProductDetails}
                  onActionClick={() => handleAddToCart(product)}
                  actionText="افزودن به سبد"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <img src="https://picsum.photos/seed/empty_shop/300/200" alt="موردی یافت نشد" className="mx-auto mb-4 rounded-lg" />
              <p className="text-xl text-gray-600">متاسفانه، هیچ محصولی با فیلترهای انتخابی شما یافت نشد.</p>
              <Button onClick={handleResetFilters} variant="primary" className="mt-4">
                پاک کردن فیلترها و نمایش همه
              </Button>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedProduct.name} size="lg">
          <div className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img src={selectedProduct.images[0] || 'https://picsum.photos/seed/product_detail/400/400'} alt={selectedProduct.name} className="w-full h-auto object-cover rounded-lg shadow-md mb-3" />
                     {selectedProduct.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                            {selectedProduct.images.slice(0,4).map((img, idx) => ( 
                                <img key={idx} src={img} alt={`${selectedProduct.name} ${idx+1}`} className="w-full h-20 object-cover rounded-md shadow-sm cursor-pointer hover:opacity-80" 
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <p><strong className="font-semibold text-dark">دسته بندی:</strong> {selectedProduct.category}</p>
                    <p className="text-2xl font-vazir font-bold text-primary my-3">{selectedProduct.price.toLocaleString('fa-IR')} تومان</p>
                    {selectedProduct.rating && <StarRating rating={selectedProduct.rating} size="md" showValue className="mb-3" />}
                    <p><strong className="font-semibold text-dark">موجودی:</strong> {selectedProduct.stock > 0 ? `${selectedProduct.stock} عدد` : <span className="text-danger">ناموجود</span>}</p>
                    
                    <h4 className="font-semibold text-dark mt-4 mb-1">توضیحات:</h4>
                    <p className="text-gray-700 leading-relaxed text-sm mb-4">{selectedProduct.description}</p>
                    
                     <Button 
                        onClick={() => handleAddToCart(selectedProduct)} 
                        fullWidth 
                        size="lg" 
                        disabled={selectedProduct.stock === 0}
                        className="mt-6"
                    >
                        {selectedProduct.stock > 0 ? 'افزودن به سبد خرید' : 'ناموجود'}
                    </Button>
                </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShopPage;
