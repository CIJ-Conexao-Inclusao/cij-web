import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full mt-4 flex gap-2 items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default Loading;
