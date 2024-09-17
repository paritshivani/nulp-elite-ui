import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Box from "@mui/material/Box";
import * as util from "../../services/utilService";
const axios = require("axios");
import { useNavigate } from "react-router-dom";
import { useStore } from "configs/zustandStore";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BlockIcon from "@mui/icons-material/Block";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Typography from "@mui/material/Typography";
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";

const moment = require("moment");
const timezone = require("moment-timezone");
const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    background: "#FFF5E9",
  },
  chatHeader: {
    padding: "8px 16px",
    backgroundColor: "#FFE6C8 !important",
    color: "#484848",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },
  chat: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    borderBottom: "1px solid #DDDDDD",
    background:"#FFE6C8 !important"
  },
  messageInput: {
    display: "flex",
    alignItems: "center",
    padding: "8px",
    backgroundColor: "#f9fafc",
    marginTop: "10px",
  },
  senderMessage: {
    borderRadius: "5px",
    padding: "8px",
    margin: "25px 0",
    textAlign: "right",
    background: "#F1FAFF  !important",
    color: "#484848",
    fontSize: "16px",
    fontWeight: "400",
    marginLeft: "auto",
    width: "16%",
  },
  receiverMessage: {
    margin: "13px 0",
    padding: "8px 12px",
    clear: "both",
    alignSelf: "flex-end",
    display: "table",
    borderRadius: "5px",
    color: "#212121",
    backgroundColor: "#fff !important",
    fontSize: "16px",
    fontWeight: "400",
  },
}));

const Message = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const dataStore = useStore((state) => state.data);
  const receiverUserId = dataStore.userId || localStorage.getItem("userId");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false); // State to track if user is blocked
  const [showUnblockOption, setShowUnblockOption] = useState(false); // State to show/hide unblock option
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  // const [openModal, setDialogOpen] = useState(false);

  const { t } = useTranslation();
  useEffect(() => {
    const _userId = util.userId();
    setLoggedInUserId(_userId);
  }, []);
  useEffect(() => {
    if (loggedInUserId) {
      // Fetch block user status when component mounts
      fetchBlockUserStatus();
      fetchChats();
      updateMessage();
    }
  }, [loggedInUserId]);

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  useEffect(() => {
    if (loggedInUserId && !isBlocked) {
      const intervalId = setInterval(fetchChats, 5000);
      return () => clearInterval(intervalId);
    }
  }, [loggedInUserId, isBlocked]);

  const fetchBlockUserStatus = async () => {
    try {
      const url = `${urlConfig.URLS.DIRECT_CONNECT.GET_BLOCK_USER}?sender_id=${loggedInUserId}&receiver_id=${receiverUserId}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      const blockedUserId =
        response.data.result.length > 0
          ? response.data.result[0].sender_id
          : null;

      setIsBlocked(response.data.result.length > 0); // Update isBlocked state based on API response
      setShowUnblockOption(blockedUserId === loggedInUserId);
    } catch (error) {
      console.error("Error fetching block user status:", error);
      showErrorMessage(t("FAILED_TO_BLOCK_USER"));
    }
  };

  const fetchChats = async () => {
    try {
      const url = `${
        urlConfig.URLS.DIRECT_CONNECT.GET_CHATS
      }?sender_id=${loggedInUserId}&receiver_id=${receiverUserId}&is_accepted=${true}`;

      // Check if the user is not blocked before fetching chats
      if (!isBlocked) {
        const response = await axios.get(url, {
          withCredentials: true,
        });
        setMessages(response.data.result || []);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
      showErrorMessage(t("FAILED_TO_FETCH_CHAT"));
    }
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        const url = `${urlConfig.URLS.DIRECT_CONNECT.SEND_CHAT}`;

        await axios.post(
          url,
          {
            sender_id: loggedInUserId,
            receiver_id: receiverUserId,
            message: message,
            sender_email: "sender@gmail.com",
            receiver_email: "receiver@gmail.com",
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setMessage("");
        fetchChats(); // Fetch messages after sending a message
      } catch (error) {
        console.error("Error saving message:", error);
        showErrorMessage(t("FAILED_TO_SEND_CHAT"));
      }
    }
  };

  const updateMessage = async () => {
    try {
      const url = `${urlConfig.URLS.DIRECT_CONNECT.UPDATE_CHAT}`;

      const data = await axios.put(
        url,
        {
          sender_id: loggedInUserId,
          receiver_id: receiverUserId,
          is_read: true,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating message:", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    }
  };

  const getTimeAgo = (timestamp) => {
    const timeZone = "Asia/Kolkata";
    const date = moment(timestamp).tz(timeZone);
    const now = moment().tz(timeZone);

    if (date.isSame(now, "day")) {
      return "Today";
    } else if (date.isSame(now.clone().subtract(1, "day"), "day")) {
      return "Yesterday";
    } else {
      return date.format("D MMMM YYYY");
    }
  };
  const getTime = (timestamp) => {
    const date = new Date(timestamp);
    const istTime = date.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return istTime;
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleGoBack = () => {
    navigate(-1); // Navigate back in history
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleBlockUser = () => {
    handleDialogOpen();
  };

  const handleUnblockUser = async () => {
    try {
      const url = `${urlConfig.URLS.DIRECT_CONNECT.UNBLOCK}`;

      const data = await axios.post(
        url,
        {
          sender_id: loggedInUserId,
          receiver_id: receiverUserId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Reload the page after unblocking the user
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
      showErrorMessage(t("FAILED_TO_UNBLOCK_USER"));
    }
  };

  const handleBlockUserConfirmed = async () => {
    try {
      const url = `${urlConfig.URLS.DIRECT_CONNECT.BLOCK}`;

      await axios.post(
        url,
        {
          sender_id: loggedInUserId,
          receiver_id: receiverUserId,
          reason: reason,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setReason("");
      setDialogOpen(false);
      console.log("User blocked successfully!");
      // Reload the page after blocking the user
      window.location.reload();
    } catch (error) {
      console.error("Error blocking user:", error);
      showErrorMessage(t("FAILED_TO_BLOCK_USER"));
    }
    handleMenuClose(); // Close the menu after the action is completed
  };

  return (
    <div className={classes.chatContainer}>
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      <div className={classes.chatHeader}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleGoBack}>
            <ArrowBackIcon />
          </IconButton>
          <Box
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              paddingLeft: "10px",
              color: "#484848",
            }}
          >
            <div>
              {dataStore.fullName || localStorage.getItem("chatName")}
              <Typography
                variant="body2"
                sx={{ fontSize: "12px", textAlign: "left" }}
              >
                {dataStore.designation || localStorage.getItem("designation")}
              </Typography>
            </div>
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          {!isBlocked && (
            <IconButton onClick={handleBlockUser} className="block-btn">
              <BlockIcon style={{ fontSize: "16px", paddingRight: "8px" }} />
              {t("BLOCK")}
            </IconButton>
          )}
          {showUnblockOption && (
            <IconButton onClick={handleUnblockUser} className="unblock-btn">
              <BlockIcon style={{ fontSize: "16px", paddingRight: "8px" }} />
              {t("UNBLOCK")}
            </IconButton>
          )}
        </Box>
      </div>
      <Dialog
        // open={open}
        // onClose={handleClose}

        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>
          {" "}
          <Box className="h5-title">{t("BLOCK_USER")}</Box>
        </DialogTitle>
        <DialogContent>
          <Box className="h5-title">
            {t("ARE_YOU_SURE_YOU_WANT_TO_BLOCK_THIS_USER")}
          </Box>
          <Box py={2}>
            <TextField
              id="reason"
              name="reason"
              label={
                <span>
                  {t("REASON")}
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </span>
              }
              multiline
              rows={3}
              variant="outlined"
              fullWidth
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Box>{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} className="custom-btn-default">
            {"CANCEL"}
          </Button>
          <Button
            onClick={handleBlockUserConfirmed}
            className="custom-btn-primary"
            disabled={!reason}
            style={{
              background: !reason ? "rgba(0, 67, 103, 0.5)" : "#004367",
            }}
          >
            {"BLOCK"}
          </Button>
        </DialogActions>
      </Dialog>

      <Alert severity="info" style={{ margin: "10px 0" }}>
        {t("YOUR_CHAT_WILL_DISAPPEAR")}
      </Alert>
      <div className={classes.chat}>
        {messages.map((msg, index) => (
          <div key={index}>
            {index === 0 ||
            getTimeAgo(msg.timestamp) !==
              getTimeAgo(messages[index - 1].timestamp) ? (
              <div style={{ margin: "0 auto", textAlign: "center" }}>
                <Box className="dayDisplay">{getTimeAgo(msg.timestamp)}</Box>
              </div>
            ) : null}
            <div
              className={
                msg.sender_id === loggedInUserId
                  ? `${classes.senderMessage} ${classes.message}`
                  : `${classes.receiverMessage} ${classes.message}`
              }
            >
              <div>{msg.message}</div>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "#484848",
                    fontWeight: "400",
                  }}
                >
                  {getTime(msg.timestamp)}
                </div>
                {msg.sender_id === loggedInUserId ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "13px",
                      justifyContent: "flex-end",
                    }}
                  >
                    {msg.is_read ? (
                      <DoneAllIcon
                        style={{
                          color: "#00ebff",
                          fontSize: "15px",
                          paddingLeft: "6px",
                        }}
                      />
                    ) : (
                      <DoneAllIcon
                        style={{
                          color: "#bdbaba",
                          fontSize: "18px",
                          paddingRight: "10px",
                        }}
                      />
                    )}
                    {/* {msg.is_read ? "Read" : "Delivered"} */}
                  </div>
                ) : null}
              </Box>
            </div>
            {msg.is_accepted ? (
              <div style={{ textAlign: "center" }}>
                <Alert
                  className="my-10"
                  iconMapping={{
                    success: <CheckCircleOutlineIcon fontSize="inherit" />,
                  }}
                >
                  {t("YOU_CHAT_ACCEPTED")}
                </Alert>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {isBlocked ? (
        <Alert severity="warning" style={{ marginBottom: "10px" }}>
          {t("USER_BLOCKED_YOU_CANNOT")}
        </Alert>
      ) : (
        <>
          <div className={classes.messageInput}>
            <TextField
              variant="outlined"
              placeholder="Type your message..."
              fullWidth
              className="border-none"
              style={{
                background: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isBlocked} // Disable input field if user is blocked
            />
            <Button
              onClick={sendMessage}
              style={{ color: "#484848" }}
              className="btn-chat"
              disabled={isBlocked} // Disable send button if user is blocked
            >
              <SendIcon />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Message;
