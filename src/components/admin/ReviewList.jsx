import { useState } from "react";
import classes from "./List.module.css";
import { getBackendUrl } from "../../util/localUrlGeneration";
import { getAuthToken } from "../auth/auth";
import { toast } from "react-toastify";

export default function ReviewDisplay({ reviewList }) {
    const [isEditing, setIsEditing] = useState();
    const [editingData, setEditingData] = useState({
        rating: 0,
        comment: "",
        clientName: "",
    });

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
    async function deleteHandler(id) {
        console.log("usuwam");
        console.log(id);
        const fetchUrl = getBackendUrl() + `/review/${id}`;

        const token = getAuthToken();

        const response = await fetch(fetchUrl, {
            method: "DELETE",
            // body: JSON.stringify(sendPackage),
            headers: {
                Authorization: "Bearer " + token,
                // "Content-Type": "application/json",
            },
        });

        console.log(response);

        if (!response.ok) {
            toast.error("Nie udało się usunąć recenzji.");
        } else {
            toast.success("recenzja została usunięta.");
        }
    }
    function inputHandler(identifier, event) {
        setEditingData((oldValues) => ({
            ...oldValues,
            [identifier]: event.target.value,
        }));
    }

    return (
        <table className={classes.table}>
            <thead className={classes.head}>
                <tr>
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
                        <tr key={index} className={classes.body}>
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
                                                inputHandler("rating", event)
                                            }
                                            value={editingData.rating}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            id="comment"
                                            type="text"
                                            name="comment"
                                            onChange={(event) =>
                                                inputHandler("comment", event)
                                            }
                                            value={editingData.comment}
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
                                            value={editingData.clientName}
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
                                        <button onClick={saveHandler}>
                                            zapisz
                                        </button>
                                        <button
                                            onClick={() => editHandler(index)}
                                        >
                                            anuluj
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => editHandler(index)}
                                        >
                                            edytuj
                                        </button>
                                        <button
                                            className={classes.button}
                                            onClick={() =>
                                                deleteHandler(review.id)
                                            }
                                        >
                                            <img
                                                src="/bin.png"
                                                className={classes.bin}
                                            />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
