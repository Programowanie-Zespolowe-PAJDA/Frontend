import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";

import classes from "./Error.module.css";

export default function ErrorPage() {
    const error = useRouteError();

    let title = "Błąd!";
    let message = "Coś poszło nie tak";
    let response = "";

    if (error.status === 500) {
        message = error.data.message;
        response = error.response;
    }
    if (error.status === 404) {
        title = "Nie znaleziono";
        message = "Nie można znaleźć docelowej strony";
    }
    return (
        <>
            <MainNavigation />
            <section className={classes.container}>
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
        </>
    );
}
