import React from 'react'
import { StyledRangeDatePicker } from '../../styles/overrides';

function SearchByDate({ defaultValue = [], className = "", onChange = () => { } }) {
  return (
    <div className={className}>
      <StyledRangeDatePicker
        defaultValue={defaultValue}
        onChange={(v) => onChange(v)}
      />
    </div>
  )
}

export default SearchByDate