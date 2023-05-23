import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TourHeader from "../../Components/Booking/TourHeader";
import TourDetails from "../../Components/Booking/TourDetails";
import BookingForm from "../../Components/Booking/BookingForm";
import TourLocations from "../../Components/Booking/TourLocations";
import PaymentMethodForm from "../../Components/Booking/PaymentMethodForm";
import { getTourById } from "../../Services/tourService";
import { getPaymentMethods } from "../../Services/paymentService";
import { addOrder } from "../../Services/orderService";
import qs from "qs";
import "./Booking.scss";
const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tourId = useRef("");
  const selectedDate = useRef("");
  const price = useRef("");
  const tourDays = useRef("");
  const userId = useRef("");
  const [tour, setTour] = useState({});
  const [savedCards, setSavedCards] = useState([]);
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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

    tourId.current = query.tourId;
    selectedDate.current = date;
    price.current = query.price;
    tourDays.current = query.tourDays;
    userId.current = query.userId;

    // Fetch tour details
    getTourById(tourId.current).then((fetchedTour) => {
      if (fetchedTour) {
        setTour(fetchedTour);
      }
    });

    // Fetch payment methods
    getPaymentMethods(userId.current).then((fetchedCards) => {
      if (fetchedCards && fetchedCards.length > 0) {
        setSavedCards(fetchedCards);
        setHasPaymentMethod(true);
      }
    });
  }, [location]);

  const handlePaymentSubmit = async () => {
    // Prepare the order data
    const orderData = {
      tourId: tourId.current,
      userId: userId.current,
      selectedDate: selectedDate.current,
      price: price.current,
      tourDays: tourDays.current,
      paymentMethod: selectedCard,
      phone,
      email,
      name,
    };

    // Call addOrder function
    const isOrderAdded = await addOrder(orderData);
    if (isOrderAdded) {
      console.log("Order has been successfully added.");
      navigate('/Payment-Success');
    } else {
      console.log("Error adding order.");
    }
  };

  const handleFormSubmit = () => {
      handlePaymentSubmit();
  };

  const redirectToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="Booking">
      <TourHeader tour={tour} />
      <TourDetails tour={tour} />
      <h2 style={{ alignItems: "left" }}>Cities:</h2>
      <TourLocations tour={tour} />
      <PaymentMethodForm
        savedCards={savedCards}
        hasPaymentMethod={hasPaymentMethod}
        redirectToProfile={redirectToProfile}
        handlePaymentSubmit={handlePaymentSubmit}
        setSelectedCard={setSelectedCard}
      />
      <BookingForm
        onSubmit={handleFormSubmit}
        setName={setName}
        setEmail={setEmail}
        setPhone={setPhone}
      />
    </div>
  );
};

export default Booking;

