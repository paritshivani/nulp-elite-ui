import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ToasterCommon from "../ToasterCommon";
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
import axios from "axios";
import * as util from "../../services/utilService";

const VotingDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [pollData, setPollData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterOpen, setToasterOpen] = useState(false);
  const shareUrl = window.location.href; // Current page URL

  const queryString = location.search;
  const pollId = queryString.startsWith("?do_") ? queryString.slice(1) : null;
  const _userId = util.userId();
  const [pollUserData, setUserPollData] = useState([]);

  useEffect(() => {
    if (pollId) {
      fetchPollData(pollId);
      fetchUserPollData(pollId, _userId);
    }
  }, [pollId]);

  const fetchPollData = async (pollId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/polls/get_poll?poll_id=${pollId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPollData(response.data.result.poll);
    } catch (error) {
      console.error("Error fetching poll data", error);
    }
  };
  const fetchUserPollData = async (pollId, _userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/polls/user/get_user_poll?poll_id=${pollId}&user_id=${_userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("uuuuuuuuuuuuuuuuuuuuu", response.data.result);
      setUserPollData(response.data.result);
    } catch (error) {
      console.error("Error fetching poll data", error);
    }
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmitVote = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/polls/user/create",
        {
          poll_id: pollId,
          user_id: _userId,
          poll_submitted: true,
          poll_result: selectedOption,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToasterMessage(response.data.message || "Vote submitted successfully");
      setToasterOpen(true);
    } catch (error) {
      console.error("Error submitting vote", error);
      setToasterMessage("Error submitting vote");
      setToasterOpen(true);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back in history
  };

  if (!pollData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}

      {pollData && (
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
              {pollData.title}
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
              <Box className="lg-hide">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={selectedOption}
                    onChange={handleOptionChange}
                    name="radio-buttons-group"
                  >
                    {pollData?.poll_options?.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <Box>
                  <Button
                    type="button"
                    className="custom-btn-primary"
                    onClick={handleSubmitVote}
                  >
                    {t("SUBMIT_VOTE")}
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={9} md={6} lg={6} className="lg-pl-60 xs-pl-30">
              <Typography
                gutterBottom
                className="mt-10  h1-title mb-20 xs-pl-15"
              >
                {pollData.title}
              </Typography>
              {/* <Box
                  className="h5-title mb-20 xs-hide"
                  style={{ fontWeight: "400" }}
                >
                  #CheerforBhaarat Paris Olympics Survey
                </Box> */}

              <Box className="pr-5">
                Live until
                <TodayOutlinedIcon className="h3-custom-title pl-10 mt-10" />
                {pollData.end_date}
              </Box>
              <Box className="xs-hide">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={selectedOption}
                    onChange={handleOptionChange}
                    name="radio-buttons-group"
                  >
                    {pollData?.poll_options?.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <Box>
                  <Button
                    type="button"
                    className="custom-btn-primary"
                    onClick={handleSubmitVote}
                  >
                    {t("SUBMIT_VOTE")}
                  </Button>
                </Box>
              </Box>
            </Grid>

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
              {pollData.description}
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
      )}
      <FloatingChatIcon />

      <Footer />
    </div>
  );
};

export default VotingDetails;
