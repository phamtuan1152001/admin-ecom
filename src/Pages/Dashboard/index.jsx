import React, { useState, useEffect } from 'react'

// @antd
import { StyledSelect } from '../../styles/overrides'

// @service
import { getListRankingProducts } from './service'

// constants
import { PAGE_SIZE, PAGE_LIMIT, SUCCESS } from '../../constants'

function DashboardPage() {
  const [loading, setLoading] = useState(false)
  const [rankingProducts, setRankingProducts] = useState([])

  useEffect(() => {
    const req = {
      page: PAGE_SIZE,
      size: PAGE_LIMIT,
      action: 2
    }
    fetchGetListRankingProducts(req)
  }, [])

  const fetchGetListRankingProducts = async (payload) => {
    try {
      setLoading(true)
      const res = await getListRankingProducts(payload)
      if (res?.retCode === SUCCESS) {
        const { rankProducts, ...rest } = res?.retData
        setRankingProducts(rankProducts)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  console.log("rankingProducts", rankingProducts)

  return (
    <React.Fragment>
      <div className='flex flex-row justify-end items-center'>
        <StyledSelect
          className='w-[120px]'
          defaultValue={2}
          options={[
            {
              value: 1,
              label: 'Buy',
            },
            {
              value: 2,
              label: 'Review',
            },
            {
              value: 3,
              label: 'Introduction',
            },
            {
              value: 4,
              label: 'Favourite',
            },
          ]}
        />
      </div>
    </React.Fragment>
  )
}

export default DashboardPage