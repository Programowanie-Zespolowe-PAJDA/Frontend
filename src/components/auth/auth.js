import { redirect } from "react-router-dom";
import { getBackendUrl } from "../../util/localUrlGeneration.js";
import { ROLES } from "./roles.js";

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
    const rToken = responseJson.token;
    let rRole;

    const responseAdmin = await fetch(getBackendUrl() + "/admin", {
        headers: {
            Authorization: "Bearer " + rToken,
        },
    });

    if (responseAdmin.status === 200) {
        rRole = ROLES.ADMIN;
    } else {
        rRole = ROLES.USER;
    }

    const user = {
        token: rToken,
        role: rRole,
    };
    localStorage.setItem("user", JSON.stringify(user));

    console.log("Logged in");
    return redirect("/dev");
}

export async function registerAction({ request }) {
    const data = await request.formData();
    const registerData = {
        name: data.get("name"),
        surname: data.get("surname"),
        mail: data.get("mail"),
        password: data.get("password"),
        retypedPassword: data.get("retypedPassword"),
        location: data.get("location"),
        bankAccountNumber: data.get("bankAccountNumber"),
    };

    console.log(registerData);
    return null;
}

export function getAuthToken() {
    return getUser().token;
}

export function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export async function userLoader() {
    return getUser();
}
