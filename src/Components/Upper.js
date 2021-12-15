import React, { useReducer } from "react";
import Form from "./Form";
import Pagination from "./Pagination";
import Navbar from "./Navbar";
const searchReducer = (artState, action) => {
  switch (action.type) {
    case "store-this-art":
      return { ...artState, artIDs: action.payload.artIDs };
    case "change-values":
      return {
        ...artState,
        pages: action.payload.pages,
        linkPages: action.payload.linkPages,
        currentPage: action.payload.currentPage,
      };
    case "store-page-numbers":
      return { ...artState, pages: action.payload.pages };
    case "set-link-pages":
      return { ...artState, linkPages: action.payload.linkPages };
    case "set-current-page":
      return { ...artState, currentPage: action.payload.currentPage };
    default:
      return { ...artState, query: action };
  }
};

const Upper = (props) => {
  // const [pages, setPages] = useState("");
  // const [linkPages, setLinkPages] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [artState, ArtDispatcher] = useReducer(searchReducer, {
    artIDs: [],
    query: "",
    pages: "",
    linkPages: [],
    currentPage: 1,
  });

  const handleInputChange = (searchObj) => {
    ArtDispatcher(searchObj.query);
  };

  const searchThis = async () => {
    try {
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${artState.query}`;
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
      // setPages(Math.ceil(data.objectIDs.length / 10));
      ArtDispatcher({
        type: "store-page-numbers",
        payload: { pages: Math.ceil(data.objectIDs.length / 10) },
      });
      const tempPagesArr = [];

      if (artState.pages <= 10) {
        for (let i = 1; i <= artState.pages; i++) {
          //run loop number of times of pages
          tempPagesArr.push(i);
        }
      } else if (artState.pages > 10) {
        //run loop for 10 times and add in last page of pages
        for (let i = 1; i <= 10; i++) {
          tempPagesArr.push(i);
        }
        tempPagesArr.push(artState.pages);
      }
      //setLinkPages(tempPagesArr); //set state of page links to create
      ArtDispatcher({
        type: "set-link-pages",
        payload: { linkPages: tempPagesArr },
      }); //set state of page links to create
      props.setTenResults(tempArr);
    } catch (err) {
      console.log(err.message);
    }
  };

  const paginate = (pageNumber) => {
    //setCurrentPage(pageNumber);
    ArtDispatcher({
      type: "set-current-page",
      payload: { currentPage: pageNumber },
    });
    const lastArt = artState.currentPage * 10; // last piece of art to be displayed
    const firstArt = lastArt - 10; //first piece of art to be displayed
    const shownArt = artState.artIDs.objectIDs.slice(firstArt, lastArt); // to get what will be shown on screen
    const tempPagesArr = [];
    if (pageNumber <= 6 && artState.pages <= 6) {
      for (let i = 1; i <= artState.pages; i++) {
        //run loop number of times of pages
        tempPagesArr.push(i);
      }
    } else if (pageNumber >= artState.pages - 5) {
      tempPagesArr.push(1);
      for (let i = pageNumber - 5; i <= artState.pages; i++) {
        tempPagesArr.push(i);
      }
    } else if (pageNumber >= 7) {
      tempPagesArr.push(1);
      for (let i = pageNumber - 5; i <= pageNumber + 5; i++) {
        tempPagesArr.push(i);
      }
      tempPagesArr.push(artState.pages);
    } else {
      for (let i = 1; i <= 10; i++) {
        tempPagesArr.push(i);
      }
      tempPagesArr.push(artState.pages);
    }
    //setLinkPages(tempPagesArr); //set state of page links to create
    ArtDispatcher({
      type: "set-link-pages",
      payload: { linkPages: tempPagesArr },
    }); //set state of page links to create
    props.setTenResults(shownArt);
  };

  const chooseDept = async (number) => {
    try {
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${number}&q=art`;
      const res = await fetch(url);
      const data = await res.json();
      //  add data to artState.artIDs
      ArtDispatcher({ type: "store-this-art", payload: { artIDs: data.objectIDs } });
      const tempArr = [];
      //  set first 10 results as setTenResults
      for (let i = 0; i < 10; i++) {
        // using data direct from Met server in this function as artDispatcher might not have run yet
        tempArr.push(data.objectIDs[i]);
      }

      // break up results into pages of 10
      // setPages(Math.ceil(data.objectIDs.length / 10));
      ArtDispatcher({
        type: "store-page-numbers",
        payload: { pages: Math.ceil(data.objectIDs.length / 10) },
      });
      const tempPagesArr = [];

      if (artState.pages <= 10) {
        for (let i = 1; i <= artState.pages; i++) {
          //run loop number of times of pages
          tempPagesArr.push(i);
        }
      } else if (artState.pages > 10) {
        //run loop for 10 times and add in last page of pages
        for (let i = 1; i <= 10; i++) {
          tempPagesArr.push(i);
        }
        tempPagesArr.push(artState.pages);
      }
      //setLinkPages(tempPagesArr); //set state of page links to create
      ArtDispatcher({
        type: "set-link-pages",
        payload: { linkPages: tempPagesArr },
      }); //set state of page links to create
      props.setTenResults(tempArr);
    } catch (err) {
      console.log(err.message);
    }
    console.log(number);
  };

  return (
    <div className="Upper">
      <Navbar chooseDept={chooseDept} />
      <Form submitInput={searchThis} passInput={handleInputChange} />
      <Pagination paginate={paginate} linkPages={artState.linkPages} />
    </div>
  );
};

export default Upper;
