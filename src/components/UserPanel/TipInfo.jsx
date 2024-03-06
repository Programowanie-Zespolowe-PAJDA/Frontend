export default function TipInfo({ value, message, currency }) {
    return (
        <li>
            <h3>
                {value}
                <span> {currency}</span>
            </h3>
            <p>{message}</p>
        </li>
    );
}
