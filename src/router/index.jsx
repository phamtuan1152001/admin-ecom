import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
    path: "/",
    element: <Home />
  },
  {
    path: "/product/display-product",
    element: <DisplayProduct />
  },
  {
    path: "/product/create-product",
    element: <CreateProduct />
  },
  {
    path: "/product/update-product",
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