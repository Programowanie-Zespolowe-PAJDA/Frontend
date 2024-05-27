import { json, redirect, useLoaderData } from "react-router-dom";
import ReviewAdd from "../components/review/ReviewAdd";
import { getBackendUrl } from "../util/localUrlGeneration";
import { toast } from "react-toastify";

export default function ReviewPage() {
    const userData = useLoaderData();
    return <ReviewAdd userData={userData} />;
}

export async function reviewAddLoader({ params }) {
    const { waiterId } = params;
    const fetchUrl = getBackendUrl() + `/user/${waiterId}`;
    const response = await fetch(fetchUrl);
    const responseData = await response.json();
    return responseData;
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

    console.log("Wysylam");
    const response = await fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log("dostalem");
    console.log(response);

    if (response.status == 429) {
        return redirect("/cooldown");
    }

    if (!response.ok) {
        // const responseData = await response.text();
        // throw json(
        //     {
        //         message: "Błąd przy wysyłaniu recenzji.",
        //         response: responseData,
        //     },
        //     { status: 500 }
        // );
        toast.error("Błąd przy wysyłaniu napiwka");
        return redirect("");
    }

    const responseData = await response.json();
    return redirect(responseData.redirectUri);
}
