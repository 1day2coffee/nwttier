import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [Nweets, setNweets] = useState([]);

  useEffect(() => {
    const q = query(collection(getFirestore(), "nweets"), orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setNweets(newArray);
      console.log("Current tweets in CA: ", newArray);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {Nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
