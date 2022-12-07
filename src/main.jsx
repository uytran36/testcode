import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import { Button, Result } from "antd";
import Admin from "./Admin";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Admin />,
    // children: [{ path: "/credit-score",  }],
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => (window.location.href = "/")}>
            Back Home
          </Button>
        }
      />
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
