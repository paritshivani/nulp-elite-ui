import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
} from "@mui/material";
import * as util from "../services/utilService";
import { useTranslation } from "react-i18next";
const urlConfig = require("../configs/urlConfig.json");
import ToasterCommon from "./ToasterCommon";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SelectPreference = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [frameworkData, setFrameworkData] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const _userId = util.userId();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState([]);
  const [isRootOrg, setIsRootOrg] = useState(false);
  const [frameworks, setFrameworks] = useState([]);
  const [defaultFramework, setDefaultFramework] = useState("");
  const [custodianOrgId, setCustodianOrgId] = useState("");
  const [isEmptyPreference, setIsEmptyPreference] = useState(false);
  const [domain, setDomain] = useState();
  const [subDomain, setSubDomain] = useState();
  const [language, setLanguage] = useState();
  const [topic, setTopic] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [preCategory, setPreCategory] = useState("");
  const [preTopic, setPreTopic] = useState("");
  const [preSubCategory, setPreSubCategory] = useState([]);
  const [preLanguages, setPreLanguages] = useState([]);
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
    const fetchUserDataAndSetCustodianOrgData = async () => {
      try {
        const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.SYSTEM_SETTING.CUSTODIAN_ORG}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch custodian organization ID");
        }
        const data = await response.json();
        console.log("Raw API response:", data);
        const custodianOrgId = data?.result?.response?.value;
        setCustodianOrgId(custodianOrgId);
        // setUserRootOrgId(localStorage.getItem("userRootOrgId"));
        const rootOrgId = localStorage.getItem("userRootOrgId");
        if (custodianOrgId === rootOrgId) {
          const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CHANNEL.READ}/${custodianOrgId}`;
          const response = await fetch(url);
          const data = await response.json();
          const defaultFramework = data?.result?.channel?.defaultFramework;
          setDefaultFramework(defaultFramework);
          localStorage.setItem("defaultFramework", defaultFramework);
        } else {
          const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.CHANNEL.READ}/${rootOrgId}`;
          const response = await fetch(url);
          const data = await response.json();
          const defaultFramework = data?.result?.channel?.defaultFramework;
          setDefaultFramework(defaultFramework);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
        setToasterOpen(true);
      }
    };

    fetchUserDataAndSetCustodianOrgData();
  }, []);

  useEffect(() => {
    const defaultFrameworkFromLocal = localStorage.getItem("defaultFramework");
    setDefaultFramework(defaultFrameworkFromLocal);
    if (defaultFramework) {
      getFramework(defaultFramework);
    }
  }, [defaultFramework]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory([]);
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguages(event.target.value);
  };

  useEffect(() => {
    if (frameworkData) {
      getUserData();
    }
  }, [frameworkData]);

  const getFramework = async (defaultFramework) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${urlConfig.URLS.PUBLIC_PREFIX}${urlConfig.URLS.FRAMEWORK.READ}/${defaultFramework}`;
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
      setFrameworkData(data?.result?.framework?.categories);
      setCategories(data?.result?.framework?.categories[0]?.terms);
      setSubCategories(data?.result?.framework?.categories[1]?.terms);
      setTopics(data?.result?.framework?.categories[2]?.terms);
      setLanguages(data?.result?.framework?.categories[3]?.terms);

      setDomain(data?.result?.framework?.categories[0]?.name);
      setSubDomain(data?.result?.framework?.categories[1]?.name);
      setTopic(data?.result?.framework?.categories[2]?.name);
      setLanguage(data?.result?.framework?.categories[3]?.name);
    } catch (error) {
      console.error("Error fetching data:", error);
      showErrorMessage(t("FAILED_TO_FETCH_DATA"));
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.USER.GET_PROFILE}${_userId}?fields=${urlConfig.params.userReadParam.fields}`;
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

      const responseData = await response.json();
      if (_.isEmpty(responseData?.result?.response.framework)) {
        setIsEmptyPreference(true);
      } else {
        setSelectedCategory(
          responseData?.result?.response?.framework?.board[0]
        );
        setSelectedSubCategory(
          responseData?.result?.response?.framework?.gradeLevel
        );

        setSelectedTopic(
          responseData?.result?.response?.framework?.subject &&
            responseData?.result?.response?.framework?.subject[0]
        );
        setSelectedLanguages(responseData?.result?.response?.framework?.medium);

        setPreCategory(responseData?.result?.response?.framework?.board[0]);
        responseData?.result?.response?.framework?.subject &&
          setPreTopic(responseData?.result?.response?.framework?.subject[0]);
        setPreLanguages(responseData?.result?.response?.framework?.medium);
        setPreSubCategory(
          responseData?.result?.response?.framework?.gradeLevel
        );
      }
      console.log("getUserData", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      showErrorMessage("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserData = async () => {
    setIsLoading(true);
    setError(null);

    const requestBody = {
      params: {},
      request: {
        framework: {
          board: [selectedCategory],
          medium: selectedLanguages,
          gradeLevel: selectedSubCategory,
          subject: [selectedTopic],
          id: defaultFramework,
        },
        userId: _userId,
      },
    };

    try {
      const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.USER.UPDATE_USER_PROFILE}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        showErrorMessage(t("FAILED_TO_FETCH_DATA"));
        throw new Error(t("FAILED_TO_FETCH_DATA"));
      }

      const responseData = await response.json();
      console.log("responseData", responseData);
    } catch (error) {
      showErrorMessage("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = () => {
    updateUserData();
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  const deepEqual = (array1, array2) => {
    array1 = array1.sort();
    array2 = array2.sort();
    var is_same =
      array1.length == array2.length &&
      array1.every(function (element, index) {
        return element === array2[index];
      });
    return is_same;
  };

  useEffect(() => {
    if (
      preCategory == selectedCategory &&
      preTopic == selectedTopic &&
      deepEqual(preLanguages, selectedLanguages) &&
      deepEqual(preSubCategory, selectedSubCategory)
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    selectedCategory,
    selectedSubCategory,
    selectedLanguages,
    selectedTopic,
    preCategory,
    preTopic,
    preLanguages,
    preSubCategory,
  ]);

  return (
    <div>
      {toasterMessage && <ToasterCommon response={toasterMessage} />}
      <Box sx={{ minWidth: 120 }} className="preference">
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="category-label" className="year-select">
            {domain}
          </InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories?.map((category) => (
              <MenuItem key={category?.id} value={category?.name}>
                {category?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="sub-category-label" className="year-select">
              {subDomain}
            </InputLabel>
            <Select
              labelId="sub-category-label"
              id="sub-category-select"
              multiple
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
            >
              {subCategories?.map((subCategory) => (
                <MenuItem key={subCategory?.id} value={subCategory?.name}>
                  <Checkbox
                    checked={selectedSubCategory?.includes(subCategory?.name)}
                  />
                  <ListItemText primary={subCategory?.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="language-label" className="year-select">
              {language}
            </InputLabel>
            <Select
              labelId="language-label"
              id="language-select"
              multiple
              value={selectedLanguages}
              onChange={handleLanguageChange}
            >
              {languages?.map((language) => (
                <MenuItem key={language?.id} value={language?.name}>
                  <Checkbox
                    checked={selectedLanguages?.includes(language?.name)}
                  />
                  <ListItemText primary={language?.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="topic-label" className="year-select">
            {topic}
          </InputLabel>
          <Select
            labelId="topic-label"
            value={selectedTopic}
            onChange={handleTopicChange}
          >
            {topics?.map((topic) => (
              <MenuItem key={topic?.id} value={topic?.name}>
                {topic?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box className="d-flex jc-en">
        {!isEmptyPreference && (
          <Button className="custom-btn-default lg-mr-20" onClick={handleClose}>
            {t("CANCEL")}
          </Button>
        )}
        <Button
          className="custom-btn-primary my-10 "
          onClick={handleSavePreferences}
          disabled={isDisabled}
        >
          {t("SUBMIT")}
        </Button>
      </Box>
    </div>
  );
};

export default SelectPreference;
