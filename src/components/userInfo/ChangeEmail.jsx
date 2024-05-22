import { useFormik } from "formik";
import * as Yup from "yup";
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

    console.log(mailFormik);

    async function sendChange(values) {
        console.log("zmieniam");
        console.log(values);

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

        console.log(response);

        if (!response.ok) {
            throw new Error("Nie udało się zmienić maila");
        }

        toast.success(
            "Należy teraz potwierdzić nowy mail, aby został zmieniony."
        );
        mailFormik.resetForm();
    }

    return (
        <form onSubmit={mailFormik.handleSubmit}>
            {mailFormik.errors.mail && mailFormik.touched.mail && (
                <div>{mailFormik.errors.mail}</div>
            )}
            <input
                id="mail"
                name="mail"
                type="mail"
                placeholder="nowy email"
                value={mailFormik.values.mail}
                onChange={mailFormik.handleChange}
                onBlurCapture={mailFormik.handleBlur}
            />
            {mailFormik.errors.retypedMail &&
                mailFormik.touched.retypedMail && (
                    <div>{mailFormik.errors.retypedMail}</div>
                )}
            <input
                id="retypedMail"
                name="retypedMail"
                type="mail"
                placeholder="powtórz nowy mail"
                value={mailFormik.values.retypedMail}
                onChange={mailFormik.handleChange}
                onBlurCapture={mailFormik.handleBlur}
            />
            <button
                disabled={!(mailFormik.isValid && mailFormik.dirty)}
                type="submit"
            >
                Wyślij
            </button>
        </form>
    );
}
