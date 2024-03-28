import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx';

import {
  notification
} from "antd";

// @services
import { getListImports, createMultipleProducts } from '../../service';
import { getAllCategories } from '../../../../services/service-common';

// @constants
import { PAGE_SIZE, PAGE_LIMIT, SUCCESS, STATUS_DRAFT } from '../../../../constants';

// @utility
import { convertToSlug } from '../../../../utility';

function ImportFile({ reload = () => { } }) {
  const [loading, setLoading] = useState(false)
  const [listImports, setListImports] = useState([])
  const [listCategories, setListCategories] = useState([])

  // console.log("listImports", { listImports, listCategories })

  useEffect(() => {
    const req = {
      page: PAGE_SIZE,
      size: PAGE_LIMIT,
      search: "",
      userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id
    }
    fetchGetListImports(req)
    fetchGetAllCategories()
  }, [])

  const fetchGetAllCategories = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("USER_INFO"))?.id
      const res = await getAllCategories(userId)
      if (res?.retCode === SUCCESS) {
        const { retData } = res || {}
        const list = retData?.map((item) => {
          return {
            value: item?._id,
            label: item?.name,
            ...item
          }
        })
        setListCategories(list)
      }
      // console.log("res", res)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    }
  }

  const fetchGetListImports = async (payload) => {
    try {
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
        setListImports(list)
      }
    } catch (err) {
      console.log("FETCH FAIL!", err)
    }
  }

  const fetchCreateMultipleProducts = async (data) => {
    try {
      setLoading(true)
      const req = {
        userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id,
        listProducts: data
      }
      const res = await createMultipleProducts(req)
      if (res?.retCode === SUCCESS) {
        notification.success({
          message: "Successfully",
          description: res?.retText,
          duration: 2,
        });
        reload()
      } else {
        notification.error({
          message: "Fail",
          description: "Create fail",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCHING FAIL", err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      // console.log("parsedData", parsedData)

      const productsData = parsedData.map(row => {
        return {
          code: row[0],
          name: row[1],
          slug: convertToSlug(row[1]),
          description: listImports.find(item => item?.code === row[0])?.description,
          images: listImports.find(item => item?.code === row[0])?.listImages.map(data => {
            return {
              uid: data?.uid,
              url: data?.url
            }
          }),
          defaultImageId: listImports.find(item => item?.code === row[0])?.defaultImageId,
          quantity: row[2],
          regularPrice: row[3],
          salePrice: "",
          onSale: false,
          status: STATUS_DRAFT,
          dateOnSaleFrom: "",
          dateOnSaleTo: "",
          categories: listCategories?.find(item => item?.name === row[4])?._id,
        }
      });
      // console.log("productsData", productsData);
      fetchCreateMultipleProducts(productsData)
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <React.Fragment>
      <input type="file" onChange={handleFileUpload} />
    </React.Fragment>
  )
}

export default ImportFile