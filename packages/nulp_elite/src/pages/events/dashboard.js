import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Header from "components/header";
import Container from "@mui/material/Container";
import FloatingChatIcon from "../../components/FloatingChatIcon";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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

const Dashboard = () => {
  const { t } = useTranslation();

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
            <Box className="h1-title fs-40">54</Box>
          </Box>

          <Box className="dashboard-card">
            <Box className="h2-title">{t("EVENTS_THIS_MONTH")}</Box>
            <Box className="h1-title fs-40">21</Box>
          </Box>

          <Box className="dashboard-card">
            <Box className="h2-title">{t("TOTAL_PARTICIPANTS")}</Box>
            <Box className="h1-title fs-40">154</Box>
          </Box>

          <Box className="dashboard-card">
            <Box className="h2-title">{t("TOTAL_CREATORS")}</Box>
            <Box className="h1-title fs-40">13</Box>
          </Box>

          <Box className="dashboard-card">
            <Box className="h2-title">{t("TOTAL_CERTIFIED_USERS")}</Box>
            <Box className="h1-title fs-40">04</Box>
          </Box>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box className="mb-10 h3-title mt-32">
              <TrendingUpOutlinedIcon style={{ paddingRight: "10px" }} />
              {t("TOP_TRENDING_EVENT")}
            </Box>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: [
                    "Event A",
                    "Event B",
                    "Event C",
                    "Event D",
                    "Event E",
                    "Event F",
                  ],
                },
              ]}
              series={[{ data: [4, 1, 4, 3, 4, 1] }]}
              axisLeft={{
                title: "rainfall (mm)",
                titleProps: { fill: "#000", fontSize: 14, fontWeight: "bold" }, // Customize the label style
              }}
              height={300}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="mb-10 h3-title mt-32">
              <TrendingUpOutlinedIcon style={{ paddingRight: "10px" }} />
              {t("TOP_TRENDING_DESIGNATIONS")}
            </Box>
            <LineChart
              xAxis={[{ data: [1, 4, 6, 3, 4, 7] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
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
                Certificate Attached
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
                Search By Event Name
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
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  1
                </TableCell>
                <TableCell align="center">Event A</TableCell>
                <TableCell align="center">5 July 2024</TableCell>
                <TableCell align="center">56</TableCell>
                <TableCell align="center">Yes</TableCell>
                <TableCell align="center">WRI</TableCell>
                <TableCell align="center">
                  <FileDownloadOutlinedIcon className="text-primary" />
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  1
                </TableCell>
                <TableCell align="center">Event A</TableCell>
                <TableCell align="center">5 July 2024</TableCell>
                <TableCell align="center">56</TableCell>
                <TableCell align="center">Yes</TableCell>
                <TableCell align="center">WRI</TableCell>
                <TableCell align="center">
                  <FileDownloadOutlinedIcon className="text-primary" />
                </TableCell>
              </TableRow>{" "}
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  1
                </TableCell>
                <TableCell align="center">Event A</TableCell>
                <TableCell align="center">5 July 2024</TableCell>
                <TableCell align="center">56</TableCell>
                <TableCell align="center">Yes</TableCell>
                <TableCell align="center">WRI</TableCell>
                <TableCell align="center">
                  <FileDownloadOutlinedIcon className="text-primary" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <FloatingChatIcon />
      <Footer />
    </div>
  );
};

export default Dashboard;
