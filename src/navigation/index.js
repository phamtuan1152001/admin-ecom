import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  ProductOutlined,
  AuditOutlined,
  SwitcherOutlined,
  DatabaseOutlined
} from '@ant-design/icons';

export const ROUTES_NAV = [
  {
    key: "home",
    icon: HomeOutlined,
    label: "Home page",
    children: [],
  },
  {
    key: "product",
    icon: ProductOutlined,
    label: "Manage products",
    children: [],
  },
  {
    key: "order",
    icon: AuditOutlined,
    label: "Manage orders",
    children: [],
  },
  {
    key: "vouchers",
    icon: SwitcherOutlined,
    label: "Manage vouchers",
    children: [],
  },
  {
    key: "others",
    icon: DatabaseOutlined,
    label: "Others",
    children: [],
  },
]; 