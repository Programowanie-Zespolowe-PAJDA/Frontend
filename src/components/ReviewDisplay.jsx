import { useState, useEffect } from "react";
import { getReviews } from "./http";

export default function ReviewDisplay() {
    const [reviewList, setReviewList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchText() {
            setIsFetching(true);
            try {
                const response = await getReviews();
                setReviewList(response);
            } catch (error) {
                setError({
                    message:
                        error.message ||
                        "Could not fetch text, try again later.",
                });
            }
            setIsFetching(false);
        }
        fetchText();
    }, []);

    if (error) {
        return (
            <>
                <h1>error</h1>
                <p>{error.message}</p>;
            </>
        );
    }

    console.log(reviewList);
    console.log("reviewList");
    return (
        <>
            {isFetching && "getting data..."}
            {!isFetching && (
                <>
                    <ol>
                        {reviewList.map((review, index) => {
                            return (
                                <li key={index}>
                                    <p>name: {review.clientName}</p>
                                    <p>rating: {review.rating}</p>
                                    <p>comment: {review.comment}</p>
                                </li>
                            );
                        })}
                    </ol>
                </>
            )}
        </>
    );
}
