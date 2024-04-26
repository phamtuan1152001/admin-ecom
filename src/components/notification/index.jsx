import React, { useState } from 'react'
import { useSelector } from 'react-redux';

// @antd
import { Dropdown, Badge, Popover } from 'antd';

// @icon
import {
  NotificationOutlined,
} from '@ant-design/icons';

// @selectors
import { listNotificationRedux } from '../../redux/notification/selectors';
import NotificationChild from './NotificationChild';

function Notification() {
  const listNoti = useSelector(listNotificationRedux)

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      content={<NotificationChild data={listNoti} />}
      title="Notification"
      trigger="hover"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Badge
        count={listNoti?.notifications?.length}
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