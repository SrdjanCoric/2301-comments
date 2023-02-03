import { useEffect, useState } from "react";
import commentServices from "../services/comment";
import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";
import useAsync from "../hooks/useAsync";

const App = () => {
  const [comments, setComments] = useState([]);
  const { isLoading, isError, data } = useAsync(
    "https://jsonplaceholder.typicode.com/users"
  );

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
      {isError ? <h1>ERROR...</h1> : null}
      {isLoading ? <h1>LOADING...</h1> : null}
      <ul>
        {data.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
      <Comments comments={comments} setComments={setComments} />
      <AddCommentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
