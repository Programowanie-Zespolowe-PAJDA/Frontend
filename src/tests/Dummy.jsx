import { useState } from "react";

export default function Dummy() {
    const [testReverse, setTestReverse] = useState(false);

    function clickReverseHandler() {
        setTestReverse((prevTestReverse) => !prevTestReverse);
    }

    return (
        <>
            <h1>{testReverse ? "tseT" : "Test"}</h1>
            <button onClick={clickReverseHandler}>reverse</button>
        </>
    );
}
