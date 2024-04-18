import { Link } from "react-router-dom";

export default function thanksForRegistration() {
    return (
        <center>
            <h1>Registration Successfull</h1>
            <h2>Thank you, you can now log into your account</h2>
            <Link to={"/auth"}>Log in</Link>
        </center>
    );
}
