import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function AdminNavigation() {
    return (
        <nav className={classes.adminNav}>
            <NavLink
                to="reviewlist"
                className={({ isActive }) =>
                    `${classes.navLink} ${
                        isActive ? classes.active : undefined
                    }`
                }
            >
                Review lista
            </NavLink>
            <NavLink
                to="userlist"
                className={({ isActive }) =>
                    `${classes.navLink} ${
                        isActive ? classes.active : undefined
                    }`
                }
            >
                Lista użytkowników
            </NavLink>
        </nav>
    );
}
