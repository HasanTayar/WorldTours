import React, { useState, useEffect } from "react";
import TopPicks from "../../Components/Home/TopPicks";
import NearbyTours from "../../Components/Home/NearbyTours";
import PopularTours from "../../Components/Home/PopularTours";
import { fetchAllTours, getNearbyTours } from "../../Services/tourService";
import { getUserSearches } from "../../Services/serachService";
import { getUserLocation } from "../../Services/Google/locationService";
import { Container } from "react-bootstrap";
import Header from "../../Components/Home/Headr";
import "./Home.css"; 
//:: TODO: Fix the issue with showing the nearby tours if not found


const Home = ({ isLoggedIn }) => {
  const [location, setLocation] = useState(null);
  const [topPicks, setTopPicks] = useState([]);
  const [popularTours, setPopularTours] = useState([]);
  const [nearbyTours, setNearbyTours] = useState([]);

  useEffect(() => {
    fetchAllTours().then((tours) => {
      setPopularTours(tours);
      setTopPicks(tours.filter((tour) => tour.isPopular === true));
    });

    getUserLocation()
      .then((userLocation) => {
        setLocation(userLocation);
        getNearbyTours(userLocation.latitude, userLocation.longitude)
          .then((tours) => setNearbyTours(tours))
          .catch((error) => console.error("Error getting nearby tours:", error));
      })
      .catch((error) => console.error("Error getting user location:", error));

    if (isLoggedIn) {
      getUserSearches().then((data) => setTopPicks(data.topPicks));
    }
  }, [isLoggedIn]);

  return (
    <div className="home-container">
      {/* <Header /> */}

      {isLoggedIn && topPicks.length > 0 && (
        <div className="home-section">
          <h2>Top Picks For You</h2>
          <TopPicks topPicks={topPicks} />
        </div>
      )}

      <div className="home-section">
        <h2>Popular Tours</h2>
        <PopularTours popularTours={popularTours} />
      </div>

      {nearbyTours.length > 0 && (
        <div className="home-section">
          <h2>Nearby Tours</h2>
          <NearbyTours nearbyTours={nearbyTours} />
        </div>
      )}
    </div>
  );
};

export default Home;
