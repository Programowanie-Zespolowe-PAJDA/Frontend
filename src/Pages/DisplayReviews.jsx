import { useLoaderData } from "react-router-dom";
import { LOCAL } from "../App";
import ReviewDisplay from "../components/admin/ReviewList";

export default function DisplayReviewsPage() {
    const data = useLoaderData();
    return <ReviewDisplay initialData={data} />;
}

// TODO: Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
// Shouldn't above eslint rule be addressed?
export async function reviewDisplayLoader() {
    const fetchUrl = `http${LOCAL ? "" : "s"}://${
        LOCAL ? "localhost:8080" : "enapiwek-api.onrender.com"
    }/review`;

    const response = await fetch(fetchUrl);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error("Failed to GET response from /review/read");
    }

    return responseData;
}
