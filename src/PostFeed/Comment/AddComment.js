import "./AddComment.css";
import { useState } from "react";
import { serverURL } from "../../userService";
import { useNavigate } from "react-router-dom";

function AddComment({ post, setOpenWriteComment }) {
  const [commentInput, setCommentInput] = useState("");
  const username = sessionStorage.getItem("username");
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (commentInput === "") {
      return;
    }
    const token = sessionStorage.getItem("jwt");
    const newComment = {
      content: commentInput,
    };
    const res = await fetch(
      serverURL + `/api/users/${username}/posts/${post._id}/comment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      }
    );
    if (res.status === 401) {
      window.alert("There was a problem with your account,please login again");
      sessionStorage.clear();
      navigate("/");
      return;
    }
    setCommentInput("");
    setOpenWriteComment(false);
    window.location.reload();
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setCommentInput(value);
  };

  return (
    <div className="card bg-light" id="addCommentCard">
      <span>
        <img
          className="rounded-circle"
          alt=""
          src={currentUser.profilePic}
          id="roundImg"
        />
        <form>
          <input
            name="commentContent"
            value={commentInput}
            onChange={handleChange}
            placeholder="Comment on post..."
            id="commentInput"
          ></input>
          <button
            id="commentPublishButton"
            className="btn btn-outline-success"
            type="button"
            onClick={handleSubmit}
          >
            publish
          </button>
        </form>
      </span>
    </div>
  );
}
export default AddComment;
