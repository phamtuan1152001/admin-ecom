import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// @antd
import { Badge, Popover } from 'antd';

// @icon
import {
  NotificationOutlined,
} from '@ant-design/icons';

// @selectors
import { listNotificationRedux } from '../../redux/notification/selectors';
import NotificationChild from './NotificationChild';

// @constants
import { SUCCESS, TYPE_SEEN, PAGE_SIZE, PAGE_LIMIT, TYPE_ORDER } from '../../constants';
import { apiUpdateStatusNotification } from '../../redux/notification/services';
import { ROUTES } from '../../router/constants';

// @action
import { getListNotification } from '../../redux/notification/actions';

// @service
import { getDetailOrderAdmin } from '../../Pages/Order/service';
import { getDetailOrderCustomizedProductAdmin } from '../../Pages/OrderCustomizedProduct/services';

function Notification() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const listNoti = useSelector(listNotificationRedux)

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const fetchDetailOrderCustomizedProduct = async (payload) => {
    try {
      const res = await getDetailOrderCustomizedProductAdmin(payload)
      // console.log("res", res);
      if (res?.retCode === SUCCESS) {
        navigate(ROUTES.UPDATE_ORDER_CUSTOMIZED_PRODUCT, {
          state: {
            orderInfo: res?.retData
          }
        })
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    }
  }

  const fetchDetailOrderProduct = async (payload) => {
    try {
      const res = await getDetailOrderAdmin(payload)
      // console.log("res", res);
      if (res?.retCode === SUCCESS) {
        navigate(ROUTES.DETAIL_ORDER, {
          state: {
            orderInfo: res?.retData
          }
        })
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    }
  }

  const fetchUpdateStatusNotification = async (payload, typeOrder, idOrder) => {
    try {
      setLoading(true)
      const res = await apiUpdateStatusNotification(payload)
      if (res?.retCode === SUCCESS) {
        dispatch(getListNotification({
          page: PAGE_SIZE,
          size: PAGE_LIMIT,
          userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id
        }))
        const payload = {
          orderId: idOrder,
          userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id
        }
        if (typeOrder === TYPE_ORDER.ORDER_PRODUCT) {
          fetchDetailOrderProduct(payload)
        } else if (typeOrder === TYPE_ORDER.ORDER_CUSTOMIZED_PRODUCT) {
          fetchDetailOrderCustomizedProduct(payload)
        } else {
          navigate(ROUTES.CUSTOMIZED_PRODUCT)
        }
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popover
      content={
        <NotificationChild
          isLoading={loading}
          data={listNoti}
          onSubmit={(typeOrder, idOrder, notificationId, status) => {
            // console.log("test", status)
            if (status === TYPE_SEEN.NOTE_SEEN) {
              const req = {
                notificationId: notificationId,
                userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id
              }
              fetchUpdateStatusNotification(req, typeOrder, idOrder)
            } else {
              const payload = {
                orderId: idOrder,
                userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id
              }
              if (typeOrder === TYPE_ORDER.ORDER_PRODUCT) {
                fetchDetailOrderProduct(payload)
              } else if (typeOrder === TYPE_ORDER.ORDER_CUSTOMIZED_PRODUCT) {
                fetchDetailOrderCustomizedProduct(payload)
              } else {
                navigate(ROUTES.CUSTOMIZED_PRODUCT)
              }
            }
          }}
        />
      }
      title="Notification"
      trigger="hover"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Badge
        count={listNoti?.notifications?.filter(item => item?.status === TYPE_SEEN.NOTE_SEEN)?.length}
        className='cursor-pointer'
      >
        <NotificationOutlined
          style={{ fontSize: 24 }}
        />
      </Badge>
    </Popover>
  )
}

export default Notification