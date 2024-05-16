import classes from "./UserPanel.module.css";

export default function CurrencySelector({ changeFunction }) {
    return (
        <div>
            Wybierz walutę
            <div className={classes.currencyContainer}>
                <div>CURRENT</div>
                <ol>
                    <li>
                        <button onClick={() => changeFunction("PLN")}>
                            PLN
                        </button>
                    </li>
                    <li>
                        <button onClick={() => changeFunction("EUR")}>
                            EUR
                        </button>
                    </li>
                    <li>
                        <button onClick={() => changeFunction("USD")}>
                            USD
                        </button>
                    </li>
                </ol>
            </div>
        </div>
    );
}
