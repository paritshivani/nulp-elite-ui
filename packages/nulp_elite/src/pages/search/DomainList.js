import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import domainWithImage from "../../assets/domainImgForm.json";
import SearchBox from "components/search";
import frameworkHardCodedData from "../../assets/framework.json";
import Header from "../../components/header";
import * as frameworkService from ".././../services/frameworkService";
import { generatePath, useNavigate, useLocation, Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { object } from "yup";
import Alert from "@mui/material/Alert";
// import { useTranslation } from "react-i18next";
import appConfig from "../../configs/appConfig.json";
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";
import Carousel from "react-multi-carousel";
import DomainCarousel from "components/domainCarousel";
import NoResult from "pages/content/noResultFound";
import BoxCard from "../../components/Card";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
const routeConfig = require("../../configs/routeConfig.json");
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const theme = createTheme();

theme.typography.h3 = {
  fontSize: "0.938rem",
  background: "#fff",
  display: "block",
  "@media (min-width:600px)": {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.125rem",
  },
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const DomainList = ({ globalSearchQuery }) => {
  const { t } = useTranslation();
  // console.log(data.result.categories.terms.category);
  // const [search, setSearch] = React.useState(true);
  // const [searchState, setSearchState] = React.useState(false);
  const [data, setData] = React.useState();
  const [channelData, setChannelData] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [category, setCategory] = React.useState();
  const [imgItem, setImgItem] = React.useState(object ? object : {});
  const [itemsArray, setItemsArray] = useState([]);
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [domain, setDomain] = useState();
  const [popularCourses, setPopularCourses] = useState([]);
  const [recentlyAddedCourses, setRecentlyAddedCourses] = useState([]);

  const [searchQuery, setSearchQuery] = useState(globalSearchQuery || "");

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  useEffect(() => {
    fetchDataFramework();
    getRecentlyAddedCourses();
    getPopularCourses();
    // console.log("domainWithImage--",domainWithImage)
  }, []);

  // Function to push data to the array
  const pushData = (term) => {
    setItemsArray((prevData) => [...prevData, term]);
  };

  const fetchDataFramework = async () => {
    setIsLoading(true);
    setError(null);
    const rootOrgId = sessionStorage.getItem("rootOrgId");
    const defaultFramework = localStorage.getItem("defaultFramework");

    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CHANNEL.READ}/${rootOrgId}`;
      const response = await frameworkService.getChannel(url);
      // console.log("channel---",response.data.result);
      setChannelData(response.data.result);
    } catch (error) {
      console.log("error---", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      setIsLoading(false);
    }
    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.FRAMEWORK.READ}/
      ${defaultFramework}?categories=${urlConfig.params.framework}`;

      const response = await frameworkService.getSelectedFrameworkCategories(
        url
      );

      response?.data?.result?.framework?.categories[0].terms.map((term) => {
        setCategory(term);
        if (domainWithImage) {
          domainWithImage.result.form.data.fields.map((imgItem) => {
            if ((term && term.code) === (imgItem && imgItem.code)) {
              term["image"] = imgItem.image ? imgItem.image : "";
              pushData(term);
              itemsArray.push(term);
            }
          });
        }
      });
      setDomain(response?.data?.result?.framework?.categories[0].terms);
      setData(itemsArray);
    } catch (error) {
      console.log("nulp--  error-", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      console.log("nulp finally---");
      setIsLoading(false);
    }
  };

  const getRecentlyAddedCourses = async () => {
    setIsLoading(true);
    setError(null);

    let requestData = {
      request: {
        filters: {
          se_boards: [null],
          primaryCategory: [
            "Collection",
            "Resource",
            "Content Playlist",
            "Course",
            "Course Assessment",
            "Digital Textbook",
            "eTextbook",
            "Explanation Content",
            "Learning Resource",
            "Lesson Plan Unit",
            "Practice Question Set",
            "Teacher Resource",
            "Textbook Unit",
            "LessonPlan",
            "FocusSpot",
            "Learning Outcome Definition",
            "Curiosity Questions",
            "MarkingSchemeRubric",
            "ExplanationResource",
            "ExperientialResource",
            "Practice Resource",
            "TVLesson",
            "Course Unit",
            "Exam Question",
          ],
          visibility: ["Default", "Parent"],
        },
        limit: 100,
        sort_by: {
          lastPublishedOn: "desc",
        },
        fields: [
          "name",
          "appIcon",
          "mimeType",
          "gradeLevel",
          "identifier",
          "medium",
          "pkgVersion",
          "board",
          "subject",
          "resourceType",
          "primaryCategory",
          "contentType",
          "channel",
          "organisation",
          "trackable",
          "primaryCategory",
          "se_boards",
          "se_gradeLevels",
          "se_subjects",
          "se_mediums",
          "primaryCategory",
        ],
        facets: [
          "se_boards",
          "se_gradeLevels",
          "se_subjects",
          "se_mediums",
          "primaryCategory",
        ],

        offset: 0,
        query: globalSearchQuery || searchQuery,
      },
    };

    let req = JSON.stringify(requestData);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.CONTENT.SEARCH}?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.ContentPlayer.contentApiQueryParams.licenseDetails}`;

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: req,
      });

      if (!response.ok) {
        throw new Error(t("FAILED_TO_FETCH_DATA"));
      }

      const responseData = await response.json();
      console.log("data", responseData);
      setRecentlyAddedCourses(responseData?.result?.content || []);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      setIsLoading(false);
    }
  };

  const loadContents = async (term) => {
    // console.log(term);
    navigate(routeConfig.ROUTES.CONTENTLIST_PAGE.CONTENTLIST / 1, {
      state: { domain: term.code },
    });
  };

  const handleSearch = async (domainquery) => {
    console.log(domainquery);
    navigate(routeConfig.ROUTES.CONTENTLIST_PAGE.CONTENTLIST / 1, {
      state: { domainquery },
    });
  };
  const handleDomainFilter = (query, domainName) => {
    setDomain(query);
    navigate(routeConfig.ROUTES.CONTENTLIST_PAGE.CONTENTLIST / 1, {
      state: { domain: query, domainName: domainName },
    });
  };
  // console.log(frameworkHardCodedData.result.framework.categories[0].terms);

  const handleCardClick = (contentId, courseType) => {
    if (courseType === "Course") {
      // navigate("/joinCourse", { state: { contentId } });
      navigate(
        `${routeConfig.ROUTES.JOIN_COURSE_PAGE.JOIN_COURSE}/${contentId}`
      );
    } else {
      navigate(routeConfig.ROUTES.PLAYER_PAGE.PLAYER);
    }
  };

  const getPopularCourses = async () => {
    setIsLoading(true);
    setError(null);

    let requestData = {
      request: {
        filters: {
          se_boards: [null],
          primaryCategory: ["Course"],
          visibility: ["Default", "Parent"],
        },
        limit: 100,
        sort_by: {
          lastPublishedOn: "desc",
        },
        fields: [
          "name",
          "appIcon",
          "mimeType",
          "gradeLevel",
          "identifier",
          "medium",
          "pkgVersion",
          "board",
          "subject",
          "resourceType",
          "primaryCategory",
          "contentType",
          "channel",
          "organisation",
          "trackable",
          "primaryCategory",
          "se_boards",
          "se_gradeLevels",
          "se_subjects",
          "se_mediums",
        ],
        facets: [
          "se_boards",
          "se_gradeLevels",
          "se_subjects",
          "se_mediums",
          "primaryCategory",
        ],
        offset: 0,
      },
    };

    let req = JSON.stringify(requestData);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.CONTENT.SEARCH}?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.ContentPlayer.contentApiQueryParams.licenseDetails}`;

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: req,
      });

      if (!response.ok) {
        throw new Error(t("FAILED_TO_FETCH_DATA"));
      }

      const responseData = await response.json();
      console.log("data", responseData);
      setPopularCourses(responseData?.result?.content || []);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      setIsLoading(false);
    }
  };

  const onMobileSearch = () => {
    navigate("/contentList/1", {
      state: { globalSearchQuery: searchQuery },
    });
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    console.log("value", event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onMobileSearch();
    }
  };

  return (
    <div>
      <Header />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}

      {/* Search Box */}
      <Box
        className="lg-hide d-flex header-bg"
        style={{ alignItems: "center", paddingLeft: "23px" }}
      >
        <TextField
          placeholder={t("What do you want to learn today?  ")}
          variant="outlined"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <IconButton
                type="submit"
                aria-label="search"
                onClick={onMobileSearch}
              >
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box>

      {isMobile ? (
        <Container maxWidth="xl" role="main" className="allContent">
          {error && <Alert severity="error">{error}</Alert>}
          <Box sx={{ paddingTop: "30px" }}>
            <Grid
              container
              spacing={2}
              style={{ margin: "20px 0", marginBottom: "10px" }}
            >
              {data &&
                data.slice(0, 10).map((term) => (
                  <Grid
                    item
                    xs={6}
                    md={6}
                    lg={2}
                    style={{ marginBottom: "10px" }}
                  >
                    <Box
                      onClick={() => loadContents(term)}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        style={{
                          background: "#fff",
                          padding: "10px",
                          borderRadius: "10px",
                          height: "48px",
                          width: "48px",
                          border: "solid 1px #E1E1E1",
                        }}
                      >
                        <img
                          src={require(`../../assets/domainImgs${term.image}`)}
                          style={{ width: "100%" }}
                        />
                      </Box>
                      <h5
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          paddingLeft: "10px",
                          margin: "0",
                        }}
                      >
                        {term.name}
                      </h5>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Container>
      ) : domain ? (
        <DomainCarousel onSelectDomain={handleDomainFilter} domains={domain} />
      ) : (
        <div></div>
        // <NoResult />
      )}

      <Container
        maxWidth="xl"
        className="xs-pb-20 allContent allContentList"
        role="main"
      >
        {error && <Alert severity="error">{error}</Alert>}

        <Box textAlign="center">
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "25px",
            }}
          >
            <Box>
              <VerifiedOutlinedIcon
                className="text-grey"
                style={{ verticalAlign: "top" }}
              />{" "}
              <Box
                className="h3-title"
                style={{
                  display: "inline-block",
                }}
              >
                {"Popular Courses"}{" "}
              </Box>{" "}
            </Box>
          </p>
          {isMobile ? (
            <Box style={{ paddingTop: "0" }}>
              {isLoading ? (
                <p>{t("LOADING")}</p>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : popularCourses.length > 0 ? (
                <div>
                  <Grid
                    container
                    spacing={2}
                    style={{ margin: "20px 0", marginBottom: "10px" }}
                  >
                    {popularCourses.slice(0, 10).map((items, index) => (
                      <Grid
                        item
                        xs={6}
                        sm={isMobile ? 6 : 12} // Show 2 courses per line on mobile view
                        md={6}
                        lg={2}
                        key={items.identifier}
                        style={{ marginBottom: "10px" }}
                      >
                        <BoxCard
                          items={items}
                          onClick={() =>
                            handleCardClick(items.identifier, items.contentType)
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : (
                <NoResult />
              )}
            </Box>
          ) : (
            <Box sx={{ paddingTop: "0" }}>
              {isLoading ? (
                <p>{t("LOADING")}</p>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : popularCourses.length > 0 ? (
                <div>
                  <Grid container spacing={2}>
                    {popularCourses.slice(0, 10).map((items) => (
                      <Grid
                        item
                        xs={6}
                        md={6}
                        lg={2}
                        key={items.identifier}
                        style={{ marginBottom: "10px" }}
                      >
                        <BoxCard
                          items={items}
                          onClick={() =>
                            handleCardClick(items.identifier, items.contentType)
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : (
                <NoResult />
              )}
            </Box>
          )}
        </Box>
      </Container>

      <Container maxWidth="xl" className="allContent xs-mb-75 " role="main">
        {error && <Alert severity="error">{error}</Alert>}

        <Box textAlign="center">
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "25px",
            }}
          >
            <Box>
              <BookmarkAddedOutlinedIcon
                className="text-grey"
                style={{ verticalAlign: "top" }}
              />{" "}
              <Box
                className="h3-title"
                style={{
                  display: "inline-block",
                }}
              >
                {"Recently Added"}{" "}
              </Box>{" "}
            </Box>
          </p>
          {isMobile ? (
            <Box sx={{ paddingTop: "0" }}>
              {isLoading ? (
                <p>{t("LOADING")}</p>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : recentlyAddedCourses.length > 0 ? (
                <div>
                  <Grid container spacing={2}>
                    {recentlyAddedCourses.slice(0, 10).map((items, index) => (
                      <Grid
                        item
                        xs={6}
                        sm={isMobile ? 6 : 12} // Show 2 courses per line on mobile view
                        md={6}
                        lg={2}
                        key={items.identifier}
                        style={{ marginBottom: "10px" }}
                      >
                        <BoxCard
                          items={items}
                          onClick={() =>
                            handleCardClick(items.identifier, items.contentType)
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : (
                <NoResult />
              )}
            </Box>
          ) : (
            <Box sx={{ paddingTop: "0" }}>
              {isLoading ? (
                <p>{t("LOADING")}</p>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : recentlyAddedCourses.length > 0 ? (
                <div>
                  <Grid container spacing={2} style={{ marginBottom: "10px" }}>
                    {recentlyAddedCourses.slice(0, 10).map((items) => (
                      <Grid
                        item
                        xs={6}
                        md={6}
                        lg={2}
                        key={items.identifier}
                        style={{ marginBottom: "10px" }}
                      >
                        <BoxCard
                          items={items}
                          onClick={() =>
                            handleCardClick(items.identifier, items.contentType)
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ) : (
                <NoResult />
              )}
            </Box>
          )}
        </Box>
      </Container>

      <Footer />
    </div>
  );
};

export default DomainList;
