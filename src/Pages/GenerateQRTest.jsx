import QRCode from "react-qr-code";
import { useEffect, useRef, useState } from "react";

import classes from "./GenerateQR.module.css";
import { getAuthToken } from "../components/auth/auth.js";
import { getBackendUrl, getFrontendUrl } from "../util/LocalUrlGeneration.js";

export default function GenerateQRTestPage() {
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
                    value={getFrontendUrl() + "/dev/userinfo?id=" + id}
                ></QRCode>
            )}
        </div>
    );
}
