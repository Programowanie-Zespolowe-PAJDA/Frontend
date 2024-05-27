import { useFormik } from "formik";
import * as Yup from "yup";
import classes from "./UserInfo.module.css";
import { getAuthToken } from "../auth/auth";
import { getBackendUrl } from "../../util/localUrlGeneration";
import { toast } from "react-toastify";

export default function ChangeEmail({ oldEmail }) {
    const validationSchemaEmail = Yup.object().shape({
        mail: Yup.string()
            .email("Zła forma emaila")
            .notOneOf([oldEmail], "Taki sam jak stary email")
            .required(""),
        retypedMail: Yup.string()
            .oneOf([Yup.ref("mail")], "Maile nie są takie same")
            .required(""),
    });
    const mailFormik = useFormik({
        initialValues: {
            mail: "",
            retypedMail: "",
        },
        onSubmit: (values) => sendChange(values),
        validateOnChange: true,
        validationSchema: validationSchemaEmail,
    });

    async function sendChange(values) {
        const sendPackage = {
            mail: values.mail,
            retypedMail: values.retypedMail,
        };

        const token = getAuthToken();
        const fetchUrl = getBackendUrl() + "/user/editEmail";

        const response = await fetch(fetchUrl, {
            method: "PATCH",
            body: JSON.stringify(sendPackage),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            toast.error("Nie udało się zmienić maila");
        } else {
            toast.success(
                "Należy teraz potwierdzić nowy mail, aby został zmieniony."
            );
            mailFormik.resetForm();
        }
    }

    return (
        <form onSubmit={mailFormik.handleSubmit} className={classes.email}>
            <h2>Zmień email</h2>

            <input
                id="mail"
                name="mail"
                type="mail"
                placeholder="nowy email"
                className={classes.editInput}
                value={mailFormik.values.mail}
                onChange={mailFormik.handleChange}
                onBlurCapture={mailFormik.handleBlur}
            />
            {mailFormik.errors.mail && mailFormik.touched.mail && (
                <div className={classes.errorInput}>
                    {mailFormik.errors.mail}
                </div>
            )}

            <input
                id="retypedMail"
                name="retypedMail"
                type="mail"
                placeholder="powtórz nowy mail"
                className={classes.editInput}
                value={mailFormik.values.retypedMail}
                onChange={mailFormik.handleChange}
                onBlurCapture={mailFormik.handleBlur}
            />
            {mailFormik.errors.retypedMail &&
                mailFormik.touched.retypedMail && (
                    <div className={classes.errorInput}>
                        {mailFormik.errors.retypedMail}
                    </div>
                )}
            <button
                disabled={!(mailFormik.isValid && mailFormik.dirty)}
                className={classes.button}
                type="submit"
            >
                Zmień email
            </button>
        </form>
    );
}
