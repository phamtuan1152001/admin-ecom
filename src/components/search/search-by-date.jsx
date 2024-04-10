import React from 'react'
import { StyledRangeDatePicker } from '../../styles/overrides';

function SearchByDate({ defaultValue = [], onChange = () => { } }) {
  return (
    <React.Fragment>
      <StyledRangeDatePicker
        defaultValue={defaultValue}
        onChange={(v) => onChange(v)}
      />
    </React.Fragment>
  )
}

export default SearchByDate