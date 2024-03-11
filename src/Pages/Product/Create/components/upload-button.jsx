import React from 'react'

import {
  Spin,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

function UploadButton({ loading }) {
  return (
    <Spin spinning={loading}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </Spin>
  )
}

export default UploadButton