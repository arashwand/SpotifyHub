
import React from 'react';

interface StarRatingProps {
  rating: number; // Value from 0 to 5
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showValue?: boolean;
}

const StarIcon: React.FC<{ filled: boolean, halfFilled: boolean, color: string, sizeClass: string }> = ({ filled, halfFilled, color, sizeClass }) => (
  <svg
    className={`inline-block ${sizeClass} ${filled || halfFilled ? color : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    {halfFilled ? (
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.377 2.457a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.377-2.457a1 1 0 00-1.175 0l-3.377 2.457c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.24 9.393c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69L9.049 2.927zM10 4.585v9.522L12.022 12.7l.002-.001.06-.184L10 4.585z"/>
    ) : (
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.377 2.457a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.377-2.457a1 1 0 00-1.175 0l-3.377 2.457c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.24 9.393c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69L9.049 2.927z" />
    )}
  </svg>
);


const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5, size = 'md', className = '', showValue = false }) => {
  const starColor = 'text-yellow-400';
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const stars = Array.from({ length: maxStars }, (_, index) => {
    const starValue = index + 1;
    const filled = rating >= starValue;
    const halfFilled = rating >= starValue - 0.5 && rating < starValue;
    return <StarIcon key={index} filled={filled} halfFilled={halfFilled} color={starColor} sizeClass={sizeClasses[size]} />;
  });

  return (
    <div className={`flex items-center ${className}`}>
      {stars}
      {showValue && <span className={`ml-2 rtl:mr-2 rtl:ml-0 text-sm text-light-text`}>({rating.toFixed(1)})</span>}
    </div>
  );
};

export default StarRating;
