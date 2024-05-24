import UserRating from "./UserRating";
import classes from "./UserPanel.module.css";

export default function Comments({ commentList }) {
    return (
        <ol>
            {commentList &&
                commentList.map((comment, index) => (
                    <li key={index} className={classes.comment}>
                        <h4 className={classes.commentTitle}>
                            {comment.clientName}
                        </h4>
                        <p>{`${comment.amount / 100} ${comment.currency}`}</p>
                        <div className={classes.rating}>
                            <UserRating rating={comment.rating} />
                        </div>
                        <p className={classes.commentText}>{comment.comment}</p>
                    </li>
                ))}
        </ol>
    );
}
