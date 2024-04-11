import { Link } from "react-router-dom";
import classes from "./UserInfo.module.css";
import { useRef, useState } from "react";
import { getAuthToken } from "../auth/auth";
import { getBackendUrl } from "../../util/localUrlGeneration";

export default function UserInfo({ info }) {
    const nameRef = useRef();
    const surnameRef = useRef();
    const locationRef = useRef();
    const oldPwdRef = useRef();
    const newPwdRef = useRef();
    const new2PwdRef = useRef();
    const [changedData, setChangedData] = useState(false);

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

    function editData(event) {
        event.preventDefault();

        if (changedData) {
            const sendPackage = {
                name: nameRef.current.value,
                surname: surnameRef.current.value,
                location: locationRef.current.value,
            };
            console.log("sendPackage");
            console.log(sendPackage);

            sendData(sendPackage, "/user/editInformations");
        }
    }

    function editPassword(event) {
        event.preventDefault();

        const sendPackage = {
            password: newPwdRef.current.value,
            retypedPassword: new2PwdRef.current.value,
        };
        console.log("sendPackage");
        console.log(sendPackage);

        sendData(sendPackage, "/user/editPassword");
    }

    console.log(info);
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
                            className={classes.editInput}
                            onChange={checkForChange}
                        />
                        <label>Nazwisko</label>
                        <input
                            ref={surnameRef}
                            defaultValue={info.surname}
                            className={classes.editInput}
                            onChange={checkForChange}
                        />
                        <label>Lokalizacja</label>
                        <input
                            ref={locationRef}
                            defaultValue={info.location}
                            className={classes.editInput}
                            onChange={checkForChange}
                        />
                        <h4>Email</h4>
                        <p>{info.mail}</p>
                        <h4>Nr. konta</h4>
                        <p>{info.bankAccountNumber}</p>
                    </div>
                    <button
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
                <form className={classes.edit} onSubmit={editPassword}>
                    <input
                        ref={oldPwdRef}
                        placeholder="stare hasło"
                        className={classes.editInput}
                    />
                    <input
                        ref={newPwdRef}
                        placeholder="nowe hasło"
                        className={classes.editInput}
                    />
                    <input
                        ref={new2PwdRef}
                        placeholder="powtórz nowe hasło"
                        className={classes.editInput}
                    />
                    <button className={classes.button}>Zmień hasło</button>
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
