import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { createSearch } from "../../Services/serachService";
import GooglePlaceAutocomplete from "../../Services/Google/GooglePlaceAutocomplete";

const Search = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    location: "",
    priceRange: {
      minPrice: 0,
      maxPrice: 0,
    },
  });

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createSearch(searchData);

      onSearch(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationSelect = (place) => {
    setSearchData({ ...searchData, location: place.formatted_address });
  };

  const handlePriceChange = (field) => (event) => {
    setSearchData({
      ...searchData,
      priceRange: {
        ...searchData.priceRange,
        [field]: parseInt(event.target.value, 10),
      },
    });
  };

  return (
    <Form onSubmit={handleSearch}>
      <Row>
        <Col sm={12} md={12}>
          <FormGroup>
            <Label for="location">Location</Label>
            <GooglePlaceAutocomplete
              onLocationSelect={handleLocationSelect}
              field={searchData.location}
              className="form-control"
              controlId="location"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={2} sm={2} md={2}>
          <FormGroup>
            <Label for="minPrice">{`Min Price: ${searchData.priceRange.minPrice}`}</Label>
          </FormGroup>
        </Col>
        <Col xs={8} sm={8} md={8}>
          <FormGroup>
            <Label for="priceRange">Price Range</Label>
            <Input
              type="range"
              id="priceRange"
              min="0"
              max="100000"
              step="10"
              value={searchData.priceRange.maxPrice}
              onChange={handlePriceChange('maxPrice')}
            />
          </FormGroup>
        </Col>
        <Col xs={2} sm={2} md={2}>
          <FormGroup>
            <Label for="maxPrice">{`Max Price: ${searchData.priceRange.maxPrice}`}</Label>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button color="primary" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
