import { useLoaderData } from "react-router-dom";
import { getBackendUrl } from "../util/localUrlGeneration.js";
import { getAuthToken } from "../components/auth/auth.js";
import UserInfo from "../components/userInfo/UserInfo.jsx";

export default function UserInfoPage() {
    const info = useLoaderData();

    return <UserInfo info={info} />;
}

export async function userInfoLoader() {
    console.log("userInfoLoader");
    const token = getAuthToken();
    console.log("userInfoLoader");
    const fetchUrl = getBackendUrl() + "/user/profile";
    console.log("userInfoLoader");

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
