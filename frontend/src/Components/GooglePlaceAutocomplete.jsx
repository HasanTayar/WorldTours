import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const GooglePlaceAutocomplete = ({ onLocationSelect, field, className }) => {
  const autocompleteRef = useRef(null);

  const onLoad = (autocomplete) => {
    console.log('autocomplete:', autocomplete);
    autocompleteRef.current = autocomplete;
  };

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      onLocationSelect(place);
    }
  };

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceSelect}>
      <input type="text" {...field} className={className} />
    </Autocomplete>
  );
};

export default GooglePlaceAutocomplete;
