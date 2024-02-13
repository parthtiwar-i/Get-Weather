import React, { createContext, useContext, useReducer } from 'react';

//initial state
const initialState = {
  todayWeather: null,
  todayForecast: [],
  weekForecast: null,
  isLoading: false,
  error: false
};

//  Actions
const ACTIONS = {
  SET_TODAY_WEATHER: 'SET_TODAY_WEATHER',
  SET_TODAY_FORECAST: 'SET_TODAY_FORECAST',
  SET_WEEK_FORECAST: 'SET_WEEK_FORECAST',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// reducer 
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TODAY_WEATHER:
      return { ...state, todayWeather: action.payload };
    case ACTIONS.SET_TODAY_FORECAST:
      return { ...state, todayForecast: action.payload };
    case ACTIONS.SET_WEEK_FORECAST:
      return { ...state, weekForecast: action.payload };
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Creating Context
const WeatherContext = createContext();

//custom hook for using the context
export const useWeather = () => useContext(WeatherContext);

//Provider component
export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};
