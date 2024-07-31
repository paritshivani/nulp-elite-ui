import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Unauthorized = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <LockOutlinedIcon sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h4" component="div" gutterBottom>
        Unauthorized
      </Typography>
      <Typography variant="body1">
        You do not have access to this page.
      </Typography>
    </Box>
  );
};

export default Unauthorized;
