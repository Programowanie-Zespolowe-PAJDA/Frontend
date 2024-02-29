import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import MainNavigationDev from "../components/MainNavigationDev";

export default function RootLayout({ dev }) {
    return (
        <>
            {dev ? <MainNavigationDev /> : <MainNavigation />}
            <Outlet />
        </>
    );
}
