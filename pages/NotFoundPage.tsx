
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { Paths } from '../types'; // Adjust path if needed

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light text-center px-4">
      <img src="https://picsum.photos/seed/404page/400/300" alt="صفحه پیدا نشد" className="max-w-sm w-full mb-8 rounded-lg shadow-lg"/>
      <h1 className="text-6xl font-vazir font-bold text-primary mb-4">۴۰۴</h1>
      <h2 className="text-3xl font-vazir font-semibold text-dark mb-6">صفحه مورد نظر یافت نشد!</h2>
      <p className="text-lg text-light-text mb-8 max-w-md">
        متاسفیم، صفحه‌ای که به دنبال آن بودید وجود ندارد یا به مکان دیگری منتقل شده است.
      </p>
      <Link to={Paths.HOME}>
        <Button variant="primary" size="lg">
          بازگشت به صفحه اصلی
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
