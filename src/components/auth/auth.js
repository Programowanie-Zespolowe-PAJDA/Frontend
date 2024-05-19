import { redirect, useSubmit } from "react-router-dom";
import { getBackendUrl } from "../../util/localUrlGeneration.js";
import { ROLES } from "./roles.js";
import { setTimeout } from "timers";

export const msTokenLife = 1000 * 60 * 5.2;

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
        refreshToken: responseJson.refreshToken,
        role: rRole,
        lastRefresh: Date.now(),
    };
    localStorage.setItem("user", JSON.stringify(user));

    return redirect("/userpanel");
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

    const response = await fetch(getBackendUrl() + "/register", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
    });

    // TODO: handle 406 error and rare scenarions like email already in use
    if (response.status !== 201) {
        console.log("Błąd rejestracji!");
    } else {
        console.log("Rejestracja udana");
        return redirect("/thanksRegistration");
    }

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

export function getTimeLeft() {
    return msTokenLife - (Date.now() - getUser().lastRefresh);
}

export async function handleTokenRefresh(user, submit) {
    if (user) {
        const msLeft = getTimeLeft();
        console.log("AUTH: Time left: " + msLeft / 1000 / 60);

        // Expired
        if (msLeft <= 0) {
            console.log("AUTH: TOKEN EXPIRED");
            return submit(null, { action: "/logout", method: "post" });
        }
        // 5 mins left or less
        else if (msLeft <= 1000 * 60 * 5) {
            console.log("AUTH: TOKEN REFRESH START");
            const requestData = {
                token: user.token,
            };

            await fetch(getBackendUrl() + "/refresh", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => response.json())
                .then((response) => {
                    user.token = response.token;
                    user.lastRefresh = Date.now();
                    localStorage.setItem("user", JSON.stringify(user));
                })
                .then(() => console.log("Updated token!"))
                .catch((error) => console.error("Refresh error: " + error));
        }
    }
}
