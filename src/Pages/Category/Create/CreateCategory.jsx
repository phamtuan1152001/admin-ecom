import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

// @utility
import { convertToSlug } from "../../../utility";

// @components
import {
  Form,
  notification
} from "antd";
import {
  StyledFormItem,
  StyledButton,
  StyledInput,
  StyledSelect
} from "../../../styles/overrides";
import SingleUpload from "../../../components/upload-image/SingleUpload";

// @constants
import { SUCCESS } from '../../../constants';
import { ROUTES } from "../../../router/constants";
import { createCategory } from "../service";

function CreateCategory() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [listImages, setListImages] = useState([])


  const handleConvertToSlug = () => {
    const newName = form.getFieldValue('name');
    const newSlug = convertToSlug(newName);
    form.setFieldValue('slug', newSlug);
  };

  const onFinish = async (values) => {
    // console.log("values", values);
    try {
      setLoading(true);
      const { images, ...rest } = values || {}
      const req = {
        ...rest,
        imageUrl: images[0]?.url,
        userId: JSON.parse(localStorage.getItem("USER_INFO")).id
      }
      const res = await createCategory(req);
      // console.log("req", req);
      if (res?.retCode === SUCCESS) {
        notification.success({
          message: "Successfully",
          description: res?.retText,
          duration: 2,
        });
        setTimeout(() => {
          // navigate(ROUTES.DISPLAY_CATEGORY)
          navigate(-1)
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
      !hasValues?.name ||
      !hasValues?.slug ||
      !hasValues?.status ||
      !hasValues?.images
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
          name: "",
          slug: "",
          status: "draft",
          images: undefined,
          description: "",
        }}
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
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
                className="w-full"
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
          </div>
          <div>
            <StyledFormItem
              name="status"
              className=""
              label={`Status`}
            >
              <StyledSelect
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

            <StyledFormItem
              name="images"
              className=""
              label={`Image`}
              rules={[
                {
                  required: true,
                  message: "Please, upload your category image",
                },
              ]}
            >
              <SingleUpload
                form={form}
                values={listImages}
                onChange={(images) => {
                  // console.log("images", images)
                  setListImages(images)
                }}
              />
            </StyledFormItem>
          </div>

          <div className="col-span-2">
            <StyledFormItem
              name="description"
              className=""
              label={`Description`}
            >
              <StyledInput
                onChange={handleConvertToSlug}
                className="w-full"
                placeholder={`Enter your product description`}
              />
            </StyledFormItem>
          </div>
        </div>

        <div className="flex flex-row justify-end items-center">
          <StyledButton
            className={"bg-[#333333] text-white text-base h-[40px]"}
            disabled={isDisable}
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

export default CreateCategory