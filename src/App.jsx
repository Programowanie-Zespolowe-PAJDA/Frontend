import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";

import Navigation from "./Pages/Navigation";
import NavigationDev from "./Pages/NavigationDev";
import HomePage from "./Pages/HomePage";
import AuthenticationPage from "./Pages/AuthenticationPage";
import ErrorPage from "./Pages/ErrorPage";
import ReviewAddPage from "./Pages/ReviewPage";
import ThankYouPage from "./Pages/ThankYouPage";
import DisplayReviewsPage from "./Pages/DisplayReviewsPage";
import DisplayUsersPage from "./Pages/DisplayUsersPage";

import GenerateQRTestPage from "./Pages/GenerateQRTestPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigation />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "auth", element: <AuthenticationPage /> },
            { path: "thankyou", element: <ThankYouPage /> },
            { path: "review", element: <ReviewAddPage /> },
        ],
    },
    {
        path: "/dev",
        element: <NavigationDev />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "auth", element: <AuthenticationPage /> },
            { path: "thankyou", element: <ThankYouPage /> },
            { path: "review", element: <ReviewAddPage /> },
            { path: "qr", element: <GenerateQRTestPage /> },
            { path: "reviewlist", element: <DisplayReviewsPage /> },
            { path: "userlist", element: <DisplayUsersPage /> },
        ],
    },
]);

export function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
