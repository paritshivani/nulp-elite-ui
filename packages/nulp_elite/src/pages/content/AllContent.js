import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import BoxCard from "components/Card";
import { getAllContents } from "services/contentService";
import Header from "components/header";
import Footer from "components/Footer";
import { Link, useNavigate } from "react-router-dom";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Box from "@mui/material/Box";
import data from "../../assets/contentSerach.json";
import SearchBox from "components/search";
import * as frameworkService from "../../services/frameworkService";
import Container from "@mui/material/Container";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DomainCarousel from "components/domainCarousel";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import domainWithImage from "../../assets/domainImgForm.json";
import { useTranslation } from "react-i18next";
import Alert from "@mui/material/Alert";
import appConfig from "../../configs/appConfig.json";
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";
import CollectionIcon from "@mui/icons-material/Collections";
import ResourceIcon from "@mui/icons-material/LibraryBooks";
import ContentPlaylistIcon from "@mui/icons-material/PlaylistPlay";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CardMembershipSharpIcon from "@mui/icons-material/CardMembershipSharp";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import SkeletonLoader from "components/skeletonLoader";
import NoResult from "./noResultFound";
const routeConfig = require("../../configs/routeConfig.json");

const responsiveCard = {
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
    items: 2,
  },
};

const iconMapping = {
  Collection: CollectionIcon,
  Resource: ResourceIcon,
  "Content Playlist": FactCheckOutlinedIcon,
  Course: ChecklistOutlinedIcon,
  "Course Assessment": InsertChartOutlinedIcon,
  "Explanation Content": ContentCopyIcon,
  "Learning Resource": LocalLibraryOutlinedIcon,
  "Lesson Plan Unit": SummarizeOutlinedIcon,
  "Practice Question Set": SummarizeOutlinedIcon,
  LessonPlan: SummarizeOutlinedIcon,
  "Course Unit": AutoStoriesOutlinedIcon,
};

const AllContent = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [domain, setDomain] = useState();
  const [selectedDomain, setSelectedDomain] = useState();

  const [channelData, setChannelData] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [itemsArray, setItemsArray] = useState([]);
  const navigate = useNavigate();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [domainName, setDomainName] = useState();

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleDomainFilter = (query, domainName) => {
    setSelectedDomain(query);
    setDomainName(domainName);
    console.log("Search query:", selectedDomain);
  };

  useEffect(() => {
    // const userDomain = sessionStorage.getItem("userDomain");
    // if (userDomain) {
    //   setSelectedDomain(userDomain);
    //   setDomainName(userDomain);
    // }
    fetchData();
    fetchDomains();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedDomain]);

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  const fetchData = async () => {
    setError(null);
    let data = JSON.stringify({
      request: {
        filters: {
          se_boards: [selectedDomain],
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
        sort_by: { lastPublishedOn: "desc" },
        fields: [
          "name",
          "appIcon",
          "medium",
          "subject",
          "resourceType",
          "contentType",
          "organisation",
          "topic",
          "mimeType",
          "trackable",
          "gradeLevel",
          "se_boards",
          "se_subjects",
          "se_mediums",
          "se_gradeLevels",
          "primaryCategory",
        ],
        facets: ["channel", "gradeLevel", "subject", "medium"],
        offset: 0,
      },
    });

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CONTENT.SEARCH}?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.ContentPlayer.contentApiQueryParams.licenseDetails}`;

      const response = await getAllContents(url, data, headers);
      const sortedData = response?.data?.result?.content?.sort((a, b) => {
        if (a.primaryCategory === "Course" && b.primaryCategory !== "Course") {
          return -1;
        } else if (
          a.primaryCategory !== "Course" &&
          b.primaryCategory === "Course"
        ) {
          return 1;
        } else {
          return a.primaryCategory.localeCompare(b.primaryCategory);
        }
      });
      setData(sortedData);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };

  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return "";
  };

  const fetchDomains = async () => {
    setError(null);
    const rootOrgId = sessionStorage.getItem("rootOrgId");
    const defaultFramework = localStorage.getItem("defaultFramework");
    const headers = {
      "Content-Type": "application/json",
      Cookie: `connect.sid=${getCookieValue("connect.sid")}`,
    };
    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CHANNEL.READ}/${rootOrgId}`;
      const response = await frameworkService.getChannel(url, headers);
      setChannelData(response.data.result);
    } catch (error) {
      console.log("error---", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.FRAMEWORK.READ}/nulp?categories=${urlConfig.params.framework}`;

      const response = await frameworkService.getSelectedFrameworkCategories(
        url,
        headers
      );

      response.data.result.framework.categories[0].terms?.map((term) => {
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
      setDomain(response.data.result.framework.categories[0].terms);
    } catch (error) {
      console.log("nulp--  error-", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      console.log("nulp finally---");
    }
  };

  const pushData = (term) => {
    setItemsArray((prevData) => [...prevData, term]);
  };

  const renderItems = (items, category) => {
    return items.map((item) => (
      // <Grid
      //   item
      //   xs={isMobile ? 12 : 12}
      //   md={isMobile ? 12 : 6}
      //   lg={isMobile ? 12 : 2}
      //   key={item.id}
      //   style={{ marginBottom: "10px" }}
      // >
      <Box className="custom-card-box" key={items.identifier}>
        <BoxCard
          items={item}
          onClick={() => handleCardClick(item, item.primaryCategory)}
        ></BoxCard>
      </Box>
    ));
  };
  const handleCardClick = (item, courseType) => {
    if (courseType === "Course") {
      // navigate("/joinCourse", { state: { contentId: item.identifier } });
      navigate(
        `${routeConfig.ROUTES.JOIN_COURSE_PAGE.JOIN_COURSE}?${item.identifier}`
      );
    } else {
      navigate(`${routeConfig.ROUTES.PLAYER_PAGE.PLAYER}?${item.identifier}`);
    }
  };

  return (
    <>
      <Header />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}

      {domain ? (
        <DomainCarousel onSelectDomain={handleDomainFilter} domains={domain} />
      ) : (
        <SkeletonLoader />
      )}

      <Container
        maxWidth="xl"
        className="pb-30 allContent xs-pb-80 all-card-list"
      >
        {domainName && (
          <Box
            className="d-flex jc-bw my-20 px-10"
            style={{ alignItems: "center" }}
          >
            <Box
              sx={{ marginTop: "10px", alignItems: "center" }}
              className="d-flex xs-d-none"
            >
              <Box className="h3-custom-title">
                {t("YOU_ARE_VIEWING_CONTENTS_FOR")}
              </Box>
              <Box
                sx={{ fontSize: "16px", fontWeight: "600", paddingLeft: "5px" }}
                className="text-blueShade2 h4-custom"
              >
                {domainName}
              </Box>
            </Box>
          </Box>
        )}
        {error && (
          <Alert severity="error" className="my-10">
            {error}
          </Alert>
        )}
        {data?.length > 0 ? (
          Object.entries(
            data.reduce((acc, item) => {
              if (!acc[item.primaryCategory]) {
                acc[item.primaryCategory] = [];
              }
              acc[item.primaryCategory].push(item);
              return acc;
            }, {})
          ).map(([category, items]) => {
            const IconComponent =
              iconMapping[category] || SummarizeOutlinedIcon;
            return (
              <React.Fragment key={category}>
                <Box
                  className="d-flex  mt-20"
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    style={{
                      display: "inline-block",
                      margin: "25px 0px 20px",
                    }}
                    className="h4-title "
                  >
                    <IconComponent style={{ verticalAlign: "top" }} />{" "}
                    <Box
                      style={{
                        display: "inline-block",
                      }}
                      className="h3-title"
                    >
                      {category}{" "}
                    </Box>{" "}
                  </Box>
                  <Box>
                    {items?.length > 4 && (
                      <Link
                        to={`${routeConfig.ROUTES.VIEW_ALL_PAGE.VIEW_ALL}?${category}`}
                        className="viewAll mr-30"
                      >
                        {t("VIEW_ALL")}
                      </Link>
                    )}
                  </Box>
                </Box>
                {isMobile ? (
                  <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots="3"
                    responsive={responsiveCard}
                    ssr={true}
                    infinite={true}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list"
                    itemClass="carousel-item-padding-40-px allContentList xs-pb-20"
                  >
                    {expandedCategory === category
                      ? items?.map((item) => (
                          <Grid item xs={12} md={6} lg={2} key={item.id}>
                            <BoxCard
                              items={item}
                              onClick={() =>
                                handleCardClick(item, item.primaryCategory)
                              }
                            ></BoxCard>
                          </Grid>
                        ))
                      : items?.slice(0, 4).map((item) => (
                          <Grid item xs={12} md={6} lg={2} key={item.id}>
                            <BoxCard
                              items={item}
                              onClick={() =>
                                handleCardClick(item, item.primaryCategory)
                              }
                            ></BoxCard>
                          </Grid>
                        ))}
                  </Carousel>
                ) : (
                  <>
                    <Box className="custom-card">
                      {expandedCategory === category
                        ? renderItems(items, category)
                        : renderItems(items.slice(0, 5), category)}
                    </Box>
                  </>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <NoResult />
        )}
      </Container>
      <FloatingChatIcon />
      <Footer />
    </>
  );
};

export default AllContent;
