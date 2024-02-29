import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
    return (
        <nav className={classes.mainNav}>
            <div className={classes.leftSide}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? classes.active : undefined
                    }
                    end
                >
                    Home
                </NavLink>
                <NavLink
                    to="/dev"
                    className={({ isActive }) =>
                        isActive ? classes.active : undefined
                    }
                >
                    Dev
                </NavLink>
            </div>
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
        </nav>
    );
}
