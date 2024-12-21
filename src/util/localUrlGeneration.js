import { LOCAL } from "../App.jsx";

export function getBackendUrl() {
    return LOCAL
        ? "http://localhost:8080"
        : import.meta.env.VITE_API_BACKEND_URL ||
              "https://enapiwek.onrender.com";
}

export function getFrontendUrl() {
    return LOCAL
        ? "http://localhost:5173"
        : import.meta.env.VITE_API_FRONTEND_URL ||
              "https://enapiwek.onrender.com";
}
