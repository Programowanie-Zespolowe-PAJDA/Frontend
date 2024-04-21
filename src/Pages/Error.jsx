import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";
import { useContext, useMemo } from "react";

import classes from "./Error.module.css";
import darkClass from "./dark.module.css";
import { DarkModeContext } from "../components/DarkModeProvider";
import { getUser } from "../components/auth/auth";

export default function ErrorPage() {
    const [darkMode, setDarkMode] = useContext(DarkModeContext);
    const token = getUser();

    const error = useRouteError();
    const { title, message, response } = useMemo(
        () => getErrorMessage(error),
        [error]
    );

    return (
        <div className={darkMode ? darkClass.dark : undefined}>
            <MainNavigation token={token} />
            <section
                className={`${classes.container} ${
                    darkMode ? classes.dark : undefined
                }`}
            >
                <div className={classes.message}>
                    <h1>
                        <span>{error.status} </span>
                        {title}
                    </h1>
                    <p>{message}</p>
                    <p>{response}</p>
                </div>
                <img
                    src="waving-person.png"
                    alt="waving-person"
                    className={classes.picturePoints}
                />
            </section>
        </div>
    );
}

function getErrorMessage(error) {
    switch (error.status) {
        case 500:
            return {
                message: error.data.message,
                response: error.response,
            };
        case 404:
            return {
                title: "Nie znaleziono",
                message: "Nie można znaleźć docelowej strony",
            };
        default:
            return {
                title: "Nie znaleziono",
                message: "Nie można znaleźć docelowej strony",
                response: "",
            };
    }
}
