import QRCode from "react-qr-code";
import { useRef, useState } from "react";

import "./GenerateQRPage.css";

export default function GenerateQRTestPage() {
    const [url, setUrl] = useState("http://localhost/review?waiter=602");
    const urlInput = useRef();

    const handleClick = () => {
        setUrl(urlInput.current.value);
    };

    return (
        <>
            <div className="qr-container">
                <input
                    ref={urlInput}
                    type={"text"}
                    placeholder={"Wklej link"}
                />
                <button onClick={handleClick}>Generate QR Code</button>
                <QRCode value={url}></QRCode>
            </div>
        </>
    );
}
