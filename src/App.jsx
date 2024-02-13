import { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import SearchPage from "./components/Pages/SearchPage";
import DetailPage from "./components/Pages/DetailPage";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/details" element={<DetailPage/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
