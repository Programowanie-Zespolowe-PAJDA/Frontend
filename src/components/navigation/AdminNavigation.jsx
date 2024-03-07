import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function AdminNavigation() {
    return (
        <nav className={classes.mainNav}>
            <NavLink
                to="thankyou"
                className={({ isActive }) =>
                    isActive ? classes.active : undefined
                }
            >
                Thank You
            </NavLink>
            <NavLink
                to="error"
                className={({ isActive }) =>
                    isActive ? classes.active : undefined
                }
            >
                Błąd
            </NavLink>
            <NavLink
                to="reviewlist"
                className={({ isActive }) =>
                    isActive ? classes.active : undefined
                }
            >
                Review lista
            </NavLink>
            <NavLink
                to="userlist"
                className={({ isActive }) =>
                    isActive ? classes.active : undefined
                }
            >
                Lista użytkowników
            </NavLink>
        </nav>
    );
}
