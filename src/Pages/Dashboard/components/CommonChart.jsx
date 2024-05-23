import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Line } from '@ant-design/plots';

// @services
import { useOrderCustomizedProducts, useOrderProducts } from '../../Order/service/queryApi'

// @constants
import { PAGE_SIZE, PAGE_LIMIT } from '../../../constants'
import { Empty } from 'antd';
import { formatToCurrencyVND } from '../../../utility';
import { normalizeDate } from '../../../utility/normalizeDate';
import { TYPE_OF_ORDER } from '../../../config/constants';

let listMonthOfYearOfOrderNomal = []

for (var i = 1; i <= 12; i++) {
  const month = {
    month: i,
    value: 0
  }
  listMonthOfYearOfOrderNomal.push(month)
}

let listMonthOfYearOfOrderCustomized = []

for (var i = 1; i <= 12; i++) {
  const month = {
    month: i,
    value: 0
  }
  listMonthOfYearOfOrderCustomized.push(month)
}

function CommonChart() {

  const [displayData, setDisplayData] = useState([])

  const { data, isSuccess, isLoading } = useOrderProducts({
    params: {
      userId: JSON.parse(localStorage.getItem("USER_INFO")).id,
      dateStart: moment().startOf("Y").format(),
      dateEnd: moment().endOf("Y").format()
    },
    option: {}
  })

  const orderCustomizedProduct = useOrderCustomizedProducts({
    params: {
      userId: JSON.parse(localStorage.getItem("USER_INFO")).id,
      dateStart: moment().startOf("Y").format(),
      dateEnd: moment().endOf("Y").format()
    },
    option: {}
  })

  useEffect(() => {
    if (data?.retData?.orders?.length > 0 && orderCustomizedProduct?.data?.retData?.ordersCustomizedProduct?.length > 0) {
      /* Normalize data as month with value counts */
      const listOfOrderNormal = normalizeDate(
        data?.retData?.orders,
        listMonthOfYearOfOrderNomal
      )
      const listOfOrderCustomized = normalizeDate(
        orderCustomizedProduct?.data?.retData?.ordersCustomizedProduct,
        listMonthOfYearOfOrderCustomized
      )

      /* Adding category to array data */
      const resultOrderNornal = listOfOrderNormal?.map(item => {
        return {
          ...item,
          category: TYPE_OF_ORDER.NORMAL_PRODUCT
        }
      })
      const resultOrderCustomized = listOfOrderCustomized?.map(item => {
        return {
          ...item,
          category: TYPE_OF_ORDER.CUSTOMIZED_PRODUCT
        }
      })
      const sumOfData = [
        ...resultOrderNornal,
        ...resultOrderCustomized
      ]
      // console.log("sumOfData", sumOfData)
      setDisplayData(sumOfData)
    }
  }, [data, orderCustomizedProduct.data])

  const config = {
    data: displayData,
    xField: 'month',
    yField: 'value',
    sizeField: 'value',
    shapeField: 'trail',
    legend: { size: false },
    colorField: 'category',
    interaction: {
      tooltip: {
        marker: false,
        render: (e, { title, items }) => {
          return (
            <div className='flex flex-col justify-start w-[160px]'>
              <h1 className='text-base font-bold'>{`${title}/${moment().format("YYYY")}`}:</h1>
              {items?.map((ele, idx) => {
                return (
                  <p key={idx} className='text-sm font-normal'>
                    {ele?.name === TYPE_OF_ORDER.NORMAL_PRODUCT
                      ? "Normal product"
                      : "Customized product"
                    }: <span className='font-bold'>{ele?.value}</span>
                  </p>
                )
              })}
            </div>
          )
        }
      }
    }
  };

  return (
    <div>
      <Line {...config} />
    </div>
  )
}

export default CommonChart