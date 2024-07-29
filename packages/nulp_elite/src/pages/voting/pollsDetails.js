import React, { useEffect, useState } from "react";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
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
import { useLocation } from 'react-router-dom';


const pollsDetailes = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [signlePOll,setSinglePoll] = useState([]);
  const [pollResult, setPollResult] = useState([]);
  const { polls, type } = location.state || { polls: [], type: '' };
  const hasData = Array.isArray(pollResult) && pollResult.some((d) => d.count > 0);
  const shareUrl = window.location.href;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleOpenModal = async (pollId) => {
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
  const handleCloseModal = () => {
    setOpenModal(false);
    setPollResult(null);
  };



  return (
    <div>
      <Header />
  
       <div>
      {polls.length === 0 ? (
        <p>No polls available</p>
      ) : (
      <Container
        maxWidth="xl"
        role="main"
        className="xs-pb-20 lg-pt-20 min-"
      >
      <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          className="mb-20 mt-20 mr-13"
        >
          {/* <Box display="flex" alignItems="center" className="h3-title">
            <DashboardOutlinedIcon style={{ paddingRight: "10px" }} />
            {}
          </Box> */}
        </Box>

        <Grid
          container
          spacing={2}
          style={{ marginBottom: "30px" }}
        >
          {polls &&
            polls.map((items, index) => (
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
                      <Button type="button" className="custom-btn-primary ml-20 lg-mt-20"
                        onClick={() => handleOpenModal(items.poll_id)}>
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
      </Container> 
      )}
    </div>
      <FloatingChatIcon />
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
      <Footer />
  
    </div>
  );
};
export default pollsDetailes;