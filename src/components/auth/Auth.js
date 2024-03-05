import { redirect } from "react-router-dom";

export async function action({ request }) {
    const data = await request.formData();
    const authData = {
        mail: data.get("mail"),
        password: data.get("password"),
    };

    const response = await fetch("http://localhost:8080/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    });

    console.log(response);

    //TODO: better error handling
    if (response.status !== 200) {
        return redirect("?retry=true");
    }

    const responseBody = await response.json();
    console.log(responseBody);

    localStorage.setItem("token", responseBody.token);
    return redirect("/");
}
