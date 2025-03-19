import React from 'react';
import { Calendar } from 'lucide-react';
import BookNowButton from './BookNowButton';

const BookingButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <BookNowButton 
        className="!w-auto min-w-[120px] px-4 sm:px-6 shadow-lg"
        variant="primary"
      >
        <Calendar className="h-5 w-5 mr-2" />
        <span className="font-medium text-sm sm:text-base">Enquire Now</span>
      </BookNowButton>
    </div>
  );
};

export default BookingButton;