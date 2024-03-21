import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";
import { useMemo } from "react";

import classes from "./Error.module.css";

export default function ErrorPage() {
    const error = useRouteError();
    const { title, message, response } = useMemo(
        () => getErrorMessage(error), // execute this function only...
        [error] // when dependency array changes!
    ); // example

    // Inefficient, calculated on every render, you could utilize useMemo() here to prevent that
    // let title = "Błąd!";
    // let message = "Coś poszło nie tak";
    // let response = "";

    // if (error.status === 500) {
    //     message = error.data.message;
    //     response = error.response;
    // }
    // if (error.status === 404) {
    //     title = "Nie znaleziono";
    //     message = "Nie można znaleźć docelowej strony";
    // }

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
