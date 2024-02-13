import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

const TemperatureWeatherDetail = (props) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const temperature = isCelsius
    ? Math.round(props.temperature) + ' °C'
    : Math.round(convertToFahrenheit(props.temperature)) + ' °F';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontWeight: '600',
          fontSize: { xs: '12px', sm: '14px', md: '16px' },
          color: 'white',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginBottom: '8px',
          fontFamily: 'Poppins',
          cursor: 'pointer', 
        }}
        onClick={toggleTemperatureUnit} 
      >
        {temperature}
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '10px', sm: '12px', md: '14px' },
          color: 'rgba(255,255,255, .7)',
          lineHeight: 1,
          letterSpacing: { xs: '1px', sm: '0' },
          fontFamily: 'Roboto Condensed',
        }}
      >
        {props.description}
      </Typography>
    </Box>
  );
};

export default TemperatureWeatherDetail;
