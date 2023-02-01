import CommentThread from "./CommentThread";

const Comments = ({ comments, setComments }) => {
  return (
    <div className="comments">
      <h2>Comments (2)</h2>
      {comments.map((comment) => {
        return (
          <CommentThread
            key={comment.id}
            comment={comment}
            comments={comments}
            setComments={setComments}
          />
        );
      })}
    </div>
  );
};

export default Comments;
