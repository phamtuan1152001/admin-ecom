import React, { useEffect, useState } from 'react'
import classNames from 'classnames';

// @antd
import { Table, notification, Carousel, Input } from "antd";
const { Search } = Input;

// @utility
import { formatToCurrencyVND } from '../../../utility';

// @icon
import { EditIcon, DeleteIcon } from '../../../assets/svg';

// @services
import { getListProducts, deleteDetailProduct } from './service';

// @constants
import {
  PAGE_LIMIT,
  PAGE_SIZE,
  STATUS_DRAFT,
  SUCCESS,
  LIMIT_DEFAULT
} from '../../../constants';

function DisplayProduct() {
  const [page, setPage] = useState({});
  const [listProducts, setListProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const req = {
      page: PAGE_SIZE,
      size: PAGE_LIMIT,
      categories: "",
      productText: ""
    }
    fetchGetListProducts(req)
  }, [])

  const fetchGetListProducts = async (payload) => {
    try {
      setLoading(true)
      const res = await getListProducts(payload)
      // console.log("res", res);
      if (res?.retCode === SUCCESS) {
        const { products, ...rest } = res?.retData
        const list = products?.map((item, index) => {
          return {
            key: index + 1,
            ...item
          }
        })
        setPage(rest)
        setListProducts(list)
      }
    } catch (err) {
      console.log("FETCH FAIL!")
    } finally {
      setLoading(false)
    }
  }

  const fetchDeleteDetailProduct = async (payload) => {
    // console.log(payload);
    try {
      const req = {
        productId: payload
      }
      const res = await deleteDetailProduct(req)
      if (res?.retCode === SUCCESS) {
        notification.success({
          message: "Successfully",
          description: "Delete product successfully",
          duration: 2,
        });
        const reqGetListProducts = {
          page: PAGE_SIZE,
          size: PAGE_LIMIT,
          categories: "",
          productText: ""
        }
        fetchGetListProducts(reqGetListProducts)
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  }

  const columnsTable = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 100
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 130
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300
    },
    {
      title: "Regular price",
      dataIndex: "regularPrice",
      key: "regularPrice",
      render: (currency) => (currency ? formatToCurrencyVND(currency) : "--"),
      width: 100
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 80,
      render: (_, record) => {
        return (
          <span className={
            classNames("capitalize", record?.status === STATUS_DRAFT ? "text-red-500" : "text-green-500")}
          >
            {record?.status}
          </span>
        )
      }
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
            // onClick={() => goToEditProduct(record)}
            >
              <EditIcon width={15} height={15} />
            </div>
            <div
              className="delete-icon d-flex flex-column justify-content-center align-items-center cursor-pointer"
              onClick={() => fetchDeleteDetailProduct(record?._id)}
            >
              <DeleteIcon width={15} height={15} />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      {listProducts?.length > 0 && (
        <Table
          rowKey={(record) => record?.key}
          columns={columnsTable}
          dataSource={listProducts}
          loading={loading}
          pagination={{
            hideOnSinglePage: true,
            pageSize: PAGE_LIMIT,
            current: page?.currentPage + 1,
            total: page?.totalItems,
            onChange: (pageitem) => {
              // console.log("pageitem", pageitem);
              const payload = {
                page: pageitem,
                size: PAGE_LIMIT,
                categories: "",
                productText: ""
              };
              fetchGetListProducts(payload);
            },
          }}
        />
      )}
    </React.Fragment>
  )
}

export default DisplayProduct