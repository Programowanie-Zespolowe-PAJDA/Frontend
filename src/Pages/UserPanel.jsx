import UserPanel from "../components/UserPanel/UserPanel.jsx";
import { getAuthToken } from "../components/auth/auth";
import { getBackendUrl } from "../util/localUrlGeneration.js";
import { useLoaderData } from "react-router-dom";

export default function UserPanelPage() {
    const data = useLoaderData();
    console.log(data);
    return <UserPanel initialData={data} />;
}

export async function userPanelLoader() {
    const token = getAuthToken();
    const fetchUrlComments = getBackendUrl() + "/review/owner";
    // TODO - podawanie wlasnej waluty
    const fetchUrlTip = getBackendUrl() + "/tip/stats?currency=PLN";
    const fetchUrlRatingAvg = getBackendUrl() + "/review/avgRating";
    const fetchUrlRatingAll = getBackendUrl() + "/review/numberOfEachRating";

    const responseComment = await fetch(fetchUrlComments, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const responseTip = await fetch(fetchUrlTip, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const responseRatingAvg = await fetch(fetchUrlRatingAvg, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    const responseRatingAll = await fetch(fetchUrlRatingAll, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    const responseCommentData = await responseComment.json();
    const responseRatingAvgData = await responseRatingAvg.json();
    const responseRatingAllData = await responseRatingAll.json();

    let responseTipData;

    if (!responseComment.ok) {
        throw new Error("Failed to GET response from user panel");
    }
    if (responseTip.ok) {
        responseTipData = await responseTip.json();
    } else {
        throw new Error("Failed to GET response from user panel");
    }

    return {
        comments: responseCommentData,
        rating: responseRatingAvgData.avgRating,
        ratingAll: responseRatingAllData,
        ...responseTipData,
        currency: "PLN",
    };
}
