export default function UserRating({ rating }) {
    return (
        <>
            <ol>
                {[...Array(5)].map((a, index) => {
                    const ratingStar = index + 1;
                    return (
                        <li key={ratingStar}>
                            <img
                                src={
                                    rating >= ratingStar
                                        ? "/star.png"
                                        : "/star-empty.png"
                                }
                            />
                        </li>
                    );
                })}
            </ol>
        </>
    );
}
