import classes from "./UserInfo.module.css";
import DataBox from "./DataBox";
import PasswordBox from "./PasswordBox";
import QRBox from "./QRBox";
import ChangeEmail from "./ChangeEmail";
import ChangeAccountNumber from "./ChangeAccountNumber.jsx";
import { useState } from "react";

export default function UserInfo({ info }) {
    const [stateInfo, setStateInfo] = useState(info);

    return (
        <section className={classes.container}>
            <DataBox info={stateInfo} />
            <PasswordBox />
            <QRBox id={info.id} />
            <ChangeEmail oldEmail={info.mail} />
            <ChangeAccountNumber oldNumber={info.bankAccountNumber} />
        </section>
    );
}
