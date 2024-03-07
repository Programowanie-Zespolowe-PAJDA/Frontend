import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/navigation/MainNavigation";

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
            <h1>{title}</h1>
            <h3>{message}</h3>
            <p>{response}</p>
        </>
    );
}
