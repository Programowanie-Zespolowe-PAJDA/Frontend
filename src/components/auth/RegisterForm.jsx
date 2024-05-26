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
                        {registerFormik.errors.name &&
                            registerFormik.touched.name && (
                                <div>{registerFormik.errors.name}</div>
                            )}
                        <input
                            id="name"
                            name="name"
                            value={registerFormik.values.name}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                        />
                    </p>
                    <p>
                        <label htmlFor="surname">Nazwisko</label>
                        {registerFormik.errors.surname &&
                            registerFormik.touched.surname && (
                                <div>{registerFormik.errors.surname}</div>
                            )}
                        <input
                            id="surname"
                            name="surname"
                            value={registerFormik.values.surname}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                        />
                    </p>
                    <p>
                        <label htmlFor="mail">E-mail</label>
                        {registerFormik.errors.mail &&
                            registerFormik.touched.mail && (
                                <div>{registerFormik.errors.mail}</div>
                            )}
                        <input
                            id="mail"
                            type="email"
                            name="mail"
                            value={registerFormik.values.mail}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                        />
                    </p>
                    <p>
                        <label htmlFor="password">Hasło</label>
                        {registerFormik.errors.password &&
                            registerFormik.touched.password && (
                                <div>{registerFormik.errors.password}</div>
                            )}
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={registerFormik.values.password}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                        />
                    </p>
                    <p>
                        <label htmlFor="mail">Powtórz Hasło</label>
                        {registerFormik.errors.retypedPassword &&
                            registerFormik.touched.retypedPassword && (
                                <div>
                                    {registerFormik.errors.retypedPassword}
                                </div>
                            )}
                        <input
                            id="retypedPassword"
                            type="password"
                            name="retypedPassword"
                            value={registerFormik.values.retypedPassword}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                        />
                    </p>
                    <p>
                        <label htmlFor="location">Lokacja</label>
                        {registerFormik.errors.location &&
                            registerFormik.touched.location && (
                                <div>{registerFormik.errors.location}</div>
                            )}
                        <input
                            id="location"
                            name="location"
                            value={registerFormik.values.location}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                        />
                    </p>
                    <p>
                        <label htmlFor="bankNumber">Numer konta</label>
                        {registerFormik.errors.bankAccountNumber &&
                            registerFormik.touched.bankAccountNumber && (
                                <div>
                                    {registerFormik.errors.bankAccountNumber}
                                </div>
                            )}
                        <input
                            id="bankAccountNumber"
                            name="bankAccountNumber"
                            value={registerFormik.values.bankAccountNumber}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
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
