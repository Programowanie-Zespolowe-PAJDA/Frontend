import { useState } from "react";
import "./ReviewAdd.css";
import { Form } from "react-router-dom";

const TIPS_AMOUNT = [0, 5, 10, 20];

export default function Review() {
    const [reviewData, setReviewData] = useState({
        rating: 0,
        tipAmount: 0,
    });

    function ratingHandler(value) {
        setReviewData((oldData) => ({
            ...oldData,
            ["rating"]: value,
        }));
    }

    function tipHandler(value) {
        setReviewData((oldData) => ({
            ...oldData,
            ["tipAmount"]: value,
        }));
    }

    return (
        <div className="background">
            <div className="review-container">
                <h1 className="review-header">Recenzja</h1>
                <Form method="post" className="review-form">
                    <section className="input-section">
                        <label htmlFor="clientName">Twoje imie</label>
                        <input id="clientName" name="clientName" />
                    </section>

                    <section className="input-section">
                        <label htmlFor="rating">Ocena</label>
                        <ol className="star-rating">
                            {[...Array(5)].map((a, index) => {
                                const rating = index + 1;
                                return (
                                    <li key={rating}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                ratingHandler(rating)
                                            }
                                        >
                                            <img
                                                src={
                                                    reviewData.rating >= rating
                                                        ? "/star.png"
                                                        : "/star-empty.png"
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

                    <section className="input-section">
                        <label htmlFor="comment">Komentarz</label>
                        <input id="comment" name="comment" />
                    </section>

                    <section className="input-section tip">
                        <label htmlFor="tip">Napiwek</label>
                        <div className="tip-buttons-grid">
                            {TIPS_AMOUNT.map((tipValue, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => tipHandler(tipValue)}
                                >
                                    {tipValue}
                                </button>
                            ))}
                            <input
                                id="tip"
                                type="number"
                                name="tip"
                                onChange={(event) =>
                                    tipHandler(event.target.value)
                                }
                                value={reviewData.tipAmount}
                            />
                        </div>
                    </section>

                    <section className="review-buttons">
                        <button type="reset" className="review-button reset">
                            Reset
                        </button>
                        <button className="review-button submit">Wyślij</button>
                    </section>
                </Form>
            </div>
        </div>
    );
}
