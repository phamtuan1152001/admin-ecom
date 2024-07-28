import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

// @antd
import { Table, notification, Input } from "antd";
import { StyledButton } from '../../../styles/overrides';
import { SearchByDate, SearchByText } from "../../../components/search/index"

// @utility
import { formatToCurrencyVND } from '../../../utility';

// @icon
import { DeleteIcon, EditIcon } from '../../../assets/svg';

// @services

// @constants
import { PAGE_LIMIT, PAGE_SIZE, PAYMENT_METHOD_TYPE, SUCCESS } from '../../../constants';
import { ROUTES } from '../../../router/constants';
import { deleteDetailOrderCustomizedProductAdmin, getListOrderCustomizedProductAdmin } from '../services';

function OrderCustomizedProduct() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState({});
  const [listOrders, setListOrders] = useState([])
  const [orderText, setOrderText] = useState("")
  const [codeOrder, setCodeOrder] = useState("")
  const [dateFilter, setDateFilter] = useState({
    dateStart: "",
    dateEnd: ""
  })

  useEffect(() => {
    const req = {
      page: PAGE_SIZE,
      size: PAGE_LIMIT,
      orderText: orderText,
      codeOrder: codeOrder,
      userId: JSON.parse(localStorage.getItem("USER_INFO")).id,
      dateStart: dateFilter.dateStart,
      dateEnd: dateFilter.dateEnd
    }
    fetchGetListOrdersCustomizedProductAdmin(req)
  }, [orderText, dateFilter, codeOrder])

  const fetchGetListOrdersCustomizedProductAdmin = async (payload) => {
    try {
      setLoading(true)
      const res = await getListOrderCustomizedProductAdmin(payload)
      if (res?.retCode === SUCCESS) {
        const { ordersCustomizedProduct, ...rest } = res?.retData
        const list = ordersCustomizedProduct?.map((item, index) => {
          return {
            key: index + 1,
            ...item
          }
        })
        setPage(rest)
        setListOrders(list)
      }
      // console.log("res", res);
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchDeleteDetailOrder = async (payload) => {
    try {
      const req = {
        id: payload
      }
      const res = await deleteDetailOrderCustomizedProductAdmin(req)
      if (res?.retCode === SUCCESS) {
        notification.success({
          message: "Successfully",
          description: res?.retText,
          duration: 2,
        });
        const reqGetListProducts = {
          page: page?.currentPage + 1,
          size: PAGE_LIMIT,
          orderText: orderText,
          userId: JSON.parse(localStorage.getItem("USER_INFO")).id,
          dateStart: dateFilter.dateStart,
          dateEnd: dateFilter.dateEnd
        }
        fetchGetListOrdersCustomizedProductAdmin(reqGetListProducts)
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  }

  const gotoDetailOrder = (data) => {
    // console.log("data", data);
    navigate(ROUTES.UPDATE_ORDER_CUSTOMIZED_PRODUCT, {
      state: {
        orderInfo: data
      }
    })
  }

  const renderStatusOrder = (type) => {
    switch (type) {
      case 0:
        return <span className='text-base font-bold tracking-widest text-yellow-500'>Pending</span>
      case 1:
        return <span className='text-base font-bold tracking-widest text-green-500'>Successfully</span>
      default:
        return <span className='text-base font-bold tracking-widest text-red-500'>Cancel</span>
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

  const columnsTable = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 60
    },
    {
      title: "Code order",
      dataIndex: "_id",
      key: "_id",
      render: (id) => {
        return <span className='text-base font-normal tracking-widest truncate'>{id}</span>
      },
      width: 100
    },
    {
      title: "Information",
      dataIndex: "orderAddress",
      key: "orderAddress",
      width: 350,
      render: (_, record) => {
        return (
          <div className='flex flex-col justify-start gap-y-3'>
            <p className='text-base font-bold tracking-widest'>
              {record?.orderAddress?.fullName}
            </p>
            <p className='text-base font-normal tracking-widest'>
              {record?.orderAddress?.email}
            </p>
            <p className='text-base font-normal tracking-widest'>
              {record?.orderAddress?.phone}
            </p>
            <p className='text-base font-normal tracking-widest'>
              {record?.orderAddress?.fullAddress}
            </p>
          </div>
        )
      }
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) => {
        return (
          <span className='text-base font-bold tracking-widest'>
            {formatToCurrencyVND(record?.customizedProduct?.totalPrice)}
          </span>
        )
      },
      width: 100
    },
    {
      title: "Status order",
      dataIndex: "statusOrder",
      key: "statusOrder",
      width: 80,
      render: (_, record) => {
        return renderStatusOrder(record?.statusOrder)
      }
    },
    {
      title: "Payment method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 80,
      render: (_, record) => {
        return renderPaymentMethod(record?.paymentMethod)
      }
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return (
          <span className='text-base font-normal tracking-widest truncate'>
            {moment(createdAt).isValid()
              ? moment(createdAt).format("DD/MM/YYYY HH:mm")
              : "--"}
          </span>
        )
      },
      width: 100
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      width: 80,
      render: (_, record) => {
        // console.log("item", record);
        return (
          <div className="flex flex-row justify-around items-center">
            <div
              className="edit-icon d-flex flex-column justify-content-center align-items-center cursor-pointer"
              onClick={() => gotoDetailOrder(record)}
            >
              <EditIcon width={15} height={15} />
            </div>
            {/* <div
              className="delete-icon d-flex flex-column justify-content-center align-items-center cursor-pointer"
              onClick={() => fetchDeleteDetailOrder(record?._id)}
            >
              <DeleteIcon width={15} height={15} />
            </div> */}
          </div>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className='flex flex-row justify-between items-center mb-4 w-full'>
        <StyledButton
          className={"bg-[#333333] text-white text-base h-[35px] px-4"}
          onClick={() => navigate(-1)}
        >
          Back
        </StyledButton>
        <div className='flex flex-row justify-between items-center gap-x-4'>
          <SearchByText
            placeholder='Enter customer name'
            onChange={(value) => {
              // console.log("value", value);
              setOrderText(value)
            }}
          />
          <SearchByText
            placeholder='Enter code order'
            onChange={(value) => {
              console.log("value", value);
              setCodeOrder(value)
            }}
          />
          <SearchByDate
            onChange={(v) => {
              if (!!v) {
                const start = moment(v[0]?.$d).format()
                const end = moment(v[1]?.$d).format()
                // console.log("value", { start, end })
                setDateFilter({
                  dateStart: start,
                  dateEnd: end
                })
              } else {
                setDateFilter({
                  dateStart: "",
                  dateEnd: ""
                })
              }
              // console.log("v", v);
            }}
          />
        </div>
      </div>
      <Table
        rowKey={(record) => record?.key}
        columns={columnsTable}
        dataSource={listOrders}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          pageSize: PAGE_LIMIT,
          current: !!page?.currentPage
            ? page?.currentPage + 1
            : 1,
          total: page?.totalItems,
          onChange: (pageitem) => {
            // console.log("pageitem", pageitem);
            const reqGetListProducts = {
              page: pageitem,
              size: PAGE_LIMIT,
              orderText: orderText,
              userId: JSON.parse(localStorage.getItem("USER_INFO")).id,
              dateStart: dateFilter.dateStart,
              dateEnd: dateFilter.dateEnd
            }
            fetchGetListOrdersCustomizedProductAdmin(reqGetListProducts);
          },
        }}
      />
    </React.Fragment>
  )
}

export default OrderCustomizedProduct