import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";
import AdminNavigation from "../components/navigation/AdminNavigation";
import { ROLES } from "../components/auth/roles.js";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../components/DarkModeProvider.jsx";
import classes from "./dark.module.css";
import { getTimeLeft, handleTokenRefresh } from "../components/auth/auth.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastClasses from "./Toast.module.css";

export default function RootLayout() {
    const user = useLoaderData();
    const [darkMode] = useContext(DarkModeContext);
    const submit = useSubmit();
    const [help, setHelp] = useState(false);

    useEffect(() => {
        console.log("Root Effect");
        if (user) {
            handleTokenRefresh(user, submit).then(() => {
                console.log(
                    "Next check in: " + ((2 / 3) * getTimeLeft()) / 1000 / 60
                );
                window.setTimeout(
                    () => setHelp(!help),
                    (2 / 3) * getTimeLeft()
                );
            });
        }
    }, [user, submit, help]);

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
