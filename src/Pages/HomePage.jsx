import "./HomePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="index">
            <header className="main-header">
                <div className="container header-container">
                    <img src="qr-code.jpg" alt="qr-code" />
                    <div className="header-title">
                        <h1>eNapiwek</h1>
                        <p>Aplikacja do napiwków QR</p>
                        <Link to="auth">Zarejestruj się</Link>
                    </div>
                </div>
            </header>
            <div className="container">
                <section className="goodbye">
                    <div>
                        <h2>Razem z nami</h2>
                        <p>Pożegnaj</p>
                        <ul>
                            <li>
                                <span>Pożegnaj</span> niezręczne sytuacje
                            </li>
                            <li>
                                <span>Pożegnaj</span> kolejne dni bez napiwków
                            </li>
                            <li>
                                <span>Pożegnaj</span> negatywne myśli
                            </li>
                        </ul>
                    </div>
                    <img
                        src="waving-person.png"
                        alt="waving-person"
                        className="picture-points"
                    />
                </section>

                <section className="welcome">
                    <img
                        src="happy-person.png"
                        alt="happy-person"
                        className="picture-points"
                    />
                    <div>
                        <h2>Razem z nami</h2>
                        <p>Przywitaj</p>
                        <ul>
                            <li>
                                <span>Przywitaj</span> zręczne sytuacje
                            </li>
                            <li>
                                <span>Przywitaj</span> bezgotówkowe napiwki
                            </li>
                            <li>
                                <span>Przywitaj</span> wygodę
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="description">
                    <div>
                        <h3>eNapiwek</h3>
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

                <section className="steps">
                    <h2>Jak to działa?</h2>
                    <div className="steps-list-container">
                        <img
                            src="handshake.png"
                            alt="handshake"
                            className="picture-steps"
                        />
                        <ol>
                            <li>Kelner daje kod QR klientowi</li>
                            <li>Klient skanuje kod QR</li>
                            <li>Klient pisze recenzję</li>
                            <li>Klient pisze napiwek</li>
                            <li>Kelner ma pieniądze na kącie</li>
                        </ol>
                    </div>
                </section>

                <section className="trusted">
                    <h2>Zaufali nam</h2>

                    <div className="trusted-grid">
                        <img src="qr-code.jpg" alt="qr-code" />
                        <img src="qr-code.jpg" alt="qr-code" />
                        <img src="qr-code.jpg" alt="qr-code" />
                        <img src="qr-code.jpg" alt="qr-code" />
                    </div>
                </section>
            </div>

            <section className="contact">
                <h3>Zainteresowany?</h3>
                <p>Napisz do nas aby dowiedzieć się szczegółów</p>
                <textarea id="story" name="story" rows="8" cols="60" />
            </section>

            <footer>Wszelkie prawa zastrzeżone</footer>
        </div>
    );
}
