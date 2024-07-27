import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import NoResult from "pages/content/noResultFound";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import ToasterCommon from "../ToasterCommon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MenuItem from "@mui/material/MenuItem";
import FloatingChatIcon from "components/FloatingChatIcon";
import { BorderRight } from "@mui/icons-material";
import * as util from "../../services/utilService";
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';

const createForm = () => {
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pollType, setPollType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [organisationName, setOrganisationName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [userList, setUserList] = useState([]);
  const [fields, setFields] = useState([{ id: 1, value: "" }]);
  const urlConfig = require("../../configs/urlConfig.json");
  const userId = util.userId();
  const [userData, setUserData] = useState([]);

  const [globalSearchQuery, setGlobalSearchQuery] = useState(
    location.state?.globalSearchQuery || undefined
  );
  const [orgUserList, setOrgUserList] = useState([]);
  const [orgList, setOrgList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(globalSearchQuery || "");
  const [userListFinal, setUserListFinal] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (id, event) => {
    const newFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, value: event.target.value };
      }
      return field;
    });
    setFields(newFields);
  };

  const addField = () => {
    const newId = fields.length ? fields[fields.length - 1].id + 1 : 1;
    setFields([...fields, { id: newId, value: "" }]);
  };

  const handleDeleteField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const [selectedValue, setSelectedValue] = useState("public");

  const handleRadioChange = (event) => {
    setVisibility(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (selectedOption === "option1") {
        try {
          const users = await getOrgUser(
            userData?.result?.response?.rootOrg?.id
          );
          const userIds = users.map((item) => item.userId);
          setUserListFinal(userIds);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, [userData, selectedOption]);
  const isFormValid = () => {
    return (
      title.length >= 10 &&
      description.length >= 100 &&
      startDate !== null &&
      endDate !== null
    );
  };

  const handleSubmit = async () => {
    const pollOptions = fields.map((field) => field.value);
    let data;
    if (visibility === "private") {
      data = {
        title,
        description,
        visibility,
        poll_options: pollOptions,
        poll_type: pollType,
        status: "Live",
        start_date: startDate,
        end_date: endDate,
        user_list: userListFinal,
      };
    } else {
      data = {
        title,
        description,
        visibility,
        poll_options: pollOptions,
        poll_type: pollType,
        status: "Live",
        start_date: startDate,
        end_date: endDate,
        user_list: userList,
      };
    }
    try {
      const response = await fetch(`${urlConfig.URLS.POLL.CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        setToasterMessage("Poll created successfully!");
        setToasterOpen(true);
        navigate("/webapp/votingList"); // Redirect to success page
      } else {
        throw new Error("Failed to create poll");
      }
    } catch (error) {
      setToasterMessage(error.message);
      setToasterOpen(true);
    }
  };
  const fetchData = async () => {
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.USER.GET_PROFILE}${userId}?fields=${urlConfig.params.userReadParam.fields}`;
      const response = await fetch(url);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getOrgUser = async (rootOrgId) => {
    const requestBody = {
      request: {
        filters: {
          status: "1",
          rootOrgId: rootOrgId,
        },
        sort_by: {
          lastUpdatedOn: "desc",
        },
      },
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.ADMIN.USER_SEARCH}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(t("FAILED_TO_FETCH_DATA"));
      }

      let responseData = await response.json();
      const users = responseData?.result?.response?.content || [];
      setOrgUserList(users);
      return users;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getOrgDetail = async (rootOrgId) => {
    const requestBody = {
      request: {
        query: "",
        filters: {
          channel: "niua",
        },
        limit: 100,
      },
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.ADMIN.ORG_SEARCH}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
        throw new Error(t("FAILED_TO_FETCH_DATA"));
      }

      let responseData = await response.json();

      const orgs = responseData?.result?.response?.content || [];
      setOrgList(orgs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    isFormValid();
    setOrganisationName(userData?.result?.response?.rootOrg?.orgName);
  }, [title, description, startDate, endDate, userData]);

  const roleNames =
    userData?.result?.response?.roles?.map((role) => role.role) || [];
  const isAdmin =
    roleNames.includes("SYSTEM_ADMINISTRATION") ||
    roleNames.includes("ORG_ADMIN");
  const isContentCreator = roleNames.includes("CONTENT_CREATOR");

  useEffect(() => {
    if (isContentCreator || isAdmin) {
      getOrgUser(userData?.result?.response?.rootOrg?.id);
      getOrgDetail(userData?.result?.response?.rootOrg?.id);
    }
  }, [isContentCreator, isAdmin, userData]);

  return (
    <div>
      <Header globalSearchQuery={globalSearchQuery} />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}

      <Container
        maxWidth="xl"
        role="main"
        className="xs-pb-20 createForm min-472"
        style={{ paddingTop: "0" }}
      >
        <Box className="voting-text1">
          <Box className="h3-custom-title pl-5 xs-py-10"><PollOutlinedIcon style={{paddingRight:"10px",verticalAlign:"middle"}}/>Poll Creation</Box>

          <Alert severity="info" className="custom-alert">
            Poll will be published Based on Start Date
          </Alert>
        </Box>

        <Grid
          container
          spacing={2}
          className="pt-8 mt-2 custom-event-container"
          style={{ paddingTop: "0" }}
        >
          <Grid item xs={12} md={4} lg={8} className="lg-pl-0">
            <TextField
              id="title"
              required
              label="Title"
              variant="outlined"
              className="mb-20"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={title.length > 0 && title.length < 10}
              helperText={
                title.length > 0 && title.length < 10
                  ? "Title must be at least 10 characters"
                  : ""
              }
            />
            <TextField
              id="description"
              label="Description"
              multiline
              rows={4}
              required
              className="mb-20"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={description.length > 0 && description.length < 100}
              helperText={
                description.length > 0 && description.length < 100
                  ? "Description must be at least 100 characters"
                  : ""
              }
            />
            <TextField
              id="poll_type"
              label="Poll Type"
              className="mb-20"
              multiline
              maxRows={4}
              value={pollType}
              onChange={(e) => setPollType(e.target.value)}
            />
            <Box className="mb-20">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Start Date"
                  required
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </LocalizationProvider>
            </Box>
            <Box className="mb-20">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="End Date"
                  required
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <FormControl style={{ width: "100%" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Visibility<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={visibility}
                onChange={handleRadioChange}
                className="mb-20"
              >
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public"
                />
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Invite only"
                />
              </RadioGroup>

              {visibility === "private" && (
                <Box
                  style={{
                    background: "#f4d88b",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <div>
                    {isContentCreator ? (
                      <TextField
                        label="Organization"
                        value={organisationName}
                        variant="outlined"
                        fullWidth
                        disabled
                      />
                    ) : isAdmin ? (
                      <Select
                        label="Select Organization"
                        value={organisationName}
                        onChange={(e) => setOrganisationName(e.target.value)}
                        fullWidth
                      >
                        {orgList?.map((org) => (
                          <MenuItem key={org.id} value={org.id}>
                            {org.orgName}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : null}

                    <RadioGroup
                      row
                      aria-labelledby="nested-radio-buttons-group-label"
                      name="nested-radio-buttons-group"
                      value={selectedOption}
                      onChange={handleSelectChange}
                      className="my-15"
                    >
                      <FormControlLabel
                        value="option1"
                        control={<Radio />}
                        label="All Users"
                      />
                      <FormControlLabel
                        value="option2"
                        control={<Radio />}
                        label="Select Users"
                      />
                    </RadioGroup>

                    {selectedOption === "option2" && (
                      <Select
                        label="Select Users"
                        multiple
                        value={userList}
                        onChange={(e) => setUserList(e.target.value)}
                        fullWidth
                        renderValue={(selected) =>
                          selected.map((user) => user.firstName).join(", ")
                        }
                      >
                        {orgUserList.map((user) => (
                          <MenuItem key={user.userId} value={user}>
                            <Checkbox
                              checked={userList.indexOf(user) > -1}
                              onChange={() => {
                                const isSelected = userList.indexOf(user) > -1;
                                const newSelectedUsers = isSelected
                                  ? userList.filter(
                                      (u) => u.userId !== user.userId
                                    )
                                  : [...userList, user];
                                setUserList(newSelectedUsers);
                              }}
                            />
                            {user.firstName} {user.lastName}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </div>
                </Box>
              )}
            </FormControl>
            <FormGroup className="d-flex" style={{ flexFlow: "row" }}>
              <Box className="voting-textfield mt-10">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Poll Options<span style={{ color: "red" }}>*</span>
                </FormLabel>
                {fields.map((field, index) => (
                  <Box key={field.id} display="flex" alignItems="center">
                    <TextField
                      label={`Option ${field.id}`}
                      value={field.value}
                      onChange={(e) => handleInputChange(field.id, e)}
                      multiline
                      maxRows={4}
                      margin="normal"
                      style={{ flex: 1, width: "100%" }}
                    />
                    {index !== 0 && (
                      <Button
                        type="button"
                        style={{
                          width: "10%",
                          height: "55px",
                          color: "#0e7a9c",
                        }}
                        onClick={() => handleDeleteField(field.id)}
                      >
                        <DeleteOutlineOutlinedIcon
                          style={{
                            fontSize: "30px",
                            color: "#0e7a9c",
                            cursor: "pointer",
                          }}
                        />
                      </Button>
                    )}
                  </Box>
                ))}
              </Box>

              <Box className="voting-btn">
                <Button
                  type="button"
                  style={{ width: "10%", height: "55px", color: "#0e7a9c" }}
                  onClick={addField}
                >
                  <AddOutlinedIcon />
                </Button>
              </Box>
            </FormGroup>
          </Grid>
        </Grid>

        <Box
          style={{
            marginTop: "8px",
            marginBottom: "20px",
            textAlign: "right",
          }}
        >
          <Button
            type="button"
            className="custom-btn-primary"
            style={{ width: "10%" }}
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            Submit
          </Button>
        </Box>
      </Container>
      <FloatingChatIcon />
      <Footer />
    </div>
  );
};

export default createForm;
