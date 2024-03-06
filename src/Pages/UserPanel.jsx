import Comments from "../components/UserPanel/Comments";
import TipChart from "../components/UserPanel/TipChart";
import TipInfo from "../components/UserPanel/TipInfo";
import UserRating from "../components/UserPanel/UserRating";
import classes from "./UserPanel.module.css";

import happyPersonImg from "/happy-person.png";

const EXAMPLE_COMMENTS = [
    {
        user: "Agnieszka",
        comment: "Bardzo dobre",
    },
    {
        user: "Adam",
        comment: "Podoba mi sie bardzo to jedzonko",
    },
    {
        user: "Ewa",
        comment: "Skibidi toilet",
    },
];

export default function UserPanelPage() {
    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <div className={classes.headerLine}>
                    <h1>Panel</h1>
                    <hr />
                </div>
                <div className={classes.headerLine}>
                    <h1>Napiwków</h1>
                    <hr />
                </div>
            </header>
            <section className={classes.earnings}>
                <ol>
                    <TipInfo
                        value="208"
                        message="Zarobki w tym miesiącu"
                        currency="PLN"
                    />
                    <TipInfo
                        value="35"
                        message="Najwyższy napiwek"
                        currency="PLN"
                    />
                    <TipInfo value="721" message="Ilość wpłaconych napiwków" />
                </ol>
                <img src={happyPersonImg} alt="happy-person" />
            </section>
            <section className={classes.rating}>
                <h2>Opinia publiczna</h2>
                <UserRating rating={4} />
            </section>
            <section className={classes.comments}>
                <h2>Wykres przychodów z napiwków</h2>
                <TipChart />
            </section>
            <section className={classes.comments}>
                <h2>Komentarze</h2>
                <Comments commentList={EXAMPLE_COMMENTS} />
            </section>
        </div>
    );
}
