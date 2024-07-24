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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTranslation } from "react-i18next";
import * as util from "../services/utilService";


// const DrawerFilter = ({ SelectedFilters, renderedPage }) => {
const DrawerFilter = ({SelectedFilters, renderedPage }) => {
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
  const [orgId, setOrgId]=useState();

  useEffect(() => {
    fetchUserData();
    
  }, []);

  useEffect(() => {
    SelectedFilters({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      eventSearch: eventSearch,
      contentFilter: selectedContentType,
      subDomainFilter: selectedSubDomain,
    });
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

  const fetchUserData = async () => {
  try {
   const uservData = await util.userData();
setOrgId(uservData?.data?.result?.response?.rootOrgId);

  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
 useEffect(() => {
  if (orgId) {
    fetchDataFramework();
  }
}, [orgId]);

  const fetchDataFramework = async () => {
    const rootOrgId = sessionStorage.getItem("rootOrgId");
    const defaultFramework = localStorage.getItem("defaultFramework");

    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CHANNEL.READ}/${orgId}`;
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
      setStartDate(formattedDate);
    } else if (filterType === "endDate") {
      const formattedDate = dayjs(item).format("YYYY-MM-DD");
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
        <Box className="filter-title">{t("FILTER_BY")} : </Box>
        <Button
          type="button"
          className="viewAll mb-20"
          onClick={handleClearAll}
        >
          {t("CLEAR_ALL")}
        </Button>
      </Box>
      {renderedPage === "eventList" && (
        <FormControl>
          <InputLabel htmlFor="outlined-adornment-password">
            {t("SEARCH_FOR_A_EVENT")}
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            onChange={handleInputChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleSearch}
                >
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
          <Box className="filter-text mt-15">{t("SELECT_DATE_RANGE")}</Box>
          <Box className="mt-9 dateRange">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label={t("SELECT_DATE_FROM")}
                  className="mt-9"
                  value={selectedStartDate ? dayjs(selectedStartDate) : null}
                  onChange={(newValue) =>
                    handleCheckboxChange(null, newValue, "startDate")
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label={t("SELECT_DATE_TO")}
                  className="mt-9"
                  value={selectedEndDate ? dayjs(selectedEndDate) : null}
                  onChange={(newValue) =>
                    handleCheckboxChange(null, newValue, "endDate")
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </div>
      )}
      {renderedPage === "votingList" && (
        <div>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">
              {t("SEARCH_FOR_A_POLL")}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSearch}
                  >
                    <SearchOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Search Sub-domain"
            />
          </FormControl>
          <Box className="filter-text mt-15">{t("SELECT_DATE_RANGE")}</Box>
          <Box className="mt-9 dateRange">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DateTimePicker label={t("SELECT_DATE_FROM")} />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DateTimePicker label={t("SELECT_DATE_TO")} />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <Box>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Poll Status
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedValue}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Live"
                />
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="Closed"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </div>
      )}

      {renderedPage === "contentlist" && (
        <div>
          <Box className="filter-text mt-15">{t("CONTENT_TYPE")}e</Box>
          <List>
            {contentTypeList.map((contentType) => (
              <ListItem className="filter-ul-text" key={contentType}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedContentType.includes(contentType)}
                      onChange={(event) =>
                        handleCheckboxChange(event, contentType, "contentType")
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

      <Box className="filter-text mt-15">{t("SUB_DOMAIN")}</Box>
      <FormControl
        sx={{ m: 1, width: "25ch" }}
        variant="outlined"
        className="w-100"
      >
        <InputLabel htmlFor="outlined-adornment-password">
          {t("SEARCH_SUB_DOMAIN")}
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
          label={t("SEARCH_SUB_DOMAIN")}
        />
      </FormControl>
      <List>
        {subCategory.map((item) => (
          <ListItem className="filter-ul-text" key={item.code}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSubDomain.includes(item.code)}
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
  );

  return (
    <>
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      {isMobile ? (
        <Box>
          <div>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button
                  onClick={toggleDrawer(anchor, true)}
                  className="h6-title "
                >
                  Filters
                  <ArrowForwardIosIcon
                    sx={{ mr: 1, fontSize: "13px", paddingLeft: "10px" }}
                  />
                </Button>

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
        <Box className="header-bg-blue p-15 filter-bx">
          <Box className="d-flex jc-bw" style={{ paddingTop: "10px" }}>
            <Box className="filter-title">{t("FILTER_BY")} :</Box>
            <Button
              type="button"
              className="viewAll mb-20"
              onClick={handleClearAll}
            >
             {t("CLEAR_ALL")}
            </Button>
          </Box>
          {renderedPage === "eventList" && (
            <FormControl className="mt-9">
              <InputLabel htmlFor="outlined-adornment-password">
                {t("SEARCH_FOR_A_EVENT")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-search"
                type="text"
                value={eventSearch}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        handleCheckboxChange(null, eventSearch, "eventSearch")
                      }
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
              <Box className="filter-text mt-15">{t("SELECT_DATE_RANGE")}</Box>

              <Box className="mt-9 dateRange">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label={t("SELECT_DATE_FROM")}
                      className="mt-9"
                      value={
                        selectedStartDate ? dayjs(selectedStartDate) : null
                      }
                      onChange={(newValue) =>
                        handleCheckboxChange(null, newValue, "startDate")
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label={t("SELECT_DATE_TO")}
                      className="mt-9"
                      value={selectedEndDate ? dayjs(selectedEndDate) : null}
                      onChange={(newValue) =>
                        handleCheckboxChange(null, newValue, "endDate")
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </div>
          )}

          {renderedPage == "contentlist" && (
            <div>
              <Box className="filter-text mt-15">{t("CONTENT_TYPE")}</Box>
              <List>
                {contentTypeList &&
                  contentTypeList.map((contentType) => (
                    <ListItem className="filter-ul-text" key={contentType}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedContentType.includes(contentType)}
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
          <Box className="filter-text lg-mt-12 mb-20">{t("SUB_DOMAIN")}</Box>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">
              {t("SEARCH_SUB_DOMAIN")}
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
              label={t("SEARCH_SUB_DOMAIN")}
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
                <ListItem className="filter-ul-text" key={item.code}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSubDomain.includes(item.code)}
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
