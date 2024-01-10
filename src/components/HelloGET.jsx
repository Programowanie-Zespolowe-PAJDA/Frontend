import { useEffect } from "react";
import { useState } from "react";
import { getHello } from "./http";

export default function HelloGET() {
    const [text, setText] = useState("not yet");
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchText() {
            setIsFetching(true);
            try {
                const response = await getHello();
                setText(response);
            } catch (error) {
                setError({
                    message:
                        error.message ||
                        "Could not fetch text, try again later.",
                });
            }
            setIsFetching(false);
        }
        fetchText();
    }, []);

    if (error) {
        return (
            <>
                <h1>error</h1>
                <p>{error.message}</p>;
            </>
        );
    }

    return (
        <>
            {isFetching && "getting data..."}
            <h1>{text}</h1>
        </>
    );
}
