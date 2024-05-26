import { toast } from "react-toastify";
import { getBackendUrl } from "../../util/localUrlGeneration";
import { getAuthToken } from "../auth/auth";
import classes from "./List.module.css";

export default function UserList({ data }) {
    console.log(data);

    async function deleteHandler(id) {
        console.log("usuwam");
        console.log(id);
        const fetchUrl = getBackendUrl() + `/user/${id}`;

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
            toast.error("Nie udało się usunąć użytkownika.");
        } else {
            toast.success("Użytkownik został usunięty.");
        }
    }

    return (
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
                {data &&
                    data.map((user, index) => {
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
                                        onClick={() => deleteHandler(user.id)}
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
    );
}
