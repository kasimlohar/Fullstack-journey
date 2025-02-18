import { useState } from "react"
import "./Comment.css"
import CommentsForm from "./CommentsForm"

export default function Comment() {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    const addNewComment = (comment) => {
        try {
            setComments(curr => [...curr, {
                ...comment,
                id: Date.now(),
                timestamp: new Date().toLocaleString()
            }]);
        } catch (err) {
            setError("Failed to add comment");
        }
    };

    return (
        <div className="comments-container">
            {error && <div className="error-message">{error}</div>}
            <div className="comments-list">
                <h3>All Comments ({comments.length})</h3>
                {comments.length === 0 ? (
                    <p>No comments yet. Be the first to comment!</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <span>{comment.remarks}</span>
                            &nbsp;
                            <span>(rating = {comment.rating})</span>
                            <p>- {comment.username}</p>
                        </div>
                    ))
                )}
            </div>
            <hr />
            <CommentsForm addNewComment={addNewComment} />
        </div>
    );
}