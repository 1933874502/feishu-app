import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import "./i18n/index"
import { Provider } from "react-redux"
import store from "./store"
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Suspense>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </Suspense>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
