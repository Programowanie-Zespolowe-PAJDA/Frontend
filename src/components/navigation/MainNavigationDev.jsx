import { Form, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigationDev({ user }) {
    return (
        <nav className={classes.mainNav}>
            <div className={classes.leftSide}>
                <NavLink
                    to=""
                    className={({ isActive }) =>
                        isActive ? classes.active : undefined
                    }
                    end
                >
                    Home
                </NavLink>

                <NavLink
                    to="review/602"
                    className={({ isActive }) =>
                        isActive ? classes.active : undefined
                    }
                >
                    Review Add Test
                </NavLink>

                {user && (
                    <NavLink
                        to="qr"
                        className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        }
                    >
                        QR
                    </NavLink>
                )}

                {user && (
                    <NavLink
                        to="userpanel"
                        className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        }
                    >
                        Panel użytkownika
                    </NavLink>
                )}
                {user && (
                    <NavLink
                        to="info"
                        className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        }
                    >
                        Informacje
                    </NavLink>
                )}
            </div>
            {user && (
                <div className={classes.rightSide}>
                    <Form action={"logout"} method={"post"}>
                        <button className={classes.logoutButton}>Logout</button>
                    </Form>
                </div>
            )}
            {!user && (
                <div className={classes.rightSide}>
                    <NavLink
                        to="auth"
                        className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        }
                    >
                        Login
                    </NavLink>
                </div>
            )}
        </nav>
    );
}
