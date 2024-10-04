import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, Navigate } from "react-router-dom";
import { useStore } from "configs/zustandStore";
const axios = require("axios");
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import Alert from "@mui/material/Alert";
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";

const Otp = () => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(""); // State to store OTP value
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true); // State to manage resend button disabled state
  const [remainingTime, setRemainingTime] = useState(60); // State to hold the remaining time
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [goToOtp, setGoToOtp] = useState(false);
  const dataStore = useStore((state) => state.data);
  const captchaResponse = dataStore.captchaResponse;
  const [open, setOpen] = useState(false);
  const [tncConfig, setTncConfig] = useState();
  const [tncConfigVersion, setTncConfigVersion] = useState();
  const [birthYear, setBirthYear] = useState(2000);
  const [isChecked, setIsChecked] = useState(false);
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  useEffect(() => {
    const storedUserData = dataStore.userData;
    if (storedUserData) {
      setUserData(storedUserData);
      setBirthYear(storedUserData.age);
      const latestVersion = JSON.parse(dataStore.tncConfig).latestVersion;
      setTncConfigVersion(latestVersion);
      const url = JSON.parse(dataStore.tncConfig)[latestVersion]?.url || "";
      setTncConfig(url);
    }
  }, [dataStore.userData, dataStore.tncConfig]);
  useEffect(() => {
    let timer;
    if (!resendDisabled) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 1) {
            setResendDisabled(true); // Disable resend button when timer expires
            clearInterval(timer); // Clear the timer
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [resendDisabled]);

  useEffect(() => {
    setResendDisabled(false); // Enable resend button
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      setResendDisabled(true);
      setRemainingTime(60);
    }
  }, [remainingTime]);

  const handleLogin = () => {
    if (otp.length >= 5 && isChecked) {
      verifyUser();
    }
  };

  const handleOtpChange = (value) => {
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLinkClick = () => {
    setOpen(true);
  };

  const verifyUser = async () => {
    setIsLoading(true);
    setError(null);

    const requestBody = {
      request: {
        key: userData && userData.email,
        type: "email",
        otp: otp,
      },
    };
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.OTP.VERIFY}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        showErrorMessage(t("FAILED_TO_VERIFY_OTP"));
        throw new Error(t("FAILED_TO_VERIFY_OTP"));
      }

      const data = await response.json();
      await signupUser(data.reqData);
      acceptTermsAndConditions();
    } catch (error) {
      showErrorMessage(t("FAILED_TO_VERIFY_OTP"));
    } finally {
      setIsLoading(false);
    }
  };

  const signupUser = async (reqData) => {
    setIsLoading(true);
    setError(null);

    const requestBody = {
      params: {
        source: "portal",
        signupType: "self",
      },
      request: {
        firstName: userData.name,
        password: userData.password,
        birthYear: userData.birthYear,
        email: userData.email,
        emailVerified: true,
        reqData: reqData,
      },
    };
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.USER.SIGN_UP_V1}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        showErrorMessage(t("FAILED_TO_SIGNUP"));
        throw new Error(t("FAILED_TO_SIGNUP"));
      }

      const data = await response.json();
      await saveUserInfoInCustomDB(data.result.userId);
      setGoToOtp(true);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_SIGNUP"));
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserInfoInCustomDB = async (userId) => {
    const requestBody = {
      user_id: userId,
      designation:
        userData.designation === "Other"
          ? userData.otherDesignation
          : userData.designation,
      bio: userData.bio,
      created_by: userId,
    };
    try {
      const url = `${urlConfig.URLS.USER.USER_SIGNUP}`;
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

      const data = await response.json();
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      setIsLoading(false);
    }
  };
  if (goToOtp) {
    return <Navigate to="/all" />;
  }

  const acceptTermsAndConditions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${urlConfig.URLS.USER.TNC_ACCEPT_LOGIN}`;

      const response = await axios.post(url, {
        request: {
          version: tncConfigVersion,
          identifier: userData.email,
        },
      });

      if (!response.ok) {
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
        throw new Error(t("FAILED_TO_FETCH_DATA"));
      }

      const data = response.data;
      console.log("acceptTermsAndConditionsresponse:", data.result);
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      setIsLoading(false);
    }
  };
  const generateOtp = async (email) => {
    const requestBody = {
      request: {
        key: email,
        type: "email",
        templateId: "wardLoginOTP",
      },
    };
    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.OTP.ANONYMOUS.GENERATE}?captchaResponse=${captchaResponse}`;

      const response = await axios.post(url, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        showErrorMessage(t("FAILED_TO_VERIFY_OTP"));
        throw new Error(t("FAILED_TO_VERIFY_OTP"));
      }

      const data = response.data;
    } catch (error) {
      console.log(error);
      showErrorMessage(t("FAILED_TO_VERIFY_OTP"));
      setIsLoading(false);
    }
  };

  const resendOtp = () => {
    generateOtp(userData.email);
    setResendDisabled(false); // Enable resend button
  };
  const age = new Date().getFullYear() - birthYear;
  const tncText =
    age < 18 ? (
      <span>{t("As_A_PATENT_GUARDIAN_ACCEPT_THE_NULP_TERMS_OF_USE")}</span>
    ) : (
      <span>{t("ACCEPT_THE_NULP_TERMS_OF_USE")}</span>
    );
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      <Container
        maxWidth="sm"
        className="otp"
        style={{
          textAlign: "center",
          backgroundPosition: "2px 426px",
          height: "100vh",
          // backgroundImage: `url(${image})`,
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "contain",
        }}
      >
        {error && (
          <Alert severity="error" className="my-10">
            {error}
          </Alert>
        )}

        <Box my={4}>
          <img src={require("../../assets/logo.png")} alt="Logo" />
        </Box>
        <Typography
          style={{ fontWeight: "600", fontSize: "16px", marginBottom: "40px" }}
        >
          {t("REGISTER")}
        </Typography>

        <Alert severity="info" style={{ textAlign: "left" }}>
          {t("PLEASE_ENTER_THE_VERFICATION_CODE_RECEIVED")}
        </Alert>
        <Typography
          style={{
            fontWeight: "400",
            fontSize: "12px",
            textAlign: "left",
            margin: "35px 0 10px 0",
          }}
        >
          {t("VERIFICATION_CODE")}
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="otp"
          label="OTP"
          name="otp"
          value={otp}
          onChange={(e) => handleOtpChange(e.target.value)}
          autoFocus
          inputProps={{ maxLength: 6 }}
        />

        <Button
          onClick={resendOtp}
          disabled={!resendDisabled}
          style={{
            textAlign: "right",
            fontSize: "10px",
            display: "block",
            marginTop: "10px",
          }}
        >
          {resendDisabled ? t("RESEND_OTP") : `Resend OTP in ${remainingTime}s`}
        </Button>
        <FormGroup
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexFlow: "row",
          }}
        >
          <FormControlLabel
            style={{ marginRight: "0" }}
            control={
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
            }
          />{" "}
          <Link href="#" onClick={handleLinkClick}>
            {" "}
            <span style={{ color: "#FF0000", marginLeft: "2px" }}>*</span>
            {tncText}
          </Link>
        </FormGroup>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="xxl"
          className="sm-w-700"
        >
          <DialogContent>
            <h1 style={{ fontSize: "22px" }}>{t("TERMS_CONDITIONS")}</h1>
            <iframe
              title="Terms and Conditions"
              src={tncConfig}
              style={{ width: "100%", height: "80vh", border: "none" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              {t("Close")}
            </Button>
          </DialogActions>
        </Dialog>

        <Box pt={4}>
          <Button
            onClick={handleLogin}
            disabled={!isChecked || otp.length < 5}
            style={{
              background:
                !isChecked || otp.length < 5
                  ? "rgba(0, 67, 103, 0.5)"
                  : "#004367",
              borderRadius: "10px",
              color: "#fff",
              padding: "10px 71px",
              fontWeight: "600",
              fontSize: "14px",
              margin: "20px 0 20px 0",
            }}
          >
            {t("SUBMIT")}
          </Button>
        </Box>
        <Box style={{ display: "flex", alignItems: "center" }}></Box>
        <Box py={1}>
          <Typography
            variant="h1"
            style={{
              fontWeight: "400",
              fontSize: "12px",
            }}
          >
            {t("ALREADY_HAVE_AN_ACCOUNT")}{" "}
            <Link href={`/webapp/all${window.location.search}`}>
              {t("LOGIN")}
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Otp;
