import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../PostFeed/Navbar/Navbar";
import "./UserProfile.css";
import { serverURL } from "../userService";
import { useEffect, useState } from "react";
import Post from "../PostFeed/Post/Post";
import FriendList from "./Friend/FriendList";
import SideMenu from "../PostFeed/SideMenu/SideMenu";
import FriendRequest from "./Friend/FriendRequestList";
import ImageEdit from "./ProfileEdit/ImageEdit";
import DisplayNameEdit from "./ProfileEdit/DisplayNameEdit";
import PasswordEdit from "./ProfileEdit/PasswordEdit";
import UserDelete from "./ProfileEdit/UserDelete";

function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userString } = location.state;
  const [userPosts, setUserPosts] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [areFriends, setAreFriends] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [profileUser, setProfileUser] = useState(JSON.parse(userString));
  const [isDarkMode, setIsDarkMode] = useState("light");
  const [isChecked, setIsChecked] = useState(false);

  const { username } = useParams();
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  useEffect(() => {
    checkIfCurrentUserProfile();
    const currentUserIsFriend = getFriends();
    if (currentUserIsFriend || profileUser.username === currentUser.username) {
      getUserPosts();
    }
  }, [username, location]);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setIsDarkMode("dark");
    } else {
      setIsDarkMode("light");
    }
  };

  const getUserPosts = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(
      serverURL + `/api/users/${profileUser.username}/posts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const posts = await res.json();
    setUserPosts(posts);
  };

  const getFriends = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(
      serverURL + `/api/users/${profileUser.username}/friends`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 401) {
      window.alert("There was a problem with your account,please login again");
      sessionStorage.clear();
      navigate("/");
      return;
    }
    if (res.status === 409) {
      setAreFriends(false);
      return false;
    } else {
      const friends = await res.json();
      setFriendList(friends);
      setAreFriends(true);
      return true;
    }
  };

  const handleFriendAdd = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(
      serverURL + `/api/users/${profileUser.username}/friends`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 401) {
      window.alert("There was a problem with your account,please login again");
      sessionStorage.clear();
      navigate("/");
      return;
    }
  };

  const ifNoPosts = () => {
    if (areFriends && userPosts.length === 0) {
      return <h2>No posts yet</h2>;
    }
  };

  const checkIfCurrentUserProfile = () => {
    if (currentUser.username === profileUser.username) {
      setIsCurrentUser(true);
      setProfileUser(currentUser);
    } else {
      setIsCurrentUser(false);
    }
  };

  return (
    <body data-bs-theme={isDarkMode}>
      <ImageEdit currentUser={currentUser}></ImageEdit>
      <DisplayNameEdit currentUser={currentUser}></DisplayNameEdit>
      <PasswordEdit currentUser={currentUser}></PasswordEdit>
      <UserDelete currentUser={currentUser}></UserDelete>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <SideMenu currentUsr={currentUser} />
          </div>
          <div className="col-6">
            <div
              className="container d-flex align-items-center"
              id="nameAndPicContainer"
            >
              <div className="imageContainer">
                <img
                  alt=""
                  src={profileUser.profilePic}
                  className="round-image"
                />
                {isCurrentUser && (
                  <button
                    type="button"
                    className="btn btn-primary edit-profile-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#profilePicEditModal"
                    id="editPicButton"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                )}
              </div>

              <h5 className="ms-2 pb-4" id="profile-display-name">
                {profileUser.displayName}
              </h5>

              {isCurrentUser && (
                <div className="dropdown text-center">
                  <button
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Edit Profile
                  </button>
                  <ul className="dropdown-menu" id="editDropdown">
                    <li>
                      <button
                        type="button"
                        className="btn"
                        id="editProfileBtn"
                        data-bs-toggle="modal"
                        data-bs-target="#displayNameEditModal"
                      >
                        <i className="bi bi-pencil me-2"></i>Edit display name
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn"
                        id="editProfileBtn"
                        data-bs-toggle="modal"
                        data-bs-target="#passwordEditModal"
                      >
                        <i className="bi bi-lock me-2"></i>Edit password
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn"
                        id="editProfileBtn"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteUserModal"
                      >
                        <i className="bi bi-trash me-2"></i>Delete User
                      </button>
                    </li>
                  </ul>
                </div>
              )}

              {!areFriends && (
                <button className="btn btn-light" onClick={handleFriendAdd}>
                  <i className="bi bi-person-add me-2"></i>Add Friend
                </button>
              )}
            </div>
            {areFriends &&
              userPosts.map((post) => <Post post={post} key={post._id} />)}

            {ifNoPosts()}
          </div>

          <div className="col-3" id="friendsCol">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="switch"
                checked={isChecked}
                onChange={handleSwitchChange}
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                Dark Mode
              </label>
            </div>
            {isCurrentUser && (
              <FriendRequest
                username={profileUser.username}
                key={profileUser.username}
              />
            )}
            {areFriends && (
              <FriendList friendList={friendList} profileUser={profileUser} />
            )}
          </div>
        </div>
      </div>
    </body>
  );
}
export default UserProfile;
