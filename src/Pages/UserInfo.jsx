import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getBackendUrl } from "../util/LocalUrlGeneration.js";

export default function UserInfo() {
    const [searchParams] = useSearchParams();
    const [info, setInfo] = useState(null);
    const id = searchParams.get("id");

    useEffect(() => {
        fetch(getBackendUrl() + "/user/" + id)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setInfo(data);
            });
    }, []);

    return (
        <>
            <p>{JSON.stringify(info)}</p>
        </>
    );
}
