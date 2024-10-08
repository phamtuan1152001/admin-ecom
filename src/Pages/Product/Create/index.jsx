import React, { useEffect, useState } from "react";
import classNames from "classnames";
import moment from "moment";
import { useNavigate } from 'react-router-dom';

// @utility
import { convertToSlug, generatingRandomCode } from "../../../utility";

// @components
import {
  Form,
  Button,
  Image,
  Radio,
  notification
} from "antd";
import {
  StyledFormItem,
  StyledButton,
  StyledInput,
  StyledDatePicker,
  StyledCheckbox,
  StyledInputNumber,
  StyledSelect
} from "../../../styles/overrides";
import Ckeditor from "../../../components/Ckeditors";
import UploadImage from "./components/Upload";
import CustomDatePicker from "../../../components/date-picker";

// @constants
import { SUCCESS } from '../../../constants';
import { ROUTES } from "../../../router/constants";

// @service
import { createProduct } from "../service";
import { getAllCategories } from "../../../services/service-common";

function CreateProduct() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const [listCategories, setListCategories] = useState([])
  const [isOnSale, setIsOnSale] = useState(false)
  const [listImages, setListImages] = useState([])
  // const [dateStart, setDateStart] = useState('');
  // const [dateEnd, setDateEnd] = useState('');

  useEffect(() => {
    fetchGetAllCategories()
    onInitCodeProduct()
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

  const handleConvertToSlug = () => {
    const newName = form.getFieldValue('name');
    const newSlug = convertToSlug(newName);
    form.setFieldValue('slug', newSlug);
  };

  const onFinish = async (values) => {
    // console.log("values", values);
    try {
      setLoading(true);
      const req = {
        ...values,
        dateOnSaleFrom: moment(values?.dateOnSaleFrom).isValid()
          ? moment(values?.dateOnSaleFrom?.$d).format()
          : "",
        dateOnSaleTo: moment(values?.dateOnSaleTo).isValid()
          ? moment(values?.dateOnSaleTo?.$d).format()
          : "",
        userId: JSON.parse(localStorage.getItem("USER_INFO")).id,
        code: "ECOM" + values?.code,
      }
      const res = await createProduct(req);
      // console.log("req", req);
      if (res?.retCode === SUCCESS) {
        notification.success({
          message: "Successfully",
          description: res?.retText,
          duration: 2,
        });
        setTimeout(() => {
          navigate(ROUTES.DISPLAY_PRODUCT)
        }, 1000);
      } else {
        notification.error({
          message: "Fail",
          description: "Create fail",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const hasValues = form.getFieldsValue();
    // console.log("hasValues", hasValues);
    setIsDisable(
      hasErrors ||
      !hasValues?.code ||
      !hasValues?.name ||
      !hasValues?.slug ||
      // !hasValues?.description ||
      !hasValues?.regularPrice ||
      !hasValues?.categories ||
      !hasValues?.status ||
      !hasValues?.defaultImageId
      // !hasValues?.image ||
      // !hasValues?.salePrice ||
    );
  };

  const onInitCodeProduct = () => {
    form.setFieldValue("code", generatingRandomCode())
  }

  const disabledDate = (current) => {
    return current.isBefore(moment().subtract(1, 'day'))
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
      </div>
      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={onFinish}
        // onFieldsChange={handleFormChange}
        className=""
        requiredMark={false}
        initialValues={{
          code: "",
          name: "",
          slug: "",
          images: [],
          description: "",
          regularPrice: undefined,
          salePrice: undefined,
          onSale: false,
          dateOnSaleFrom: "",
          dateOnSaleTo: "",
          categories: listCategories.length > 0
            ? listCategories[0]?._id
            : "65dc591c3edd3bd7d99e724b",
          status: "draft",
          quantity: undefined,
          defaultImageId: ""
        }}
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <StyledFormItem
              name="code"
              className=""
              label={`Code`}
              rules={[
                {
                  required: true,
                  message: "Please, enter your product's code",
                },
              ]}
            >
              <StyledInput
                addonBefore="ECOM"
                className=""
                disabled
                placeholder={`Enter your product code`}
              />
            </StyledFormItem>

            <StyledFormItem
              name="name"
              className=""
              label={`Name`}
              rules={[
                {
                  required: true,
                  message: "Please, enter your product's name",
                },
              ]}
            >
              <StyledInput
                onChange={handleConvertToSlug}
                className=""
                placeholder={`Enter your product name`}
              />
            </StyledFormItem>

            <StyledFormItem
              name="slug"
              className=""
              label={`Slug`}
            >
              <StyledInput
                className=""
                placeholder={`Enter your product's slug`}
              />
            </StyledFormItem>

            <StyledFormItem
              name="images"
              className=""
              label={`Image`}
              rules={[
                {
                  required: true,
                  message: "Please, upload your product's images",
                },
              ]}
            >
              <UploadImage
                form={form}
                values={listImages}
                onChange={(images) => {
                  // console.log("images", images)
                  setListImages(images)
                }}
              />
            </StyledFormItem>

            <StyledFormItem
              name="defaultImageId"
              className=""
              label={`Default image`}
              rules={[
                {
                  required: true,
                  message: "Please, select the default image display",
                },
              ]}
            >
              {listImages?.length > 0
                ? (
                  <Radio.Group className="flex flex-row justify-start items-center gap-x-4 flex-wrap">
                    {listImages?.map((item, index) => {
                      return (
                        <div key={`${index}-${item?.uid}`} className="flex flex-col justify-between items-center gap-y-1 h-[100px]">
                          <div className="flex flex-col justify-center items-center">
                            <Image
                              width={100}
                              height={70}
                              src={item?.url}
                              preview={false}
                              className="object-contain"
                            />
                          </div>
                          <div className="flex flex-row justify-center items-center">
                            <Radio className="mr-0" value={item?.uid} />
                          </div>
                        </div>
                      )
                    })}
                  </Radio.Group>
                )
                : <h2 className="text-base font-normal text-black">No images are available</h2>}
            </StyledFormItem>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-x-4">
              <StyledFormItem
                name="quantity"
                className=""
                label={`Quantity`}
                rules={[
                  {
                    required: true,
                    message: "Please, enter your product quantity",
                  },
                ]}
              >
                <StyledInputNumber
                  className=""
                  placeholder={`Enter your product's quantity`}
                />
              </StyledFormItem>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StyledFormItem
                name="regularPrice"
                className=""
                label={`Regular price`}
                rules={[
                  {
                    required: true,
                    message: "Please, enter your product's regular price",
                  },
                ]}
              >
                <StyledInputNumber
                  className=""
                  placeholder={`Enter your product Regular price`}
                  formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              </StyledFormItem>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <StyledFormItem
                name="onSale"
                // className="col-span-2"
                label={`Is on sale ?`}
                valuePropName="checked"
              >
                <StyledCheckbox onClick={() => setIsOnSale(!isOnSale)}>On sale</StyledCheckbox>
              </StyledFormItem>

              {isOnSale && (
                <>
                  <StyledFormItem
                    name="salePrice"
                    className=""
                    label={`Sale price`}
                    rules={[
                      {
                        required: true,
                        message: "Please, enter your product Sale price",
                      },
                    ]}
                  >
                    <StyledInputNumber
                      className=""
                      placeholder={`Enter your product Sale price`}
                      formatter={val => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                  </StyledFormItem>

                  <StyledFormItem
                    name="dateOnSaleFrom"
                    className=""
                    label={`Sale from`}
                    rules={[
                      {
                        required: true,
                        message: "Please, selecting a date which you want to start product's sale",
                      },
                    ]}
                  >
                    <CustomDatePicker
                      disabledDate={disabledDate}
                    />
                  </StyledFormItem>

                  <StyledFormItem
                    name="dateOnSaleTo"
                    className=""
                    label={`Sale to`}
                    rules={[
                      {
                        required: true,
                        message: "Please, selecting a date which you want to end product's sale",
                      },
                    ]}
                  >
                    <CustomDatePicker
                      disabledDate={disabledDate}
                    />
                  </StyledFormItem>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <StyledFormItem
                name="categories"
                className=""
                label={`Category`}
              >
                <StyledSelect
                  placeholder="Select a category"
                  options={listCategories}
                />
              </StyledFormItem>

              <StyledFormItem
                name="status"
                className=""
                label={`Status`}
              >
                <StyledSelect
                  // defaultValue="draft"
                  options={[
                    {
                      value: 'draft',
                      label: 'Draft',
                    },
                    {
                      value: 'publish',
                      label: 'Publish',
                    },
                  ]}
                />
              </StyledFormItem>
            </div>
          </div>
        </div>
        <StyledFormItem
          name="description"
          className="col-span-1"
          label={`Description`}
        // rules={[
        //   {
        //     required: true,
        //     message: "Please, enter your description",
        //   },
        // ]}
        >
          <Ckeditor placeholder={"Enter news content"} />
        </StyledFormItem>

        <div className="flex flex-row justify-end items-center">
          <StyledButton
            className={"bg-[#333333] text-white text-base h-[40px]"}
            // disabled={isDisable}
            loading={loading}
            htmlType="submit"
          >
            Submit
          </StyledButton>
        </div>
      </Form>
    </React.Fragment>
  )
}

export default CreateProduct