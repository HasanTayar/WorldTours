import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const PriceSearch = ({ onChange }) => {
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");

  useEffect(() => {
    onChange({ priceRange: { lowPrice, highPrice } });
  }, [lowPrice, highPrice, onChange]);

  console.log("highprice = ", highPrice , "lowprice = " , lowPrice);
  
  return (
    <>
      <Form.Group controlId="lowPrice">
        <Form.Label>Low Price</Form.Label>
        <Form.Control
          type="number"
          name="lowPrice"
          value={lowPrice}
          onChange={(e)=>{setLowPrice(e.target.value)}}
        />
      </Form.Group>

      <Form.Group controlId="highPrice">
        <Form.Label>High Price</Form.Label>
        <Form.Control
          type="number"
          name="highPrice"
          value={highPrice}
          onChange={(e)=>{setHighPrice(e.target.value)}}
        />
      </Form.Group>
    </>
  );
};

export default PriceSearch;
  