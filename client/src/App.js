import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './Page/dashboard/Dashboard';
import Student from './Page/students';
import Login from './Page/login';
import Profile from './Page/Profile';
import SnackbarNotification from './ui-component/snackbar';
import Fees from './Page/fees';
import "../src/index.css"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student" element={<Student />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fees" element={<Fees />} />
        </Routes>
      </BrowserRouter>

      <SnackbarNotification />
    </>
  );
}

export default App