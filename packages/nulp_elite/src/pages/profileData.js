import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Button,
  DialogActions,
} from '@mui/material';
import Select from 'react-select';
import axios from 'axios';
const userData = require('../assets/userData.json');
import * as util from '../services/utilService';
const urlConfig = require('../configs/urlConfig.json');

const PopupForm = ({ open, handleClose }) => {
  const [organization, setOrganization] = useState('');
  const [bio, setBio] = useState('');
  const [designation, setDesignation] = useState('');
  const [userType, setUserType] = useState('');
  const [designations, setDesignations] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [customDesignation, setCustomDesignation] = useState('');
  const [customUserType, setCustomUserType] = useState('');
  const _userId = util.userId();

  useEffect(() => {
    setDesignations([
      ...userData.designations.map((type) => ({ value: type, label: type })),
      { value: 'other', label: 'Other' }
    ]);
    setUserTypes([
      ...userData.userTypes.map((type) => ({ value: type, label: type })),
      { value: 'other', label: 'Other' }
    ]);
  }, []);

  const isSubmitDisabled = !organization || !designation || !userType || (designation === 'other' && !customDesignation) || (userType === 'other' && !customUserType);

  const handleSubmit = async () => {
    const finalDesignation = designation === 'other' ? customDesignation : designation;
    const finalUserType = userType === 'other' ? customUserType : userType;

    const requestData = {
      organisation: organization,
      designation: finalDesignation,
      user_type: finalUserType,
      bio: bio
    };

    try {
      const url = `${urlConfig.URLS.POFILE_PAGE.USER_UPDATE}?user_id=${_userId}`;
      const response = await axios.put(url, requestData);
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error);
    }

    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>User Information</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={<span>Organization <span style={{ color: 'red' }}>*</span></span>}
          type="text"
          fullWidth
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Bio"
          type="text"
          fullWidth
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <Select
            options={designations}
            value={designations.find((option) => option.value === designation)}
            onChange={(selectedOption) => setDesignation(selectedOption.value)}
            placeholder="Select Designation"
            isClearable
          />
          {designation === 'other' && (
            <TextField
              margin="dense"
              label="Enter Custom Designation"
              type="text"
              fullWidth
              value={customDesignation}
              onChange={(e) => setCustomDesignation(e.target.value)}
            />
          )}
        </FormControl>
        <FormControl fullWidth margin="dense">
          <Select
            options={userTypes}
            value={userTypes.find((option) => option.value === userType)}
            onChange={(selectedOption) => setUserType(selectedOption.value)}
            placeholder="Select User Type"
            isClearable
          />
          {userType === 'other' && (
            <TextField
              margin="dense"
              label="Enter Custom User Type"
              type="text"
              fullWidth
              value={customUserType}
              onChange={(e) => setCustomUserType(e.target.value)}
            />
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupForm;
