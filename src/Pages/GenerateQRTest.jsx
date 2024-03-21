import QRCode from "react-qr-code";
import { useEffect, useRef, useState } from "react";

import classes from "./GenerateQR.module.css";
import { getAuthToken } from "../components/auth/auth.js";
import { getBackendUrl, getFrontendUrl } from "../util/LocalUrlGeneration.js";

export default function GenerateQRTestPage() {
    // React components should not contain verbs, so <QRTestPage /> looks more up to standards
    const token = getAuthToken();
    const [id, setId] = useState(null);

    useEffect(() => {
        // Why isn't it fetched by a loader or passed via the prop? If you had two such components you would have two requests, while only one is necessary :)
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
