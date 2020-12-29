import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase";

const Logout = () => {
  const [pending, setPending] = useState(false);
  const mounted = useRef(true);
  useEffect(() => {
    const cleanup = () => {
      mounted.current = false;
    };
    return cleanup;
  }, []);
  const logout = async () => {
    setPending(true);
    await firebase.auth().signOut();
    if (mounted.current) setPending(false);
  };
  return (
    <div>
      <button type="button" onClick={logout}>
        Logout
      </button>
      {pending && "Pending..."}
    </div>
  );
};

export default Logout;
