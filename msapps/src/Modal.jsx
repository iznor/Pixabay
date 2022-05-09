import "./Modal.scss";
import "./App";
import { useState, useEffect } from "react";

function Modal({setPageNum, displayCategories, setDisplayCategories, setCategory, image}) {
  const categories = ['Work','Sports', 'Skateboard', 'Music', 'Cooking']; // list of all categories, easily add more.
  // render list of categories as buttons that change the app state:
  const renderCategories = ()=>{
    return categories.map((category)=>(
    <button onClick={()=>{setPageNum(1); setCategory(category); setDisplayCategories(false)}} className="category-button">{category}</button>
    ))
  }
  // render selected image parameters such as: views, downloads, collection etc
  const renderImageDetails = ()=>{
    return (
    <>
      <img src={image.webformatURL} alt={image.id} />
      <p>Image Id: {image.id}</p>
      <p>Views: {image.views}</p>
      <p>Likes: {image.likes}</p>
      <p>Comments: {image.comments}</p>
      <p>Downloads: {image.downloads}</p>
      <p>Collections: {image.collections}</p>
    </>
  )}

  return (
    <>
      {/* user clicked on "Category" */}
      {displayCategories &&
      <div className="modal">
          <h1>Categories</h1>
          {renderCategories()}
      </div>
      ||
      // user clicked on image, modal will appear and show image parameters:
      image &&
      <div className="modal">
        {renderImageDetails()}
      </div>}
    </>
  );
}

export default Modal;
