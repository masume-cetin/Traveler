import React, { useState } from "react";
import { useBetween } from "use-between";


const ProfileStates = () => {
    const [isNewPostAdding, setisNewPostAdding] = useState(false)
    const[isSettingsShown,setisSettingsShown]= useState(false)
    const[isaccountupdate,setisaccountupdate]= useState(false)
    const[isaccountdelete,setisaccountdelete]= useState(false)
    const[ispassword,setispassword]= useState(false)

  return {
    isNewPostAdding,
    setisNewPostAdding,
    isSettingsShown,setisSettingsShown,
    isaccountupdate,setisaccountupdate,
    isaccountdelete,setisaccountdelete,
    ispassword,setispassword
  };
};

export const useSharedProfileStates = () => useBetween(ProfileStates);


