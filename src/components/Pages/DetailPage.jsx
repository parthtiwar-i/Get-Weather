import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Search from "../search/Search";
import { useWeather } from "../../WeatherStore";
import TodayWeather from "../TodayWeather/TodayWeather";
import WeeklyForecast from "../WeeklyForecast/WeeklyForecast";
import ErrorBox from "../reusable/ErrorBox";
import LoadingBox from "../reusable/LoadingBox";
import { Link, useNavigate } from "react-router-dom";
import { transformDateFormat } from "../../utilities/DatetimeUtils";
import { fetchWeatherData } from "../../api/getWeatherService";
import { getTodayForecastWeather, getWeekForecastWeather } from "../../utilities/DataUtils";
import { ALL_DESCRIPTIONS } from "../../utilities/DateConstants";

const DetailPage = () => {
  const { state, dispatch } = useWeather();
  const navigate = useNavigate();

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
      // console.log(error);
      dispatch({ type: "SET_ERROR", payload: true });
    }

    dispatch({ type: "SET_IS_LOADING", payload: false });
  };

  const { todayWeather, todayForecast, weekForecast, isLoading, error } = state;

  let appContent;

  if (todayWeather && todayForecast && weekForecast) {
    appContent = (
      <React.Fragment>
        <Grid item xs={12} md={todayWeather ? 6 : 12}>
          <Grid item xs={12}>
            <TodayWeather data={todayWeather} forecastList={todayForecast} />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} margin={"0 auto"}>
          <WeeklyForecast data={weekForecast} />
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
      </Grid>
    </Container>
  );
};
export default DetailPage;
