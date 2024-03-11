import { json, redirect } from "react-router-dom";
import ReviewAdd from "../components/review/ReviewAdd";
import { LOCAL } from "../App";

export default function ReviewPage() {
    return (
        <>
            <ReviewAdd />
        </>
    );
}

export async function reviewAddAction({ request, params }) {
    const fetchUrl = `http${LOCAL ? "" : "s"}://${
        LOCAL ? "localhost:8080" : "enapiwek-api.onrender.com"
    }/review`;

    const data = await request.formData();
    const userId = params.waiterId;

    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();

    const reviewData = {
        rating: data.get("rating"),
        comment: data.get("comment"),
        clientName: data.get("clientName"),
        hashRevID: ipData.ip,
        userID: userId,
    };
    console.log("dane wysylane:");
    console.log(reviewData);

    const response = await fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const responseData = await response.text();
        throw json(
            {
                message: "Błąd przy wysyłaniu recenzji.",
                response: responseData,
            },
            { status: 500 }
        );
    }

    return redirect("/thankYou");
}
