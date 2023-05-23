
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcAmex, faCcDinersClub, faCcDiscover, faCcJcb } from "@fortawesome/free-brands-svg-icons";
import { faCreditCard , faMinus } from "@fortawesome/free-solid-svg-icons";

const SavedCards = ({ savedCards, handleDeleteCard }) => {

  const getCardType = (cardNumber) => {
    if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cardNumber)) {
      return <FontAwesomeIcon icon={faCcVisa} style={{color: "#005eff" , width:"50px" , height:"50px"}} /> 
    } else if (/^5[1-5][0-9]{14}$/.test(cardNumber)) {
      return <FontAwesomeIcon icon={faCcMastercard} style={{color: "#ff8800" , width:"50px" , height:"50px"}} />; 
    } else if (/^3[47][0-9]{13}$/.test(cardNumber)) {
      return <FontAwesomeIcon icon={faCcAmex} style={{color: "#12520a" , width:"50px" , height:"50px"}} />; 
    } else if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(cardNumber)) {
      return <FontAwesomeIcon icon={faCcDinersClub} />; 
    } else if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(cardNumber)) {
      return <FontAwesomeIcon icon={faCcDiscover} />; 
    } else if (/^(?:2131|1800|35\d{3})\d{11}$/.test(cardNumber)) {
      return <FontAwesomeIcon icon={faCcJcb} />; 
    } else {
      return <FontAwesomeIcon icon={faCreditCard} />; 
    }
  };

  return (
    <div className="add-payment-form">
      {savedCards.length > 0 ? (
        savedCards.map((savedCard) => {
          if (!savedCard.cardNumber) {
            console.error('Card number missing:', savedCard);
            return (
              <div key={savedCard._id} className="saved-card-error">
                Error: Missing card number for saved card ID {savedCard._id}
              </div>
            );
          }

          const maskedCardNumber = savedCard.cardNumber
            .slice(-4)
            .padStart(savedCard.cardNumber.length, '*');

          return (
            <div key={savedCard._id} className="saved-card">
              {getCardType(savedCard.cardNumber)}
              <span>{`**** **** **** ${maskedCardNumber}`}</span>
              <Button              
                variant="danger"
                size="sm"
                onClick={() => handleDeleteCard(savedCard._id)}
              >
               <FontAwesomeIcon icon={faMinus} />
              </Button>
            </div>
          );
        })
      ) : (
        <div className="no-saved-cards">No saved cards found.</div>
      )}
    </div>
  );
};

export default SavedCards;
