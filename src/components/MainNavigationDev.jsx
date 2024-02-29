import { NavLink } from "react-router-dom";
import "./MainNavigation.css";

export default function MainNavigationDev() {
    return (
        <nav className="main-nav">
            <div className="left-side">
                <NavLink
                    to=""
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                    end
                >
                    Home
                </NavLink>
                <NavLink
                    to="thankyou"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    ThankYou
                </NavLink>
                <NavLink
                    to="review/602"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    Review Add Test
                </NavLink>
                <NavLink
                    to="qr"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    QR
                </NavLink>
                <NavLink
                    to="reviewlist"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    Review lista
                </NavLink>
                <NavLink
                    to="userlist"
                    className={({ isActive }) =>
                        isActive ? "active" : undefined
                    }
                >
                    Lista użytkowników
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
