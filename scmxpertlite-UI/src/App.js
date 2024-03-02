import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Dashboard from "./Components/Pages/Dashboard.js";
import Login from "./Components/Auth/Login.js";
import MyShipments from "./Components/Pages/MyShipments.js";
import NewShipment from "./Components/Pages/NewShipment.js";
import DeviceData from "./Components/Pages/DeviceData.js";
import MyAccount from "./Components/Pages/MyAccount.js";
import Signup from "./Components/Auth/Signup.js";
import PasswordReset from "./Components/Auth/PasswordReset.js";
import HomeRouter from "./Components/HomeRouter.js";
import PageNotFound from "./Components/Pages/PageNotFound.js";
import { useAuth } from "./Components/Auth/AuthProvider.js";
import ChangePwd from "./Components/Pages/ChangePwd.js";
import UserPrivileges from "./Components/Pages/UserPrivileges.js";

function App() {
  const {isAuthenticated} = useAuth();
  // console.log("app, isAuthenticated",isAuthenticated)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/pwdreset" element={<PasswordReset />} />
          <Route
            exact
            path="/"
            element={
              isAuthenticated ? (                
                  <HomeRouter />               
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/shipments" element={<MyShipments />} />
            <Route path="/newshipment" element={<NewShipment />} />
            <Route path="/devicedata" element={<DeviceData />} />
            <Route path="/changepassword" element={<ChangePwd />} />
            <Route path="/userprivileges" element={<UserPrivileges />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
