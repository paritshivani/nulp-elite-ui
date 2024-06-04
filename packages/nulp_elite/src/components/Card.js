import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Divider } from "native-base";
import RandomImage from "../assets/cardRandomImgs.json";
import { useTranslation } from "react-i18next";

export default function BoxCard({ items, index, onClick }) {
  const [imgUrl, setImgUrl] = useState();
  const [subdomain, setSubdomain] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    if (items.se_gradeLevels) {
      setSubdomain(items.se_gradeLevels[0]);
    } else if (items.gradeLevel) {
      setSubdomain(items.gradeLevel[0]);
    } else {
      setSubdomain(undefined);
    }
    setImgUrl(RandomImage.ImagePaths[index % 10 || 10]);
  }, [items, index]);

  const unixTimestampToHumanDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return dateObject.toLocaleDateString("en-GB", options);
  };

  if (items.content) {
    return (
      <Card
        className="cardBox"
        sx={{ position: "relative", cursor: "pointer" }}
        onClick={onClick}
      >
        <CardMedia
          className="card-media"
          image={
            subdomain
              ? require(`./../assets/dummyCardImgs/${subdomain}.png`)
              : require("./../assets/dummyCardImgs/Management.png")
          }
          title="green iguana"
        />
        <div onClick={onClick} className="card-div"></div>
        <CardContent>
          {items.content.primaryCategory && (
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              className="ribbonCard"
            >
              <Box className="cardCourses">{items.content.primaryCategory}</Box>
            </Typography>
          )}
          <Box className="card-img-container">
            <img
              src={
                items.content.appIcon
                  ? items.content.appIcon
                  : require("assets/default.png")
              }
              className="card-img"
              alt="Content App Icon"
            />
          </Box>
          {items.content.name && (
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="cardTitle mt-20"
            >
              {items.content.name}
            </Typography>
          )}
          {items.enrolledDate && (
            <Typography
              variant="body2"
              color="#5B5B5B"
              style={{ fontSize: "11px", padding: "10px 0", textAlign: "left" }}
            >
              <Box>
                {t("ENROLLED_ON")} :{" "}
                {unixTimestampToHumanDate(items.enrolledDate)}
              </Box>
            </Typography>
          )}
        </CardContent>
        <Box className="my-10 pl-20">
          <Typography
            style={{
              marginTop: "10px",
              color:
                items.status === 2
                  ? "#065872"
                  : items.status === 1
                  ? "#579b00"
                  : "#FF0000",
              fontSize: "12px",
              padding: "10px 0",
              textAlign: "left",
              fontWeight: "500",
            }}
          >
            {items.status === 2
              ? t("Completed")
              : items.status === 1
              ? t("ongoing")
              : t("Expired")}
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      className="cardBox"
      sx={{ position: "relative", cursor: "pointer" }}
      onClick={onClick}
    >
      <CardMedia
        className="card-media"
        image={
          subdomain
            ? require(`./../assets/dummyCardImgs/${subdomain}.png`)
            : require("./../assets/dummyCardImgs/Management.png")
        }
        title="green iguana"
      />
      <div onClick={onClick} className="card-div"></div>
      <CardContent>
        {items.primaryCategory && (
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            className="ribbonCard"
          >
            <Box className="cardCourses">{items.primaryCategory}</Box>
          </Typography>
        )}
        <Box className="card-img-container">
          <img
            src={items.appIcon ? items.appIcon : require("assets/default.png")}
            className="card-img"
            alt="App Icon"
          />
        </Box>
        {items.name && (
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="cardTitle mt-20"
          >
            {items.name}
          </Typography>
        )}
        {items.organisation && items.organisation.length > 0 && (
          <Typography
            variant="body2"
            color="#5B5B5B"
            style={{ fontSize: "11px", padding: "10px 0", textAlign: "left" }}
          >
            <Box>
              {items.organisation.length === 1
                ? items.organisation[0]
                : `${items.organisation[0]} + ${items.organisation.length - 1}`}
            </Box>
          </Typography>
        )}
      </CardContent>
      {(items.board ||
        items.gradeLevel ||
        items.se_boards ||
        items.se_gradeLevels) && (
        <>
          <Box className="textLeft mb-15 d-flex">
            {(items.board || items.se_boards) && (
              <Tooltip
                title={items.board || items.se_boards}
                placement="top"
                className="labelOne cardLabelEllips"
              >
                <Button> {items.board || items.se_boards}</Button>
              </Tooltip>
              // <Button type="button" size="small">
              //   {items.board || items.se_boards}
              // </Button>
            )}
            {(items.gradeLevel || items.se_gradeLevels) && (
              <Tooltip
                title={items.gradeLevel || items.se_gradeLevels}
                placement="top"
                className="labeltwo cardLabelEllips"
              >
                <Button> {items.gradeLevel || items.se_gradeLevels}</Button>
              </Tooltip>
            )}
          </Box>
        </>
      )}
    </Card>
  );
}
