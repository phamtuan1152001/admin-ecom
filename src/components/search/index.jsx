import React, { useState, useEffect } from 'react'

// @components
import { StyledInput } from "../../styles/overrides"

let timeoutId;

function SearchItem({ onChange = () => { } }) {
  // search
  const [input, setInput] = useState("");
  const [prevSearch, setPrevSearch] = useState("");
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    onChange(searchData)
  }, [searchData]);

  const handleSeacrh = (e) => {
    const search = e.target.value;
    setInput(search);
    setPrevSearch(search);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      if (search !== prevSearch || search === "") {
        // setPage(1);
        setSearchData(search);
      }
    }, 1000);
  };

  return (
    <div className=''>
      <StyledInput
        value={input}
        placeholder='Enter a item'
        onChange={handleSeacrh}
      />
    </div>
  )
}

export default SearchItem