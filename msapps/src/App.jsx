import "./App.scss";
import "./Modal";
import { useState, useLayoutEffect } from "react";
import Modal from "./Modal";
const axios = require("axios");

function App() {
  const [list, setList] = useState([]); // array of 9 image items
  const [category, setCategory] = useState(null); // current selected image category
  const [displayCategories, setDisplayCategories] = useState(false); // current visibility of categories (toggle show / hide)
  const [pageNum, setPageNum] = useState(1); // current page number (needed for proper pagination)
  const [imageClicked, setImageClicked] = useState(null); // current selected image category
  const url = `http://localhost:8080/api/pixa/${category}/${pageNum}`; // REST API call

  // Render photos from the data you received (from "list").
  const renderList = () => {
    if (list && list.length) {
      return list.map((image) => (
        <img
          onClick={(e) =>{e.stopPropagation(); setImageClicked(image)}}
          key={image.id}
          className="photo"
          src={image.webformatURL}
        />
      ));
    
    }else{
      //list is null or list is empty
      return <p>Error! Couldn't complete GET transaction</p>
    }
  };

  // Before the App.jsx render, make a server call to the URL:
  useLayoutEffect(() => {
    axios({
      method: "Get",
      url: url,
    })
      .then((response) => setList(response.data))
      .catch((err)=>console.log(`Error! ${err}`));
  }, [pageNum, category]); // When you select a category or click prev/next buttons, make a server call and get the new data.

  return (
    <>
    {/* Modal gets props to control different app states */}
      <Modal setPageNum={setPageNum} setDisplayCategories={setDisplayCategories} displayCategories={displayCategories} setCategory={setCategory} image={imageClicked} />
    {/* When clicking div "App" -> the Modal disappears */}
      <div className="App" onClick={()=>{setDisplayCategories(false);setImageClicked(null);}} style={imageClicked || displayCategories ? {opacity:0.5} : {opacity:1}}>
        {/* Buttons area */}
        <div className="buttons">
          {/* Replace the items by 9 backwards */}
          <button onClick={pageNum === 1 ? null : () =>setPageNum(pageNum - 1)}>Prev</button>
          {/* The modal will appear and you will select the category of the photos */}
          <button onClick={(e) =>{e.stopPropagation(); setDisplayCategories(true)}}>Category</button>
          {/* replace the items by 9 forward */}
          <button onClick={() => setPageNum(pageNum + 1)}>Next</button>
        </div>
        {/* Image grid area (Images display as 3*3) */}
        <div className="grid">{renderList()}</div>
        {/* Page number area */}
        <p>Category: {category}</p>
        <p>Page: {pageNum}</p>
      </div>
    </>
  );
}

export default App;
