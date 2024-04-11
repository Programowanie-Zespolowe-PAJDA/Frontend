import Comments from "../components/UserPanel/Comments";
import TipChart from "../components/UserPanel/TipChart";
import TipInfo from "../components/UserPanel/TipInfo";
import UserRating from "../components/UserPanel/UserRating";
import { getAuthToken } from "../components/auth/auth";
import { getBackendUrl } from "../util/localUrlGeneration.js";
import classes from "./UserPanel.module.css";
import { useLoaderData } from "react-router-dom";

import happyPersonImg from "/happy-person.png";

const EXAMPLE_CHART = [
    {
        amount: 100,
        month: "march",
        year: "2024",
        currency: "PLN",
    },
    {
        amount: 200,
        month: "february",
        year: "2024",
        currency: "PLN",
    },
    {
        amount: 500,
        month: "january",
        year: "2024",
        currency: "PLN",
    },
    {
        amount: 300,
        month: "december",
        year: "2023",
        currency: "PLN",
    },
    {
        amount: 50,
        month: "november",
        year: "2023",
        currency: "PLN",
    },
];

export default function UserPanelPage() {
    const data = useLoaderData();

    return (
        <div className={classes.container}>
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
                        currency={data.currency}
                    />
                    <TipInfo
                        value={data.maxTipAmount}
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
            </section>
            <section className={classes.comments}>
                <h2>Wykres przychodów z napiwków</h2>
                <TipChart data={EXAMPLE_CHART} />
            </section>
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
    const fetchUrTip = getBackendUrl() + "/tip/stats";
    const fetchUrRating = getBackendUrl() + "/review/avgRating";

    const responseComment = await fetch(fetchUrlComments, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const responseTip = await fetch(fetchUrTip, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const responseRating = await fetch(fetchUrRating, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const responseCommentData = await responseComment.json();
    const responseRatingData = await responseRating.json();

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

    console.log("komentarze");
    console.log(responseCommentData);
    console.log("napiwki");
    console.log(responseTipData);

    console.log(responseRatingData.avgRating);
    console.log("polaczone");
    console.log({
        comments: responseCommentData,
        rating: responseRatingData.avgRating,
        ...responseTipData,
    });

    return {
        comments: responseCommentData,
        rating: responseRatingData.avgRating,
        ...responseTipData,
    };
}
