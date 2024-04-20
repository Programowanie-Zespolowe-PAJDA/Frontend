import { Link } from "react-router-dom";
import classes from "./UserInfo.module.css";
import { useContext, useRef, useState } from "react";
import { getAuthToken } from "../auth/auth";
import { getBackendUrl } from "../../util/localUrlGeneration";
import { DarkModeContext } from "../DarkModeProvider";

export default function UserInfo({ info }) {
    const [darkMode, setDarkMode] = useContext(DarkModeContext);
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
    const nameRef = useRef();
    const surnameRef = useRef();
    const locationRef = useRef();
    const [changedData, setChangedData] = useState(false);

    const inputClass = `${classes.editInput} ${
        darkMode ? classes.editInputDark : ""
    }`;

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

    function checkForChange() {
        setChangedData(
            nameRef.current.value !== info.name ||
                surnameRef.current.value !== info.surname ||
                locationRef.current.value !== info.location
        );
    }

    function handleInputChange(identifier, event) {
        setEnteredPassword((prev) => ({
            ...prev,
            [identifier]: event.target.value,
        }));
    }

    function editData(event) {
        event.preventDefault();

        const sendPackage = {
            name: nameRef.current.value,
            surname: surnameRef.current.value,
            location: locationRef.current.value,
        };
        console.log("sendPackage");
        console.log(sendPackage);

        sendData(sendPackage, "/user/editInformations");
    }

    function editPassword(event) {
        event.preventDefault();

        console.log("enteredPassword");
        console.log(enteredPassword);

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

    return (
        <section className={classes.container}>
            <div className={classes.data}>
                <h2>Twoje dane</h2>
                <form onSubmit={editData}>
                    <div className={classes.dataInfo}>
                        <label>Imię</label>
                        <input
                            ref={nameRef}
                            defaultValue={info.name}
                            className={inputClass}
                            onChange={checkForChange}
                        />
                        <label>Nazwisko</label>
                        <input
                            ref={surnameRef}
                            defaultValue={info.surname}
                            className={inputClass}
                            onChange={checkForChange}
                        />
                        <label>Lokalizacja</label>
                        <input
                            ref={locationRef}
                            defaultValue={info.location}
                            className={inputClass}
                            onChange={checkForChange}
                        />
                        <h4>Email</h4>
                        <p>{info.mail}</p>
                        <h4>Nr. konta</h4>
                        <p>{info.bankAccountNumber}</p>
                    </div>
                    <button
                        disabled={!changedData}
                        className={`${classes.button} ${
                            !changedData && classes.grayButton
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
                            handleInputChange("oldPassword", event)
                        }
                        value={enteredPassword.oldPassword}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="nowe hasło"
                        className={inputClass}
                        onChange={(event) =>
                            handleInputChange("password", event)
                        }
                        value={enteredPassword.password}
                    />
                    <input
                        type="password"
                        name="retypedPassword"
                        placeholder="powtórz nowe hasło"
                        className={inputClass}
                        onChange={(event) =>
                            handleInputChange("retypedPassword", event)
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
                <img src="qr-code.jpg" alt="qr-code" />
                {/* TODO - display png/jpg file fullscreen to download, or download directly */}
                <Link
                    to="/qr"
                    className={`${classes.button} ${classes.buttonQR}`}
                >
                    pobierz
                </Link>
            </div>
        </section>
    );
}
