import classes from "./ReviewAdd.module.css";
import { Form } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const TIPS_AMOUNT = [5, 10, 20, 30, 40];

const validationSchemaReview = Yup.object().shape({
    tip: Yup.string()
        .required("Ilość jest wymagana")
        .matches(/^\d+(\.\d{1,2})?$/, "Zły format!"),
    rating: Yup.string()
        .required("Ocena jest wymagana")
        .max(10, "Za duża ocena, jak ty to zrobiłeś?!"),
    clientName: Yup.string().max(30, "Za długa nazwa, max 30 znaków"),
    comment: Yup.string().max(1500, "Za długi opis, max 1500 znaków"),
});

export default function Review({ userData }) {
    const reviewFormik = useFormik({
        initialValues: {
            tip: "",
            rating: "",
            clientName: "",
            comment: "",
        },
        validateOnChange: true,
        validateOnMount: true,
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
                    {reviewFormik.errors.tip && (
                        <div>{reviewFormik.errors.tip}</div>
                    )}
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
                    {reviewFormik.errors.rating && (
                        <div>{reviewFormik.errors.rating}</div>
                    )}
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
                        onChange={reviewFormik.handleChange}
                        onBlurCapture={reviewFormik.handleBlur}
                    />
                </section>

                <section className={classes.comment}>
                    {reviewFormik.errors.clientName && (
                        <div>{reviewFormik.errors.clientName}</div>
                    )}
                    <input
                        id="clientName"
                        name="clientName"
                        placeholder="Twoje imię"
                        value={reviewFormik.values.clientName}
                        onChange={reviewFormik.handleChange}
                        onBlurCapture={reviewFormik.handleBlur}
                    />
                    {reviewFormik.errors.comment && (
                        <div>{reviewFormik.errors.comment}</div>
                    )}
                    <textarea
                        id="comment"
                        name="comment"
                        placeholder="Komentarz"
                        value={reviewFormik.values.comment}
                        onChange={reviewFormik.handleChange}
                        onBlurCapture={reviewFormik.handleBlur}
                    />
                </section>

                <section className={classes.send}>
                    <button
                        disabled={!(reviewFormik.isValid && reviewFormik.dirty)}
                        type="submit"
                    >
                        Prześlij napiwek
                    </button>
                </section>
            </Form>
        </div>
    );
}
