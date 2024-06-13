import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";

import Grid from "@mui/material/Grid";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import * as util from "../../services/utilService";
const EventDetailResponse = require("./detail.json");

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
const EventDetails = () => {
  const { eventId } = useParams();
  const _userId = util.userId(); // Assuming util.userId() is defined
  const shareUrl = window.location.href; // Current page URL
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterOpen, setToasterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const detalData = EventDetailResponse.result.event;
  console.log("detalData---", detalData);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.EVENT.READ}/do_11405689580730777611`;
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          showErrorMessage(t("FAILED_TO_FETCH_DATA"));
          throw new Error(t("FAILED_TO_FETCH_DATA"));
        }
        const data = await response.json();
        console.log("event data---", data);

        setCreatorId(data?.result?.content?.createdBy);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
      }
    };

    // const fetchBatchData = async () => {
    //   try {
    //     const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.BATCH.GET_BATCHS}`;
    //     const response = await axios.post(url, {
    //       request: {
    //         filters: {
    //           status: "1",
    //           courseId: contentId,
    //           enrollmentType: "open",
    //         },
    //         sort_by: {
    //           createdDate: "desc",
    //         },
    //       },
    //     });

    //     const responseData = response.data;

    //     if (responseData.result.response) {
    //       const { count, content } = responseData.result.response;

    //       if (count === 0) {
    //         // console.warn("This course has no active batches.");
    //         showErrorMessage(t("This course has no active Batches")); // Assuming `showErrorMessage` is used to display messages to the user
    //       } else if (content && content.length > 0) {
    //         const batchDetails = content[0];
    //         setBatchData({
    //           startDate: batchDetails.startDate,
    //           endDate: batchDetails.endDate,
    //           enrollmentEndDate: batchDetails.enrollmentEndDate,
    //           batchId: batchDetails.batchId,
    //         });
    //         setBatchDetails(batchDetails);
    //       } else {
    //         console.error("Batch data not found in response");
    //       }
    //     } else {
    //       console.error("Batch data not found in response");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching batch data:", error);
    //     showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    //   }
    // };

    // const checkEnrolledCourse = async () => {
    //   try {
    //     const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.COURSE.GET_ENROLLED_COURSES}/${_userId}?orgdetails=${appConfig.Course.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.Course.contentApiQueryParams.licenseDetails}&fields=${urlConfig.params.enrolledCourses.fields}&batchDetails=${urlConfig.params.enrolledCourses.batchDetails}`;
    //     const response = await fetch(url);
    //     if (!response.ok) {
    //       showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    //       throw new Error(t("FAILED_TO_FETCH_DATA"));
    //     }
    //     const data = await response.json();
    //     setUserCourseData(data.result);
    //   } catch (error) {
    //     console.error("Error while fetching courses:", error);
    //     showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    //   }
    // };

    fetchData();
    // fetchBatchData();
    // checkEnrolledCourse();
    // getUserData();
  }, []);

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

  // const renderActionButton = () => {
  //   if (isEnrolled() || enrolled) {
  //     if (isIncomplete()) {
  //       return (
  //         <Box>
  //           <Button
  //             onClick={handleLinkClick}
  //             className="custom-btn-primary my-20 mr-5"
  //           >
  //             {t("START_LEARNING")}
  //           </Button>
  //           <Button
  //             onClick={handleLeaveCourseClick} // Open confirmation dialog
  //             className="custom-btn-danger"
  //           >
  //             {t("LEAVE_COURSE")}
  //           </Button>
  //           {showConfirmation && (
  //             <Dialog open={showConfirmation} onClose={handleConfirmationClose}>
  //               <DialogTitle>
  //                 {t("LEAVE_COURSE_CONFIRMATION_TITLE")}
  //               </DialogTitle>
  //               <DialogContent>
  //                 <DialogContentText>
  //                   {t("LEAVE_COURSE_CONFIRMATION_MESSAGE")}
  //                 </DialogContentText>
  //               </DialogContent>
  //               <DialogActions>
  //                 <Button
  //                   onClick={handleConfirmationClose}
  //                   className="custom-btn-default"
  //                 >
  //                   {t("CANCEL")}
  //                 </Button>
  //                 <Button
  //                   onClick={handleLeaveConfirmed}
  //                   className="custom-btn-primary"
  //                   autoFocus
  //                 >
  //                   {t("LEAVE_COURSE")}
  //                 </Button>
  //               </DialogActions>
  //             </Dialog>
  //           )}
  //         </Box>
  //       );
  //     } else {
  //       return (
  //         <Button onClick={handleLinkClick} className="custom-btn-primary">
  //           {t("START_LEARNING")}
  //         </Button>
  //       );
  //     }
  //   } else {
  //     if (
  //       (batchData?.enrollmentEndDate &&
  //         new Date(batchData.enrollmentEndDate) < new Date()) ||
  //       (!batchData?.enrollmentEndDate &&
  //         batchData?.endDate &&
  //         new Date(batchData.endDate) < new Date())
  //     ) {
  //       return (
  //         <Typography
  //           variant="h7"
  //           style={{
  //             margin: "12px 0",
  //             display: "block",
  //             fontSize: "14px",
  //             color: "red",
  //           }}
  //         >
  //           {t("BATCH_EXPIRED_MESSAGE")}
  //         </Typography>
  //       );
  //     } else {
  //       const today = new Date();
  //       let lastDayOfEnrollment = null;

  //       if (batchData?.enrollmentEndDate) {
  //         const enrollmentEndDate = new Date(batchData.enrollmentEndDate);
  //         if (!isNaN(enrollmentEndDate.getTime())) {
  //           lastDayOfEnrollment = enrollmentEndDate;
  //         }
  //       }

  //       const isLastDayOfEnrollment =
  //         lastDayOfEnrollment &&
  //         lastDayOfEnrollment.toDateString() === today.toDateString();

  //       const isExpired =
  //         lastDayOfEnrollment &&
  //         lastDayOfEnrollment < formatDate(today) &&
  //         !isLastDayOfEnrollment;

  //       if (isExpired) {
  //         return (
  //           <Typography
  //             variant="h7"
  //             style={{
  //               margin: "12px 0",
  //               display: "block",
  //               fontSize: "14px",
  //               color: "red",
  //             }}
  //           >
  //             {t("BATCH_EXPIRED_MESSAGE")}
  //           </Typography>
  //         );
  //       }

  //       return (
  //         <Button
  //           onClick={handleJoinAndOpenModal}
  //           // onClick={handleOpenModal}
  //           disabled={isExpired} // Only disable if expired (not on last day)
  //           className="custom-btn-primary my-20"
  //           style={{
  //             background: isExpired ? "#ccc" : "#004367",
  //           }}
  //         >
  //           {t("JOIN_COURSE")}
  //         </Button>
  //       );
  //     }
  //   }
  // };

  const getUserData = async () => {
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.USER.GET_PROFILE}${_userId}?fields=${urlConfig.params.userReadParam.fields}`;

      const response = await fetch(url, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzVGRIUkFpTUFiRHN1SUhmQzFhYjduZXFxbjdyQjZrWSJ9.MotRsgyrPzt8O2jp8QZfWw0d9iIcZz-cfNYbpifx5vs",
        },
      });
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

      <Container maxWidth="xxl" role="main" className="xs-pr-0 xs-pb-20 mt-12">
        <Grid container spacing={2}></Grid>
      </Container>
      <FloatingChatIcon />
      <Footer />
    </div>
  );
};

export default EventDetails;
