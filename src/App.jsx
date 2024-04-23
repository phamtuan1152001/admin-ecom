import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import apiMethod from './utility/apiMethod';

// @icon
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  ProductOutlined,
  AuditOutlined,
  SwitcherOutlined,
  DatabaseOutlined,
  UserOutlined,
  MonitorOutlined
} from '@ant-design/icons';

// @antd
import { Layout, Menu, Button, theme } from 'antd';
import { StyledSider } from './styles/overrides';
const { Header, Content } = Layout;
import {
  LogoutOutlined
} from '@ant-design/icons';

// @routes
import RoutesComponents from './router';
import { generateLink } from './utility';

// @components
import Authentication from './Pages/Authentication';

// @constants
import { ROUTES_LABEL } from './router/constants';
import { FAIL, SUCCESS } from './constants';

// @services
import { verifyToken } from './services/service-common';

const ROUTES = [
  {
    key: "",
    icon: <HomeOutlined />,
    label: ROUTES_LABEL.HOME_PAGE,
    // children: [],
  },
  {
    key: "category",
    icon: <MonitorOutlined />,
    label: ROUTES_LABEL.CATEGORY_LABEL,
    children: [
      {
        key: "display-category",
        icon: <HomeOutlined />,
        label: ROUTES_LABEL.DISPLAY_CATEGORY,
        // children: [],
      },
      {
        key: "create-category",
        icon: <HomeOutlined />,
        label: ROUTES_LABEL.CREATE_CATEGORY,
        // children: [],
      },
    ],
  },
  {
    key: "product",
    icon: <ProductOutlined />,
    label: ROUTES_LABEL.PRODUCT_LABEL,
    children: [
      {
        key: "display-product",
        icon: <HomeOutlined />,
        label: ROUTES_LABEL.DISPLAY_PRODUCT,
        // children: [],
      },
      {
        key: "create-product",
        icon: <HomeOutlined />,
        label: ROUTES_LABEL.CREATE_PRODUCT,
        // children: [],
      },
      {
        key: "manage-import",
        icon: <HomeOutlined />,
        label: ROUTES_LABEL.MANAGE_IMPORT,
        // children: [],
      },
      {
        key: "create-manage-import",
        icon: <HomeOutlined />,
        label: ROUTES_LABEL.CREATE_MANAGE_IMPORT,
        // children: [],
      },
    ],
  },
  {
    key: "customized-product",
    icon: <ProductOutlined />,
    label: ROUTES_LABEL.CUSTOMIZED_PRODUCT_LABEL,
    // children: []
  },
  {
    key: "order",
    icon: <AuditOutlined />,
    label: ROUTES_LABEL.ORDER_LABEL,
    children: [
      {
        key: "display-order",
        icon: <HomeOutlined />,
        label: ROUTES_LABEL.DISPLAY_ORDER,
        // children: [],
      },
      {
        key: "display-order-customized-product",
        icon: <HomeOutlined />,
        label: ROUTES_LABEL.DISPLAY_ORDER_CUSTOMIZED_PRODUCT,
        // children: [],
      },
    ],
  },
  {
    key: "vouchers",
    icon: <SwitcherOutlined />,
    label: ROUTES_LABEL.VOUCHER_LABEL,
    // children: [
    //   {
    //     key: "display-voucher",
    //     icon: <HomeOutlined />,
    //     label: ROUTES_LABEL.DISPLAY_VOUCHER,
    //     // children: [],
    //   },
    //   {
    //     key: "create-voucher",
    //     icon: <HomeOutlined />,
    //     label: ROUTES_LABEL.CREATE_VOUCHER,
    //     // children: [],
    //   },
    // ],
  },
  {
    key: "others",
    icon: <DatabaseOutlined />,
    label: "Others",
    // children: [],
  },
];

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeRoute = location.pathname.substring(1).split("/")

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isAuthenticated = JSON.parse(localStorage.getItem("USER_INFO"))?.accessToken

  const fetchVerifyToken = async (accessToken) => {
    try {
      const res = await verifyToken(accessToken)
      if (res?.retCode === SUCCESS) {
        return
      }
      // console.log("res", res)
    } catch (err) {
      // console.log("FETCHING FAIL!", err)
      if (err.retCode === FAIL) {
        handleLogOut()
      }
    }
  }

  const handleLogOut = async () => {
    localStorage.removeItem("USER_INFO")
    window.location.href = "/"
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchVerifyToken(isAuthenticated)
    }
  }, [])

  if (!isAuthenticated) {
    return <Authentication />
  }
  // console.log("activeRoute", activeRoute);

  return (
    <Layout className='h-screen'>
      <StyledSider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="py-4 flex flex-col justify-center items-center gap-2">
          <div className='flex flex-col justify-center items-center'>
            <UserOutlined style={{ fontSize: 30, color: "#FFFFFF" }} />
          </div>
          <h1 className='text-base font-bold text-center text-white'>
            {JSON.parse(localStorage.getItem("USER_INFO")).fullName}
          </h1>
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={activeRoute}
          defaultOpenKeys={activeRoute}
          onClick={(e) => {
            // console.log("e", e)
            const { key, keyPath } = e || {}
            const link = generateLink(keyPath)
            navigate(link)
          }}
          items={ROUTES}
        />
      </StyledSider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className='flex flex-row justify-between items-center mx-4'>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div className='flex flex-row justify-center items-center gap-x-2 cursor-pointer' onClick={() => handleLogOut()}>
              <div className='flex flex-col justify-center items-center'><LogoutOutlined /></div>
              <h3>Logout</h3>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
          }}
        >
          <RoutesComponents />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;