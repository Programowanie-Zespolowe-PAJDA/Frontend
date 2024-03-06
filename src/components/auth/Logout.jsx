import { redirect } from "react-router-dom";

export function action() {
    localStorage.removeItem("token");
    console.log("logged out");
    return redirect("/dev");
}
