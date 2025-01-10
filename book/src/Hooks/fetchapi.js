const useCustomFetch = () => {
  const accessToken = localStorage.getItem("AccessToken");
  const apikey = import.meta.env.VITE_BOOK_API_KEY;

  if(!apikey){
    console.error("API key not found in environment variables")
  }

  //Custom Hook a Get-Api hívásokhoz
  const getData = async (URL, page, name, id) => {
    let finalUrl;

    if (id) {
      finalUrl = `${URL}/${id}`;
    } else if (page) {
      finalUrl = `${URL}?page=${page}`;
    } else {
      finalUrl = URL;
    }

    try {
      const response = await fetch(finalUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apikey,
          "Authorization": `Bearer ${accessToken}`
        } 
      });

      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error(`Error in ${name}:`, error);
      throw error;
    }
  };

  //Custom Hook a Post-Api hívásokhoz
  const postData = async (URL, id, body, name, auth, responseType = "json") => {
    let finalUrl;

    if (id) {
      finalUrl = `${URL}/${id}`;
    } else {
      finalUrl = URL;
    }

    try {

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": apikey
      }

      if (auth) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await fetch(finalUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Failed to post data');
      }

      if (responseType === "text") {
        return await response.text();
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.log(`Error in ${name}:`);
      throw error;
    }
  };

  //Custom Hook a Delete-Api hívásokhoz
  const deleteData = async (URL, id, name) =>{

    let finalUrl;

    if(id){
      finalUrl = `${URL}/${id}`;
    }else{
      finalUrl = URL;
  }

  try{
    const response = await fetch(finalUrl,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apikey,
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if(!response.ok){
      console.log(`Failed to delete ${name}`);
    }

    return response;

  }catch{
    console.log(`Error in ${name}`);
    throw error;
  }

};


return { getData, postData, deleteData};
}

export default useCustomFetch;