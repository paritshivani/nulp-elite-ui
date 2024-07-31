import React, { useState, useEffect } from "react";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import { Button, Card, CardContent } from "@mui/material";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import IconButton from "@mui/material/IconButton";
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
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useNavigate } from 'react-router-dom';


const pollsDetailes = () => {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [signlePOll, setSinglePoll] = useState([]);
  const [pollResult, setPollResult] = useState([]);
  const { polls, type } = location.state || { polls: [], type: '' };
  const [pieData, setPieData] = useState([]);
  const shareUrl = window.location.href;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  const navigate = useNavigate();
  const handleOpenModal = async (pollId, event) => {
    event.stopPropagation();
    setOpenModal(true);
    try {
      const response = await axios.get(
        `${urlConfig.URLS.POLL.GET_POLL}?poll_id=${pollId}`
      );
      setSinglePoll(response.data.result.poll);
      setPieData(response.data.result.result);
    } catch (error) {
      console.error("Error fetching poll", error);
    }
  };

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setOpenModal(false);
    setPollResult(null);
  };

  const handleCardClick = (poll_id) => {
    navigate(`/webapp/votingDetails?${poll_id}`);
  };

  const handleBackNavigate = () => {
    navigate('/webapp/votingDashboard');
  };

  const deletePoll = async (pollId, event) => {
    event.stopPropagation();
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

  const totalVotes = pieData?.reduce((sum, option) => sum + option.count, 0);

  const getProgressValue = (count) =>
    totalVotes > 0 ? (count / totalVotes) * 100 : 0;
  console.log(getProgressValue, 'getProgressValue');

  useEffect(() => {
    getProgressValue();
  }, [pieData]);
  const hasPollData = pieData.some((d) => d.count > 0);

  const openSocialMediaLink = (event, url) => {
    event.stopPropagation();
    event.preventDefault();
    window.open(url, "_blank");
  };

  const handleEdit = (event, item) => {
    event.stopPropagation();
    navigate("/webapp/createform", { state: item });
  };

  return (
    <div>
      <Header />

      <div>
        {polls.length === 0 ? (
          <p>No polls available</p>
        ) : (
          <Container maxWidth="xl" role="main" className="xs-pb-20 lg-pt-20 min-">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              className="mb-20 mt-20 mr-13"
            >
              <Box display="flex" alignItems="center" className="h3-title">
                {type === 'live' ? (
                  <Box>
                    <DashboardOutlinedIcon style={{ paddingRight: '10px' }} /> Live Polls
                  </Box>
                ) : type === 'closed' ? (
                  <Box>
                    <WorkspacePremiumIcon style={{ paddingRight: '10px' }} /> Closed Polls
                  </Box>
                ) : (
                  <Box>
                    <DashboardOutlinedIcon style={{ paddingRight: '10px' }} /> Draft Polls
                  </Box>
                )}
              </Box>
              <Box>
                <Button type="button" className="custom-btn-primary ml-20" onClick={handleBackNavigate}>
                  Back
                </Button>
              </Box>
            </Box>
            <Grid container spacing={2} style={{ marginBottom: '30px' }}>
              {polls &&
                polls.map((items, index) => (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={4}
                    style={{ marginBottom: '10px' }}
                    key={items.poll_id}
                  >
                    <Card
                      className="cardBox1 pb-20"
                      sx={{
                        position: 'relative',
                        cursor: 'pointer',
                        textAlign: 'left',
                        borderRadius: '10px',
                        boxShadow: '0 4px 4px 0 #00000040!important',
                      }}
                      onClick={() => handleCardClick(items.poll_id)}
                    >
                      <CardContent className="d-flex jc-bw">
                        <Box>
                          {items.title && (
                            <Typography gutterBottom className="mt-10 event-title">
                              {items.title}
                            </Typography>
                          )}
                          <Box className="d-flex h6-title mt-30" style={{ color: '#484848' }}>
                            <Box className="d-flex jc-bw alignItems-center fs-14">
                              <TodayOutlinedIcon className="fs-14 pr-5" />
                              {formatDate(items.start_date)}
                            </Box>
                          </Box>
                        </Box>
                        <Box className="card-img-container" style={{ position: 'inherit' }}>
                          <img
                            src={items.image ? items.image : require('assets/default.png')}
                            className="event-card-img"
                            alt="App Icon"
                          />
                        </Box>
                      </CardContent>
                      <Box className="voting-text lg-mt-30">
                        {type === 'Draft' ? (
                          <Box>
                            <Button type="button" className="custom-btn-primary ml-20 lg-mt-20" 
                            onClick={(event) => handleEdit(event, items)}>
                              Edit <ArrowForwardIosOutlinedIcon className="fs-12" />
                            </Button>
                            <Button
                              type="button"
                              className="custom-btn-primary ml-20 lg-mt-20"
                              onClick={(event) => deletePoll(items.poll_id, event)}
                            >
                              Delete <ArrowForwardIosOutlinedIcon className="fs-12" />
                            </Button>
                          </Box>
                        ) : type === 'live' ? (
                          <Box>
                            <Button
                              type="button"
                              className="custom-btn-primary ml-20 lg-mt-20"
                              onClick={(event) => handleOpenModal(items.poll_id, event)}
                            >
                              View Stats <ArrowForwardIosOutlinedIcon className="fs-12" />
                            </Button>
                          </Box>
                        ) : type === 'closed' ? (
                          <Box>
                            <Button
                              type="button"
                              className="custom-btn-primary ml-20 lg-mt-20"
                              onClick={(event) => handleOpenModal(items.poll_id, event)}
                            >
                              View Results <ArrowForwardIosOutlinedIcon className="fs-12" />
                            </Button>
                          </Box>
                        ) : null}
                        <Box className="xs-hide">
                          <FacebookShareButton
                            url={shareUrl}
                            className="pr-5"
                            quote={`Check out this poll: ${items.title}`}
                            onClick={(event) => {
                              openSocialMediaLink(event, shareUrl);
                            }}
                          >
                            <FacebookIcon url={shareUrl} size={32} round={true} />
                          </FacebookShareButton>
                          <WhatsappShareButton
                            url={shareUrl}
                            title={`Check out this poll: ${items.title}`}
                            separator=":: "
                            className="pr-5"
                            onClick={(event) =>
                              openSocialMediaLink(event, shareUrl)
                            }
                          >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                          <LinkedinShareButton
                            url={shareUrl}
                            className="pr-5"
                            title={items.title}
                            summary={`Participate in this poll: ${items.title}`}
                            onClick={(event) => {
                              openSocialMediaLink(event, shareUrl);
                            }}
                          >
                            <LinkedinIcon size={32} round={true} />
                          </LinkedinShareButton>
                          <TwitterShareButton
                            url={shareUrl}
                            className="pr-5"
                            title={`Check out this poll: ${items.title}`}
                            onClick={(event) => {
                              openSocialMediaLink(event, shareUrl);
                            }}
                          >
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
                  {hasPollData ? (
                    <PieChart
                      series={[
                        {
                          data: pieData.map((d) => ({
                            id: d.poll_option,
                            value: d.count,
                          })),
                          arcLabel: (item) => (
                            <>
                              {item.id}
                              <br />
                              ({getProgressValue(item.value)})
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
                    <Box>No data available</Box>
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
                  <Box className="mt-9 h5-title">
                    Total Votes: {totalVotes}
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