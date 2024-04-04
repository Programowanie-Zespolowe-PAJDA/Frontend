import { getUser } from "./auth.js";
import { Navigate } from "react-router-dom";
import { ROLES } from "./roles.js";
export default function ProtectedRoute({
    allowedRoles = [ROLES.ADMIN],
    children,
}) {
    const user = getUser();

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to={"../auth"} />;
    } else {
        console.log(children);
        return children;
    }
}
