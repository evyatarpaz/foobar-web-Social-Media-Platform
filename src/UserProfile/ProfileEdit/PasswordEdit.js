import { useState } from "react";
import { serverURL, passwordStrength, passwordMatch } from "../../userService";
import { useNavigate } from 'react-router-dom';

function PasswordEdit({ currentUser }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handlePasswordChange = async () => {
    if (!password || !confirmPassword) {
      return;
    }
    const token = sessionStorage.getItem("jwt");

    const isPasswordIsStrong = passwordStrength(password);
    const isPasswordMatch = passwordMatch(password, confirmPassword);

    if (!isPasswordIsStrong) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and 8 characters."
      );
      return;
    }

    if (!isPasswordMatch) {
      setError("Password does not match.");
      return;
    }
    const newPassword = { password: password };
    const res = await fetch(serverURL + `/api/users/${currentUser.username}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPassword),
    });
    if (res.status === 401) {
      window.alert("There was a problem with your account,please login again");
      sessionStorage.clear();
      navigate("/");
      return;
    }
    if (res.ok) {
      setError("Password changed successfully");
    } else {
      setError("Unable to change password, please try again");
    }
  };

  return (
    <div
      className="modal fade"
      id="passwordEditModal"
      tabindex="-1"
      aria-labelledby="passwordEditModal"
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
            <form id="textBoxPost">
              <label className="form-label">New password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label">Confirm new password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-control"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <div className="error-message">{error}</div>}
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
              onClick={handlePasswordChange}
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
export default PasswordEdit;
