import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";

const SkeletonLoader = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "10px",
        }}
      >
        {/* <CircularProgress color="inherit" /> */}
        <Skeleton variant="rounded" width={120} height={80} />
        <Skeleton variant="rounded" width={120} height={80} />
        <Skeleton variant="rounded" width={120} height={80} />
        <Skeleton variant="rounded" width={120} height={80} />
        <Skeleton variant="rounded" width={120} height={80} />
        <Skeleton variant="rounded" width={120} height={80} />
        <Skeleton variant="rounded" width={120} height={80} />
        <Skeleton variant="rounded" width={120} height={80} />
        <Skeleton variant="rounded" width={120} height={80} />
      </div>
    </>
  );
};

export default SkeletonLoader;
