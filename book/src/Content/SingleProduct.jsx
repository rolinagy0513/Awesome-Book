import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCustomFetch from "../Hooks/fetchapi";
import randomNum from "../Hooks/useRandom";
import bookImage from "../assets/ContentItemBackground.jpg";
import { FaArrowLeft } from 'react-icons/fa';
import { IoStarSharp } from "react-icons/io5";
import "./SingleProduct.css";

const URL = "http://bookstoreapiazure.azurewebsites.net/api/Book";
const RENT_URL = "http://bookstoreapiazure.azurewebsites.net/api/Book/RentBook";
const DELETE_URL = "http://bookstoreapiazure.azurewebsites.net/api/Book/DeleteBook";

function SingleProduct() {
  const { id } = useParams();

  const { getData, postData, deleteData} = useCustomFetch();

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("")
  const [starCount, setStarCount] = useState(0);

  const user = localStorage.getItem("UserName")

  const navigate = useNavigate();
  

  const handleNavigation = (param) => {
    navigate(param);
  };

  useEffect(()=>{
    setStarCount(randomNum())
  },[])
  
  const renderStars = () => {
    return Array(starCount).fill().map((_, index) => (
      <IoStarSharp key={index} />
    ));
  };

  useEffect(()=>{

    let timeoutId;

    if(message){
      timeoutId = setTimeout(()=>{
        setMessage("")
      },3000)
    }

    return()=>{
      if(timeoutId){
        clearTimeout(timeoutId)
      }
    }

  },[message])


  const handleDelete = async () => {


    try {
      await deleteData(DELETE_URL, id, "DeleteBook");
      console.log("Book deleted successfully");
      navigate("/Content");
    }catch{
      console.log("The api is not responding (DeleteBook):");
    }

  };

  const RentBook = async () => {

  
    try {
      await postData(RENT_URL, id, { id: id }, "RentBook", true);
      console.log("Book Rented successfully");
      setMessage("Book rented succesfully");

    }catch{
      console.log("Error renting book:");
      setMessage("You already rented this book");
    }
  
  };

  useEffect(() => {
 
    const fetchData = async()=>{

      try {
        setIsLoading(true);
        const data = await getData(URL, null, "SingleProduct", id);
        setBook(data);
      }
      catch (error) {
        console.log("The api is not responding (SingleProduct):");
      } 
      finally {
        setIsLoading(false);
      }
    }

    fetchData();
 
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>
      <button onClick={() => handleNavigation("/Content")}><FaArrowLeft/></button>
      <p>Book not found</p>
    </div>;
  }

  return (
    <div className="single-product-page">

      <div className="title-container-single">

        <div className="back-button-single">
          <button onClick={() => handleNavigation("/Content")}><FaArrowLeft/></button>
        </div>

        <div className="title-image">

          <h1>{book.title}</h1>
          <label className="stars-container">
            {renderStars()}
          </label>

          <img src={bookImage} alt={book.title} />
          <div className="button-container-single">
            <button onClick={RentBook}>Rent the Book</button>
            {user === "admin@admin.com" && (
              <button onClick={handleDelete}>Delete Book</button>
            )}
          </div>

          <div className="rent-message">
              <label>{message}</label>
          </div>

        </div>

      </div>

      <div className="description-container">
            <h1>Description</h1>
            <p>{book.description}</p>
      </div>

    </div>
  );
}

export default SingleProduct;