import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCustomFetch from "../Hooks/fetchapi";
import "./Rented.css"

const url = import.meta.env.VITE_BOOK_API_URL_BOOK;
const URL = `${url}/RentedBook`;
const CANCEL_URL = `${url}/CancelRent`;

function Rented() {
  const [rentedBooks, setRentedBooks] = useState([]);
  const accessToken = localStorage.getItem("AccessToken");
  const navigate = useNavigate();
  const { getData, deleteData} = useCustomFetch();

  useEffect(() => {
    
    const fetchdata = async () => {
      try {
        const data = await getData(URL, null, "RentedBooks");
        setRentedBooks(data);
      } catch (error) {
        console.log("The api is not responding (RentedBooks):");
      }
    };

    fetchdata();
  
  }, [accessToken]);

  const handleCancelRent = async (id) => {
    
 
      try{
        await deleteData(CANCEL_URL, id, "CancelRent");
        setRentedBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        console.log("Rent cancelled successfully");
      }catch{
        console.log("The api is not responding (CancelRent):");
      }
  
    };

  return (
    <div className="rented-page">
      <button onClick={()=>navigate("/Content")}>Back to content</button>
      {rentedBooks.length > 0 ? (
        rentedBooks.map((book) => (
          <div key={book.id}>
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <button onClick={() => handleCancelRent(book.id)}>Cancel Rent</button>
          </div>
        ))
      ) : (
        <p>No rented books available.</p>
      )}
    </div>
  );
}

export default Rented;
