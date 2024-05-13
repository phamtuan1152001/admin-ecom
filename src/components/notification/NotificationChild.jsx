import moment from 'moment'
import React from 'react'
import classNames from 'classnames'

// @antd
import { StyledButton } from '../../styles/overrides'
import { Badge, Spin } from 'antd'

// @constants
import { TYPE_SEEN } from '../../constants'

function NotificationChild({ isLoading = false, data, onSubmit = () => { } }) {
  // console.log("data", data)

  return (
    <Spin spinning={isLoading} className=''>
      <div className='flex flex-col justify-start gap-y-4 px-4 h-[750px] overflow-auto pt-1'>
        {data?.notifications?.map((item, index) => {
          return (
            <Badge
              key={`${item?._id}-${index}`}
              className={classNames(
                "flex flex-col justify-start gap-1 p-3 rounded-lg w-full",
                item?.status === TYPE_SEEN.NOTE_SEEN ? "bg-gray-100" : ""
              )}
              dot={item?.status === TYPE_SEEN.NOTE_SEEN}
            >
              <h1 className='text-base font-bold line-clamp-1'>{item?.title}</h1>
              <p className='text-sm font-semibold line-clamp-1'>{item?.description}</p>
              <div className='flex flex-row justify-between items-start'>
                <p className='text-xs font-normal text-slate-500 line-clamp-1'>
                  Date created: {moment(item?.createdAt).format("DD/MM/YYY HH:mm")}
                </p>

                <StyledButton
                  className={"bg-[#333333] text-white text-base h-[35px] px-4"}
                  onClick={() => onSubmit(item?.typeOrder, item?.idOrder, item?._id, item?.status)}
                >
                  Review
                </StyledButton>
              </div>
            </Badge>
          )
        })}
      </div>
    </Spin>
  )
}

export default NotificationChild