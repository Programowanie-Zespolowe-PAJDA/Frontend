import { useRef } from "react";
import { getBackendUrl } from "../util/localUrlGeneration";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function HomePage() {
    // This component should be probably split to multiple smaller ones!
    const nickRef = useRef();
    const textRef = useRef();

    async function sendReport(event) {
        event.preventDefault();
        const fetchUrl = getBackendUrl() + "/reports";

        const reportData = {
            nick: nickRef.current.value,
            text: textRef.current.value,
        };

        const response = await fetch(fetchUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reportData),
        });

        if (!response.ok) {
            throw new Error("Failed to send report");
        }

        toast.success("Wysłano wiadomość");
    }

    return (
        <div className={classes.index}>
            <header className={classes.mainHeader}>
                <div
                    className={`${classes.container} ${classes.headerContainer}`}
                >
                    <img src="qr6.png" alt="qr-code" className={classes.aaa} />

                    <h1>eNapiwek</h1>
                    <p>Aplikacja do napiwków QR</p>
                    <Link to="register" className={classes.fff}>
                        Zarejestruj się
                    </Link>
                </div>
                <video autoPlay muted loop>
                    <source src="/video.mp4" type="video/mp4" />
                </video>

                <div className={classes.carpet}></div>
            </header>
            <div className={classes.container}>
                <section className={classes.comparison}>
                    <div className={classes.comparison2}>
                        <div className={classes.bar}>
                            <p>nieprzyjemnych sytuacji</p>
                            <p>kolejne dni bez napiwków</p>
                            <p>przestarzałe metody</p>
                            <p>negatywne myśli</p>
                            <p>dyskomfort klientów</p>
                            <p>przestarzałe metody</p>
                            <p className={classes.ppp}>
                                nieprzyjemnych sytuacji
                            </p>
                            <p>kolejne dni bez napiwków</p>
                            <p>przestarzałe metody</p>
                            <p>negatywne myśli</p>
                            <p>dyskomfort klientów</p>
                            <p>przestarzałe metody</p>
                        </div>
                        <p className={classes.textComparison}>Pożegnaj</p>
                        <h2>Razem z nami</h2>
                        <p className={classes.textComparison2}>Przywitaj</p>
                        <div className={classes.bar2}>
                            <p>Komfortowe sytuacje</p>
                            <p>kolejne dni z napiwkami</p>
                            <p>wykorzystanie kodów QR</p>
                            <p>spokojną głowe</p>
                            <p>komfort klientów</p>
                            <p>wykorzystanie kodów QR</p>
                            <p className={classes.ppp}>Komfortowe sytuacje</p>
                            <p>kolejne dni z napiwkami</p>
                            <p>wykorzystanie kodów QR</p>
                            <p>spokojną głowe</p>
                            <p>komfort klientów</p>
                            <p>wykorzystanie kodów QR</p>
                        </div>
                    </div>
                </section>

                <section className={classes.description}>
                    <div>
                        <h3>
                            Krzyknij
                            <h3 className={classes.title}>eNapiwek</h3>
                        </h3>
                        <p>
                            Nasz zespół stworzył platformę dla kelnerów do
                            łatwiejszej obsługi napiwków bezgotówkowo. Opiera
                            się na okazywaniu przez pracownika kodu QR który to
                            przekierowuje klienta do strony z możliwością
                            wybrania i zapłaty napiwku, pozostawienia komentarza
                            co do usługi oraz oceny. Pracownik ma wgląd do
                            komentarzy, oraz na statystyki swoich zarobków.
                        </p>
                    </div>
                </section>

                <section className={classes.steps}>
                    <h2>Jak to działa?</h2>

                    <div className={classes.stepsListContainer}>
                        <img
                            src="handshake.png"
                            alt="handshake"
                            className={classes.pictureSteps}
                        />
                        <ol>
                            <li>Kelner daje kod QR klientowi</li>
                            <li>Klient skanuje kod QR</li>
                            <li>Klient pisze recenzję</li>
                            <li>Klient pisze napiwek</li>
                            <li>Kelner ma pieniądze na koncie</li>
                        </ol>
                    </div>
                </section>
            </div>

            <section className={classes.contact}>
                <h3>Zainteresowany?</h3>
                <p>Napisz do nas aby dowiedzieć się szczegółów</p>
                <form onSubmit={sendReport} className={classes.contactForm}>
                    <input
                        ref={nickRef}
                        placeholder="Imię"
                        minLength={1}
                        maxLength={20}
                        required
                    />
                    <textarea
                        ref={textRef}
                        placeholder="Pytanie, pomysł, propozycja..."
                        minLength={1}
                        maxLength={1500}
                        required
                    />
                    <button type="submit">Wyślij</button>
                </form>
            </section>

            <footer className={classes.footer}>
                Wszelkie prawa zastrzeżone
            </footer>
        </div>
    );
}
