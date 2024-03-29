import { Form } from "react-router-dom";
import "./RegisterForm.css";

export default function RegisterForm() {
    return (
        <div className={"rightSideRegister"}>
            <Form method={"post"} className="registerForm">
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
                        required
                    />
                </p>
                <button>Zarejestruj się</button>
            </Form>
        </div>
    );
}
