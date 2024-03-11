import styled, { css } from 'styled-components';
import {
  Form,
  Input,
  Typography,
  Button,
  Layout,
  Menu,
  Avatar,
  Space,
  Breadcrumb,
  Table,
  Select,
  Collapse,
  Drawer,
  DatePicker,
  Modal,
  InputNumber,
  Switch,
  Card,
  Checkbox,
} from 'antd';
import { SIDER_WIDTH, SIDER_COLLAPSED_WIDTH } from '../constants/styles';

export const StyledSelect = styled(Select)`
  .ant-select-arrow {
    margin-top: 4px;
  }

  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 8px;
    height: 50px;
    font-size: 16px;
  }
`

export const StyledInputNumber = styled(InputNumber)` 
  width: 100%;
  height: 50px;
  border-radius: 8px;
  
  .ant-input-number-input-wrap > input {
    height: 50px;
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
  }
`

export const StyledCheckbox = styled(Checkbox)`
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
`

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 50px;
  border-radius: 8px;

  .ant-picker-input > input {
    // background: red;
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
  }
`

export const StyledSider = styled(Layout.Sider)`
  flex: 0 0 ${({ collapsed }) => (collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH)}px !important;
  max-width: ${({ collapsed }) => (collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH)}px !important;
  min-width: ${({ collapsed }) => (collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH)}px !important;
  width: ${({ collapsed }) => (collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH)}px !important;
`;

export const StyledForm = styled(Form)``;

export const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    height: auto !important;
    font-size: 18px;
    line-height: 22px;
    font-weight: 700;
  }
`;

export const StyledInput = styled(Input)`
  border-radius: 8px;
  height: 50px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 500
`;

export const StyledInputPassword = styled(Input.Password)`
  border-radius: 8px;
  height: 50px;
  font-size: 16px;
  line-height: 22px;
`;

export const StyledTypographyTitle = styled(Typography.Title)``;
export const StyledButton = styled(Button)`
  font-weight: 500;
  border-radius: 4px;
  font-size: 13px;

  /* &.ant-btn-primary {
    background: var(--primary);
    border-color: var(--primary);
  } */

  &.ant-btn-primary[disabled] {
    color: #333;
  }

  ${props => {
    if (props.type === 'dark') {
      return css`
        /* color: var(--white) !important;
        background-color: var(--gray700) !important; */
      `;
    }

    if (props.type === 'dashed') {
      return css`
        color: var(--primary);
        border-color: currentColor;
        background-color: var(--gray100);
      `;
    }

    if (props.active === 'true') {
      return css`
        color: var(--primary);
        font-weight: 600;
      `;
    }
  }}
`;