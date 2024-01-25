import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";

import Navigation from "./Pages/Navigation";
import NavigationDev from "./Pages/NavigationDev";
import HomePage from "./Pages/HomePage";
import AuthenticationPage from "./Pages/AuthenticationPage";
import ErrorPage from "./Pages/ErrorPage";
import ReviewPage from "./Pages/ReviewPage";
import ThankYouPage from "./Pages/ThankYouPage";
import DisplayReviewsPage from "./Pages/DisplayReviewsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigation />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "auth", element: <AuthenticationPage /> },
            { path: "thankyou", element: <ThankYouPage /> },
            { path: "review", element: <ReviewPage /> },
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
            { path: "review", element: <ReviewPage /> },
            { path: "reviewlist", element: <DisplayReviewsPage /> },
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
