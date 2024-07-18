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

const createForm = () => {
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");

  const [globalSearchQuery, setGlobalSearchQuery] = useState(
    location.state?.globalSearchQuery || undefined
  );
  const [searchQuery, setSearchQuery] = useState(globalSearchQuery || "");

  const [fields, setFields] = useState([{ id: 1, value: "" }]);

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
        className="xs-pb-20 createForm min-472"
        style={{ paddingTop: "0" }}
      >
        <Box className="voting-text1">
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
          <Grid item xs={12} md={4} lg={8}>
            <TextField
              id="title"
              required
              label="Title"
              variant="outlined"
              className="mb-20"
            />
            <TextField
              id="description"
              label="Description"
              multiline
              rows={4}
              required
              className="mb-20"
            />
            <TextField
              id="poll_type"
              label="Poll Type"
              className="mb-20"
              multiline
              maxRows={4}
            />
            <Box className="mb-20">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker label="Start Date" required />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box className="mb-20">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker label="End Date" required />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <FormControl style={{ width: "100%" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Visiblity<span style={{ color: "#000" }}>*</span>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedValue}
                onChange={handleRadioChange}
                className="mb-20"
              >
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public"
                />
                <FormControlLabel
                  value="invite"
                  control={<Radio />}
                  label="Invite only"
                />
              </RadioGroup>

              {selectedValue === "invite" && (
                <Box
                  style={{
                    background: "#f4d88b",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <div>
                    <TextField
                      label="Organisation Name"
                      variant="outlined"
                      required
                    />
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
                </Box>
              )}
            </FormControl>
            <FormGroup className="d-flex" style={{ flexFlow: "row" }}>
              <Box className="voting-textfield mt-10">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Poll Options<span style={{ color: "#000" }}>*</span>
                </FormLabel>
                {fields.map((field, index) => (
                  <Box key={field.id} display="flex" alignItems="center">
                    <TextField
                      label={`Options ${field.id}`}
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
