import React, { useEffect, useState } from "react";
import classNames from "classnames";
import moment from "moment";
import { useNavigate } from 'react-router-dom';

// @components
import {
  Spin,
  Image
} from "antd";
import {
  StyledButton,
  StyledInputNumber
} from "../../../styles/overrides";

// @services
import { getDetailCustomizedProductAdmin } from "../services";
import { SUCCESS } from "../../../constants";

function FormCustomizedProduct({ data = {}, onSubmit = () => { } }) {
  // console.log("data", data)

  const [loading, setLoading] = useState(false)
  const [detailCustomized, setDetailCustomized] = useState({})
  const [regularPrice, setRegularPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    fetchGetDetailCustomizedProduct()
  }, [data?._id])

  const fetchGetDetailCustomizedProduct = async () => {
    try {
      setLoading(true)
      const req = {
        _id: data?._id
      }
      const res = await getDetailCustomizedProductAdmin(req)
      // console.log("res", res)
      if (res?.retCode === SUCCESS) {
        setDetailCustomized(res?.retData)
        setRegularPrice(res?.retData?.regularPrice)
        setTotalPrice(res?.retData?.totalPrice)
      } else {
        setDetailCustomized({})
        setRegularPrice(0)
        setTotalPrice(0)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const renderStatus = (type) => {
    switch (type) {
      case 0:
        return (
          <span
            className={
              classNames("capitalize bg-[#fff3cd] text-[#856404] py-1 px-2 rounded-md text-base font-normal border border-[#ffeeba]")
            }
          >
            Pending
          </span>
        )
      case 1:
        return (
          <span
            className={
              classNames("capitalize bg-[#c3e6cb] text-[#155724] py-1 px-2 rounded-md text-base font-normal border border-[#c3e6cb]")
            }
          >
            Confirmed
          </span>
        )
      default:
        return (
          <span
            className={
              classNames("capitalize bg-[#f8d7da] text-[#721c24] py-1 px-2 rounded-md text-base font-normal border border-[#f5c6cb]")
            }
          >
            Cancel
          </span>
        )
    }
  }

  return (
    <Spin spinning={loading}>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col justify-start gap-3">
          <h2 className="text-lg font-bold">
            Code:
            <span className="ml-2 text-base font-normal">
              {detailCustomized?.code}
            </span>
          </h2>
          <h2 className="text-lg font-bold">
            Name:
            <span className="ml-2 text-base font-normal">
              {detailCustomized?.name}
            </span>
          </h2>
          <h2 className="text-lg font-bold">
            Size:
            <span className="ml-2 text-base font-normal">
              {detailCustomized?.size}
            </span>
          </h2>
          <h2 className="text-lg font-bold">
            Quantity:
            <span className="ml-2 text-base font-normal">
              {detailCustomized?.quantity}
            </span>
          </h2>
          <h2 className="text-lg font-bold">
            Day created:
            <span className="ml-2 text-base font-normal">
              {moment(detailCustomized?.createdAt).isValid()
                ? moment(detailCustomized?.createdAt).format("DD/MM/YYYY HH:mm")
                : ""}
            </span>
          </h2>
        </div>
        <div className="flex flex-col justify-start gap-3">
          <div className="flex flex-row justify-start gap-3 items-center">
            <h2 className="text-lg font-bold w-[200px]">
              Regular price:
            </h2>
            <StyledInputNumber
              value={regularPrice}
              placeholder={`Enter your product regular price`}
              formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              onChange={(e) => {
                // console.log("e", e)
                setRegularPrice(e)
                setTotalPrice(e * detailCustomized?.quantity)
              }}
            />
          </div>
          <div className="flex flex-row justify-start gap-3 items-center">
            <h2 className="text-lg font-bold w-[200px]">
              Total price:
            </h2>
            <StyledInputNumber
              value={totalPrice}
              disabled
              placeholder={`Enter your product total price`}
              formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </div>
          <h2 className="text-lg font-bold">
            Admin confirmed:
            <span className="ml-2">
              {renderStatus(detailCustomized?.statusProductAdmin)}
            </span>
          </h2>
          <h2 className="text-lg font-bold">
            Client confirmed:
            <span className="ml-2">
              {renderStatus(detailCustomized?.statusProductClient)}
            </span>
          </h2>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col justify-start gap-2">
            <h3 className="font-bold text-lg">Illustration image</h3>
            <div className="flex flex-row justify-center items-center">
              <Image
                width={300}
                src={detailCustomized?.imageUrl}
              />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-row justify-end items-center gap-3">
            <StyledButton
              className="bg-[#333333] text-white text-base h-[35px] px-4 capitalize"
              onClick={() => {
                window.open(detailCustomized?.imagePsd)
              }}
            >
              Download image PSD
            </StyledButton>
            <StyledButton
              className="bg-[#333333] text-white text-base h-[35px] px-4 capitalize"
              disabled={
                detailCustomized?.statusProductAdmin === 1 || detailCustomized?.statusProductAdmin === 2
                  ? true
                  : false
              }
              onClick={() => {
                const submitData = {
                  clientId: detailCustomized?.userId,
                  ...detailCustomized,
                  regularPrice: regularPrice,
                  totalPrice: totalPrice,
                  statusProductAdmin: 2,
                  userId: JSON.parse(localStorage.getItem("USER_INFO")).id,
                }
                onSubmit(submitData)
              }}
            >
              Cancel customized product
            </StyledButton>
            <StyledButton
              className="bg-[#333333] text-white text-base h-[35px] px-4 capitalize"
              disabled={
                detailCustomized?.statusProductAdmin === 0
                  ? false
                  : true
              }
              onClick={() => {
                const submitData = {
                  clientId: detailCustomized?.userId,
                  ...detailCustomized,
                  regularPrice: regularPrice,
                  totalPrice: totalPrice,
                  statusProductAdmin: 1,
                  userId: JSON.parse(localStorage.getItem("USER_INFO")).id,
                }
                onSubmit(submitData)
              }}
            >
              Confirm customized product
            </StyledButton>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default FormCustomizedProduct