import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Box from "@mui/material/Box";
import { BorderAllRounded } from "@mui/icons-material";

const NoResult = () => {
  //   const { contentId } = useParams();
  const { t } = useTranslation();

  // Now contentId contains the value from the URL parameter
  return (
    <div>
      {/* <Container maxWidth="md" role="main" className="container-pb"> */}
      <Box
        style={{
          fontSize: "30px",
          border: "solid 1px #edece9",
          padding: "109px",
          textAlign: "center",
          margin: "20px 0 60px 0",
          BorderRadius: "10px",
        }}
      >
        <SearchOffIcon style={{ fontSize: "70px", color: "#ccc" }} />
        <Box> {t("NO_RESULT_FOUND")}</Box>
      </Box>
      {/* </Container> */}
      <FloatingChatIcon />
    </div>
  );
};

export default NoResult;
