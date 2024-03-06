import { redirect } from "react-router-dom";
import { getBackendUrl } from "../../util/LocalUrlGeneration.js";

export async function action({ request }) {
    const data = await request.formData();
    const authData = {
        mail: data.get("mail"),
        password: data.get("password"),
    };

    const response = await fetch(getBackendUrl() + "/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    });

    if (response.status !== 200) {
        return redirect("?retry=true");
    }

    const responseJson = await response.json();

    localStorage.setItem("token", responseJson.token);
    console.log("Logged in");
    return redirect("/dev");
}

export function getAuthToken() {
    const token = localStorage.getItem("token");
    return token;
}

export function tokenLoader() {
    return getAuthToken();
}
