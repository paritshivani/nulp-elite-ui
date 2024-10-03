import React, { useState } from "react";
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
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const categories = [
  "State / UT / SPVs / ULBs / Any Other",
  "Industry",
  "Academia",
];

const themes = [
  "NULP Domain 1",
  "NULP Domain 2",
  "NULP Domain 3",
  "NULP Domain 4",
  "NULP Domain 5",
  "NULP Domain 6",
  "NULP Domain 7",
  "NULP Domain 8",
  "NULP Domain 9",
  "NULP Domain 10",
  "Others",
];

const LernCreatorForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobileNumber: "",
    category: "",
    organisation: "",
    department: "",
    theme: "",
    otherTheme: "",
    title: "",
    description: "",
    file: null,
    consent: false,
  });

  const [guidelineLink, setGuidelineLink] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      consent: e.target.checked,
    });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData({ ...formData, category });

    // Set appropriate guideline link based on category
    if (category === "State / UT / SPVs / ULBs / Any Other") {
      setGuidelineLink("link-to-state-guidelines.pdf");
    } else if (category === "Industry") {
      setGuidelineLink("link-to-industry-guidelines.pdf");
    } else if (category === "Academia") {
      setGuidelineLink("link-to-academia-guidelines.pdf");
    } else {
      setGuidelineLink("");
    }
  };

  const handleSubmit = (action) => {
    if (!formData.consent) {
      alert("You must accept the terms and conditions.");
      return;
    }

    // Handle form submission (draft or review)
    console.log("Form submitted:", formData);
    if (action === "draft") {
      alert("Saved as draft");
    } else if (action === "review") {
      alert("Sent for review");
    }
  };

  return (
    <Box p={3} maxWidth={800} mx="auto">
      <Typography variant="h4" gutterBottom>
        Lern Creator Form
      </Typography>

      <form>
        <TextField
          fullWidth
          margin="normal"
          label="User Name*"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />

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

        <TextField
          fullWidth
          margin="normal"
          label="Mobile Number*"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Category of Participation*"
          name="category"
          value={formData.category}
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
          <a href={guidelineLink} target="_blank" rel="noopener noreferrer">
            Link to Guidelines
          </a>
        )}

        <TextField
          fullWidth
          margin="normal"
          label="Name of Organisation*"
          name="organisation"
          value={formData.organisation}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          margin="normal"
          label="Name of Department/Group"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Indicative Theme*"
          name="theme"
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

        {formData.theme === "Others" && (
          <TextField
            fullWidth
            margin="normal"
            label="Other Theme"
            name="otherTheme"
            value={formData.otherTheme}
            onChange={handleChange}
          />
        )}

        <TextField
          fullWidth
          margin="normal"
          label="Title of Submission*"
          name="title"
          value={formData.title}
          onChange={handleChange}
          inputProps={{ maxLength: 20 }}
          required
        />

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

        <div>
          <Tooltip title="Supported formats: MP4, PDF, HTML5, YouTube links">
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          <TextField
            type="file"
            onChange={handleFileChange}
            inputProps={{
              accept: "video/mp4,application/pdf,text/html,video/youtube",
            }}
          />
        </div>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.consent}
              onChange={handleCheckboxChange}
              name="consent"
            />
          }
          label="I accept the terms and conditions"
        />

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit("draft")}
            style={{ marginRight: 10 }}
          >
            Save as Draft
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSubmit("review")}
          >
            Send for Review
          </Button>
        </Box>
      </form>

      <Box mt={4}>
        <Button
          variant="outlined"
          onClick={() => (window.location.href = "/helpdesk")}
        >
          Need Help
        </Button>
      </Box>
    </Box>
  );
};

export default LernCreatorForm;
