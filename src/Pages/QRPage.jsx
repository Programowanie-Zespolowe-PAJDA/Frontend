import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./GenerateQR.module.css";
import { getAuthToken } from "../components/auth/auth.js";
import { getBackendUrl, getFrontendUrl } from "../util/localUrlGeneration.js";

export default function QRPage() {
    const token = getAuthToken();
    const [id, setId] = useState(null);

    useEffect(() => {
        fetch(getBackendUrl() + "/user/profile", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => response.json())
            .then((json) => setId(json.id));
    }, []);

    return (
        <div className={classes.qrContainer}>
            {id && (
                <QRCode
                    value={`${getFrontendUrl()}/review/${id}`}
                    className={classes.qr}
                ></QRCode>
            )}
            <Link to="/info" className={classes.linkBack}>
                Wróc
            </Link>
        </div>
    );
}
