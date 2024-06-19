import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const urlConfig = require("../configs/urlConfig.json");
import * as frameworkService from "../services/frameworkService";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";
import ToasterCommon from "../pages/ToasterCommon";

const DrawerFilter = ({ SelectedFilters, renderedPage }) => {
  const contentTypeList = ["Courses", "Manuals and SOPs", "Reports"];
  const [subCategory, setSubCategory] = useState([]);
  const [selectedContentType, setSelectedContentType] = useState([]);
  const [selectedSubDomain, setSelectedSubDomain] = useState([]);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterOpen, setToasterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [eventSearch, setEventSearch] = useState();
  const [selectedStartDate, setStartDate] = useState();
  const [selectedEndDate, setEndDate] = useState();
  const { t } = useTranslation();
  
  useEffect(() => {
    fetchDataFramework();
  }, []);
  
  useEffect(() => {
    SelectedFilters({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      eventSearch: eventSearch,
      contentFilter: selectedContentType,
      subDomainFilter: selectedSubDomain,
    });
    
  }, [selectedContentType, selectedSubDomain, selectedStartDate, selectedEndDate, eventSearch]);

  const [state, setState] = useState({
    left: false,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  const fetchDataFramework = async () => {
    const rootOrgId = sessionStorage.getItem("rootOrgId");
    const defaultFramework = localStorage.getItem("defaultFramework");

    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CHANNEL.READ}/${rootOrgId}`;
      const response = await frameworkService.getChannel(url);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }

    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.FRAMEWORK.READ}/${defaultFramework}?categories=${urlConfig.params.framework}`;
      const response = await frameworkService.getSelectedFrameworkCategories(url);
      setSubCategory(response?.data?.result?.framework?.categories[1]?.terms || []);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (event, item, filterType) => {
    if (filterType === "contentType") {
      if (event.target.checked) {
        setSelectedContentType((prev) => [...prev, item]);
      } else {
        setSelectedContentType((prev) => prev.filter((i) => i !== item));
      }
    } else if (filterType === "subCategory") {
      if (event.target.checked) {
        setSelectedSubDomain((prev) => [...prev, item.item.code]);
      } else {
        setSelectedSubDomain((prev) => prev.filter((i) => i !== item.item.code));
      }
    } else if (filterType === "searchTerm") {
      setEventSearch((prev) => [...prev, item]);
    } else if (filterType === "startDate") {
      setStartDate(item);
    } else if (filterType === "endDate") {
      setEndDate(item);
    }
  };

  const list = (anchor) => (
    <Box
      className="header-bg-blue p-10 filter-bx"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box className="d-flex jc-bw">
        <Box className="filter-title">Filter By:</Box>
        <Button type="button" className="viewAll">
          Clear all
        </Button>
      </Box>
      {renderedPage === "eventList" && (
        <FormControl>
          <InputLabel htmlFor="outlined-adornment-password">Search for a webinar</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility">
                  <SearchOutlinedIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Search Sub-domain"
          />
        </FormControl>
      )}

      {renderedPage === "eventList" && (
        <div>
          <Box className="filter-text mt-15">Select Date Range</Box>
          <Box className="mt-9 dateRange">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Select Date From"
                  className="mt-9"
                  value={selectedStartDate}
                  onChange={(newValue) => handleCheckboxChange(null, newValue, "startDate")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Select Date To"
                  className="mt-9"
                  value={selectedEndDate}
                  onChange={(newValue) => handleCheckboxChange(null, newValue, "endDate")}
                  renderInput={(params) => <TextField {...params} />}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </div>
      )}

      {renderedPage === "contentlist" && (
        <div>
          <Box className="filter-text mt-15">Content Type</Box>
          <List>
            {contentTypeList.map((contentType) => (
              <ListItem className="filter-ul-text" key={contentType}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event) => handleCheckboxChange(event, contentType, "contentType")}
                    />
                  }
                  label={contentType}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}

      <Box className="filter-text mt-15">Sub-domains</Box>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Search Sub-domain</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility">
                <SearchOutlinedIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search Sub-domain"
        />
      </FormControl>
      <List>
        {subCategory.map((item) => (
          <ListItem className="filter-ul-text" key={item.code}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => handleCheckboxChange(event, { item }, "subCategory")}
                />
              }
              label={item.code}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

   return (
    <>
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      {isMobile ? (
        <Box>
          <div>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </div>
        </Box>
      ) : (
        <Box className="header-bg-blue p-10 filter-bx">
          <Box className="d-flex jc-bw" style={{ paddingTop: "10px" }}>
            <Box className="filter-title">Filter By:</Box>
            <Button type="button" className="viewAll">
              Clear all
            </Button>
          </Box>
          {renderedPage === "eventList" && (
            <FormControl className="mt-9">
              <InputLabel htmlFor="outlined-adornment-password">
                Search for a webinar
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-search"
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleCheckboxChange(
                        event,
                        { searchTerm },
                        "eventSearch"
                      )}
                    >
                      {<SearchOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Search Sub-domain"
              />
            </FormControl>
          )}
          {renderedPage == "eventList" && (
            <div>
              <Box className="filter-text mt-15">Select Date Range</Box>

              <Box className="mt-9 dateRange">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Select Date From"
                      className="mt-9"
                      value={selectedStartDate}
                      onChange={(event) =>
                        handleCheckboxChange(
                          event,
                          selectedStartDate,
                          "startDate"
                        )
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Select Date To"
                      className="mt-9"
                      value={selectedStartDate}
                      onChange={(event) =>
                        handleCheckboxChange(
                          event,
                          selectedStartDate,
                          "startDate"
                        )
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </div>
          )}

          {renderedPage == "contentlist" && (
            <div>
              <Box className="filter-text mt-15">Content Type</Box>
              <List>
                {contentTypeList &&
                  contentTypeList.map((contentType) => (
                    <ListItem className="filter-ul-text">
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(event) =>
                              handleCheckboxChange(
                                event,
                                contentType,
                                "contentType"
                              )
                            }
                          />
                        }
                        label={contentType}
                      />
                    </ListItem>
                  ))}
              </List>
            </div>
          )}
          <Box className="filter-text lg-mt-12 mb-20">Sub-domains</Box>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">
              Search Sub-domain
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    {<SearchOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label="Search Sub-domain"
            />
          </FormControl>
          {/* <Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      sx={{ width: "100%", background: "#fff" }}
      renderInput={(params) => <TextField  label="search" />}
    />             */}
          <List>
            {subCategory &&
              subCategory.map((item) => (
                <ListItem className="filter-ul-text">
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(event) =>
                          handleCheckboxChange(event, { item }, "subCategory")
                        }
                      />
                    }
                    label={item.code}
                  />
                </ListItem>
              ))}
          </List>
        </Box>
      )}
    </>
  );
};

export default DrawerFilter;
