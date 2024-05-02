import { serverURL } from "../../userService";
import { useNavigate } from "react-router-dom";
function UserDelete({ currentUser }) {
  const navigate = useNavigate();

  const handleUserDelete = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(serverURL + `/api/users/${currentUser.username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status === 401) {
      window.alert("There was a problem with your account,please login again");
      sessionStorage.clear();
      navigate("/");
      return;
    }
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div
      className="modal fade"
      id="deleteUserModal"
      tabindex="-1"
      aria-labelledby="deleteUserModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">
              <h2>Are you sure you want to delete your account ?</h2>
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h4>
              This action is irreversible and all your data will be lost
              forever. Think carefully before proceeding.
            </h4>
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
              className="btn btn-danger"
              onClick={handleUserDelete}
              data-bs-dismiss="modal"
            >
              Yes, Delete my account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserDelete;
