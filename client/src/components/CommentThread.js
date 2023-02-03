import commentServices from "../services/comment";
import Comment from "./Comment";
import useAsync from "../hooks/useAsync";

const CommentThread = ({ comment, setComments, comments }) => {
  const { isLoading, isError, data } = useAsync(
    "https://jsonplaceholder.typicode.com/todos"
  );
  const handleMoreReplies = async (e) => {
    e.preventDefault();
    const data = await commentServices.getReplies(comment.id);
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
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentThread;
