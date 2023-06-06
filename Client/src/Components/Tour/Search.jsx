import { useState } from "react";
import { Button, Form } from "react-bootstrap";
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

  // Extract all unique tags from all tours
  let allTags = [];
  if (tours && tours.length) {
    allTags = [...new Set(tours.flatMap((tour) => tour.tags))];
  }

  return (
    <Form onSubmit={handleSearch}>
      {/* Conditionally render the correct search component */}
      {searchType === "" && (
        <Button variant="primary" onClick={() => setSearchType("name")}>
          Search By Name
        </Button>
      )}
      {searchType === "" && (
        <Button variant="primary" onClick={() => setSearchType("tags")}>
          Search By Tags
        </Button>
      )}
      {searchType === "" && (
        <Button variant="primary" onClick={() => setSearchType("price")}>
          Search By Price
        </Button>
      )}
      {searchType === "name" && <NameSearch onChange={setSearchData} />}
      {searchType === "tags" && (
        <TagSearch tags={allTags} onChange={setSearchData} />
      )}
      {searchType === "price" && <PriceSearch onChange={setSearchData} />}

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default Search;
