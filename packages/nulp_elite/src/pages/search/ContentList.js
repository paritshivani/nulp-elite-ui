import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import BoxCard from "components/Card";
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
import ToasterCommon from "../ToasterCommon";
import Carousel from "react-multi-carousel";
import DomainCarousel from "components/domainCarousel";
import domainWithImage from "../../assets/domainImgForm.json";
import DrawerFilter from "components/drawerFilter";

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

const ContentList = (props) => {
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
    Fetchdomain();
    const random = getRandomValue();
  }, [filters, search, currentPage, domainfilter]);

  useEffect(() => {
    fetchData();
  }, [domain]);

  useEffect(() => {
    fetchData();
  }, [globalSearchQuery]);

  const handleFilterChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFilters({ ...filters, se_gradeleverl: selectedValues });
  };

  const handlefilter = (selectedOption) => {
    const selectedValue = selectedOption.map((option) => option.value);
    setDomainfilter({ ...domainfilter, se_board: selectedValue });
  };

  const handleSearch = (query) => {
    setSearch({ ...search, query });
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    let requestData = {
      request: {
        filters: {
          status: ["Live"],
          contentType: [
            "Collection",
            "TextBook",
            "Course",
            "LessonPlan",
            "Resource",
            "SelfAssess",
            "PracticeResource",
            "LearningOutcomeDefinition",
            "ExplanationResource",
            "ExperientialResource",
            "eTextBook",
            "TVLesson",
          ],
          se_boards: domainfilter.se_board || [domain],
          se_gradeLevels: filters.se_gradeleverl,
        },
        limit: 20,
        query: search.query || domainquery || globalSearchQuery,
        offset: 20 * (currentPage - 1),
        sort_by: {
          lastUpdatedOn: "desc",
        },
      },
    };

    let req = JSON.stringify(requestData);

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.CONTENT.SEARCH}?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.ContentPlayer.contentApiQueryParams.licenseDetails}`;

      const response = await contentService.getAllContents(url, req, headers);

      if (response.data.result.content && response.data.result.count <= 20) {
        setTotalPages(1);
      } else if (response.data.result.count > 20) {
        setTotalPages(Math.floor(response.data.result.count / 20));
      }

      setData(response.data.result);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      setIsLoading(false);
    }
  };

  const getRandomValue = () => {
    const randomIndex = RandomImage;
    return randomIndex;
  };

  const handleChange = (event, value) => {
    if (value !== pageNumber) {
      setPageNumber(value);
      setCurrentPage(value);
      setData({});
      navigate(`/contentList/${value}`, { state: { domain: domain } });
      // fetchData();
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back in history
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

  const handleCardClick = (contentId, courseType) => {
    if (courseType === "Course") {
      // navigate("/joinCourse", { state: { contentId } });
      navigate(`/joinCourse/${contentId}`);
    } else {
      navigate("/player");
    }
  };

  const handleDomainFilter = (query, domainName) => {
    setDomain(query);
    setPageNumber(1);
    setCurrentPage(1);
    setData({});
    setDomainName(domainName);
    navigate(`/contentList/1`, { state: { domain: query } });
  };

  return (
    <div>
      <Header globalSearchQuery={globalSearchQuery} />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}

      <Box>
        {domainList && domainList.length > 0 ? (
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            <DomainCarousel
              // className={`my-class ${
              //   activeStates[index] ? "carousel-active-ui" : ""
              // }`}
              onSelectDomain={handleDomainFilter}
              selectedDomainCode={domain}
              domains={domainList}
            />
          </Carousel>
        ) : (
          <NoResult />
        )}
      </Box>

      <Container maxWidth="xl" role="main" className="allContent">
        {/* <Box style={{ margin: "20px 0" }}> */}
        {/* <domainCarousel></domainCarousel> */}
        {/* <Box
            style={{ display: "flex", justifyContent: "space-between" }}
            className="filter-domain"
          >
            <Filter
              options={gradeLevels}
              label="Filter by Sub-Domain"
              onChange={handleFilterChange}
            />
            {!domain && (
              <Filter
                options={category}
                label="Filter by Domain"
                onChange={handlefilter}
              />
            )}
          </Box> */}
        {/* </Box> */}
        <Box
          className="d-flex jc-bw mr-20 my-20"
          style={{ alignItems: "center" }}
        >
          {domainName && (
            <Box
              sx={{ marginTop: "10px", alignItems: "center" }}
              className="d-flex h3-title ml-neg-20"
            >
              {t("YOU_ARE_VIEWING_CONTENTS_FOR")}
              <Box
                sx={{ fontSize: "16px", fontWeight: "600", paddingLeft: "5px" }}
                className="text-blueShade2"
              >
                {domainName}
              </Box>
            </Box>
          )}
          <Link onClick={handleGoBack} className="viewAll">
            {t("BACK")}
          </Link>
        </Box>
        <Grid container spacing={2} className="pt-8 mt-15">
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            className="sm-p-25 left-container mt-2 xs-hide left-filter"
            style={{ padding: "0" }}
          >
            <DrawerFilter />
          </Grid>
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
                ) : data && data.content && data.content.length > 0 ? (
                  <div>
                    <Grid
                      container
                      spacing={2}
                      style={{ margin: "20px 0", marginBottom: "10px" }}
                    >
                      {data?.content?.map((items, index) => (
                        <Grid
                          item
                          xs={2}
                          md={6}
                          lg={3}
                          style={{ marginBottom: "10px" }}
                          key={items.identifier}
                        >
                          <BoxCard
                            items={items}
                            index={index}
                            onClick={() =>
                              handleCardClick(
                                items.identifier,
                                items.contentType
                              )
                            }
                          ></BoxCard>
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

export default ContentList;
