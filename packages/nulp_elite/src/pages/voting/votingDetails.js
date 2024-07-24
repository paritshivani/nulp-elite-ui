import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import ToasterCommon from "../ToasterCommon";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/system";
import VerifiedIcon from "@mui/icons-material/Verified";
const data = require("./polls-detail.json");

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
// import { Button } from "native-base";
import Stack from "@mui/material/Stack";

const VotingDetails = () => {
  // const { eventId } = useParams();
  const shareUrl = window.location.href; // Current page URL

  const queryString = location.search;
  const eventId = queryString.startsWith("?do_") ? queryString.slice(1) : null;

  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterOpen, setToasterOpen] = useState(false);
  const { t } = useTranslation();

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

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };
  };
  const handleGoBack = () => {
    navigate(-1); // Navigate back in history
  };
  return (
    <div>
      <Header />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}

      <Container
        className=" xs-pb-20 mt-12 xss-p-0"
        style={{
          maxWidth: "100%",
          paddingLeft: "14px",
          paddingRight: "14px",
          marginBottom: "20px",
        }}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          className="h6-title mt-15 pl-28 xss-pb-0"
          style={{ padding: "0 0 20px 20px" }}
        >
          <Link
            underline="hover"
            style={{ maxHeight: "inherit" }}
            onClick={handleGoBack}
            color="#004367"
            href="/webapp/votingList"
          >
            {t("LIVE_POLLS")}
          </Link>
          <Link
            underline="hover"
            href=""
            aria-current="page"
            className="h6-title oneLineEllipsis"
          >
            {data.title}
          </Link>
        </Breadcrumbs>
        <Grid
          container
          spacing={2}
          className="bg-whitee custom-event-container mb-20"
        >
          <Grid item xs={3} md={6} lg={2}>
            <img
              src={require("assets/default.png")}
              className="eventCardImg"
              alt="App Icon"
            />
          </Grid>
          <Grid
            item
            xs={9}
            md={6}
            lg={6}
            className="lg-pl-60 xs-pl-30"
            style={{ display: "none" }}
          >
            <Typography gutterBottom className="mt-10  h1-title mb-20 xs-pl-15">
              {data.title}
            </Typography>
            <Box
              className="h5-title mb-20 xs-hide"
              style={{ fontWeight: "400" }}
            >
              #CheerforBhaarat Paris Olympics Survey
            </Box>

            <Box className="pr-5">
              Live until
              <TodayOutlinedIcon className="h3-custom-title pl-10 mt-10" />
              {data.start_date}
            </Box>
            <Box>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="No"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Maybe"
                  />
                </RadioGroup>
              </FormControl>
              <Box>
                <Button type="button" className="custom-btn-primary">
                  {t("SUBMIT_VOTE")}
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={9} md={6} lg={6} className="lg-pl-60 xs-pl-30">
            <Typography gutterBottom className="mt-10  h1-title mb-20 xs-pl-15">
              {data.title}
            </Typography>
            <Box
              className="h5-title mb-20 xs-hide"
              style={{ fontWeight: "400" }}
            >
              #CheerforBhaarat Paris Olympics Survey
            </Box>

            <Box className="pr-5">
              <Box className="h3-custom-title">
                Voting Ended On
                <TodayOutlinedIcon
                  style={{
                    paddingLeft: "50px",
                    fontSize: "16px",
                    verticalAlign: "middle",
                  }}
                  className="h3-custom-title pl-10 mt-10"
                />
                26 July 2024
              </Box>
            </Box>
            <Box className="d-flex alignItems-center my-20">
              <Box className="h3-custom-title">Your Vote</Box>
              <Box className="h3-custom-title pl-10">
                <VerifiedIcon
                  style={{
                    color: "#7995FF",
                    paddingLeft: "50px",
                    fontSize: "16px",
                    verticalAlign: "middle",
                  }}
                />
                Yes
              </Box>
            </Box>
            <Stack
              sx={{ width: "100%", color: "grey.500", marginTop: "20px" }}
              spacing={2}
            >
              <Box className="h3-custom-title d-flex alignItems-center">
                <Box>Yes</Box>
                <LinearProgress
                  style={{
                    height: "10px",
                    borderRadius: "10px",
                    background: "#7995FF",
                    color: "#7995FF",
                    width: "100%",
                    marginLeft: "30px",
                  }}
                />
              </Box>
              <Box className="h3-custom-title d-flex alignItems-center">
                No
                <LinearProgress
                  style={{
                    height: "10px",
                    borderRadius: "10px",
                    background: "#7995FF",
                    color: "#7995FF",
                    width: "100%",
                    marginLeft: "38px",
                  }}
                />
              </Box>
              <Box className="h3-custom-title d-flex alignItems-center">
                Maybe
                <LinearProgress
                  style={{
                    height: "10px",
                    borderRadius: "10px",
                    background: "#7995FF",
                    color: "#7995FF",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                />
              </Box>
            </Stack>
            <Box>
              <Button type="button" className="custom-btn-primary">
                <ShareOutlinedIcon style={{ paddingRight: "10px" }} />{" "}
                {t("SHARE_RESULTS")}
              </Button>
            </Box>
          </Grid>
          {/* <Box className="lg-hide">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel value="male" control={<Radio />} label="No" />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Maybe"
                />
              </RadioGroup>
            </FormControl>
            <Box>
              <Button type="button" className="custom-btn-primary">
                {t("SUBMIT_VOTE")}
              </Button>
            </Box>
          </Box> */}
          <Grid item xs={6} md={6} lg={4} className="text-right xs-hide">
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
                  src={require("../../assets/twitter.png")}
                  alt="Twitter"
                  style={{ width: 32, height: 32 }}
                />
              </TwitterShareButton>
            </Box>
          </Grid>

          <Box
            className="h2-title pl-20 mb-20 mt-20"
            style={{ fontWeight: "600" }}
          >
            {t("About survey")}
          </Box>
          <Box
            className="event-h2-title  pl-20 mb-20"
            style={{ fontWeight: "400" }}
          >
            {data.description}
          </Box>
          <Box className="lg-hide ml-20">
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
                src={require("../../assets/twitter.png")}
                alt="Twitter"
                style={{ width: 32, height: 32 }}
              />
            </TwitterShareButton>
          </Box>
        </Grid>
      </Container>

      <FloatingChatIcon />

      <Footer />
    </div>
  );
};

export default VotingDetails;