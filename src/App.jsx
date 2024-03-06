import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";

import HomePage from "./Pages/Home";
import AuthenticationPage from "./Pages/AuthenticationPage.jsx";
import { action as authAction } from "./components/auth/auth.js";
import { action as logoutAction } from "./components/auth/Logout.jsx";
import { tokenLoader } from "./components/auth/auth.js";
import ErrorPage from "./Pages/Error";
import ReviewAddPage, { reviewAddAction } from "./Pages/Review";
import ThankYouPage from "./Pages/ThankYou";
import DisplayReviewsPage, {
    reviewDisplayLoader,
} from "./Pages/DisplayReviews";
import DisplayUsersPage from "./Pages/DisplayUsers";

import GenerateQRTestPage from "./Pages/GenerateQRTest";
import RootLayout from "./Pages/Root";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import UserInfo from "./Pages/UserInfo.jsx";
import UserPanelPage, { userPanelLoader } from "./Pages/UserPanel";

export const LOCAL = true;

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
        // errorElement: <ErrorPage />,
        loader: tokenLoader,
        id: "root",
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "auth",
                element: <AuthenticationPage />,
                action: authAction,
            },
            {
                path: "logout",
                action: logoutAction,
            },
            { path: "thankyou", element: <ThankYouPage /> },
            {
                path: "review/:waiterId",
                element: <ReviewAddPage />,
                action: reviewAddAction,
            },
            {
                path: "qr",
                element: (
                    <ProtectedRoute>
                        {" "}
                        <GenerateQRTestPage />{" "}
                    </ProtectedRoute>
                ),
            },
            {
                path: "reviewlist",
                element: (
                    <ProtectedRoute>
                        {" "}
                        <DisplayReviewsPage />{" "}
                    </ProtectedRoute>
                ),
                loader: reviewDisplayLoader,
            },
            {
                path: "userlist",
                element: (
                    <ProtectedRoute>
                        {" "}
                        <DisplayUsersPage />{" "}
                    </ProtectedRoute>
                ),
            },
            {
                path: "userInfo",
                element: <UserInfo></UserInfo>,
            },
            {
                path: "userpanel",
                element: <UserPanelPage />,
                loader: userPanelLoader,
            },
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
