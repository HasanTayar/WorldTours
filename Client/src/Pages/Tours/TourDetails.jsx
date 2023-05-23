import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchTourAndOrganizer } from "../../Services/tourService";
import "./TourDetails.scss";
import OrganizerDetails from "../../Components/Tour/OrganizerDetails";
import CustomDatePicker from "../../Components/Tour/DatePicker";
import { Link } from "react-router-dom";
const TourDetails = ({isLoggedIn , user}) => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState({});
  const [organizer, setOrganizer] = useState({});
  const [showOrganizerPopup, setShowOrganizerPopup] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    async function fetchTourOrganizer() {
      const { tour, organizer } = await fetchTourAndOrganizer(tourId);
      setTour(tour);
      setOrganizer(organizer);
    }

    fetchTourOrganizer();
  }, [tourId]);

  const handleOrganizerClick = () => {
    setShowOrganizerPopup(true);
  };

  const closeOrganizerPopup = () => {
    setShowOrganizerPopup(false);
  };

  const handleBookNowClick = () => {
    navigate(
      `/Booking/tour/${tourId}?/&tourId=${tourId}&selectedDate=${selectedDate}&price=${tour.price}&tourDays=${tour.days.length}&userId=${user._id}`
    );
  };

  return (
    <>  {user._id === tour.organizerId && (
      <Link to={`/edit-tour/${tourId}`} className="btn btn-secondary mt-2" >Edit Tour</Link>
    )}
    <div className="tour-details container">
      <div className="row">
      
        <div className="col-lg-8">
      
          <div className="tour-title">
            <img
              src={tour.photoTimeline}
              className="img-fluid"
              alt="Tour Cover"
            />
            <h1>{tour.name}</h1>
          </div>
          <p>{tour.desc}</p>
          <p>Rating: {parseFloat(tour.rating).toFixed(1)}</p>
          <p>Price:{tour.price}</p>
          <div className="day-nav btn-group">
            {tour.days &&
              tour.days.map((day, index) => (
                <button
                  key={index}
                  className={`btn btn-outline-secondary ${
                    index === activeDayIndex ? "active" : ""
                  }`}
                  onClick={() => setActiveDayIndex(index)}
                >
                  Day {index + 1}
                </button>
              ))}
          </div>

          {tour.days && (
            <div className="day-details mt-3">
              <h3>{tour.days[activeDayIndex].dayName}</h3>
              <p>{tour.days[activeDayIndex].desc}</p>
              {tour.days[activeDayIndex].photo.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`Day ${activeDayIndex + 1} photo ${i}`}
                  className="img-fluid mb-2"
                  style={{width:"300px" , height:"200px" , padding:"10px"}}
                />
              ))}
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <OrganizerDetails
            organizer={organizer}
            handleClose={handleOrganizerClick}
            show={showOrganizerPopup}
            handleCloseModal={closeOrganizerPopup}
          />
          {isLoggedIn && (
            <>
              <div className="date-picker">
                <CustomDatePicker
                  tourDays={tour.days ? tour.days.length : 0}
                  onSelectDate={(date) => {
                    setSelectedDate(date);
                    console.log(date);
                  }}
                />
              </div>
              <button
                className="book-now btn btn-primary"
                onClick={handleBookNowClick}
              >
                Book Now
              </button>
            </>
          )}
          </div>
          </div>
      </div>
      </>
  );
};

export default TourDetails;
