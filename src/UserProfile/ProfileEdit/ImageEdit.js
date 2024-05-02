import { useState } from "react";
import { serverURL } from "../../userService";
import { useNavigate } from "react-router-dom";

function ImageEdit({ currentUser }) {
  const [profileImage, setImage] = useState(currentUser.profilePic);
  const [setError] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setImage("");
      return;
    }
    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      // Clear the error message after 3 seconds
      setTimeout(() => setError(""), 3_000);
      // Clear the file input
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage("data:image/jpeg;base64," + reader.result.split(",")[1]);
    };

    reader.readAsDataURL(file);
  };

  const handlePictureEdit = async () => {
    const token = sessionStorage.getItem("jwt");
    const newPic = { profilePic: profileImage };
    const res = await fetch(serverURL + `/api/users/${currentUser.username}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPic),
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
    currentUserFromStorage.profilePic = profileImage;
    sessionStorage.setItem(
      "currentUser",
      JSON.stringify(currentUserFromStorage)
    );
    window.location.reload();
  };
  return (
    <div
      className="modal fade"
      id="profilePicEditModal"
      tabindex="-1"
      aria-labelledby="profilePicEditModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Change your profile picture</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <label htmlFor="fileInput" className="imageUpLabel">
                <h4>New profile picture</h4>
              </label>
              <input
                type="file"
                id="imageAdd"
                name="image"
                className="input"
                required
                onChange={handleImageUpload}
              />
            </div>

            <img alt="" src={profileImage} className="round-image" />
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
              onClick={handlePictureEdit}
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
export default ImageEdit;
