import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton, Button, Grid } from '@mui/material';
import * as util from "services/utilService";
const urlConfig = require("../../configs/urlConfig.json");
import CloseIcon from "@mui/icons-material/Close";
import Divider from '@mui/material/Divider';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

const LernModal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(() => {
    // Check if the modal has been shown in the current session
    const isModalShown = sessionStorage.getItem('isModalShown');
    return isModalShown !== 'true'; // Show modal if not already shown
  });

  const [lernUser, setLernUser] = useState([]);
  const _userId = util.userId();
  const handleClose = () => {
    setIsModalOpen(false);
    sessionStorage.setItem('isModalShown', 'true'); // Set flag to not show modal again
  };

  const fetchData = async () => {
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.USER.GET_PROFILE}${_userId}`;
      const response = await fetch(url);
      const data = await response.json();
      const rolesData = data.result.response.channel;
      setLernUser(rolesData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch data when the component mounts or _userId changes
  useEffect(() => {
    if (_userId) {
      fetchData();
    }
  }, [_userId]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    borderRadius:'10px',
    width: {
      xs: '100%', 
      sm: '100%',  
      md: '600px',  
    },
  };
  console.log(lernUser, 'lernUser form modal');

  const handleCardClick = () => {
    if (lernUser === 'nulp-learn') {
      // Navigate to /webapp/learnthon if lernUser is 'nulp-learn'
      navigate('/webapp/learnthon');
      setIsModalOpen(false);
    } else {
      navigate('/webapp/SubmissionList');
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Box className="h2-title">
                {t("LERN_title")}
              </Box>
            </Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box className="mt-10 xs-mb-10">
            <Divider />
          </Box>
          <Grid container spacing={2}>
            
            <Grid item xs={4}>
            <Box className='profileBox'>
              <img
                src={require("../../assets/image24.png")}
                alt=""
              />
              </Box>
            </Grid>
            <Grid item xs={8}>
            <Box className='profileBox ml-20'>
              <Box className='mt-20'>
                  {t("LERN_MESSAGE")}
              </Box>
              <Box className='mt-20'>
                  {t("LERN_MESSAGE_LINE_TWO")}
              </Box>
             
              <Box className='lg-mt-30'>
                {lernUser === 'nulp-learn' ? (
                  <Button className="viewAll" onClick={handleCardClick}>
                    {t("PARTICIPATE_NOW")}
                  </Button>
                ) : (
                  <Button className="viewAll" onClick={handleCardClick}>
                    {t("PARTICIPATE_NOW")}
                  </Button>
                )}
              </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default LernModal;
