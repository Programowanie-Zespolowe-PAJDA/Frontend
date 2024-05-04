import { json, redirect } from "react-router-dom";
import ReviewAdd from "../components/review/ReviewAdd";
import { getBackendUrl } from "../util/localUrlGeneration";

export default function ReviewPage() {
    return <ReviewAdd />;
}

export async function reviewAddAction({ request, params }) {
    const fetchUrl = getBackendUrl() + "/opinion";

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
        amount: data.get("tip") * 100,
        currency: data.get("currency"),
    };
    console.log("dane wysylane:");
    console.log(JSON.stringify(reviewData));

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

    const responseData = await response.json();
    return redirect(responseData.redirectUri);
}
