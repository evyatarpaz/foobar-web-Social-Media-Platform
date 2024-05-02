import Comment from "../Comment/Comment.js";

function CommentList({ post, commentList }) {
  return commentList.map((comment) => (
    <Comment key={comment._id} comment={comment} post={post} />
  ));
}
export default CommentList;
