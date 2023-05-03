
import React from 'react';

const TourDetails = ({ tour, selectedDate, tourDays , userId }) => {
  return (
    <ul>
      <li>Start date: {selectedDate && new Date(selectedDate).toLocaleDateString()}</li>
      <li>
        End date: {selectedDate && new Date(selectedDate.getTime() + (tourDays - 1) * 86400000).toLocaleDateString()}
      </li>
      <li>Price: {tour.price}$</li>
    </ul>
  );
};

export default TourDetails;
