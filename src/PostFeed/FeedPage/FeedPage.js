import Post from "../Post/Post";
import SideMenu from "../SideMenu/SideMenu";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import WritePost from "../Post/WritePost";
import { serverURL } from "../../userService";
import FriendRequest from "../../UserProfile/Friend/FriendRequestList";
import FriendList from "../../UserProfile/Friend/FriendList";
import { Modal } from "bootstrap";

function FeedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [friendList, setFriendList] = useState([]);
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    if (location.pathname === "/FeedPage") {
      getCurrentUser();
      getFriends();
      getPosts();
    }
  }, [location]);

  const getFriends = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(serverURL + `/api/users/${username}/friends`, {
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
    const friends = await res.json();
    setFriendList(friends);
  };

  const [postList, setPostList] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState("light");
  const [isChecked, setIsChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setIsDarkMode("dark");
    } else {
      setIsDarkMode("light");
    }
  };

  const getPosts = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(serverURL + "/api/posts", {
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
    const posts = await res.json();
    setPostList(posts);
  };

  const getCurrentUser = async () => {
    const token = sessionStorage.getItem("jwt");
    const username = sessionStorage.getItem("username");
    const res = await fetch(serverURL + `/api/users/${username}`, {
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
    const currentUser = await res.json();
    const userObject = {
      username: currentUser.username,
      displayName: currentUser.displayName,
      profilePic: currentUser.profilePic,
    };
    const userString = JSON.stringify(userObject);
    sessionStorage.setItem("currentUser", userString);
    sessionStorage.setItem("username", userObject.username);
    setCurrentUser(userObject);
  };

  const listOfPosts = postList.map((post) => {
    return <Post post={post} key={post._id} />;
  });

  return (
    <body data-bs-theme={isDarkMode}>
      <Navbar />
      <div className="row ">
        <div className="col-3" id="sideCol">
          <div >
            {currentUser && <SideMenu currentUsr={currentUser} />}
          </div>
        </div>

        <div className="col-6" id="postCol">
          <WritePost currentUser={currentUser} />
          {listOfPosts}
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
            <label className="form-check-label" >
              dark Mode
            </label>
          </div>
          <FriendRequest
            username={username}
            key={username}
          />
          <FriendList friendList={friendList} profileUser={currentUser} />
        </div>
      </div>
    </body>
  );
}
export default FeedPage;
