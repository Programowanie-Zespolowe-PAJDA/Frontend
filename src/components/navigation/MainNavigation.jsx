import { Form, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { DarkModeContext } from "../DarkModeProvider";
import { useContext } from "react";

export default function MainNavigation({ token }) {
    const [darkMode, setDarkMode] = useContext(DarkModeContext);

    function changeMode() {
        setDarkMode((prev) => !prev);
    }

    return (
        <nav
            className={`${classes.mainNav} ${
                darkMode ? classes.darkBg : undefined
            }`}
        >
            <div className={classes.leftSide}>
                <NavLink
                    to=""
                    className={({ isActive }) =>
                        `${classes.navLink} ${
                            isActive ? classes.active : undefined
                        }`
                    }
                    end
                >
                    Główna
                </NavLink>

                {token && (
                    <>
                        <NavLink
                            to="userpanel"
                            className={({ isActive }) =>
                                `${classes.navLink} ${
                                    isActive ? classes.active : undefined
                                }`
                            }
                        >
                            Panel użytkownika
                        </NavLink>
                        <NavLink
                            to="info"
                            className={({ isActive }) =>
                                `${classes.navLink} ${
                                    isActive ? classes.active : undefined
                                }`
                            }
                        >
                            Informacje
                        </NavLink>
                    </>
                )}
            </div>
            <div className={classes.rightSide}>
                <button onClick={changeMode} className={classes.themeButton}>
                    {darkMode ? "jasny" : "ciemny"}
                </button>
                {token && (
                    <Form action={"logout"} method={"post"}>
                        <button className={classes.logoutButton}>
                            Wyloguj się
                        </button>
                    </Form>
                )}
                {!token && (
                    <NavLink
                        to="auth"
                        className={({ isActive }) =>
                            `${classes.navLink} ${
                                isActive ? classes.active : undefined
                            }`
                        }
                    >
                        Zaloguj się
                    </NavLink>
                )}
            </div>
        </nav>
    );
}
