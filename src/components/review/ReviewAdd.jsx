import classes from "./ReviewAdd.module.css";
import { Form } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const TIPS_AMOUNT = [5, 10, 20, 30, 40];

const validationSchemaReview = Yup.object().shape({
    tip: Yup.string()
        .required()
        .matches(/^\d+(\.\d{1,2})?$/, ""),

    rating: Yup.string().min(1).max(10),
    clientName: "",
    comment: "",
});

export default function Review({ userData }) {
    const reviewFormik = useFormik({
        initialValues: {
            tip: "",
            // currency: "",
            rating: "",
            clientName: "",
            comment: "",
        },
        validateOnChange: true,
        validationSchema: validationSchemaReview,
    });

    function checkCurrency(event) {
        if (/^\d+(\.\d{0,2})?$/.test(event.target.value)) {
            reviewFormik.setFieldValue("tip", event.target.value);
        }
    }

    console.log(reviewFormik);

    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <h1>eNapiwek</h1>
                <p>Aplikacja do napiwków QR</p>
                <h3 className={classes.location}>{userData.location}</h3>
                <h3>{userData.name}</h3>
            </header>
            <Form method="post">
                <section className={classes.tip}>
                    <div className={classes.tipGrid}>
                        {TIPS_AMOUNT.map((tipValue, index) => (
                            <div
                                key={index}
                                className={`${classes.TipBg}
                                ${
                                    tipValue === reviewFormik.values.tip
                                        ? classes.selectedTipBg
                                        : ""
                                }
                                    `}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        reviewFormik.setFieldValue(
                                            "tip",
                                            tipValue
                                        )
                                    }
                                    className={`${classes.tipButton}
                                    ${
                                        tipValue === reviewFormik.values.tip
                                            ? classes.selectedTip
                                            : ""
                                    }
                                        `}
                                >
                                    {tipValue}
                                </button>
                            </div>
                        ))}
                        <input
                            id="tip"
                            type="number"
                            name="tip"
                            value={reviewFormik.values.tip}
                            onChange={checkCurrency}
                            onBlurCapture={reviewFormik.handleBlur}
                            placeholder="Podaj wartość napiwku"
                        />
                        <select id="currency" name="currency">
                            <option>PLN</option>
                            <option>EUR</option>
                            <option>USD</option>
                            <option>CHF</option>
                        </select>
                    </div>
                </section>

                <section className={classes.rating}>
                    <ol>
                        {[...Array(10)].map((a, index) => {
                            const rating = index + 1;
                            return (
                                <li key={rating}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            reviewFormik.setFieldValue(
                                                "rating",
                                                rating
                                            )
                                        }
                                    >
                                        <img
                                            alt="Rating scale"
                                            src={
                                                reviewFormik.values.rating >=
                                                rating
                                                    ? "/star-half.png"
                                                    : "/star-empty-half.png"
                                            }
                                            className={
                                                rating % 2 === 0
                                                    ? classes.mirror
                                                    : undefined
                                            }
                                        />
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                    <input
                        type="hidden"
                        id="rating"
                        name="rating"
                        value={reviewFormik.values.rating}
                    />
                </section>

                <section className={classes.comment}>
                    <input
                        id="clientName"
                        name="clientName"
                        placeholder="Twoje imię"
                    />
                    <textarea
                        id="comment"
                        name="comment"
                        placeholder="Komentarz"
                    />
                </section>

                <section className={classes.send}>
                    <button>Prześlij napiwek</button>
                </section>
            </Form>
        </div>
    );
}
