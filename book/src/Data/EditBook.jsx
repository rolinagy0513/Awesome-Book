import React,{useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./Editbook.css";

const apikey = import.meta.env.VITE_BOOK_API_KEY;
const url = import.meta.env.VITE_BOOK_API_URL_BOOK;
const URL = `${url}/UpdateBook`;

function EditBook(){

  const { id } = useParams();
  const navigate = useNavigate();
  const updateURL = `${URL}/${id}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState(0);

  const handleOnSubmit = async(e) =>{

    e.preventDefault();
    const accessToken = localStorage.getItem("AccessToken");

    try{
      const response  = await fetch(updateURL,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "x-api-key":"426BDC4A35584174A42D08EEB5D0300F",
          "Authorization": `Bearer ${accessToken}`
        },body:JSON.stringify({
          Title: title,
          Description: description,
          Pages: pages
        })
      })

      if(!response.ok){
        console.log("Failed to update book");
      }

      if(response.ok){
        console.log("Book updated successfully");
        navigate("/Content");
      }

    }catch{
      console.log("The api is not working(editBook)")
    }
  }

  return(
    <div className='edit-book'>
      <form onSubmit={handleOnSubmit}>
        <input type="text" placeholder="Enter book title: " value={title} onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder="Enter book description: " value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <input type='number' placeholder='Enter book page number: ' value={pages} onChange={(e)=>setPages(e.target.value)}></input>
        <button type="submit">Update</button>
      </form>
    </div>
  )

}

export default EditBook;