import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

// @antd
import { Table, notification } from "antd";
import { StyledButton } from '../../../styles/overrides';

// @icon
import { EditIcon, DeleteIcon } from '../../../assets/svg';

// @constants
import {
  PAGE_LIMIT,
  PAGE_SIZE,
  SUCCESS,
} from '../../../constants';
import { ROUTES } from '../../../router/constants';

// @services
import { deleteDetailImport, getListImports } from '../service';
import moment from 'moment';

function ManageImport() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState({});
  const [listImports, setListImports] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const req = {
      page: PAGE_SIZE,
      size: PAGE_LIMIT,
      search: search,
      userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id
    }
    fetchGetListImports(req)
  }, [search])

  const fetchGetListImports = async (payload) => {
    try {
      setLoading(true)
      const res = await getListImports(payload)
      // console.log("res", res);
      if (res?.retCode === SUCCESS) {
        const { imports, ...rest } = res?.retData
        const list = imports?.map((item, index) => {
          return {
            key: index + 1,
            ...item
          }
        })
        setPage(rest)
        setListImports(list)
      }
    } catch (err) {
      console.log("FETCH FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchDeleteDetailImport = async (id) => {
    // console.log(payload);
    try {
      const req = {
        importId: id,
        userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id
      }
      const res = await deleteDetailImport(req)
      if (res?.retCode === SUCCESS) {
        notification.success({
          message: "Successfully",
          description: "Delete import successfully",
          duration: 2,
        });
        const reqGetListProducts = {
          page: PAGE_SIZE,
          size: PAGE_LIMIT,
          search: search,
          userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id
        }
        fetchGetListImports(reqGetListProducts)
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  }

  const goToEditProduct = (data) => {
    // console.log("data", data);
    navigate(ROUTES.UPDATE_MANAGE_IMPORT, {
      state: {
        importInfo: data
      }
    })
  }

  const columnsTable = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
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
      width: 100,
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
              onClick={() => fetchDeleteDetailImport(record?._id)}
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
          <ImportFile />
        </div> */}
      </div>
      <Table
        rowKey={(record) => record?.key}
        columns={columnsTable}
        dataSource={listImports}
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
              search: search,
              userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id
            };
            fetchGetListImports(payload);
          },
        }}
      />
    </React.Fragment>
  )
}

export default ManageImport