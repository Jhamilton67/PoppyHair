import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BookNowButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
}

const BookNowButton: React.FC<BookNowButtonProps> = ({ 
  className = '',
  variant = 'primary',
  children
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const baseStyles = "w-full sm:w-[160px] h-[48px] rounded font-medium transition-all duration-200 flex items-center justify-center hover:transform hover:translate-y-[-2px] text-base";
  const variantStyles = variant === 'primary'
    ? "bg-stone-700 text-cream-light hover:bg-stone-800"
    : "bg-cream-light text-stone-800 hover:bg-cream";

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {children || 'Enquire Now'}
      </button>
    </div>
  );
};

export default BookNowButton;