import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Search from "../search/Search";
import { useWeather } from "../../WeatherStore";
import TodayWeather from "../TodayWeather/TodayWeather";
import ErrorBox from "../reusable/ErrorBox";
import LoadingBox from "../reusable/LoadingBox";
import { Link, useNavigate } from "react-router-dom";
import { transformDateFormat } from "../../utilities/DatetimeUtils";
import { fetchWeatherData } from "../../api/getWeatherService";
import { getTodayForecastWeather, getWeekForecastWeather } from "../../utilities/DataUtils";
import { ALL_DESCRIPTIONS } from "../../utilities/DateConstants";

const SearchPage = () => {
  const { state, dispatch } = useWeather();
  const navigate = useNavigate();

  const { todayWeather, todayForecast, weekForecast, isLoading, error } = state;

  let appContent;

  const searchChangeHandler = async (enteredData) => {
    navigate("/search");

    const [latitude, longitude] = enteredData.value.split(" ");

    dispatch({ type: "SET_IS_LOADING", payload: true });

    const currentDate = transformDateFormat();
    const date = new Date();
    let dt_now = Math.floor(date.getTime() / 1000);

    try {
      const [todayWeatherResponse, weekForecastResponse] =
        await fetchWeatherData(latitude, longitude);
      const all_today_forecasts_list = getTodayForecastWeather(
        weekForecastResponse,
        currentDate,
        dt_now
      );

      const all_week_forecasts_list = getWeekForecastWeather(
        weekForecastResponse,
        ALL_DESCRIPTIONS
      );

      dispatch({
        type: "SET_TODAY_FORECAST",
        payload: all_today_forecasts_list,
      });
      dispatch({
        type: "SET_TODAY_WEATHER",
        payload: { city: enteredData.label, ...todayWeatherResponse },
      });
      dispatch({
        type: "SET_WEEK_FORECAST",
        payload: { city: enteredData.label, list: all_week_forecasts_list },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET_ERROR", payload: true });
    }

    dispatch({ type: "SET_IS_LOADING", payload: false });
  };

  if (todayWeather && todayForecast && weekForecast) {
    appContent = (
      <React.Fragment>
        <Grid item>
          <Grid item>
            <TodayWeather data={todayWeather} forecastList={todayForecast} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "500px",
        }}
      >
        <LoadingBox value="1">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: "10px", sm: "12px" },
              color: "rgba(255, 255, 255, .8)",
              lineHeight: 1,
              fontFamily: "Poppins",
            }}
          >
            Loading...
          </Typography>
        </LoadingBox>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        maxWidth: { xs: "95%", sm: "80%", md: "1100px" },
        width: "100%",
        height: "100%",
        margin: "2vmax auto",
        padding: "1rem 0 3rem",
        marginBottom: "1rem",
        borderRadius: {
          xs: "none",
          sm: "0 0 1rem 1rem",
        },
        // boxShadow: {
        //   xs: "none",
        //   sm: "rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px",
        // },
      }}
    >
      <Grid container columnSpacing={1}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <Box
              color={"white"}
              fontSize={"30px"}
              fontFamily={"italic"}
              textAlign={"center"}
            >
              Welcome to Weather Info
            </Box>
          </Box>
          <Search onSearchChange={searchChangeHandler} />
        </Grid>
        {appContent}

        <Box
          component={Link}
          to="/details"
          textAlign={"center"}
          margin={"0 auto"}
          sx={{
            margin: "2vmax auto",
            textDecoration: "none",
            color: "white",
            fontSize: "30px",
            fontFamily: "italic",
            textAlign: "center",
            "&:hover": {
              textDecoration: "none",
              color: "white",
              boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)", // Adjust the shadow color and strength as needed
            },
          }}
        >
          Get Weekly Forecast
        </Box>
      </Grid>
    </Container>
  );
};

export default SearchPage;
