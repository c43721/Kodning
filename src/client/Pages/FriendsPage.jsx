import React from 'react';


function FriendsList(props){
  const friendArray = [
    {
      name: "1"
    }
  ]

  return(
    <div>
    {friendArray.length ? (
      <div className="friendsCenter"> 
        {friendArray.map(friend => <Friend {...friend} />)}
      </div>
    ) : <p>No friends</p>}
    </div>
  )
}


function Friends(props){
  return(
    <Grid container> {props.name}</Grid>
  );

}

export default FriendsPage;