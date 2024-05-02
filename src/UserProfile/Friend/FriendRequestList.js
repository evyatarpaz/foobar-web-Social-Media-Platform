import { useState, useEffect } from "react";
import { serverURL } from "../../userService";
import FriendReqItem from "./FriendReqItem";
import "./FriendList.css";
import { useNavigate } from "react-router-dom";

function FriendRequest({ username }) {
  const navigate = useNavigate();
  const [friendReqList, setFriendReqList] = useState([]);

  useEffect(() => {
    getFriendRequests();
  }, []);

  const getFriendRequests = async () => {
    const token = sessionStorage.getItem("jwt");
    const res = await fetch(
      serverURL + `/api/users/${username}/friendsRequest`,
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
    const requestsUsernameList = await res.text();
    setFriendReqList(JSON.parse(requestsUsernameList));
  };

  const listOfFriendRequests = friendReqList.map((friend) => {
    return <FriendReqItem friend={friend} />;
  });

  return listOfFriendRequests.length === 0 ? (
    <div className="FriendReqList">
      <h2>Friend Requests</h2>
      <h3>No Friend Requests</h3>
    </div>
  ) : (
    <div className="FriendReqList">
      <h2>Friend Requests</h2>
      <div>{listOfFriendRequests}</div>
    </div>
  );
}

export default FriendRequest;
