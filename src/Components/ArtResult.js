import React, { useState, useEffect } from "react";
//https://collectionapi.metmuseum.org/public/collection/v1/objects/446971
const ArtResult = (props) => {
  const [objectID, setObjectID] = useState("");
  const [artResult, setArtResult] = useState({});

  const getSingleArt = async () => {
    try {
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.display}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      setArtResult(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getSingleArt();
    return artResult;
  }, [objectID]);

  return <div className="ArtResult">{props.display}</div>;
};

export default ArtResult;
