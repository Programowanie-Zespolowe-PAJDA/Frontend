import { useLoaderData } from "react-router-dom";
import { getBackendUrl } from "../util/localUrlGeneration.js";
import { getAuthToken } from "../components/auth/auth.js";

export default function UserInfoPage() {
    const info = useLoaderData();

    return (
        <section style={{ fontSize: "10rem" }}>
            <p>{info.name}</p>
            <p>{info.surname}</p>
            <p>{info.mail}</p>
            <p>{info.location}</p>
        </section>
    );
}

export async function userInfoLoader() {
    const token = getAuthToken();
    const fetchUrl = getBackendUrl() + "/user/profile";

    const response = await fetch(fetchUrl, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to GET response from /review/read");
    }
    const responseData = await response.json();

    return responseData;
}
