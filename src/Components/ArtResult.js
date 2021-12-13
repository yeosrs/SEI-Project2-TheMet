import React, { useState, useEffect } from "react";
import ArtInfo from "./ArtInfo";
//https://collectionapi.metmuseum.org/public/collection/v1/objects/[ObjectID]
const ArtResult = (props) => {
  const [artResult, setArtResult] = useState({});

  useEffect(() => {
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
    getSingleArt();
  }, []);

  return (
    <div className="ArtResult">
      <img src={artResult.primaryImageSmall} alt={artResult.title} />
      <ArtInfo title={artResult.title} artist={artResult.artistDisplayName} period={artResult.peroid} medium={artResult.medium}department ={artResult.department}/>
      {/* {props.display} */}
      {console.log({ artResult })}
    </div>
  );
};

export default ArtResult;
