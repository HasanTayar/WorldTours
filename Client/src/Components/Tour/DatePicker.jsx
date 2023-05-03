import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

const CustomDatePicker = ({ tourDays, onSelectDate }) => {
  const [startDate, setStartDate] = useState(null);

  const handleDateChange = (date) => {
    setStartDate(date);
    onSelectDate(date);
  };

  const isSelectable = (date) => {
    const selectedDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + tourDays - 1);

    return !startDate || (selectedDate >= startDate && selectedDate <= endDate);
  };

  return (
    <div className="custom-date-picker">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        minDate={new Date()}
        inline
        calendarClassName="custom-calendar"
        dayClassName={(date) => (isSelectable(date) ? 'custom-day selectable-day' : 'custom-day')}
        popperClassName="custom-popper"
        customInput={<FontAwesomeIcon icon={faCalendarAlt} size="2x" />}
      />
    </div>
  );
};

export default CustomDatePicker;
