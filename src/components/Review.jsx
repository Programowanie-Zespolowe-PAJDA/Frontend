import { useState } from "react";
import "./review.css";
import { useNavigate } from "react-router-dom";

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

    return (
        <>
            <form
                onSubmit={submitHandler}
                onReset={resetHandler}
                className="review-form"
            >
                <label htmlFor="clientName">Your name</label>
                <input
                    id="clientName"
                    type="clientName"
                    name="clientName"
                    onChange={(event) => inputHandler("clientName", event)}
                    value={reviewData.clientName}
                />

                <label htmlFor="rating">Rating</label>
                <ol className="star-rating">
                    {[...Array(5)].map((a, index) => {
                        index++;
                        return (
                            <li key={index}>
                                <button
                                    type="button"
                                    onClick={() => ratingButtonHandler(index)}
                                >
                                    <img
                                        src={
                                            reviewData.rating >= index
                                                ? "star.png"
                                                : "star-empty.png"
                                        }
                                    />
                                </button>
                            </li>
                        );
                    })}
                </ol>

                <label htmlFor="comment">comment</label>
                <input
                    id="comment"
                    type="comment"
                    name="comment"
                    onChange={(event) => inputHandler("comment", event)}
                    value={reviewData.comment}
                />

                <section className="tip">
                    <label htmlFor="tip">tip</label>
                    <button type="button" onClick={() => tipButtonHandler(5)}>
                        5
                    </button>
                    <button type="button" onClick={() => tipButtonHandler(10)}>
                        10
                    </button>
                    <button type="button" onClick={() => tipButtonHandler(20)}>
                        20
                    </button>
                    <input
                        id="tip"
                        type="number"
                        name="tip"
                        onChange={(event) => inputHandler("tipAmount", event)}
                        value={reviewData.tipAmount}
                    />
                </section>

                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button type="submit" className="button">
                    Send
                </button>
            </form>
        </>
    );
}
