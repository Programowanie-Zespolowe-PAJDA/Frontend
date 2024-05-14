import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";
import AdminNavigation from "../components/navigation/AdminNavigation";
import { ROLES } from "../components/auth/roles.js";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "../components/DarkModeProvider.jsx";
import classes from "./dark.module.css";
import { msTokenLife } from "../components/auth/auth.js";

export default function RootLayout({ dev }) {
    const user = useLoaderData();
    const [darkMode, setDarkMode] = useContext(DarkModeContext);
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
            <Outlet />
        </div>
    );
}
