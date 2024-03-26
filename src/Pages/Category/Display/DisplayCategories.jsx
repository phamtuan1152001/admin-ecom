import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

// @antd
import { Table, notification, Input } from "antd";
// import SearchProductByText from './components/SearchProductByText';
// import SearchProductByCategory from './components/SearchProductByCategory';
// import SearchProductByStatus from './components/SearchProductByStatus';
import { StyledButton } from '../../../styles/overrides';

// @utility
import { formatToCurrencyVND } from '../../../utility';

// @icon
import { EditIcon, DeleteIcon } from '../../../assets/svg';

// @services
import { deleteDetailCategory, getAllCategories } from '../service';

// @constants
import {
  PAGE_LIMIT,
  PAGE_SIZE,
  STATUS_DRAFT,
  SUCCESS,
  LIMIT_DEFAULT
} from '../../../constants';
import { ROUTES } from '../../../router/constants';
import moment from 'moment';

function DisplayCategories() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState({});
  const [listProducts, setListProducts] = useState([])
  const [productText, setProductText] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    const req = {
      userId: JSON.parse(localStorage.getItem("USER_INFO")).id
    }
    fetchGetListCategories(req)
  }, [productText, categoryId, status])

  const fetchGetListCategories = async (payload) => {
    try {
      setLoading(true)
      const res = await getAllCategories(payload)
      // console.log("res", res);
      if (res?.retCode === SUCCESS) {
        const list = res?.retData?.map((item, index) => {
          return {
            key: index + 1,
            ...item
          }
        })
        // setPage(rest)
        setListProducts(list)
      }
    } catch (err) {
      console.log("FETCH FAIL!")
    } finally {
      setLoading(false)
    }
  }

  const fetchDeleteDetailCategory = async (payload) => {
    // console.log(payload);
    try {
      const req = {
        cateId: payload,
      }
      const res = await deleteDetailCategory(req)
      if (res?.retCode === SUCCESS) {
        notification.success({
          message: "Successfully",
          description: "Delete product successfully",
          duration: 2,
        });
        const payload = {
          userId: JSON.parse(localStorage.getItem("USER_INFO")).id
        }
        fetchGetListCategories(payload)
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  }

  const goToEditCategory = (data) => {
    // console.log("data", data);
    navigate(ROUTES.UPDATE_CATEGORY, {
      state: {
        cateInfo: data
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
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
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        return moment(date).isValid()
          ? moment(date).format("DD/MM/YYYY HH:mm")
          : "--"
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
              onClick={() => goToEditCategory(record)}
            >
              <EditIcon width={15} height={15} />
            </div>
            <div
              className="delete-icon d-flex flex-column justify-content-center align-items-center cursor-pointer"
              onClick={() => fetchDeleteDetailCategory(record?._id)}
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
        {/* <div className='flex flex-row justify-between items-center gap-x-4'>
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
        </div> */}
      </div>
      <Table
        rowKey={(record) => record?.key}
        columns={columnsTable}
        dataSource={listProducts}
        loading={loading}
        pagination={false}
      />
    </React.Fragment>
  )
}

export default DisplayCategories