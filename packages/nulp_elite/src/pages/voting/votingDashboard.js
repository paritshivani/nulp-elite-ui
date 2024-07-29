import React, { useEffect, useState,useCallback } from "react";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import { useTranslation } from "react-i18next";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { Button, Card, CardContent, Pagination, TextField } from "@mui/material";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
const urlConfig = require("../../configs/urlConfig.json");
import { useNavigate } from 'react-router-dom';
import ToasterCommon from "../ToasterCommon";

const votingDashboard = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [pollResult, setPollResult] = useState([]);
  const [poll, setPoll] = useState([]);
  const [signlePOll, setSinglePoll] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const shareUrl = window.location.href;
  const hasData = Array.isArray(pollResult) && pollResult.some((d) => d.count > 0);
  const [showAllLive, setShowAllLive] = useState(false);
  const [showAllDraft, setShowAllDraft] = useState(false);
  const [showAllClosed, setShowAllClosed] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedStartDate: null,
    selectedEndDate: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleViewAll = (polls, type) => {
    navigate('/webapp/pollsDetails', { state: { polls, type } });
  };

  const fetchPolls = async () => {
    setIsLoading(true);
    setError(null);

    const requestBody = {
      request: {
        filters: {
          status: filters.status,
          from_date: filters.selectedStartDate,
          to_date: filters.selectedEndDate,
        },
        search: filters.searchTerm || "",
        sort_by: {
          created_at: "desc",
          start_date: "desc",
        },
        offset: (currentPage - 1) * 10,
        limit: 10,
      },
    };

    try {
      const response = await fetch(`${urlConfig.URLS.POLL.LIST}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch polls");
      }

      const result = await response.json();
      setPoll(result.result.data);
      setPollResult(result.result.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };



  useEffect(() => {
    fetchPolls();
  }, []);

  const handleOpenModal = async (pollId,event) => {
    event.stopPropagation();
    setOpenModal(true);
    try {
      const response = await axios.get(
        `${urlConfig.URLS.POLL.GET_POLL}?poll_id=${pollId}`
      );
      setSinglePoll(response.data.result.poll);
    } catch (error) {
      console.error("Error fetching poll", error);
    }
  };

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setOpenModal(false);
    setPollResult(null);
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleFilterChange = useCallback(() => {
    setFilters({
      searchTerm,
      selectedStartDate: selectedStartDate
        ? new Date(selectedStartDate).toISOString()
        : null,
      selectedEndDate: selectedEndDate
        ? new Date(selectedEndDate).toISOString()
        : null,
    });
  }, [searchTerm, selectedStartDate, selectedEndDate]);
  

useEffect(() => {
  handleFilterChange();
}, [searchTerm, selectedStartDate, selectedEndDate, handleFilterChange]);

useEffect(() => {
  fetchPolls();
}, [filters, currentPage]);

const handleClearAll = () => {
  setSearchTerm('');
  setSelectedStartDate(null);
  setSelectedEndDate(null);
  handleFilterChange();  
};



useEffect(() => {
  fetchPolls();
}, [filters, currentPage]);
 useEffect(() => {
  fetchPolls();
}, [filters, currentPage]);

  const deletePoll = async (pollId) => {
    try {
      const response = await axios.delete(`${urlConfig.URLS.POLL.DELETE_POLL}?poll_id=${pollId}`);
      if (response.status === 200) {
        setToasterMessage("Poll deleted successfully");
        fetchPolls();
        setPoll(prevPolls => {
          const updatedPolls = prevPolls.filter(poll => poll.poll_id !== pollId);
          return updatedPolls;
        });
      }
    } catch (error) {
      console.error("Error deleting poll", error);
    }
  };

  const livePolls = poll.filter(poll => poll.status === 'Live');
  const draftPolls = poll.filter(poll => poll.status === 'Draft');
  const closedPolls = poll.filter(poll => poll.status === 'Closed');

  const visibleLivePolls = showAllLive ? livePolls : livePolls.slice(0, 3);
  const visibleDraftPolls = showAllDraft ? draftPolls : draftPolls.slice(0, 3);
  const visibleClosedPolls = showAllClosed ? closedPolls : closedPolls.slice(0, 3);

  const handleCardClick = (poll_id) => {
    navigate(`/webapp/votingDetails?${poll_id}`);
  };

  return (
    <div>
      <Header />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      <Container
        maxWidth="xl"
        role="main"
        className="xs-pb-20 lg-pt-20 min-"
      >
        <Box mb={2} mt={2}>
      <Box className="p-15">
        <Grid container spacing={2} alignItems="center">
         
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-search">Search for a Poll</InputLabel>
              <OutlinedInput
                id="outlined-adornment-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle search visibility">
                      <SearchOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search poll"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            {/* <Box className="ml-20">Select Date Range</Box> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date From"
                value={selectedStartDate}
                onChange={(newValue) => setSelectedStartDate(newValue ? dayjs(newValue).toDate() : null)}
                renderInput={(params) => <OutlinedInput {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date To"
                value={selectedEndDate}
                onChange={(newValue) => setSelectedEndDate(newValue ? dayjs(newValue).toDate() : null)}
                renderInput={(params) => <OutlinedInput {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button type="button" className="custom-btn-primary" onClick={handleClearAll} fullWidth>
              Clear all
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>


        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          className="mb-20 mt-20 mr-13"
        >
          <Box display="flex" alignItems="center" className="h3-title">
            <DashboardOutlinedIcon style={{ paddingRight: "10px" }} />
            Live Polls
          </Box>
          {!showAllLive && visibleLivePolls.length >= 3 && (
            <Box>
              <Button type="button" className="custom-btn-primary ml-20"
                onClick={() => handleViewAll(visibleLivePolls, 'live')}>
                View All
              </Button>
            </Box>
          )}
        </Box>

        <Grid
          container
          spacing={2}
          style={{ marginBottom: "30px" }}
        >
          {visibleLivePolls &&
            visibleLivePolls.map((items, index) => (
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                style={{ marginBottom: "10px" }}
                key={items.poll_id}
              >
                
                <Card
                  className="pb-20"
                  sx={{ position: "relative", cursor: "pointer",textAlign: "left",borderRadius: '10px',
                  boxShadow: '0 4px 4px 0 #00000040!important' }}
                  onClick={() => handleCardClick(items.poll_id)}
                >
                  <CardContent className="d-flex jc-bw">
                    <Box>
                      {items.title && (
                        <Typography gutterBottom className="mt-10  event-title">
                          {items.title}
                        </Typography>
                      )}
                      <Box className="d-flex h6-title mt-30" style={{ color: "#484848" }}>
                        <Box className="d-flex jc-bw alignItems-center fs-14">
                          <TodayOutlinedIcon className="fs-14 pr-5" />
                          {formatDate(items.start_date)}
                        </Box>
                      </Box>
                    </Box>
                    <Box className="card-img-container" style={{ position: "inherit" }}>
                      <img
                        src={items.image ? items.image : require("assets/default.png")}
                        className="event-card-img"
                        alt="App Icon"
                      />
                    </Box>
                  </CardContent>
                  <Box className="voting-text lg-mt-30">
                    <Box>
                      <Button type="button" className="custom-btn-primary ml-20 lg-mt-20"
                        onClick={() => handleOpenModal(items.poll_id)}>
                        View Stats <ArrowForwardIosOutlinedIcon className="fs-12" />
                      </Button>

                    </Box>

                    <Box className="xs-hide">
                      <FacebookShareButton className="pr-5">
                        <FacebookIcon url={shareUrl} size={32} round={true} />
                      </FacebookShareButton>
                      <WhatsappShareButton className="pr-5">
                        <WhatsappIcon url={shareUrl} size={32} round={true} />
                      </WhatsappShareButton>
                      <LinkedinShareButton className="pr-5">
                        <LinkedinIcon url={shareUrl} size={32} round={true} />
                      </LinkedinShareButton>
                      <TwitterShareButton url={shareUrl} className="pr-5">
                        <img
                          src={require("../../assets/twitter.png")}
                          alt="Twitter"
                          style={{ width: 32, height: 32 }}
                        />
                      </TwitterShareButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          className="mb-20 mt-20 mr-13"
        >
          <Box display="flex" alignItems="center" className="h3-title">
            <DashboardOutlinedIcon style={{ paddingRight: "10px" }} />
            Draft Polls
          </Box>
          {!showAllDraft && visibleDraftPolls.length >= 1 && (
            <Box>
              <Button type="button" className="custom-btn-primary ml-20"
                onClick={() => handleViewAll(visibleDraftPolls, 'Draft')}>
                View All
              </Button>
            </Box>
          )}
        </Box>
        <Grid
          container
          spacing={2}
          style={{ marginBottom: "30px" }}
        >
          {visibleDraftPolls &&
            visibleDraftPolls.map((items, index) => (
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                style={{ marginBottom: "10px" }}
                key={items.poll_id}
              >
                <Card
                  className="pb-20"
                  sx={{ position: "relative", cursor: "pointer", textAlign: "left",borderRadius: '10px',
                  boxShadow: '0 4px 4px 0 #00000040!important' }}
                  onClick={() => handleCardClick(items.poll_id)}
                >
                  <CardContent className="d-flex jc-bw">
                    <Box>
                      {items.title && (
                        <Typography gutterBottom className="mt-10  event-title">
                          {items.title}
                        </Typography>
                      )}
                      <Box className="d-flex h6-title mt-30" style={{ color: "#484848" }}>
                        <Box className="d-flex jc-bw alignItems-center fs-14">
                          <TodayOutlinedIcon className="fs-14 pr-5" />
                          {formatDate(items.start_date)}
                        </Box>
                      </Box>
                    </Box>
                    <Box className="card-img-container" style={{ position: "inherit" }}>
                      <img
                        src={items.image ? items.image : require("assets/default.png")}
                        className="event-card-img"
                        alt="App Icon"
                      />
                    </Box>
                  </CardContent>
                  <Box className="voting-text lg-mt-30">
                    <Box>
                      <Button type="button" className="custom-btn-primary ml-20 lg-mt-20">
                        Edit  <ArrowForwardIosOutlinedIcon className="fs-12" />
                      </Button>
                      <Button type="button" className="custom-btn-primary ml-20 lg-mt-20"
                        onClick={() => deletePoll(items.poll_id)}>
                        Delete <ArrowForwardIosOutlinedIcon className="fs-12" />
                      </Button>
                    </Box>
                    <Box className="xs-hide">
                      <FacebookShareButton className="pr-5">
                        <FacebookIcon url={shareUrl} size={32} round={true} />
                      </FacebookShareButton>
                      <WhatsappShareButton className="pr-5">
                        <WhatsappIcon url={shareUrl} size={32} round={true} />
                      </WhatsappShareButton>
                      <LinkedinShareButton className="pr-5">
                        <LinkedinIcon url={shareUrl} size={32} round={true} />
                      </LinkedinShareButton>
                      <TwitterShareButton url={shareUrl} className="pr-5">
                        <img
                          src={require("../../assets/twitter.png")}
                          alt="Twitter"
                          style={{ width: 32, height: 32 }}
                        />
                      </TwitterShareButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          className="mb-20 mt-20 mr-13"
        >
          <Box display="flex" alignItems="center" className="h3-title">
            <WorkspacePremiumIcon style={{ paddingRight: "10px" }} />
            Closed Polls
          </Box>
          {!showAllClosed && visibleClosedPolls.length >= 1 && (
            <Box>
              <Button type="button" className="custom-btn-primary ml-20"
                onClick={() => handleViewAll(visibleClosedPolls, 'closed')}>
                View All
              </Button>
            </Box>
          )}
        </Box>
        <Grid
          container
          spacing={2}
          style={{ marginBottom: "30px" }}
        >
          {visibleClosedPolls &&
            visibleClosedPolls.map((items, index) => (
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                style={{ marginBottom: "10px" }}
                key={items.poll_id}
              >
                <Card
                  className="pb-20"
                  sx={{ position: "relative", cursor: "pointer", textAlign: "left",borderRadius: '10px',
                  boxShadow: '0 4px 4px 0 #00000040!important' }}
                  onClick={() => handleCardClick(items.poll_id)}
                >
                  <CardContent className="d-flex jc-bw">
                    <Box>
                      {items.title && (
                        <Typography gutterBottom className="mt-10  event-title">
                          {items.title}
                        </Typography>
                      )}
                      <Box className="d-flex h6-title mt-30" style={{ color: "#484848" }}>
                        <Box className="d-flex jc-bw alignItems-center fs-14">
                          <TodayOutlinedIcon className="fs-14 pr-5" />
                          {formatDate(items.start_date)}
                        </Box>
                      </Box>
                    </Box>
                    <Box className="card-img-container" style={{ position: "inherit" }}>
                      <img
                        src={items.image ? items.image : require("assets/default.png")}
                        className="event-card-img"
                        alt="App Icon"
                      />
                    </Box>
                  </CardContent>
                  <Box className="voting-text lg-mt-30">
                    <Box>
                      <Button type="button" className="custom-btn-primary ml-20 lg-mt-20"
                        onClick={() => handleOpenModal(items.poll_id)}>
                        View Results <ArrowForwardIosOutlinedIcon className="fs-12" />
                      </Button>
                    </Box>
                    <Box className="xs-hide">
                      <FacebookShareButton className="pr-5">
                        <FacebookIcon url={shareUrl} size={32} round={true} />
                      </FacebookShareButton>
                      <WhatsappShareButton className="pr-5">
                        <WhatsappIcon url={shareUrl} size={32} round={true} />
                      </WhatsappShareButton>
                      <LinkedinShareButton className="pr-5">
                        <LinkedinIcon url={shareUrl} size={32} round={true} />
                      </LinkedinShareButton>
                      <TwitterShareButton url={shareUrl} className="pr-5">
                        <img
                          src={require("../../assets/twitter.png")}
                          alt="Twitter"
                          style={{ width: 32, height: 32 }}
                        />
                      </TwitterShareButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
      <FloatingChatIcon />
      <Footer />
      {signlePOll && (
        <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={openModal}
          onClose={handleCloseModal}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                lg={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                  order: { xs: 2, lg: 1 },


                }}
              >
                <Box sx={{ marginLeft: '25%' }}>
                  {hasData ? (
                    <PieChart
                      series={[
                        {
                          data: signlePOll.map((d) => ({
                            id: d.poll_option,
                            value: d.count,
                            // color: d.color,
                          })),
                          arcLabel: (item) => (
                            <>
                              {item.id}
                              <br />
                              ({item.value}%)
                            </>
                          ),
                          arcLabelMinAngle: 45,
                        },
                      ]}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fill: 'white',
                          fontWeight: '500',
                        },
                      }}
                      width={350}
                      height={350}
                    />
                  ) : (
                    <p>No data available</p>
                  )}
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                lg={8}
                sx={{
                  p: 2,
                  order: { xs: 1, lg: 2 },
                }}
              >
                <Box className="h1-title fw-600 lg-mt-20">
                  {signlePOll.title}
                </Box>
                <Box className="lg-mt-12 h6-title Link">#CheerforBharat Paris Olympics Survey</Box>
                <Box>
                  <Box className="mt-9 h5-title">
                    Poll Created On:
                    <TodayOutlinedIcon className="fs-14 pr-5" />
                    {formatDate(signlePOll.created_at)}
                  </Box>
                  <Box className="mt-9 h5-title">
                    Voting Ended On:
                    <TodayOutlinedIcon className="fs-14 pr-5" /> {formatDate(signlePOll.end_date)}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
export default votingDashboard;