import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import "./Booking.scss";
import TourDetails from "../../Components/Booking/TourDetails";
import BookingForm from "../../Components/Booking/BookingForm";
import { Container, Form, Row, Col } from "react-bootstrap";
import { getTourById } from "../../Services/tourService";
import { getPaymentMethods } from "../../Services/paymentService";
import { addOrder } from "../../Services/orderService";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tourId = useRef("");
  const selectedDate = useRef("");
  const price = useRef("");
  const tourDays = useRef("");
  const userId = useRef("");
  const [tour, setTour] = useState({});
  const [savedCards, setSavedCards] = useState({});
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);
  
  const handleSubmit = async (bookingData) => {
    try {
      const orderData = {
        userId: userId.current,
        tourId: tourId.current,
        selectedDate: selectedDate.current,
        price: price.current,
        tourDays: tourDays.current,
        ...bookingData
      };
      const success = await addOrder(orderData);
      if (success) {
        console.log("Payment processed and order saved successfully");
        navigate("/success-order");
      } else {
        console.log("Error saving the order");
      }
    } catch (error) {
      console.log("Error processing payment and saving the order:", error);
    }
  };
  

  // To get the parm from the url
  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    if (!query.tourId || !query.selectedDate || !query.price) {
      console.error("One or more required query parameters are missing.");
      return;
    }

    const date = new Date(query.selectedDate);

    if (isNaN(date.getDate())) {
      console.error("Invalid date format.");
      return;
    }
    console.log(query);
    tourId.current = query.tourId;
    selectedDate.current = date;
    price.current = query.price;
    tourDays.current = query.tourDays;
    userId.current = query.userId;
    console.log(query.userId);
    // Fetch tour details
    getTourById(tourId.current).then((fetchedTour) => {
      setTour(fetchedTour);
    });
  }, [location]);

  useEffect(() => {
    const hasPaymentMethod = async () => {
      if (userId.current) {
        await getPaymentMethods(userId.current, setSavedCards);
        const hasPayment = savedCards && Object.keys(savedCards).length > 0;
        setHasPaymentMethod(hasPayment);
      }
    };
  
    hasPaymentMethod();
  }, [userId.current]);
  
  const redirectToProfile = () => {
    navigate("/profile");
  };

  return (
    <Container className="order-page">
      <Row>
        <Col>
          <h2>{tour.name}</h2>
          <TourDetails
            tour={tour}
            selectedDate={selectedDate.current}
            tourDays={tourDays.current}
            userId={userId}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <BookingForm
            onSubmit={handleSubmit}
            hasPaymentMethod={hasPaymentMethod}
            redirectToProfile={redirectToProfile}
            savedCards={savedCards}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Booking;
