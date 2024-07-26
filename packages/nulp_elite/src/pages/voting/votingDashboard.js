import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Button, Card, CardContent, Pagination, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
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
const votingDashboard = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [pollsData, setPollsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const shareUrl = window.location.href;
  const [showAll, setShowAll] = useState(false);
  

  const handleShowMore = () => {
    setShowAll(true);
  };

  const visiblePolls = showAll ? pollsData : pollsData.slice(0, 3);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const polldata = require("./polls.json");



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  const piedata = [
    { id: 'Yes', value: 67, color: '#00B135' },
    { id: 'Maybe', value: 20, color: '#E8C532' },
    { id: 'No', value: 13, color: '#B987FF' },
  ];
  const fetchPolls = async (visibility) => {
    setIsLoading(true);
    setError(null);

    const requestBody = {
      request: {
        filters: {
          visibility,
          status: "Live",
        },
        sort_by: {
          created_at: "desc",
          start_date: "desc",
        },
        // offset: (currentPage - 1) * 10,
        // limit: 10,
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
      setPollsData(result.result.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPolls();
  }, []);

  const handleCardClick = () => {
    navigate(`/webapp/pollsDetails`);
  };

  return (
    <div>
      <Header />
      <Container
        maxWidth="xl"
        role="main"
        className="xs-pb-20 lg-pt-20 min-"
      >
        <Box mb={2} mt={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                className="searchbar"
                placeholder="Search for a poll"
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}
              sx={{ color: '#000000b3', textAlign: 'center' }}>
              Select Date Range
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MuiDatePicker label="Select Date from" />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MuiDatePicker label="Select Date To" />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={1}>
              <Button type="button" className="custom-btn-primary">
                Go Back
              </Button>
            </Grid>
          </Grid>
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
          {!showAll && pollsData.length > 3 && (
            <Box>
              <Button type="button" className="custom-btn-primary ml-20" onClick={handleCardClick}>
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
          {visiblePolls &&
            visiblePolls.map((items, index) => (
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                style={{ marginBottom: "10px" }}
                key={items.poll_id}
              >
                <Card
                  className="cardBox1 pb-20"
                  sx={{ position: "relative", cursor: "pointer", textAlign: "left" }}
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
                      <Button type="button" className="custom-btn-primary ml-20 lg-mt-20" onClick={handleOpenModal}>
                        View Slots <ArrowForwardIosOutlinedIcon className="fs-12" />
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
          className="mb-20 mt-20"
        >
          <Box display="flex" alignItems="center" className="h3-title">
            <SaveAsIcon style={{ paddingRight: "10px" }} />
            Draft
          </Box>
          <Box>
            <Button type="button" className="custom-btn-primary ml-20">
              View All
            </Button>
          </Box>
        </Box> 
        <Grid
          container
          spacing={2}
          style={{ marginBottom: "5px" }}
        >
          {polldata &&
            polldata.map((items, index) => (
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                style={{ marginBottom: "10px" }}
                key={items.poll_id}
              >
                <Card
                  className="cardBox pb-20"
                  sx={{ position: "relative", cursor: "pointer", textAlign: "left" }}
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
                  <Box className="voting-buttons lg-mt-30">
                    <Box>
                      <Button type="button" className="custom-btn-primary ml-20 lg-mt-20">
                        Edit <ArrowForwardIosOutlinedIcon className="fs-12" />
                      </Button>
                    </Box>
                    <Box>
                      <Button type="button" className="custom-btn-default ml-20 lg-mt-20 mr-13">
                        Delete <ArrowForwardIosOutlinedIcon className="fs-12" />
                      </Button>
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
          className="mb-20 mt-20"
        >
          <Box display="flex" alignItems="center" className="h3-title">
            <WorkspacePremiumIcon style={{ paddingRight: "10px" }} />
            Closed Polls
          </Box>
          <Box>
            <Button type="button" className="custom-btn-primary ml-20">
              View All
            </Button>
          </Box>
        </Box>

        <Grid
          container
          spacing={2}
          style={{ marginBottom: "30px" }}
        >
          {polldata &&
            polldata.map((items, index) => (
              <Grid
                item
                xs={12}
                md={4}
                lg={4}
                style={{ marginBottom: "10px" }}
                key={items.poll_id}
              >
                <Card
                  className="cardBox pb-20"
                  sx={{ position: "relative", cursor: "pointer", textAlign: "left" }}
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
                      <Button type="button" className="custom-btn-primary ml-20 lg-mt-20" onClick={handleOpenModal}>
                        View Results <ArrowForwardIosOutlinedIcon className="fs-12" />
                      </Button>
                    </Box>
                    <Box className="xs-hide">
                      <FacebookShareButton className="pr-5">
                        <FacebookIcon size={32} round={true} />
                      </FacebookShareButton>
                      <WhatsappShareButton className="pr-5">
                        <WhatsappIcon size={32} round={true} />
                      </WhatsappShareButton>
                      <LinkedinShareButton className="pr-5">
                        <LinkedinIcon size={32} round={true} />
                      </LinkedinShareButton>
                      <TwitterShareButton className="pr-5">
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
                <PieChart
                  series={[
                    {
                      data: piedata.map((d) => ({
                        id: d.id,
                        value: d.value,
                        color: d.color,
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
                India will win the Gold Medal for at least 5 sports this year!
              </Box>
              <Box className="lg-mt-12 h6-title Link">#CheerforBharat Paris Olympics Survey</Box>
              <Box>
                <Box className="mt-9 h5-title">
                  Poll Created On:
                  <TodayOutlinedIcon className="fs-14 pr-5" /> 25th July, 2024
                </Box>
                <Box className="mt-9 h5-title">Total Votes: 1200</Box>
                <Box className="mt-9 h5-title">Total Voted Users: 800</Box>
                <Box className="mt-9 h5-title">
                  Voting Ended On:
                  <TodayOutlinedIcon className="fs-14 pr-5" /> 25th July, 2024
                </Box>
                <Box className="lg-mt-12 h5-title">Voting Criteria: At least 5 sports</Box>
                <Box>
                  <Button type="button" className="primary-btn lg-mt-20">
                    Share Results <ShareIcon className="fs-14 pl-18" />
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default votingDashboard;