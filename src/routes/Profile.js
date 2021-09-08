import React, { useEffect } from "react";
import { authService, dbService } from "fBase";
import { useHistory } from "react-router-dom";
import {
  collection,
  orderBy,
  query,
  where,
  getDocs,
} from "@firebase/firestore";

export default ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    const nweets = await getDocs(
      query(
        collection(dbService, "nweets"),
        where("creatorId", "==", userObj.uid),
        orderBy("createdAt")
      )
    );
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
