import React, { useState } from "react";
import { useBetween } from "use-between";


const EventStates = () => {
    const [postID, setpostID] = useState("");
    const[isOpen,setisOpen] = useState(false);
    const[PostContent,setPostContent]=useState("")
    const[PostCityName,setPostCityName]=useState("")
    const[PostDistrictName,setPostDistrictName]=useState("")
    const[File,setFile]=useState("")
    const[shouldput,setshouldput]=useState(false)

  return {
    postID, 
    setpostID,
    isOpen,
    setisOpen,
    PostContent,setPostContent,
    PostCityName,setPostCityName,
    PostDistrictName,setPostDistrictName,
    File,setFile,
    shouldput,setshouldput
  };
};

export const useSharedPostID = () => useBetween(EventStates);