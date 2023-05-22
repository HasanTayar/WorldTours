import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

const SearchBar = ({ search, handleSearch }) => (
  <InputGroup className="mb-3">
    <FormControl
      placeholder="Search"
      aria-label="Search"
      aria-describedby="basic-addon1"
      value={search}
      onChange={handleSearch}
    />
  </InputGroup>
);

export default SearchBar;
