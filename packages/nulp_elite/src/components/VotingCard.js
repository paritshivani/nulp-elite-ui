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
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import axios from "axios";
const urlConfig = require("../configs/urlConfig.json");
import moment from "moment";
import LinearProgress from "@mui/material/LinearProgress";

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
export default function VotingCard({ items, index, onClick }) {
  const { t } = useTranslation();
  const shareUrl = window.location.href; // Current page URL
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [poll, setPoll] = useState(null);
  const [pollResult, setPollResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(10);

  const handleClickOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
    if (items.poll_id) {
      fetchPoll(items.poll_id);
    }
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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

  const fetchPoll = async (pollId) => {
    try {
      const response = await axios.get(
        `${urlConfig.URLS.POLL.GET_POLL}?poll_id=${pollId}`
      );
      setPoll(response.data.result.poll);
      setPollResult(response.data.result.result);
    } catch (error) {
      console.error("Error fetching poll", error);
    }
  };
  const totalVotes = pollResult?.reduce((sum, option) => sum + option.count, 0);

  const getProgressValue = (count) =>
    totalVotes > 0 ? (count / totalVotes) * 100 : 0;

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
              onClick={handleClickOpen}
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
          {poll && (
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
                  {poll.title}
                </Typography>

                <Box className="pr-5">
                  <span className=" h3-custom-title"> Voting Ended On</span>
                  <TodayOutlinedIcon
                    className="h3-custom-title pl-10 mt-10"
                    style={{ verticalAlign: "middle" }}
                  />
                  <span className="h3-custom-title ">
                    {moment(poll.end_date).format(
                      "dddd, MMMM Do YYYY, h:mm:ss a"
                    )}
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
              <Box style={{ paddingLeft: "18px", width: "100%" }}>
                <Box sx={{ width: "100%" }}>
                  {pollResult?.map((option, index) => (
                    <Box
                      key={index}
                      sx={{ width: "100%" }}
                      className={`voting-option my-10 progress${index}`}
                    >
                      <span
                        className="h3-custom-title"
                        style={{ paddingRight: "33px" }}
                      >
                        {option.poll_option}
                      </span>
                      <LinearProgressWithLabel
                        value={getProgressValue(option.count)}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          )}
        </DialogContent>
      </BootstrapDialog>
    </Card>
  );
}
