import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import moment from "moment";

// @utility
import { uploadImg } from '../../../utility/UploadImg';

// @components
import {
  Form,
  Button,
  notification,
  Select,
  DatePicker,
  Modal,
  Upload,
  message,
  Spin,
} from "antd";
const { Option } = Select;
import { PlusOutlined } from "@ant-design/icons";
import { StyledForm, StyledFormItem, StyledButton, StyledInput, StyledInputPassword } from "../../../styles/overrides";
// import Ckeditor from "../../../components/Ckeditors"
import Ckeditor from "../../../components/Ckeditors";

// @constants
import { SUCCESS } from '../../../constants';

function CreateProduct() {
  const [form] = Form.useForm();
  // const navigation = useNavigation();
  const location = useLocation();

  const { idProduct } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const [imgBase64, setImgBase64] = useState();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  // useEffect(() => {
  //   if (idProduct) {
  //     fetchDetailProduct();
  //     // handleFormChange();
  //   }
  // }, []);

  // useEffect(async () => {
  //   if (imgBase64) {
  //     try {
  //       setLoadingUpload(true);
  //       const res = await uploadImg(imgBase64);
  //       if (res?.status === 200) {
  //         const listImg = {
  //           uid: res?.data?.version_id,
  //           url: res?.data?.secure_url,
  //         };
  //         setFileList((prev) => [...prev, listImg]);
  //         setImgBase64();
  //       }
  //     } catch (err) {
  //       console.log("FETCH FAIL!", err);
  //     } finally {
  //       setLoadingUpload(false);
  //     }
  //   }
  // }, [imgBase64]);

  const disabledDate = (current) => {
    const LIMIT_YEAR = 1900;
    return current && current.year() < LIMIT_YEAR;
  };

  const getBase64Img = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgBase64(reader.result);
    };
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
    setIsDisable(
      hasErrors ||
      !hasValues?.name ||
      !hasValues?.description ||
      // !hasValues?.image ||
      !hasValues?.price ||
      !hasValues?.gender ||
      !hasValues?.age ||
      !hasValues?.weight ||
      !hasValues?.location ||
      !hasValues?.dob
    );
  };

  const handleCancel = () => setPreviewOpen(false);

  const validateFile = (file) => {
    // console.log("hihi", file);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("Your image must less than 10MB");
    }
    return isJpgOrPng && isLt10M;
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
  };

  const handleChange = async (props) => {
    const { file, fileList } = props || {};
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (isJpgOrPng) await getBase64Img(file?.originFileObj);
  };

  const handleRemove = (e) => {
    // console.log("e", e);
    const fileRemoved = fileList?.filter((item) => item?.uid !== e?.uid);
    setFileList(fileRemoved);
  };

  const uploadButton = (
    <Spin spinning={loadingUpload}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </Spin>
  );


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
      >
        <div className="grid grid-cols-2 gap-4">
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
                autoFocus
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
                autoFocus
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
                autoFocus
                className=""
                placeholder={`Enter your product slug`}
              />
            </StyledFormItem>
          </div>
          <div>pham le song tuan</div>
          {/* <StyledFormItem
            name="image"
            className="form-custom col-6 ps-3 pe-3"
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
              {fileList.length >= 8 ? null : uploadButton}
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
          </StyledFormItem> */}
        </div>
        <div>
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
        </div>
        <div className="flex flex-row justify-end items-center">
          <Button
            // className={classNames({
            //   "submit-btn": true,
            //   disable: idProduct ? false : isDisable,
            // })}
            // disabled={idProduct ? false : isDisable}
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