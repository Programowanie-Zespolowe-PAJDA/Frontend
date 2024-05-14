export default function Comments({ commentList }) {
    return (
        <ol>
            {commentList &&
                commentList.map((comment, index) => (
                    <li key={index}>
                        <h4>{comment.clientName}</h4>
                        <p>{comment.comment}</p>
                    </li>
                ))}
        </ol>
    );
}
