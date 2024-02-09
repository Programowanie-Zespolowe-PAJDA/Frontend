import { NavLink, Outlet } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
    return (
        <>
            <nav className="main-nav">
                <div className="left-side">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }
                        end
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/dev"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }
                    >
                        Dev
                    </NavLink>
                </div>
                <div className="right-side">
                    <NavLink
                        to="auth"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }
                    >
                        Login
                    </NavLink>
                </div>
            </nav>

            <Outlet />
        </>
    );
}
