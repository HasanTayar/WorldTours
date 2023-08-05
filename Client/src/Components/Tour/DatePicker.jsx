import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';
import { fetchOrdersForTour } from "../../Services/orderService";

const CustomDatePicker = ({ tourId, tourDays, onSelectDate }) => {
  const [startDate, setStartDate] = useState(null);
  const [approvedDates, setApprovedDates] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await fetchOrdersForTour(tourId);
      const approved = orders.map(order => {
        const start = new Date(order.selectedDate);
        const end = addDays(new Date(start), tourDays - 1);
        return { start, end };
      });

      setApprovedDates(approved);
    };

    fetchOrders();
  }, [tourId]);

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const handleDateChange = (date) => {
    if(isSelectable(date)) {
      setStartDate(date);
      onSelectDate(date);
    }
  };

  const isApproved = (date) => {
    return approvedDates.some(approvedDate => 
      date >= approvedDate.start && date <= approvedDate.end
    );
  };

  const isSelectable = (date) => {
    return !isApproved(date);
  };

  const dayClassNames = (date) => {
    let classNames = 'custom-day';

    if (isSelectable(date)) {
      classNames += ' selectable-day';
    }

    if (isApproved(date)) {
      classNames += ' approved-day';
    }

    return classNames;
  };

  return (
    <div className="custom-date-picker">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        minDate={new Date()}
        inline
        calendarClassName="custom-calendar"
        dayClassName={dayClassNames}
        popperClassName="custom-popper"
        customInput={<FontAwesomeIcon icon={faCalendarAlt} size="2x" />}
      />
    </div>
  );
};

export default CustomDatePicker;
