import "./Comment.css";
import "../Post/Post";
import { useState, useEffect } from "react";
import { serverURL } from "../../userService";
import { useNavigate } from "react-router-dom";

function Comment({ comment, post }) {
  const navigate = useNavigate();
  const currentUsername = sessionStorage.getItem("username");
  const [canEdit, setCanEdit] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [commentInput, setCommentInput] = useState(comment.content);
  const [commentUser, setCommentUser] = useState(null);

  const jsDate = new Date(comment.date);
  const formattedDate =
    jsDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) +
    " " +
    jsDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    getCommentUser();
    editEligble();
  }, []);

  const getCommentUser = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(serverURL + `/api/users/${comment.username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const userFromServer = await res.json();
    setCommentUser(userFromServer);
  };

  const deleteComment = async () => {
    const token = sessionStorage.getItem("jwt");
    const commentId = { commentId: comment._id };
    const res = await fetch(
      serverURL + `/api/users/${comment.username}/posts/${post._id}/comment`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentId),
      }
    );
    window.location.reload();
  };

  const editEligble = () => {
    if (currentUsername === comment.username) {
      return setCanEdit(true);
    }
    return setCanEdit(false);
  };

  const handleCommentEdit = async () => {
    if (commentInput === "") {
      return;
    }
    const token = sessionStorage.getItem("jwt");
    const commentEdit = { commentId: comment._id, content: commentInput };
    const res = await fetch(
      serverURL + `/api/users/${comment.username}/posts/${post._id}/comment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentEdit),
      }
    );
    if (res.status === 401) {
      window.alert("There was a problem with your account,please login again");
      sessionStorage.clear();
      navigate("/");
      return;
    }
    window.location.reload();
    setShowEdit(false);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setCommentInput(value);
  };

  return commentUser ? (
    <div className="card text-bg-light" id="commentCard">
      <div className="container">
        {canEdit && (
          <div class="btn-group" id="editOptions">
            <button
              class="btn btn-success btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Comments Options
            </button>
            <ul class="dropdown-menu text-center">
              <li>
                <button class="dropdown-item" onClick={deleteComment}>
                  Delete Comment
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setShowEdit(true)}
                >
                  Edit Comment
                </button>
              </li>
            </ul>
          </div>
        )}

        <div className="d-flex" id="commentBody">
          <img
            id="commentImage"
            className="rounded-circle"
            alt="avatar1"
            src={commentUser.profilePic}
          />
          <div className="fs-4 ms-2">
            {commentUser.displayName}
            <p className="fs-7 ">{formattedDate}</p>
          </div>
        </div>

        {!showEdit && (
          <span className="container-fluid fs-4">{comment.content}</span>
        )}
        {showEdit && (
          <span className="container-fluid fs-4">
            <form onSubmit={handleCommentEdit}>
              <input
                name="commentContent"
                id="commentEditInput"
                value={commentInput}
                onChange={handleChange}
              ></input>
              <button
                className="btn btn-success"
                type="submit"
                id="commentEditConfirm"
              >
                Confirm
              </button>
              <button
                className="btn btn-outline-secondary"
                id="commentEditCancelButton"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>
            </form>
          </span>
        )}

        <div className="ms-2 pt-2"></div>
      </div>
    </div>
  ) : (
    <p>Loading comment...</p>
  );
}
export default Comment;
