import React, { useState } from "react";
import { useBetween } from "use-between";


const BaseUrl = () => {
    const [baseUrl, setbaseUrl] = useState("https://traveler-serve.herokuapp.com/");
    const[baseImage,setbaseImage] = useState("https://os.ismetkizgin.com.tr/")
    
  return {
    baseUrl, 
    setbaseUrl,
    baseImage,
    setbaseImage
  };
};

export const useSharedUrls = () => useBetween(BaseUrl);