import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import moment from 'moment';

// @antd
import { Spin, notification } from "antd"
import { StyledButton } from '../../../styles/overrides';

// @constants
import { PAYMENT_METHOD_TYPE, SUCCESS } from '../../../constants';

// @utility
import { formatToCurrencyVND } from '../../../utility';

// @service
import { getDetailOrderAdmin, updateStatusOrderAdmin } from '../service';

// @icon
import { CartIcon, PaymentSuccessStatus, PaymentFailIcon } from '../../../assets/svg';
import PaymentPendingIcon from "../../../assets/images/pending-icon.png"

function DetailOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  // console.log("location", location);
  const { orderInfo } = location.state || {}

  const [loading, setLoading] = useState(false)
  const [detailOrder, setDetailOrder] = useState({})

  useEffect(() => {
    const req = {
      orderId: orderInfo?._id,
      userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id
    }
    fetchDetailOrderAdmin(req)
  }, [orderInfo?._id])

  const fetchDetailOrderAdmin = async (payload) => {
    try {
      setLoading(true)
      const res = await getDetailOrderAdmin(payload)
      // console.log("res", res);
      if (res?.retCode === SUCCESS) {
        setDetailOrder(res?.retData)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchUpdateStatusOrder = async (type) => {
    try {
      // setLoading(true)
      const req = {
        ...detailOrder,
        statusOrder: type,
        userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id,
        mainUserId: orderInfo?.userId
      }
      const res = await updateStatusOrderAdmin(req)
      if (res?.retCode === SUCCESS) {
        notification.success({
          message: "Successfully",
          description: "Update status order successfully",
          duration: 2,
        });
        const req = {
          orderId: orderInfo?._id,
          userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id
        }
        fetchDetailOrderAdmin(req)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err);
    } finally {
      // setLoading(false)
    }
  }

  const renderStatusOrder = (type) => {
    switch (type) {
      case 0:
        return (
          <div className="flex flex-col justify-center items-center gap-y-4">
            <div className="flex flex-col justify-center items-center">
              <img src={PaymentPendingIcon} alt='pending-icon' />
            </div>
            <h2 className="text-lg font-bold text-yellow-500">
              This payment is waiting for purchasing
            </h2>
          </div>
        )
      case 1:
        return (
          <div className="flex flex-col justify-center items-center gap-y-4">
            <div className="flex flex-col justify-center items-center">
              <PaymentSuccessStatus />
            </div>
            <h2 className="text-lg font-bold text-[#4EC389]">
              This payment has been paid successfully
            </h2>
          </div>
        )
      case 2:
        return (
          <div className="flex flex-col justify-center items-center gap-y-4">
            <div className="flex flex-col justify-center items-center">
              <PaymentFailIcon />
            </div>
            <h2 className="text-lg font-bold text-red-500">
              This payment has been canceled
            </h2>
          </div>
        )
      default:
        return null
    }
  }

  const renderPaymentMethod = (type) => {
    switch (type) {
      case PAYMENT_METHOD_TYPE.COD:
        return <span className='text-base font-normal tracking-widest'>COD</span>
      case PAYMENT_METHOD_TYPE.ATM_BANKING:
        return <span className='text-base font-normal tracking-widest'>Banking transfer</span>
      case PAYMENT_METHOD_TYPE.MOMO_BANKING:
        return <span className='text-base font-normal tracking-widest'>MOMO transfer</span>
      case PAYMENT_METHOD_TYPE.METAMASK:
        return <span className='text-base font-normal tracking-widest'>Metamask payment</span>
      default:
        return <span className='text-base font-normal tracking-widest'>--</span>
    }
  }

  return (
    <Spin spinning={loading}>
      <div className='flex flex-row justify-between items-center mb-4'>
        <StyledButton
          className={"bg-[#333333] text-white text-base h-[35px] px-4"}
          onClick={() => navigate(-1)}
        >
          Back
        </StyledButton>
      </div>
      <div className="grid grid-cols-2 gap-x-6 max-[768px]:grid-cols-1 max-[768px]:gap-y-6">
        <div className="p-[24px] bg-white rounded-[12px]">
          <div className="flex flex-col gap-y-4 pb-6 border-b-2 border-[#DFE3E8]">
            <div className="flex flex-row justify-start items-center gap-x-2">
              <div className="flex flex-col justify-center items-center">
                <CartIcon className='w-6 h-6' />
              </div>
              <h1 className="font-bold text-lg text-[#000000]">Order details</h1>
            </div>
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-xs font-semibold text-[#000000]">Products</h3>
              <h3 className="text-xs font-semibold text-[#000000]">Total order</h3>
            </div>
            <div className="flex flex-row justify-between items-start">
              {detailOrder?.cartDetail?.items?.map((item, index) => {
                return (
                  <React.Fragment key={`${item?.id}-${index}`}>
                    <div className="flex flex-col justify-start gap-y-2">
                      <h3 className="text-base font-bold text-[#333333]">
                        {item?.product?.name}
                      </h3>
                      <p className="text-sm font-normal text-[#676767]">
                        Quantity: {String(item?.quantity).padStart(2, "0")}
                      </p>
                    </div>
                    <h4 className="text-base font-bold text-[#FA9E14]">
                      {formatToCurrencyVND(item?.total)}
                    </h4>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col gap-y-4 py-6 border-b-2 border-[#DFE3E8]">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-base font-normal text-[#637381]">Payment methods</h3>
              <h3 className="text-base font-bold text-[#000000] max-[768px]:text-right">
                {renderPaymentMethod(detailOrder?.paymentMethod)}
              </h3>
            </div>
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-base font-normal text-[#637381]">Tạm tính</h3>
              <h3 className="text-base font-bold text-[#000000]">
                {formatToCurrencyVND(detailOrder?.cartDetail?.totalPrice)}
              </h3>
            </div>
            {/* <div className="flex flex-row justify-between items-center">
                    <h3 className="text-base font-normal text-[#637381]">Giảm giá</h3>
                    <h3 className="text-base font-bold text-[#000000]">
                      {formatToCurrencyVND(parseInt(detailOrder?.totalDiscountAmount))}
                    </h3>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-base font-normal text-[#637381]">Phí vận chuyển</h3>
                    <h3 className="text-base font-bold text-[#000000]">0VND</h3>
                  </div> */}
          </div>
          <div className="flex flex-col pt-6">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-base font-normal text-[#637381]">Total order</h3>
              <h3 className="text-base font-bold text-[#000000]">
                {formatToCurrencyVND(detailOrder?.cartDetail?.totalPrice)}
              </h3>
            </div>
          </div>
        </div>
        <div className="p-[24px] bg-white h-fit rounded-[12px]">
          {renderStatusOrder(detailOrder?.statusOrder)}
          <div className="flex flex-col gap-y-4 pt-4">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-base font-normal text-[#637381]">Code order:</h3>
              <h3 className="text-base font-bold text-[#000000]">{detailOrder?._id}</h3>
            </div>
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-base font-normal text-[#637381]">Date of purchase:</h3>
              <h3 className="text-base font-bold text-[#000000]">
                {moment(detailOrder?.updateAt)?.isValid()
                  ? moment(detailOrder?.updateAt).format("DD/MM/YYYY HH:MM")
                  : "--"}
              </h3>
            </div>
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-base font-normal text-[#637381]">Total order</h3>
              <h3 className="text-base font-bold text-[#000000]">
                {formatToCurrencyVND(detailOrder?.cartDetail?.totalPrice)}
              </h3>
            </div>
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-base font-normal text-[#637381]">Payment methods:</h3>
              <h3 className="text-base font-bold text-[#000000] max-[768px]:text-right">
                {renderPaymentMethod(detailOrder?.paymentMethod)}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-end items-center gap-x-4'>
        {detailOrder?.statusOrder === 1 || detailOrder?.statusOrder === 2
          ? undefined
          : (
            <>
              <StyledButton
                className={"bg-[#333333] text-white text-base h-[35px] px-4"}
                onClick={() => fetchUpdateStatusOrder(1)}
              >
                Update Status Successfully
              </StyledButton>
              <StyledButton
                className={"bg-[#333333] text-white text-base h-[35px] px-4"}
                onClick={() => fetchUpdateStatusOrder(2)}
              >
                Update Status Cancel
              </StyledButton>
            </>
          )}
      </div>
    </Spin>
  )
}

export default DetailOrder