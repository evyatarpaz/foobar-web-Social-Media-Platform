import FriendListItem from "./FriendListItem";
import './FriendList.css'
import { useState,useEffect } from "react";
function FriendList({ friendList,profileUser }) {

  useEffect(() => {
    checkIfFriendListEmpty();
  });

  const [isFriendListEmpty,setIsFriendListEmpty] = useState(true);

  const checkIfFriendListEmpty = () =>{
    if (listOfFriends.length === 0) {
      setIsFriendListEmpty(true);
    }
    else{setIsFriendListEmpty(false);}
    
  };
  
  const listOfFriends = friendList.map((friend) => {
    return <FriendListItem friend={friend} key={friend.username} profileUser={profileUser} />;
  });
  return (
    <div className="FriendList">
      <h2>Friends</h2>
      {isFriendListEmpty ? (<h3>No Friends Yet</h3>) :(<div>{listOfFriends}</div>)}
    </div>
  );
}
export default FriendList;
