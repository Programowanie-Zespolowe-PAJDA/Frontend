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

export default function UserList({ data }) {
    function formatTime(date) {
        const dateObject = new Date(date);
        return `
			${dateObject.getFullYear()}/${
                dateObject.getMonth() + 1
            }/${dateObject.getDate()} ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
    }

    return (
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
                    {data &&
                        data.map((user, index) => {
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
    );
}
