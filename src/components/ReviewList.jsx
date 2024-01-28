import { useState, useEffect } from "react";
import { getReviews } from "./http";
import "./List.css";

export default function ReviewDisplay() {
    const [reviewList, setReviewList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    const [isEditing, setIsEditing] = useState();
    const [editingData, setEditingData] = useState({
        rating: 0,
        comment: "",
        clientName: "",
    });

    useEffect(() => {
        async function fetchText() {
            setIsFetching(true);
            try {
                const response = await getReviews();
                setReviewList(response);
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

    function formatTime(date) {
        const dateObject = new Date(date);
        return `
        ${dateObject.getFullYear()}/${
            dateObject.getMonth() + 1
        }/${dateObject.getDate()} ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
    }
    function editHandler(index) {
        if (isEditing != index) {
            setIsEditing(index);
            setEditingData({
                rating: reviewList[index].rating,
                comment: reviewList[index].comment,
                clientName: reviewList[index].clientName,
            });
        } else setIsEditing();
    }
    function saveHandler() {
        // TO-DO: dodać zapisywanie po dodaniu logowania
    }
    function deleteHandler() {
        // TO-DO: dodać usuwanie po dodaniu logowania
    }
    function inputHandler(identifier, event) {
        setEditingData((oldValues) => ({
            ...oldValues,
            [identifier]: event.target.value,
        }));
    }

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
            {!isFetching && (
                <>
                    <table className="table">
                        <thead>
                            <tr className="list-head">
                                <td>ID</td>
                                <td>WaiterID</td>
                                <td>Date</td>
                                <td>Rating</td>
                                <td>Comment</td>
                                <td>ClientName</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {reviewList.map((review, index) => {
                                return (
                                    <tr key={index} className="list-data">
                                        <td>{review.id}</td>
                                        <td>{review.userID}</td>
                                        <td>{formatTime(review.createdAt)}</td>
                                        {index == isEditing ? (
                                            <>
                                                <td>
                                                    <input
                                                        id="rating"
                                                        type="number"
                                                        name="rating"
                                                        onChange={(event) =>
                                                            inputHandler(
                                                                "rating",
                                                                event
                                                            )
                                                        }
                                                        value={
                                                            editingData.rating
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        id="comment"
                                                        type="text"
                                                        name="comment"
                                                        onChange={(event) =>
                                                            inputHandler(
                                                                "comment",
                                                                event
                                                            )
                                                        }
                                                        value={
                                                            editingData.comment
                                                        }
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        id="clientName"
                                                        type="text"
                                                        name="clientName"
                                                        onChange={(event) =>
                                                            inputHandler(
                                                                "clientName",
                                                                event
                                                            )
                                                        }
                                                        value={
                                                            editingData.clientName
                                                        }
                                                    />
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{review.rating}</td>
                                                <td>{review.comment}</td>
                                                <td>{review.clientName}</td>
                                            </>
                                        )}

                                        <td>
                                            {index == isEditing ? (
                                                <>
                                                    <button
                                                        onClick={saveHandler}
                                                    >
                                                        zapisz
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            editHandler(index)
                                                        }
                                                    >
                                                        anuluj
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            editHandler(index)
                                                        }
                                                    >
                                                        edytuj
                                                    </button>
                                                    <button
                                                        onClick={deleteHandler}
                                                    >
                                                        usuń
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}
