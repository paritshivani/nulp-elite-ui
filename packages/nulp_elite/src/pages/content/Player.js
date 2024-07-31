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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


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
  const [ previousRoute ,setPreviousRoute] = useState("")
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
  const handleTrackData = async (
    { score, trackData, attempts, ...props },
    playerType = "quml"
  ) => {
    // let data = {};
    // const programData = await subjectListRegistryService.getProgramId();
    // if (playerType === "quml") {
    //   const newFormatData = trackData.reduce((oldData, newObj) => {
    //     const dataExist = oldData.findIndex(
    //       (e) => e.sectionId === newObj["item"]["sectionId"]
    //     );
    //     if (dataExist >= 0) {
    //       oldData[dataExist]["data"].push(newObj);
    //     } else {
    //       oldData = [
    //         ...oldData,
    //         {
    //           sectionId: newObj["item"]["sectionId"],
    //           sectionName: newObj["sectionName"] ? newObj["sectionName"] : "",
    //           data: [newObj],
    //         },
    //       ];
    //     }
    //     return oldData;
    //   }, []);
    //   data = {
    //     courseId: id,
    //     moduleId: id,
    //     lessonId: id,
    //     status: "completed",
    //     score: score,
    //     scoreDetails: JSON.stringify(newFormatData),
    //     program: programData?.programId,
    //     subject: lesson?.subject?.join(","),
    //   };
    // } else {
    //   data = {
    //     courseId: id,
    //     moduleId: lessonId?.parent,
    //     lessonId: lessonId?.identifier,
    //     status: "completed",
    //     score: score ? score : 0,
    //     scoreDetails: JSON.stringify(props),
    //     program: programData?.programId,
    //     subject: lessons?.subject?.join(","),
    //   };
    // }
    // courseRegistryService.lessontracking(data);
  };
   const handleGoBack = () => {
    const previousRoutes = sessionStorage.getItem("previousRoutes");
    console.log("previousRoutes",previousRoutes);
    navigate(previousRoutes);
  };

  useEffect(() => {
    const previousRoutes = sessionStorage.getItem("previousRoutes");
    console.log("previousRoutes",previousRoutes);
    setPreviousRoute(previousRoutes)
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/content/v1/read/${contentId}?fields=transcripts,ageGroup,appIcon,artifactUrl,attributions,attributions,audience,author,badgeAssertions,board,body,channel,code,concepts,contentCredits,contentType,contributors,copyright,copyrightYear,createdBy,createdOn,creator,creators,description,displayScore,domain,editorState,flagReasons,flaggedBy,flags,framework,gradeLevel,identifier,itemSetPreviewUrl,keywords,language,languageCode,lastUpdatedOn,license,mediaType,medium,mimeType,name,originData,osId,owner,pkgVersion,publisher,questions,resourceType,scoreDisplayConfig,status,streamingUrl,subject,template,templateId,totalQuestions,totalScore,versionKey,visibility,year,primaryCategory,additionalCategories,interceptionPoints,interceptionType&orgdetails=orgName,email&licenseDetails=name,description,url`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
      <Container maxWidth="xl" role="main" className="container-pb player">
        <Grid container spacing={2}>
          <Grid item xs={8}>
             {lesson && (
              <Breadcrumbs
                aria-label="breadcrumb"
                style={{
                  padding: "25px 0",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                 <Link
                  underline="hover"
                  style={{ maxHeight: "inherit" }}
                  onClick={handleGoBack}
                  color="#004367"
                  href={previousRoute}
                >
            <ArrowBackIosNewIcon style={{ fontSize: 15 }} />
                  {t("BACK")}
                  
                </Link>
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
              <Box className="h3-title my-10">
              {" "}
              {lesson?.name}
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
        <Box className="lg-mx-90">
          {lesson && (
            <SunbirdPlayer
              // {...{ width, height: height - 64 }}
              // handleExitButton={handleExitButton}
              {...lesson}
              userData={{
                firstName: "Shivani",
                lastName: "",
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
