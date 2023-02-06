import { getReplies } from "../services/comment";
import Comment from "./Comment";

const CommentThread = ({ comment, setComments, comments }) => {
  const handleMoreReplies = async (e) => {
    e.preventDefault();
    const data = await getReplies(comment.id);
    setComments(
      comments.map((currentComment) => {
        if (currentComment.id === comment.id) {
          return {
            ...currentComment,
            replies: currentComment.replies.concat(data),
          };
        } else {
          return currentComment;
        }
      })
    );
  };
  return (
    <div className="parent-comment">
      <Comment {...comment} />
      <div className="replies">
        {comment.replies.map((reply) => {
          return <Comment key={reply.id} {...reply} />;
        })}
        {comment.replies.length === comment.replies_count ? null : (
          <a href="#" className="show_more" onClick={handleMoreReplies}>
            Show More Replies ({comment.replies_count - 1})
          </a>
        )}
      </div>
    </div>
  );
};

export default CommentThread;
