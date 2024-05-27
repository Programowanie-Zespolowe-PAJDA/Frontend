import { Form, Link, useSearchParams } from "react-router-dom";
import classes from "./SignInForm.module.css";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function SignInForm() {
    const [searchParams] = useSearchParams();
    const isRetry = searchParams.get("retry");
    const emailNotify = searchParams.get("isEmailConfirmed");

    useEffect(() => {
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
        <div className={classes.parent}>
            <Form method={"post"} className={classes.singInForm}>
                <div className={classes.loginForm}>
                    <header>
                        <h1 className={classes.mainHeader}>eNapiwek</h1>
                        <h6 className={classes.descriptionHeader}>
                            Aplikacja do napiwków QR
                        </h6>
                    </header>

                    <p
                        className={
                            isRetry
                                ? classes.errorMessage
                                : classes.clearMessage
                        }
                    >
                        {isRetry && "Incorrect login or password"}
                    </p>
                    <div className={classes.loginDiv}>
                        <input
                            id="mail"
                            type="email"
                            name="mail"
                            placeholder="Wpisz login"
                            required
                        />

                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Wpisz hasło"
                            required
                        />
                    </div>

                    <div className={classes.buttonsDiv}>
                        <button className={classes.loginButton}>
                            Zaloguj się
                        </button>
                        <div className={classes.registerDiv}>
                            <span>Nie masz konta? </span>
                            <Link
                                to={"/register"}
                                className={classes.registerButton}
                            >
                                Zarejestruj się
                            </Link>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}
