export const GET_COMMENTS_URL = "/api/comments";
export const CREATE_COMMENT_URL = "/api/comments";
export const getRepliesUrl = (commentId) =>
  `/api/comment_replies?comment_id=${commentId}`;
