import React from 'react'

// @components
import { StyledDatePicker } from '../../styles/overrides'

function CustomDatePicker({ ...props }) {
  // console.log("props", props)
  return (
    <StyledDatePicker
      placeholder={`Sale from`}
      className=""
      style={{ fontSize: 20 }}
      showTime
      {...props}
    />
  )
}

export default CustomDatePicker