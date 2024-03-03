import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";

import HomePage from "./Pages/Home";
import AuthenticationPage from "./Pages/Authentication";
import ErrorPage from "./Pages/Error";
import ReviewAddPage, { reviewAddAction } from "./Pages/Review";
import ThankYouPage from "./Pages/ThankYou";
import DisplayReviewsPage, {
    reviewDisplayAction,
} from "./Pages/DisplayReviews";
import DisplayUsersPage from "./Pages/DisplayUsers";

import GenerateQRTestPage from "./Pages/GenerateQRTest";
import RootLayout from "./Pages/Root";

export const LOCAL = false;

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "auth", element: <AuthenticationPage /> },
            { path: "thankyou", element: <ThankYouPage /> },
            {
                path: "review/:waiterId",
                element: <ReviewAddPage />,
                action: reviewAddAction,
            },
        ],
    },
    {
        path: "/dev",
        element: <RootLayout dev={true} />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "auth", element: <AuthenticationPage /> },
            { path: "thankyou", element: <ThankYouPage /> },
            {
                path: "review/:waiterId",
                element: <ReviewAddPage />,
                action: reviewAddAction,
            },
            { path: "qr", element: <GenerateQRTestPage /> },
            {
                path: "reviewlist",
                element: <DisplayReviewsPage />,
                loader: reviewDisplayAction,
            },
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
