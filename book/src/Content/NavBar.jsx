import React from 'react';  
import { useNavigate } from 'react-router-dom';
import useCustomFetch from '../Hooks/fetchapi';
import {FaUserCircle, FaBook} from 'react-icons/fa';
import { LuLogOut } from "react-icons/lu";
import "./Navbar.css"; 

const url = import.meta.env.VITE_BOOK_API_URL_BOOK
const URL = `${url}/Revoke`;


function NavBar(){

  const people  = localStorage.getItem("UserName")
  const navigate = useNavigate("");
  const {deleteData} = useCustomFetch();

  const handleLogout = async () => {

    const accessToken = localStorage.getItem("AccessToken");
    const refreshToken = localStorage.getItem("RefreshToken");

    try{
      await deleteData(URL, null, "Revoke");

      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("AccessExpiration");
      localStorage.removeItem("RefreshExppiration");
      localStorage.removeItem("UserName")

      navigate("/");

      console.log("User successfully logged out");

      const checkAccessToken = localStorage.getItem("AccessToken");
      const checkRefreshToken = localStorage.getItem("RefreshToken");
      const checkUser = localStorage.getItem("UserName")

      console.log(checkAccessToken);
      console.log(checkRefreshToken);
      console.log(checkUser);

    }catch{
      console.log("There was an error logging out");
    }
  }

  return(
    <>
      <div className='navbar'>

        <div className='user-container'>

          <div className='user-icon'>
            <p><FaUserCircle/></p>
          </div>

          <div className='user-name'>
            <p>{people}</p>
          </div>
       
        </div>

        <div className='title-container'>
          <h1>Awesome Book</h1>
        </div>

        <div className='button-container'>
          <button onClick={()=>navigate("/Rented")}><FaBook/>
            <span>Rented Books</span>
          </button>
          <button onClick={handleLogout}><LuLogOut/>
            <span>Logout</span>
          </button>
        </div>
       
      </div>
    </>
  )


}

export default NavBar;