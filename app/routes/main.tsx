import React from "react";
import { initializeSyncfusionLicense } from "~/lib/syncfusion";

initializeSyncfusionLicense();

const MainPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Welcome to Travel App</h1>
    </div>
  );
};

export default MainPage;
