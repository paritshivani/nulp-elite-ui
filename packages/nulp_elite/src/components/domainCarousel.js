import React, { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import domainWithImage from "../assets/domainImgForm.json";
import Container from "@mui/material/Container";
import { useTranslation } from "react-i18next";
import SkeletonLoader from "components/skeletonLoader";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "@mui/material";
const styles = {
  box: {
    width: "200px",
    height: "200px",
    backgroundColor: "lightblue",
    marginTop: "20px",
  },
};
const responsive = {
  desktop: {
    breakpoint: { max: 1920, min: 1240 },
    items: 10,
    arrows: false, 
  },
  mediumDesktop: {
    breakpoint: { max: 1240, min: 768 },
    items: 8,
    partialVisibilityGutter: 20,
    arrows: true,
  },
  tablet: {
    breakpoint: { max: 768, min: 600 },
    items: 4,
    partialVisibilityGutter: 30,
    arrows: true,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 3,
    arrows: true,
  },
};

export default function DomainCarousel({
  domains,
  onSelectDomain,
  selectedDomainCode,
  keepOpen,
}) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true); // Initial loading state

  const dotsToShow = 4; // Number of dots to display
  const [isActive, setIsActive] = useState(false);
  const [itemsArray, setItemsArray] = useState([]);
  const [data, setData] = React.useState();
  const [activeStates, setActiveStates] = useState(null);
  // (
  //   () => domains?.map(() => false) // Initialize all items as inactive
  // );
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1208);
  const [activeDomain, setActiveDomain] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  // const navigate = useNavigate();
  const [userDomain, setUserDomain] = useState(null);

  const [isBoxVisible, setIsBoxVisible] = useState(keepOpen ? keepOpen : false);

  const handleClick = () => {
    // setIsBoxVisible(true);
    setIsBoxVisible(!isBoxVisible);
    if (!isBoxVisible) {
      document.body.classList.add("domain-fixed");
    } else {
      document.body.classList.remove("domain-fixed");
    }
  };
  useEffect(() => {
    // Simulate loading completion after a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  useEffect(() => {
    const domain = sessionStorage.getItem("userDomain");

    setUserDomain(domain);
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1024);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    domains?.map((term) => {
      if (domainWithImage) {
        domainWithImage?.result?.form?.data?.fields?.map((imgItem) => {
          if ((term && term.code) === (imgItem && imgItem.code)) {
            term["image"] = imgItem.image ? imgItem.image : "";
            pushData(term);
            itemsArray?.push(term);
          }
        });
      }
    });
    const croppedArray = itemsArray;
    setData(croppedArray);
  }, []);

  useEffect(() => {
    if (selectedDomainCode) {
      domains?.map((domain, index) => {
        if (domain.code === selectedDomainCode) {
          setActiveStates(index);
        }
      });
    }
  }, [selectedDomainCode]);

  useEffect(() => {
    console.log("activeStates", activeStates);
  }, [activeStates]);

  // Function to push data to the array
  const pushData = (term) => {
    setItemsArray((prevData) => [...prevData, term]);
  };
  const handleDomainClick = (query, index, name) => {
    setActiveStates(index === activeStates ? null : index);
    if (index === activeStates) {
      onSelectDomain(null, null);
      // navigate(-2);
    } else {
      onSelectDomain(query, name);
    }
  };

  const handleMouseEnter = (index) => {
    setActiveDomain(index);
  };

  const handleMouseLeave = () => {
    setActiveDomain(null);
  };

  return (
    <>
      {isLoading && (
        <>
          <Box>
            <SkeletonLoader />
          </Box>
        </>
      )}

      {!isLoading && !isBoxVisible && (
        <Box className="domain-box">
          <button onClick={handleClick} className="domain-btn">
            {t("SELECT_YOUR_PREFERRED_DOMAIN")}
            <KeyboardArrowDownIcon
              style={{
                color: "#484848",
                fontSize: "24px",
                verticalAlign: "middle",
              }}
            />
          </button>
        </Box>
      )}
      {isBoxVisible && (
        <><Box className="bg-darkblue">
          <Container
            role="main"
            maxWidth="xl"
            className="carousel"
            style={{ paddingTop: "0" }}
          >
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={false}
              responsive={responsive}
              ssr={true}
              infinite={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container carousel-bx"
              dotListClass="custom-dot-list-style-none"
              itemClass="carousel-item-padding-40-px"
            >
              {itemsArray &&
                itemsArray.slice(0, 10).map((domain, index) => (
                  <Box
                    className={`my-class ${activeStates === index || userDomain === domain.code
                      ? "carousel-active-ui"
                      : ""}`}
                    onClick={() => handleDomainClick(domain.code, index, domain.name)}
                    key={index}
                    orientation="horizontal"
                    size="sm"
                    variant="outlined"
                  >
                    <Box className="cursor-pointer">
                      <img
                        src={require(`../assets/domainImgs${domain.image}`)}
                        alt={domain.name}
                        className="domainHover" />
                    </Box>
                    <Box sx={{ alignSelf: "center" }} className="cursor-pointer">
                      <Typography
                        level="title-md"
                        style={{ fontSize: "12px", textAlign: "center" }}
                        className="domainText"
                      >
                        {domain.name}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </Carousel>
            <Box
              style={{
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              <Button
                onClick={handleClick}
                style={{ paddingTop: "0"}}
              >
                <KeyboardArrowUpIcon
                  style={{ color: "#fff", fontSize: "33px" }} />
              </Button>
            </Box>
          </Container>
        </Box><Box className="height-200"></Box></>
      )}
    </>
  );
}
