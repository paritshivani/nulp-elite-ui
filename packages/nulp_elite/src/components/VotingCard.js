import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
export default function VotingCard({ items }) {
  // const [imgUrl, setImgUrl] = useState();
  const { t } = useTranslation();
  const shareUrl = window.location.href; // Current page URL

  const unixTimestampToHumanDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return dateObject.toLocaleDateString("en-GB", options);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  const formatTimeToIST = (timeString) => {
    // Check if the timeString is a full date-time string
    let dateObject = new Date(timeString);

    // If it is not a valid date, assume it is just a time string (e.g., "14:30")
    if (isNaN(dateObject.getTime())) {
      const [hours, minutes] = timeString.split(":");
      dateObject = new Date();
      dateObject.setHours(hours);
      dateObject.setMinutes(minutes);
      dateObject.setSeconds(0);
    }

    // Convert the date to IST
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };
    return dateObject.toLocaleTimeString("en-GB", options);
  };

  return (
    <Card
      className="cardBox pb-20"
      sx={{ position: "relative", cursor: "pointer", textAlign: "left" }}
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
          <Box>
            <Button type="button" className="custom-btn-default ml-20 lg-mt-20">
              View Stats <ArrowForwardIosOutlinedIcon className="fs-12" />
            </Button>
          </Box>
          <Box>
            <Button type="button" className="custom-btn-primary ml-20 lg-mt-20">
              Vote Now <ArrowForwardIosOutlinedIcon className="fs-12" />
            </Button>
          </Box>
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
    </Card>
  );
}
