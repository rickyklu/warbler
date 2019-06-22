import React from "react";
import { Link } from "react-router-dom";
import MessageTimeline from "./MessageTimeline";

const Homepage = ( { currentUser }) => {
  // if current user is not logged in...
  if (!currentUser.isAuthenticated){
    return (
      <div className="home-hero">
        <h1>What's happening?</h1>
        <h4>New to warbler?</h4>
        <Link to="/signup" className="btn btn-primary">
          Sign up here
        </Link>
      </div>
    );
  }
  return (
      <div>
        <MessageTimeline 
          username={currentUser.user.username}
          profileImageUrl={currentUser.user.profileImageUrl}
        />
      </div>
  )
};

export default Homepage;
