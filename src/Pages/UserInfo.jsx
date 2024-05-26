import { useLoaderData } from "react-router-dom";
import { getBackendUrl } from "../util/localUrlGeneration.js";
import { getAuthToken, getUser } from "../components/auth/auth.js";
import UserInfo from "../components/userInfo/UserInfo.jsx";

export default function UserInfoPage() {
    const info = useLoaderData();

    return <UserInfo info={info} />;
}

export async function userInfoLoader() {
    if (!getUser()) {
        return null;
    }

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
