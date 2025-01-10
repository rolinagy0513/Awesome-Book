import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {FaArrowCircleLeft, FaArrowCircleRight, FaArrowRight } from 'react-icons/fa';
import { IoAddCircle } from "react-icons/io5";
import useCustomFetch from "../Hooks/fetchapi";
import bookImage from "../assets/ContentItemBackground.jpg";
import "./Content.css"

const URL = "http://bookstoreapiazure.azurewebsites.net/api/Book/All";

function Content({books,setBooks }) { 

  const navigate = useNavigate("");
  const{getData} = useCustomFetch();
  const user = localStorage.getItem("UserName")

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    totalCount: 0,
    totalPages: 0
  });


  const handleNavigation = (prop) =>{
    navigate(prop);
  }

const fetchBooks = async (page) => {
  try {
    const data = await getData(URL, page, "Content");
    setBooks(data.items || []);
    setPagination({
      pageNumber: data.pageNumber,
      totalCount: data.totalCount,
      totalPages: data.totalPages
    });
  } catch (error) {
   console.log("The api in not working(Content)")
  }
};

  useEffect(() => {
    fetchBooks(pagination.pageNumber);
  }, [pagination.pageNumber]);

  const handleNextPage = () =>{
      if(pagination.pageNumber < pagination.totalPages){
        setPagination((prev)=>({...prev, pageNumber: pagination.pageNumber + 1}))
      }
   }
 
   const handlePerviousPage = ()=>{
    if(pagination.pageNumber > 1){
      setPagination((prev)=>({...prev,pageNumber: pagination.pageNumber - 1}))
    }
   }
 
  return (
  <div className="book">

    <div className = "text-info-container">
      <h2>Book List</h2>
      <p>We have over: {pagination.totalCount} books in total rent and enjoy the huge spectrum of books in our newly started store just in Awesome Books</p>

      {user === "admin@admin.com" && (
    <button onClick={() => handleNavigation("/AddBook")}><IoAddCircle/>Add a Book</button>
    )}
    
    </div>

  
 
  {pagination.totalCount === 0 ? (
    <p>No books available</p>
  ) : (
    <>
      {books.length > 0 ? (
        <div className="grid-container">
          {books.map((book, index) => (
            <div className="grid-item" key={book.id || index}>
              <img src={bookImage}/>  
              <h3>{book.title}</h3>
              <p>Pages: {book.pages}</p>
              <div className="grid-item-buttons">
              <button onClick={() => navigate(`/SingleProduct/${book.id}`)}><FaArrowRight/></button>
              {user === "admin@admin.com" && (
                <button onClick={() => navigate(`/EditBook/${book.id}`)}>Edit</button>
              )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No books found on this page</p>
      )}
    </>
  )}

  <div className = "nextpage-container">
      <button onClick={handlePerviousPage}><FaArrowCircleLeft/></button>
      <p>{pagination.pageNumber}</p>
      <button onClick={handleNextPage}><FaArrowCircleRight/></button>
  </div>

</div>
  );
}

export default Content;