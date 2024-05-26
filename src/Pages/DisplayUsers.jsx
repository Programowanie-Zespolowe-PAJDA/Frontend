import { useLoaderData } from "react-router-dom";
import UserList from "../components/admin/UserList.jsx";
import { getAuthToken, getUser } from "../components/auth/auth";
import { getBackendUrl } from "../util/localUrlGeneration.js";

export default function DisplayUsersPage() {
    const data = useLoaderData();

    return (
        <>
            <UserList initialData={data} />
        </>
    );
}

export async function displayUsersLoader() {
    if (!getUser()) {
        return null;
    }

    const token = getAuthToken();
    const fetchUrl = getBackendUrl() + "/user";

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
