import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Divider } from "native-base";
// import RandomImage from "../assets/cardRandomImgs.json";
import { useTranslation } from "react-i18next";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
const processString = (str) => {
  return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
};
export default function EventCard({ items, index, onClick }) {
  // const [imgUrl, setImgUrl] = useState();
  const [subdomain, setSubdomain] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (items.se_gradeLevels) {
      setSubdomain(processString(items.se_gradeLevels[0]));
    } else if (items.gradeLevel) {
      setSubdomain(processString(items.gradeLevel[0]));
    } else {
      setSubdomain(undefined);
    }
    // setImgUrl(RandomImage.ImagePaths[index % 10 || 10]);
  }, [items, index]);

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
  if (items.content) {
    return (
      <Card
        className="cardBox"
        sx={{ position: "relative", cursor: "pointer" }}
        onClick={onClick}
      >
        <CardMedia
          className="card-media"
          image={
            subdomain
              ? require(`./../assets/cardBanner/${subdomain}.png`)
              : require("./../assets/cardBanner/management.png")
          }
          title="green iguana"
        />
        <div onClick={onClick} className="card-div"></div>
        <CardContent>
          {items.content.primaryCategory && (
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              className="ribbonCard"
            >
              <Box className="cardCourses">{items.content.primaryCategory}</Box>
            </Typography>
          )}
          <Box className="event-img-container">
            <img
              src={
                items.content.appIcon
                  ? items.content.appIcon
                  : require("assets/default.png")
              }
              className="card-img"
              alt="Content App Icon"
            />
          </Box>
          {items.content.name && (
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="cardTitle mt-20"
            >
              {items.content.name}
            </Typography>
          )}
          {items.enrolledDate && (
            <Typography
              variant="body2"
              color="#5B5B5B"
              style={{ fontSize: "11px", padding: "10px 0", textAlign: "left" }}
            >
              <Box>
                {t("ENROLLED_ON")} :{" "}
                {unixTimestampToHumanDate(items.enrolledDate)}
              </Box>
            </Typography>
          )}
        </CardContent>
        <Box className="my-10 pl-20">
          <Typography
            style={{
              marginTop: "10px",
              color:
                items.status === 2
                  ? "#065872"
                  : items.status === 1
                  ? "#579b00"
                  : "#FF0000",
              fontSize: "12px",
              padding: "10px 0",
              textAlign: "left",
              fontWeight: "500",
            }}
          >
            {items.status === 2
              ? t("Completed")
              : items.status === 1
              ? t("ongoing")
              : t("Expired")}
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      className="cardBox pb-20"
      sx={{ position: "relative", cursor: "pointer", textAlign: "left" }}
      onClick={onClick}
    >
      {/* <CardMedia className="card-media" title="green iguana" /> */}
      {/* <div onClick={onClick} className="card-div"></div> */}
      <CardContent className="d-flex" style={{
                justifyContent: "space-between",
              }}>
        <Box>
          {items.name && (
            <Typography gutterBottom className="mt-10  event-title" >
              {items.name}
            </Typography>
          )}
          <Box className="d-flex h6-title mt-30" style={{ color: "#484848" }}>
            <Box className="d-flex alignItems-center">
              <TodayOutlinedIcon className="fs-12 pr-5" />
              {formatDate(items.startDate)}
            </Box>
            <Box className="d-flex alignItems-center pl-5 pr-5">
              <AccessAlarmsOutlinedIcon className="fs-12 pr-5" />

              {formatTimeToIST(items.startTime)}
            </Box>
          </Box>
        </Box>
        <Box className="card-img-container" style={{ position: "inherit" }}>
          <img
            src={items.appIcon ? items.appIcon : require("assets/default.png")}
            className="event-card-img"
            alt="App Icon"
          />
        </Box>
      </CardContent>
      <Box>
        <Button type="button" className="custom-btn-default ml-20 lg-mt-20">
          {t("VIEW DETAILS")} <ArrowForwardIosOutlinedIcon className="fs-12" />
        </Button>
      </Box>
    </Card>
  );
}
