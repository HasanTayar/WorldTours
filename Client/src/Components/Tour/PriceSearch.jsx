import { useState } from "react";
import { Form } from "react-bootstrap";

const PriceSearch = ({ onChange }) => {
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");

  const handlePriceChange = () => {
    const priceRange = {};
    if (lowPrice) {
      priceRange.lowPrice = parseInt(lowPrice);
    }
    if (highPrice) {
      priceRange.highPrice = parseInt(highPrice);
    }
    onChange({ priceRange });
  };

  return (
    <>
      <Form.Group controlId="lowPrice">
        <Form.Label>Low Price</Form.Label>
        <Form.Control
          type="number"
          name="lowPrice"
          value={lowPrice}
          onChange={(e) => setLowPrice(e.target.value)}
          onBlur={handlePriceChange}
        />
      </Form.Group>

      <Form.Group controlId="highPrice">
        <Form.Label>High Price</Form.Label>
        <Form.Control
          type="number"
          name="highPrice"
          value={highPrice}
          onChange={(e) => setHighPrice(e.target.value)}
          onBlur={handlePriceChange}
        />
      </Form.Group>
    </>
  );
};

export default PriceSearch;
