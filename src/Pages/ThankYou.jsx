import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./ThankYou.module.css";

export default function ThankYouPage() {
    return (
        <main className={classes.container}>
            <h2>Thank you</h2>
            <p>
                That&apos;s all! Thank you for using our service. You can now
                close this site or visit us
            </p>
            <Link to="/">Check us</Link>
        </main>
    );
}
