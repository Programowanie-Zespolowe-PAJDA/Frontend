export default function Comments({ commentList }) {
    console.log("commentList");
    console.log(commentList);

    return (
        <ol>
            {commentList &&
                commentList.map((comment, index) => (
                    <li key={index}>
                        <h3>{comment.user}</h3>
                        <p>{comment.comment}</p>
                    </li>
                ))}
        </ol>
    );
}
