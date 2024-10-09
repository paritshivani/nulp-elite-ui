import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Tooltip,
  IconButton,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Footer from "components/Footer";
import Header from "components/header";
const urlConfig = require("../../configs/urlConfig.json");
import * as util from "../../services/utilService";
import { v4 as uuidv4 } from "uuid";
// const [globalSearchQuery, setGlobalSearchQuery] = useState();
// // location.state?.globalSearchQuery || undefined
// const [searchQuery, setSearchQuery] = useState(globalSearchQuery || "");

const categories = [
  "State / UT / SPVs / ULBs / Any Other",
  "Industry",
  "Academia",
];

const themes = [
  "Solid Waste Management",
  "Environment and Climate",
  "WASH - Water, Sanitation and Hygiene",
  "Urban Planning and Housing",
  "Transport and Mobility",
  "Social Aspects",
  "Municipal Finance",
  "General Administration",
  "Governance and Urban Management",
  "Miscellaneous/ Others",
];

const LernCreatorForm = () => {
  const _userId = util.userId(); // Assuming util.userId() is defined

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    mobile_number: "",
    icon: "",
    category_of_participation: "",
    name_of_organisation: "",
    name_of_department_group: "",
    indicative_theme: "",
    title_of_submission: "",
    description: "",
    content_id: null,
    consent_checkbox: false,
    status: "",
    created_by: _userId,

    // "link_to_guidelines": "https://demo.com/guideline",
  });
  const [guidelineLink, setGuidelineLink] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIconChange = async (e) => {
    const _uuid = uuidv4();
    const assetBody = {
      request: {
        asset: {
          primaryCategory: "asset",
          language: ["English"],
          code: _uuid,
          name: e.target.files[0].name,
          mediaType: "image",
          mimeType: "image/png",
          createdBy: _userId,
        },
      },
    };
    try {
      const response = await fetch(`${urlConfig.URLS.ICON.CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assetBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch polls");
      }

      const result = await response.json();
      console.log("suceesss----", result);

      const uploadBody = {
        request: {
          content: {
            name: e.target.files[0].name,
          },
        },
      };
      try {
        const response = await fetch(
          `${urlConfig.URLS.ICON.UPLOAD}${result.result.identifier}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(uploadBody),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch polls");
        }

        const uploadResult = await response.json();
        console.log("upload suceesss------", uploadResult);
        // setData(result.result.data);
        // setTotalPages(Math.ceil(result.result.totalCount / 10));
      } catch (error) {
        console.log("error---", error);
        // setError(error.message);
      } finally {
        // setIsLoading(false);
      }
    } catch (error) {
      console.log("error---", error);
      // setError(error.message);
    } finally {
      // setIsLoading(false);
    }

    setFormData({
      ...formData,
      submissionIcon: e.target.files[0],
    });
  };
  const handleFileChange = async (e) => {
    console.log("e.target.files[0]----", e.target.files[0]);
    const _uuid = uuidv4();
    const assetBody = {
      request: {
        content: {
          primaryCategory: "Good Practices",
          contentType: "Resource",
          language: ["English"],
          code: _uuid,
          name: e.target.files[0].name,
          mediaType: "image",
          mimeType: e.target.files[0].type,
          createdBy: _userId,
        },
      },
    };
    try {
      const response = await fetch(`${urlConfig.URLS.ASSET.CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assetBody),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch polls");
      }

      const result = await response.json();
      console.log("suceesss----", result);

      const uploadBody = {
        request: {
          content: {
            name: formData.title_of_submission,
          },
        },
      };
      try {
        const response = await fetch(
          `${urlConfig.URLS.ASSET.UPLOAD}${result.result.identifier}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(uploadBody),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch polls");
        }

        const uploadResult = await response.json();
        console.log("upload suceesss------", uploadResult);
        // setData(result.result.data);
        // setTotalPages(Math.ceil(result.result.totalCount / 10));
      } catch (error) {
        console.log("error---", error);
        // setError(error.message);
      } finally {
        // setIsLoading(false);
      }
    } catch (error) {
      console.log("error---", error);
      // setError(error.message);
    } finally {
      // setIsLoading(false);
    }
    setFormData({
      ...formData,
      submissionIcon: e.target.files[0],
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      consent_checkbox: e.target.checked,
    });
  };

  const handleCategoryChange = (e) => {
    const category_of_participation = e.target.value;
    setFormData({ ...formData, category_of_participation });

    // Set appropriate guideline link based on category_of_participation
    if (category_of_participation === "State / UT / SPVs / ULBs / Any Other") {
      setGuidelineLink("link-to-state-guidelines.pdf");
    } else if (category_of_participation === "Industry") {
      setGuidelineLink("link-to-industry-guidelines.pdf");
    } else if (category_of_participation === "Academia") {
      setGuidelineLink("link-to-academia-guidelines.pdf");
    } else {
      setGuidelineLink("");
    }
  };

  const checkDraftValidations = (formData) => {};
  const checkReviewValidations = (formData) => {};
  const handleSubmit = async (action) => {
    if (!formData.consent_checkbox) {
      alert("You must accept the terms and conditions.");
      return;
    }

    formData.created_by = _userId;
    // Handle form submission (draft or review)
    console.log("Form submitted:", formData);
    if (action === "draft") {
      // Add validations
      checkDraftValidations(formData);
      try {
        const response = await fetch(`${urlConfig.URLS.LEARNATHON.CREATE}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch polls");
        }

        const result = await response.json();
        console.log("suceesss");
        // setData(result.result.data);
        // setTotalPages(Math.ceil(result.result.totalCount / 10));
      } catch (error) {
        console.log("error---", error);
        // setError(error.message);
      } finally {
        // setIsLoading(false);
      }

      console.log("Saved as draft");
    } else if (action === "review") {
      checkReviewValidations(formData);
      if (isEdit != true) {
        try {
          const response = await fetch(`${urlConfig.URLS.LEARNATHON.CREATE}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch polls");
          }

          const result = await response.json();
          console.log("suceesss");
          // setData(result.result.data);
          // setTotalPages(Math.ceil(result.result.totalCount / 10));
        } catch (error) {
          console.log("error---", error);
          // setError(error.message);
        } finally {
          // setIsLoading(false);
        }
      } else {
        try {
          const response = await fetch(`${urlConfig.URLS.LEARNATHON.UPDATE}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch polls");
          }

          const result = await response.json();
          console.log("suceesss");
          // setData(result.result.data);
          // setTotalPages(Math.ceil(result.result.totalCount / 10));
        } catch (error) {
          console.log("error---", error);
          // setError(error.message);
        } finally {
          // setIsLoading(false);
        }
      }

      console.log("Sent for review");
    }
  };

  return (
    <>
      <Header />
      <Paper elevation={3} sx={{ padding: "20px", backgroundColor: "#f9f4eb" }}>
        <Box p={3} maxWidth={800} mx="auto">
          <Typography variant="h5" gutterBottom>
            Upload Learnathon Submission
          </Typography>

          <Box my={2}>
            <Button
              variant="contained"
              onClick={() =>
                window.open(
                  "https://helpdesknulp.niua.org/public/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              style={{ float: "right" }}
            >
              Need Help
            </Button>
          </Box>

          <Typography variant="h6" gutterBottom>
            Participant Details
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="User Name*"
                name="user_name"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Email*"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Mobile Number*"
                name="mobile_number"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom style={{ marginTop: "30px" }}>
            Submission Details
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          <Grid item xs={12}>
            <div>
              <Tooltip title="Supported formats: MP4, PDF, HTML5, YouTube links">
                <IconButton>
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
              <TextField
                type="file"
                fullWidth
                onChange={handleIconChange}
                inputProps={{
                  accept: "jpg,png",
                }}
              />
            </div>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                margin="normal"
                label="Category of Participation*"
                name="category_of_participation"
                value={formData.category_of_participation}
                onChange={handleCategoryChange}
                required
              >
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              {guidelineLink && (
                <a
                  href={guidelineLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View and Download Guidelines
                </a>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Name of Organisation*"
                name="name_of_organisation"
                value={formData.organisation}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Name of Department/Group"
                name="name_of_department_group"
                value={formData.department}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                margin="normal"
                label="Indicative Theme*"
                name="indicative_theme"
                value={formData.theme}
                onChange={handleChange}
                required
              >
                {themes.map((theme) => (
                  <MenuItem key={theme} value={theme}>
                    {theme}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Title of Submission*"
                name="title_of_submission"
                value={formData.title}
                onChange={handleChange}
                inputProps={{ maxLength: 20 }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Description*"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                inputProps={{ maxLength: 100 }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <div>
                <Tooltip title="Supported formats: MP4, PDF, HTML5, YouTube links">
                  <IconButton>
                    <HelpOutlineIcon />
                  </IconButton>
                </Tooltip>
                <TextField
                  type="file"
                  fullWidth
                  onChange={handleFileChange}
                  inputProps={{
                    accept: "video/mp4,application/pdf,text/html,video/youtube",
                  }}
                />
              </div>
            </Grid>
          </Grid>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.consent_checkbox}
                onChange={handleCheckboxChange}
                name="consent_checkbox"
              />
            }
            label="I accept the terms and conditions"
          />

          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
            style={{ marginTop: "20px" }}
          >
            Your submission will be used for NULP purposes only and your
            personal details will not be disclosed to any entity.
          </Typography>

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit("draft")}
            >
              Save as Draft
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleSubmit("review")}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
      <Footer />
    </>
  );
};

export default LernCreatorForm;
