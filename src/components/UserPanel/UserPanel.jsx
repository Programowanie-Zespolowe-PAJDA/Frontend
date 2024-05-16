import RatingChart from "./RatingChart.jsx";
import Comments from "./Comments";
import TipChart from "./TipChart";
import TipInfo from "./TipInfo";
import UserRating from "./UserRating";
import classes from "./UserPanel.module.css";
import happyPersonImg from "/happy-person.png";
import { useContext, useState } from "react";
import { DarkModeContext } from "../DarkModeProvider.jsx";
import CurrencySelector from "./CurrencySelector.jsx";
import { getAuthToken } from "../auth/auth.js";
import { getBackendUrl } from "../../util/localUrlGeneration.js";

export default function UserPanel({ initialData }) {
    const [showReviewChart, setShowReviewChart] = useState(false);
    const [data, setData] = useState(initialData);
    const [darkMode] = useContext(DarkModeContext);

    async function setCurrency(currency) {
        const token = getAuthToken();
        const fetchUrlComments = getBackendUrl() + "/review/owner";
        // TODO - podawanie wlasnej waluty
        const fetchUrlTip = getBackendUrl() + "/tip/stats?currency=" + currency;
        const fetchUrlRatingAvg = getBackendUrl() + "/review/avgRating";
        const fetchUrlRatingAll =
            getBackendUrl() + "/review/numberOfEachRating";

        console.log(fetchUrlTip);

        const responseComment = await fetch(fetchUrlComments, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        const responseTip = await fetch(fetchUrlTip, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        const responseRatingAvg = await fetch(fetchUrlRatingAvg, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        const responseRatingAll = await fetch(fetchUrlRatingAll, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        const responseCommentData = await responseComment.json();
        const responseRatingAvgData = await responseRatingAvg.json();
        const responseRatingAllData = await responseRatingAll.json();

        let responseTipData;

        if (!responseComment.ok) {
            throw new Error("Failed to GET response from user panel");
        }
        if (responseTip.ok) {
            responseTipData = await responseTip.json();
        } else {
            throw new Error("Failed to GET response from user panel");
        }

        setData({
            comments: responseCommentData,
            rating: responseRatingAvgData.avgRating,
            ratingAll: responseRatingAllData,
            ...responseTipData,
            currency: currency,
        });
    }

    console.log(data);

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
                    <CurrencySelector
                        changeFunction={setCurrency}
                        current={data.currency}
                    />
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
                        currency={data.currency}
                    />
                    <TipInfo
                        value={data.maxTipAmount / 100}
                        message="Najwyższy napiwek"
                        currency={data.currency}
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
                {data.ge}
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
