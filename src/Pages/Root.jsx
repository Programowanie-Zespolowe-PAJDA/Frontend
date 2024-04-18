import { Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";
import AdminNavigation from "../components/navigation/AdminNavigation";
import { ROLES } from "../components/auth/roles.js";
import { useContext } from "react";
import { DarkModeContext } from "../components/DarkModeProvider.jsx";
import classes from "./dark.module.css";

export default function RootLayout({ dev }) {
    const data = useLoaderData();
    const [darkMode, setDarkMode] = useContext(DarkModeContext);

    return (
        <div className={darkMode ? classes.dark : undefined}>
            <MainNavigation token={data} />
            {data && data.role === ROLES.ADMIN && <AdminNavigation />}
            <Outlet />
        </div>
    );
}
