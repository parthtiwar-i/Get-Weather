import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { getDayMonthFromDate } from "../../../utilities/DatetimeUtils";
import { weatherIcon } from "../../../utilities/IconsUtils";
import ErrorBox from "../../reusable/ErrorBox";
import CityDateDetail from "./CityDateDetail";
import TemperatureWeatherDetail from "./TemperatureWeatherDetail";
import WeatherIconDetail from "./WeatherIconDetail";
import Layout from "../../reusable/Layout";

const dayMonth = getDayMonthFromDate();

const Details = ({ data }) => {
  const [iconPath, setIconPath] = useState(null);

  useEffect(() => {
    const loadIcon = async () => {
      const path = await weatherIcon(`${data.weather[0].icon}`);
      setIconPath(path);
    };

    loadIcon();
  }, [data]);

  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === "404";

  let content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided)
    content = (
      <>
        <Grid
          item
          xs={4}
          sx={{
            height: "80px",
          }}
        >
          <CityDateDetail city={data.city} date={dayMonth} />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            height: "80px",
          }}
        >
          <TemperatureWeatherDetail
            temperature={data.main.temp}
            description={data.weather[0].description}
          />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80px",
          }}
        >
          <WeatherIconDetail src={iconPath} />
          {/* <WeatherIconDetail src={"/src/assets/icons/03n.png"} /> */}
        </Grid>
      </>
    );

  return <Layout title="TODAY'S WEATHER" content={content} />;
};

export default Details;
