import React from 'react';
import { Venue, ClassItem, Coach, Product, Article, SportCategory, SkillLevel, Review, Amenity, Booking, Order, UserProfile, Paths, FilterOption } from './types';

const defaultUserImage = 'https://picsum.photos/seed/user/100/100';

// Placeholder SVG Icons (ensure they return React.ReactNode)
export function FootballIcon({ className }: {className?: string}): React.ReactNode { return (<svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM3.646 7.957L5.5 6.5v2l-1.75.875A6.012 6.012 0 013.5 7.5a5.95 5.95 0 01.146.457zM6.5 6.5h2L10 4.5 11.5 6.5h2L15.5 8v2l-1.75-.875a6.012 6.012 0 01-.25.875H10A.5.5 0 0010 10h.5a.5.5 0 00.5-.5V8l1.5-1.5h2l1.854-1.457A6.012 6.012 0 0116.5 7.5a5.95 5.95 0 01-.146-.457L14.5 8.5v-2l1.75-.875A6.012 6.012 0 0116.5 5.5a5.95 5.95 0 01-.146-.457L14.5 6.5h-2L10 8.5 8.5 6.5h-2L4.5 8v2l1.75.875a6.012 6.012 0 01.25-.875H10a.5.5 0 000-1h-.5a.5.5 0 00-.5.5V8L6.5 9.5h-2L2.646 8.043A6.012 6.012 0 013.5 5.5c.09 0 .178.006.266.016L5.5 6.5v2L3.646 7.957zM10 13a3 3 0 110-6 3 3 0 010 6z"></path></svg>); }
export function SwimmingIcon({ className }: {className?: string}): React.ReactNode { return (<svg className={className} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path></svg>); }
export function GymIcon({ className }: {className?: string}): React.ReactNode { return (<svg className={className} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm5 3a1 1 0 011-1h2a1 1 0 110 2H10a1 1 0 01-1-1zm-3 5a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>); }
export function YogaIcon({ className }: {className?: string}): React.ReactNode { return (<svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7.05 6.05a1 1 0 011.414-1.414L10 8.586l1.536-1.95a1 1 0 111.515 1.303L11.02 9.5l1.016 3.048a1 1 0 01-1.872.936L10 10.414l-.164 3.07a1 1 0 01-1.932-.514l.58-2.318-1.586-1.586a1 1 0 01.152-1.586z"></path></svg>); }
export function TennisIcon({ className }: {className?: string}): React.ReactNode { return (<svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a.75.75 0 010-1.5.75.75 0 010 1.5zM15 5H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2zM5.5 7a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5V7zm0 3a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-1z"></path></svg>); }
export function BasketballIcon({ className }: {className?: string}): React.ReactNode { return (<svg className={className} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm4.816-5.833a.96.96 0 00-1.284-.33l-2.45 1.225V8.5a.5.5 0 00-1 0v4.562l-2.45-1.225a.96.96 0 00-1.284.33.958.958 0 00.33 1.284l3 1.5a.96.96 0 00.954 0l3-1.5a.958.958 0 00.33-1.284zM8.5 6.5A1.5 1.5 0 0110 5a1.5 1.5 0 011.5 1.5.5.5 0 001 0A2.5 2.5 0 0010 4a2.5 2.5 0 00-2.5 2.5.5.5 0 001 0z" clipRule="evenodd"></path></svg>); }
export function WifiIcon({ className }: {className?: string}): React.ReactNode { return (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.707 3.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414-1.414l4-4zM2.929 9.071a1 1 0 011.414 0L10 14.586l5.657-5.515a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z" clipRule="evenodd" /></svg>)}
export function ShowerIcon({ className }: {className?: string}): React.ReactNode { return (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h1v1H6.5A2.5 2.5 0 004 8.5V14a1 1 0 001 1h1.5a1 1 0 001-1v-1.018A3.002 3.002 0 0110 9.5c.09 0 .178.006.265.016L12 8.303V4h1a1 1 0 100-2H7zm2 9a1 1 0 11-2 0 1 1 0 012 0zm2-1a1 1 0 100-2 1 1 0 000 2zm2-1a1 1 0 11-2 0 1 1 0 012 0z" /></svg>)}
export function LockerIcon({ className }: {className?: string}): React.ReactNode { return (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm3 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /></svg>)}
export function AirConIcon({ className }: {className?: string}): React.ReactNode { return (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2 5a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H5a3 3 0 01-3-3V5zm3 .5a.5.5 0 000 1h10a.5.5 0 000-1H5zM5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H5.5A.5.5 0 015 8zm6 0a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zM5 11a.5.5 0 01.5-.5h4a.5.5 0 010 1H5.5A.5.5 0 015 11zm6 0a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clipRule="evenodd" /></svg>)}
export function WaterDispenserIcon({ className }: {className?: string}): React.ReactNode { return (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zM4 6a2 2 0 012-2h8a2 2 0 012 2v1H4V6zm0 3v6a2 2 0 002 2h8a2 2 0 002-2V9H4zm3 2a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" /></svg>)}

export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', userId: 'u1', userName: 'علی رضایی', rating: 5, comment: 'عالی بود! خیلی تمیز و مرتب.', date: '۱۴۰۳/۰۲/۱۵' },
  { id: 'r2', userId: 'u2', userName: 'سارا محمدی', rating: 4, comment: 'امکانات خوبی داشت، فقط کمی شلوغ بود.', date: '۱۴۰۳/۰۲/۱۰' },
  { id: 'r3', userId: 'u3', userName: 'محمد حسینی', rating: 3, comment: 'متوسط بود، میتونست بهتر باشه.', date: '۱۴۰۳/03/01'},
];

const AmenityIconDefaultClass = "w-4 h-4 text-currentColor";

export const MOCK_AMENITIES: Amenity[] = [
  { id: 'am1', name: 'پارکینگ', icon: <WifiIcon className={AmenityIconDefaultClass} /> }, 
  { id: 'am2', name: 'دوش', icon: <ShowerIcon className={AmenityIconDefaultClass} /> }, 
  { id: 'am3', name: 'کمد', icon: <LockerIcon className={AmenityIconDefaultClass} /> }, 
  { id: 'am4', name: 'تهویه مطبوع', icon: <AirConIcon className={AmenityIconDefaultClass} /> }, 
  { id: 'am5', name: 'آب سردکن', icon: <WaterDispenserIcon className={AmenityIconDefaultClass} /> },
];


export const MOCK_VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'زمین فوتبال چمن مصنوعی آزادی',
    sportType: SportCategory.FOOTBALL,
    location: 'مجموعه ورزشی آزادی، تهران',
    city: 'تهران',
    images: ['https://picsum.photos/seed/futsal1/600/400', 'https://picsum.photos/seed/futsal2/600/400'],
    mapLink: '#',
    availableTimeSlots: ['شنبه ۱۶:۰۰-۱۸:۰۰', 'یکشنبه ۱۰:۰۰-۱۲:۰۰'],
    pricePerHour: 250000,
    rating: 4.5,
    reviews: MOCK_REVIEWS.slice(0, 2),
    amenities: MOCK_AMENITIES.slice(0,3),
    description: 'یک زمین فوتبال با کیفیت عالی و نورپردازی مناسب برای بازی در شب.'
  },
  {
    id: 'v2',
    name: 'استخر بین‌المللی انقلاب',
    sportType: SportCategory.SWIMMING,
    location: 'مجموعه ورزشی انقلاب، تهران',
    city: 'تهران',
    images: ['https://picsum.photos/seed/pool1/600/400', 'https://picsum.photos/seed/pool2/600/400'],
    availableTimeSlots: ['روزهای زوج ۸:۰۰-۱۴:۰۰ (آقایان)', 'روزهای فرد ۸:۰۰-۱۴:۰۰ (بانوان)'],
    pricePerHour: 150000, // Or price per session
    rating: 4.8,
    reviews: MOCK_REVIEWS.slice(1,3),
    amenities: MOCK_AMENITIES,
    description: 'استخر استاندارد المپیک با تمامی امکانات رفاهی.'
  },
   {
    id: 'v3',
    name: 'سالن بسکتبال هما',
    sportType: SportCategory.BASKETBALL,
    location: 'خیابان آپادانا، تهران',
    city: 'تهران',
    images: ['https://picsum.photos/seed/basket1/600/400', 'https://picsum.photos/seed/basket2/600/400'],
    availableTimeSlots: ['دوشنبه ۱۸:۰۰-۲۰:۰۰', 'چهارشنبه ۱۸:۰۰-۲۰:۰۰'],
    pricePerHour: 300000,
    rating: 4.2,
    reviews: [MOCK_REVIEWS[0]],
    amenities: MOCK_AMENITIES.slice(0,2),
    description: 'سالن مجهز بسکتبال با کفپوش استاندارد و تهویه مناسب.'
  },
];

export const MOCK_CLASSES: ClassItem[] = [
  {
    id: 'c1',
    name: 'کلاس یوگا آرامش درون',
    classType: SportCategory.YOGA,
    location: 'باشگاه نیلوفر آبی، سعادت آباد',
    skillLevel: SkillLevel.ALL_LEVELS,
    instructorId: 'coach2',
    instructorName: 'مریم احمدی',
    schedule: 'یکشنبه و سه‌شنبه ۱۷:۰۰-۱۸:۳۰',
    price: 800000, // Monthly
    description: 'در این کلاس با تمرینات یوگا به آرامش جسم و ذهن برسید.',
    image: 'https://picsum.photos/seed/yoga1/600/400',
    rating: 4.9,
    reviews: MOCK_REVIEWS.slice(0,1)
  },
  {
    id: 'c2',
    name: 'کلاس آمادگی جسمانی پیشرفته',
    classType: SportCategory.GYM,
    location: 'باشگاه انرژی پلاس، ونک',
    skillLevel: SkillLevel.ADVANCED,
    instructorId: 'coach1',
    instructorName: 'رضا قاسمی',
    schedule: 'روزهای زوج ۱۹:۰۰-۲۰:۳۰',
    price: 1200000, // Monthly
    description: 'کلاسی چالشی برای ورزشکاران حرفه‌ای جهت افزایش قدرت و استقامت.',
    image: 'https://picsum.photos/seed/gym1/600/400',
    rating: 4.7,
    reviews: MOCK_REVIEWS.slice(1,2)
  },
];

export const MOCK_COACHES: Coach[] = [
  {
    id: 'coach1',
    name: 'رضا قاسمی',
    specialties: [SportCategory.GYM, SportCategory.GENERAL_FITNESS],
    location: 'تهران',
    rating: 4.8,
    bio: 'مربی بدنسازی با بیش از ۱۰ سال سابقه کار با ورزشکاران در سطوح مختلف. متخصص در طراحی برنامه‌های تمرینی و تغذیه.',
    qualifications: ['مدرک مربیگری درجه ۱ فدراسیون بدنسازی', 'کارشناس تربیت بدنی'],
    reviews: MOCK_REVIEWS,
    photoUrl: 'https://picsum.photos/seed/coach1/300/300',
    experienceYears: 10,
  },
  {
    id: 'coach2',
    name: 'مریم احمدی',
    specialties: [SportCategory.YOGA, SportCategory.PILATES],
    location: 'تهران',
    rating: 4.9,
    bio: 'مربی یوگا و پیلاتس با تمرکز بر سلامت جسم و روان. دارای مدرک بین‌المللی یوگا از هند.',
    qualifications: ['مدرک بین‌المللی مربیگری یوگا (RYT 500)', 'مربی پیلاتس از موسسه معتبر'],
    reviews: MOCK_REVIEWS.slice(0,2),
    photoUrl: 'https://picsum.photos/seed/coach2/300/300',
    experienceYears: 7,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'تیشرت ورزشی مردانه نایک',
    category: 'پوشاک',
    images: ['https://picsum.photos/seed/shirt1/400/400', 'https://picsum.photos/seed/shirt2/400/400'],
    description: 'تیشرت ورزشی با تکنولوژی Dri-FIT برای خشک نگه داشتن بدن.',
    price: 750000,
    stock: 50,
    rating: 4.6,
  },
  {
    id: 'p2',
    name: 'مت یوگا طرح‌دار',
    category: 'تجهیزات',
    images: ['https://picsum.photos/seed/mat1/400/400'],
    description: 'مت یوگا ضد لغزش با ضخامت مناسب و طرح‌های زیبا.',
    price: 450000,
    stock: 100,
    rating: 4.8,
  },
  {
    id: 'p3',
    name: 'پودر پروتئین وی ۱ کیلویی',
    category: 'تغذیه',
    images: ['https://picsum.photos/seed/protein1/400/400'],
    description: 'پروتئین وی کنسانتره با کیفیت بالا برای عضله‌سازی و ریکاوری.',
    price: 1800000,
    stock: 30,
    rating: 4.5,
  },
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: '۵ نکته کلیدی برای شروع ورزش در خانه',
    category: 'نکات سلامتی',
    author: 'تیم اسپورتيفای هاب',
    date: '۱۴۰۳/۰۲/۲۰',
    summary: 'اگر به تازگی تصمیم گرفته‌اید ورزش را شروع کنید و امکان رفتن به باشگاه را ندارید، این نکات به شما کمک می‌کند تا در خانه به بهترین شکل تمرین کنید.',
    content: 'متن کامل مقاله در مورد نکات ورزش در خانه... این شامل برنامه‌ریزی، انتخاب تمرینات مناسب، گرم کردن و سرد کردن، و اهمیت تغذیه است.',
    imageUrl: 'https://picsum.photos/seed/article1/600/300',
    tags: ['ورزش در خانه', 'مبتدی', 'سلامتی']
  },
  {
    id: 'a2',
    title: 'راهنمای کامل تغذیه برای ورزشکاران',
    category: 'راهنمای تمرین',
    author: 'دکتر سمیرا افشار',
    date: '۱۴۰۳/۰۲/۱۸',
    summary: 'تغذیه مناسب نقش حیاتی در عملکرد ورزشی و ریکاوری دارد. در این مقاله به بررسی اصول تغذیه ورزشی می‌پردازیم.',
    content: 'متن کامل مقاله در مورد تغذیه ورزشی... شامل مباحثی چون ماکرونوترینت‌ها، میکرونوترینت‌ها، هیدراتاسیون، و مکمل‌های ورزشی.',
    imageUrl: 'https://picsum.photos/seed/article2/600/300',
    tags: ['تغذیه', 'ورزشکاران', 'رژیم غذایی']
  },
];

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'user123',
  name: 'کاربر نمونه',
  email: 'user@example.com',
  phone: '۰۹۱۲۳۴۵۶۷۸۹',
  profilePictureUrl: defaultUserImage,
  address: 'تهران، خیابان ولیعصر، کوچه نمونه، پلاک ۱'
};

export const MOCK_BOOKINGS: Booking[] = [
  {id: 'b1', type: 'venue', itemId: 'v1', itemName: 'زمین فوتبال چمن مصنوعی آزادی', date: '۱۴۰۳/۰۴/۱۵', time: '۱۶:۰۰-۱۸:۰۰', status: 'تایید شده', price: 250000},
  {id: 'b2', type: 'class', itemId: 'c1', itemName: 'کلاس یوگا آرامش درون', date: '۱۴۰۳/۰۴/۰۱', status: 'تایید شده', price: 800000},
];

export const MOCK_ORDERS: Order[] = [
  {id: 'o1', items: [{productId: 'p1', productName: 'تیشرت ورزشی مردانه نایک', quantity: 1, price: 750000}], totalAmount: 750000, orderDate: '۱۴۰۳/۰۳/۲۵', status: 'ارسال شده'},
];


export const NAV_LINKS = [
  { name: 'صفحه اصلی', path: Paths.HOME },
  { name: 'رزرو مکان ورزشی', path: Paths.VENUES },
  { name: 'کلاس‌ها', path: Paths.CLASSES },
  { name: 'مربیان', path: Paths.COACHES },
  { name: 'فروشگاه', path: Paths.SHOP },
  { name: 'مجله', path: Paths.BLOG },
];

export const SPORT_CATEGORIES_FEATURED = [
  { name: SportCategory.FOOTBALL, icon: FootballIcon, path: `${Paths.VENUES}?sport=${encodeURIComponent(SportCategory.FOOTBALL)}` },
  { name: SportCategory.SWIMMING, icon: SwimmingIcon, path: `${Paths.VENUES}?sport=${encodeURIComponent(SportCategory.SWIMMING)}` },
  { name: SportCategory.GYM, icon: GymIcon, path: `${Paths.CLASSES}?type=${encodeURIComponent(SportCategory.GYM)}` },
  { name: SportCategory.YOGA, icon: YogaIcon, path: `${Paths.CLASSES}?type=${encodeURIComponent(SportCategory.YOGA)}` },
  { name: SportCategory.TENNIS, icon: TennisIcon, path: `${Paths.VENUES}?sport=${encodeURIComponent(SportCategory.TENNIS)}` },
  { name: SportCategory.BASKETBALL, icon: BasketballIcon, path: `${Paths.VENUES}?sport=${encodeURIComponent(SportCategory.BASKETBALL)}` },
];


export const LOCATION_OPTIONS: FilterOption[] = [
    { id: 'loc_all', name: 'همه شهرها', value: '' },
    { id: 'loc_tehran', name: 'تهران', value: 'تهران' },
    { id: 'loc_isfahan', name: 'اصفهان', value: 'اصفهان' },
    { id: 'loc_shiraz', name: 'شیراز', value: 'شیراز' },
    { id: 'loc_mashhad', name: 'مشهد', value: 'مشهد' },
];

export const SPORT_TYPE_OPTIONS: FilterOption[] = Object.values(SportCategory).map(sport => ({
    id: `sport_${sport}`,
    name: sport,
    value: sport 
}));
SPORT_TYPE_OPTIONS.unshift({ id: 'sport_all', name: 'همه ورزش‌ها', value: '' });


export const CLASS_TYPE_OPTIONS: FilterOption[] = Object.values(SportCategory).map(cat => ({
    id: `class_cat_${cat}`,
    name: cat,
    value: cat
}));
CLASS_TYPE_OPTIONS.unshift({ id: 'class_cat_all', name: 'همه دسته‌ها', value: '' });


export const SKILL_LEVEL_OPTIONS: FilterOption[] = Object.values(SkillLevel).map(level => ({
    id: `skill_${level}`,
    name: level,
    value: level
}));
SKILL_LEVEL_OPTIONS.unshift({ id: 'skill_all', name: 'همه سطوح', value: '' });

export const COACH_SPECIALTY_OPTIONS: FilterOption[] = Object.values(SportCategory).map(spec => ({
    id: `spec_${spec}`,
    name: spec,
    value: spec
}));
COACH_SPECIALTY_OPTIONS.unshift({ id: 'spec_all', name: 'همه تخصص‌ها', value: '' });

export const PRODUCT_CATEGORY_OPTIONS: FilterOption[] = [
    { id: 'prod_cat_all', name: 'همه دسته‌بندی‌ها', value: '' },
    { id: 'prod_cat_clothing', name: 'پوشاک', value: 'پوشاک' },
    { id: 'prod_cat_equipment', name: 'تجهیزات', value: 'تجهیزات' },
    { id: 'prod_cat_nutrition', name: 'تغذیه', value: 'تغذیه' },
];

export const ARTICLE_CATEGORY_OPTIONS: FilterOption[] = [
    { id: 'article_cat_all', name: 'همه دسته‌بندی‌ها', value: '' },
    { id: 'article_cat_health', name: 'نکات سلامتی', value: 'نکات سلامتی' },
    { id: 'article_cat_training', name: 'راهنمای تمرین', value: 'راهنمای تمرین' },
    { id: 'article_cat_news', name: 'اخبار ورزشی', value: 'اخبار ورزشی' },
];
