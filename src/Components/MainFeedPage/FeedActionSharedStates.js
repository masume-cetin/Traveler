import React, { useState } from "react";
import { useBetween } from "use-between";


const Action = () => {
    const [comment, setcomment] = useState(false);

  return {
    comment, setcomment
  };
};

export const useSharedAction = () => useBetween(Action);