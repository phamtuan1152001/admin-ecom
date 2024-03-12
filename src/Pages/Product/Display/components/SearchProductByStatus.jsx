import React from 'react'

// @components
import { StyledSelect } from '../../../../styles/overrides'

function SearchProductByStatus({ onChange = () => { } }) {
  return (
    <div className=''>
      <StyledSelect
        onChange={(e) => onChange(e)}
        placeholder="Select a status"
        options={[
          {
            value: 'draft',
            label: 'Draft',
          },
          {
            value: 'publish',
            label: 'Publish',
          },
        ]}
      />
    </div>
  )
}

export default SearchProductByStatus