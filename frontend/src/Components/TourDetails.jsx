import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from '../css/TourDetails.module.scss';
import OrganizerDetails from './OrganizerDetails';
import CustomDatePicker from "./DatePicker";
const TourDetails = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState({});
  const [organizer, setOrganizer] = useState({});
  const [showOrganizerPopup, setShowOrganizerPopup] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [price , setPrice] = useState(0);
  useEffect(() => {
    const fetchTourAndOrganizer = async () => {
      try {
        const response = await axios.get(`/api/tour/${tourId}`);
        setTour(response.data);

        const organizerResponse = await axios.get(`/api/user/id/${response.data.organizerId}`);
        setOrganizer(organizerResponse.data);
      } catch (error) {
        console.error("Error fetching tour and organizer details:", error);
      }
    };

    fetchTourAndOrganizer();
  }, [tourId]);

  const handleOrganizerClick = () => {
    setShowOrganizerPopup(true);
  };

  const closeOrganizerPopup = () => {
    setShowOrganizerPopup(false);
  };

  const handleBookNowClick = () => {
    navigate(`/Booking/tour/${tourId}?/&tourId=${tourId}&selectedDate=${selectedDate}&price=${tour.price}&tourDays=${tour.days.length}`);
  };
  
  
  

  return (
    <div className={styles["tour-details"]}>
      <div className={styles["top-section"]}>
      
      </div>
      <div className={styles["tour-info"]}>
        <div className={styles["tour-title"]}>
          <img src={tour.photoTimeline} />
          <h1>{tour.name}</h1>
        </div>
        <p>{tour.desc}</p>
        <p>Rating: {parseFloat(tour.rating).toFixed(1)}</p>
  
        <div className={styles["day-nav"]}>
          {tour.days &&
            tour.days.map((day, index) => (
              <button
                key={index}
                className={`${styles["day-nav-item"]} ${index === activeDayIndex ? "active" : ""}`}
                onClick={() => setActiveDayIndex(index)}
              >
                Day {index + 1}
              </button>
            ))}
        </div>
  
        {tour.days && (
          <div className={styles["day-details"]}>
            <h3>{tour.days[activeDayIndex].dayName}</h3>
            <p>{tour.days[activeDayIndex].desc}</p>
            {tour.days[activeDayIndex].photo.map((photo, i) => (
              <img key={i} src={photo} alt={`Day ${activeDayIndex + 1} photo ${i}`} />
            ))}
          </div>
        )}
      </div>
  
      <div className={styles["right-side"]}>
      <OrganizerDetails
          organizer={organizer}
          handleClose={handleOrganizerClick}
          show={showOrganizerPopup}
          handleCloseModal={closeOrganizerPopup}
        />
        <div className={styles["date-picker"]}>
        <div className="date-picker">
        <CustomDatePicker
          tourDays={tour.days ? tour.days.length : 0}
          onSelectDate={(date) => {
          setSelectedDate(date);
          console.log(date);
  }}
/>

</div>
        </div>
        <button className={styles["book-now"]} onClick={handleBookNowClick}>
          Book Now
        </button>
      </div>
    </div>
  );
  
};

export default TourDetails;
