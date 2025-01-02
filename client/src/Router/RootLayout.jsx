import React from "react";
import SideBar from "../Component/SideBar";
import { Outlet } from "react-router-dom";
import SnackbarNotification from "../ui-component/snackbar";
export default function RootLayout() {
  
  return (
    <>
      <SideBar />
      <Outlet />
      <SnackbarNotification/>
    </>
  );
}