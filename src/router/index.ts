import { createBrowserRouter } from "react-router-dom"

import React, { lazy } from "react"

const Sheet = lazy(() => import("../pages/Sheet"))
const Login = lazy(() => import("../pages/Login"))
const BeforeEach = lazy(() => import("../components/BeforeEach"))
const routes = [
  {
    path: "/",
    element: React.createElement(BeforeEach),
    children: [
      {
        path: "sheet/:sheetId/:viewId",
        element: React.createElement(Sheet),
      },
      {
        path: "login",
        element: React.createElement(Login),
      },
    ],
  },
]
const router = createBrowserRouter(routes)

export default router
