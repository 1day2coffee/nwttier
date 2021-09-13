import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
} from "firebase/auth";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    const auth = getAuth();

    const providerGoogle = new GoogleAuthProvider();
    const providerGithub = new GithubAuthProvider();

    if (name === "google") {
      signInWithPopup(auth, providerGoogle)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (name === "github") {
      signInWithPopup(auth, providerGithub)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
