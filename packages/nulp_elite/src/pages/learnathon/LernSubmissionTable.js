import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Edit, Visibility, Delete } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import submissions from "./lernSubmission.json";
import { navigate } from "@storybook/addon-links";
import Footer from "components/Footer";
import Header from "components/header";
const routeConfig = require("../../configs/routeConfig.json");

const LernSubmissionTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, search]);

  const fetchData = async () => {
    // Example API endpoint with limit, offset, and search params
    // const apiUrl = `https://api.example.com/submissions?limit=${rowsPerPage}&offset=${
    //   page * rowsPerPage
    // }&search=${search}`;
    // const response = await fetch(apiUrl);

    // const result = await response.json();
    console.log(submissions);
    setData(submissions.result.data);
    setTotalRows(result.totalCount);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Reset to first page on search
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Header />
      <Paper sx={{ padding: "20px", backgroundColor: "#f9f4eb" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Learnathon Submissions List</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate(`${routeConfig.ROUTES.LEARNATHON.CREATELEARNCONTENT}`)
            }
          >
            Upload Submission
          </Button>
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            variant="outlined"
            placeholder="Search Submission"
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            size="small"
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.title_of_submission}</TableCell>
                  <TableCell>
                    {new Date(row.updated_on).toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        row.status === "Live"
                          ? "green"
                          : row.status === "Review"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {row.status}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => alert(`Edit ${row.name}`)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => alert(`View ${row.name}`)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => alert(`Delete ${row.name}`)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
      <Footer />
    </>
  );
};

export default LernSubmissionTable;
