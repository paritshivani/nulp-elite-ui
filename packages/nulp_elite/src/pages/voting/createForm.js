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

import MenuItem from "@mui/material/MenuItem";

import FloatingChatIcon from "components/FloatingChatIcon";
import { BorderRight } from "@mui/icons-material";

const createForm = () => {
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");

  const [globalSearchQuery, setGlobalSearchQuery] = useState(
    location.state?.globalSearchQuery || undefined
  );
  const [searchQuery, setSearchQuery] = useState(globalSearchQuery || "");

  const [fields, setFields] = useState([{ id: 1, value: "" }]);

  const addField = () => {
    setFields([...fields, { id: fields.length + 1, value: "" }]);
  };

  const handleInputChange = (id, event) => {
    const newFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, value: event.target.value };
      }
      return field;
    });
    setFields(newFields);
  };
  const [selectedValue, setSelectedValue] = useState("public");
  const [selectedOption, setSelectedOption] = useState("");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <Header globalSearchQuery={globalSearchQuery} />
      {toasterMessage && <ToasterCommon response={toasterMessage} />}

      <Container
        maxWidth="xl"
        role="main"
        className="xs-pb-20 createForm"
        style={{ paddingTop: "0" }}
      >
        <Box className="voting-text">
          <Box className="h3-custom-title pl-20">Create Polls</Box>

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
          <Grid item xs={12} md={4} lg={4}>
            <TextField id="title" label="Title" variant="outlined" />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField
              id="description"
              label="Description"
              multiline
              maxRows={4}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <TextField id="poll_type" label="Poll Type" multiline maxRows={4} />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker label="Start Date" />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker label="End Date" />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            &nbsp;
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <FormGroup className="d-flex" style={{ flexFlow: "row" }}>
              <Box className="voting-textfield">
                {fields.map((field) => (
                  <TextField
                    key={field.id}
                    label={`Poll Options ${field.id}`}
                    value={field.value}
                    onChange={(e) => handleInputChange(field.id, e)}
                    multiline
                    maxRows={4}
                    margin="normal"
                  />
                ))}
              </Box>
              <Box className="voting-btn">
                <Button
                  type="button"
                  className="custom-btn-primary"
                  style={{ width: "10%", height: "55px" }}
                  onClick={addField}
                >
                  <AddOutlinedIcon />
                </Button>
              </Box>
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Visiblity
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedValue}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="invite"
                  control={<Radio />}
                  label="Invite only"
                />
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public"
                />
              </RadioGroup>

              {selectedValue === "invite" && (
                <div>
                  <TextField label="Organisation Name" variant="outlined" />
                  <RadioGroup
                    row
                    aria-labelledby="nested-radio-buttons-group-label"
                    name="nested-radio-buttons-group"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <FormControlLabel
                      value="option1"
                      control={<Radio />}
                      label="Invite All"
                    />
                    <FormControlLabel
                      value="option2"
                      control={<Radio />}
                      label="Select Users"
                    />
                  </RadioGroup>

                  {selectedOption === "option2" && (
                    // <Select
                    //   labelId="demo-multiple-checkbox-label"
                    //   id="demo-multiple-checkbox"
                    //   multiple
                    // >
                    //   <MenuItem value="option1">User</MenuItem>
                    //   <MenuItem value="option2">User</MenuItem>
                    // </Select>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedOption}
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="option1">User</MenuItem>
                      <MenuItem value="option2">User</MenuItem>
                    </Select>
                  )}
                </div>
              )}
            </FormControl>
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
