import { useState } from "react";
import classes from "./ReviewAdd.module.css";
import { Form } from "react-router-dom";

const TIPS_AMOUNT = [5, 10, 20, 30, 40];

export default function Review({ userData }) {
    const [reviewData, setReviewData] = useState({
        rating: 0,
        tipAmount: "",
    });

    function selectHandler(type, value) {
        setReviewData((oldData) => ({
            ...oldData,
            [type]: value,
        }));
    }

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <h1>eNapiwek</h1>
                <p>Aplikacja do napiwków QR</p>
                <h3 className={classes.location}>{userData.location}</h3>
                <h3>{userData.name}</h3>
            </header>
            <Form method="post">
                <section className={classes.tip}>
                    <div className={classes.tipGrid}>
                        {TIPS_AMOUNT.map((tipValue, index) => (
                            <div
                                key={index}
                                className={`${classes.TipBg}
                                ${
                                    tipValue === reviewData.tipAmount
                                        ? classes.selectedTipBg
                                        : ""
                                }
                                    `}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        selectHandler("tipAmount", tipValue)
                                    }
                                    className={`${classes.tipButton}
                                    ${
                                        tipValue === reviewData.tipAmount
                                            ? classes.selectedTip
                                            : ""
                                    }
                                        `}
                                >
                                    {tipValue}
                                </button>
                            </div>
                        ))}
                        <input
                            id="tip"
                            type="number"
                            name="tip"
                            min="1"
                            required
                            onChange={(event) =>
                                selectHandler("tipAmount", event.target.value)
                            }
                            value={reviewData.tipAmount}
                            placeholder="Podaj wartość napiwku"
                        />
                        <select id="currency" name="currency">
                            <option>PLN</option>
                            <option>EUR</option>
                            <option>USD</option>
                            <option>CHF</option>
                        </select>
                    </div>
                </section>

                <section className={classes.rating}>
                    <ol>
                        {[...Array(10)].map((a, index) => {
                            const rating = index + 1;
                            return (
                                <li key={rating}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            selectHandler("rating", rating)
                                        }
                                    >
                                        <img
                                            alt="Rating scale"
                                            src={
                                                reviewData.rating >= rating
                                                    ? "/star-half.png"
                                                    : "/star-empty-half.png"
                                            }
                                            className={
                                                rating % 2 === 0
                                                    ? classes.mirror
                                                    : undefined
                                            }
                                        />
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                    <input
                        type="hidden"
                        id="rating"
                        name="rating"
                        value={reviewData.rating}
                    />
                </section>

                <section className={classes.comment}>
                    <input
                        id="clientName"
                        name="clientName"
                        placeholder="Twoje imię"
                    />
                    <textarea
                        id="comment"
                        name="comment"
                        placeholder="Komentarz"
                    />
                </section>

                <section className={classes.send}>
                    <button>Prześlij napiwek</button>
                </section>
            </Form>
        </div>
    );
}
