import RatingChart from "./RatingChart.jsx";
import Comments from "./Comments";
import TipChart from "./TipChart";
import TipInfo from "./TipInfo";
import UserRating from "./UserRating";
import classes from "./UserPanel.module.css";
import happyPersonImg from "/happy-person.png";
import { useContext, useState } from "react";
import { DarkModeContext } from "../DarkModeProvider.jsx";

const EXAMPLE_DATA = {
    numberOfTips: 10,
    minTipAmount: 506,
    maxTipAmount: 1245,
    avgTipAmount: 905,
    // TODO - co tu wstawić
    currency: "PLN",
};

export default function UserPanel({ data }) {
    const [showReviewChart, setShowReviewChart] = useState(false);
    const [darkMode, setDarkMode] = useContext(DarkModeContext);

    data = EXAMPLE_DATA;
    return (
        <div
            className={`${classes.container} ${
                darkMode ? classes.dark : undefined
            }`}
        >
            <header className={classes.header}>
                <div className={classes.headerLine}>
                    <h1>Panel</h1>
                    <hr />
                </div>
                <div className={classes.headerLine}>
                    <h1>Napiwków</h1>
                    <hr />
                </div>
            </header>
            <section className={classes.earnings}>
                <ol>
                    <TipInfo
                        value={
                            data.sumTipValueForEveryMonth
                                ? data.sumTipValueForEveryMonth[0].amount / 100
                                : 0
                        }
                        message="Zarobki w tym miesiącu"
                        currency="PLN"
                    />
                    <TipInfo
                        value={data.maxTipAmount / 100}
                        message="Najwyższy napiwek"
                        currency="PLN"
                    />
                    <TipInfo
                        value={data.numberOfTips}
                        message="Ilość wpłaconych napiwków"
                    />
                </ol>
                <img src={happyPersonImg} alt="happy-person" />
            </section>
            <section className={classes.rating}>
                <h2>Opinia publiczna</h2>
                <UserRating rating={data.rating} />
                <button onClick={() => setShowReviewChart((prev) => !prev)}>
                    {`${showReviewChart ? "Schowaj" : "Rozwiń"}`}
                </button>
                {showReviewChart && <RatingChart chartData={data.ratingAll} />}
            </section>
            {data.sumTipValueForEveryMonth && (
                <section className={classes.comments}>
                    <h2>Wykres przychodów z napiwków</h2>
                    <TipChart data={data.sumTipValueForEveryMonth} />
                </section>
            )}

            <section className={classes.comments}>
                <h2>Komentarze</h2>
                <Comments commentList={data.comments} />
            </section>
        </div>
    );
}
