import { useState } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { createSearch } from "../../Services/serachService";

// Import components for each type of search criteria
import NameSearch from "./NameSearch";
import TagSearch from "./TagSearch";
import PriceSearch from "./PriceSearch";

const Search = ({ onSearch, tours }) => {
  const [searchData, setSearchData] = useState({});
  const [searchType, setSearchType] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault(); 

    try {
      const { data } = await createSearch(searchData);
      
      onSearch(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setSearchData({});  // clear the search data when the type changes
  }

  // Extract all unique tags from all tours
  let allTags = [];
  if (tours && tours.length) {
    allTags = [...new Set(tours.flatMap(tour => tour.tags))];
  }

  return (
    <Form onSubmit={handleSearch}>
      {/* Dropdown to select search criteria */}
      <Dropdown onSelect={handleSearchTypeChange}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Choose Search Criteria
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="name">Name</Dropdown.Item>
          <Dropdown.Item eventKey="tags">Tags</Dropdown.Item>
          <Dropdown.Item eventKey="price">Price</Dropdown.Item>
          {/* Add more Dropdown.Items here for the other search criteria */}
        </Dropdown.Menu>
      </Dropdown>
    
      {/* Conditionally render the correct search component */}
      {searchType === "name" && <NameSearch onChange={setSearchData} />}
      {searchType === "tags" && <TagSearch tags={allTags} onChange={setSearchData} />}
      {searchType === "price" && <PriceSearch onChange={setSearchData} />}

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default Search;
