import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";
import DevicesIcon from "@mui/icons-material/Devices";
import WebIcon from "@mui/icons-material/Web";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

function Header({ globalSearchQuery }) {
  const { t } = useTranslation();
  const [language, setLanguage] = useState("en");

  const handleChangeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    changeLanguage(selectedLanguage);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState(globalSearchQuery || "");
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const onGlobalSearch = () => {
    navigate("/contentList/1", {
      state: { globalSearchQuery: searchQuery },
    });
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onGlobalSearch();
    }
  };

  return (
    <>
      {/* Sidebar Navigation */}
      <Box
        className="xs-hide bg-white d-flex pos-fixed"
        style={{
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Link href="/all" className="pl-0 py-15">
            <img
              src={require("../assets/logo.png")}
              style={{ maxWidth: "100%" }}
            />
          </Link>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            paddingRight: "14px",
          }}
        >
          {/* Navigation Links */}
          <Box style={{ padding: "10px" }}>
            <DevicesIcon
              style={{
                padding: "0 10px",
                verticalAlign: "middle",
                color: "#424242",
              }}
            />

            <Link
              href="#"
              underline="none"
              style={{
                color: "#424242",
                fontSize: "16px",
                borderRight: "solid 1px #424242",
                paddingRight: "10px",
              }}
            >
              {t("MAIN_CONTENT")}{" "}
            </Link>
          </Box>
          <Box
            style={{
              padding: "0 10px",
              color: "#424242",
              fontSize: "16px",
              borderRight: "solid 1px #424242",
            }}
          >
            <Link
              href="#"
              underline="none"
              style={{
                color: "#424242",
                fontSize: "16px",
                paddingRight: "10px",
              }}
            >
              {" "}
              +A
            </Link>{" "}
            <Link
              href="#"
              underline="none"
              style={{
                color: "#424242",
                fontSize: "16px",
                paddingRight: "10px",
              }}
            >
              A -{" "}
            </Link>
            <Link
              href="#"
              underline="none"
              style={{
                color: "#424242",
                fontSize: "16px",
                paddingRight: "10px",
              }}
            >
              A
            </Link>{" "}
          </Box>
          <Box
            style={{
              padding: "0 10px",
              color: "#424242",
              fontSize: "14px",
              borderRight: "solid 1px #424242",
            }}
          >
            <WebIcon style={{ padding: "0 10px", verticalAlign: "middle" }} />
            <Link
              href="#"
              underline="none"
              style={{ color: "#424242", fontSize: "16px" }}
            >
              {t("SCREEN_READER")}{" "}
            </Link>
          </Box>
          {/* Language Select */}
          <Box sx={{ minWidth: 120, paddingLeft: "10px" }}>
            <FormControl
              fullWidth
              size="small"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                paddingRight: "15px",
              }}
            >
              {/* <InputLabel id="language-select-label">
                  {t("LANGUAGE")}
                </InputLabel> */}
              <GTranslateIcon />
              <Select
                labelId="language-select-label"
                id="language-select"
                className="language"
                style={{ border: "none" }}
                label={t("LANGUAGE")}
                value={language}
                startIcon={<LanguageIcon />}
                onChange={handleChangeLanguage}
                inputProps={{ "aria-label": t("SELECT_LANGUAGE") }}
              >
                <MenuItem value="en">{t("ENGLISH")}</MenuItem>
                <MenuItem value="hi">{t("HINDI")}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Top Navigation Bar */}
      <AppBar className=" bg-inherit pos-inherit mt-65">
        <Container className="p-0">
          <Box className="d-flex">
            <Toolbar
              disableGutters
              style={{
                justifyContent: "space-between",
                background: "#fff",
                width: "100%",
              }}
              className="lg-hide lg-mt-10"
            >
              <Box className="d-flex lg-hide">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  className="lg-hide"
                >
                  <SortOutlinedIcon />
                </IconButton>
                <Box
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                  >
                    <MenuItem>
                      <Link href="/help" textAlign="center" underline="none">
                        <LiveHelpOutlinedIcon
                          style={{ verticalAlign: "bottom", color: "#000" }}
                        />{" "}
                        {t("HELP")}
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href="/logoff" textAlign="center" underline="none">
                        <LogoutOutlinedIcon
                          style={{ verticalAlign: "bottom", color: "#000" }}
                        />{" "}
                        {t("LOGOUT")}
                      </Link>
                    </MenuItem>
                  </Menu>
                </Box>
                <Link href="/all" className="pl-18 py-15">
                  <img
                    src={require("../assets/logo.png")}
                    style={{ maxWidth: "100%" }}
                  />
                </Link>
              </Box>
              <Box className="lg-hide">
                {/* Language Select */}
                <Box sx={{ minWidth: 120, paddingLeft: "10px" }}>
                  <FormControl
                    fullWidth
                    size="small"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    {/* <InputLabel id="language-select-label">
                  {t("LANGUAGE")}
                </InputLabel> */}
                    <GTranslateIcon style={{ color: "#000" }} />
                    <Select
                      labelId="language-select-label"
                      id="language-select"
                      className="language"
                      style={{ border: "none" }}
                      label={t("LANGUAGE")}
                      value={language}
                      startIcon={<LanguageIcon />}
                      onChange={handleChangeLanguage}
                      inputProps={{ "aria-label": t("SELECT_LANGUAGE") }}
                    >
                      <MenuItem value="en">{t("ENGLISH")}</MenuItem>
                      <MenuItem value="hi">{t("HINDI")}</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* Language Select */}
            </Toolbar>{" "}
            {/* Search Box */}
            <Box
              className="xs-hide d-flex header-bg w-40 mr-30"
              style={{ alignItems: "center", paddingLeft: "8px" }}
            >
              <Box className="h1-title px-10 pr-20">{t("EXPLORE")}</Box>
              <TextField
                placeholder={t("What do you want to learn today?  ")}
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      type="submit"
                      aria-label="search"
                      onClick={onGlobalSearch}
                    >
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Box>
            {/* Other Navigation Links */}
            <Box
              className="xs-hide header-bg py-15"
              sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <Link
                href="/domainList"
                className={activePath === "/domainList" ? "Menuactive" : ""}
                underline="none"
                style={{
                  my: 2,
                  color: "#484848",
                  display: "flex",
                  margin: "0 20px",
                  padding: "10px",
                }}
              >
                <HomeIcon
                  style={{ padding: "0 10px", verticalAlign: "middle" }}
                />
                {t("Home")}
              </Link>
              <Link
                href="/all"
                className={activePath === "/all" ? "Menuactive" : ""}
                underline="none"
                style={{
                  my: 2,
                  color: "#484848",
                  display: "flex",
                  margin: "0 20px",
                  padding: "10px",
                }}
              >
                <MenuBookOutlinedIcon
                  style={{ padding: "0 10px", verticalAlign: "middle" }}
                />
                {t("CONTENT")}
              </Link>
              <Link
                href="/addConnections"
                className={activePath === "/addConnections" ? "Menuactive" : ""}
                underline="none"
                style={{
                  my: 2,
                  color: "#484848",
                  display: "flex",
                  margin: "0 20px",
                  padding: "10px",
                }}
              >
                <ChatOutlinedIcon
                  style={{ padding: "0 10px", verticalAlign: "middle" }}
                />
                {t("CONNECTIONS")}
              </Link>

              {/* User Profile */}
              <Tooltip>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  className="profile-btn"
                >
                  <AccountCircleOutlinedIcon
                    style={{ padding: "0 10px", verticalAlign: "middle" }}
                  />{" "}
                  {t("PROFILE")}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Link href="/profile" underline="none" textAlign="center">
                    {t("PROFILE")}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/help" underline="none" textAlign="center">
                    {t("HELP")}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/logoff" underline="none" textAlign="center">
                    {t("LOGOUT")}
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* <Box className="lg-hide header-bg" style={{ padding: "10px" }}>
            <TextField
              placeholder={t("What do you want to learn today?")}
              variant="outlined"
              size="small"
              style={{ background: "#fff" }}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton aria-label="search">
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box> */}
        </Container>
      </AppBar>
    </>
  );
}

export default Header;
