import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CircularProgressWithLabel = ({ received = 0, total = 0 }) => {
  // Calculate the progress percentage
  const progress = total === 0 ? 0 : (received / total) * 100;
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={progress} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${received}/${total}`}</Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
