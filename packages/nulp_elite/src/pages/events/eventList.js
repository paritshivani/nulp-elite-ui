import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EventCard from "components/EventCard";
import Box from "@mui/material/Box";

import { getAllContents } from "services/contentService";

import Search from "components/search";
import SearchBox from "components/search";
import Filter from "components/filter";
import contentData from "../../assets/contentSerach.json";
// import RandomImage from "../../assets/cardRandomImgs.json";

import Grid from "@mui/material/Grid";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import NoResult from "pages/content/noResultFound";
import { t } from "i18next";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
const urlConfig = require("../../configs/urlConfig.json");
const Events = require("./events.json");
import ToasterCommon from "../ToasterCommon";
import DomainCarousel from "components/domainCarousel";
import domainWithImage from "../../assets/domainImgForm.json";
import DrawerFilter from "components/drawerFilter";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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

const EventList = (props) => {
  const [search, setSearch] = useState(true);
  const location = useLocation();
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [domainfilter, setDomainfilter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  // const { domain } = location.state || {};
  const [domain, setDomain] = useState(location.state?.domain || undefined);
  const [domainName, setDomainName] = useState(
    location.state?.domainName || undefined
  );
  const [domainList, setDomainList] = useState([]);
  const { domainquery } = location.state || {};
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [channelData, setChannelData] = React.useState(true);
  const [globalSearchQuery, setGlobalSearchQuery] = useState(
    location.state?.globalSearchQuery || undefined
  );
  const [searchQuery, setSearchQuery] = useState(globalSearchQuery || "");

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  useEffect(() => {
    // setData(Events.result.Event);
    fetchData();
  }, []);

  const handleChange = (event, value) => {
    alert("hello");
    if (value !== pageNumber) {
      setPageNumber(value);
      setCurrentPage(value);
      setData({});
      navigate(`/contentList/${value}`, { state: { domain: domain } });
      // fetchData();
    }
  };
  const handleCardClick = (eventId) => {
    navigate(`/webapp/eventDetails/${eventId}`);
  };
  // Function to handle data from the child
  const handlefilterChanges = (data) => {
    console.log("data---", data);
  };
  const handleDomainFilter = (query, domainName) => {
    setDomain(query);
    setPageNumber(1);
    setCurrentPage(1);
    // setData({});
    setDomainName(domainName);
    navigate(`${routeConfig.ROUTES.CONTENTLIST_PAGE.CONTENTLIST}/1`, {
      state: { domain: query },
    });
  };
  const [value, setValue] = React.useState("1");

  const fetchData = async () => {
    setError(null);
    let data = JSON.stringify({
      request: {
        filters: {
          // se_boards: [selectedDomain],
          // primaryCategory: [
          //   "Collection",
          //   "Resource",
          //   "Content Playlist",
          //   "Course",
          //   "Course Assessment",
          //   "Digital Textbook",
          //   "eTextbook",
          //   "Explanation Content",
          //   "Learning Resource",
          //   "Lesson Plan Unit",
          //   "Practice Question Set",
          //   "Teacher Resource",
          //   "Textbook Unit",
          //   "LessonPlan",
          //   "FocusSpot",
          //   "Learning Outcome Definition",
          //   "Curiosity Questions",
          //   "MarkingSchemeRubric",
          //   "ExplanationResource",
          //   "ExperientialResource",
          //   "Practice Resource",
          //   "TVLesson",
          //   "Course Unit",
          //   "Exam Question",
          // ],
          // visibility: ["Default", "Parent"],
          objectType: "Event",
        },
        limit: 100,
        sort_by: { lastPublishedOn: "desc" },
        offset: 0,
      },
    });

    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzVGRIUkFpTUFiRHN1SUhmQzFhYjduZXFxbjdyQjZrWSJ9.MotRsgyrPzt8O2jp8QZfWw0d9iIcZz-cfNYbpifx5vs",
    };
    // console.log(data.result.content)

    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.COMPOSITE.SEARCH}`;

      const response = await getAllContents(url, data, headers);
      // const sortedData = response?.data?.result?.content?.sort((a, b) => {
      //   // Sort "Course" items first, then by primaryCategory
      //   if (a.primaryCategory === "Course" && b.primaryCategory !== "Course") {
      //     return -1; // "Course" comes before other categories
      //   } else if (
      //     a.primaryCategory !== "Course" &&
      //     b.primaryCategory === "Course"
      //   ) {
      //     return 1; // Other categories come after "Course"
      //   } else {
      //     return a.primaryCategory.localeCompare(b.primaryCategory);
      //   }
      // });
      setData(response.data.result.Event);
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

  return (
    <div>
      <Header globalSearchQuery={globalSearchQuery} />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}

      {/* <Box
        className="lg-hide header-bg w-40 mr-30"
        style={{ alignItems: "center", paddingLeft: "23px" }}
      >
        <Box className="h1-title px-10 pr-20">{t("EXPLORE")}</Box>
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
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box> */}
      <DomainCarousel
        onSelectDomain={handleDomainFilter}
        selectedDomainCode={domain}
        domains={domainList}
      />
      <Container
        className="xs-pb-20 eventTab"
        style={{ maxWidth: "100%", paddingRight: "14px", paddingLeft: "14px" }}
      >
        <Grid
          container
          spacing={2}
          className="pt-8 mt-2 custom-event-container"
        >
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            className="sm-p-25 left-container profile"
            style={{ padding: "0", borderRight: "none" }}
          >
            <DrawerFilter SelectedFilters={handlefilterChanges} />
          </Grid>
          <Grid item xs={12} md={8} lg={9} className="xs-pl-0 pb-20 pt-0">
            {/* <Grid
            item
            xs={12}
            md={4}
            lg={3}
            className="sm-p-25 left-container mt-2 xs-hide left-filter"
            style={{ padding: "0" }}
          ></Grid> */}

            <Box textAlign="center" padding="10">
              <Box>
                {isLoading ? (
                  <p>{t("LOADING")}</p>
                ) : error ? (
                  <Alert severity="error">{error}</Alert>
                ) : data ? (
                  <div>
                    <TabContext value={value} className="eventTab">
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList aria-label="lab API tabs example">
                          <Tab
                            label="My Webinar"
                            className="tab-text"
                            icon={<RecentActorsOutlinedIcon />}
                            value="1"
                          />
                          <Tab
                            label="All Webinar"
                            className="tab-text"
                            icon={<PublicOutlinedIcon />}
                            value="2"
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="1" className="mt-15">
                        <Grid
                          container
                          spacing={2}
                          style={{ marginBottom: "5px" }}
                        >
                          {data.map((items, index) => (
                            <Grid
                              item
                              xs={6}
                              md={6}
                              lg={6}
                              style={{ marginBottom: "10px" }}
                              key={items.identifier}
                            >
                              <EventCard
                                items={items}
                                index={index}
                                onClick={() =>
                                  handleCardClick("do_11405689580730777611")
                                }
                                // onClick={() => alert("hii")}
                              ></EventCard>
                            </Grid>
                          ))}
                        </Grid>
                      </TabPanel>
                      <TabPanel value="2" className="mt-15">
                        All Webinar
                      </TabPanel>
                    </TabContext>

                    <Pagination
                      count={totalPages}
                      page={pageNumber}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <NoResult /> // Render NoResult component when there are no search results
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default EventList;
