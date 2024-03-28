import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// @constants
import { ROUTES } from './constants';

// @content
/* Dashboard */
import DashboardPage from '../Pages/Dashboard';
/* End */

/* Home */
import Home from '../Pages/Home';
/* End */

/* Product */
import DisplayProduct from '../Pages/Product/Display';
import CreateProduct from '../Pages/Product/Create';
import UpdateProduct from '../Pages/Product/Update';
import ManageImport from '../Pages/Product/ManageImport';
/* End */

/* Order */
import DisplayOrder from '../Pages/Order/Display';
import DetailOrder from '../Pages/Order/Detail';
/* End */

/* Category */
import DisplayCategories from '../Pages/Category/Display/DisplayCategories';
import CreateCategory from '../Pages/Category/Create/CreateCategory';
import UpdateCategories from '../Pages/Category/Update/UpdateCategories';

/* End */

const ROUTE_LIST = [
  {
    path: ROUTES.DASHBOARD_PAGE,
    element: <DashboardPage />
  },
  {
    path: ROUTES.DISPLAY_PRODUCT,
    element: <DisplayProduct />
  },
  {
    path: ROUTES.CREATE_PRODUCT,
    element: <CreateProduct />
  },
  {
    path: ROUTES.UPDATE_PRODUCT,
    element: <UpdateProduct />
  },
  {
    path: ROUTES.DISPLAY_ORDER,
    element: <DisplayOrder />
  },
  {
    path: ROUTES.DETAIL_ORDER,
    element: <DetailOrder />
  },
  {
    path: ROUTES.DISPLAY_CATEGORY,
    element: <DisplayCategories />
  },
  {
    path: ROUTES.CREATE_CATEGORY,
    element: <CreateCategory />
  },
  {
    path: ROUTES.UPDATE_CATEGORY,
    element: <UpdateCategories />
  },
  {
    path: ROUTES.MANAGE_IMPORT,
    element: <ManageImport />
  },
]

function RoutesComponents() {
  return (
    <Routes>
      {ROUTE_LIST.map((item, index) => {
        return (
          <Route key={index} path={item.path} element={item.element} />
        )
      })}
    </Routes>
  )
}

export default RoutesComponents