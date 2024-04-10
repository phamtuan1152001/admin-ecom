import React, { useState, useEffect } from 'react'
import moment from 'moment'

// @antd
import { StyledSelect } from '../../styles/overrides'
import { SearchByDate } from '../../components/search'
import { Column } from '@ant-design/charts'
import { Empty } from "antd";

// @service
import { getListRankingProducts } from './service'

// constants
import { PAGE_SIZE, PAGE_LIMIT, SUCCESS } from '../../constants'


function DashboardPage() {
  const [loading, setLoading] = useState(false)

  const [rankingProducts, setRankingProducts] = useState([])

  const [dateStart, setDateStart] = useState(moment().subtract(1, "months").startOf("M").format())
  const [dateEnd, setDateEnd] = useState(moment().subtract(1, "months").endOf("M").format())
  const [actionType, setActionType] = useState(2)

  useEffect(() => {
    const req = {
      page: PAGE_SIZE,
      size: PAGE_LIMIT,
      action: actionType,
      dateStart,
      dateEnd
    }
    fetchGetListRankingProducts(req)
  }, [dateStart, dateEnd, actionType])

  const TYPE_FILTER = (type) => {
    switch (type) {
      case 1:
        return "countBuy"
      case 2:
        return "countReview"
      case 3:
        return "countIntroduce"
      case 4:
        return "countSave"
      default:
        return
    }
  }

  const RENDER_TITLE = (type) => {
    switch (type) {
      case 1:
        return "The chart illustrates the number of products purchased by users"
      case 2:
        return "The graph illustrates the number of products viewed by users"
      case 3:
        return "The chart illustrates the number of products recommended by users"
      case 4:
        return "The graph illustrates the number of products saved by users"
      default:
        return
    }
  }

  const fetchGetListRankingProducts = async (payload) => {
    try {
      setLoading(true)
      const res = await getListRankingProducts(payload)
      if (res?.retCode === SUCCESS) {
        const { rankProducts, ...rest } = res?.retData
        const list = rankProducts?.map((item) => {
          return {
            name: item?.product?.name,
            value: item[TYPE_FILTER(actionType)]
          }
        })
        setRankingProducts(list)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const config = {
    data: rankingProducts,
    xField: 'name',
    yField: 'value',
    height: 700,
    title: `${RENDER_TITLE(actionType)} - ${moment(dateStart).format("MM/YYYY")}`,
    // subTitle: "haha",
    style: {
      maxWidth: 70
    },
    axis: {
      x: {
        labelFormatter: (val) => `${val.substring(0, 20)} ...`,
      },
    },
    autoFit: true,
    // style: {
    //   fill: ({ type }) => {
    //     if (type === '10-30分' || type === '30+分') {
    //       return '#22CBCC';
    //     }
    //     return '#2989FF';
    //   },
    // },
    // label: {
    //   text: (originData) => {
    //     const val = parseFloat(originData.value);
    //     if (val < 0.05) {
    //       return (val * 100).toFixed(1) + '%';
    //     }
    //     return '';
    //   },
    //   offset: 10,
    // },
    legend: false,
  };

  return (
    <div className='space-y-8'>
      <div className='flex flex-row justify-end items-center gap-3 w-[50%]'>
        <StyledSelect
          className='w-[150px]'
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
          onChange={(v) => setActionType(v)}
        />

        <SearchByDate
          defaultValue={[
            moment(moment().startOf("M").format("DD/MM/YYYY"), "DD/MM/YYYY"),
            moment(moment().endOf("M").format("DD/MM/YYYY"), "DD/MM/YYYY")
          ]}
          onChange={(v) => console.log("v", v)}
        />
      </div>

      <div className=''>
        {rankingProducts?.length > 0
          ? <Column loading={loading} {...config} />
          : <Empty />}
      </div>
    </div>
  )
}

export default DashboardPage