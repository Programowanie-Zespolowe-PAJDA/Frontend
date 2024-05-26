import { useState } from "react";
import classes from "./UserPanel.module.css";

export default function CurrencySelector({ changeFunction, current }) {
    const [activeMenu, setActiveMenu] = useState(false);
    return (
        <div>
            <div className={classes.currencyContainer}>
                <div>
                    <button onClick={() => setActiveMenu((prev) => !prev)}>
                        {`Waluta: ${current}`}
                    </button>
                </div>
                {activeMenu && (
                    <ol>
                        <li>
                            <button
                                onClick={() => {
                                    changeFunction("NULL");
                                    setActiveMenu(false);
                                }}
                            >
                                Wszystko
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    changeFunction("PLN");
                                    setActiveMenu(false);
                                }}
                            >
                                Tylko PLN
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    changeFunction("EUR");
                                    setActiveMenu(false);
                                }}
                            >
                                Tylko EUR
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    changeFunction("USD");
                                    setActiveMenu(false);
                                }}
                            >
                                Tylko USD
                            </button>
                        </li>
                    </ol>
                )}
            </div>
        </div>
    );
}
