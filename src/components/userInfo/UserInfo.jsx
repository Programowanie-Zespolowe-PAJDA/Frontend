import classes from "./UserInfo.module.css";
import DataBox from "./DataBox";
import PasswordBox from "./PasswordBox";
import QRBox from "./QRBox";
import ChangeEmail from "./ChangeEmail";

export default function UserInfo({ info }) {
    return (
        <section className={classes.container}>
            <DataBox info={info} />
            <PasswordBox />
            <QRBox id={info.id} />
            <ChangeEmail />
        </section>
    );
}
