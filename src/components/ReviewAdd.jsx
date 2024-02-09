import { useState } from "react";
import "./ReviewAdd.css";
import { useNavigate } from "react-router-dom";
import { postReview } from "./http";

const TIPS_AMOUNT = [0, 5, 10, 20];

export default function Review() {
    const navigate = useNavigate();
    const [reviewData, setReviewData] = useState({
        rating: 0,
        comment: "",
        clientName: "",
        tipAmount: 0,
    });
    const searchParams = new URLSearchParams(window.location.search);

    const navigateToThankYou = () => {
        navigate("/thankyou");
    };

    function submitHandler(event) {
        event.preventDefault();

        const waiter = searchParams.get("waiter");
        console.log(waiter);

        console.log("submitted values");
        console.log(reviewData);

        console.log(new Date());

        postReview({ ...reviewData, userID: waiter });

        navigateToThankYou();
    }
    function resetHandler(event) {
        event.preventDefault();
        setReviewData({
            rating: 0,
            comment: "",
            clientName: "",
            tipAmount: 0,
        });
    }
    function inputHandler(identifier, event) {
        setReviewData((oldData) => ({
            ...oldData,
            [identifier]: event.target.value,
        }));
    }
    function ratingButtonHandler(value) {
        setReviewData((oldData) => ({
            ...oldData,
            ["rating"]: value,
        }));
    }
    function tipButtonHandler(value) {
        setReviewData((oldData) => ({
            ...oldData,
            ["tipAmount"]: value,
        }));
    }

    if (!searchParams.has("waiter")) {
        return (
            <>
                <h2>Waiter not specified</h2>
                <p>add ?waiter=xx to url</p>
            </>
        );
    }

    return (
        <div className="background">
            <div className="review-container">
                <h1 className="review-header">Recenzja</h1>
                <form
                    onSubmit={submitHandler}
                    onReset={resetHandler}
                    className="review-form"
                >
                    <section className="input-section">
                        <label htmlFor="clientName">Twoje imie</label>
                        <input
                            id="clientName"
                            type="clientName"
                            name="clientName"
                            onChange={(event) =>
                                inputHandler("clientName", event)
                            }
                            value={reviewData.clientName}
                        />
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
                                                ratingButtonHandler(rating)
                                            }
                                        >
                                            <img
                                                src={
                                                    reviewData.rating >= rating
                                                        ? "../../public/star.png"
                                                        : "../../public/star-empty.png"
                                                }
                                            />
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </section>

                    <section className="input-section">
                        <label htmlFor="comment">Komentarz</label>
                        <input
                            id="comment"
                            type="comment"
                            name="comment"
                            onChange={(event) => inputHandler("comment", event)}
                            value={reviewData.comment}
                        />
                    </section>

                    <section className="input-section tip">
                        <label htmlFor="tip">Napiwek</label>
                        <div className="tip-buttons-grid">
                            {TIPS_AMOUNT.map((tipValue, index) => (
                                <>
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() =>
                                            tipButtonHandler(tipValue)
                                        }
                                    >
                                        {tipValue}
                                    </button>
                                </>
                            ))}
                            <input
                                id="tip"
                                type="number"
                                name="tip"
                                onChange={(event) =>
                                    inputHandler("tipAmount", event)
                                }
                                value={reviewData.tipAmount}
                            />
                        </div>
                    </section>

                    <section className="review-buttons">
                        <button type="reset" className="review-button reset">
                            Reset
                        </button>
                        <button type="submit" className="review-button submit">
                            Wyślij
                        </button>
                    </section>
                </form>
            </div>
        </div>
    );
}
