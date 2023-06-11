import React, { useEffect, useState } from "react";
import { fetchAllTours } from "../../Services/tourService";
import { getAllReviews } from "../../Services/reviewServices";
import { fetchUserById } from "../../Services/userService";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import { useNavigate } from "react-router-dom";
import './AdminTours.css';

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [Orgainzers , setOrgainzers] = useState([]);
  const navigate = useNavigate();
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  const goToTourPage = (tourId) => {
    navigate(`/tour/${tourId}`);
  };
  
  useEffect(() => {
    const fetchTours = async () => {
      const res = await fetchAllTours();
      setTours(res);
      console.log(res);
    };

    const fetchReviews = async () => {
      const res = await getAllReviews();
      setReviews(res.data);
    };
    
    fetchTours();
    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchOrganizers = async () => {
      let organizers = [];

      for(let i = 0 ; i < tours.length ; i+=1){
        const res = await fetchUserById(tours[i].organizerId);
        console.log(res);
        organizers.push(res);
      }
      setOrgainzers(organizers);
    }
    
    if (tours.length > 0) {
      fetchOrganizers();
    }
  }, [tours]);
  

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Tours
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Reviews
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          {tours && tours.map((tour) => {
            const organizer = Orgainzers.find(org => org._id === tour.organizerId);
            return (
              <div className="tour-card"  onClick={() => goToTourPage(tour._id)}>
              <img className="img-fit" src={tour.photoTimeline} alt="description" />
                <h2>{tour.name}</h2>
                <p>{tour.desc}</p>
                <p>Price:{tour.price}$</p>
                {organizer && <p>Organized by: {organizer.firstName} {organizer.lastName}</p>}
                {/* Display other tour info here */}
                
              </div>
            )
          })}
        </TabPane>
        <TabPane tabId="2">
          {reviews && reviews.map((review) => (
            <div className="review-card">
              <h2>{review.text}</h2>
              <p>
                Rating: 
                {[...Array(5)].map((star, i) => {
                  return <FontAwesomeIcon icon={faStar} color={i < review.rating ? 'gold' : 'gray'} />
                })}
              </p>
              {/* Display other review info here */}
            </div>
          ))}
        </TabPane>
      </TabContent>
    </div>
  );
  
}

export default AdminTours;
