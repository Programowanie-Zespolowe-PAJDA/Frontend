import { useState, useEffect } from "react";
import "./List.css";

const EXAMPLE_DATA = [
    {
        id: 1,
        name: "Adam",
        surname: "Zielinski",
        mail: "adamz@mat.umk.pl",
        location: "UMK",
    },
    {
        id: 2,
        name: "Luke",
        surname: "Skywalker",
        mail: "Loocasss@jedi.tt",
        location: "Tatoine",
    },
    {
        id: 3,
        name: "Stephen",
        surname: "Hawking",
        mail: "Stefcio@wp.pl",
        location: "Island",
    },
];

export default function UserList() {
    const [userList, setUserList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    function formatTime(date) {
        const dateObject = new Date(date);
        return `
			${dateObject.getFullYear()}/${
                dateObject.getMonth() + 1
            }/${dateObject.getDate()} ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
    }

    useEffect(() => {
        async function fetchText() {
            setIsFetching(true);
            try {
                // TO-DO: Podmienić gdy będzie logowanie
                // const response = await getUsers();
                const response = EXAMPLE_DATA;
                setUserList(response);
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
            {!isFetching && (
                <>
                    <table className="table">
                        <thead>
                            <tr className="list-head">
                                <td>ID</td>
                                <td>Name</td>
                                <td>Surname</td>
                                <td>Mail</td>
                                <td>Location</td>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user, index) => {
                                return (
                                    <tr key={index} className="list-data">
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.surname}</td>
                                        <td>{user.mail}</td>
                                        <td>{user.location}</td>
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
