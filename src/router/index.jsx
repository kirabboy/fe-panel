import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Backups from '../pages/Backups';
import MyLayout from '../components/MyLayout';
import Servers from '../pages/Servers';
import Sties from '../pages/Sites';
import DNSManager from '../pages/DNSManager';
import Login from '../pages/auth/Login/Login';
import Files from '../pages/Files';
import User from '../pages/auth/User';
import paths from '../utils/paths';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyLayout />}>
          <Route path="/" element={<Servers />} />
          <Route path="/server" element={<Servers />} />
          <Route path="/sites" element={<Sties />} />
          <Route path="/backups" element={<Backups />} />
          <Route path="/dnsmanager" element={<DNSManager />} />
          <Route path="/files" element={<Files />} />
          <Route path="/users" element={<User />} />
        </Route>

        <Route path={paths.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
