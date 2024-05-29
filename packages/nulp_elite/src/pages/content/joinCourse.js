import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Grid from "@mui/material/Grid";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import * as util from "../../services/utilService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import data from "../../assets/courseHierarchy.json";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";

import appConfig from "../../configs/appConfig.json";
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";
import { TextField } from "@mui/material";
import Chat from "pages/connections/chat";
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
const JoinCourse = () => {
  const { t } = useTranslation();
  const [courseData, setCourseData] = useState();
  const [batchData, setBatchData] = useState();
  const [batchDetails, setBatchDetails] = useState();
  const [userCourseData, setUserCourseData] = useState({});
  const [showEnrollmentSnackbar, setShowEnrollmentSnackbar] = useState(false);
  const [showConsentForm, setShowConsentForm] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setCourseProgress] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [consentChecked, setConsentChecked] = useState(false);
  const [shareEnabled, setShareEnabled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([]);
  const [formData, setFormData] = useState({
    message: "",
  });
  const [showChat, setShowChat] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  // const { contentId } = location.state || {};
  const { contentId } = useParams();
  const _userId = util.userId(); // Assuming util.userId() is defined
  const shareUrl = window.location.href; // Current page URL
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
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
        const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.COURSE.HIERARCHY}/${contentId}?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.ContentPlayer.contentApiQueryParams.licenseDetails}`;
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

        setCreatorId(data?.result?.content?.createdBy);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
      }
    };

    const fetchBatchData = async () => {
      try {
        const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.BATCH.GET_BATCHS}`;
        const response = await axios.post(url, {
          request: {
            filters: {
              status: "1",
              courseId: contentId,
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

          if (count === 0) {
            // console.warn("This course has no active batches.");
            showErrorMessage(t("This course has no active Batches")); // Assuming `showErrorMessage` is used to display messages to the user
          } else if (content && content.length > 0) {
            const batchDetails = content[0];
            setBatchData({
              startDate: batchDetails.startDate,
              endDate: batchDetails.endDate,
              enrollmentEndDate: batchDetails.enrollmentEndDate,
              batchId: batchDetails.batchId,
            });
            setBatchDetails(batchDetails);
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

    fetchData();
    fetchBatchData();
    checkEnrolledCourse();
    getUserData();
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const url = `${
          urlConfig.URLS.DIRECT_CONNECT.GET_CHATS
        }?sender_id=${_userId}&receiver_id=${creatorId}&is_connection=${true}`;

        const response = await axios.get(url, {
          withCredentials: true,
        });
        console.log("chatResponse", response.data.result || []);
        setChat(response.data.result || []);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    const getCourseProgress = async () => {
      if (batchDetails) {
        const request = {
          request: {
            userId: _userId,
            courseId: contentId,
            contentIds: [
              "do_1140201666434088961676",
              "do_1140158031054356481608",
              "do_1140159308293570561628",
              "do_1140158135726735361613",
            ],
            batchId: batchDetails.batchId,
            fields: ["progress", "score"],
          },
        };
        try {
          const url = `${urlConfig.URLS.CONTENT_PREFIX}${urlConfig.URLS.COURSE.USER_CONTENT_STATE_READ}`;
          const response = await axios.post(url, request);
          const data = response.data;
          setCourseProgress(data);
        } catch (error) {
          console.error("Error while fetching courses:", error);
          showErrorMessage(t("FAILED_TO_FETCH_DATA"));
        }
      }
    };
    fetchChats();
    getCourseProgress();
  }, [batchDetails, creatorId]);

  const handleDirectConnect = () => {
    if (chat.length === 0) {
      setOpen(true);
    } else if (!isMobile && chat[0]?.is_accepted == true) {
      setOpen(true);
    } else {
      navigate("/chat", {
        state: { senderUserId: _userId, receiverUserId: creatorId },
      });
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

  const handleLinkClick = () => {
    navigate("/player", { state: { content: courseData.result.content } });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowEnrollmentSnackbar(false);
  };

  const isEnrolled = () => {
    return (
      userCourseData &&
      userCourseData.courses &&
      userCourseData.courses.some((course) => course.contentId === contentId)
    );
  };

  const isIncomplete = () => {
    return (
      progress &&
      progress.result &&
      progress.result.contentList &&
      (progress.result.contentList.length === 0 ||
        progress.result.contentList.some((content) => content.status !== 2))
    );
  };

  const handleLeaveCourseClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const handleLeaveConfirmed = async () => {
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.COURSE.UNENROLL_USER_COURSE}`;
      const requestBody = {
        request: {
          courseId: contentId,
          userId: _userId,
          batchId: batchData?.batchId,
        },
      };
      const response = await axios.post(url, requestBody);
      if (response.status === 200) {
        setEnrolled(true);
        setShowEnrollmentSnackbar(true);
      }
    } catch (error) {
      console.error("Error enrolling in the course:", error);
      showErrorMessage(t("FAILED_TO_ENROLL_INTO_COURSE"));
    }
    window.location.reload();
  };

  const renderActionButton = () => {
    if (isEnrolled() || enrolled) {
      if (isIncomplete()) {
        return (
          <Box>
            <Button
              onClick={handleLinkClick}
              className="custom-btn-primary my-20 mr-5"
            >
              {t("START_LEARNING")}
            </Button>
            <Button
              onClick={handleLeaveCourseClick} // Open confirmation dialog
              className="custom-btn-danger"
            >
              {t("LEAVE_COURSE")}
            </Button>
            {showConfirmation && (
              <Dialog open={showConfirmation} onClose={handleConfirmationClose}>
                <DialogTitle>
                  {t("LEAVE_COURSE_CONFIRMATION_TITLE")}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {t("LEAVE_COURSE_CONFIRMATION_MESSAGE")}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleConfirmationClose}
                    className="custom-btn-default"
                  >
                    {t("CANCEL")}
                  </Button>
                  <Button
                    onClick={handleLeaveConfirmed}
                    className="custom-btn-primary"
                    autoFocus
                  >
                    {t("LEAVE_COURSE")}
                  </Button>
                </DialogActions>
              </Dialog>
            )}
          </Box>
        );
      } else {
        return (
          <Button onClick={handleLinkClick} className="custom-btn-primary">
            {t("START_LEARNING")}
          </Button>
        );
      }
    } else {
      if (
        (batchData?.enrollmentEndDate &&
          new Date(batchData.enrollmentEndDate) < new Date()) ||
        (!batchData?.enrollmentEndDate &&
          batchData?.endDate &&
          new Date(batchData.endDate) < new Date())
      ) {
        return (
          <Typography
            variant="h7"
            style={{
              margin: "12px 0",
              display: "block",
              fontSize: "14px",
              color: "red",
            }}
          >
            {t("BATCH_EXPIRED_MESSAGE")}
          </Typography>
        );
      } else {
        const today = new Date();
        let lastDayOfEnrollment = null;

        if (batchData?.enrollmentEndDate) {
          const enrollmentEndDate = new Date(batchData.enrollmentEndDate);
          if (!isNaN(enrollmentEndDate.getTime())) {
            lastDayOfEnrollment = enrollmentEndDate;
          }
        }

        const isLastDayOfEnrollment =
          lastDayOfEnrollment &&
          lastDayOfEnrollment.toDateString() === today.toDateString();

        const isExpired =
          lastDayOfEnrollment &&
          lastDayOfEnrollment < formatDate(today) &&
          !isLastDayOfEnrollment;

        if (isExpired) {
          return (
            <Typography
              variant="h7"
              style={{
                margin: "12px 0",
                display: "block",
                fontSize: "14px",
                color: "red",
              }}
            >
              {t("BATCH_EXPIRED_MESSAGE")}
            </Typography>
          );
        }

        return (
          <Button
            onClick={handleJoinAndOpenModal}
            // onClick={handleOpenModal}
            disabled={isExpired} // Only disable if expired (not on last day)
            className="custom-btn-primary my-20"
            style={{
              background: isExpired ? "#ccc" : "#004367",
            }}
          >
            {t("JOIN_COURSE")}
          </Button>
        );
      }
    }
  };

  const handleJoinAndOpenModal = async () => {
    try {
      await handleJoinCourse(); // Wait for the user to join the course
      setShowConsentForm(true); // Open the consent form after joining the course
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleJoinCourse = async () => {
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.COURSE.ENROLL_USER_COURSE}`;
      const requestBody = {
        request: {
          courseId: contentId,
          userId: _userId,
          batchId: batchData?.batchId,
        },
      };
      const response = await axios.post(url, requestBody);
      if (response.status === 200) {
        setEnrolled(true);
        setShowEnrollmentSnackbar(true);
      }
    } catch (error) {
      console.error("Error enrolling in the course:", error);
      showErrorMessage(t("FAILED_TO_ENROLL_INTO_COURSE"));
    }
  };

  const consentUpdate = async (status) => {
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.USER.CONSENT_READ}`;
      const requestBody = {
        request: {
          consent: {
            status: status,
            userId: _userId,
            consumerId: userInfo?.rootOrgId,
            objectId: contentId,
            objectType: "Collection",
          },
        },
      };
      const response = await axios.post(url, requestBody);
      if (response.status === 200) {
        setShowConsentForm(false);
      }
    } catch (error) {
      console.error("Error updating consent:", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };

  const handleCheckboxChange = (event) => {
    setConsentChecked(event.target.checked);
    setShareEnabled(event.target.checked);
  };

  const getUserData = async () => {
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.USER.GET_PROFILE}${_userId}?fields=${urlConfig.params.userReadParam.fields}`;

      const response = await fetch(url);
      const data = await response.json();
      setUserInfo(data.result.response);
    } catch (error) {
      console.error("Error while getting user data:", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };

  const handleShareClick = () => {
    consentUpdate("ACTIVE");
    setShowConsentForm(false);
  };

  const handleDontShareClick = () => {
    consentUpdate("REVOKED");
    setShowConsentForm(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const requestBody = {
      sender_id: _userId,
      receiver_id: creatorId,
      message: formData.message,
    };

    try {
      const url = `${urlConfig.URLS.DIRECT_CONNECT.SEND_CHATS}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to send chat");
      }
      setOpen(false);
      console.log("sentChatRequest", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  return (
    <div>
      <Header />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      <Snackbar
        open={showEnrollmentSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ mt: 2 }}
        >
          {t("ENROLLMENT_SUCCESS_MESSAGE")}
        </MuiAlert>
      </Snackbar>

      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={showConsentForm}
        onClose={(event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") {
            setOpenModal(true);
          } else {
            handleCloseModal();
          }
        }}
      >
        <Box sx={style} className="joinCourse">
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            style={{ marginBottom: "20px" }}
          >
            {t("CONSENT_FORM_TITLE")}
          </Typography>
          <div>
            <label>{t("USERNAME")}:</label>
            <span>{userInfo?.firstName}</span>
          </div>
          <div>
            <label>{t("STATE")}:</label>
            <span>{}</span>
          </div>
          <div>
            <label>{t("USER_ID")}:</label>
            <span>{userInfo?.organisations[0]?.userId}</span>
          </div>
          <div>
            <label>{t("EXTERNAL_ID")}:</label>
            <span>{}</span>
          </div>
          <div>
            <label>{t("DISTRICT")}:</label>
            <span>{}</span>
          </div>
          <div>
            <label>{t("BLOCK")}:</label>
            <span>{}</span>
          </div>
          <div>
            <label>{t("SCHOOL_ID")}:</label>
            <span>{}</span>
          </div>
          <div>
            <label>{t("SCHOOL_OR_ORG_NAME")}:</label>
            <span>{}</span>
          </div>
          <div>
            <label>{t("MOBILENUMBER")}:</label>
            <span>{userInfo?.phone}</span>
          </div>
          <div>
            <label>{t("EMAIL_ADDRESS")}:</label>
            <span>{userInfo?.email}</span>
          </div>

          <div>
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={handleCheckboxChange}
            />
            <label>{t("CONSENT_TEXT")}</label>
          </div>
          <Box className="d-flex jc-en">
            <Button
              onClick={handleDontShareClick}
              className="custom-btn-primary pr-18"
            >
              {t("DONT_SHARE")}
            </Button>
            <Button
              onClick={handleShareClick}
              className="custom-btn-default"
              disabled={!shareEnabled}
            >
              {t("SHARE")}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Container maxWidth="xxl" role="main" className="xs-pr-0">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            className="sm-p-25 left-container mt-9"
          >
            {/* <Breadcrumbs
            aria-label="breadcrumb"
            style={{
              padding: "25px 0",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <Link underline="hover" color="#004367" href="/profile">
              {t("ALL_CONTENT")}
            </Link>
            <Typography color="#484848" aria-current="page">
              {t("LEARNING_HISTORY")}
            </Typography>
          </Breadcrumbs>  */}
            <Grid container spacing={2}>
              <Breadcrumbs
                aria-label="breadcrumb"
                className="h6-title my-15 pl-18"
              >
                <Link
                  underline="hover"
                  style={{ maxHeight: "inherit" }}
                  onClick={handleGoBack}
                  color="#004367"
                  href="/all"
                >
                  {t("ALL_CONTENT")}
                </Link>
                <Link
                  underline="hover"
                  href=""
                  aria-current="page"
                  className="h6-title oneLineEllipsis"
                >
                  {userData?.result?.content?.name}
                </Link>
              </Breadcrumbs>

              <Grid item xs={4}>
                <Link
                  href="#"
                  style={{
                    textAlign: "right",
                    marginTop: "20px",
                    display: "block",
                  }}
                ></Link>
              </Grid>
            </Grid>
            <Box className="h3-title"> {userData?.result?.content?.name}</Box>
            <Box>
              <Typography
                variant="h7"
                style={{
                  margin: "12px 0 12px 0",
                  display: "block",
                  fontSize: "13px",
                }}
              >
                {t("CONTENT_TAGS")}:
                <Button
                  size="small"
                  style={{
                    color: "#424242",
                    fontSize: "12px",
                    margin: "0 10px",
                  }}
                  className="bg-blueShade3"
                >
                  {courseData?.result?.content?.children[0]?.children[0]?.board}
                </Button>
                <Button
                  size="small"
                  style={{
                    color: "#424242",
                    fontSize: "10px",
                  }}
                  className="bg-blueShade3"
                >
                  {" "}
                  {
                    courseData?.result?.content?.children[0]?.children[0]
                      .gradeLevel?.[0]
                  }
                </Button>
              </Typography>
            </Box>
            <Box
              style={{
                background: "#F9FAFC",
                padding: "10px",
                borderRadius: "10px",
                color: "#484848",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
              className="xs-hide"
            >
              <Typography
                variant="h7"
                style={{
                  margin: "0 0 9px 0",
                  display: "block",
                  fontSize: "16px",
                }}
              >
                {t("BATCH_DETAILS")}:
              </Typography>
              <Box
                style={{
                  background: "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("BATCH_START_DATE")}: {formatDate(batchData?.startDate)}
                </Typography>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("BATCH_END_DATE")}: {formatDate(batchData?.endDate)}
                </Typography>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("LAST_DATE_FOR_ENROLLMENT")}:{" "}
                  {formatDate(batchData?.enrollmentEndDate)}
                </Typography>
              </Box>
            </Box>
            <Accordion
              className="xs-hide"
              style={{
                background: "#F9FAFC",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="h4-title accordionBoxShadow"
              >
                {t("CERTIFICATION_CRITERIA")}
              </AccordionSummary>
              <AccordionDetails style={{ background: "#fff" }}>
                <ul>
                  <li className="pl-18 h6-title">
                    {t("COMPLETION_CERTIFICATE_ISSUED")} 100%
                    {t("COMPLETION")}
                  </li>
                  <li className="pl-18 h6-title">
                    {t("CERT_ISSUED_SCORE")} 60% {t("OR_GREATER")}{" "}
                    {t("ASSESSMENT")}
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="xs-hide accordionBoxShadow"
              style={{
                background: "#F9FAFC",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="h4-title"
              >
                {t("OTHER_DETAILS")}
              </AccordionSummary>
              <AccordionDetails style={{ background: "#fff" }}>
                <Typography className="h6-title">
                  {t("CREATED_ON")}:{" "}
                  {userData &&
                    userData.result &&
                    formatDate(userData.result.content.children[0].createdOn)}
                </Typography>
                <Typography className="h6-title">
                  {t("UPDATED_ON")}:{" "}
                  {userData &&
                    userData.result &&
                    formatDate(
                      userData.result.content.children[0].lastUpdatedOn
                    )}
                </Typography>
                <Typography className="h6-title">{t("CREDITS")}:</Typography>
                <Typography className="h6-title">
                  {t("LICENSE_TERMS")}:{" "}
                  {userData?.result?.content?.licenseDetails?.name}
                  {t("FOR_DETAILS")}:{" "}
                  <a
                    href={userData?.result?.content?.licenseDetails?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userData?.result?.content?.licenseDetails?.url}
                  </a>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <div className="xs-hide">
              <React.Fragment>
                {chat.length === 0 && (
                  <Button
                    onClick={handleDirectConnect}
                    variant="contained"
                    className="custom-btn-primary my-20"
                    style={{
                      background: "#004367",
                    }}
                  >
                    {t("CONNECT_WITH_CREATOR")}
                  </Button>
                )}
                {chat.length > 0 && chat[0]?.is_accepted === false && (
                  <React.Fragment>
                    <Alert severity="warning" style={{ margin: "10px 0" }}>
                      {t("YOUR_CHAT_REQUEST_IS_PENDING")}
                    </Alert>
                    <Button
                      variant="contained"
                      className="custom-btn-primary my-20"
                      style={{
                        background:
                          chat.length > 0 && chat[0]?.is_accepted === false
                            ? "#a9b3f5"
                            : "#004367",
                      }}
                      disabled
                    >
                      {t("CHAT_WITH_CREATOR")}
                    </Button>
                  </React.Fragment>
                )}
                {chat.length > 0 && chat[0].is_accepted === true && (
                  <Button
                    onClick={handleDirectConnect}
                    variant="contained"
                    className="custom-btn-primary my-20"
                    style={{
                      background: "#004367",
                    }}
                  >
                    {t("CHAT_WITH_CREATOR")}
                  </Button>
                )}
              </React.Fragment>
              {_userId && creatorId && (
                <Modal open={open} onClose={handleClose}>
                  <div className="contentCreator">
                    <Chat
                      senderUserId={_userId}
                      receiverUserId={creatorId}
                      onChatSent={handleClose}
                    />{" "}
                  </div>
                </Modal>
              )}
            </div>
            <Box className="my-20 xs-hide">
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
          <Grid item xs={12} md={8} lg={8} className="mb-20 xs-pr-16">
            <Box style={{ textAlign: "right" }}> {renderActionButton()}</Box>

            {/* <Box
              sx={{
                background: "#EEEEEE",
                textAlign: "center",
                color: "#464665",
                fontSize: "18px",
                height: "600px",
              }}
            >
              <Box sx={{ transform: "translate(0%, 550%)" }}>
                {t("START_LEARNING")}
                <Box style={{ fontSize: "14px" }}>
                  {t("JOIN_COURSE_MESSAGE")}
                </Box>
              </Box>
            </Box> */}
            <Box>
              <Typography className="h5-title" style={{ fontWeight: "600" }}>
                {t("DESCRIPTION")}:
              </Typography>
              <Typography
                className="twoLineEllipsis h5-title mb-15"
                style={{ fontWeight: "600" }}
              >
                {courseData?.result?.content?.description}
              </Typography>
            </Box>

            <Accordion
              defaultExpanded
              style={{
                background: "#F9FAFC",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="h4-title"
                style={{ fontWeight: "500" }}
              >
                {t("COURSES_MODULE")}
              </AccordionSummary>
              <AccordionDetails>
                {userData?.result?.content?.children.map((faqIndex) => (
                  <Accordion
                    key={faqIndex.id}
                    style={{ borderRadius: "10px", margin: "10px 0" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${faqIndex.id}-content`}
                      id={`panel${faqIndex.id}-header`}
                      className="h5-title"
                    >
                      {faqIndex.name}
                    </AccordionSummary>
                    {faqIndex.children.map((faqIndexname) => (
                      <AccordionDetails
                        className="border-bottom"
                        style={{ paddingLeft: "35px" }}
                      >
                        <SummarizeOutlinedIcon
                          style={{ fontSize: "17px", paddingRight: "10px" }}
                        />

                        <Link
                          href="#"
                          underline="none"
                          key={faqIndexname.id}
                          style={{ verticalAlign: "super" }}
                          onClick={handleLinkClick}
                          className="h6-title"
                        >
                          {faqIndexname.name}
                        </Link>
                      </AccordionDetails>
                    ))}
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
            <Box
              style={{
                background: "#F9FAFC",
                padding: "10px",
                borderRadius: "10px",
                color: "#484848",
              }}
              className="lg-hide accordionBoxShadow"
            >
              <Typography
                variant="h7"
                style={{
                  margin: "0 0 9px 0",
                  display: "block",
                  fontSize: "16px",
                }}
              >
                {t("BATCH_DETAILS")}:
              </Typography>
              <Box
                style={{
                  background: "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("BATCH_START_DATE")}: {formatDate(batchData?.startDate)}
                </Typography>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("BATCH_END_DATE")}: {formatDate(batchData?.endDate)}
                </Typography>
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "500",
                    margin: "9px 0",
                    display: "block",
                    fontSize: "14px",
                  }}
                >
                  {t("LAST_DATE_FOR_ENROLLMENT")}:{" "}
                  {formatDate(batchData?.enrollmentEndDate)}
                </Typography>
              </Box>
            </Box>
            <Accordion
              className="lg-hide accordionBoxShadow"
              style={{
                background: "#F9FAFC",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="h4-title"
              >
                {t("CERTIFICATION_CRITERIA")}
              </AccordionSummary>
              <AccordionDetails style={{ background: "#fff" }}>
                <ul>
                  <li className="pl-18 h6-title">
                    {t("COMPLETION_CERTIFICATE_ISSUED")} 100%
                    {t("COMPLETION")}
                  </li>
                  <li className="pl-18 h6-title">
                    {t("CERT_ISSUED_SCORE")} 60% {t("OR_GREATER")}{" "}
                    {t("ASSESSMENT")}
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="lg-hide accordionBoxShadow"
              style={{
                background: "#F9FAFC",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="h4-title"
              >
                {t("OTHER_DETAILS")}
              </AccordionSummary>
              <AccordionDetails style={{ background: "#fff" }}>
                <Typography className="h6-title">
                  {t("CREATED_ON")}:{" "}
                  {courseData &&
                    courseData.result &&
                    formatDate(courseData.result.content.children[0].createdOn)}
                </Typography>
                <Typography className="h6-title">
                  {t("UPDATED_ON")}:{" "}
                  {courseData &&
                    courseData.result &&
                    formatDate(
                      courseData.result.content.children[0].lastUpdatedOn
                    )}
                </Typography>
                <Typography className="h6-title">{t("CREDITS")}:</Typography>
                <Typography className="h6-title">
                  {t("LICENSE_TERMS")}:{" "}
                  {courseData?.result?.content?.licenseDetails?.name}
                  {t("FOR_DETAILS")}:{" "}
                  <a
                    href={courseData?.result?.content?.licenseDetails?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {courseData?.result?.content?.licenseDetails?.url}
                  </a>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <div className="lg-hide">
              <React.Fragment>
                {chat.length === 0 && (
                  <Button
                    onClick={handleDirectConnect}
                    variant="contained"
                    className="custom-btn-primary my-20"
                    style={{
                      background: "#004367",
                    }}
                  >
                    {t("CONNECT_WITH_CREATOR")}
                  </Button>
                )}
                {chat.length > 0 && chat[0]?.is_accepted === false && (
                  <React.Fragment>
                    <Alert severity="warning" style={{ margin: "10px 0" }}>
                      {t("YOUR_CHAT_REQUEST_IS_PENDING")}
                    </Alert>
                    <Button
                      variant="contained"
                      className="custom-btn-primary my-20"
                      style={{
                        background:
                          chat.length > 0 && chat[0]?.is_accepted === false
                            ? "#a9b3f5"
                            : "#004367",
                      }}
                      disabled
                    >
                      {t("CHAT_WITH_CREATOR")}
                    </Button>
                  </React.Fragment>
                )}
                {chat.length > 0 && chat[0].is_accepted === true && (
                  <Button
                    onClick={handleDirectConnect}
                    variant="contained"
                    className="custom-btn-primary my-20"
                    style={{
                      background: "#004367",
                    }}
                  >
                    {t("CHAT_WITH_CREATOR")}
                  </Button>
                )}
              </React.Fragment>
              {_userId && creatorId && (
                <Modal open={open} onClose={handleClose}>
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "35%",
                      padding: "20px",
                      boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
                      outline: "none",
                      borderRadius: 8,
                      width: "90%", // Relative width
                      maxWidth: "500px", // Maximum width
                      height: "80%", // Relative height
                      maxHeight: "90vh", // Maximum height
                      overflowY: "auto", // Scroll if content overflows
                    }}
                    className="contentCreator"
                  >
                    <Chat
                      senderUserId={_userId}
                      receiverUserId={creatorId}
                      onChatSent={handleClose}
                    />{" "}
                  </div>
                </Modal>
              )}
            </div>
            <Box className="my-20 lg-hide social-icons">
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
        </Grid>
      </Container>
      <FloatingChatIcon />
      <Footer />
    </div>
  );
};

export default JoinCourse;
