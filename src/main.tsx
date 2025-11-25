import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import List from "./pages/book-search/List";
import CustomErrorBoundary from "./pages/error/CustomErrorBoundary";
import PageNotFound from "./pages/error/PageNotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <CustomErrorBoundary />,
        children: [
            {
                path: "/",
                element: <List />,
            },
            {
                path: "book",
                element: <>book</>,
            },
            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
