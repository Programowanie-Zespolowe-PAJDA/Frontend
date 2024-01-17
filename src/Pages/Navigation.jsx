import { Link, Outlet } from "react-router-dom";
import "./navigation.css";

export default function Navigation() {
    return (
        <>
            <nav className="main-nav">
                <Link to="/">Home</Link>
                <Link to="/tests">Tests</Link>
                <Link to="/tip">Tip</Link>
                <Link to="/thankyou">ThankYou</Link>
            </nav>

            <Outlet />
        </>
    );
}
