import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

// @antd
import { Table, notification, Input } from "antd";
import SearchProductByText from './components/SearchProductByText';
import SearchProductByCategory from './components/SearchProductByCategory';
import SearchProductByStatus from './components/SearchProductByStatus';
import { StyledButton } from '../../../styles/overrides';
import ImportFile from './components/ImportFile';

// @utility
import { formatToCurrencyVND } from '../../../utility';

// @icon
import { EditIcon, DeleteIcon } from '../../../assets/svg';

// @services
import { getListProducts, deleteDetailProduct } from '../service';

// @constants
import {
  PAGE_LIMIT,
  PAGE_SIZE,
  STATUS_DRAFT,
  SUCCESS,
  LIMIT_DEFAULT
} from '../../../constants';
import { ROUTES } from '../../../router/constants';

function DisplayProduct() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState({});
  const [listProducts, setListProducts] = useState([])
  const [productText, setProductText] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    const req = {
      page: PAGE_SIZE,
      size: PAGE_LIMIT,
      categories: categoryId,
      productText: productText,
      status: status,
      userId: JSON.parse(localStorage.getItem("USER_INFO")).id
    }
    fetchGetListProducts(req)
  }, [productText, categoryId, status])

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
          productText: "",
          status: status,
          userId: JSON.parse(localStorage.getItem("USER_INFO")).id
        }
        fetchGetListProducts(reqGetListProducts)
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  }

  const goToEditProduct = (data) => {
    // console.log("data", data);
    navigate(ROUTES.UPDATE_PRODUCT, {
      state: {
        productInfo: data
      }
    })
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
              onClick={() => goToEditProduct(record)}
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
      <div className='flex flex-row justify-between items-center mb-4'>
        <StyledButton
          className={"bg-[#333333] text-white text-base h-[35px] px-4"}
          onClick={() => navigate(-1)}
        >
          Back
        </StyledButton>
        <div className='flex flex-row justify-between items-center gap-x-4'>
          <ImportFile />

          <SearchProductByText
            onChange={(value) => {
              setProductText(value)
            }}
          />
          <SearchProductByCategory
            onChange={(value) => {
              setCategoryId(value)
            }}
          />
          <SearchProductByStatus
            onChange={(value) => {
              setStatus(value);
            }}
          />
        </div>
      </div>
      <Table
        rowKey={(record) => record?.key}
        columns={columnsTable}
        dataSource={listProducts}
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
            const payload = {
              page: pageitem,
              size: PAGE_LIMIT,
              categories: categoryId,
              productText: productText,
              status: status,
              userId: JSON.parse(localStorage.getItem("USER_INFO")).id
            };
            fetchGetListProducts(payload);
          },
        }}
      />
    </React.Fragment>
  )
}

export default DisplayProduct