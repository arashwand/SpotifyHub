
import React from 'react'; // Added import

export enum SportCategory {
  FOOTBALL = "فوتبال",
  SWIMMING = "شنا",
  GYM = "باشگاه بدنسازی",
  YOGA = "یوگا",
  TENNIS = "تنیس",
  MARTIAL_ARTS = "هنرهای رزمی",
  BASKETBALL = "بسکتبال",
  VOLLEYBALL = "والیبال",
  PILATES = "پیلاتس",
  GENERAL_FITNESS = "تناسب اندام عمومی",
}

export interface Amenity {
  id: string;
  name: string;
  icon?: React.ReactNode; 
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Venue {
  id: string;
  name: string;
  sportType: SportCategory;
  location: string;
  city: string;
  images: string[]; 
  mapLink?: string; 
  availableTimeSlots: string[]; 
  pricePerHour: number;
  rating: number; 
  reviews: Review[];
  amenities: Amenity[];
  description: string;
}

export enum SkillLevel {
  BEGINNER = "مبتدی",
  INTERMEDIATE = "متوسط",
  ADVANCED = "پیشرفته",
  ALL_LEVELS = "تمامی سطوح",
}

export interface ClassItem {
  id: string;
  name: string;
  classType: SportCategory | string; 
  location: string;
  skillLevel: SkillLevel;
  instructorId: string;
  instructorName: string;
  schedule: string; 
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews: Review[];
}

export interface Coach {
  id: string;
  name: string;
  specialties: (SportCategory | string)[];
  location: string;
  rating: number; 
  bio: string;
  qualifications: string[];
  reviews: Review[];
  photoUrl: string;
  contactInfo?: string; 
  experienceYears: number;
}

export interface Product {
  id: string;
  name: string;
  category: string; 
  images: string[];
  description: string;
  price: number;
  stock: number;
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Article {
  id: string;
  title: string;
  category: string; 
  author: string;
  date: string;
  summary: string;
  content: string; 
  imageUrl: string;
  tags?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePictureUrl?: string;
  address?: string;
}

export interface Booking {
  id: string;
  type: 'venue' | 'class';
  itemId: string;
  itemName: string;
  date: string;
  time?: string; 
  status: 'تایید شده' | 'در انتظار' | 'لغو شده';
  price: number;
}

export interface Order {
  id: string;
  items: { productId: string, productName: string, quantity: number, price: number }[];
  totalAmount: number;
  orderDate: string;
  status: 'در حال پردازش' | 'ارسال شده' | 'تحویل داده شده' | 'لغو شده';
}

export interface PageItem {
  type: 'venue' | 'class' | 'coach' | 'product' | 'article';
  data: Venue | ClassItem | Coach | Product | Article;
}

export interface FilterOption {
  id: string;
  name: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  name: string; // e.g. "نوع ورزش"
  options: FilterOption[];
  type: 'select' | 'checkbox' | 'radio' | 'range'; // For future expansion
}

export const Paths = {
  HOME: '/',
  VENUES: '/venues',
  CLASSES: '/classes',
  COACHES: '/coaches',
  SHOP: '/shop',
  BLOG: '/blog',
  PROFILE: '/profile',
  LOGIN: '/login',
  CART: '/cart', // Added for clarity
};
