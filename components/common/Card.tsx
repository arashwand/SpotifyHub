import React from 'react';
import StarRating from './StarRating';
import Button from './Button';
import { Venue, ClassItem, Coach, Product, Article } from '../../types'; // Adjust path if needed

type Item = Venue | ClassItem | Coach | Product | Article;

interface CardProps {
  item: Item;
  type: 'venue' | 'class' | 'coach' | 'product' | 'article';
  onDetailsClick?: (item: Item) => void;
  onActionClick?: (item: Item) => void; // e.g., Add to Cart, Book Now
  actionText?: string;
}

const getDisplayName = (item: Item): string => {
  if ('name' in item && typeof item.name === 'string') {
    return item.name;
  }
  if ('title' in item && typeof (item as Article).title === 'string') {
    return (item as Article).title;
  }
  return 'عنوان نامشخص';
};


const Card: React.FC<CardProps> = ({ item, type, onDetailsClick, onActionClick, actionText }) => {
  const defaultImage = 'https://picsum.photos/seed/placeholder/400/300';
  
  let imageUrl: string = defaultImage;
  if ('images' in item && item.images && item.images.length > 0) {
    imageUrl = item.images[0];
  } else if ('image' in item && typeof item.image === 'string') {
    imageUrl = item.image;
  } else if ('photoUrl' in item && typeof item.photoUrl === 'string') {
    imageUrl = item.photoUrl;
  } else if ('imageUrl' in item && typeof item.imageUrl === 'string') {
    imageUrl = item.imageUrl;
  }

  const displayName = getDisplayName(item);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col">
      <div className="relative h-48 sm:h-56 w-full">
        <img src={imageUrl} alt={displayName} className="w-full h-full object-cover" />
        {('price' in item || 'pricePerHour' in item) && (
             <div className="absolute top-2 left-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded">
                {type === 'venue' && `${(item as Venue).pricePerHour.toLocaleString('fa-IR')} تومان/ساعت`}
                {type === 'class' && `${(item as ClassItem).price.toLocaleString('fa-IR')} تومان`}
                {type === 'product' && `${(item as Product).price.toLocaleString('fa-IR')} تومان`}
            </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-vazir font-semibold text-dark mb-1 truncate" title={displayName}>
            {displayName}
          </h3>
          
          {type === 'venue' && <p className="text-sm text-light-text mb-1 truncate">{(item as Venue).location}</p>}
          {type === 'class' && <p className="text-sm text-light-text mb-1">مربی: {(item as ClassItem).instructorName}</p>}
          {type === 'coach' && <p className="text-sm text-light-text mb-1 truncate">{ (item as Coach).specialties.join('، ') }</p>}
          {type === 'product' && <p className="text-sm text-light-text mb-1">دسته: {(item as Product).category}</p>}
          {type === 'article' && <p className="text-sm text-light-text mb-1">نویسنده: {(item as Article).author}</p>}

          {('rating' in item && typeof item.rating === 'number') && (
            <StarRating rating={item.rating} size="sm" className="mb-2" showValue />
          )}

          {type === 'article' && (
            <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-3">{(item as Article).summary}</p>
          )}
        </div>

        <div className="mt-auto pt-3">
          {onDetailsClick && (
            <Button variant="light" size="sm" onClick={() => onDetailsClick(item)} fullWidth className="mb-2">
              مشاهده جزئیات
            </Button>
          )}
          {onActionClick && actionText && (
            <Button variant="primary" size="sm" onClick={() => onActionClick(item)} fullWidth>
              {actionText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;