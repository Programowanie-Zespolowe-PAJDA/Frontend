import { Form, Link, useSearchParams } from "react-router-dom";
import "./SignInForm.css";

export default function SignInForm() {
    const [searchParams] = useSearchParams();
    const isRetry = searchParams.get("retry");

    return (
        <>
            <Form method={"post"} className="loginForm">
                <h1>Log in</h1>
                <p className="formError">
                    {isRetry && "Incorrect login or password"}
                </p>
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="mail" type="email" name="mail" required />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        required
                    />
                </p>
                <button>Log in</button>
                <Link to={"/register"}>
                    <p>Zarejestruj się!</p>
                </Link>
            </Form>
        </>
    );
}
