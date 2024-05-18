import classes from "./UserInfo.module.css";
import { useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { DarkModeContext } from "../DarkModeProvider";
import { getAuthToken } from "../auth/auth";
import { getBackendUrl } from "../../util/localUrlGeneration";

const validationSchemaInfo = Yup.object().shape({
    name: Yup.string()
        .required()
        .min(2)
        .max(30)
        .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ][a-zząćęłńóśźż]*$/),
    surname: Yup.string()
        .required()
        .min(2)
        .max(30)
        .matches(
            /^[A-ZĄĆĘŁŃÓŚŹŻ][a-zząćęłńóśźż]*(?:[- ]?[A-ZĄĆĘŁŃÓŚŹŻ][a-zząćęłńóśźż]*)?$/
        ),
    location: Yup.string().required(),
});

export default function DataBox({ info }) {
    const [darkMode] = useContext(DarkModeContext);
    const infoFormik = useFormik({
        initialValues: {
            name: info.name,
            surname: info.surname,
            location: info.location,
        },
        onSubmit: async (values) => sendData(values, "/user/editInformations"),
        validateOnChange: true,
        validateOnMount: true,
        validate: (values) => {
            try {
                validationSchemaInfo.validateSync(values);
                return {};
            } catch (error) {
                return error.errors;
            }
        },
    });

    async function sendData(sendPackage, endpoint) {
        const token = getAuthToken();
        const fetchUrl = getBackendUrl() + endpoint;

        const response = await fetch(fetchUrl, {
            method: "PATCH",
            body: JSON.stringify(sendPackage),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to edit data");
        }
    }

    const inputClass = `${classes.editInput} ${
        darkMode ? classes.editInputDark : ""
    }`;
    return (
        <div className={classes.data}>
            <h2>Twoje dane</h2>
            <form
                onSubmit={infoFormik.handleSubmit}
                className={classes.dataForm}
            >
                <div className={classes.dataInfo}>
                    <label htmlFor="name">Imię</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={inputClass}
                        value={infoFormik.values.name}
                        onChange={infoFormik.handleChange}
                        onBlurCapture={infoFormik.handleBlur}
                    />
                    <label htmlFor="surname">Nazwisko</label>
                    <input
                        id="surname"
                        name="surname"
                        type="text"
                        className={inputClass}
                        value={infoFormik.values.surname}
                        onChange={infoFormik.handleChange}
                        onBlurCapture={infoFormik.handleBlur}
                    />
                    <label htmlFor="location">Lokalizacja</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        className={inputClass}
                        value={infoFormik.values.location}
                        onChange={infoFormik.handleChange}
                        onBlurCapture={infoFormik.handleBlur}
                    />
                    <h4>Email</h4>
                    <p>{info.mail}</p>
                    <h4>Nr. konta</h4>
                    <p>{info.bankAccountNumber}</p>
                </div>
                <button
                    disabled={!(infoFormik.isValid && infoFormik.dirty)}
                    type="submit"
                    className={classes.button}
                >
                    Zmień dane
                </button>
            </form>
        </div>
    );
}
