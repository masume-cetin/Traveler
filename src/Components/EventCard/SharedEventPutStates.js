import React, { useState } from "react";
import { useBetween } from "use-between";


const EventPutStates = () => {
    const [postID, setpostID] = useState("");
    const[isOpen,setisOpen] = useState(false);
    const[ActivityName,setActivityName]=useState("")
    const[ActivityCityName,setActivityCityName]=useState("")
    const[ActivityDistrictName,setActivityDistrictName]=useState("")
    const[ActivityDate,setActivityDate]=useState("")
    const[File,setFile]=useState("")
    const[shouldput,setshouldput]=useState(false)

  return {
    postID, 
    setpostID,
    isOpen,
    setisOpen,
    ActivityName,setActivityName,
    ActivityCityName,setActivityCityName,
    ActivityDistrictName,setActivityDistrictName,
    File,setFile,
    shouldput,setshouldput,
    ActivityDate,setActivityDate
  };
};

export const useSharedEventID = () => useBetween(EventPutStates);