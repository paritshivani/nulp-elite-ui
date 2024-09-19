import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { SITE_KEY } from "./Keys";
import React, { useEffect, useState} from "react";
import { useFormik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";
import * as Yup from "yup";

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const axios = require("axios");
import { Navigate } from "react-router-dom";
import { useStore } from "configs/zustandStore";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { t } from "i18next";
const urlConfig = require("../../configs/urlConfig.json");
import ToasterCommon from "../ToasterCommon";

const DELAY = 1500;
const MAX_CHARS = 500;

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
      border: "1px solid #004367",
      borderRadius: "12px",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

const Registration = () => {
  const [captchaResponse, setCaptchaResponse] = useState();
  const [emailExist, setEmailExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);
  const [goToOtp, setGoToOtp] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const setData = useStore((state) => state.setData);
  const designations = require("../../configs/designations.json");
  const [bio, setBio] = useState("");
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(25).required("Please enter your name"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Please enter your email"),
      password: Yup.string()
        .min(8, "Your password must contain a minimum of 8 characters")
        .required("Password is required")
        .matches(/[0-9]/, "It must include numbers")
        .matches(/[A-Z]/, "It must include capital letter")
        .matches(/[a-z]/, "It must include small letter")
        .matches(/[!@#$%^&*(,.{}/?<>)]/, "It must include special character"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password")],
          "Confirm Password must match the New Password"
        )
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      console.log("on submit", values);
      if (!captchaResponse) {
        setError("Please complete the CAPTCHA");
        return;
      }
      handleSubmit();
    },
  });
  const [designationsList, setDesignationsList] = useState([]);

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, DELAY);
    setDesignationsList(designations);
  }, []);
  const handleSubmit = async () => {
    const isEmailExist = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = `${urlConfig.URLS.LEARNER_PREFIX}user/${urlConfig.URLS.USER.EMAIL_EXIST}/${formik.values.email}?captchaResponse=${captchaResponse}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          showErrorMessage(t("EMAIL_ALREADY_EXIST"));
          throw new Error(t("EMAIL_ALREADY_EXIST"));
        }

        const data = await response.json();
        console.log("response:", data.result);
        if (data.result.exists) {
          setEmailExist(true);
        } else {
          generateOtp(formik.values.email);
        }
      } catch (error) {
        showErrorMessage(t("SOMETHING WENT WRONG"));
      } finally {
        setIsLoading(false);
      }
    };

    isEmailExist();

    const generateOtp = async (email) => {
      setIsLoading(true);
      setError(null);

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
          showErrorMessage(t("FAILED_TO_GENERATE_OTP"));
          throw new Error(t("FAILED_TO_GENERATE_OTP"));
        }

        const data = response.data;
        console.log("OTP response:", data.result);
        // localStorage.setItem("registeringUser", JSON.stringify(formik.values));
        const tncConfig = await getTermsAndCondition();
        const dataToSend = {
          captchaResponse: captchaResponse,
          userData: formik.values,
          tncConfig: tncConfig,
        };
        setData(dataToSend);

        setGoToOtp(true);
      } catch (error) {
        showErrorMessage(t("FAILED_TO_GENERATE_OTP"));

        setIsLoading(false);
      }
    };
  };
  if (goToOtp) {
    return <Navigate to={`/webapp/otp${window.location.search}`} />;
  }

  const onChange = (value) => {
    setCaptchaResponse(value);
    console.log("value", value);
  };
  const getTermsAndCondition = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.SYSTEM_SETTING.TNC_CONFIG}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
        throw new Error(t("FAILED_TO_FETCH_DATA"));
      }
      const data = await response.json();
      console.log("response:", data.result.response.value);
      return data.result.response.value;
    } catch (error) {
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeDesignation = (event) => {
    const { value } = event.target;
    formik.setFieldValue("designation", value);
    if (value === "Other") {
      formik.setFieldValue("otherDesignation", "");
    }
  };
  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= MAX_CHARS) {
      formik.setFieldValue("bio", value);
    }
  };

  return (
    <>
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      <Container
        maxWidth="sm"
        className="register"
        style={{
          textAlign: "center",
          backgroundPosition: "2px 426px",
          height: "100vh",
        }}
      >
        <Wrapper>
          <Box my={4}>
            <img src={require("../../assets/logo.png")} />
          </Box>
          <Typography
            style={{
              fontWeight: "600",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            {t("REGISTER")}
          </Typography>

          <Box py={1}>
            <CssTextField
              id="name"
              name="name"
              label={
                <span>
                  {t("NAME")} <span className="required">*</span>
                </span>
              }
              variant="outlined"
              size="small"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="form-error">{formik.errors.name}</p>
            )}
          </Box>
          <Box py={1}>
            <FormControl fullWidth style={{ marginTop: "10px" }}>
              <InputLabel id="demo-simple-select-label" className="year-select">
                {" "}
                {t("YEAR_OF_BIRTH")} <span className="required">*</span>
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Birth Year</option>
                {[...Array(100)].map((_, index) => {
                  const year = new Date().getFullYear() - index;
                  return (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box py={1}>
            <FormControl fullWidth style={{ marginTop: "10px" }}>
              <InputLabel id="designation-label">
                {" "}
                {t("DESIGNATION")} <span className="required">*</span>
              </InputLabel>
              <Select
                labelId="designation-label"
                id="designation"
                value={formik.values.designation}
                onChange={handleChangeDesignation}
                onBlur={formik.handleBlur}
              >
                {designationsList.map((desig, index) => (
                  <MenuItem key={index} value={desig}>
                    {desig}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {formik.values.designation === "Other" && (
            <Box py={1}>
              <CssTextField
                id="otherDesignation"
                name="otherDesignation"
                label={
                  <span>
                    {t("OTHER_DESIGNATION")} <span className="required">*</span>
                  </span>
                }
                variant="outlined"
                size="small"
                value={formik.values.otherDesignation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.otherDesignation &&
                formik.errors.otherDesignation && (
                  <p className="form-error">{formik.errors.otherDesignation}</p>
                )}
            </Box>
          )}
          <Box py={2}>
            <TextField
              id="bio"
              name="bio"
              label={<span>{t("BIO")}</span>}
              multiline
              rows={1}
              className="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              inputProps={{ maxLength: MAX_CHARS }}
            />
            <Typography
              variant="caption"
              color={
                formik.values.bio?.length > MAX_CHARS
                  ? "error"
                  : "textSecondary"
              }
            >
              {formik.values.bio ? formik.values.bio.length : 0}/{MAX_CHARS}
            </Typography>
          </Box>
          <Box py={2}>
            <CssTextField
              id="email"
              name="email"
              label={
                <span>
                  {t("EMAILID")} <span className="required">*</span>
                </span>
              }
              variant="outlined"
              autoComplete="Email Id"
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="form-error">{formik.errors.email}</p>
            )}
            {emailExist && <p className="form-error">Email already exists</p>}
          </Box>
          <Box py={1}>
            <CssTextField
              id="password"
              name="password"
              style={{ background: "#fff" }}
              label={
                <span>
                  {t("NEW_PASSWORD")} <span className="required">*</span>
                </span>
              }
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              size="small"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="form-error">{formik.errors.password}</p>
            )}
          </Box>
          <Box py={2}>
            <CssTextField
              id="confirmPassword"
              name="confirmPassword"
              label={
                <span>
                  {t("CONFIRM_NEW_PASSWORD")}{" "}
                  <span className="required">*</span>
                </span>
              }
              type="password"
              autoComplete="current-password"
              size="small"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="form-error">{formik.errors.confirmPassword}</p>
              )}
          </Box>

          <Box pt={4}>
            <Button
              style={{
                background:
                  formik.isValid && captchaResponse ? "#004367" : "#a9a9a9",
                borderRadius: "10px",
                color: "#fff",
                padding: "10px 71px",
                fontWeight: "600",
                fontSize: "14px",
              }}
              onClick={formik.handleSubmit}
              disabled={!formik.isValid || !captchaResponse}
            >
              {isLoading ? "Loading..." : "Continue"}
            </Button>
          </Box>
          <Box py={1}>
            <Typography
              variant="h1"
              style={{
                fontWeight: "400",
                fontSize: "12px",
                marginTop: "10px",
              }}
            >
              {t("ALREADY_HAVE_AN_ACCOUNT")}{" "}
              <Link href="/webapp/all">Log in</Link>
            </Typography>
          </Box>
          <Box py={1}>{error && <p className="form-error">{error}</p>}</Box>
          <Box py={1}>
            <ReCAPTCHA
              style={{ display: "inline-block" }}
              theme="dark"
              sitekey={SITE_KEY}
              onChange={onChange}
            />
          </Box>
        </Wrapper>
      </Container>
    </>
  );
};
const Wrapper = styled.section`
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #efedee;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .modal-right {
    flex: 1;
    display: flex;
    justify-content: flex-end; /* Align to the right */
    align-items: center;
    padding: 20px;
  }

  .modal-left {
    padding: 60px 30px 20px;
    background: #fff;
    flex: 1.5;
    opacity: 1;
  }

  .error {
    border-color: #b22b27 !important;
  }

  .invalid {
    border: 1px solid #ff0000 !important;
  }

  .modal {
    width: 100%;
    background: rgba(51, 51, 51, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
  }

  .modal-container {
    display: flex;
    max-width: 60vw;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    background: #fff;
  }

  .modal-title {
    margin: 0;
    font-weight: 400;
    color: #1e1e1d;
    text-align: center;
  }

  .required {
    color: red;
    margin-left: 2px;
  }
  .form-error {
    color: red;
  }
  .input-block {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #8692ed;
    border-radius: 12px;
    margin-bottom: 20px;
    transition: 0.3s;
    width: 100%;
    position: relative;
  }

  .input-block input,
  .input-block select {
    outline: 0;
    border: 0;
    padding: 4px 0 0;
    font-size: 14px;
  }

  .toggle-password {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .toggle-password svg {
    width: 20px;
    height: 20px;
    color: #ccc;
  }

  .input-button {
    padding: 1.2rem 6.2rem;
    outline: none;
    text-transform: uppercase;
    border: 0;
    color: #fff;
    border-radius: 12px;
    background: #8692ed;
    transition: 0.3s;
    cursor: pointer;
    font-family: "Nunito", sans-serif;
  }

  .input-button:hover {
    background: #55311c;
  }

  .sign-up {
    margin: 30px 0 0;
    font-size: 14px;
    text-align: center;
  }

  .sign-up a {
    color: #8692ed;
  }

  @media (max-width: 768px) {
    .modal-container {
      max-width: 90vw;
    }
  }

  .disabled-opacity {
    opacity: 0.2 !important;
  }
`;

export default Registration;
