'use client';

import PageHeader from "@/app/shared/page-header";
import { useEffect, useState } from "react";
import Models from "../models/page";

const pageHeader = {
  title: "Interviews",
  subHeading: "Interviews List",
  breadcrumb: [],
};

const DashboardPage = () => {
  return (
    <>
      <Models />
    </>
  );
};

export default DashboardPage;
