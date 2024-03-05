import QRCode from "react-qr-code";
import { useRef, useState } from "react";

import classes from "./GenerateQR.module.css";

export default function GenerateQRTestPage() {
    return (
        <div className={classes.qrContainer}>
            <QRCode value={url}></QRCode>
        </div>
    );
}
