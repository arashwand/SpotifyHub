
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS, MOCK_USER_PROFILE } from '../mockData.tsx'; 
import { Paths, UserProfile } from '../types';
import Button from './common/Button';
import { MenuIcon, CloseIcon, ShoppingCartIcon } from './common/Icons'; // Import from common Icons file

// Mock Auth State (replace with actual AuthContext later)
const useMockAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);

    const login = () => {
        setIsAuthenticated(true);
        setUser(MOCK_USER_PROFILE);
    };
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };
    return { isAuthenticated, user, login, logout };
};


const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, login, logout } = useMockAuth(); 


  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={Paths.HOME} className="text-2xl font-vazir font-bold text-primary">
              اسپورتيفای<span className="text-accent">هاب</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 rtl:space-x-reverse">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-primary border-b-2 border-primary' : 'text-light-text hover:text-dark'
                  } py-1`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons / User Profile */}
          <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse">
            {isAuthenticated && user ? (
              <>
                <Link to={Paths.PROFILE} className="flex items-center space-x-2 rtl:space-x-reverse group">
                  <img src={user.profilePictureUrl || 'https://picsum.photos/seed/avatar/40/40'} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-medium text-light-text group-hover:text-dark">{user.name}</span>
                </Link>
                <Button onClick={logout} variant="light" size="sm">خروج</Button>
              </>
            ) : (
              <>
                <Link to={Paths.LOGIN}>
                    <Button variant="light" size="sm">ورود</Button>
                </Link>
                <Link to={Paths.LOGIN}> {/* Assuming Login page also handles Signup */}
                    <Button variant="primary" size="sm">ثبت نام</Button>
                </Link>
              </>
            )}
             <Link to={Paths.CART}>
                <Button variant="accent" size="sm" leftIcon={<ShoppingCartIcon className="w-4 h-4" />}>سبد خرید</Button>
             </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to={Paths.CART} className="mr-2 rtl:ml-2 rtl:mr-0">
                <Button variant="accent" size="sm" className="p-2"><ShoppingCartIcon className="w-5 h-5" /></Button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary p-2 rounded-md"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">باز کردن منوی اصلی</span>
              {isMobileMenuOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg z-30" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-primary text-white' : 'text-light-text hover:bg-gray-100 hover:text-dark'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
             <div className="border-t border-gray-200 mt-3 pt-3">
                {isAuthenticated && user ? (
                <>
                    <Link to={Paths.PROFILE} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-light-text hover:bg-gray-100 hover:text-dark">
                        حساب کاربری ({user.name})
                    </Link>
                    <Button onClick={() => { logout(); setIsMobileMenuOpen(false); }} variant="light" size="sm" fullWidth className="mt-2">خروج</Button>
                </>
                ) : (
                <>
                    <Link to={Paths.LOGIN} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="light" size="sm" fullWidth className="mb-2">ورود</Button>
                    </Link>
                    <Link to={Paths.LOGIN} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="primary" size="sm" fullWidth>ثبت نام</Button>
                    </Link>
                </>
                )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
