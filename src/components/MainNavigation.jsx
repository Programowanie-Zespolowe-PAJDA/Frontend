import { NavLink } from "react-router-dom";
import "./MainNavigation.css";

export default function MainNavigation() {
    return (
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
    );
}
