import { Form } from "react-router-dom";
import classes from "./RegisterForm.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RegisterForm() {
    const validationSchemaRegister = Yup.object().shape({
        name: Yup.string()
            .required("Pole wymagane")
            .min(2, "Minimalna długość: 2")
            .max(30, "Maksymalna długość: 30")
            .matches(
                /^[A-ZĄĆĘŁŃÓŚŹŻ][a-zząćęłńóśźż]*$/,
                "Proszę wpisać poprawne imie"
            ),
        surname: Yup.string()
            .required("Pole wymagane")
            .min(2, "Minimalna długość: 2")
            .max(30, "Maksymalna długość: 30")
            .matches(
                /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:[- ]?[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$/,
                "Proszę wpisać poprawne nazwisko"
            ),
        mail: Yup.string()
            .required("Pole wymagane")
            .email("Proszę wpisać poprawny email"),
        password: Yup.string()
            .min(8, "Minimalna długość: 8")
            .max(30, "Maksymalna długość: 30")
            .matches(/[a-z]/, "Musi zawierać małą literę")
            .matches(/[A-Z]/, "Musi zawierać wielką literę")
            .matches(/[0-9]/, "Musi zawierać cyfrę")
            .matches(/[!@#$%^&*]/, "Musi zawierać znak specjalny"),
        retypedPassword: Yup.string()
            .required("Pole wymagane")
            .oneOf([Yup.ref("password")], "Hasła muszą się zgadzać"),
        location: Yup.string().required("Pole wymagane"),
        bankAccountNumber: Yup.string()
            .required("Pole wymagane")
            .length(26, "Konto musi mieć długość 26")
            .matches(/^[0-9]{26}$/, "Proszę wpisać poprawny numer"),
    });
    const registerFormik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            mail: "",
            password: "",
            retypedPassword: "",
            location: "",
            bankAccountNumber: "",
        },
        validateOnChange: true,
        validationSchema: validationSchemaRegister,
    });

    console.log(registerFormik);

    return (
        <div className={classes.rightSideRegister2}>
            {/* <div className={"rightSideRegister", classes.rightSideRegister2}> */}
            <Form method={"post"} className={classes.registerForm}>
                <img
                    src="/register.png"
                    alt={"Zapraszamy do rejestacji!"}
                    className={classes.registerImage}
                />
                <div className={classes.formArea}>
                    <h1>Rejestracja</h1>
                    <p>
                        <input
                            id="name"
                            name="name"
                            placeholder="Wpisz imię"
                            required
                        />
                    </p>
                    <p>
                        <input
                            id="surname"
                            name="surname"
                            placeholder="Wpisz nazwisko"
                            required
                        />
                    </p>
                    <p>
                        <input
                            id="mail"
                            type="email"
                            name="mail"
                            placeholder="Wpisz e-mail"
                            required
                        />
                    </p>
                    <p>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Wpisz hasło"
                            required
                        />
                    </p>
                    <p>
                        <input
                            id="retypedPassword"
                            type="password"
                            name="retypedPassword"
                            placeholder="powtórz Hasło"
                            required
                        />
                    </p>
                    <p>
                        <input
                            id="location"
                            name="location"
                            placeholder="Wpisz lokacja"
                            required
                        />
                    </p>
                    <p>
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
                            placeholder="Wpisz numer konta"
                        />
                    </p>
                    <button
                        disabled={
                            !(registerFormik.isValid && registerFormik.dirty)
                        }
                    >
                        Zarejestruj się
                    </button>
                </div>
            </Form>
        </div>
    );
}
