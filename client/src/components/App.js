import { useEffect, useState } from "react";
import commentServices from "../services/comment";
import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await commentServices.getComments();
      setComments(data);
    };
    fetchComments();
  }, []);

  const handleSubmit = async (newComment, callback) => {
    const data = await commentServices.createComment(newComment);
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
