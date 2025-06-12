
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { Paths } from '../types'; // Adjust path if needed

// Mock Auth logic (replace with actual AuthContext's login method)
const mockLogin = (email: string) => {
  console.log(`Simulating login for: ${email}`);
  // In a real app, you'd call an API and then use AuthContext.login()
  return true; 
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For signup
  const [name, setName] = useState(''); // For signup
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLoginView) {
      if (!email || !password) {
        setError('لطفا ایمیل و رمز عبور را وارد کنید.');
        return;
      }
      // Simulate login
      if (mockLogin(email)) {
        alert('ورود با موفقیت انجام شد! (شبیه‌سازی شده)');
        navigate(Paths.PROFILE); // Redirect to profile or home
      } else {
        setError('ایمیل یا رمز عبور نامعتبر است.');
      }
    } else { // Signup view
      if (!name || !email || !password || !confirmPassword) {
        setError('لطفا تمام فیلدها را پر کنید.');
        return;
      }
      if (password !== confirmPassword) {
        setError('رمزهای عبور یکسان نیستند.');
        return;
      }
      // Simulate signup
      alert(`ثبت نام برای ${name} با موفقیت انجام شد! (شبیه‌سازی شده)`);
      // You might auto-login or redirect to login page
      setIsLoginView(true); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-vazir font-bold text-dark">
            {isLoginView ? 'ورود به حساب کاربری' : 'ایجاد حساب کاربری جدید'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLoginView && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">نام کامل</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required={!isLoginView}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="نام و نام خانوادگی"
              />
            </div>
          )}
          <div>
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">آدرس ایمیل</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="ایمیل"
            />
          </div>
          <div>
            <label htmlFor="password_login" className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
            <input
              id="password_login"
              name="password"
              type="password"
              autoComplete={isLoginView ? "current-password" : "new-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="رمز عبور"
            />
          </div>
          {!isLoginView && (
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">تکرار رمز عبور</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required={!isLoginView}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="تکرار رمز عبور"
              />
            </div>
          )}

          {error && <p className="text-sm text-danger text-center">{error}</p>}

          <div>
            <Button type="submit" variant="primary" fullWidth size="lg">
              {isLoginView ? 'ورود' : 'ثبت نام'}
            </Button>
          </div>
        </form>

        <div className="text-sm text-center">
          <button
            onClick={() => { setIsLoginView(!isLoginView); setError(''); }}
            className="font-medium text-primary hover:text-blue-700"
          >
            {isLoginView ? 'حساب کاربری ندارید؟ ثبت نام کنید' : 'قبلاً ثبت نام کرده‌اید؟ وارد شوید'}
          </button>
        </div>
        {isLoginView && (
            <div className="text-sm text-center mt-2">
                <a href="#" className="font-medium text-light-text hover:text-dark">
                رمز عبور خود را فراموش کرده‌اید؟
                </a>
            </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
