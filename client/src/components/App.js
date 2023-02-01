import { useEffect, useState } from "react";
import axios from "axios";
import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get("/api/comments");
      const data = response.data;
      setComments(data);
    };
    fetchComments();
  }, []);

  const handleSubmit = async (newComment, callback) => {
    try {
      const response = await axios.post("/api/comments", { ...newComment });
      const data = response.data;
      setComments(comments.concat(data));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error("Errror");
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
