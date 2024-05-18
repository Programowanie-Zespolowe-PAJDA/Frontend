import { Link } from "react-router-dom";
import classes from "./UserInfo.module.css";
import QRCode from "react-qr-code";
import { getFrontendUrl } from "../../util/localUrlGeneration";

export default function QRBox({ id }) {
    const qrURL = `${getFrontendUrl()}/review/${id}`;

    function downloadQRCode() {
        const canvas = document.getElementById("qr-code").outerHTML;
        const qrURL = "data:image/svg+xml," + encodeURIComponent(canvas);
        let downloadLink = document.createElement("a");
        downloadLink.href = qrURL;
        downloadLink.download = "QRCode.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    return (
        <div className={classes.qr}>
            <QRCode id="qr-code" value={qrURL} className={classes.qrImg} />
            <Link
                to="/qr"
                className={`${classes.button} ${classes.buttonQRView}`}
            >
                Wyświetl
            </Link>
            <button
                onClick={downloadQRCode}
                className={`${classes.button} ${classes.buttonQRDownload}`}
            >
                Pobierz
            </button>
        </div>
    );
}
