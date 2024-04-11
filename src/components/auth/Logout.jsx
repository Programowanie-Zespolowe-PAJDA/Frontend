import { redirect } from "react-router-dom";

export function action() {
    localStorage.removeItem("user");
    console.log("logged out");
    return redirect("/");
}
