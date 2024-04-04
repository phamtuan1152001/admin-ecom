import React from 'react'
import { StyledRangeDatePicker } from '../../styles/overrides';

function SearchByDate({ onChange = () => { } }) {
  return (
    <React.Fragment>
      <StyledRangeDatePicker
        onChange={(v) => onChange(v)}
      />
    </React.Fragment>
  )
}

export default SearchByDate