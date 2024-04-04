import { LOCAL } from "../App.jsx";

// TODO: Why is this file upper camel case? You probably should use one convention

export function getBackendUrl() {
    return LOCAL
        ? "http://localhost:8080"
        : "https://enapiwek-api.onrender.com";
}

export function getFrontendUrl() {
    return LOCAL ? "http://localhost:5173" : "https://enapiwek.onrender.com";
}
