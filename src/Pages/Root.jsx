import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";
import AdminNavigation from "../components/navigation/AdminNavigation";
import { ROLES } from "../components/auth/roles.js";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "../components/DarkModeProvider.jsx";
import classes from "./dark.module.css";
import { msTokenLife } from "../components/auth/auth.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastClasses from "./Toast.module.css";

export default function RootLayout() {
    const user = useLoaderData();
    const [darkMode] = useContext(DarkModeContext);
    const submit = useSubmit();

    useEffect(() => {
        if (user) {
            const msLeft = msTokenLife - (Date.now() - user.lastRefresh);
            // Expired
            if (msLeft <= 0) {
                submit(null, { action: "/logout", method: "post" });
            }

            setTimeout(() => {
                submit(null, { action: "/logout", method: "post" });
            }, msLeft);
        }
    }, [user, submit]);

    return (
        <div className={darkMode ? classes.dark : undefined}>
            <MainNavigation token={user} />
            {user && user.role === ROLES.ADMIN && <AdminNavigation />}
            <ToastContainer
                position="top-center"
                className={toastClasses.toast}
            />
            <Outlet />
        </div>
    );
}
