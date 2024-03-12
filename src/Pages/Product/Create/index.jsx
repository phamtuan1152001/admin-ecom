import React, { useEffect, useState } from "react";
import classNames from "classnames";
import moment from "moment";

// @utility
import { convertToSlug } from "../../../utility";

// @components
import {
  Form,
  Button,
  Image,
  Radio
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

// @constants
import { SUCCESS } from '../../../constants';
import { getAllCategories } from "../../../services/service-common";

function CreateProduct() {
  const [form] = Form.useForm();
  // const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const [listCategories, setListCategories] = useState([])

  const [listImages, setListImages] = useState([])
  // const [dateStart, setDateStart] = useState('');
  // const [dateEnd, setDateEnd] = useState('');

  useEffect(() => {
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

  const handleConvertToSlug = () => {
    const newName = form.getFieldValue('name');
    const newSlug = convertToSlug(newName);
    form.setFieldValue('slug', newSlug);
  };

  const onFinish = async (values) => {
    console.log("values", values);
    // const { dob, image, ...rest } = values || {};
    // try {
    //   setLoading(true);
    //   const { data } = idProduct
    //     ? await updateProduct({
    //       idProduct,
    //       dob: moment(dob).format(),
    //       image: fileList,
    //       ...rest,
    //     })
    //     : await createProduct({
    //       dob: moment(dob).format(),
    //       image: fileList,
    //       ...rest,
    //     });

    //   if (data?.retCode === RETCODE_SUCCESS) {
    //     notification.success({
    //       message: "Successfully",
    //       description: data?.retText,
    //       duration: 2,
    //     });
    //     setTimeout(() => {
    //       // navigation.push("/manage-products");
    //     }, 1000);
    //   } else {
    //     notification.error({
    //       message: "Fail",
    //       description: "Create fail",
    //       duration: 2,
    //     });
    //   }
    // } catch (err) {
    //   console.log("FETCH FAIL!", err);
    // } finally {
    //   setLoading(false);
    // }
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
      !hasValues?.description ||
      !hasValues?.regularPrice ||
      !hasValues?.categories ||
      !hasValues?.status ||
      !hasValues?.defaultImageId
      // !hasValues?.image ||
      // !hasValues?.salePrice ||
    );
  };

  return (
    <React.Fragment>
      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={onFinish}
        onFieldsChange={handleFormChange}
        className=""
        requiredMark={false}
        initialValues={{
          code: "",
          name: "",
          slug: "",
          images: [],
          description: "",
          regularPrice: 0,
          salePrice: 0,
          onSale: false,
          dateOnSaleFrom: "",
          dateOnSaleTo: "",
          categories: listCategories[0]?._id,
          status: "draft",
          quantity: 0,
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
                  message: "Please, enter your product code",
                },
              ]}
            >
              <StyledInput
                className=""
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
                  message: "Please, enter your product name",
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
                placeholder={`Enter your product slug`}
              />
            </StyledFormItem>

            <StyledFormItem
              name="images"
              className=""
              label={`Image`}
            >
              <UploadImage
                values={listImages}
                onChange={(images) => {
                  console.log("images", images)
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
                  <Radio.Group className="flex flex-row justify-start items-center gap-x-4">
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
                  placeholder={`Enter your product quantity`}
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
                    message: "Please, enter your product Regular price",
                  },
                ]}
              >
                <StyledInputNumber
                  className=""
                  placeholder={`Enter your product Regular price`}
                />
              </StyledFormItem>

              <StyledFormItem
                name="salePrice"
                className=""
                label={`Sale price`}
              // rules={[
              //   {
              //     required: true,
              //     message: "Please, enter your product Sale price",
              //   },
              // ]}
              >
                <StyledInputNumber
                  className=""
                  placeholder={`Enter your product Sale price`}
                />
              </StyledFormItem>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <StyledFormItem
                name="onSale"
                className="col-span-2"
                label={`Is on sale ?`}
                valuePropName="checked"
              >
                <StyledCheckbox>On sale</StyledCheckbox>
              </StyledFormItem>

              <StyledFormItem
                name="dateOnSaleFrom"
                className=""
                label={`Sale from`}
              >
                <StyledDatePicker
                  // disabledDate={disabledDate}
                  placeholder={`Sale from`}
                  className=""
                  style={{ fontSize: 20 }}
                // disabledDate={current =>
                //   current.isBefore(moment().subtract(1, 'day')) ||
                //   (dateStart && dateStart.isAfter(moment(current))) ||
                //   (dateEnd && dateEnd.isBefore(moment(current)))}
                // onChange={value => setDateStart(value)}
                />
              </StyledFormItem>

              <StyledFormItem
                name="dateOnSaleTo"
                className=""
                label={`Sale to`}
              >
                <StyledDatePicker
                  // disabledDate={disabledDate}
                  placeholder={`Sale to`}
                  className=""
                  style={{ fontSize: 20 }}
                // disabledDate={current =>
                //   (dateStart && dateStart.isAfter(moment(current))) || (dateEnd && dateEnd.isBefore(moment(current)))}
                // onChange={value => setDateEnd(value)}
                />
              </StyledFormItem>
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
          rules={[
            {
              required: true,
              message: "Please, enter your description",
            },
          ]}
        >
          <Ckeditor placeholder={"Enter news content"} />
        </StyledFormItem>

        <div className="flex flex-row justify-end items-center">
          <Button
            className={"bg-[#333333] text-white text-base h-[40px]"}
            disabled={isDisable}
            loading={loading}
            htmlType="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </React.Fragment>
  )
}

export default CreateProduct