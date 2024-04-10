import { Form, Link, useSearchParams } from "react-router-dom";
import classes from "./SignInForm.module.css";

export default function SignInForm() {
    const [searchParams] = useSearchParams();
    const isRetry = searchParams.get("retry");

    return (
        <>
            <Form method={"post"}>
                <div className={classes.loginForm}>
                    <h1 className={classes.mainHeader}>eNapiwek</h1>
                    <h6 className={classes.descriptionHeader}>
                        Aplikacja do napiwków QR
                    </h6>

                    <p
                        className={
                            isRetry
                                ? classes.errorMessage
                                : classes.clearMessage
                        }
                    >
                        {isRetry && "Incorrect login or password"}
                    </p>

                    <label htmlFor="email">Email</label>
                    <input id="mail" type="email" name="mail" required />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        required
                    />

                    <button className={classes.loginButton}>Zaloguj się</button>
                    <Link
                        to={"/dev/register"}
                        className={classes.registerButton}
                    >
                        Zarejestruj się
                    </Link>
                </div>
            </Form>
        </>
    );
}
