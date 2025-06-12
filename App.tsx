import React, { ReactNode } from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VenuesPage from './pages/VenuesPage';
import ClassesPage from './pages/ClassesPage';
import CoachesPage from './pages/CoachesPage';
import ShopPage from './pages/ShopPage';
import BlogPage from './pages/BlogPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import { Paths, UserProfile } from './types'; // Adjust path

// ScrollToTop component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


// Main Layout Component
const Layout: React.FC<{children?: ReactNode}> = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-light">
        <ScrollToTop />
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

// Mock AuthProvider (in a real app, this would be more complex)
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null; 
  login: (userData: UserProfile) => void;
  logout: () => void;
}
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<UserProfile | null>(null);

  const login = (userData: UserProfile) => {
    setIsAuthenticated(true);
    setUser(userData);
    // In a real app, you might also save a token to localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // In a real app, clear token from localStorage
  };
  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth
export const useAuth = (): AuthContextType => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


const App: React.FC = () => {
  return (
    <AuthProvider> {/* Mock AuthProvider */}
      <HashRouter>
        <Routes>
          <Route path={Paths.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={Paths.VENUES} element={<VenuesPage />} />
            <Route path={Paths.CLASSES} element={<ClassesPage />} />
            <Route path={Paths.COACHES} element={<CoachesPage />} />
            <Route path={Paths.SHOP} element={<ShopPage />} />
            <Route path={Paths.CART} element={<CartPage />} />
            <Route path={Paths.BLOG} element={<BlogPage />} />
            <Route path={Paths.PROFILE} element={<ProfilePage />} />
            {/* LoginPage is standalone, not inside main Layout */}
          </Route>
          <Route path={Paths.LOGIN} element={<LoginPage />} />
          <Route path="*" element={<Layout><NotFoundPage /></Layout>} /> {/* NotFoundPage within Layout */}
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;