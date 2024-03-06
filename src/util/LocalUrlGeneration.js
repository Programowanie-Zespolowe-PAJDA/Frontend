import { LOCAL } from "../App.jsx";

export function getBackendUrl() {
    return LOCAL
        ? "http://localhost:8080"
        : "https://enapiwek-api.onrender.com";
}

export function getFrontendUrl() {
    return LOCAL ? "http://localhost:5173" : "https://enapiwek.onrender.com/";
}
