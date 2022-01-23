import React, { useState } from "react";
import { useBetween } from "use-between";


const BaseUrl = () => {
    const [baseUrl, setbaseUrl] = useState("https://example.com/");
    const[baseImage,setbaseImage] = useState("https://os.example.tr/")
    
  return {
    baseUrl, 
    setbaseUrl,
    baseImage,
    setbaseImage
  };
};

export const useSharedUrls = () => useBetween(BaseUrl);