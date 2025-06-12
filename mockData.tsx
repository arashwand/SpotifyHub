
import React from 'react';
import { Venue, ClassItem, Coach, Product, Article, SportCategory, SkillLevel, Review, Amenity, Booking, Order, UserProfile, Paths, FilterOption } from './types';

// Import Icon components correctly
import { FootballIcon, SwimmingIcon, GymIcon, YogaIcon, TennisIcon, BasketballIcon, WifiIcon, ShowerIcon, LockerIcon, AirConIcon, WaterDispenserIcon, ParkingIcon } from './components/common/Icons';

// --- Directly define constants previously in constants.ts ---
export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', userId: 'u1', userName: 'علی رضایی', rating: 5, comment: 'عالی بود! خیلی تمیز و مرتب.', date: '۱۴۰۳/۰۲/۱۵' },
  { id: 'r2', userId: 'u2', userName: 'سارا محمدی', rating: 4, comment: 'امکانات خوبی داشت، فقط کمی شلوغ بود.', date: '۱۴۰۳/۰۲/۱۰' },
  { id: 'r3', userId: 'u3', userName: 'محمد حسینی', rating: 3, comment: 'متوسط بود، میتونست بهتر باشه.', date: '۱۴۰۳/03/01'},
];

export const AmenityIconDefaultClass = "w-4 h-4 text-currentColor";

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

export const PERSIAN_DAYS_OF_WEEK = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
export const PERSIAN_MONTH_NAMES = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

export const MOCK_HOLIDAYS: string[] = [
    "2024/07/28", // Example holiday
    "2024/08/05", // Another example
    "2024/12/25", // Christmas Day as an example
];
// --- End of directly defined constants ---


const defaultUserImage = 'https://picsum.photos/seed/user/100/100';

export const MOCK_AMENITIES: Amenity[] = [
  { id: 'am0', name: 'پارکینگ', icon: <ParkingIcon className={AmenityIconDefaultClass} /> },
  { id: 'am1', name: 'وای‌فای', icon: <WifiIcon className={AmenityIconDefaultClass} /> },
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
    availableTimeSlots: {
      "شنبه": ["۱۶:۰۰-۱۸:۰۰", "۱۸:۰۰-۲۰:۰۰"],
      "یکشنبه": ["۱۰:۰۰-۱۲:۰۰", "۱۴:۰۰-۱۶:۰۰"],
      "دوشنبه": ["۱۶:۰۰-۱۸:۰۰"],
      "سه‌شنبه": [],
      "چهارشنبه": ["۱۸:۰۰-۲۰:۰۰", "۲۰:۰۰-۲۲:۰۰"],
      "پنج‌شنبه": ["۱۰:۰۰-۱۲:۰۰", "۱۲:۰۰-۱۴:۰۰", "۱۴:۰۰-۱۶:۰۰"],
      "جمعه": ["۰۸:۰۰-۱۰:۰۰", "۱۰:۰۰-۱۲:۰۰"]
    },
    pricePerHour: 250000,
    rating: 4.5,
    reviews: MOCK_REVIEWS.slice(0, 2),
    amenities: MOCK_AMENITIES.slice(0,4),
    description: 'یک زمین فوتبال با کیفیت عالی و نورپردازی مناسب برای بازی در شب.'
  },
  {
    id: 'v2',
    name: 'استخر بین‌المللی انقلاب',
    sportType: SportCategory.SWIMMING,
    location: 'مجموعه ورزشی انقلاب، تهران',
    city: 'تهران',
    images: ['https://picsum.photos/seed/pool1/600/400', 'https://picsum.photos/seed/pool2/600/400'],
    availableTimeSlots: {
      "شنبه": ["۰۸:۰۰-۱۰:۰۰", "۱۰:۰۰-۱۲:۰۰", "۱۴:۰۰-۱۶:۰۰ (بانوان)"],
      "یکشنبه": ["۰۸:۰۰-۱۰:۰۰ (بانوان)", "۱۰:۰۰-۱۲:۰۰ (بانوان)", "۱۴:۰۰-۱۶:۰۰"],
      "دوشنبه": ["۰۸:۰۰-۱۰:۰۰", "۱۰:۰۰-۱۲:۰۰", "۱۴:۰۰-۱۶:۰۰ (بانوان)"],
      "سه‌شنبه": ["۰۸:۰۰-۱۰:۰۰ (بانوان)", "۱۰:۰۰-۱۲:۰۰ (بانوان)", "۱۴:۰۰-۱۶:۰۰", "۱۶:۰۰-۱۸:۰۰"],
      "چهارشنبه": ["۰۸:۰۰-۱۰:۰۰", "۱۰:۰۰-۱۲:۰۰", "۱۴:۰۰-۱۶:۰۰ (بانوان)"],
      "پنج‌شنبه": ["۰۸:۰۰-۱۰:۰۰ (بانوان)", "۱۰:۰۰-۱۲:۰۰", "۱۲:۰۰-۱۴:۰۰"],
      "جمعه": ["۰۸:۰۰-۱۰:۰۰", "۱۰:۰۰-۱۲:۰۰", "۱۲:۰۰-۱۴:۰۰"]
    },
    pricePerHour: 150000,
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
    availableTimeSlots: {
      "شنبه": ["۱۴:۰۰-۱۶:۰۰"],
      "یکشنبه": [],
      "دوشنبه": ["۱۸:۰۰-۲۰:۰۰", "۲۰:۰۰-۲۲:۰۰"],
      "سه‌شنبه": ["۱۷:۰۰-۱۹:۰۰"],
      "چهارشنبه": ["۱۸:۰۰-۲۰:۰۰"],
      "پنج‌شنبه": ["۱۶:۰۰-۱۸:۰۰", "۱۸:۰۰-۲۰:۰۰"],
      "جمعه": []
    },
    pricePerHour: 300000,
    rating: 4.2,
    reviews: [MOCK_REVIEWS[0]],
    amenities: MOCK_AMENITIES.slice(0,3),
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
  { name: SportCategory.FOOTBALL, icon: FootballIcon, path: `${Paths.VENUES}?sportType=${encodeURIComponent(SportCategory.FOOTBALL)}` },
  { name: SportCategory.SWIMMING, icon: SwimmingIcon, path: `${Paths.VENUES}?sportType=${encodeURIComponent(SportCategory.SWIMMING)}` },
  { name: SportCategory.GYM, icon: GymIcon, path: `${Paths.CLASSES}?classType=${encodeURIComponent(SportCategory.GYM)}` },
  { name: SportCategory.YOGA, icon: YogaIcon, path: `${Paths.CLASSES}?classType=${encodeURIComponent(SportCategory.YOGA)}` },
  { name: SportCategory.TENNIS, icon: TennisIcon, path: `${Paths.VENUES}?sportType=${encodeURIComponent(SportCategory.TENNIS)}` },
  { name: SportCategory.BASKETBALL, icon: BasketballIcon, path: `${Paths.VENUES}?sportType=${encodeURIComponent(SportCategory.BASKETBALL)}` },
];
