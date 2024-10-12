import { BrowserRouter, Route, Routes } from "react-router-dom";

import Backups from "../pages/Backups";
import Servers from "../pages/Servers";
import Sties from "../pages/Sites";
import DNSManager from "../pages/DNSManager";
import Login from "../pages/auth/Login/Login";
import Files from "../pages/Files";
import paths from "../utils/paths";
import Teams from "../pages/Teams";
import RootLayout from "../layouts/RootLayout";
import Users from "../pages/Users";
// import User from "../pages/auth/User";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Servers />} />
          <Route path="/sites" element={<Sties />} />
          <Route path="/backups" element={<Backups />} />
          <Route path="/dnsmanager" element={<DNSManager />} />
          <Route path="/files" element={<Files />} />
          <Route path={paths.USERS} element={<Users />} />
          <Route path="/teams" element={<Teams />} />
        </Route>

        <Route path={paths.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
