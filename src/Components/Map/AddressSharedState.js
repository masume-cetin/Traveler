import React, { useState } from "react";
import { useBetween } from "use-between";


const EventStates = () => {
    const [Address, setAddress] = useState("");
    
  return {
    Address, 
    setAddress
  };
};

export const useSharedEventStates1 = () => useBetween(EventStates);