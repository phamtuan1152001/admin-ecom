import React, { useState, useEffect } from 'react'

// @components
import { StyledSelect } from '../../../../styles/overrides'

// @services
import { getAllCategories } from '../../../../services/service-common'

// @constants
import { SUCCESS } from '../../../../constants'

function SearchProductByCategory({ onChange = () => { } }) {
  const [listCategories, setListCategories] = useState([])

  useEffect(() => {
    fetchGetAllCategories()
  }, [])

  const fetchGetAllCategories = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("USER_INFO"))?.id
      const res = await getAllCategories(userId)
      if (res?.retCode === SUCCESS) {
        const { retData } = res || {}
        const list = retData?.map((item) => {
          return {
            value: item?._id,
            label: item?.name,
            ...item
          }
        })
        setListCategories(list)
      }
      // console.log("res", res)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    }
  }
  return (
    <div className=''>
      <StyledSelect
        onChange={(e) => onChange(e)}
        placeholder="Select a category"
        options={listCategories}
      />
    </div>
  )
}

export default SearchProductByCategory