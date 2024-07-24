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
import LinearProgress from "@mui/material/LinearProgress";

import ToasterCommon from "../ToasterCommon";

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
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddConnections from "pages/connections/AddConnections";
// import { Button } from "native-base";
import { maxWidth } from "@shiksha/common-lib";
import VerifiedIcon from "@mui/icons-material/Verified";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const VotingDetails = () => {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const [open, setOpen] = React.useState(false);

  // const { eventId } = useParams();
  const shareUrl = window.location.href; // Current page URL

  const queryString = location.search;
  const eventId = queryString.startsWith("?do_") ? queryString.slice(1) : null;

  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterOpen, setToasterOpen] = useState(false);
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

      <Container maxWidth="xl" role="main" className=" xs-pb-20 mt-12">
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
            href="/webapp/allevents"
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
            India will win the Gold Medal for at least 5 sports this year
          </Link>
        </Breadcrumbs>
        <Grid
          container
          spacing={2}
          className="bg-whitee custom-event-container mb-20 xs-container"
        >
          <Grid item xs={3} md={6} lg={2} className="lg-pl-5 xs-pl-0">
            <img
              src={require("assets/default.png")}
              className="eventCardImg"
              alt="App Icon"
            />
            {/* <Box>
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
            </Box> */}
          </Grid>
          {/* <Grid item xs={9} md={6} lg={6} className="lg-pl-60 xs-pl-30">
            <Typography gutterBottom className="mt-10  h1-title mb-20 xs-pl-15">
              {data.title}
            </Typography>
            <Box
              className="h5-title mb-20 xs-hide"
              style={{ fontWeight: "400" }}
            >
              #CheerforBhaarat Paris Olympics Survey
            </Box>

            <Box className="pr-5 h3-custom-title">
              <span className=" h3-custom-title"> Live until</span>
              <TodayOutlinedIcon
                className="h3-custom-title pl-10 mt-10"
                style={{ verticalAlign: "middle" }}
              />
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
          </Grid> */}
          <Grid item xs={9} md={6} lg={6} className="lg-pl-60 xs-pl-30">
            <Box width="100%"></Box>
            <Typography gutterBottom className="mt-10  h1-title mb-20 ellsp">
              {data.title}
              India will win the Gold Medal for at least 5 sports this year
            </Typography>
            <Box
              className="h5-title mb-20 xs-hide"
              style={{ fontWeight: "400" }}
            >
              #CheerforBhaarat Paris Olympics Survey
            </Box>

            <Box className="pr-5">
              <span className=" h3-custom-title"> Voting Ended On</span>
              <TodayOutlinedIcon
                className="h3-custom-title pl-10 mt-10"
                style={{ verticalAlign: "middle" }}
              />
              <span className="h3-custom-title ">
                {data.start_date} 26 July 2024
              </span>
            </Box>
            <Box className="pr-5 my-20">
              <span className=" h3-custom-title"> Your Vote</span>
              <VerifiedIcon
                className="h3-custom-title pl-10 mt-10 icon-blue"
                style={{ verticalAlign: "middle" }}
              />
              <span className="h3-custom-title ">Yes</span>
            </Box>
            <Box sx={{ width: "100%" }} className="xs-hide">
              <Box
                sx={{ width: "100%" }}
                className="voting-option my-10 progressOne"
              >
                <span
                  className=" h3-custom-title"
                  style={{ paddingRight: "33px" }}
                >
                  {" "}
                  Yes
                </span>{" "}
                <LinearProgressWithLabel value={progress} />
              </Box>
              <Box
                sx={{ width: "100%" }}
                className="voting-option my-10 progressTwo"
              >
                <span
                  className=" h3-custom-title"
                  style={{ paddingRight: "33px" }}
                >
                  {" "}
                  No
                </span>{" "}
                <LinearProgressWithLabel value={progress} />
              </Box>
              <Box
                sx={{ width: "100%" }}
                className="voting-option my-10 progressThree"
              >
                <span className=" h3-custom-title"> MayBe</span>{" "}
                <LinearProgressWithLabel value={progress} />
              </Box>
              <Box className="mt-20">
                <Button
                  type="button"
                  className="custom-btn-primary"
                  onClick={handleClickOpen}
                >
                  {t("SHARE_RESULTS")}{" "}
                  <ShareOutlinedIcon
                    style={{ color: "#fff", paddingLeft: "10px" }}
                  />
                </Button>
              </Box>
            </Box>
          </Grid>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Grid
                container
                spacing={2}
                className="custom-event-container mb-20 mt-15"
                style={{ paddingRight: "10px" }}
              >
                <Grid item xs={9} md={6} lg={9}>
                  <Typography
                    gutterBottom
                    className="mt-10  h1-title mb-20 xs-pl-15 ellsp"
                  >
                    {data.title}
                    India will win the Gold Medal for at least 5 sports this
                    year
                  </Typography>
                  <Box
                    className="h5-title mb-20 xs-hide"
                    style={{ fontWeight: "400" }}
                  >
                    #CheerforBhaarat Paris Olympics Survey
                  </Box>

                  <Box className="pr-5">
                    <span className=" h3-custom-title"> Voting Ended On</span>
                    <TodayOutlinedIcon
                      className="h3-custom-title pl-10 mt-10"
                      style={{ verticalAlign: "middle" }}
                    />
                    <span className="h3-custom-title ">
                      {data.start_date} 26 July 2024
                    </span>
                  </Box>
                </Grid>
                <Grid item xs={3} md={6} lg={3}>
                  <img
                    src={require("assets/default.png")}
                    className="appicon"
                    alt="App Icon"
                  />
                </Grid>
                <Box>
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{ width: "100%" }}
                      className="voting-option my-10 progressOne"
                    >
                      <span
                        className=" h3-custom-title"
                        style={{ paddingRight: "33px" }}
                      >
                        {" "}
                        Yes
                      </span>{" "}
                      <LinearProgressWithLabel value={progress} />
                    </Box>
                    <Box
                      sx={{ width: "100%" }}
                      className="voting-option my-10 progressTwo"
                    >
                      <span
                        className=" h3-custom-title"
                        style={{ paddingRight: "33px" }}
                      >
                        {" "}
                        No
                      </span>{" "}
                      <LinearProgressWithLabel value={progress} />
                    </Box>
                    <Box
                      sx={{ width: "100%" }}
                      className="voting-option my-10 progressThree"
                    >
                      <span className=" h3-custom-title"> MayBe</span>{" "}
                      <LinearProgressWithLabel value={progress} />
                    </Box>
                    <Box className="mt-20">
                      <Button
                        type="button"
                        className="custom-btn-primary"
                        onClick={handleClickOpen}
                      >
                        {t("SHARE_RESULTS")}{" "}
                        <ShareOutlinedIcon
                          style={{ color: "#fff", paddingLeft: "10px" }}
                        />
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </DialogContent>
          </BootstrapDialog>
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
          <Box className="lg-hide" sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{ width: "100%" }}
                className="voting-option my-10 progressOne"
              >
                <span
                  className=" h3-custom-title"
                  style={{ paddingRight: "33px" }}
                >
                  {" "}
                  Yes
                </span>{" "}
                <LinearProgressWithLabel value={progress} />
              </Box>
              <Box
                sx={{ width: "100%" }}
                className="voting-option my-10 progressTwo"
              >
                <span
                  className=" h3-custom-title"
                  style={{ paddingRight: "33px" }}
                >
                  {" "}
                  No
                </span>{" "}
                <LinearProgressWithLabel value={progress} />
              </Box>
              <Box
                sx={{ width: "100%" }}
                className="voting-option my-10 progressThree"
              >
                <span className=" h3-custom-title"> MayBe</span>{" "}
                <LinearProgressWithLabel value={progress} />
              </Box>
            </Box>
            <Box className="mt-20">
              <Button type="button" className="custom-btn-primaryy">
                {t("SHARE_RESULTS")}{" "}
                <ShareOutlinedIcon
                  style={{ color: "#fff", paddingLeft: "10px" }}
                />
              </Button>
            </Box>
          </Box>
          <Box style={{ display: "block", width: "100%" }}></Box>
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
