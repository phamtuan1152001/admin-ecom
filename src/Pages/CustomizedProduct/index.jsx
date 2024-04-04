import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

// @antd
import { Table, notification, Input } from "antd";
import { StyledButton } from '../../styles/overrides';
import { SearchByText } from '../../components/search';

import FormCustomizedProduct from './components/FormCustomizedProduct';

// @utility
import { formatToCurrencyVND } from '../../utility';

// @icon
import { EditIcon, DeleteIcon } from '../../assets/svg';

// @services
import {
  getListCustomizedProductAdmin,
  updateStatusProductAdmin,
  deleteDetailCustomizedProductAdmin
} from './services';
// @constants
import {
  PAGE_LIMIT,
  PAGE_SIZE,
  STATUS_DRAFT,
  SUCCESS,
  LIMIT_DEFAULT
} from '../../constants';
import { ROUTES } from '../../router/constants';
import Dialog from '../../components/dialog';

const CustomizedProduct = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState({});
  const [listCustomizedProducts, setListCustomizedProducts] = useState([])
  const [search, setSearch] = useState("")
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [detailRecord, setDetailRecord] = useState({})

  useEffect(() => {
    const req = {
      page: PAGE_SIZE,
      size: PAGE_LIMIT,
      userId: JSON.parse(localStorage.getItem("USER_INFO")).id,
      search: search
    }
    fetchGetListCustomizedProducts(req)
  }, [search])

  const fetchGetListCustomizedProducts = async (payload) => {
    try {
      setLoading(true)
      const res = await getListCustomizedProductAdmin(payload)
      // console.log("res", res);
      if (res?.retCode === SUCCESS) {
        const { customizedProducts, ...rest } = res?.retData
        const list = customizedProducts?.map((item, index) => {
          return {
            key: index + 1,
            ...item
          }
        })
        setPage(rest)
        setListCustomizedProducts(list)
      }
    } catch (err) {
      console.log("FETCH FAIL!")
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

  const columnsTable = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 50
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 60
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 130
    },
    {
      title: "Regular price",
      dataIndex: "regularPrice",
      key: "regularPrice",
      render: (currency) => (currency ? formatToCurrencyVND(currency) : "--"),
      width: 60
    },
    {
      title: "Status Admin",
      dataIndex: "statusProductAdmin",
      key: "statusProductAdmin",
      width: 100,
      render: (_, record) => {
        return (
          <>
            {renderStatus(record?.statusProductAdmin)}
          </>
        )
      }
    },
    {
      title: "Status Client",
      dataIndex: "statusProductClient",
      key: "statusProductClient",
      width: 100,
      render: (_, record) => {
        return (
          <>
            {renderStatus(record?.statusProductClient)}
          </>
        )
      }
    },
    {
      title: "Day created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).isValid()
        ? moment(date).format("DD/MM/YYYY HH:mm") : "--",
      width: 60
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      width: 50,
      render: (_, record) => {
        // console.log("item", record);
        return (
          <div className="flex flex-row justify-around items-center">
            <div
              className="edit-icon d-flex flex-column justify-content-center align-items-center cursor-pointer"
              onClick={() => {
                onOpenDialog()
                setDetailRecord(record)
              }}
            >
              <EditIcon width={15} height={15} />
            </div>
            {/* <div
              className="delete-icon d-flex flex-column justify-content-center align-items-center cursor-pointer"
            // onClick={() => fetchDeleteDetailProduct(record?._id)}
            >
              <DeleteIcon width={15} height={15} />
            </div> */}
          </div>
        );
      },
    },
  ];

  const onOpenDialog = () => {
    setIsOpenModal(!isOpenModal)
  }

  const fetchUpdateStatusCustomizedProduct = async (values) => {
    // console.log("v", values)
    try {
      const req = { ...values }
      const res = await updateStatusProductAdmin(req)
      if (res?.retCode === SUCCESS) {
        notification.success({
          message: "Successfully",
          description: res?.retText,
          duration: 2,
        });
        onOpenDialog()
        const req = {
          page: page?.currentPage + 1,
          size: PAGE_LIMIT,
          userId: JSON.parse(localStorage.getItem("USER_INFO")).id,
          search: search
        }
        fetchGetListCustomizedProducts(req)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    }
  }

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
          <SearchByText
            onChange={(value) => {
              setSearch(value)
            }}
          />
        </div>
      </div>
      <Table
        rowKey={(record) => record?.key}
        columns={columnsTable}
        dataSource={listCustomizedProducts}
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
            const req = {
              page: pageitem,
              size: PAGE_LIMIT,
              userId: JSON.parse(localStorage.getItem("USER_INFO")).id,
              search: search
            }
            fetchGetListCustomizedProducts(req)
          },
        }}
      />
      <Dialog
        title='CUSTOMIZED PRODUCT INFORMATION'
        isOpen={isOpenModal}
        onOpen={setIsOpenModal}
      >
        <FormCustomizedProduct
          data={detailRecord}
          onSubmit={fetchUpdateStatusCustomizedProduct}
        />
      </Dialog>
    </React.Fragment>
  )
}

export default CustomizedProduct