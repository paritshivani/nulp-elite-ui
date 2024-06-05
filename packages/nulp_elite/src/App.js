import React, { useEffect, useState } from "react";

import "./App.css";
import "./styles/style.css";
import {
  NativeBaseProvider,
  Box,
  Stack,
  VStack,
  Text,
  HStack,
  Button,
  extendTheme,
  Actionsheet,
  ScrollView,
} from "native-base";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DEFAULT_THEME, H2, initializeI18n } from "@shiksha/common-lib";
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";

import * as util from "services/utilService";
// import { ChakraProvider } from "@chakra-ui/react";
import Profile from "pages/profile/Profile";
import Certificate from "pages/profile/certificate";
import FAQPage from "pages/FAQPage";
import AddConnections from "pages/connections/AddConnections";
import DomainList from "pages/search/DomainList";
import Registration from "pages/registration/Registration";
import ContentList from "pages/search/ContentList";
import AllContent from "pages/content/AllContent";
import CategoryPage from "pages/content/CategoryPage";
import LearningHistory from "pages/profile/learningHistory";
import continueLearning from "pages/profile/continueLearning";
import JoinCourse from "pages/content/joinCourse";
import Player from "pages/content/Player";
import Otp from "pages/registration/Otp";
import PDFContent from "pages/content/pdf";
import NoResult from "pages/content/noResultFound";
import Message from "pages/connections/message";
import Terms from "pages/terms";
import SelectPreference from "pages/SelectPreference";
import Chat from "pages/connections/chat";
import SampleComponent from "components/SampleComponent";
const urlConfig = require("./configs/urlConfig.json");
const routeConfig = require("./configs/routeConfig.json");

function App() {
  // const [t] = useTranslation();
  const [search, setSearch] = React.useState(true);
  const [searchState, setSearchState] = React.useState(false);
  // const theme = extendTheme(DEFAULT_THEME);
  const colors = "";
  const [sortArray, setSortArray] = React.useState([]);
  const [checkPref, setCheckPref] = React.useState(false);
  const _userId = util.userId();
  const routes = [
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.ALL_CONTENT_PAGE.ALL_CONTENT,
      component: AllContent,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.POFILE_PAGE.PROFILE,
      component: Profile,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.CERTIFICATE_PAGE.CERTIFICATE,
      component: Certificate,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.LEARNING_HISTORY_PAGE.LEARNING_HISTORY,
      component: LearningHistory,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.CONTINUE_LEARNING_PAGE.CONTINUE_LEARNING,
      component: continueLearning,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.HELP_PAGE.HELP,
      component: FAQPage,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.ADDCONNECTION_PAGE.ADDCONNECTION,
      component: AddConnections,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.DOMAINLIST_PAGE.DOMAINLIST,
      component: DomainList,
    },
    {
      moduleName: "nulp_elite",
      path:
        routeConfig.ROUTES.CONTENTLIST_PAGE.CONTENTLIST +
        routeConfig.ROUTES.CONTENTLIST_PAGE.PAGENUMBER,
      component: ContentList,
    },
    {
      moduleName: "nulp_elite",
      path:
        routeConfig.ROUTES.JOIN_COURSE_PAGE.JOIN_COURSE +
        routeConfig.ROUTES.JOIN_COURSE_PAGE.CONTENT_ID,
      component: JoinCourse,
    },
    // {
    //   moduleName: "nulp_elite",
    //   path: "/joinCourse/:contentId",
    //   component: JoinCourse,
    // },

    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.PLAYER_PAGE.PLAYER,
      component: Player,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.PDF_PAGE.PDF,
      component: PDFContent,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.NORESULT_PAGE.NORESULT,
      component: NoResult,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.CERTIFICATE_OLD_PAGE.CERTIFICATE_OLD,
      component: Certificate,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.SIGNUP_PAGE.SIGNUP,
      component: Registration,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.TERMS_PAGE.TERMS,
      component: Terms,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.OTP_PAGE.OTP,
      component: Otp,
    },
    {
      moduleName: "nulp_elite",
      path:
        routeConfig.ROUTES.VIEW_ALL_PAGE.VIEW_ALL +
        routeConfig.ROUTES.VIEW_ALL_PAGE.CATEGORY,
      component: CategoryPage,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.MESSAGE_PAGE.MESSAGE,
      component: Message,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.SELECT_PREFERENCE_PAGE.SELECT_PREFERENCE,
      component: SelectPreference,
    },
    {
      moduleName: "nulp_elite",
      path: routeConfig.ROUTES.CHAT_PAGE.CHAT,
      component: Chat,
    },
    {
      moduleName: "nulp_elite",
      path: "/webapp/demo",
      component: SampleComponent,
    },
  ];

  initializeI18n(
    ["translation"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${urlConfig.URLS.LEARNER_PREFIX}${urlConfig.URLS.USER.GET_PROFILE}${_userId}`;
        const response = await fetch(url);
        const data = await response.json();
        const rootOrgId = data.result.response.rootOrgId;
        sessionStorage.setItem("rootOrgId", rootOrgId);
        console.log(data.result.response.framework.board);
        if (data.result.response.framework.board) {
          setCheckPref(true);
        } else {
          setCheckPref(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <NativeBaseProvider>
      {/* <ChakraProvider> */}
      {/* <React.Suspense> */}
      {/* <I18nextProvider i18n={i18n}> */}
      {/* <ChakraProvider> */}
      <React.Suspense>
        {/* {!checkPref && <UserPrefPopup />} */}

        <Router>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Router>
      </React.Suspense>
      {/* </ChakraProvider> */}
      {/* </ChakraProvider> */}
      {/* </I18nextProvider> */}
    </NativeBaseProvider>
  );
}

export default App;
