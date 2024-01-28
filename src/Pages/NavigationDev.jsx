import { NavLink, Outlet } from "react-router-dom";
import "./Navigation.css";

export default function NavigationDev() {
    return (
        <>
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
                        to="review"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }
                    >
                        Review
                    </NavLink>
                    <NavLink
                        to="review?waiter=602"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }
                    >
                        Review z kelnerem
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

            <Outlet />
        </>
    );
}
