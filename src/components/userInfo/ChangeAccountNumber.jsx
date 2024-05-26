import * as Yup from "yup";
import { useFormik } from "formik";
import { getBackendUrl } from "../../util/localUrlGeneration.js";
import { getAuthToken } from "../auth/auth.js";
import { toast } from "react-toastify";

export default function ChangeAccountNumber(info) {
    const validationSchemaAccount = Yup.object().shape({
        account: Yup.string()
            .matches(/^[0-9]+$/, "Numer Konta musi być liczbą")
            .notOneOf(
                [info.bankAccountNumber],
                "Numer konta nie może być taki sam jak poprzedni"
            )
            .min(26, "Numer konta musi mieć 26 znaków")
            .max(26, "Numer konta musi mieć 26 znaków")
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
        <form onSubmit={formikAccount.handleSubmit}>
            {formikAccount.errors.account && (
                <>{formikAccount.errors.account}</>
            )}

            <input
                id="account"
                name="account"
                type="string"
                placeholder="Nowy numer konta"
                onChange={formikAccount.handleChange}
            />
            <br />

            {formikAccount.errors.confirmedAccount && (
                <>{formikAccount.errors.confirmedAccount}</>
            )}

            <input
                id="confirmedAccount"
                name="confirmedAccount"
                placeholder={"Powtórz nowy numer konta"}
                onChange={formikAccount.handleChange}
            />
            <br />
            <button
                disabled={!(formikAccount.isValid && formikAccount.dirty)}
                type="submit"
            >
                Zmień numer konta
            </button>
        </form>
    );
}
