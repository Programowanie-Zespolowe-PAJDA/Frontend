import QRCode from "react-qr-code";
import { useRef, useState } from "react";

export default function QRPage() {
    const [url, setUrl] = useState("");
    const urlInput = useRef();

    const handleClick = () => {
        setUrl(urlInput.current.value);
    };

    return (
        <>
            <br />{" "}
            <input ref={urlInput} type={"text"} placeholder={"Wklej link"} />{" "}
            <br />
            <button onClick={handleClick}>Generate QR Code</button> <br />
            <QRCode value={url}></QRCode>
        </>
    );
}
