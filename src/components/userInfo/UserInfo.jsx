import { Link } from "react-router-dom";
import classes from "./UserInfo.module.css";
import { useContext, useState } from "react";
import { getAuthToken } from "../auth/auth";
import { getBackendUrl, getFrontendUrl } from "../../util/localUrlGeneration";
import { DarkModeContext } from "../DarkModeProvider";
import QRCode from "react-qr-code";

export default function UserInfo({ info }) {
    const [darkMode, setDarkMode] = useContext(DarkModeContext);

    const qrURL = `${getFrontendUrl()}/review/${info.id}`;

    const [enteredPassword, setEnteredPassword] = useState({
        oldPassword: "",
        password: "",
        retypedPassword: "",
    });
    const [enteredInfo, setEnteredInfo] = useState({
        name: info.name,
        surname: info.surname,
        location: info.location,
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
    const validInfoElements = {
        name:
            enteredInfo.name.length >= 2 &&
            enteredInfo.name.length <= 30 &&
            /^[A-ZĄĆĘŁŃÓŚŹŻ][a-zząćęłńóśźż]*$/.test(enteredInfo.name),
        surname:
            enteredInfo.surname.length >= 2 &&
            enteredInfo.surname.length <= 30 &&
            /^[A-ZĄĆĘŁŃÓŚŹŻ][a-zząćęłńóśźż]*(?:[- ]?[A-ZĄĆĘŁŃÓŚŹŻ][a-zząćęłńóśźż]*)?$/.test(
                enteredInfo.surname
            ),
        different:
            enteredInfo.name !== info.name ||
            enteredInfo.surname !== info.surname ||
            enteredInfo.location !== info.location,
    };
    const validInfo = Object.values(validInfoElements).every(
        (value) => value === true
    );

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
    function handleInfoInputChange(identifier, event) {
        setEnteredInfo((prev) => ({
            ...prev,
            [identifier]: event.target.value,
        }));
    }

    function editData(event) {
        event.preventDefault();

        sendData(enteredInfo, "/user/editInformations");
        window.location.reload();
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
        downloadLink.download = "QRCode.svg";
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
                <form onSubmit={editData}>
                    <div className={classes.dataInfo}>
                        <label>Imię</label>
                        <input
                            defaultValue={info.name}
                            className={inputClass}
                            onChange={(event) =>
                                handleInfoInputChange("name", event)
                            }
                        />
                        <label>Nazwisko</label>
                        <input
                            defaultValue={info.surname}
                            className={inputClass}
                            onChange={(event) =>
                                handleInfoInputChange("surname", event)
                            }
                        />
                        <label>Lokalizacja</label>
                        <input
                            defaultValue={info.location}
                            className={inputClass}
                            onChange={(event) =>
                                handleInfoInputChange("location", event)
                            }
                        />
                        <h4>Email</h4>
                        <p>{info.mail}</p>
                        <h4>Nr. konta</h4>
                        <p>{info.bankAccountNumber}</p>
                    </div>
                    <button
                        disabled={!validInfo}
                        className={`${classes.button} ${
                            !validInfo && classes.grayButton
                        }`}
                    >
                        Zapisz
                    </button>
                </form>
            </div>
            <div className={classes.password}>
                <h2>Zmień hasło</h2>
                {errorMessage && (
                    <div className={classes.errorMessage}>{errorMessage}</div>
                )}
                <form className={classes.edit} onSubmit={editPassword}>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="stare hasło"
                        className={inputClass}
                        onChange={(event) =>
                            handlePasswordInputChange("oldPassword", event)
                        }
                        value={enteredPassword.oldPassword}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="nowe hasło"
                        className={inputClass}
                        onChange={(event) =>
                            handlePasswordInputChange("password", event)
                        }
                        value={enteredPassword.password}
                    />
                    <input
                        type="password"
                        name="retypedPassword"
                        placeholder="powtórz nowe hasło"
                        className={inputClass}
                        onChange={(event) =>
                            handlePasswordInputChange("retypedPassword", event)
                        }
                        value={enteredPassword.retypedPassword}
                    />
                    <div className={classes.validationButtonsContainer}>
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
                                    !validPassword && classes.grayButton
                                }`}
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
