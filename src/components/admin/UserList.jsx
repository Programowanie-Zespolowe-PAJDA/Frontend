import { toast } from "react-toastify";
import { getBackendUrl } from "../../util/localUrlGeneration";
import { getAuthToken } from "../auth/auth";
import classes from "./List.module.css";
import { useState } from "react";

export default function UserList({ initialData }) {
    const [data, setData] = useState(initialData.sort(sortById));
    const [searchedList, setSearchedList] = useState(data);

    function sortById(a, b) {
        if (a.id > b.id) {
            return 1;
        }
        if (a.id < b.id) {
            return -1;
        }
        return 0;
    }

    async function deleteHandler(id) {
        const fetchUrl = getBackendUrl() + `/user/${id}`;

        const token = getAuthToken();

        const response = await fetch(fetchUrl, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        if (!response.ok) {
            toast.error("Nie udało się usunąć użytkownika.");
        } else {
            toast.success("Użytkownik został usunięty.");
            setData((prev) => {
                return prev.filter((user) => user.id !== id);
            });
            setSearchedList((prev) => {
                return prev.filter((user) => user.id !== id);
            });
        }
    }
    function searchList(term) {
        setSearchedList(
            data.filter((user) =>
                Object.values(user).some((val) =>
                    String(val).toLowerCase().includes(term.toLowerCase())
                )
            )
        );
    }

    console.log("searched list");
    console.log(searchedList);

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
                        <td>Imię</td>
                        <td>Nazwisko</td>
                        <td>Mail</td>
                        <td>Lokacja</td>
                        <td>Konto bankowe</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {searchedList &&
                        searchedList.map((user, index) => {
                            return (
                                <tr key={index} className={classes.body}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.mail}</td>
                                    <td>{user.location}</td>
                                    <td>{user.bankAccountNumber}</td>
                                    <td>
                                        <button
                                            className={classes.button}
                                            onClick={() =>
                                                deleteHandler(user.id)
                                            }
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
