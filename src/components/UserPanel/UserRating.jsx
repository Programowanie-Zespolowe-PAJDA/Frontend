import classes from "../../Pages/UserPanel.module.css";

export default function UserRating({ rating }) {
    console.log("gwiazdki");
    console.log(rating);

    return (
        <ol>
            {[...Array(10)].map((a, index) => {
                const ratingStar = index + 1;
                return (
                    <li key={ratingStar}>
                        <img
                            src={
                                rating >= ratingStar
                                    ? "/star-half.png"
                                    : "/star-empty-half.png"
                            }
                            className={
                                ratingStar % 2 === 0
                                    ? classes.mirror
                                    : undefined
                            }
                        />
                    </li>
                );
            })}
        </ol>
    );
}
