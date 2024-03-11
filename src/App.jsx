import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  UserOutlined
} from '@ant-design/icons';

// @antd
import { Layout, Menu, Button, theme } from 'antd';
import { StyledSider } from './styles/overrides';
const { Header, Content } = Layout;

// @routes
import RoutesComponents from './router';
import { generateLink } from './utility';

// @components
import Authentication from './Pages/Authentication';

const ROUTES = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Home",
    // children: [],
  },
  {
    key: "product",
    icon: <ProductOutlined />,
    label: "Products",
    children: [
      {
        key: "display-product",
        icon: <HomeOutlined />,
        label: "Display products",
        // children: [],
      },
      {
        key: "create-product",
        icon: <HomeOutlined />,
        label: "Create product",
        // children: [],
      },
      // {
      //   key: "update-product",
      //   icon: <HomeOutlined />,
      //   label: "Update product",
      //   // children: [],
      // },
    ],
  },
  {
    key: "order",
    icon: <AuditOutlined />,
    label: "Orders",
    children: [
      {
        key: "display-order",
        icon: <HomeOutlined />,
        label: "Display order",
        // children: [],
      },
      {
        key: "create-order",
        icon: <HomeOutlined />,
        label: "Create order",
        // children: [],
      },
      {
        key: "update-order",
        icon: <HomeOutlined />,
        label: "Update order",
        // children: [],
      },
    ],
  },
  {
    key: "vouchers",
    icon: <SwitcherOutlined />,
    label: "Vouchers",
    children: [
      {
        key: "display-voucher",
        icon: <HomeOutlined />,
        label: "Display voucher",
        // children: [],
      },
      {
        key: "create-voucher",
        icon: <HomeOutlined />,
        label: "Create voucher",
        // children: [],
      },
      {
        key: "update-voucher",
        icon: <HomeOutlined />,
        label: "Update voucher",
        // children: [],
      },
    ],
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

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const isAuthenticated = JSON.parse(localStorage.getItem("USER_INFO"))?.accessToken
  // console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    const isLogin = isAuthenticated ? true : false;
    if (isLogin) {
      apiMethod.defaults.headers.common["Authorization"] = isAuthenticated;
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <Authentication />
  }

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
          <h1 className='text-base font-bold text-center text-white'>PHAM LE SONG TUAN</h1>
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
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
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <RoutesComponents />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;