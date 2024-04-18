import { Form } from "react-router-dom";
import classes from "./RegisterForm.module.css";

export default function RegisterForm() {
    return (
        <div className={"rightSideRegister"}>
            <Form method={"post"} className={classes.registerForm}>
                <img
                    src="/register.png"
                    alt={"Zapraszamy do rejestacji!"}
                    className={classes.registerImage}
                />
                <div className={classes.formArea}>
                    <h1>Rejestracja</h1>
                    <p>
                        <label htmlFor="name">Imię</label>
                        <input id="name" name="name" required />
                    </p>
                    <p>
                        <label htmlFor="surname">Nazwisko</label>
                        <input id="surname" name="surname" required />
                    </p>
                    <p>
                        <label htmlFor="mail">E-mail</label>
                        <input id="mail" type="email" name="mail" required />
                    </p>
                    <p>
                        <label htmlFor="password">Hasło</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            required
                        />
                    </p>
                    <p>
                        <label htmlFor="mail">Powtórz Hasło</label>
                        <input
                            id="retypedPassword"
                            type="password"
                            name="retypedPassword"
                            required
                        />
                    </p>
                    <p>
                        <label htmlFor="location">Lokacja</label>
                        <input id="location" name="location" required />
                    </p>
                    <p>
                        <label htmlFor="bankNumber">Numer konta</label>
                        <input
                            id="bankAccountNumber"
                            name="bankAccountNumber"
                            minLength="26"
                            maxLength="26"
                            pattern="^[0-9]{26}$"
                            onInvalid={(e) =>
                                e.target.setCustomValidity(
                                    "Niepoprawny numer konta"
                                )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                            required
                        />
                    </p>
                    <button>Zarejestruj się</button>
                </div>
            </Form>
        </div>
    );
}
