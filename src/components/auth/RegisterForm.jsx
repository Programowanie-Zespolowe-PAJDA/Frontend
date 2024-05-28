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
                            value={registerFormik.values.name}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                            required
                        />
                        {registerFormik.errors.name &&
                            registerFormik.touched.name && (
                                <div className={classes.errorInput}>
                                    {registerFormik.errors.name}
                                </div>
                            )}
                    </p>
                    <p>
                        <input
                            id="surname"
                            name="surname"
                            placeholder="Wpisz nazwisko"
                            value={registerFormik.values.surname}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                            required
                        />
                        {registerFormik.errors.surname &&
                            registerFormik.touched.surname && (
                                <div className={classes.errorInput}>
                                    {registerFormik.errors.surname}
                                </div>
                            )}
                    </p>
                    <p>
                        <input
                            id="mail"
                            type="email"
                            name="mail"
                            placeholder="Wpisz e-mail"
                            value={registerFormik.values.mail}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                            required
                        />
                        {registerFormik.errors.mail &&
                            registerFormik.touched.mail && (
                                <div className={classes.errorInput}>
                                    {registerFormik.errors.mail}
                                </div>
                            )}
                    </p>
                    <p>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Wpisz hasło"
                            value={registerFormik.values.password}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                            required
                        />
                        {registerFormik.errors.password &&
                            registerFormik.touched.password && (
                                <div className={classes.errorInput}>
                                    {registerFormik.errors.password}
                                </div>
                            )}
                    </p>
                    <p>
                        <input
                            id="retypedPassword"
                            type="password"
                            name="retypedPassword"
                            placeholder="powtórz Hasło"
                            value={registerFormik.values.retypedPassword}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                            required
                        />
                        {registerFormik.errors.retypedPassword &&
                            registerFormik.touched.retypedPassword && (
                                <div className={classes.errorInput}>
                                    {registerFormik.errors.retypedPassword}
                                </div>
                            )}
                    </p>
                    <p>
                        <input
                            id="location"
                            name="location"
                            placeholder="Wpisz nazwę restauracji"
                            value={registerFormik.values.location}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                            required
                        />
                        {registerFormik.errors.location &&
                            registerFormik.touched.location && (
                                <div className={classes.errorInput}>
                                    {registerFormik.errors.location}
                                </div>
                            )}
                    </p>
                    <p>
                        <input
                            id="bankAccountNumber"
                            name="bankAccountNumber"
                            value={registerFormik.values.bankAccountNumber}
                            onChange={registerFormik.handleChange}
                            onBlurCapture={registerFormik.handleBlur}
                            required
                            placeholder="Wpisz numer konta"
                        />
                        {registerFormik.errors.bankAccountNumber &&
                            registerFormik.touched.bankAccountNumber && (
                                <div className={classes.errorInput}>
                                    {registerFormik.errors.bankAccountNumber}
                                </div>
                            )}
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
