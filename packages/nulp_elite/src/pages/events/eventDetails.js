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

import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import * as util from "../../services/utilService";
const EventDetailResponse = require("./detail.json");
import axios from "axios";

const urlConfig = require("../../configs/urlConfig.json");

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
import AddConnections from "pages/connections/AddConnections";
import { Button } from "native-base";
import { maxWidth } from "@shiksha/common-lib";
const EventDetails = () => {
  const { eventId } = useParams();
  const _userId = util.userId()
    ? util.userId()
    : "44e13b6a-e5d2-4b23-89fe-c80c4880abcb"; // Assuming util.userId() is defined

  const shareUrl = window.location.href; // Current page URL
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterOpen, setToasterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [detailData, setDetailDate] = useState();
  const [userCourseData, setUserCourseData] = useState({});
  const [userInfo, setUserInfo] = useState();

  const { t } = useTranslation();
  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const unixTimestampToHumanDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return dateObject.toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.EVENT.READ}/${eventId}`;
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzVGRIUkFpTUFiRHN1SUhmQzFhYjduZXFxbjdyQjZrWSJ9.MotRsgyrPzt8O2jp8QZfWw0d9iIcZz-cfNYbpifx5vs",
          },
        });
        if (!response.ok) {
          showErrorMessage(t("FAILED_TO_FETCH_DATA"));
          throw new Error(t("FAILED_TO_FETCH_DATA"));
        }
        const data = await response.json();
        console.log("event data---", data);
        setDetailDate(data.result.event);

        // setCreatorId(data?.result?.content?.createdBy);
        // setUserData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
      }
    };

    fetchData();
    fetchBatchData();
    checkEnrolledCourse();
    getUserData();
    isEnrolled();
    console.log("isEnrolled---", isEnrolled());
  }, []);
  const isEnrolled = () => {
    console.log("userCourseData----", userCourseData);
    return (
      userCourseData &&
      userCourseData.courses &&
      userCourseData.courses.some((course) => course.contentId === eventId)
    );
  };

  const fetchBatchData = async () => {
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.BATCH.GET_BATCHS}`;
      const response = await axios.post(url, {
        request: {
          filters: {
            status: "1",
            courseId: eventId,
            enrollmentType: "open",
          },
          sort_by: {
            createdDate: "desc",
          },
        },
      });

      const responseData = response.data;

      if (responseData.result.response) {
        const { count, content } = responseData.result.response;
        console.log(
          "responseData.result.response------",
          responseData.result.response
        );
        if (count === 0) {
          // console.warn("This course has no active batches.");
          showErrorMessage(t("This course has no active Batches")); // Assuming `showErrorMessage` is used to display messages to the user
        } else if (content && content.length > 0) {
          const batchDetails = content[0];
          console.log("batchDetails-----", batchDetails);
          // setBatchData({
          //   startDate: batchDetails.startDate,
          //   endDate: batchDetails.endDate,
          //   enrollmentEndDate: batchDetails.enrollmentEndDate,
          //   batchId: batchDetails.batchId,
          // });
          // setBatchDetails(batchDetails);
        } else {
          console.error("Batch data not found in response");
        }
      } else {
        console.error("Batch data not found in response");
      }
    } catch (error) {
      console.error("Error fetching batch data:", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };
  const checkEnrolledCourse = async () => {
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.COURSE.GET_ENROLLED_COURSES}/${_userId}?orgdetails=${appConfig.Course.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.Course.contentApiQueryParams.licenseDetails}&fields=${urlConfig.params.enrolledCourses.fields}&batchDetails=${urlConfig.params.enrolledCourses.batchDetails}`;
      const response = await fetch(url);
      if (!response.ok) {
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
        throw new Error(t("FAILED_TO_FETCH_DATA"));
      }
      const data = await response.json();
      setUserCourseData(data.result);
    } catch (error) {
      console.error("Error while fetching courses:", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };
  const handleGoBack = () => {
    navigate(-1); // Navigate back in history
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
  const getUserData = async () => {
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.USER.GET_PROFILE}${_userId}?fields=${urlConfig.params.userReadParam.fields}`;

      const response = await fetch(
        url
        //    {
        //   headers: {
        //     Authorization:
        //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzVGRIUkFpTUFiRHN1SUhmQzFhYjduZXFxbjdyQjZrWSJ9.MotRsgyrPzt8O2jp8QZfWw0d9iIcZz-cfNYbpifx5vs",
        //   },
        // }
      );
      const data = await response.json();
      setUserInfo(data.result.response);
    } catch (error) {
      console.error("Error while getting user data:", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };

  return (
    <div>
      <Header />

      {detailData && (
        <Container
          className=" xs-pr-0 xs-pb-20 mt-12"
          style={{
            maxWidth: "100%",
            paddingLeft: "14px",
            paddingRight: "14px",
            marginBottom: "20px",
          }}
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            className="h6-title mt-15 pl-28"
            style={{ padding: "0 0 20px 20px" }}
          >
            <Link
              underline="hover"
              style={{ maxHeight: "inherit" }}
              onClick={handleGoBack}
              color="#004367"
              href="/all"
            >
              {t("ALL_WEBINARS")}
            </Link>
            <Link
              underline="hover"
              href=""
              aria-current="page"
              className="h6-title oneLineEllipsis"
            >
              {detailData.name}
            </Link>
          </Breadcrumbs>
          <Grid
            container
            spacing={2}
            className="bg-whitee mt-20 custom-event-container mb-20"
          >
            <Grid item xs={6} md={6} lg={2}>
              {/* <img
              src={
                EventDetailResponse.appIcon
                  ? EventDetailResponse.appIcon
                  : require("assets/default.png")
              }
              className="event-card-img"
              alt="App Icon"
            /> */}
              <img
                src={require("assets/default.png")}
                className="eventCardImg"
                alt="App Icon"
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} style={{ paddingLeft: "60px" }}>
              <Typography gutterBottom className="mt-10  h1-title mb-20">
                {detailData.name}
              </Typography>
              <Box className="h5-title mb-20" style={{ fontWeight: "400" }}>
                National Urban Learning Platform{" "}
              </Box>
              <Box className="d-flex mb-20 alignItems-center">
                <Box className="h5-title">Organised By:</Box>
                <Box className="d-flex alignItems-center pl-20">
                  <Box className="event-text-circle"></Box>
                  <Box className="h5-title">Komal Mane</Box>
                </Box>
              </Box>

              <Box className="d-flex mb-20 h3-custom-title">
                <Box className="d-flex jc-bw alignItems-center">
                  <TodayOutlinedIcon className="h3-custom-title pr-5" />
                  {formatDate(detailData.startDate)}
                </Box>
                <Box className="d-flex jc-bw alignItems-center pl-5 pr-5">
                  <AccessAlarmsOutlinedIcon className="h3-custom-title pr-5" />

                  {formatTimeToIST(detailData.startTime)}
                </Box>
                <Box className="mx-15">To</Box>
                <Box className="d-flex jc-bw alignItems-center">
                  <TodayOutlinedIcon className="h3-custom-title pr-5" />
                  {formatDate(detailData.endDate)}
                </Box>
                <Box className="d-flex jc-bw alignItems-center pl-5 pr-5">
                  <AccessAlarmsOutlinedIcon className="h3-custom-title pr-5" />

                  {formatTimeToIST(detailData.endTime)}
                </Box>
              </Box>
              <Box>
                <Button
                  type="button"
                  className="custom-btn-success"
                  style={{
                    borderRadius: "30px",
                    color: "#fff",
                    padding: "10px 35px",
                    fontWeight: "500",
                    fontSize: "12px",
                    border: "solid 1px #1faf38",
                    background: "#1faf38",
                    marginTop: "10px",
                  }}
                >
                  {t("JOIN_WEBINAR")}
                </Button>
              </Box>
              <Box className="d-flex">
                <Button type="button" className="custom-btn-primary mr-20">
                  {t("ATTEND_WEBINAR")}
                </Button>
                <Button type="button" className="custom-btn-danger">
                  {t("UN_REGISTER_WEBINAR")}
                </Button>
              </Box>
              <Box>
                <Button
                  type="button"
                  className="custom-btn-success"
                  startIcon={<AdjustOutlinedIcon />}
                >
                  {t("VIEW_WEBINAR_RECORDING")}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6} md={6} lg={4} className="text-right">
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
              className="h2-title lg-event-margin"
              style={{ fontWeight: "600", width: "100%" }}
            >
              {t("SPEAKER_DETAILS")}
            </Box>
            <Grid container spacing={2} className="pl-20 mb-20">
              <Grid item xs={6} md={6} lg={3}>
                <Box className="d-flex">
                  <img
                    src={require("../../assets/speakerOne.png")}
                    className="eventImg"
                  />
                  <Box className="pl-20">
                    <Box className="h5-title">Name Surname</Box>
                    <Box className="h5-title">Designation</Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} md={6} lg={3}>
                <Box className="d-flex">
                  <img
                    src={require("../../assets/speakertwo.png")}
                    className="eventImg"
                  />
                  <Box className="pl-20">
                    <Box className="h5-title">Name Surname</Box>
                    <Box className="h5-title">Designation</Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} md={6} lg={3}>
                <Box className="d-flex">
                  <img
                    src={require("../../assets/speakerthree.png")}
                    className="eventImg"
                  />
                  <Box className="pl-20">
                    <Box className="h5-title">Name Surname</Box>
                    <Box className="h5-title">Designation</Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box className="h2-title pl-20 mb-20" style={{ fontWeight: "600" }}>
              {t("WEBINAR_DETAILS")}
            </Box>
            <Box
              className="event-h2-title  pl-20 mb-20"
              style={{ fontWeight: "400" }}
            >
              {detailData.description}
            </Box>
          </Grid>
        </Container>
      )}
      <FloatingChatIcon />
      <Footer />
    </div>
  );
};

export default EventDetails;
