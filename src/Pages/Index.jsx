import "./index.css";

export default function Index() {
    return (
        <div className="index">
            <nav className="navigation">
                {/* <p>eNapiwek</p> */}
                <a href="#">Zaloguj się</a>
            </nav>

            <div className="container">
                <header className="main-header">
                    <img src="qr-code.jpg" alt="qr-code" />
                    <div className="header-title">
                        <h1>eNapiwek</h1>
                        <p>Aplikacja do napiwków QR</p>
                        <a href="#">Zarejestruj się</a>
                    </div>
                </header>

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
                    <img src="qr-code.jpg" alt="qr-code" />
                </section>

                <section className="welcome">
                    <img src="qr-code.jpg" alt="qr-code" />
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
                    {/* <img src="qr-code.jpg" alt="qr-code" /> */}
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
                        <img src="qr-code.jpg" alt="qr-code" />
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

                <section className="contact">
                    <h3>Zainteresowany?</h3>
                    <p>Napisz do nas aby dowiedzieć się szczegółów</p>
                </section>
            </div>

            <footer>Wszelkie prawa zastrzeżone</footer>
        </div>
    );
}
