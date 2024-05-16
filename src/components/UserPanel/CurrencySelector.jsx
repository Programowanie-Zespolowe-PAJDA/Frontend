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
                                    changeFunction("PLN");
                                    setActiveMenu(false);
                                }}
                            >
                                PLN
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    changeFunction("EUR");
                                    setActiveMenu(false);
                                }}
                            >
                                EUR
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    changeFunction("USD");
                                    setActiveMenu(false);
                                }}
                            >
                                USD
                            </button>
                        </li>
                    </ol>
                )}
            </div>
        </div>
    );
}
