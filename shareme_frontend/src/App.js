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
import AnimationsProvider from "./context/providers/AnimationsProvider";
import socketIOClient from "socket.io-client";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

const App = () => {
  const location = useLocation();
  const [mainLocation, setMainLocation] = useState("");
  const [socket, setSocket] = useState(null);

  const user = JSON.parse(localStorage.getItem("profile"))?.result;
  useEffect(() => {
    if (
      location.pathname.toString() !== "/account/login" &&
      location.pathname.toString() !== "/account/register"
    ) {
      setMainLocation(location);
    }
  }, [location]);
  useEffect(() => {
    if (!socket) {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
    }
  }, [socket]);
  return (
    <AnimationsProvider>
      <div onClick={() => console.log(socket)}>ádasdasdasdsa</div>
      <Routes>
        <Route
          path="/account/:type"
          element={<Login location={mainLocation} />}
        />
        <Route path="/*" element={<Home mainSocket={socket} />} />
      </Routes>
    </AnimationsProvider>
  );
};

export default App;
