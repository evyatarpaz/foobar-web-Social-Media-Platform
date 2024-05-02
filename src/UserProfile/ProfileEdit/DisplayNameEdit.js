import { useState } from "react";
import { serverURL } from "../../userService";
import { useNavigate } from "react-router-dom";

function DisplayNameEdit({ currentUser }) {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const handleChange = (event) => {
    const value = event.target.value;
    setDisplayName(value);
  };

  const handleDisplayNameEdit = async () => {
    const token = sessionStorage.getItem("jwt");
    const newDisplayName = { displayName: displayName };
    const res = await fetch(serverURL + `/api/users/${currentUser.username}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDisplayName),
    });
    if (res.status === 401) {
      window.alert("There was a problem with your account,please login again");
      sessionStorage.clear();
      navigate("/");
      return;
    }
    const currentUserFromStorage = JSON.parse(
      sessionStorage.getItem("currentUser")
    );
    currentUserFromStorage.displayName = displayName;
    sessionStorage.setItem(
      "currentUser",
      JSON.stringify(currentUserFromStorage)
    );
    window.location.reload();
  };
  return (
    <div
      className="modal fade"
      id="displayNameEditModal"
      tabindex="-1"
      aria-labelledby="displayNameEditModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Change your display name</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <label className="form-label">New display name</label>
            <form id="textBoxPost">
              <input
                className="form-control"
                name="displayNameChange"
                value={displayName}
                onChange={handleChange}
              ></input>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleDisplayNameEdit}
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DisplayNameEdit;
