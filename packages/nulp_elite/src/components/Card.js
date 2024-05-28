import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Divider } from "native-base";
import RandomImage from "../assets/cardRandomImgs.json";
import { useTranslation } from "react-i18next";

export default function BoxCard({ items, index, onClick }) {
  const [imgUrl, setImgUrl] = React.useState();

  const [subdomain, setSubdomain] = React.useState();
  const { t } = useTranslation();

  useEffect(() => {
    console.log("card items----", items);
    if (items.se_gradeLevels) {
      setSubdomain(items.se_gradeLevels[0]);
    } else if (items.gradeLevel) {
      setSubdomain(items.gradeLevel[0]);
    } else setSubdomain(undefined);
    // const random = getRandomValue();
    console.log("random banner----", RandomImage.ImagePaths[index % 10 || 10]);
    setImgUrl(RandomImage.ImagePaths[index % 10 || 10]);
  }, []);
  // const randomImg = (i) => {
  // console.log("RandomImage--- ",RandomImage.ImagePaths[i % 10 || 10]);
  // setImgUrl(RandomImage.ImagePaths[i % 10 || 10]);
  // console.log("imgUrl--- ",imgUrl);
  // }
  // // Assuming 'data' is your JSON array
  // const randomItem = getRandomValue(data);
  //   // console.log(items.appIcon)
  //    // Function to select a random value from an array
  //  const getRandomValue = (array) => {
  //   console.log("RandomImage   --  ",RandomImage.ImagePaths )
  //   const randomIndex= RandomImage;
  //   // const randomIndex = Math.floor(Math.random() * RandomImage..length);
  //   console.log("randomIndex",randomIndex)

  //   // return array[randomIndex];
  //   return randomIndex;
  // };
  // Function to convert Unix timestamp to human-readable date
  const unixTimestampToHumanDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return dateObject.toLocaleDateString("en-GB", options); // Convert to human-readable date format
  };

  return (
    <Card
      className="cardBox"
      sx={{ position: "relative", cursor: "pointer" }}
      onClick={onClick}
    >
      <CardMedia
        sx={{
          height: 140,
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          position: "relative",
          backgroundRepeat: "no-repeat",
          background:
            "linear-gradient(45deg, RGBA(28, 25, 25, 0.46) 7%, RGBA(20, 18, 18, 0.57) 45%)",
        }}
        image={
          subdomain
            ? require(`./../assets/dummyCardImgs/${subdomain}.png`)
            : require("./../assets/dummyCardImgs/Management.png")
        }
        title="green iguana"
      />
      <div
        onClick={onClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: "0",
          width: "100%",
          height: "141px",
          background:
            "linear-gradient(45deg, rgb(28 25 25 / 29%) 7%, rgb(20 18 18 / 9%) 45%)",
          zIndex: 999,
          margin: "0",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      ></div>
      <CardContent>
        <Typography
          gutterBottom
          variant="h7"
          component="div"
          className="ribbonCard"
        >
          {items.primaryCategory && (
            <Box className="cardCourses"> {items.primaryCategory}</Box>
          )}
        </Typography>
        <Box className="card-img-container">
          <img
            src={items.appIcon ? items.appIcon : require("assets/default.png")}
            className="card-img"
          />
        </Box>
        {items.name && (
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="cardTitle mt-40"
          >
            {items.name}
          </Typography>
        )}
        <Typography
          variant="body2"
          color="#5B5B5B"
          style={{ fontSize: "11px", padding: "10px 0", textAlign: "left" }}
        >
          {items.organisation && (items.organisation.length = 1) && (
            <Box>{items.organisation[0]} </Box>
          )}
          {items.organisation && items.organisation.length > 1 && (
            <Box>
              {items.organisation[0]} + "+" + {items.organisation.length - 1}
            </Box>
          )}
        </Typography>
      </CardContent>
      {items.content ? (
        <CardContent>
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            className="ribbonCard"
          >
            {items.content.primaryCategory && (
              <Box className="cardCourses">
                {" "}
                {items.content.primaryCategory}
              </Box>
            )}
          </Typography>
          <Box className="card-img-container">
            <img
              src={
                items.content.appIcon
                  ? items.content.appIcon
                  : require("assets/default.png")
              }
              className="card-img"
            />
          </Box>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="cardTitle mt-40"
          >
            {items.content.name}
          </Typography>
          <Typography
            variant="body2"
            color="#5B5B5B"
            style={{ fontSize: "11px", padding: "10px 0", textAlign: "left" }}
          >
            {items.enrolledDate && (
              <Box>
                {t("ENROLLED_ON")} :
                {unixTimestampToHumanDate(items.enrolledDate)}{" "}
              </Box>
            )}
          </Typography>
        </CardContent>
      ) : null}
      {items.board ||
      items.gradeLevel ||
      items.se_boards ||
      items.se_gradeLevels ? (
        <div>
          <Box className="my-10 textLeft">
            {(items.board || items.se_boards) && (
              <Button type="button" size="small" className="labelOne">
                {items.board || items.se_boards}
              </Button>
            )}
            {(items.gradeLevel || items.se_gradeLevels) && (
              <Button type="button" size="small" className="labeltwo">
                {" "}
                {items.gradeLevel || items.se_gradeLevels}
              </Button>
            )}
          </Box>
        </div>
      ) : null}

      {items.content ? (
        <div>
          {/* <Divider></Divider> */}
          <Box className="my-10 pl-20">
            <Typography
              style={{
                marginTop: "10px",
                color:
                  items.status === 2
                    ? "#FF0000"
                    : items.status === 1
                    ? "blue"
                    : "#579b00",
                fontSize: "12px",
                padding: "10px 0",
                textAlign: "left",
              }}
            >
              {items.status === 2
                ? t("Expired")
                : items.status === 1
                ? t("Completed")
                : t("ongoing")}
            </Typography>
          </Box>
        </div>
      ) : null}
    </Card>
  );
}
