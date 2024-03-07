import { useLoaderData } from "react-router-dom";
import UserList from "../components/UserList";
import { getAuthToken } from "../components/auth/auth";
import { getBackendUrl } from "../util/LocalUrlGeneration";

export default function DisplayUsersPage() {
    const data = useLoaderData();

    return (
        <>
            <UserList data={data} />
        </>
    );
}

export async function displayUsersLoader() {
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

    console.log("response data");
    console.log(responseData);

    return responseData;
}
