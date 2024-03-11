import React, { useState } from 'react'
import apiMethod from '../../utility/apiMethod';

// @components
import { Form, Input, Button, notification } from "antd";

// @styles
import { StyledFormItem, StyledInput, StyledInputPassword, StyledButton } from '../../styles/overrides';

// @constants
import { SUCCESS } from '../../constants';

// @icon
import { EyeOpenIcon, EyesClose } from '../../assets/svg';

// @services
import { signInAdmin } from './services';

function Authentication() {
  const [form] = Form.useForm();
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const onFinish = async (payload) => {
    // console.log("values", payload);
    try {
      const res = await signInAdmin(payload);
      // console.log("res", res);
      if (res?.retCode === SUCCESS) {
        const accessToken = res?.data?.retData?.accessToken;
        localStorage.setItem("USER_INFO", JSON.stringify(res?.retData));
        apiMethod.defaults.headers.common["Authorization"] = accessToken;
        // await dispatch(ActionsUser.setInfoData(res?.data?.retData));
        notification.success({
          message: "Successfully",
          description: res?.retText,
          duration: 2,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        notification.error({
          message: "Fail",
          description: "Login unsuccessfully!",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
      notification.error({
        message: "Fail",
        description: `Login unsuccessfully - ${err.retText}`,
        duration: 2,
      });
    }
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const hasValues = form.getFieldsValue();
    setIsDisable(hasErrors || !hasValues?.username || !hasValues?.password);
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-[#F5F5F5]'>
      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={onFinish}
        onFieldsChange={handleFormChange}
        className="max-w-500 w-[500px] bg-white p-10 rounded-lg shadow-xl"
        requiredMark={false}
      >
        <StyledFormItem
          style={{
            fontSize: 50
          }}
          name="username"
          className="font-bold text-lg"
          label={`Username:`}
          rules={[
            {
              required: true,
              message: "Please, enter your username",
            },
          ]}
        >
          <StyledInput
            maxLength={50}
            autoFocus
            className=""
            placeholder={`Enter your username`}
          />
        </StyledFormItem>

        <StyledFormItem
          name="password"
          className=""
          label={`Password`}
          rules={[
            {
              required: true,
              message: "Please, enter your password",
            },
            {
              min: 3,
              message: "Your password can not less then 2 character",
            },
          ]}
        >
          <StyledInputPassword
            minLength={2}
            placeholder={`Enter your password`}
            className="input-field"
            iconRender={(visible) => {
              return visible ? (
                <EyeOpenIcon width={25} height={25} />
              ) : (
                <EyesClose width={25} height={25} />
              );
            }}
          />
        </StyledFormItem>

        <div className="d-flex flex-row justify-content-center align-items-center">
          <Button
            loading={loading}
            disabled={isDisable}
            className='bg-[#333333] w-full text-white text-[20px] leading-[24px] font-bold h-[60px]'
            htmlType="submit"
          >
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Authentication