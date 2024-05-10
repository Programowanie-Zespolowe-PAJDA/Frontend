import { Link } from "react-router-dom";
import classes from "./UserInfo.module.css";
import { useContext, useState } from "react";
import { getAuthToken } from "../auth/auth";
import { getBackendUrl } from "../../util/localUrlGeneration";
import { DarkModeContext } from "../DarkModeProvider";
import QRCode from "react-qr-code";
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

const validationSchemaInfo = Yup.object().shape({
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
});

export default function UserInfo({ info }) {
    const [errorMessage, setErrorMessage] = useState(false);
    const [darkMode, setDarkMode] = useContext(DarkModeContext);
    const qrURL = `${getBackendUrl()}/review/${info.id}`;
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

    const infoFormik = useFormik({
        initialValues: {
            name: info.name,
            surname: info.surname,
            location: info.location,
        },
        onSubmit: async (values) => sendData(values, "/user/editInformations"),
        validateOnChange: true,
        validateOnMount: true,
        validate: (values) => {
            try {
                validationSchemaInfo.validateSync(values);
                return {};
            } catch (error) {
                return error.errors;
            }
        },
    });

    // --------------------------------------------

    // const initialInfo = {
    //     name: info.name,
    //     surname: info.surname,
    //     location: info.location,
    // };

    // function handleSubmitInfo(values) {
    //     console.log(values);
    //     sendData(values, "/user/editInformations");
    //     window.location.reload();
    // }

    // --------------------------------------------

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
                {/* <Formik
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
                </Formik> */}
                <form
                    onSubmit={infoFormik.handleSubmit}
                    className={classes.dataForm}
                >
                    <div className={classes.dataInfo}>
                        <label htmlFor="name">Imię</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className={inputClass}
                            value={infoFormik.values.name}
                            onChange={infoFormik.handleChange}
                            onBlurCapture={infoFormik.handleBlur}
                        />
                        <label htmlFor="surname">Nazwisko</label>
                        <input
                            id="surname"
                            name="surname"
                            type="text"
                            className={inputClass}
                            value={infoFormik.values.surname}
                            onChange={infoFormik.handleChange}
                            onBlurCapture={infoFormik.handleBlur}
                        />
                        <label htmlFor="location">Lokalizacja</label>
                        <input
                            id="location"
                            name="location"
                            type="text"
                            className={inputClass}
                            value={infoFormik.values.location}
                            onChange={infoFormik.handleChange}
                            onBlurCapture={infoFormik.handleBlur}
                        />
                        <h4>Email</h4>
                        <p>{info.mail}</p>
                        <h4>Nr. konta</h4>
                        <p>{info.bankAccountNumber}</p>
                    </div>
                    <button
                        disabled={!(infoFormik.isValid && infoFormik.dirty)}
                        type="submit"
                        className={classes.button}
                    >
                        Zmień dane
                    </button>
                </form>
            </div>
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
                                    !passwordFormik.errors?.includes?.(
                                        "special"
                                    )
                                        ? classes.validElement
                                        : undefined
                                }`}
                            >
                                znak specjalny
                            </p>
                            <p
                                className={`${
                                    passwordFormik.dirty &&
                                    !passwordFormik.errors?.includes?.(
                                        "match"
                                    ) &&
                                    !passwordFormik.errors?.includes?.(
                                        "required"
                                    )
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
