import React, { useState, useEffect } from 'react'

// @components
import UploadButton from './upload-button';
import {
  Modal,
  Upload,
} from "antd";

// @utility
import { uploadImg } from '../../../../utility/UploadImg';
import { validateFile } from '../../../../utility';

function UploadImage({ values = [], onChange = () => { } }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [fileList, setFileList] = useState(values);
  console.log("fileList", fileList);

  useEffect(() => {
    onChange(fileList)
  }, [fileList])

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

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default UploadImage