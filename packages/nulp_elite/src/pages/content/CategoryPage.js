import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import BoxCard from "components/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getAllContents } from "services/contentService";
import Header from "components/header";
import Footer from "components/Footer";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import Alert from "@mui/material/Alert";

import domainWithImage from "../../assets/domainImgForm.json";
import DomainCarousel from "components/domainCarousel";
import * as frameworkService from "../../services/frameworkService";

import SearchBox from "components/search";
import { t } from "i18next";
import appConfig from "../../configs/appConfig.json";
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";
import SkeletonLoader from "components/skeletonLoader";

const CategoryPage = () => {
  // const history = useHistory();
  // const { category } = useParams();
  const [domain, setDomain] = useState([]);
  const [channelData, setChannelData] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { pageNumber } = useParams(1);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);

  const [itemsArray, setItemsArray] = useState([]);
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [domainName, setDomainName] = useState("");
  const routeConfig = require("../../configs/routeConfig.json");
  const location = useLocation();
  const queryString = location.search;
  const category = queryString.startsWith("?")
    ? decodeURIComponent(queryString.slice(1))
    : null;

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleDomainFilter = (query, domainName) => {
    setSelectedDomain(query);
    setDomainName(domainName);
    console.log("Search query:", selectedDomain);
    fetchMoreItems(query, domainName);
  };

  useEffect(() => {
    if (selectedDomain) {
      fetchMoreItems(category, selectedDomain);
    }
  }, [selectedDomain]);

  const handleGoBack = () => {
    navigate(-1); // Navigate back in history
  };

  const fetchMoreItems = async (category, selectedDomain) => {
    setError(null);
    let data = JSON.stringify({
      request: {
        filters: {
          primaryCategory: [category],
          visibility: [],
          se_boards: [selectedDomain],
        },
        limit: 20,
        sort_by: {
          lastPublishedOn: "desc",
        },
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

    // Headers
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CONTENT.SEARCH}?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}&licenseDetails=${appConfig.ContentPlayer.contentApiQueryParams.licenseDetails}`;
      const response = await getAllContents(url, data, headers);
      setData(response.data.result.content);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };
  // Function to push data to the array
  const pushData = (term) => {
    setItemsArray((prevData) => [...prevData, term]);
  };

  const fetchDomains = async () => {
    setError(null);
    const rootOrgId = sessionStorage.getItem("rootOrgId");
    const defaultFramework = localStorage.getItem("defaultFramework");
    // Headers
    const headers = {
      "Content-Type": "application/json",
      Cookie: `connect.sid=${getCookieValue("connect.sid")}`,
    };
    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CHANNEL.READ}/${rootOrgId}`;
      const response = await frameworkService.getChannel(url, headers);
      // console.log("channel---",response.data.result);
      setChannelData(response.data.result);
    } catch (error) {
      console.log("error---", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.FRAMEWORK.READ}/nulp?orgdetails=${appConfig.ContentPlayer.contentApiQueryParams.orgdetails}`;

      const response = await frameworkService.getSelectedFrameworkCategories(
        url,
        headers
      );

      response.data.result.framework.categories[0].terms.forEach((term) => {
        if (domainWithImage) {
          domainWithImage.result.form.data.fields.forEach((imgItem) => {
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
  useEffect(() => {
    if (category) {
      fetchMoreItems(category, selectedDomain);
    }
    fetchDomains();
  }, [category]);

  const handleCardClick = (contentId, courseType) => {
    if (courseType === "Course") {
      navigate(
        `${routeConfig.ROUTES.JOIN_COURSE_PAGE.JOIN_COURSE}?${contentId}`
      );
    } else {
      navigate(routeConfig.ROUTES.PLAYER_PAGE.PLAYER);
    }
  };

  return (
    <>
      <Header />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}

      {domain.length > 0 ? (
        <DomainCarousel onSelectDomain={handleDomainFilter} domains={domain} />
      ) : (
        <SkeletonLoader />
      )}

      <Container
        maxWidth="xl"
        role="main"
        className="allContent xs-pb-20 pb-30 domain-list"
      >
        {domainName && (
          <Box
            className="d-flex jc-bw mr-20 my-20"
            style={{ alignItems: "center" }}
          >
            <Box
              sx={{ marginTop: "10px", alignItems: "center" }}
              className="d-flex h3-title xs-d-none"
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
          <Alert className="my-4" severity="error">
            {error}
          </Alert>
        )}
        <Box
          className="d-flex jc-bw mr-20 my-20 px-10"
          style={{ alignItems: "center" }}
        >
          <p className="h3-title">{category}</p>
          <Link onClick={handleGoBack} className="viewAll mr-13">
            {t("BACK")}
          </Link>
        </Box>

        <Box textAlign="center">
          <Box className="custom-card xs-pb-20">
            {data &&
              data.map((item) => (
                <Box
                  className="custom-card-box"
                  key={item.id}
                  style={{ marginBottom: "10px" }}
                >
                  <BoxCard
                    items={item}
                    index={item.count}
                    onClick={() =>
                      handleCardClick(item.identifier, item.contentType)
                    }
                  ></BoxCard>
                </Box>
              ))}
            <div className="blankCard"></div>
          </Box>
        </Box>
      </Container>
      {/* <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={handleChange}
        /> */}
      <Footer />
    </>
  );
};

export default CategoryPage;
