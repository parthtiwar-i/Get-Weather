import { Box, Container, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";
import Search from "../search/Search";
import { useWeather } from "../../WeatherStore";
import { useNavigate } from "react-router";
import { transformDateFormat } from "../../utilities/DatetimeUtils";
import { fetchWeatherData } from "../../api/getWeatherService";
import { getTodayForecastWeather, getWeekForecastWeather } from "../../utilities/DataUtils";
import { ALL_DESCRIPTIONS } from "../../utilities/DateConstants";

const Home = () => {
  const navigate = useNavigate();
  const {dispatch} = useWeather();
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
      // console.log(all_today_forecasts_list);
      // console.log(todayWeatherResponse);
      // console.log(all_week_forecasts_list);

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

  return (
    <Container
      sx={{
        maxWidth: { xs: "95%", sm: "80%", md: "1100px" },
        width: "100%",
        height: "100%",
        margin: "0 auto",
        padding: "1rem 0 3rem",
        marginBottom: "1rem",
        borderRadius: {
          xs: "none",
          sm: "0 0 1rem 1rem",
        },
      }}
    >
      <Grid container columnSpacing={1}>
        <Box
          xs={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            minHeight: { xs: "auto", sm: "200px" },
            marginBottom: { xs: "0", sm: "2rem" },
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{
              fontSize: { xs: "15px", sm: "30px" },
              color: "rgba(255,255,255)",
              fontFamily: "Poppins",
              textAlign: "center",
              margin: "2rem 0",
              maxWidth: "80%",
              lineHeight: { xs: "1.5rem", sm: "2.5rem" },
            }}
          >
            Welcome to Pype-Ai weather portal. Get your area's weather details!
          </Typography>
        </Box>
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
              color={"#ffffffb0"}
              fontSize={"30px"}
              fontFamily={"cursive"}
              textAlign={"center"}
            >
              Search your City to get the weather detail
            </Box>
          </Box>
          <Search onSearchChange={searchChangeHandler} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
