import React, { useReducer, useState } from "react";
import Form from "./Form";
import Pagination from "./Pagination";

const searchReducer = (artState, action) => {
  switch (action.type) {
    case "store-this-art":
      return { ...artState, artIDs: action.payload.artIDs };
    default:
      return { ...artState, query: action };
  }
};

const Upper = (props) => {
  const [pages, setPages] = useState("");
  const [linkPages, setLinkPages] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [artState, ArtDispatcher] = useReducer(searchReducer, {
    artIDs: [],
    query: "",
  });

  const handleInputChange = (searchObj) => {
    ArtDispatcher(searchObj.query);
  };

  const searchThis = async () => {
    try {
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${artState.query}`;
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      //  add data to artState.artIDs
      ArtDispatcher({ type: "store-this-art", payload: { artIDs: data } });
      const tempArr = [];
      //  set first 10 results as setTenResults
      for (let i = 0; i < 10; i++) {
        // using data direct from Met server in this function as artDispatcher might not have run yet
        tempArr.push(data.objectIDs[i]);
      }

      // break up results into pages of 10
      setPages(Math.ceil(data.objectIDs.length / 10));
      const tempPagesArr = [];

      if (pages <= 10) {
        console.log("less than or equal 10 pages!");
        for (let i = 1; i <= pages; i++) {
          //run loop number of times of pages
          tempPagesArr.push(i);
        }
      } else if (pages > 10) {
        console.log("more than 10 pages!");
        //run loop for 10 times and add in last page of pages
        for (let i = 1; i <= 10; i++) {
          tempPagesArr.push(i);
        }
        tempPagesArr.push(pages);
      }
      setLinkPages(tempPagesArr); //set state of page links to create
      props.setTenResults(tempArr);
    } catch (err) {
      console.log(err.message);
    }
  };

  //   useEffect(()=>{
  // //create links for current page

  //   },[linkPages])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const lastArt = currentPage * 10; // last piece of art to be displayed
    const firstArt = lastArt - 10; //first piece of art to be displayed
    const shownArt = artState.artIDs.objectIDs.slice(firstArt, lastArt); // to get what will be shown on screen
    const tempPagesArr = [];
    if (pageNumber >= 6) {
      tempPagesArr.push(1);
      for (let i = pageNumber - 5; i <= pageNumber + 5; i++) {
        tempPagesArr.push(i);
      }
      tempPagesArr.push(pages);
    } else {
      for (let i = 1; i <= 10; i++) {
        tempPagesArr.push(i);
      }
      tempPagesArr.push(pages);
    }
    setLinkPages(tempPagesArr); //set state of page links to create
    props.setTenResults(shownArt);
  };

  return (
    <div className="Upper">
      <Form submitInput={searchThis} passInput={handleInputChange} />
      <Pagination paginate={paginate} linkPages={linkPages} />
      {/* <table className="results">
        <tbody>
          <tr></tr>
        </tbody>
      </table> */}
      {console.log({ artState })}
      {console.log({ linkPages })}
    </div>
  );
};

export default Upper;
