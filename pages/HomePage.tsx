
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { MOCK_VENUES, MOCK_CLASSES, MOCK_COACHES, SPORT_CATEGORIES_FEATURED } from '../mockData.tsx'; 
import { Paths } from '../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (searchTerm: string) => {
    navigate(`${Paths.VENUES}?q=${encodeURIComponent(searchTerm)}`);
  };

  const Section: React.FC<{ title: string; children: React.ReactNode; viewAllLink?: string, viewAllText?: string }> = ({ title, children, viewAllLink, viewAllText = "مشاهده همه" }) => (
    <section className="py-8 md:py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-vazir font-bold text-dark">{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink}>
            <Button variant="link" className="text-primary font-semibold">
              {viewAllText} &rarr;
            </Button>
          </Link>
        )}
      </div>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-blue-700 text-white pt-20 pb-24 md:pt-32 md:pb-36 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-vazir font-bold mb-6">
            به دنیای ورزش <span className="text-accent">اسپورتيفای هاب</span> خوش آمدید!
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            اماکن ورزشی، کلاس‌های تناسب اندام و مربیان حرفه‌ای را به راحتی پیدا و رزرو کنید.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="دنبال چه چیزی می‌گردید؟ (مثال: زمین فوتسال، کلاس یوگا، مربی تنیس)"
              buttonText="بگرد"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        {/* Sport Categories */}
        <Section title="دسته‌بندی‌های ورزشی">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {SPORT_CATEGORIES_FEATURED.map((category) => {
              const IconComponent = category.icon; 
              return (
                <Link
                  to={category.path}
                  key={category.name}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center group"
                >
                  <IconComponent className="w-12 h-12 text-primary mx-auto mb-3 transition-transform group-hover:scale-110" />
                  <h3 className="font-semibold text-medium-dark group-hover:text-primary">{category.name}</h3>
                </Link>
              );
            })}
          </div>
        </Section>

        {/* Featured Venues */}
        <Section title="اماکن ورزشی پیشنهادی" viewAllLink={Paths.VENUES}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {MOCK_VENUES.slice(0, 3).map((venue) => (
              <Card key={venue.id} item={venue} type="venue" 
                onDetailsClick={() => navigate(`${Paths.VENUES}?id=${venue.id}`)} 
                onActionClick={() => navigate(`${Paths.VENUES}?id=${venue.id}&action=book`)}
                actionText="رزرو کنید"
              />
            ))}
          </div>
        </Section>

        {/* Popular Classes */}
        <Section title="کلاس‌های محبوب" viewAllLink={Paths.CLASSES}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {MOCK_CLASSES.slice(0, 3).map((classItem) => (
              <Card key={classItem.id} item={classItem} type="class" 
                onDetailsClick={() => navigate(`${Paths.CLASSES}?id=${classItem.id}`)}
                onActionClick={() => navigate(`${Paths.CLASSES}?id=${classItem.id}&action=register`)}
                actionText="ثبت نام کنید"
              />
            ))}
          </div>
        </Section>

        {/* Top-Rated Coaches */}
        <Section title="مربیان برتر" viewAllLink={Paths.COACHES}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {MOCK_COACHES.slice(0, 3).map((coach) => (
              <Card key={coach.id} item={coach} type="coach" 
                onDetailsClick={() => navigate(`${Paths.COACHES}?id=${coach.id}`)}
                onActionClick={() => navigate(`${Paths.COACHES}?id=${coach.id}&action=contact`)}
                actionText="ارتباط با مربی"
              />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

export default HomePage;
