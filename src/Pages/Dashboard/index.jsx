import React, { useState, useEffect, useRef } from 'react'
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
import { TYPE_FILTER, RENDER_TITLE } from '../../constants'

function DashboardPage() {
  const chartRef = useRef(null);

  const [loading, setLoading] = useState(false)

  const [rankingProducts, setRankingProducts] = useState([])

  const [dateStart, setDateStart] = useState(moment().startOf("M").format())
  const [dateEnd, setDateEnd] = useState(moment().endOf("M").format())
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

  const styleXAxis = (item, index) => {
    const { chart } = chartRef.current;
    const { document } = chart.getContext().canvas;
    const group = document?.createElement('g', {});
    const text = rankingProducts.map(item => item?.name)[index];
    const label = document.createElement('text', {
      style: {
        text: text?.split(" ")?.map(word => word[0])?.join(""),
        fill: 'black',
        textAlign: 'center',
        transform: `translate(0, 25)`,
        fontWeight: 600
      },
    });
    group.appendChild(label);
    return group;
  }

  const config = {
    data: rankingProducts,
    xField: 'name',
    yField: 'value',
    height: 700,
    title: {
      title: `${RENDER_TITLE(actionType)} ( ${moment(dateStart).format("DD/MM/YYYY")} - ${moment(dateEnd).format("DD/MM/YYYY")} )`,
      style: {
        align: "center",
        titleFontSize: 22
      }
    },
    style: {
      maxWidth: 100
    },
    autoFit: true,
    colorField: 'name',
    axis: {
      x: {
        labelFontWeight: 700,
        labelFill: "red",
        labelFontSize: 16,
        // labelStroke: "yellow",
        labelFormatter: (val) => `${val?.split(" ")?.map(word => word[0])?.join("")}`,
      },
      y: {
        labelFontWeight: 700,
        labelFill: "red",
        labelFontSize: 16,
      },
    },
    legend: false,
    onReady: (plot) => (chartRef.current = plot),
  };

  return (
    <div className='space-y-8'>
      <div className='flex flex-row justify-end items-center gap-3 w-[30%]'>
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
          onChange={(v) => {
            // console.log("v", v)
            if (v?.length > 0) {
              const start = moment(v[0]?.$d).format()
              const end = moment(v[1]?.$d).format()
              setDateStart(start)
              setDateEnd(end)
              // console.log("data", { start, end })
            } else {
              setDateStart("")
              setDateEnd("")
            }
          }}
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