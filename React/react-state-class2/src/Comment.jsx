import { useState } from "react"
import "./Comment.css"
import CommentsForm from "./CommentsForm"

export default function Comment() {
    let [comments, setComments] = useState([{
        username: "@sk",
        remarks: "great Job",
        rating: 4
    }])

    let addNewComment = (comment) => {
        setComments((currComments) => [...currComments, comment])
        console.log("added new comment")
    }
    return (
        <>
        <div>
            <h3>All Comments</h3>
            {comments.map((comment, idx) => (
            <div className="comment">
                <span>{comment.remarks}</span>
                &nbsp;
                <span>(rating = {comment.rating})</span>
                <p>- {comment.username}</p>
            </div>

            ))}
        </div>
        <hr />
        <CommentsForm addNewComment={addNewComment} />
        </>
    )
}