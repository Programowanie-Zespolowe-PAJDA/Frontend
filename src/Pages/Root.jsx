import { Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";
import MainNavigationDev from "../components/navigation/MainNavigationDev";
import AdminNavigation from "../components/navigation/AdminNavigation";

export default function RootLayout({ dev }) {
    const data = useLoaderData();

    return (
        <>
            {dev ? (
                <MainNavigationDev token={data.token} />
            ) : (
                <MainNavigation token={data.token} />
            )}
            {data.isAdmin && <AdminNavigation />}
            <Outlet />
        </>
    );
}
