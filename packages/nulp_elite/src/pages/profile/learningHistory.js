import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Card from "@mui/material/Card";
import * as util from "../../services/utilService";
import Filter from "components/filter";
import NoResult from "pages/content/noResultFound";
import Alert from "@mui/material/Alert";
import appConfig from "../../configs/appConfig.json";
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";
import BoxCard from "components/Card";
import { useParams, useNavigate, useLocation } from "react-router-dom";
const routeConfig = require("../../configs/routeConfig.json");

const LearningHistory = () => {
  const { t } = useTranslation();
  const [courseData, setCourseData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [error, setError] = useState(null);
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const navigate = useNavigate();

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
      setToasterOpen(false);
    }, 2000);
    setToasterOpen(true);
  };

  const _userId = util.userId();

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.COURSE.GET_ENROLLED_COURSES}/${_userId}?orgdetails=${appConfig.Course.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.Course.contentApiQueryParams.licenseDetails}&fields=${urlConfig.params.enrolledCourses.fields}&batchDetails=${urlConfig.params.enrolledCourses.batchDetails}`;
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
      }
    };
    fetchData();
  }, [_userId, t]);

  const handleFilterChange = (selectedOptions) => {
    console.log("Selected filter options:", selectedOptions); // Debug: Check selected filter options
    setSelectedStatus(selectedOptions);
  };

  const filteredCourses = courseData?.result?.courses?.filter((course) => {
    if (selectedStatus.length > 0) {
      const selectedValues = selectedStatus.map((option) => option.value);
      return selectedValues.includes(course.status);
    }
    return true; // Show all if no filter selected
  });

  return (
    <div>
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      <Container
        maxWidth="xl"
        role="main"
        className="allContent filter-profile profile"
      >
        {error && (
          <Alert severity="error" className="my-10">
            {error}
          </Alert>
        )}
        <Box textAlign="center" padding="10">
          <Box style={{ margin: "20px 0" }}>
            <Filter
              options={[
                { label: "Ongoing", value: 1 },
                { label: "Completed", value: 2 },
                { label: "Expired", value: 0 },
              ]}
              label="Filter by Status"
              onChange={handleFilterChange}
            />
          </Box>
          <Box>
            <Grid
              container
              spacing={2}
              style={{ textAlign: "left", paddingTop: "10px" }}
            >
              {filteredCourses?.length === 0 ? (
                <NoResult />
              ) : (
                filteredCourses?.map((course) => (
                  <Grid item xs={6} md={3} key={course.courseName}>
                    <BoxCard
                      items={course}
                      index={courseData.result.courses.length}
                      onClick={() =>
                        navigate(
                          `${routeConfig.ROUTES.JOIN_COURSE_PAGE.JOIN_COURSE}/${course.content.identifier}`
                        )
                      }
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
      <FloatingChatIcon />
      {/* <Footer /> */}
    </div>
  );
};
export default LearningHistory;
