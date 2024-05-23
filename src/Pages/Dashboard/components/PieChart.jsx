import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Line } from '@ant-design/plots';

// @services
import { useOrderCustomizedProducts, useOrderProducts } from '../../Order/service/queryApi'

// @constants
import { PAGE_SIZE, PAGE_LIMIT } from '../../../constants'
import { Empty } from 'antd';
import { formatToCurrencyVND } from '../../../utility';

let listMonthOfYear = []

for (var i = 1; i <= 12; i++) {
  const month = {
    month: i,
    value: 0
  }
  listMonthOfYear.push(month)
}

const PieChart = ({ revenueType }) => {

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

  const totalData = isSuccess && orderCustomizedProduct.isSuccess ? [
    ...data?.retData?.orders,
    ...orderCustomizedProduct?.data?.retData?.ordersCustomizedProduct
  ] : []

  useEffect(() => {
    if (isSuccess && orderCustomizedProduct.isSuccess) {
      onInitData()
    }
  }, [isSuccess, revenueType, orderCustomizedProduct.isSuccess])

  const onInitData = () => {
    const filter = totalData.filter(item => item.statusOrder === 1)
    const test = filter?.map(item => {
      return {
        monthField: parseInt(moment(item?.updatedAt).format("M")),
        valueField: !!item?.cartDetail ? item?.cartDetail?.totalPrice : item?.customizedProduct?.totalPrice
      }
    })
    const groupedData = {};

    // Group data based on monthField and sum the valueField for each group
    test.forEach(entry => {
      if (!groupedData.hasOwnProperty(entry.monthField)) {
        groupedData[entry.monthField] = 0;
        // console.log("groupedData", groupedData)
      }
      groupedData[entry.monthField] += entry.valueField;
    });

    // Convert groupedData object to array of objects
    const collapsedArray = Object.keys(groupedData).map(month => ({
      monthField: parseInt(month),
      valueField: groupedData[month]
    }));

    collapsedArray.forEach(d => {
      listMonthOfYear.find(w => w.month === d.monthField).value = d.valueField
    })

    switch (revenueType) {
      case 1:
        setDisplayData(listMonthOfYear)
        return
      case 2:
        const monthCounts = {};

        // Count occurrences of each month
        test.forEach(item => {
          const month = item.monthField;
          if (monthCounts[month]) {
            monthCounts[month]++;
          } else {
            monthCounts[month] = 1;
          }
        });

        const aov = listMonthOfYear?.map((item) => {
          return {
            month: item.month,
            value: monthCounts.hasOwnProperty(item.month) ? item.value / monthCounts[item.month] : item.value,
            orders: monthCounts[item.month]
          }
        })
        setDisplayData(aov)
        return
      case 3:
        setDisplayData([])
        return
      default:
        return
    }
  }

  const renderRevenueText = (type) => {
    switch (type) {
      case 1:
        return `Total revenue`
      case 2:
        return `Average order price`
      case 3:
        return `Conversion rate`
      default: return
    }
  }

  const config = {
    data: displayData,
    xField: 'month',
    yField: 'value',
    height: 600,
    title: {
      title: `${renderRevenueText(revenueType)} achieved each month in ${moment().format("YYYY")}`,
      style: {
        align: "center",
        titleFontSize: 22
      }
    },
    axis: {
      x: {
        // labelFontWeight: 700,
        labelFormatter: (v) => `${v} / ${moment().format("YYYY")}`
      },
      y: {
        // labelFontWeight: 700,
        labelFormatter: (v) => formatToCurrencyVND(v)
      }
    },
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    style: {
      lineWidth: 2,
    },
    interaction: {
      tooltip: {
        marker: false,
        render: (e, { title, items }) => {
          return (
            <div className='flex flex-row justify-between items-center w-[160px]'>
              <h1 className='text-lg font-bold'>{`${title}/${moment().format("YYYY")}`}:</h1>
              <div className='flex flex-col justify-start'>
                <p className='text-base font-semibold'>{formatToCurrencyVND(items[0].value)}</p>
                <p className='text-xs font-semibold'>Orders: {displayData.find(item => item?.month === parseInt(title))?.orders}</p>
              </div>
            </div>
          )
        }
      }
    }
  };

  return (
    <React.Fragment>
      {displayData.length > 0
        ? <Line loading={isLoading} {...config} />
        : <Empty />}
    </React.Fragment>
  )
}

export default PieChart