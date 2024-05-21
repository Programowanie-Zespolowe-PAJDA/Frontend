import { Form, Link, useSearchParams } from "react-router-dom";
import classes from "./SignInForm.module.css";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function SignInForm() {
    const [searchParams] = useSearchParams();
    const isRetry = searchParams.get("retry");
    const emailNotify = searchParams.get("isEmailConfirmed");

    useEffect(() => {
        if (searchParams.has("notConfirmed"))
            toast.warning("Email nie został jeszcze potwierdzony!");
        if (searchParams.has("goConfirm"))
            toast.success(
                "Rejestracja udana! Prosimy teraz potwierdzić adres email."
            );

        if (emailNotify === "true") {
            toast.success("Email został potwierdzony!", {
                closeOnClick: true,
            });
        } else if (emailNotify === "false") {
            toast.error("Błąd przy potwierdzaniu maila.", {
                closeOnClick: true,
            });
        }
    }, []);

    return (
        <Form method={"post"}>
            <div className={classes.loginForm}>
                <h1 className={classes.mainHeader}>eNapiwek</h1>
                <h6 className={classes.descriptionHeader}>
                    Aplikacja do napiwków QR
                </h6>

                <p
                    className={
                        isRetry ? classes.errorMessage : classes.clearMessage
                    }
                >
                    {isRetry && "Incorrect login or password"}
                </p>

                <label htmlFor="email">Email</label>
                <input id="mail" type="email" name="mail" required />

                <label htmlFor="password">Hasło</label>
                <input id="password" type="password" name="password" required />

                <button className={classes.loginButton}>Zaloguj się</button>
                <Link to={"/register"} className={classes.registerButton}>
                    Zarejestruj się
                </Link>
            </div>
        </Form>
    );
}
