import * as Yup from "yup";
import { useFormik } from "formik";
import classes from "./UserInfo.module.css";
import { getBackendUrl } from "../../util/localUrlGeneration.js";
import { getAuthToken } from "../auth/auth.js";
import { toast } from "react-toastify";

export default function ChangeAccountNumber(info) {
    const validationSchemaAccount = Yup.object().shape({
        account: Yup.string()
            .matches(/^[0-9]+$/, "Numer Konta musi być liczbą")
            .notOneOf(
                [info.oldNumber],
                "Numer konta nie może być taki sam jak poprzedni"
            )
            .length(26, "Numer konta musi mieć 26 znaków")
            .required(""),
        confirmedAccount: Yup.string()
            .oneOf([Yup.ref("account")], "Numery konta muszą być takie same")
            .required(""),
    });

    const formikAccount = useFormik({
        initialValues: {
            account: "",
            confirmedAccount: "",
        },
        onSubmit: (values) => sendRequest(values),
        validateOnChange: true,
        validationSchema: validationSchemaAccount,
    });

    async function sendRequest(values) {
        const requestData = {
            bankAccountNumber: values.account,
        };

        const response = await fetch(
            getBackendUrl() + "/user/editBankAccountNumber",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + getAuthToken(),
                },
                body: JSON.stringify(requestData),
            }
        );

        if (!response.ok) {
            toast.error("Zmiana numeru konta nieudana!");
        } else {
            toast.success("Zmieniono numer konta");
            formikAccount.resetForm();
        }
    }

    return (
        <form onSubmit={formikAccount.handleSubmit} className={classes.email}>
            <h2>Zmień nr konta</h2>

            <input
                id="account"
                name="account"
                type="string"
                placeholder="Nowy numer konta"
                className={classes.editInput}
                onChange={formikAccount.handleChange}
                onBlurCapture={formikAccount.handleBlur}
            />

            {formikAccount.errors.account && formikAccount.touched.account && (
                <div className={classes.errorInput}>
                    {formikAccount.errors.account}
                </div>
            )}

            <input
                id="confirmedAccount"
                name="confirmedAccount"
                placeholder={"Powtórz nowy numer konta"}
                className={classes.editInput}
                onChange={formikAccount.handleChange}
                onBlurCapture={formikAccount.handleBlur}
            />

            {formikAccount.errors.confirmedAccount &&
                formikAccount.touched.confirmedAccount && (
                    <div className={classes.errorInput}>
                        {formikAccount.errors.confirmedAccount}
                    </div>
                )}

            <button
                disabled={!(formikAccount.isValid && formikAccount.dirty)}
                type="submit"
                className={classes.button}
            >
                Zmień numer konta
            </button>
        </form>
    );
}
