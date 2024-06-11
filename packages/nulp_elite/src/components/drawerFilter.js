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

const DrawerFilter = ({ SelectedFilters }) => {
  const contentTypeList = ["Courses", "Manuals and SOPs", "Reports"];
  const [subCategory, setSubCategory] = React.useState();
  const [selectedContentType, setSelectedContentType] = useState([]);
  const [selectedSubDomain, setSelectedSubDomain] = useState([]);

  useEffect(() => {
    fetchDataFramework();
  }, []);
  const [state, setState] = React.useState({
    left: false,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  // const handleResize = () => {
  //   setIsMobile(window.innerWidth <= 767);
  // };
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
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
      console.log("user channel---", response);
    } catch (error) {
      console.log("error---", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
    }
    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.FRAMEWORK.READ}/
      ${defaultFramework}?categories=${urlConfig.params.framework}`;

      const response = await frameworkService.getSelectedFrameworkCategories(
        url
      );

      setSubCategory(response?.data?.result?.framework?.categories[1].terms);
    } catch (error) {
      console.log("nulp--  error-", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      console.log("nulp finally---");
    }
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (event, item, filterType) => {
    if (filterType == "contentType") {
      if (event.target.checked) {
        // Add item to selectedItems if checked
        setSelectedContentType((prev) => [...prev, item]);
      } else {
        // Remove item from selectedItems if unchecked
        setSelectedContentType((prev) => prev.filter((i) => i !== item));
      }
    } else if (filterType == "subCategory") {
      if (event.target.checked) {
        // Add item to selectedItems if checked
        console.log("item--", item);
        setSelectedSubDomain((prev) => [...prev, item]);
      } else {
        // Remove item from selectedItems if unchecked
        setSelectedSubDomain((prev) => prev.filter((i) => i !== item));
      }
    }
    SelectedFilters({ selectedContentType, selectedSubDomain });
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
      <Box className="filter-text mt-15">Content Type</Box>
      <List>
        {contentTypeList &&
          contentTypeList.map((contentType) => (
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={
                  <Checkbox
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
      <Box className="filter-text mt-15">Sub-domains</Box>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
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
          subCategory.map((Item) => (
            <ListItem className="filter-ul-text">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) =>
                      handleCheckboxChange(event, { Item }, "subCategory")
                    }
                    value={Item.name}
                  />
                }
                label={Item.code}
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
  return (
    <>
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
        <Box className="header-bg-blue p-10 pl-18 filter-bx">
          <Box className="d-flex jc-bw" style={{ paddingTop: "10px" }}>
            <Box className="filter-title">Filter By:</Box>
            <Button type="button" className="viewAll">
              Clear all
            </Button>
          </Box>
          <Box className="filter-text mt-15 mb-15">Content Type</Box>
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
          <Box className="filter-text mt-15 mb-20">Sub-domains</Box>
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
