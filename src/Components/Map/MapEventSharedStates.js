import React, { useState } from "react";
import { useBetween } from "use-between";


const EventStates = () => {
    const [isPopupOpen, setisPopupOpen] = useState(false);
    
  return {
    isPopupOpen,
    setisPopupOpen
  };
};

export const useSharedEventStates = () => useBetween(EventStates);