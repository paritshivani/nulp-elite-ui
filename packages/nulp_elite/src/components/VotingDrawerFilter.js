import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";

import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const urlConfig = require("../configs/urlConfig.json");
import * as frameworkService from "../services/frameworkService";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ToasterCommon from "../pages/ToasterCommon";
import dayjs from "dayjs";

import FormControlLabel from "@mui/material/FormControlLabel";
import { useTranslation } from "react-i18next";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
// const DrawerFilter = ({ SelectedFilters, renderedPage }) => {
const VotingDrawerFilter = ({}) => {
  const contentTypeList = ["Course", "Manuals and SOPs", "Reports"];
  const [subCategory, setSubCategory] = useState([]);
  const [selectedContentType, setSelectedContentType] = useState([]);
  const [selectedSubDomain, setSelectedSubDomain] = useState([]);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterOpen, setToasterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [eventSearch, setEventSearch] = useState(null);
  const [selectedStartDate, setStartDate] = useState();
  const [selectedEndDate, setEndDate] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    fetchDataFramework();
  }, []);

  useEffect(() => {
    // SelectedFilters({
    //   startDate: selectedStartDate,
    //   endDate: selectedEndDate,
    //   eventSearch: eventSearch,
    //   contentFilter: selectedContentType,
    //   subDomainFilter: selectedSubDomain,
    // });
  }, [
    selectedContentType,
    selectedSubDomain,
    selectedStartDate,
    selectedEndDate,
    eventSearch,
  ]);

  const [state, setState] = React.useState({
    left: false,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
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
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.FRAMEWORK.READ}/nulp?categories=${urlConfig.params.framework}`;
      const response = await frameworkService.getSelectedFrameworkCategories(
        url
      );
      setSubCategory(
        response?.data?.result?.framework?.categories[1]?.terms || []
      );
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };

  const handleInputChange = (event) => {
    setEventSearch(event.target.value);
  };

  const handleSearch = (event) => {
    setEventSearch(event.target.value);
    setEventSearch(searchTerm);
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
        setSelectedSubDomain((prev) =>
          prev.filter((i) => i !== item.item.code)
        );
      }
    } else if (filterType === "eventSearch") {
      setEventSearch(item);
    } else if (filterType === "startDate") {
      const formattedDate = dayjs(item).format("YYYY-MM-DD");
      console.log("Selected Start Date:", formattedDate);
      setStartDate(formattedDate);
    } else if (filterType === "endDate") {
      const formattedDate = dayjs(item).format("YYYY-MM-DD");
      console.log("Selected End Date:", formattedDate);
      setEndDate(formattedDate);
    }
  };

  const handleClearAll = () => {
    setSelectedContentType([]);
    setSelectedSubDomain([]);
    setSearchTerm();
    setEventSearch();
    setStartDate(null);
    setEndDate(null);
  };

  const list = (anchor) => (
    <Box
      className="header-bg-blue p-20 filter-bx w-100"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box className="d-flex jc-bw">
        <Box className="filter-title">Filter By:</Box>
        <Button
          type="button"
          className="viewAll mb-20"
          onClick={handleClearAll}
        >
          Clear all
        </Button>
      </Box>

      <FormControl
        sx={{ m: 1, width: "25ch" }}
        variant="outlined"
        className="w-100"
      >
        <InputLabel htmlFor="outlined-adornment-password">
          Search for a poll
        </InputLabel>
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
      <Box className="filter-text mt-15">Select Date Range</Box>
      <Box className="mt-9 dateRange">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Select Date To" />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Select Date To" />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box>
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            className="filter-text mt-15"
          >
            Poll Status
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Live"
            />
            <FormControlLabel control={<Checkbox />} label="Closed" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );

  return (
    <>
      {toasterMessage && <ToasterCommon response={toasterMessage} />}

      <Box className="header-bg-blue p-15 filter-bx xs-hide">
        <Box className="d-flex jc-bw" style={{ paddingTop: "10px" }}>
          <Box className="filter-title">Filter By:</Box>
          <Button
            type="button"
            className="viewAll mb-20"
            onClick={handleClearAll}
          >
            Clear all
          </Button>
        </Box>

        <FormControl>
          <InputLabel htmlFor="outlined-adornment-password">
            Search for a Poll
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
        <Box className="filter-text mt-15">Select Date Range</Box>
        <Box className="mt-9 dateRange">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Select Date To" />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Select Date To" />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box>
          <FormControl>
            <Box className="filter-text mt-15">Poll Status</Box>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Live"
              />
              <FormControlLabel control={<Checkbox />} label="Closed" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default VotingDrawerFilter;
