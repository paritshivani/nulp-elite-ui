import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import EventCard from "components/EventCard";
import Box from "@mui/material/Box";
import Search from "components/search";
import SearchBox from "components/search";
import Filter from "components/filter";
import contentData from "../../assets/contentSerach.json";
import RandomImage from "../../assets/cardRandomImgs.json";
import Grid from "@mui/material/Grid";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import * as contentService from "../../services/contentService";
import queryString from "query-string";
import Pagination from "@mui/material/Pagination";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import NoResult from "pages/content/noResultFound";
import { t } from "i18next";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import appConfig from "../../configs/appConfig.json";
const urlConfig = require("../../configs/urlConfig.json");
const Events = require("./events.json");
import ToasterCommon from "../ToasterCommon";
import Carousel from "react-multi-carousel";
import DomainCarousel from "components/domainCarousel";
import domainWithImage from "../../assets/domainImgForm.json";
import DrawerFilter from "components/drawerFilter";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

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
    setData(Events.result.Event);
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

      <Container maxWidth="xl" role="main" className="allContent xs-pb-20">
        <Grid container spacing={2} className="pt-8 mt-15">
          {/* <Grid
            item
            xs={12}
            md={4}
            lg={3}
            className="sm-p-25 left-container mt-2 xs-hide left-filter"
            style={{ padding: "0" }}
          ></Grid> */}
          <Grid
            item
            xs={12}
            md={4}
            lg={9}
            className="sm-p-25"
            style={{ paddingTop: "0" }}
          >
            <Box textAlign="center" padding="10">
              <Box>
                {isLoading ? (
                  <p>{t("LOADING")}</p>
                ) : error ? (
                  <Alert severity="error">{error}</Alert>
                ) : data ? (
                  <div>
                    <Grid
                      container
                      spacing={2}
                      style={{ margin: "20px 0", marginBottom: "10px" }}
                    >
                      {data.map((items, index) => (
                        <Grid
                          item
                          xs={6}
                          md={6}
                          lg={3}
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
