import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import moment from "moment";

// @utility
import { uploadImg } from '../../../utility/UploadImg';
import { validateFile } from "../../../utility";

// @components
import {
  Form,
  Button,
  Modal,
  Upload,
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
import UploadButton from "./components/upload-button";

// @constants
import { SUCCESS } from '../../../constants';
import { getAllCategories } from "../../../services/service-common";

function CreateProduct() {
  const [form] = Form.useForm();
  // const navigation = useNavigation();
  const location = useLocation();

  const { idProduct } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [fileList, setFileList] = useState([]);

  const [listCategories, setListCategories] = useState([])


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

  const disabledDate = (current) => {
    const LIMIT_YEAR = 1900;
    return current && current.year() < LIMIT_YEAR;
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
      // !hasValues?.image ||
      !hasValues?.regularPrice ||
      !hasValues?.salePrice ||
      !hasValues?.categories ||
      !hasValues?.status
    );
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
  };

  const getBase64Img = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      fetchUploadImg(reader.result)
    };
  };
  const fetchUploadImg = async (img) => {
    // console.log("img", img);
    if (img) {
      try {
        setLoadingUpload(true);
        const res = await uploadImg(img);
        if (res?.status === 200) {
          const listImg = {
            uid: res?.data?.version_id,
            url: res?.data?.secure_url,
          };
          setFileList((prev) => [...prev, listImg]);
        }
      } catch (err) {
        console.log("FETCH FAIL!", err);
      } finally {
        setLoadingUpload(false);
      }
    }
  }

  const handleChange = async (props) => {
    const { file, fileList } = props || {};
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    // console.log("file", file);
    if (isJpgOrPng) await getBase64Img(file?.originFileObj)
  };

  const handleRemove = (e) => {
    // console.log("e", e);
    const fileRemoved = fileList?.filter((item) => item?.uid !== e?.uid);
    setFileList(fileRemoved);
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
          status: "draft"
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

                className=""
                placeholder={`Enter your product name`}
              />
            </StyledFormItem>

            <StyledFormItem
              name="slug"
              className=""
              label={`Slug`}
              rules={[
                {
                  required: true,
                  message: "Please, enter your product slug",
                },
              ]}
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
              <Upload
                listType="picture-card"
                fileList={fileList}
                customRequest={(options) => {
                  const { file } = options || {};
                  options.onSuccess(file, options.file);
                }}
                beforeUpload={validateFile}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={(e) => handleRemove(e)}
              >
                {fileList.length >= 8 ? null : <UploadButton loading={loadingUpload} />}
              </Upload>
              <Modal
                open={previewOpen}
                title={""}
                footer={null}
                onCancel={handleCancel}
                centered
              >
                <img
                  alt="preview-img"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </StyledFormItem>
          </div>

          <div>
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
                  disabledDate={disabledDate}
                  placeholder={`Sale from`}
                  className=""
                  style={{ fontSize: 20 }}
                />
              </StyledFormItem>

              <StyledFormItem
                name="dateOnSaleTo"
                className=""
                label={`Sale to`}
              >
                <StyledDatePicker
                  disabledDate={disabledDate}
                  placeholder={`Sale to`}
                  className=""
                  style={{ fontSize: 20 }}
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
                  defaultValue="draft"
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