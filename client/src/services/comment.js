import axios from "axios";
import * as routes from "../constants/routes";

const getComments = async () => {
  try {
    const response = await axios.get(routes.GET_COMMENTS_URL);
    return response.data;
  } catch (e) {
    console.log("Error");
  }
};

const createComment = async (newComment) => {
  try {
    const response = await axios.post(routes.CREATE_COMMENT_URL, {
      ...newComment,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const getReplies = async (commentId) => {
  try {
    const response = await axios.get(routes.getRepliesUrl(commentId));
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export default {
  getComments,
  createComment,
  getReplies,
};