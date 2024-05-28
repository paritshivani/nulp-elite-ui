// Profile.js

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import data from "../../assets/certificates.json";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Card from "@mui/material/Card";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import * as util from "../../services/utilService";
import axios from "axios";
import NoResult from "pages/content/noResultFound";
import Alert from "@mui/material/Alert";
import ToasterCommon from "../ToasterCommon";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Certificate = () => {
  const { t } = useTranslation();
  const [certData, setCertData] = useState(null);
  const [otherCertData, setOtherCertData] = useState([]);
  const [error, setError] = useState(null);
  const urlConfig = require("../../configs/urlConfig.json");
  const [toasterOpen, setToasterOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const navigate = useNavigate();

  const showErrorMessage = (msg) => {
    setToasterMessage(msg);
    setTimeout(() => {
      setToasterMessage("");
    }, 2000);
    setToasterOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const _userId = util.userId();
        const request = {
          request: {
            _source: [
              "data.badge.issuer.name",
              "pdfUrl",
              "data.issuedOn",
              "data.badge.name",
            ],
            query: {
              bool: {
                must: [
                  {
                    match_phrase: {
                      "recipient.id": _userId,
                    },
                  },
                ],
              },
            },
          },
        };
        const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.CERTIFICATE.CERT_SEARCH}`;
        const response = await axios.post(url, request);
        const data = response.data;
        setCertData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
      }

      try {
        const _userId = util.userId();
        const request = {
          filters: {
            recipient: { id: { eq: _userId } },
          },
        };
        const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.CERTIFICATE.CERTIF_SEARCH}`;
        const response = await axios.post(url, request);
        const data = response.data;
        setOtherCertData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      {/* <Header /> */}
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      <Container maxWidth="xxl" role="main" className="container-pb mb-20">
        {error && (
          <Alert severity="error" className="my-10">
            {error}
          </Alert>
        )}
        <Box textAlign="center" padding="10">
          {/* <Breadcrumbs
            aria-label="breadcrumb"
            style={{
              padding: "25px 0",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            <Link underline="hover" color="#004367" href="/profile">
              {t("MY_PROFILE")}
            </Link>
            <Link underline="hover" href="" aria-current="page" color="#484848">
              {t("CERTIFICATES")}
            </Link>
          </Breadcrumbs> */}
          <Box className="d-flex jc-bw alignItems-center mb-20">
            <Box style={{ display: "flex", alignItems: "end" }}>
              <DescriptionOutlinedIcon style={{ paddingRight: "10px" }} />{" "}
              {t("DOWNLOAD_CERTIFICATES")}
            </Box>
            <Link
              type="button"
              href="/profile"
              className="viewAll xs-mr-10"
              // onClick={handleGoBack}
            >
              {t("BACK_TO_LEARNNG")}
            </Link>
          </Box>
          <Card style={{ padding: "20px", textAlign: "left" }}>
            <Grid
              container
              spacing={2}
              style={{ textAlign: "left", paddingTop: "10px" }}
            >
              {(!certData || certData.result.response.content.length === 0) &&
              otherCertData.length === 0 ? (
                <NoResult />
              ) : (
                <>
                  {certData &&
                    certData.result.response.content &&
                    certData.result.response.content.map((certificate) => (
                      <Grid item xs={12} md={4} key={certificate._id}>
                        <Card
                          sx={{
                            marginTop: "10px",
                            padding: "10px",
                            borderRadius: "10px",
                            border: "solid 1px #EFEFEF",
                            boxShadow: "none",
                            color: "#484848",
                          }}
                        >
                          <Typography
                            className="twoLineEllipsis"
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            style={{
                              fontSize: "14px",
                              paddingBottom: "15px",
                              height: "42px",
                              fontWeight: "600",
                            }}
                          >
                            {certificate._source.data.badge.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            style={{ fontSize: "12px" }}
                          >
                            {t("CERTIFICATE_GIVEN_BY")}:{" "}
                            {certificate._source.data.badge.issuer.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            style={{ fontSize: "12px" }}
                          >
                            {t("CERTIFICATE_ISSUE_DATE")}:{" "}
                            {formatDate(certificate._source.data.issuedOn)}
                          </Typography>
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "end",
                              color: "#1976d2",
                            }}
                          >
                            <SimCardDownloadOutlinedIcon />
                            <Link
                              href={certificate._source.pdfUrl} // Corrected usage of pdfUrl
                              underline="none"
                              style={{
                                fontSize: "12px",
                                marginTop: "15px",
                                display: "block",
                              }}
                              key={certificate._id} // Add key prop
                            >
                              {t("CERTIFICATES")}
                            </Link>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  {otherCertData.map((certificate) => (
                    <Grid item xs={12} md={4} key={certificate.osid}>
                      <Card
                        sx={{
                          marginTop: "10px",
                          padding: "10px",
                          borderRadius: "10px",
                          border: "solid 1px #EFEFEF",
                          boxShadow: "none",
                          color: "#484848",
                        }}
                      >
                        <Typography
                          className="twoLineEllipsis"
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{
                            fontSize: "14px",
                            paddingBottom: "15px",
                            height: "42px",
                            fontWeight: "600",
                          }}
                        >
                          {certificate.training.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "12px" }}
                        >
                          {t("CERTIFICATE_GIVEN_BY")}: {certificate.issuer.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          style={{ fontSize: "12px" }}
                        >
                          {t("CERTIFICATE_ISSUE_DATE")}:{" "}
                          {formatDate(certificate.osCreatedAt)}
                        </Typography>
                        <Box
                          style={{
                            display: "flex",
                            alignItems: "end",
                            color: "#1976d2",
                          }}
                          className="text-green"
                        >
                          <SimCardDownloadOutlinedIcon />
                          <Link
                            href={certificate.pdfUrl} // Corrected usage of pdfUrl
                            underline="none"
                            style={{
                              fontSize: "12px",
                              marginTop: "15px",
                              display: "block",
                            }}
                            key={certificate.osid} // Add key prop
                          >
                            {t("CERTIFICATES")}
                          </Link>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Card>
        </Box>
      </Container>
      <FloatingChatIcon />
      {/* <Footer /> */}
    </div>
  );
};

export default Certificate;
