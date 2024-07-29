import * as React from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";

export default function Toast({ response, type }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (response) {
      setOpen(true);
    }
  }, [response]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={Slide}
      TransitionProps={{
        direction: "center",
      }}
      sx={{
        width: "35%",
        margin: "0 auto",
        marginTop: "50vh",
        transform: "translateY(-50%)",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={type === "success" ? "success" : "error"}
        variant="filled"
        icon={false}
        sx={{
          width: "100%",
          backgroundColor: type === "success" ? "#E9F5EA" : "#FDECEA",
          color: type === "success" ? "green" : "red",
        }}
      >
        {response}
      </Alert>
    </Snackbar>
  );
}
