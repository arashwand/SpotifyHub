
import React, { useState } from 'react';
import { MOCK_USER_PROFILE, MOCK_BOOKINGS, MOCK_ORDERS } from '../constants'; // Adjust path
import { UserProfile, Booking, Order } from '../types'; // Adjust path
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

// Mock Auth State (replace with actual AuthContext later)
const useMockAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume logged in for profile
    const [user, setUser] = useState<UserProfile>(MOCK_USER_PROFILE);

    const updateUser = (updatedData: Partial<UserProfile>) => {
        setUser(prev => ({ ...prev!, ...updatedData }));
    };
    return { isAuthenticated, user, updateUser };
};


const ProfilePage: React.FC = () => {
  const { user, updateUser } = useMockAuth(); // Using mock auth and user data
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'orders'>('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<UserProfile>(user);

  if (!user) {
    // In a real app with AuthContext, this would redirect to login or show an appropriate message
    return <div className="container mx-auto p-8 text-center">لطفا برای مشاهده پروفایل خود وارد شوید.</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    updateUser(editFormData);
    setIsEditModalOpen(false);
    alert('اطلاعات پروفایل با موفقیت به روز شد. (شبیه‌سازی شده)');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <img src={user.profilePictureUrl || 'https://picsum.photos/seed/profile/100/100'} alt={user.name} className="w-24 h-24 rounded-full shadow-md" />
              <div>
                <h2 className="text-2xl font-vazir font-semibold text-dark">{user.name}</h2>
                <p className="text-light-text">{user.email}</p>
              </div>
            </div>
            <p><strong className="font-semibold text-dark">تلفن:</strong> {user.phone || 'ثبت نشده'}</p>
            <p><strong className="font-semibold text-dark">آدرس:</strong> {user.address || 'ثبت نشده'}</p>
            <Button onClick={() => { setEditFormData(user); setIsEditModalOpen(true); }} variant="primary" className="mt-4">
              ویرایش اطلاعات
            </Button>
          </div>
        );
      case 'bookings':
        return (
          <div>
            <h3 className="text-xl font-vazir font-semibold text-dark mb-4">رزروهای من</h3>
            {MOCK_BOOKINGS.length > 0 ? (
              <div className="space-y-4">
                {MOCK_BOOKINGS.map((booking: Booking) => (
                  <div key={booking.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="font-semibold text-medium-dark">{booking.itemName} ({booking.type === 'venue' ? 'مکان' : 'کلاس'})</h4>
                    <p className="text-sm text-light-text">تاریخ: {booking.date} {booking.time && `- ساعت: ${booking.time}`}</p>
                    <p className="text-sm text-light-text">وضعیت: <span className={`font-medium ${booking.status === 'تایید شده' ? 'text-success' : 'text-orange-500'}`}>{booking.status}</span></p>
                    <p className="text-sm text-light-text">مبلغ: {booking.price.toLocaleString('fa-IR')} تومان</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>شما هیچ رزروی ندارید.</p>
            )}
          </div>
        );
      case 'orders':
        return (
          <div>
            <h3 className="text-xl font-vazir font-semibold text-dark mb-4">تاریخچه سفارشات فروشگاه</h3>
            {MOCK_ORDERS.length > 0 ? (
              <div className="space-y-4">
                {MOCK_ORDERS.map((order: Order) => (
                  <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-medium-dark">سفارش #{order.id}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${order.status === 'تحویل داده شده' ? 'bg-success/20 text-success' : 'bg-orange-500/20 text-orange-600'}`}>{order.status}</span>
                    </div>
                    <p className="text-sm text-light-text">تاریخ: {order.orderDate}</p>
                    <p className="text-sm text-light-text">مبلغ کل: {order.totalAmount.toLocaleString('fa-IR')} تومان</p>
                    <ul className="mt-2 text-xs text-gray-500 space-y-1">
                        {order.items.map(item => <li key={item.productId}>{item.productName} (x{item.quantity})</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p>شما هیچ سفارشی از فروشگاه ندارید.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const TabButton: React.FC<{tabKey: 'profile' | 'bookings' | 'orders', label: string}> = ({tabKey, label}) => (
    <button
        onClick={() => setActiveTab(tabKey)}
        className={`px-4 py-2 font-medium text-sm rounded-md transition-colors ${
        activeTab === tabKey
            ? 'bg-primary text-white shadow-md'
            : 'text-light-text hover:bg-gray-100 hover:text-dark'
        }`}
    >
        {label}
    </button>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-vazir font-bold text-dark mb-8">حساب کاربری من</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
            <TabButton tabKey="profile" label="اطلاعات کاربری" />
            <TabButton tabKey="bookings" label="رزروهای من" />
            <TabButton tabKey="orders" label="سفارشات فروشگاه" />
          </div>
        </aside>
        <main className="md:w-3/4 bg-white p-6 rounded-lg shadow-md">
          {renderTabContent()}
        </main>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="ویرایش اطلاعات کاربری" size="md">
        <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">نام کامل</label>
            <input type="text" name="name" id="name" value={editFormData.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            <input type="email" name="email" id="email" value={editFormData.email} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">شماره تلفن</label>
            <input type="tel" name="phone" id="phone" value={editFormData.phone || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">آدرس</label>
            <textarea name="address" id="address" value={editFormData.address || ''} onChange={handleInputChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"></textarea>
          </div>
          <div>
            <label htmlFor="profilePictureUrl" className="block text-sm font-medium text-gray-700 mb-1">URL عکس پروفایل</label>
            <input type="text" name="profilePictureUrl" id="profilePictureUrl" value={editFormData.profilePictureUrl || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
          </div>
          <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-2">
            <Button type="button" variant="light" onClick={() => setIsEditModalOpen(false)}>لغو</Button>
            <Button type="submit" variant="primary">ذخیره تغییرات</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
