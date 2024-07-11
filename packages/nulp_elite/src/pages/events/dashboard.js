import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTranslation } from "react-i18next";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { Pagination, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const urlConfig = require("../../configs/urlConfig.json");

const Dashboard = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [certificateFilter, setCertificateFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("");
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [eventCount, setEventCount] = useState({
    totalEvent: 0,
    totalEventInThisMonth: 0,
    totalParticipants: 0,
    totalCreators: 0,
    totalCertifiedUsers: 0,
  });
  const [topEvent, setTopEvent] = useState([]);
  const [topDesignation, setTopDesignation] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const requestBody = {
        request: {
          filters: {
            objectType: ["Event"],
            se_boards: [null],
            gradeLevel: [],
            startDate: {
              ">=": [],
              "<=": [],
            },
            IssueCerificate: certificateFilter ? certificateFilter : undefined,
            eventVisibility: visibilityFilter ? visibilityFilter : undefined,
          },
          query: searchQuery,
          sort_by: {
            lastPublishedOn: "desc",
            startDate: "desc",
          },
          limit: 10,
          offset: 10 * (currentPage - 1),
        },
      };

      try {
        const url = `${urlConfig.URLS.EVENT.GET_LIST}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        let responseData = await response.json();
        console.log(responseData?.result?.result?.Event);
        setTotalCount(responseData?.result?.result?.count);
        setTotalPages(Math.ceil(responseData?.result?.result?.count / 10));

        setEvents(responseData?.result?.result?.Event || []);
        setPage(responseData?.result?.result?.Event?.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const eventCounts = async () => {
      const requestBody = {
        request: {
          filters: {
            objectType: ["Event"],
            se_boards: [null],
            gradeLevel: [],
            startDate: {
              ">=": [],
              "<=": [],
            },
          },
          sort_by: {
            lastPublishedOn: "desc",
            startDate: "desc",
          },
          offset: 0,
        },
      };

      try {
        const url = `${urlConfig.URLS.EVENT.GET_COUNT}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        let responseData = await response.json();
        console.log(responseData?.result);
        setEventCount(responseData?.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const topTrendingEvents = async () => {
      try {
        const params = new URLSearchParams({
          user: true,
          designation: true,
        });
        const url = `${
          urlConfig.URLS.EVENT.TOP_TRENDING_EVENT
        }?${params.toString()}`;
        const response = await fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        let responseData = await response.json();
        console.log(responseData?.result);
        setTopEvent(responseData?.result?.topEvent);
        setTopDesignation(responseData?.result?.topDesignation);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOptions();
    eventCounts();
    topTrendingEvents();
  }, [currentPage, searchQuery, certificateFilter, visibilityFilter]);

  const handlePageChange = (event, newValue) => {
    setCurrentPage(newValue);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length >= 2) {
      setCurrentPage(1);
    } else {
      setSearchQuery("");
    }
  };

  const handleCertificateFilterChange = (event) => {
    setCertificateFilter(event.target.value);
  };
  const handleVisibilityFilterChange = (event) => {
    setVisibilityFilter(event.target.value);
  };
  const xAxisDataa = topEvent.map((event) => event.event_name);
  const seriesDataa = [
    { data: topEvent.map((event) => parseInt(event.user_count)) },
  ];
  // Map topDesignation data to fit the format expected by LineChart component
  const xAxisData = topDesignation.map((designation) => designation.event_name);
  const seriesData = [
    {
      data: topDesignation.map((designation) =>
        parseFloat(designation.user_count)
      ),
    },
  ];

  return (
    <div>
      <Header />

      <Container
        maxWidth="xl"
        role="main"
        className=" xs-pb-20 mt-12  dashboard mt-32 pt-121"
      >
        <Box className="mb-30 h3-title">
          <DashboardOutlinedIcon
            style={{ paddingRight: "10px", marginBottom: "-4px" }}
          />
          {t("EVENTS_DASHBOARD")}
        </Box>
        <Grid container spacing={2} className="dashboard-cards">
          <Box className="dashboard-card">
            <Box className="h2-title">{t("TOTAl_EVENTS")}</Box>
            <Box className="h1-title fs-40">{eventCount.totalEvent}</Box>
          </Box>

          <Box className="dashboard-card">
            <Box className="h2-title">{t("EVENTS_THIS_MONTH")}</Box>
            <Box className="h1-title fs-40">
              {eventCount.totalEventInThisMonth}
            </Box>
          </Box>

          <Box className="dashboard-card">
            <Box className="h2-title">{t("TOTAL_PARTICIPANTS")}</Box>
            <Box className="h1-title fs-40">{eventCount.totalParticipants}</Box>
          </Box>

          <Box className="dashboard-card">
            <Box className="h2-title">{t("TOTAL_CREATORS")}</Box>
            <Box className="h1-title fs-40">{eventCount.totalCreators}</Box>
          </Box>

          <Box className="dashboard-card">
            <Box className="h2-title">{t("TOTAL_CERTIFIED_USERS")}</Box>
            <Box className="h1-title fs-40">
              {eventCount.totalCertifiedUsers}
            </Box>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box className="mb-10 h3-title mt-32">
              <TrendingUpOutlinedIcon style={{ paddingRight: "10px" }} />
              {t("TOP_TRENDING_EVENT")}
            </Box>
            <Box className="d-flex">
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Select Date from" />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Select Date To" />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Box>

            <BarChart
              xAxis={[{ scaleType: "band", data: xAxisDataa }]}
              series={seriesDataa}
              axisLeft={{
                title: "Participants",
                titleProps: { fill: "#000", fontSize: 14, fontWeight: "bold" },
              }}
              height={300}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="mb-10 h3-title mt-32">
              <TrendingUpOutlinedIcon style={{ paddingRight: "10px" }} />
              {t("TOP_TRENDING_DESIGNATIONS")}
            </Box>
            <Box className="d-flex">
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Select Date from" />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Select Date To" />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Box>
            <LineChart
              xAxis={[{ data: [1, 4, 6, 8, 10, 12] }]}
              series={seriesData}
              height={300}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mt-32">
          <Grid item xs={6} md={2}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Created By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value=""
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value=""
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Sub-Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value=""
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Public/ Invite Only
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={visibilityFilter}
                onChange={handleVisibilityFilterChange}
                label="Public/ Invite Only"
              >
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Private">Invite Only</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Certificate Attached
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={certificateFilter}
                onChange={handleCertificateFilterChange}
                label="Certificate Attached"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2} className="search-event">
            <TextField
              label="Search By Event Name"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleSearchChange}
            />
          </Grid>
        </Grid>
        <TableContainer component={Paper} className="lg-mb-20">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: "#f4efe3" }}>
              <TableRow>
                <TableCell>S.No.</TableCell>
                <TableCell align="center">Event Name</TableCell>
                <TableCell align="center">Event Date</TableCell>
                <TableCell align="center">No. of Participants</TableCell>
                <TableCell align="center">Certificate Attached</TableCell>
                <TableCell align="center">Creator</TableCell>
                <TableCell align="center">Download Report</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event, index) => (
                <TableRow
                  key={event.identifier}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{event.name}</TableCell>
                  <TableCell align="center">
                    {new Date(event.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    {event.totalParticipants}
                  </TableCell>
                  <TableCell align="center">{event.IssueCerificate}</TableCell>
                  <TableCell align="center">{event.EventOrganisedby}</TableCell>
                  <TableCell align="center">
                    <FileDownloadOutlinedIcon className="text-primary" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        Showing {page} of {totalCount} Entries
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Container>
      <FloatingChatIcon />
      <Footer />
    </div>
  );
};

export default Dashboard;
