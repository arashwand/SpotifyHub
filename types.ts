
import React from 'react'; 

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
  rating: number; 
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
  availableTimeSlots: { 
    [dayOfWeek: string]: string[]; 
  };
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

export interface BookingSlot {
  date: Date; // This is Date object for internal calculations in VenuesPage
  timeSlot: string;
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
  recurrenceType?: 'once' | 'weekly' | 'monthly';
  numberOfSessions?: number;
  bookedSlots?: BookingSlot[]; // Uses Date objects here for user display logic
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
  name: string; 
  options: FilterOption[];
  type: 'select' | 'checkbox' | 'radio' | 'range'; 
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
  CART: '/cart', 
};

// New Cart Item Structure for supporting products and venue bookings
export interface ProductCartItem {
  type: 'product';
  id: string; // Product ID
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  category: string; // Added category
}

export interface VenueBookingCartItem {
  type: 'venue_booking';
  id: string; // Unique ID for this booking instance, e.g., `booking-${venueId}-${timestamp}`
  venueId: string;
  venueName: string;
  venueImage: string;
  slots: { date: string, timeSlot: string }[]; // Store dates as ISO strings for cart
  pricePerSlot: number;
  totalPrice: number;
}

export type CartDisplayItem = ProductCartItem | VenueBookingCartItem;
