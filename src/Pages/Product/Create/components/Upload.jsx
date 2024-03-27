import React, { useState, useEffect } from 'react'

// @components
import UploadButton from './upload-button';
import {
  Modal,
  Upload,
} from "antd";

// @utility
import { uploadImg, uploadMultipleImg } from '../../../../utility/UploadImg';
import { validateFile } from '../../../../utility';

function UploadImage({ form, values = [], onChange = () => { } }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [loadingUpload, setLoadingUpload] = useState(false);

  const handleChange = async (props) => {
    const { file, fileList } = props || {};
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    // console.log("file", { file, fileList });
    if (fileList?.length === 1) {
      if (isJpgOrPng) await getBase64Img(file?.originFileObj)
    } else {
      const listBase64 = [];
      for (const item of fileList) {
        const base64 = await getBase64ImgMultiple(item?.originFileObj);
        listBase64.push(base64);
      }
      if (listBase64.length >= 2) {
        // console.log("CALLING API HERE", listBase64)
        const { data, status } = await uploadMultipleImg(listBase64)
        if (status === 200) {
          const listMultipleImage = data?.map(item => {
            return {
              uid: item?.public_id,
              url: item?.secure_url
            }
          })
          // console.log("listMultipleImage", listMultipleImage);
          onChange(listMultipleImage)
        }
      } else {
        return
      }
    }
  };

  const getBase64ImgMultiple = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleRemove = (e) => {
    // console.log("e", e);
    const defaultImageId = form.getFieldValue("defaultImageId")
    if (defaultImageId === e?.uid) {
      form.setFieldValue("defaultImageId", "")
      const fileRemoved = values?.filter((item) => item?.uid !== e?.uid);
      onChange(fileRemoved);
    } else {
      const fileRemoved = values?.filter((item) => item?.uid !== e?.uid);
      onChange(fileRemoved);
    }
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
          const list = [...values, listImg]
          onChange(list)
        }
      } catch (err) {
        console.log("FETCH FAIL!", err);
      } finally {
        setLoadingUpload(false);
      }
    }
  }

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
  };

  return (
    <React.Fragment>
      <Upload
        listType="picture-card"
        fileList={values}
        customRequest={(options) => {
          const { file } = options || {};
          options.onSuccess(file, options.file);
        }}
        beforeUpload={validateFile}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={(e) => handleRemove(e)}
        multiple={true}
      >
        {values.length >= 8 ? null : <UploadButton loading={loadingUpload} />}
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
    </React.Fragment>
  )
}

export default UploadImage