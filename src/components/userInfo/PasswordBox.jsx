import { useContext, useState } from "react";
import { getBackendUrl } from "../../util/localUrlGeneration";
import { getAuthToken } from "../auth/auth";
import classes from "./UserInfo.module.css";
import { DarkModeContext } from "../DarkModeProvider";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchemaPassword = Yup.object().shape({
    oldPassword: Yup.string().required(),
    password: Yup.string()
        .min(8, "min")
        .max(30, "max")
        .matches(/[a-z]/, "lower")
        .matches(/[A-Z]/, "upper")
        .matches(/[0-9]/, "number")
        .matches(/[!@#$%^&*]/, "special"),
    retypedPassword: Yup.string()
        .required("required")
        .oneOf([Yup.ref("password"), null], "match"),
});

export default function PasswordBox() {
    const [errorMessage, setErrorMessage] = useState(false);
    const [darkMode] = useContext(DarkModeContext);
    const passwordFormik = useFormik({
        initialValues: {
            oldPassword: "",
            password: "",
            retypedPassword: "",
        },
        onSubmit: async (values) =>
            sendData(values, "/user/editPassword", "password"),
        validateOnChange: true,
        validateOnMount: true,
        validate: (values) => {
            try {
                validationSchemaPassword.validateSync(values, {
                    abortEarly: false,
                });
                return {};
            } catch (error) {
                return error.errors;
            }
        },
    });

    async function sendData(sendPackage, endpoint) {
        const token = getAuthToken();
        const fetchUrl = getBackendUrl() + endpoint;

        const response = await fetch(fetchUrl, {
            method: "PATCH",
            body: JSON.stringify(sendPackage),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });

        if (response.status === 400) {
            console.log("error 400");
            setErrorMessage("Błędne hasło");
        }
        if (!response.ok) {
            throw new Error("Failed to edit data");
        }
    }

    const inputClass = `${classes.editInput} ${
        darkMode ? classes.editInputDark : ""
    }`;

    return (
        <div className={classes.password}>
            <h2>Zmień hasło</h2>
            {errorMessage && (
                <div className={classes.errorMessage}>{errorMessage}</div>
            )}

            <form
                className={classes.edit}
                onSubmit={passwordFormik.handleSubmit}
            >
                <input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    className={inputClass}
                    placeholder="stare hasło"
                    value={passwordFormik.values.oldPassword}
                    onChange={passwordFormik.handleChange}
                    onBlurCapture={passwordFormik.handleBlur}
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    className={inputClass}
                    placeholder="nowe hasło"
                    value={passwordFormik.values.password}
                    onChange={passwordFormik.handleChange}
                    onBlurCapture={passwordFormik.handleBlur}
                />
                <input
                    id="retypedPassword"
                    name="retypedPassword"
                    type="password"
                    className={inputClass}
                    placeholder="powtórz nowe hasło"
                    value={passwordFormik.values.retypedPassword}
                    onChange={passwordFormik.handleChange}
                    onBlurCapture={passwordFormik.handleBlur}
                />
                <div className={classes.validationButtonsContainer}>
                    <section className={classes.passwordValid}>
                        <p
                            className={`${
                                passwordFormik.dirty &&
                                !passwordFormik.errors?.includes?.("min") &&
                                !passwordFormik.errors?.includes?.("max")
                                    ? classes.validElement
                                    : undefined
                            }`}
                        >
                            długość (8-30)
                        </p>
                        <p
                            className={`${
                                passwordFormik.dirty &&
                                !passwordFormik.errors?.includes?.("lower")
                                    ? classes.validElement
                                    : undefined
                            }`}
                        >
                            mała litera
                        </p>
                        <p
                            className={`${
                                passwordFormik.dirty &&
                                !passwordFormik.errors?.includes?.("upper")
                                    ? classes.validElement
                                    : undefined
                            }`}
                        >
                            wielka litera
                        </p>
                        <p
                            className={`${
                                passwordFormik.dirty &&
                                !passwordFormik.errors?.includes?.("number")
                                    ? classes.validElement
                                    : undefined
                            }`}
                        >
                            cyfra
                        </p>
                        <p
                            className={`${
                                passwordFormik.dirty &&
                                !passwordFormik.errors?.includes?.("special")
                                    ? classes.validElement
                                    : undefined
                            }`}
                        >
                            znak specjalny
                        </p>
                        <p
                            className={`${
                                passwordFormik.dirty &&
                                !passwordFormik.errors?.includes?.("match") &&
                                !passwordFormik.errors?.includes?.("required")
                                    ? classes.validElement
                                    : undefined
                            }`}
                        >
                            hasła pasują
                        </p>
                        <p
                            className={`${
                                passwordFormik.dirty &&
                                passwordFormik.values.oldPassword !==
                                    passwordFormik.values.password
                                    ? classes.validElement
                                    : undefined
                            }`}
                        >
                            nowe hasło jest inne
                        </p>
                    </section>
                    <div className={classes.passwordButtons}>
                        <button
                            onClick={passwordFormik.handleReset}
                            type="reset"
                            className={classes.buttonReset}
                        >
                            wyczyść
                        </button>
                        <button
                            disabled={
                                !(
                                    passwordFormik.isValid &&
                                    passwordFormik.dirty
                                )
                            }
                            type="submit"
                            className={classes.button}
                        >
                            Zmień hasło
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
