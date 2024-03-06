import { getAuthToken } from "./auth.js";
import { Navigate, useLoaderData } from "react-router-dom";

export default function ProtectedRoute(props) {
    console.log("hello?");
    const token = getAuthToken();

    if (!token) {
        return <Navigate to={"../auth"} />;
    } else {
        return props.children;
    }
}
