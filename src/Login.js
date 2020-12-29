import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const mounted = useRef(true);
  useEffect(() => {
    const cleanup = () => {
      mounted.current = false;
    };
    return cleanup;
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass);
    } catch (e) {
      console.log(e.message, mounted);
      if (mounted.current) setError(e);
    } finally {
      if (mounted.current) setPending(false);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password..."
        />
        <button type="submit">Login</button>
        <br />
        {pending && "Pending..."}
        {error && `Error: ${error.message}`}
      </form>
    </div>
  );
};

export default Login;
