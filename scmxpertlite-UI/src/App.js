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
import Dashboard from "./Components/Authorized/Dashboard.js";
import Login from "./Components/Public/Login.js";
import MyShipments from "./Components/Authorized/MyShipments.js";
import NewShipment from "./Components/Authorized/NewShipment.js";
import DeviceData from "./Components/Authorized/DeviceData.js";
import MyAccount from "./Components/Authorized/MyAccount.js";
import Signup from "./Components/Public/Signup.js";
import PasswordReset from "./Components/Public/PasswordReset.js";
import HomeRouter from "./Components/HomeRouter.js";
import PageNotFound from "./Components/Authorized/PageNotFound.js";
import { useAuth } from "./Components/Authorized/AuthProvider.js";
import ChangePwd from "./Components/Authorized/ChangePwd.js";
import UserPrivileges from "./Components/Authorized/UserPrivileges.js";

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
