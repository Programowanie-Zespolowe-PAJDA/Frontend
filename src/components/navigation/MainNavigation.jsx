import { Form, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigation({ token }) {
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
                    to="review/1"
                    className={({ isActive }) =>
                        isActive ? classes.active : undefined
                    }
                >
                    Review Add Test
                </NavLink>

                {token && (
                    <>
                        <NavLink
                            to="qr"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            QR
                        </NavLink>
                        <NavLink
                            to="userpanel"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Panel użytkownika
                        </NavLink>
                        <NavLink
                            to="info"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Informacje
                        </NavLink>
                    </>
                )}
            </div>
            {token && (
                <div className={classes.rightSide}>
                    <Form action={"logout"} method={"post"}>
                        <button className={classes.logoutButton}>Logout</button>
                    </Form>
                </div>
            )}
            {!token && (
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
