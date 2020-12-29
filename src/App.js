import React from "react";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Login";
import Logout from "./Logout";

const App = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (!user) {
    return <Login />;
  }
  return (
    <div>
      User: {user.email}
      <Logout />
    </div>
  );
};

export default App;
