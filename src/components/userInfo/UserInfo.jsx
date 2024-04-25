import { Link } from "react-router-dom";
import classes from "./UserInfo.module.css";
import { useContext, useState } from "react";
import { getAuthToken } from "../auth/auth";
import { getBackendUrl } from "../../util/localUrlGeneration";
import { DarkModeContext } from "../DarkModeProvider";
import QRCode from "react-qr-code";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function UserInfo({ info }) {
    const [darkMode, setDarkMode] = useContext(DarkModeContext);
    const qrURL = `${getBackendUrl()}/review/${info.id}`;

    // --------------------------------------------

    const initialPassword = {
        oldPassword: "",
        password: "",
        retypedPassword: "",
    };
    const initialInfo = {
        name: info.name,
        surname: info.surname,
        location: info.location,
    };

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
            .required()
            .oneOf([Yup.ref("password"), null]),
    });
    const validationSchemaInfo = Yup.object()
        .shape({
            name: Yup.string()
                .required()
                .min(2)
                .max(30)
                .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ][a-zząćęłńóśźż]*$/),
            surname: Yup.string()
                .required()
                .min(2)
                .max(30)
                .matches(
                    /^[A-ZĄĆĘŁŃÓŚŹŻ][a-zząćęłńóśźż]*(?:[- ]?[A-ZĄĆĘŁŃÓŚŹŻ][a-zząćęłńóśźż]*)?$/
                ),
            location: Yup.string().required(),
        })
        .test("changed", null, (values) => {
            const { name, surname, location } = values;

            const result = Object.keys(values).some(
                (key) => values[key] !== initialInfo[key]
            );
            return result
                ? true
                : new Yup.ValidationError(
                      "At least one field should be changed",
                      values,
                      "changed"
                  );
        });

    function handleSubmitInfo(values) {
        console.log(values);
        sendData(values, "/user/editInformations");
        window.location.reload();
    }
    function handleSubmitPassword(values) {
        sendData(values, "/user/editPassword", "password");
    }

    // --------------------------------------------

    const [enteredPassword, setEnteredPassword] = useState({
        oldPassword: "",
        password: "",
        retypedPassword: "",
    });
    const validPasswordElements = {
        length:
            enteredPassword.password.length >= 8 &&
            enteredPassword.password.length <= 30,
        lower: /[a-z]/.test(enteredPassword.password),
        upper: /[A-Z]/.test(enteredPassword.password),
        number: /[0-9]/.test(enteredPassword.password),
        special: /[!@#$%^&*]/.test(enteredPassword.password),
        match: enteredPassword.password === enteredPassword.retypedPassword,
        different: enteredPassword.password !== enteredPassword.oldPassword,
    };
    const validPassword = Object.values(validPasswordElements).every(
        (value) => value === true
    );
    const [errorMessage, setErrorMessage] = useState(false);

    async function sendData(sendPackage, endpoint, type) {
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

        if (type === "password" && response.status === 400) {
            console.log("error 400");
            setErrorMessage("Błędne hasło");
        }
        if (!response.ok) {
            throw new Error("Failed to edit data");
        }
    }

    function handlePasswordInputChange(identifier, event) {
        setEnteredPassword((prev) => ({
            ...prev,
            [identifier]: event.target.value,
        }));
    }

    function editPassword(event) {
        event.preventDefault();
        sendData(enteredPassword, "/user/editPassword", "password");
    }
    function clearPassword() {
        setEnteredPassword({
            oldPassword: "",
            password: "",
            retypedPassword: "",
        });
        setErrorMessage(false);
    }

    function downloadQRCode() {
        const canvas = document.getElementById("qr-code").outerHTML;
        const qrURL = "data:image/svg+xml," + encodeURIComponent(canvas);
        let downloadLink = document.createElement("a");
        downloadLink.href = qrURL;
        downloadLink.download = "QRCode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    const inputClass = `${classes.editInput} ${
        darkMode ? classes.editInputDark : ""
    }`;
    return (
        <section className={classes.container}>
            <div className={classes.data}>
                <h2>Twoje dane</h2>
                <Formik
                    initialValues={initialInfo}
                    validationSchema={validationSchemaInfo}
                    onSubmit={handleSubmitInfo}
                    validateOnMount={true}
                >
                    {(props) => {
                        return (
                            <Form>
                                <div className={classes.dataInfo}>
                                    <label htmlFor="name">Imię</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className={inputClass}
                                        value={props.values.name}
                                        onChange={props.handleChange}
                                        onBlurCapture={props.handleBlur}
                                    />
                                    <label htmlFor="surname">Nazwisko</label>
                                    <input
                                        id="surname"
                                        name="surname"
                                        type="text"
                                        className={inputClass}
                                        value={props.values.surname}
                                        onChange={props.handleChange}
                                        onBlurCapture={props.handleBlur}
                                    />
                                    <label htmlFor="location">
                                        Lokalizacja
                                    </label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        className={inputClass}
                                        value={props.values.location}
                                        onChange={props.handleChange}
                                        onBlurCapture={props.handleBlur}
                                    />
                                    <h4>Email</h4>
                                    <p>{info.mail}</p>
                                    <h4>Nr. konta</h4>
                                    <p>{info.bankAccountNumber}</p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!props.isValid}
                                    className={`${classes.button} ${
                                        !props.isValid && classes.grayButton
                                    }`}
                                >
                                    Zapisz
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
            <div className={classes.password}>
                <h2>Zmień hasło</h2>
                {errorMessage && (
                    <div className={classes.errorMessage}>{errorMessage}</div>
                )}
                <Formik
                    initialValues={initialPassword}
                    validationSchema={validationSchemaPassword}
                    onSubmit={handleSubmitPassword}
                >
                    {(props) => {
                        console.log(props);
                        validationSchemaPassword
                            .validate(props.values, { abortEarly: false })
                            .then(() => {
                                console.log("success");
                            })
                            .catch((err) => {
                                err.inner.forEach((e) => {
                                    console.log(e.message);
                                });
                            });
                        return (
                            <Form className={classes.edit}>
                                <input
                                    id="oldPassword"
                                    name="oldPassword"
                                    type="password"
                                    className={inputClass}
                                    placeholder="stare hasło"
                                    value={props.values.oldPassword}
                                    onChange={props.handleChange}
                                    onBlurCapture={props.handleBlur}
                                />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className={inputClass}
                                    placeholder="nowe hasło"
                                    value={props.values.password}
                                    onChange={props.handleChange}
                                    onBlurCapture={props.handleBlur}
                                />
                                <input
                                    id="retypedPassword"
                                    name="retypedPassword"
                                    type="password"
                                    className={inputClass}
                                    placeholder="powtórz nowe hasło"
                                    value={props.values.retypedPassword}
                                    onChange={props.handleChange}
                                    onBlurCapture={props.handleBlur}
                                />
                                <div
                                    className={
                                        classes.validationButtonsContainer
                                    }
                                >
                                    <section className={classes.passwordValid}>
                                        <p
                                            className={
                                                validPasswordElements.length
                                                    ? classes.validElement
                                                    : undefined
                                            }
                                        >
                                            długość (8-30)
                                        </p>
                                        <p
                                            className={
                                                validPasswordElements.lower
                                                    ? classes.validElement
                                                    : undefined
                                            }
                                        >
                                            mała litera
                                        </p>
                                        <p
                                            className={
                                                validPasswordElements.upper
                                                    ? classes.validElement
                                                    : undefined
                                            }
                                        >
                                            wielka litera
                                        </p>
                                        <p
                                            className={
                                                validPasswordElements.number
                                                    ? classes.validElement
                                                    : undefined
                                            }
                                        >
                                            cyfra
                                        </p>
                                        <p
                                            className={
                                                validPasswordElements.special
                                                    ? classes.validElement
                                                    : undefined
                                            }
                                        >
                                            znak specjalny
                                        </p>
                                        <p
                                            className={
                                                validPasswordElements.match
                                                    ? classes.validElement
                                                    : undefined
                                            }
                                        >
                                            hasła pasują
                                        </p>
                                        <p
                                            className={
                                                validPasswordElements.different
                                                    ? classes.validElement
                                                    : undefined
                                            }
                                        >
                                            nowe hasło jest inne
                                        </p>
                                    </section>
                                    <div className={classes.passwordButtons}>
                                        <button
                                            type="reset"
                                            className={classes.buttonReset}
                                            onClick={clearPassword}
                                        >
                                            wyczyść
                                        </button>
                                        <button
                                            disabled={!validPassword}
                                            type="submit"
                                            className={`${classes.button} ${
                                                !validPassword &&
                                                classes.grayButton
                                            }`}
                                        >
                                            Zmień hasło
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
            <div className={classes.qr}>
                <QRCode id="qr-code" value={qrURL} className={classes.qrImg} />
                <Link
                    to="/qr"
                    className={`${classes.button} ${classes.buttonQRView}`}
                >
                    Wyświetl
                </Link>
                <button
                    onClick={downloadQRCode}
                    className={`${classes.button} ${classes.buttonQRDownload}`}
                >
                    Pobierz
                </button>
            </div>
        </section>
    );
}
