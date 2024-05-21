import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuthToken } from "../auth/auth";
import { getBackendUrl } from "../../util/localUrlGeneration";

const validationSchemaPassword = Yup.object().shape({
    oldPassword: Yup.string().required(),
    password: Yup.string()
        .min(8, "min")
        .max(30, "max")
        .matches(/[a-z]/, "lower")
        .matches(/[A-Z]/, "upper")
        .matches(/[0-9]/, "number")
        .matches(/[!@#$%^&*]/, "special")
        .notOneOf([Yup.ref("oldPassword")], "oldSame"),
    retypedPassword: Yup.string()
        .required("required")
        .oneOf([Yup.ref("password")], "match"),
});

export default function ChangeEmail() {
    const mailFormik = useFormik({
        initialValues: {
            mail: "",
            retypedMail: "",
        },
        onSubmit: (values) => sendChange(values),
        // validateOnChange: true,
        // validateOnMount: true,
        // validate: (values) => {
        //     try {
        //         validationSchemaPassword.validateSync(values, {
        //             abortEarly: false,
        //         });
        //         return {};
        //     } catch (error) {
        //         return error.errors;
        //     }
        // },
    });

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

        mailFormik.resetForm();
    }

    return (
        <form onSubmit={mailFormik.handleSubmit}>
            <input
                id="mail"
                name="mail"
                type="mail"
                placeholder="nowy email"
                value={mailFormik.values.mail}
                onChange={mailFormik.handleChange}
                onBlurCapture={mailFormik.handleBlur}
            />
            <input
                id="retypedMail"
                name="retypedMail"
                type="mail"
                placeholder="powtórz nowy mail"
                value={mailFormik.values.retypedMail}
                onChange={mailFormik.handleChange}
                onBlurCapture={mailFormik.handleBlur}
            />
            <button type="submit">Wyślij</button>
        </form>
    );
}
