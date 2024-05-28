import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Filter from "components/filter";
import BoxCard from "components/Card";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import * as util from "../../services/utilService";
import Search from "components/search";
import NoResult from "pages/content/noResultFound";
import Alert from "@mui/material/Alert";
import appConfig from "../../configs/appConfig.json";
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";

const ContinueLearning = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [courseStatus, setCourseStatus] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { domain } = location.state || {};
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  useEffect(() => {
    fetchData();
    fetchGradeLevels();
  }, [filters]);

  const handleFilterChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFilters({ ...filters, se_gradeLevel: selectedValues });
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    const _userId = util.userId();

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.COURSE.GET_ENROLLED_COURSES}/${_userId}?orgdetails=${appConfig.Course.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.Course.contentApiQueryParams.licenseDetails}&fields=${urlConfig.params.enrolledCourses.fields}&batchDetails=${urlConfig.params.enrolledCourses.batchDetails}`;
      const response = await fetch(url, headers);
      const responseData = await response.json();
      setData(responseData.result.courses);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      setIsLoading(false);
    }
  };
  const fetchGradeLevels = async () => {
    const defaultFramework = localStorage.getItem("defaultFramework");
    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.FRAMEWORK.READ}/${defaultFramework}?categories=${urlConfig.params.framework}`;
      const response = await fetch(url);
      const data = await response.json();
      if (
        data.result &&
        data.result.framework &&
        data.result.framework.categories
      ) {
        const gradeLevelCategory = data.result.framework.categories.find(
          (category) => category.identifier === "nulp_gradelevel"
        );
        if (gradeLevelCategory && gradeLevelCategory.terms) {
          const gradeLevelsOptions = gradeLevelCategory.terms.map((term) => ({
            value: term.code,
            label: term.name,
          }));
          setGradeLevels(gradeLevelsOptions);
        }
      }
    } catch (error) {
      console.error("Error fetching grade levels:", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };

  const handleCourseStatusChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setCourseStatus(selectedValues);
  };

  // Filtered courses based on selected course status
  const filteredCourses = useMemo(() => {
    if (!courseStatus.length) {
      // If no course status is selected, return all courses
      return data;
    }

    // Filter courses based on selected course status
    return data.filter((courses) =>
      courseStatus.includes(courses.contents.status)
    );
  }, [courseStatus, data]);
  const handleCardClick = (contentId, courseType) => {
    if (courseType === "Course") {
      // navigate("/joinCourse", { state: { contentId } });
      navigate(`/joinCourse/${contentId}`);
    } else {
      navigate("/player");
    }
  };
  return (
    <div>
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      <Container
        maxWidth="xl"
        role="main"
        className="allContent filter-profile"
      >
        {error && (
          <Alert severity="error" className="my-10">
            {error}
          </Alert>
        )}
        <Box style={{ margin: "20px 0" }}>
          <Filter
            options={gradeLevels}
            label="Filter by Sub-Domain"
            onChange={handleFilterChange}
          />
        </Box>
        <Box textAlign="center" padding="10">
          <Box>
            <Grid
              container
              spacing={2}
              style={{ margin: "20px 0", marginBottom: "10px" }}
            >
              {/* 
              {filteredCourses.map((items) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={3}
                  style={{ marginBottom: "10px" }}
                  key={items.contentId}
                >
                  <BoxCard items={items.content} index={filteredCourses.length}></BoxCard>
                </Grid>
              ))} */}

              {filteredCourses.length === 0 ? (
                <NoResult />
              ) : (
                filteredCourses.map((items) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={3}
                    style={{ marginBottom: "10px" }}
                    key={items.contentId}
                  >
                    <BoxCard
                      items={items.content}
                      index={filteredCourses.length}
                      onClick={() =>
                        handleCardClick(
                          items.content.identifier,
                          items.content.primaryCategory
                        )
                      }
                    ></BoxCard>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
      <FloatingChatIcon />
    </div>
  );
};

export default ContinueLearning;
