import { Link, Outlet } from "react-router-dom";
import "./navigation.css";

export default function Navigation() {
    return (
        <>
            <nav className="main-nav">
                <Link to="/">Home</Link>
                <Link to="/tests">Tests</Link>
                <Link to={"/qrdemo"}>QR Generation</Link>
            </nav>

            <Outlet />
        </>
    );
}
