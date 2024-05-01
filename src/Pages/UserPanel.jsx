import Comments from "../components/UserPanel/Comments";
import TipChart from "../components/UserPanel/TipChart";
import TipInfo from "../components/UserPanel/TipInfo";
import UserRating from "../components/UserPanel/UserRating";
import { getAuthToken } from "../components/auth/auth";
import { getBackendUrl } from "../util/localUrlGeneration.js";
import classes from "./UserPanel.module.css";
import { useLoaderData } from "react-router-dom";

import happyPersonImg from "/happy-person.png";
import { useContext, useState } from "react";
import { DarkModeContext } from "../components/DarkModeProvider.jsx";
import RatingChart from "../components/UserPanel/RatingChart.jsx";

export default function UserPanelPage() {
    const [showReviewChart, setShowReviewChart] = useState(false);
    const data = useLoaderData();
    const [darkMode, setDarkMode] = useContext(DarkModeContext);

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
                                ? data.sumTipValueForEveryMonth[0].amount
                                : 0
                        }
                        message="Zarobki w tym miesiącu"
                        currency="PLN"
                    />
                    <TipInfo
                        value={data.maxTipAmount}
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

export async function userPanelLoader() {
    const token = getAuthToken();
    const fetchUrlComments = getBackendUrl() + "/review/owner";
    // TODO - podawanie wlasnej waluty
    const fetchUrlTip = getBackendUrl() + "/tip/stats?currency=PLN";
    const fetchUrlRatingAvg = getBackendUrl() + "/review/avgRating";
    const fetchUrlRatingAll = getBackendUrl() + "/review/numberOfEachRating";

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
    } else if (responseTip.status === 406) {
        responseTipData = {
            numberOfTips: 0,
            minTipAmount: 0,
            maxTipAmount: 0,
            avgTipAmount: 0,
            // TODO - co tu wstawić
            currency: "???",
        };
    } else {
        throw new Error("Failed to GET response from user panel");
    }

    return {
        comments: responseCommentData,
        rating: responseRatingAvgData.avgRating,
        ratingAll: responseRatingAllData,
        ...responseTipData,
    };
}
