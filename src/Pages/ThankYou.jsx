import { Link } from "react-router-dom";
import classes from "./ThankYou.module.css";

export default function ThankYouPage() {
    return (
        <main className={classes.container}>
            <h2>Dziękujemy</h2>
            <p>
                To wszystko! Dziękujemy za skorzystanie z naszego serwisu.
                Możesz bezpiecznie zamknąć kartę lub zobaczyć naszą ofertę.
            </p>
            <Link to="/">Zobacz</Link>
        </main>
    );
}
