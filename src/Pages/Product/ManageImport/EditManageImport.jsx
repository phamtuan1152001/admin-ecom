import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

// @components
import {
  Form,
  Image,
  Radio,
  notification
} from "antd";
import {
  StyledFormItem,
  StyledButton,
  StyledInput,
} from "../../../styles/overrides";
import Ckeditor from "../../../components/Ckeditors";
import ImageUpload from "../../../components/upload-image/Upload";

// @constants
import { SUCCESS, PAGE_SIZE, PAGE_LIMIT } from "../../../constants";
import { ROUTES } from "../../../router/constants";

// @services
import { updateDetailImport, getDetailImport } from "../service";

function EditManageImport() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation()

  const { importInfo } = location?.state || {}

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([])
  const [listImports, setListImports] = useState([])
  const [description, setDescription] = useState("")

  useEffect(() => {
    fetchGetDetailImport()
  }, [])

  const onInitData = (data) => {
    if (Object.keys(data).length > 0) {
      const { code, defaultImageId, listImages, description } = data || {}
      setImages(listImages)
      setDescription(description)
      form.setFieldsValue({
        code,
        defaultImageId,
        listImages,
        description
      })
    }
  }

  const fetchGetDetailImport = async () => {
    try {
      setLoading(false)
      const req = {
        importId: importInfo?._id,
        userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id
      }
      const res = await getDetailImport(req)
      if (res?.retCode === SUCCESS) {
        onInitData(res?.retData)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const onFinish = async (values) => {
    // console.log("v", values)
    try {
      setLoading(true)
      const req = {
        ...values,
        userId: JSON.parse(localStorage.getItem("USER_INFO"))?.id,
        _id: importInfo?._id
      }
      const res = await updateDetailImport(req)
      if (res?.retCode === SUCCESS) {
        notification.success({
          message: "Successfully",
          description: res?.retText,
          duration: 2,
        });
        setTimeout(() => {
          navigate(ROUTES.MANAGE_IMPORT)
        }, 500);
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

  return (
    <React.Fragment>
      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={onFinish}
        className=""
        requiredMark={false}
      >
        <div className="grid grid-cols-1 gap-6">
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
              // addonBefore="ECOM"
              className=""
              disabled
              placeholder={`Enter your product code`}
            />
          </StyledFormItem>

          <StyledFormItem
            name="listImages"
            className=""
            label={`Image`}
            rules={[
              {
                required: true,
                message: "Please, upload your product's images",
              },
            ]}
          >
            <ImageUpload
              form={form}
              values={images}
              onChange={(images) => {
                // console.log("images", images)
                setImages(images)
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
            {images?.length > 0
              ? (
                <Radio.Group className="flex flex-row justify-start items-center gap-x-4 flex-wrap">
                  {images?.map((item, index) => {
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

          <StyledFormItem
            name="description"
            className="col-span-1"
            label={`Description`}
          >
            <Ckeditor description={description} placeholder={"Enter news content"} />
          </StyledFormItem>
        </div>

        <div className="flex flex-row justify-end items-center">
          <StyledButton
            className={"bg-[#333333] text-white text-base h-[40px]"}
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

export default EditManageImport