import UserRating from "./UserRating";
import classes from "./UserPanel.module.css";

export default function Comments({ commentList }) {
    return (
        <ol className={classes.comments}>
            {commentList &&
                commentList.map((comment, index) => (
                    <li key={index} className={classes.comment}>
                        <h4 className={classes.commentTitle}>
                            {comment.clientName}
                        </h4>
                        <div className={classes.ratingComment}>
                            <UserRating rating={comment.rating} />
                        </div>
                        <p className={classes.commentText}>{comment.comment}</p>
                    </li>
                ))}
        </ol>
    );
}
