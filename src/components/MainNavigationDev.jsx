import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function MainNavigationDev() {
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
                    to="thankyou"
                    className={({ isActive }) =>
                        isActive ? classes.active : undefined
                    }
                >
                    ThankYou
                </NavLink>
                <NavLink
                    to="review/602"
                    className={({ isActive }) =>
                        isActive ? classes.active : undefined
                    }
                >
                    Review Add Test
                </NavLink>
                <NavLink
                    to="qr"
                    className={({ isActive }) =>
                        isActive ? classes.active : undefined
                    }
                >
                    QR
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
