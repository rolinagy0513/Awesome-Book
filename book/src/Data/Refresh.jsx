import React,{useEffect, useState} from "react";
import { data, useNavigate } from 'react-router-dom'; 
import useCustomFetch from "../Hooks/fetchapi";

const URL = "http://bookstoreapiazure.azurewebsites.net/api/Auth/Refresh";

function Refresh(){

  const navigate = useNavigate()
  const {postData} = useCustomFetch();

  const accessToken = localStorage.getItem("AccessToken");
  const refreshToken = localStorage.getItem("RefreshToken");
  const accessExpiration = localStorage.getItem("AccessExpiration");
  const refreshExpiartion = localStorage.getItem("RefreshExpiration");


  const fetchNewToken = async () => {
    console.log("Running..");
  
    
    try{
      const data = await postData(URL, null, {AccessToken: accessToken, RefreshToken: refreshToken}, "Refresh", false);

      console.log("Whole response from refresh: ", data);

      const newAccessToken = data.accessToken;
      const newAccessExpiration = data.accessExpirationDate;

      console.log("New AccessToken: ", newAccessToken);
      console.log("New AccessExpirationDate", newAccessExpiration);

      localStorage.setItem("AccessToken", newAccessToken);
      localStorage.setItem("AccessExpiration", newAccessExpiration);

      console.log("Saved");
   
    }catch{
      console.log("The api is not responding (Refresh):");
    navigate("/Login")
    }
  
  };
  

function checkAccessExpiration(){

  const currentDate = new Date()
  const accessExpirationDate = new Date(accessExpiration)
  const rerfreshExpirationDate = new Date(refreshExpiartion)

  console.log("Current time: " ,currentDate);
  console.log("accessExpiration: ",accessExpirationDate);
  console.log("refreshExpiraion: ", rerfreshExpirationDate);

  if(currentDate.getTime() >= accessExpirationDate.getTime()){

    fetchNewToken();

    console.log("Siker")
  }else{
    console.log("The token is still valid")
  }

  if(currentDate >= rerfreshExpirationDate){
    console.log("Login again");
    navigate("/Login")
  }

}


useEffect(() => {

  checkAccessExpiration();

 
  const intervalId = setInterval(() => {
    console.log("Checking token expiration...");
    checkAccessExpiration();
  }, 30000); //300000


  return () => clearInterval(intervalId);
  
}, []); 


return(
  <div>
    <button onClick={()=>navigate("/Login")}>Back</button>
  </div>
)

}

export default Refresh;