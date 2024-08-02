import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate, useLocation } from "react-router-dom";
const urlConfig = require("../../configs/urlConfig.json");
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// const [width, height] = useWindowSize();

import {
  subjectListRegistryService,
  courseRegistryService,
  SunbirdPlayer,
  useWindowSize,
} from "@shiksha/common-lib";

const Player = () => {
  // const { contentId } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const [lessonId, setLessonId] = React.useState();
  const [trackData, setTrackData] = React.useState();
  const { content } = location.state || {};
  const [contentData, setContentData] = useState();
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterOpen, setToasterOpen] = useState(false);
  const [previousRoute, setPreviousRoute] = useState("");
  const [userFirstName, setuserFirstName] = useState("");
  const [userLastName, setuserLastName] = useState("");
  const [courseName, setCourseName] = useState(
    location.state?.coursename || undefined
  );
  const [lesson, setLesson] = React.useState();
  const queryString = location.search;
  const contentId = queryString.startsWith("?do_")
    ? queryString.slice(1)
    : null;
  const handleExitButton = () => {
    setLesson();
    setLessonId();
    if (
      ["assessment", "SelfAssess", "QuestionSet", "QuestionSetImage"].includes(
        type
      )
    ) {
      navigate(-1);
    }
  };
  const fetchUserData = async () => {
    try {
      const userData = await util.userData();
      console.log("user name ----");
      setuserFirstName(userData?.data?.result?.response?.firstName);
      setuserLastName(userData?.data?.result?.response?.lastName);
      if (userDomain) {
        setSelectedDomain(userDomain);
        setDomainName(userDomain);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleTrackData = async (
    { score, trackData, attempts, ...props },
    playerType = "quml"
  ) => {
    console.log(
      "handleTrackData----",
      score,
      trackData,
      attempts,
      ...props,
      playerType
    );
  };
  const handleGoBack = () => {
    const previousRoutes = sessionStorage.getItem("previousRoutes");
    console.log("previousRoutes", previousRoutes);
    navigate(previousRoutes);
  };

  useEffect(() => {
    const previousRoutes = sessionStorage.getItem("previousRoutes");
    console.log("previousRoutes", previousRoutes);
    setPreviousRoute(previousRoutes);
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/content/v1/read/${contentId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }
        const data = await response.json();
        console.log("data-----", data.result.content);
        setLesson(data.result.content);
        // setCourseData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchData();
    fetchUserData();
  }, []);
  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  // Now contentId contains the value from the URL parameter
  return (
    <div>
      <Header />
      <Container maxWidth="xl" role="main" className="player mt-15">
        <Box style={{ textAlign: "right" }}>
          <Link
            underline="hover"
            onClick={handleGoBack}
            color="#004367"
            href={previousRoute}
            className="viewAll"
          >
            {t("BACK")}
          </Link>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box>
              {lesson && (
                <Breadcrumbs
                  aria-label="breadcrumb"
                  style={{
                    padding: "5px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  <Link
                    underline="hover"
                    href=""
                    aria-current="page"
                    color="#484848"
                  >
                    {courseName}
                  </Link>
                </Breadcrumbs>
              )}
              <Box className="h3-title my-10"> {lesson?.name}</Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Link
              href="#"
              style={{
                textAlign: "right",
                marginTop: "20px",
                display: "block",
              }}
            >
              <ShareOutlinedIcon />
            </Link>
          </Grid>
          <Grid>
            {lesson &&
              (lesson.board ||
                lesson.se_boards ||
                lesson.gradeLevel ||
                lesson.se_gradeLevels) && (
                <Box>
                  <Typography
                    className="h6-title pl-20 mb-20"
                    style={{ display: "inline-block", verticalAlign: "super" }}
                  >
                    {t("CONTENT_TAGS")}:{" "}
                  </Typography>

                  {
                    lesson && lesson.board && (
                      // && lesson.board.map((item, index) => (
                      <Button
                        key={`board`}
                        size="small"
                        style={{
                          color: "#424242",
                          fontSize: "10px",
                          margin: "0 10px 3px 6px",
                        }}
                        className="bg-blueShade3"
                      >
                        {lesson.board}
                      </Button>
                    )
                    // ))
                  }
                  {lesson &&
                    lesson.se_boards &&
                    lesson.se_boards.map((item, index) => (
                      <Button
                        key={`se_boards-${index}`}
                        size="small"
                        style={{
                          color: "#424242",
                          fontSize: "10px",
                          margin: "0 10px 3px 6px",
                        }}
                        className="bg-blueShade3"
                      >
                        {item}
                      </Button>
                    ))}
                  {lesson &&
                    lesson.gradeLevel &&
                    lesson.gradeLevel.map((item, index) => (
                      <Button
                        key={`gradeLevel-${index}`}
                        size="small"
                        style={{
                          color: "#424242",
                          fontSize: "10px",
                          margin: "0 10px 3px 6px",
                        }}
                        className="bg-blueShade3"
                      >
                        {item}
                      </Button>
                    ))}
                  {lesson.se_gradeLevels &&
                    lesson.se_gradeLevels.map((item, index) => (
                      <Button
                        key={`se_gradeLevels-${index}`}
                        size="small"
                        style={{
                          color: "#424242",
                          fontSize: "10px",
                          margin: "0 10px 3px 6px",
                        }}
                        className="bg-blueShade3"
                      >
                        {item}
                      </Button>
                    ))}
                </Box>
              )}
          </Grid>
        </Grid>
        {/* <Box>
          <Typography
            variant="h7"
            style={{
              margin: "0 0 9px 0",
              display: "block",
              fontSize: "11px",
            }}
          >
            {t("RELEVANT_FOR")}:
            <Button
              size="small"
              style={{
                background: "#ffefc2",
                color: "#484848",
                fontSize: "10px",
                margin: "0 10px",
              }}
            >
              SWM
            </Button>
            <Button
              size="small"
              style={{
                background: "#ffefc2",
                color: "#484848",
                fontSize: "10px",
              }}
            >
              {" "}
              Sanitation
            </Button>
          </Typography>
        </Box> */}
        <Box
          className="lg-mx-90"
          style={{
            position: "relative",
            paddingBottom: "56.25%", // 16:9 aspect ratio
            height: 0,
            overflow: "hidden",
            maxWidth: "100%",
          }}
        >
          {lesson && (
            <SunbirdPlayer
              // {...{ width, height: height - 64 }}
              // handleExitButton={handleExitButton}
              {...lesson}
              userData={{
                firstName: userFirstName || "",
                lastName: userLastName || "",
              }}
              setTrackData={(data) => {
                if (
                  [
                    "assessment",
                    "SelfAssess",
                    "QuestionSet",
                    "QuestionSetImage",
                  ].includes(type)
                ) {
                  handleTrackData(data);
                } else if (
                  ["application/vnd.sunbird.questionset"].includes(
                    lesson?.mimeType
                  )
                ) {
                  handleTrackData(data, "application/vnd.sunbird.questionset");
                } else if (
                  [
                    "application/pdf",
                    "video/mp4",
                    "video/webm",
                    "video/x-youtube",
                    "application/vnd.ekstep.h5p-archive",
                  ].includes(lesson?.mimeType)
                ) {
                  handleTrackData(data, "pdf-video");
                } else {
                  if (
                    ["application/vnd.ekstep.ecml-archive"].includes(
                      lesson?.mimeType
                    )
                  ) {
                    if (Array.isArray(data)) {
                      const score = data.reduce(
                        (old, newData) => old + newData?.score,
                        0
                      );
                      handleTrackData({ ...data, score: `${score}` }, "ecml");
                      setTrackData(data);
                    } else {
                      handleTrackData({ ...data, score: `0` }, "ecml");
                    }
                  }
                }
              }}
              public_url="https://devnulp.niua.org/newplayer"
              // public_url="https://nulp.niua.org"
            />
          )}
        </Box>
      </Container>
      <FloatingChatIcon />
      <Footer />
    </div>
  );
};

export default Player;
