import React, { useState } from "react";
import { authService, firebaseInstance } from "fBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
} from "firebase/auth";
import firebaseAuth from "firebase/auth/dist/index.esm";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        const data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        const data = await signInWithEmailAndPassword(
          authService,
          email,
          password
        );
      }
      console.log(data);
    } catch (error) {
      setError(error.meassage);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    const auth = getAuth();

    const providerGoogle = new GoogleAuthProvider();
    const providerGithub = new GithubAuthProvider();

    if (name === "google") {
      signInWithPopup(auth, providerGoogle).then((result) => {
        let credential = GoogleAuthProvider.credentialFromResult(result);
        let token = credential.accessToken;
        let user = result.user;
      }).catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
      });
    } else if (name === "github") {
      signInWithPopup(auth, providerGithub).then((result) => {
        let credential = GithubAuthProvider.credentialFromResult(result);
        let token = credential.accessToken;
        let user = result.user;
      }).catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GithubAuthProvider.credentialFromError(error);
      });;
    }
  };


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
