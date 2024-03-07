import { useLoaderData } from "react-router-dom";
import { LOCAL } from "../App";
import ReviewDisplay from "../components/ReviewList";

export default function DisplayReviewsPage() {
    const data = useLoaderData();
    return <ReviewDisplay reviewList={data} />;
}

export async function reviewDisplayLoader() {
    const fetchUrl = `http${LOCAL ? "" : "s"}://${
        LOCAL ? "localhost:8080" : "enapiwek-api.onrender.com"
    }/review`;

    const response = await fetch(fetchUrl);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to GET response from /review/read");
    }

    console.log(responseData);

    return responseData;
}
