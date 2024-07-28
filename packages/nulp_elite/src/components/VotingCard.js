import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";

const processString = (str) => {
  return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
};

export default function VotingCard({ items, index, onClick }) {
  const { t } = useTranslation();
  const shareUrl = window.location.href; // Current page URL
  const [showStatsModal, setShowStatsModal] = useState(false);

  const handleOpenStats = (event) => {
    event.stopPropagation();
    setShowStatsModal(true);
  };

  const handleCloseStats = (event) => {
    event.stopPropagation();

    setShowStatsModal(false);
  };

  const isVotingEnded = new Date(items.end_date) < new Date();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Card
      className="cardBox pb-20"
      sx={{ position: "relative", cursor: "pointer", textAlign: "left" }}
      onClick={onClick}
    >
      <CardContent className="d-flex jc-bw">
        <Box>
          {items.title && (
            <Typography gutterBottom className="mt-10  event-title">
              {items.title}
            </Typography>
          )}
          <Box className="d-flex h6-title mt-30" style={{ color: "#484848" }}>
            <Box className="d-flex jc-bw alignItems-center">
              <TodayOutlinedIcon className="fs-12 pr-5" />
              {formatDate(items.start_date)}
            </Box>
          </Box>
        </Box>
        <Box className="card-img-container" style={{ position: "inherit" }}>
          <img
            src={items.image ? items.image : require("assets/default.png")}
            className="event-card-img"
            alt="App Icon"
          />
        </Box>
      </CardContent>
      <Box className="voting-text lg-mt-30">
        <Box>
          {!isVotingEnded && (
            <Button type="button" className="custom-btn-primary ml-20 lg-mt-20">
              Vote Now <ArrowForwardIosOutlinedIcon className="fs-12" />
            </Button>
          )}
          {isVotingEnded && (
            <Button
              type="button"
              className="custom-btn-default ml-20 lg-mt-20"
              onClick={handleOpenStats}
            >
              View Stats <ArrowForwardIosOutlinedIcon className="fs-12" />
            </Button>
          )}
        </Box>
        <Box className="xs-hide">
          <FacebookShareButton url={shareUrl} className="pr-5">
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <WhatsappShareButton url={shareUrl} className="pr-5">
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <LinkedinShareButton url={shareUrl} className="pr-5">
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <TwitterShareButton url={shareUrl} className="pr-5">
            <img
              src={require("../assets/twitter.png")}
              alt="Twitter"
              style={{ width: 32, height: 32 }}
            />
          </TwitterShareButton>
        </Box>
      </Box>

      <Modal
        open={showStatsModal}
        onClose={handleCloseStats}
        aria-labelledby="stats-modal-title"
        aria-describedby="stats-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="stats-modal-title" variant="h6" component="h2">
            Statistics
          </Typography>
          <Typography id="stats-modal-description" sx={{ mt: 2 }}>
            {/* Your stats content goes here */}
          </Typography>
          <Button onClick={handleCloseStats}>Close</Button>
        </Box>
      </Modal>
    </Card>
  );
}
