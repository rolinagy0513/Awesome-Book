import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCustomFetch from "../Hooks/fetchapi";
import "./Rented.css"

const URL = "http://bookstoreapiazure.azurewebsites.net/api/Book/RentedBooks";
const CANCEL_URL = "http://bookstoreapiazure.azurewebsites.net/api/Book/CancelRent";

function Rented() {
  const [rentedBooks, setRentedBooks] = useState([]);
  const accessToken = localStorage.getItem("AccessToken");
  const navigate = useNavigate();
  const { getData, deleteData} = useCustomFetch();

  useEffect(() => {

    //Ez a régi logika a custom hook nélkül ha valami nem megy akkor ezt használd!!
    /*
    const getData = async () => {
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "426BDC4A35584174A42D08EEB5D0300F",
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRentedBooks(data);
        } else {
          console.error("Failed to fetch rented books:", response.status);
        }
      } catch (error) {
        console.error("The API is not responding (RentedBooks):", error);
      }
    };

    getData();
    */
    
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
