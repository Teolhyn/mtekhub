import * as Sentry from "@sentry/react";
import cookie from "cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { OpenAPI } from "./api";
import Home from "./pages/Home";
import ChemicalOrders from "./pages/ChemicalOrders";
import ELabFTW from "./pages/ELabFTW";
import NavBar from "./components/nav";

OpenAPI.interceptors.request.use((request) => {
  const { csrftoken } = cookie.parse(document.cookie);
  if (request.headers && csrftoken) {
    request.headers["X-CSRFTOKEN"] = csrftoken;
  }
  return request;
});

const App = () => (
  <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
    <NavBar />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chemicalorder" element={<ChemicalOrders />} />
        <Route path="/elabftw" element={<ELabFTW />} />
      </Routes>
    </Router>
  </Sentry.ErrorBoundary>
);

export default App;
