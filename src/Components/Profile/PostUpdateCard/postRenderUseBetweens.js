import React, { useState } from "react";
import { useBetween } from "use-between";


const ProfileUpdateStates = () => {
    const [isRendered, setisRendered] = useState(false)

  return {
    isRendered, setisRendered
  };
};

export const useSharedProfilUpdateStates = () => useBetween(ProfileUpdateStates);