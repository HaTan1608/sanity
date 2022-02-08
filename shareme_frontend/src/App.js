import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";

const App = () => {
  const location = useLocation();
  const [mainLocation, setMainLocation] = useState("");
  useEffect(() => {
    if (
      location.pathname.toString() !== "/account/login" &&
      location.pathname.toString() !== "/account/register"
    ) {
      setMainLocation(location);
    }
  }, [location]);

  return (
    <Routes>
      <Route
        path="/account/:type"
        element={<Login location={mainLocation} />}
      />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
