import { Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";
import MainNavigationDev from "../components/navigation/MainNavigationDev";
import AdminNavigation from "../components/navigation/AdminNavigation";
import { ROLES } from "../components/auth/roles.js";

export default function RootLayout({ dev }) {
    const data = useLoaderData();

    return (
        <>
            {dev ? (
                <MainNavigationDev user={data} />
            ) : (
                <MainNavigation token={data} />
            )}
            {data && data.role === ROLES.ADMIN && <AdminNavigation />}
            <Outlet />
        </>
    );
}
