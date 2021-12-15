import React, { useState, useEffect } from "react";
import ArtInfo from "./ArtInfo";
import Modal from "./Modal";
//https://collectionapi.metmuseum.org/public/collection/v1/objects/[ObjectID]
const ArtResult = (props) => {
  const [artResult, setArtResult] = useState({});
  const [show, setShow] = useState(false);
  useEffect(() => {
    const getSingleArt = async () => {
      try {
        const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.display}`;
        const res = await fetch(url);
        const data = await res.json();
        setArtResult(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getSingleArt();
  }, [props.display]);

  const artResultClick = () => {
    setShow(true);
  };

  function hoverBackground(e) {
    e.target.style.background = "#3262a8";
  }

  function leaveBackground(e) {
    e.target.style.background = "#063970";
  }

  return (
    <div
      className="ArtResult text-center"
      onClick={artResultClick}
      onMouseEnter={hoverBackground}
      onMouseLeave={leaveBackground}
    >
      <img src={artResult.primaryImageSmall} alt={artResult.title} />
      <ArtInfo
        title={artResult.title}
        artist={artResult.artistDisplayName}
        period={artResult.period}
        date={artResult.objectDate}
        medium={artResult.medium}
        department={artResult.department}
      />
      <Modal
        onClose={() => setShow(false)}
        show={show}
        title={artResult.title}
        artist={artResult.artistDisplayName}
        image={artResult.primaryImage}
      />
    </div>
  );
};

export default ArtResult;
