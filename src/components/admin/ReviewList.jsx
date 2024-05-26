import { useState } from "react";
import classes from "./List.module.css";
import { getBackendUrl } from "../../util/localUrlGeneration";
import { getAuthToken } from "../auth/auth";
import { toast } from "react-toastify";

export default function ReviewDisplay({ initialData }) {
    const [data, setData] = useState(initialData.sort(sortByTime));
    const [searchedList, setSearchedList] = useState(data);

    function sortByTime(a, b) {
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        return 0;
    }

    function formatTime(date) {
        const dateObject = new Date(date);
        return `
        ${dateObject.getFullYear()}/${
            dateObject.getMonth() + 1
        }/${dateObject.getDate()} ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
    }
    async function deleteHandler(id) {
        const fetchUrl = getBackendUrl() + `/review/${id}`;

        const token = getAuthToken();

        const response = await fetch(fetchUrl, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        if (!response.ok) {
            toast.error("Nie udało się usunąć recenzji.");
        } else {
            toast.success("recenzja została usunięta.");
            setData((prev) => {
                return prev.filter((user) => user.id !== id);
            });
        }
    }
    function searchList(term) {
        setSearchedList(
            data.filter((review) =>
                Object.values(review).some((val) =>
                    String(val).toLowerCase().includes(term.toLowerCase())
                )
            )
        );
    }

    return (
        <section className={classes.container}>
            <input
                id="search"
                name="search"
                type="text"
                className={classes.search}
                onChange={(event) => searchList(event.target.value)}
            />
            <table className={classes.table}>
                <thead className={classes.head}>
                    <tr>
                        <td>Id</td>
                        <td>Id użytkownika</td>
                        <td>Data</td>
                        <td>Ocena</td>
                        <td>Komentarz</td>
                        <td>Klient</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {searchedList.map((review, index) => {
                        return (
                            <tr key={index} className={classes.body}>
                                <td>{review.id}</td>
                                <td>{review.userID}</td>
                                <td>{formatTime(review.createdAt)}</td>
                                <td>{review.rating}</td>
                                <td>{review.comment}</td>
                                <td>{review.clientName}</td>

                                <td>
                                    <button
                                        className={classes.button}
                                        onClick={() => deleteHandler(review.id)}
                                    >
                                        <img
                                            src="/bin.png"
                                            className={classes.bin}
                                        />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
}
