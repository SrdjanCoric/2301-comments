import { useEffect, useState } from "react";
import { getComments, createComment } from "../services/comment";
import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments();
      setComments(data);
    };
    fetchComments();
  }, []);

  const handleSubmit = async (newComment, callback) => {
    const data = await createComment(newComment);
    setComments(comments.concat(data));
    if (callback) {
      callback();
    }
  };

  return (
    <div>
      <Comments comments={comments} setComments={setComments} />
      <AddCommentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
