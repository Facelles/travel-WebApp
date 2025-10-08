import React from "react";

import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

const MainPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Welcome to Travel App</h1>
    </div>
  );
};

export default MainPage;
