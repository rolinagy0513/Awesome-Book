import React,{useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom'; 
import useCustomFetch from "../Hooks/fetchapi";

const url = import.meta.env.VITE_BOOK_API_URL_BOOK;
const URL = `${url}/AddBook`;

function AddBook(){

   const navigate = useNavigate("");

   const {postData} = useCustomFetch();

  const [title, setTitle] = useState("");
  const [description, setDescription]  = useState("");
  const [pages, setPages] = useState("");
 
  const accessToken = localStorage.getItem("AccessToken");

  const passingData = async(e)=>{

    e.preventDefault();

    try{
      postData(URL, null, {Title: title, Description: description, Pages: pages}, "AddBook", true);
      setTitle("");
      setDescription("");
      navigate("/Content");
    }
    catch{
      console.log("The api is not working(addBook)")
    }
  }
  

  return(
    <div>
      <form onSubmit={passingData}>
        <input type="text" placeholder="Enter book title: " value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder="Enter book description: " value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <input type="number" placeholder="Enter page number" value={pages} onChange={(e)=>setPages(e.target.value)}></input>
        <button type="submit">Add</button>
      </form>
    </div>
  )

}

export default AddBook;