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
  const [myData, setMyData] = useState([]);
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
  const [subDomainFilter, setSubDomainFilter] = useState([]);
  const [startDateFilter, setStartDateFilter] = useState([]);
  const [endDateFilter, setEndDateFilter] = useState([]);
  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  useEffect(() => {
    fetchAllData();
    fetchMyEvents();
    Fetchdomain();
  }, []);

  const handleChange = (event, value) => {
    if (value !== pageNumber) {
      setPageNumber(value);
      setCurrentPage(value);
      setData({});
      navigate(`/contentList/${value}`, { state: { domain: domain } });
      fetchAllData();
    }
  };
  const handleCardClick = (eventId) => {
    navigate(`/webapp/eventDetails/${eventId}`);
  };
  // Function to handle data from the child
  const handlefilterChanges = (selectedFilters) => {
    setStartDateFilter[selectedFilters.startDate];
    setEndDateFilter[selectedFilters.endDate];
    setSubDomainFilter[selectedFilters.subDomainFilter];
    setSearchQuery[selectedFilters.searchQurery];

    fetchAllData();
  };
  const handleDomainFilter = (query, domainName) => {
    setDomain(query);
    setPageNumber(1);
    setCurrentPage(1);
    // setData({});
    setDomainName(domainName);
    fetchAllData();
  };
  const [value, setValue] = React.useState("1");

  const fetchAllData = async () => {
    let filters = {};
    if (searchQuery && domainfilter && subDomainFilter) {
      filters = {
        objectType: ["Event"],
        query: searchQuery ? searchQuery : "",
        se_boards: domainfilter.se_board || [domain],
        se_gradeLevels: subDomainFilter,
      };
    } else if (searchQuery && domainfilter) {
      filters = {
        objectType: ["Event"],
        query: searchQuery ? searchQuery : "",
        se_boards: domainfilter.se_board || [domain],
      };
    } else if (searchQuery && subDomainFilter) {
      filters = {
        objectType: ["Event"],
        query: searchQuery ? searchQuery : "",
        se_gradeLevels: subDomainFilter,
      };
    } else if (domainfilter && subDomainFilter) {
      filters = {
        objectType: ["Event"],
        se_boards: domainfilter.se_board || [domain],
        se_gradeLevels: subDomainFilter,
      };
    } else if (domainfilter) {
      filters = {
        objectType: ["Event"],
        se_boards: domainfilter.se_board || [domain],
      };
    } else if (subDomainFilter) {
      filters = {
        objectType: ["Event"],
        se_gradeLevels: subDomainFilter,
      };
    } else if (searchQuery) {
      filters = {
        objectType: ["Event"],
        query: searchQuery ? searchQuery : "",
      };
    } else {
      filters = {
        objectType: ["Event"],
      };
    }

    setError(null);
    let data = JSON.stringify({
      request: {
        filters: filters,
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
      console.log("response-----", response);
      setData(response.data.result.Event);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };

  const fetchMyEvents = async () => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const _userId = util.userId();

      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.COURSE.GET_ENROLLED_COURSES}/${_userId}?orgdetails=${appConfig.Course.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.Course.contentApiQueryParams.licenseDetails}&fields=${urlConfig.params.enrolledCourses.fields}&batchDetails=${urlConfig.params.enrolledCourses.batchDetails}&contentDetails=${urlConfig.params.enrolledCourses.contentDetails}`;
        const response = await fetch(url, headers);
        const responseData = await response.json();
        setMyData(responseData.result.courses);
      } catch (error) {
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
      } finally {
        setIsLoading(false);
      }
    };
  };
  const Fetchdomain = async () => {
    const defaultFramework = localStorage.getItem("defaultFramework");
    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.FRAMEWORK.READ}/${defaultFramework}?orgdetails=${urlConfig.params.framework}`;

      const response = await fetch(url);

      if (response.ok) {
        const responseData = await response.json();
        if (
          responseData.result &&
          responseData.result.framework &&
          responseData.result.framework.categories &&
          responseData.result.framework.categories.length > 0 &&
          responseData.result.framework.categories[0].terms
        ) {
          const domainOptions =
            responseData.result.framework.categories[0].terms.map((term) => ({
              value: term.code,
              label: term.name,
            }));
          setCategory(domainOptions);
          responseData.result.framework.categories[0].terms?.map((term) => {
            setCategory(term);
            if (domainWithImage) {
              domainWithImage.result.form.data.fields.map((imgItem) => {
                if ((term && term.code) === (imgItem && imgItem.code)) {
                  term["image"] = imgItem.image ? imgItem.image : "";
                }
              });
            }
          });
          const domainList =
            responseData?.result?.framework?.categories[0].terms;
          setDomainList(domainList);
        }
      } else {
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
        throw new Error(t("FAILED_TO_FETCH_DATA"));
      }
    } catch (error) {
      console.log("Error fetching domain data:", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      setIsLoading(false);
    }
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
      <Box>
        {domainList && domainList.length > 0 ? (
          <DomainCarousel
            // className={`my-class ${
            //   activeStates[index] ? "carousel-active-ui" : ""
            // }`}
            onSelectDomain={handleDomainFilter}
            selectedDomainCode={domain}
            domains={domainList}
          />
        ) : (
          <NoResult />
        )}
      </Box>
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
            className="sm-p-25 left-container profile flter-btn"
            style={{ padding: "0", borderRight: "none", background: "#f9fafc" }}
          >
            <DrawerFilter
              SelectedFilters={handlefilterChanges}
              renderedPage="EventList"
            />
          </Grid>
          <Grid item xs={12} md={8} lg={9} className="pb-20 pt-0 event-list ">
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
                          {data &&
                            data.map((items, index) => (
                              <Grid
                                item
                                xs={12}
                                md={6}
                                lg={6}
                                style={{
                                  marginBottom: "10px",
                                }}
                                key={items.identifier}
                              >
                                <EventCard
                                  items={items}
                                  index={index}
                                  onClick={() =>
                                    handleCardClick(items.identifier)
                                  }
                                  // onClick={() => alert("hii")}
                                ></EventCard>
                              </Grid>
                            ))}
                        </Grid>
                      </TabPanel>
                      <TabPanel value="2" className="mt-15">
                        <Grid
                          container
                          spacing={2}
                          style={{ marginBottom: "5px" }}
                        >
                          {data &&
                            data.map((items, index) => (
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
                                    handleCardClick("items.identifier")
                                  }
                                ></EventCard>
                              </Grid>
                            ))}
                        </Grid>
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
