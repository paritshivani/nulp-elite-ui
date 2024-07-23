import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import VotingCard from "../../components/VotingCard";
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
const data = require("./polls.json");
import ToasterCommon from "../ToasterCommon";
import VotingDrawerFilter from "../../components/VotingDrawerFilter";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";

import FloatingChatIcon from "components/FloatingChatIcon";
const urlConfig = require("../../configs/urlConfig.json");

console.log("ekta1", data);

const VotingList = (props) => {
  console.log("ekta", data);
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [valueTab, setValueTab] = React.useState("2");

  const [globalSearchQuery, setGlobalSearchQuery] = useState(
    location.state?.globalSearchQuery || undefined
  );
  const [searchQuery, setSearchQuery] = useState(globalSearchQuery || "");
  // Function to handle data from the child
  const handlefilterChanges = (selectedFilters) => {
    setStartDateFilter(selectedFilters.startDate);
    setEndDateFilter(selectedFilters.endDate);
    setSubDomainFilter(selectedFilters.subDomainFilter);
    setSearchQuery(selectedFilters.eventSearch);

    fetchAllData();
  };
  const handleCardClick = (poll_id) => {
    navigate(`/webapp/eventDetails?${poll_id}`);
  };
  return (
    <div>
      Vting list
      <Header globalSearchQuery={globalSearchQuery} />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      <Container maxWidth="xl" role="main" className="xs-pb-20 votingList">
        <Grid
          container
          spacing={2}
          className="pt-8 mt-2 custom-event-container min-472"
          style={{ paddingTop: "0" }}
        >
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            className="sm-p-25 left-container  flter-btn w-100 my-20"
            style={{
              padding: "0",
              borderRight: "none",
              background: "none",
              boxShadow: "none",
            }}
          >
            <VotingDrawerFilter />
          </Grid>
          <Grid item xs={12} md={8} lg={9} className="pb-20 pt-0 event-list ">
            <Box textAlign="center" padding="10">
              <Box>
                {/* {isLoading ? (
                  <p>{t("LOADING")}</p>
                ) : error ? (
                  <Alert severity="error">{error}</Alert>
                ) : data ? ( */}
                <div>
                  <TabContext value={valueTab} className="eventTab">
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        // onChange={handleChangeTab}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          label="Private Polls"
                          className="tab-text"
                          icon={<RecentActorsOutlinedIcon />}
                          value="1"
                        />
                        <Tab
                          label="All Polls"
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
                        {data && data.length != 0 ? (
                          data.map((items, index) => (
                            <Grid
                              item
                              xs={12}
                              md={6}
                              lg={6}
                              style={{
                                marginBottom: "10px",
                              }}
                              key={items.poll_id}
                            >
                              <VotingCard
                                items={items}
                                index={index}
                                onPress={() => handleCardClick(items.poll_id)}
                              ></VotingCard>
                            </Grid>
                          ))
                        ) : (
                          <NoResult />
                        )}
                      </Grid>
                    </TabPanel>
                    <TabPanel value="2" className="mt-15">
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: "5px" }}
                      >
                        {data ? (
                          data.map((items, index) => (
                            <Grid
                              item
                              xs={12}
                              md={6}
                              lg={6}
                              style={{ marginBottom: "10px" }}
                              key={items.poll_id}
                            >
                              <VotingCard
                                items={items}
                                index={index}
                                onClick={() => handleCardClick(items.poll_id)}
                              ></VotingCard>
                            </Grid>
                          ))
                        ) : (
                          <NoResult />
                        )}
                      </Grid>
                      {/* <Pagination
                          count={totalPages}
                          page={currentPage}
                          onChange={handlePageChange}
                        /> */}
                    </TabPanel>
                  </TabContext>
                </div>
                {/* ) : (
                  <NoResult /> // Render NoResult component when there are no search results
                )} */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <FloatingChatIcon />
      <Footer />
    </div>
  );
};

export default VotingList;
