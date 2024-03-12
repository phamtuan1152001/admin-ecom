import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// @constants
import { ROUTES } from './constants';

// @content
/* Home */
import Home from '../Pages/Home';
/* End */

/* Product */
import DisplayProduct from '../Pages/Product/Display';
import CreateProduct from '../Pages/Product/Create';
import UpdateProduct from '../Pages/Product/Update';
/* End */

const ROUTE_LIST = [
  {
    path: ROUTES.HOME_PAGE,
    element: <Home />
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